import { beforeAll, describe, expect, it } from 'vitest';
import {
  addMessage,
  advanceDossier,
  answerRequest,
  createClient,
  createDossier,
  createRequest,
  createUser,
  getWorkspace,
  markNotificationsRead,
  newId,
  staffQueue,
  createAccess,
  requestAccess,
  provideAccess,
  revokeAccess,
  revealAccess,
  listClients,
  assignManager,
  findUser,
  managerOf,
  listFirms,
} from './db';
import { q } from './sql';

/** Integration tests against a real (in-memory) Postgres via PGlite. */
describe('data layer', () => {
  let alice: Awaited<ReturnType<typeof createUser>>;
  let bob: Awaited<ReturnType<typeof createUser>>;
  let aClient: Awaited<ReturnType<typeof createClient>>;
  let aClient2: Awaited<ReturnType<typeof createClient>>;
  let dossierId: string;

  beforeAll(async () => {
    alice = await createUser({ email: `alice-${newId()}@test.be`, name: 'Alice', company: 'Fidu A', passwordHash: 'x' });
    bob = await createUser({ email: `bob-${newId()}@test.be`, name: 'Bob', company: 'Fidu B', passwordHash: 'x' });
    aClient = await createClient({ userId: alice.id, name: 'Client One' });
    aClient2 = await createClient({ userId: alice.id, name: 'Client Two' });
    await createClient({ userId: bob.id, name: 'Bob Client' });
    dossierId = newId();
    await createDossier({ id: dossierId, userId: alice.id, clientId: aClient.id, name: 'Septembre', period: '2026-09', type: 'dossier', files: [{ name: 'a.pdf', size: 10, stored: 'local:x' }] });
  });

  it('isolates accounts: Bob never sees Alice’s data', async () => {
    const ws = await getWorkspace(bob.id);
    expect(ws.dossiers).toHaveLength(0);
    expect(ws.clients.map((c) => c.name)).toEqual(['Bob Client']);
  });

  it('scopes the workspace to one client', async () => {
    expect((await getWorkspace(alice.id, aClient.id)).dossiers).toHaveLength(1);
    expect((await getWorkspace(alice.id, aClient2.id)).dossiers).toHaveLength(0);
    expect((await getWorkspace(alice.id)).clients).toHaveLength(2);
  });

  it('advances a dossier through encoding, review and delivery, notifying the client', async () => {
    await advanceDossier(dossierId, 'Staff');
    await advanceDossier(dossierId, 'Staff');
    const d = await advanceDossier(dossierId, 'Staff');
    expect(d?.status).toBe('done');
    expect(d?.timeline?.map((s) => s.step)).toEqual(['received', 'encoding', 'review', 'delivered']);
    expect(d?.assignee).toBe('Staff');
    const ws = await getWorkspace(alice.id, aClient.id);
    expect(ws.notifications.filter((n) => n.kind === 'status').length).toBeGreaterThanOrEqual(3);
  });

  it('runs the request round trip and only lets the owner answer', async () => {
    const r = await createRequest({ userId: alice.id, clientId: aClient.id, dossierId, title: 'Missing invoice', detail: '' });
    expect(await answerRequest(bob.id, r.id, 'nope', [])).toBeUndefined();
    const answered = await answerRequest(alice.id, r.id, 'here it is', []);
    expect(answered?.status).toBe('answered');
    expect(await answerRequest(alice.id, r.id, 'again', [])).toBeUndefined();
  });

  it('notifies on team messages and marks them read', async () => {
    await addMessage({ userId: alice.id, clientId: aClient.id, author: 'team', authorName: 'Staff', body: 'Hello' });
    expect((await getWorkspace(alice.id)).notifications.some((n) => n.kind === 'message' && !n.read)).toBe(true);
    await markNotificationsRead(alice.id);
    expect((await getWorkspace(alice.id)).notifications.every((n) => n.read)).toBe(true);
  });

  it('exposes every account’s dossiers to the staff queue with client names', async () => {
    const q = await staffQueue();
    expect(q.find((d) => d.id === dossierId)?.clientName).toBe('Client One');
  });

  it('never turns the firm itself into one of its clients', async () => {
    const firm = await createUser({ email: `firm-${newId()}@test.be`, name: 'Carla', company: 'Cabinet C', passwordHash: 'x' });
    expect(await listClients(firm.id)).toEqual([]);
  });

  it('stores access passwords encrypted and only reveals them to the team', async () => {
    const acc = await createAccess(alice.id, aClient.id, { label: 'Exact Online', kind: 'software', login: 'delegis', secret: 'S3cret!' }, 'Alice');
    expect(acc.hasSecret).toBe(true);
    const [raw] = await q<{ secret: string }>('SELECT secret FROM accesses WHERE id = $1', [acc.id]);
    expect(raw.secret).not.toContain('S3cret!');
    expect(await revealAccess(acc.id)).toBe('S3cret!');
    // Another firm cannot touch it.
    expect(await revokeAccess(bob.id, acc.id, 'Bob')).toBeUndefined();
    await revokeAccess(alice.id, acc.id, 'Alice');
    expect(await revealAccess(acc.id)).toBeNull();
  });

  it('lets the team request an access that the firm then provides', async () => {
    const req = await requestAccess(aClient2.id, { label: 'MyMinfin', kind: 'tax', note: 'Mandat TVA' }, 'Thomas');
    expect(req?.status).toBe('requested');
    expect((await getWorkspace(alice.id)).notifications.some((n) => n.href === 'accesses')).toBe(true);
    const done = await provideAccess(alice.id, req!.id, { login: 'alice', secret: 'pw' }, 'Alice');
    expect(done?.status).toBe('provided');
    expect(await revealAccess(req!.id)).toBe('pw');
  });

  it('shows the firm its assigned account manager', async () => {
    const staff = await createUser({ email: `staff-${newId()}@delegis.test`, name: 'Thomas', company: 'Delegis', role: 'staff', title: 'Responsable de compte', city: 'Bruxelles', passwordHash: 'x' });
    expect(await managerOf((await findUser(alice.id))!)).toBeNull();
    await assignManager(alice.id, staff.id);
    const m = await managerOf((await findUser(alice.id))!);
    expect(m).toMatchObject({ name: 'Thomas', title: 'Responsable de compte', city: 'Bruxelles' });
    expect((await listFirms()).find((f) => f.id === alice.id)?.managerName).toBe('Thomas');
  });
});
