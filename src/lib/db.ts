import 'server-only';
import crypto from 'crypto';
import { q } from './sql';
import { open, seal } from './vault';
import type { Access, AccessKind, TeamMember, Client, Deliverable, Dossier, DossierStatus, Invoice, Message, Notification, RequestItem, StoredFile, TimelineStep, User, Workspace } from './types';

export type { Access, TeamMember, Client, Deliverable, Dossier, Invoice, Lead, Message, Notification, RequestItem, StoredFile, User, Workspace } from './types';

/*
 * Data access on Postgres (Neon in production, PGlite locally — see lib/sql).
 * Every query that reads client data is scoped by user_id, so one account can never see another's.
 */

export const newId = () => crypto.randomUUID();
export const ALL_CLIENTS = 'all';

const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : new Date(String(v)).toISOString());
const opt = (v: unknown) => (v === null || v === undefined ? undefined : String(v));
const json = <T>(v: unknown, fallback: T): T => (v === null || v === undefined ? fallback : typeof v === 'string' ? (JSON.parse(v) as T) : (v as T));

/* ---------- row mappers ---------- */

type R = Record<string, unknown>;
const toUser = (r: R): User => ({
  id: String(r.id),
  email: String(r.email),
  name: String(r.name),
  company: String(r.company ?? ''),
  passwordHash: String(r.password_hash),
  role: r.role === 'staff' ? 'staff' : 'client',
  phone: opt(r.phone),
  vatNumber: opt(r.vat_number),
  software: opt(r.software),
  title: opt(r.title),
  city: opt(r.city),
  managerId: opt(r.manager_id),
  createdAt: iso(r.created_at),
});
const toMember = (u: User): TeamMember => ({ id: u.id, name: u.name, email: u.email, phone: u.phone, title: u.title, city: u.city });
const toAccess = (r: R): Access => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  label: String(r.label),
  kind: r.kind as AccessKind,
  url: opt(r.url),
  login: opt(r.login),
  hasSecret: r.secret !== null && r.secret !== undefined,
  notes: String(r.notes ?? ''),
  status: r.status as Access['status'],
  requestNote: opt(r.request_note),
  requestedBy: opt(r.requested_by),
  updatedBy: opt(r.updated_by),
  createdAt: iso(r.created_at),
  updatedAt: iso(r.updated_at),
});
const toClient = (r: R): Client => ({ id: String(r.id), userId: String(r.user_id), name: String(r.name), vatNumber: opt(r.vat_number), software: opt(r.software), sector: opt(r.sector), createdAt: iso(r.created_at) });
const toDossier = (r: R): Dossier => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  name: String(r.name),
  period: String(r.period ?? ''),
  type: r.type === 'document' ? 'document' : 'dossier',
  status: r.status as DossierStatus,
  files: json<StoredFile[]>(r.files, []),
  timeline: json<{ step: TimelineStep; at: string }[]>(r.timeline, []),
  assignee: opt(r.assignee),
  createdAt: iso(r.created_at),
});
const toMessage = (r: R): Message => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  author: r.author === 'team' ? 'team' : 'client',
  authorName: String(r.author_name),
  body: String(r.body),
  dossierId: opt(r.dossier_id),
  files: json<StoredFile[]>(r.files, []),
  createdAt: iso(r.created_at),
});
const toRequest = (r: R): RequestItem => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  dossierId: opt(r.dossier_id),
  title: String(r.title),
  detail: String(r.detail ?? ''),
  status: r.status === 'answered' ? 'answered' : 'open',
  dueAt: r.due_at ? iso(r.due_at) : undefined,
  answer: json<RequestItem['answer']>(r.answer, undefined),
  createdAt: iso(r.created_at),
});
const toDeliverable = (r: R): Deliverable => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  title: String(r.title),
  kind: r.kind as Deliverable['kind'],
  period: String(r.period ?? ''),
  fileName: String(r.file_name),
  stored: String(r.stored),
  size: Number(r.size),
  createdAt: iso(r.created_at),
});
const toInvoice = (r: R): Invoice => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  number: String(r.number),
  period: String(r.period),
  amount: Number(r.amount),
  status: r.status === 'due' ? 'due' : 'paid',
  stored: opt(r.stored),
  issuedAt: iso(r.issued_at),
  dueAt: iso(r.due_at),
});
const toNotification = (r: R): Notification => ({
  id: String(r.id),
  userId: String(r.user_id),
  clientId: String(r.client_id),
  kind: r.kind as Notification['kind'],
  text: String(r.text),
  href: String(r.href),
  read: Boolean(r.read),
  createdAt: iso(r.created_at),
});

/* ---------- users ---------- */

export async function findUserByEmail(email: string) {
  const [r] = await q(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()]);
  return r ? toUser(r) : undefined;
}

export async function findUser(id: string) {
  const [r] = await q(`SELECT * FROM users WHERE id = $1`, [id]);
  return r ? toUser(r) : undefined;
}

export async function createUser(u: Omit<User, 'id' | 'createdAt' | 'role'> & { id?: string; role?: User['role']; createdAt?: string }) {
  const [r] = await q(
    `INSERT INTO users (id, email, name, company, password_hash, role, phone, vat_number, software, title, city, manager_id, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
    [u.id ?? newId(), u.email.toLowerCase(), u.name, u.company, u.passwordHash, u.role ?? 'client', u.phone || null, u.vatNumber || null, u.software || null, u.title || null, u.city || null, u.managerId || null, u.createdAt ?? new Date().toISOString()],
  );
  return toUser(r);
}

export async function updateUser(id: string, p: Partial<Pick<User, 'name' | 'company' | 'phone' | 'vatNumber' | 'software'>>) {
  const [r] = await q(
    `UPDATE users SET name = COALESCE($2, name), company = COALESCE($3, company), phone = $4, vat_number = $5, software = $6 WHERE id = $1 RETURNING *`,
    [id, p.name ?? null, p.company ?? null, p.phone || null, p.vatNumber || null, p.software || null],
  );
  return r ? toUser(r) : undefined;
}

/* ---------- clients ---------- */

/** The firm's client companies. The firm itself is the account owner, never one of its own clients. */
export async function listClients(userId: string) {
  return (await q(`SELECT * FROM clients WHERE user_id = $1 ORDER BY name`, [userId])).map(toClient);
}

export async function createClient(c: Omit<Client, 'id' | 'createdAt'> & { id?: string; createdAt?: string }) {
  const [r] = await q(`INSERT INTO clients (id, user_id, name, vat_number, software, sector, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [
    c.id ?? newId(),
    c.userId,
    c.name,
    c.vatNumber || null,
    c.software || null,
    c.sector || null,
    c.createdAt ?? new Date().toISOString(),
  ]);
  return toClient(r);
}

/* ---------- workspace (read) ---------- */

/**
 * The account's data, optionally scoped to one client company.
 * `clients` always lists every client of the account (for the switcher).
 */
export async function getWorkspace(userId: string, clientId: string = ALL_CLIENTS): Promise<Workspace> {
  const scoped = clientId !== ALL_CLIENTS;
  const where = scoped ? `user_id = $1 AND client_id = $2` : `user_id = $1`;
  const p = scoped ? [userId, clientId] : [userId];
  const [clients, dossiers, messages, requests, deliverables, invoices, notifications, accesses] = await Promise.all([
    q(`SELECT * FROM clients WHERE user_id = $1 ORDER BY name`, [userId]),
    q(`SELECT * FROM dossiers WHERE ${where} ORDER BY created_at DESC`, p),
    q(`SELECT * FROM messages WHERE ${where} ORDER BY created_at ASC`, p),
    q(`SELECT * FROM requests WHERE ${where} ORDER BY created_at DESC`, p),
    q(`SELECT * FROM deliverables WHERE ${where} ORDER BY created_at DESC`, p),
    q(`SELECT * FROM invoices WHERE ${where} ORDER BY issued_at DESC`, p),
    q(`SELECT * FROM notifications WHERE ${where} ORDER BY created_at DESC LIMIT 50`, p),
    q(`SELECT * FROM accesses WHERE ${where} ORDER BY (status = 'requested') DESC, label`, p),
  ]);
  return {
    clients: clients.map(toClient),
    dossiers: dossiers.map(toDossier),
    messages: messages.map(toMessage),
    requests: requests.map(toRequest),
    deliverables: deliverables.map(toDeliverable),
    invoices: invoices.map(toInvoice),
    notifications: notifications.map(toNotification),
    accesses: accesses.map(toAccess),
  };
}

export async function listDossiers(userId: string) {
  return (await q(`SELECT * FROM dossiers WHERE user_id = $1 ORDER BY created_at DESC`, [userId])).map(toDossier);
}

/* ---------- workspace (write) ---------- */

async function notify(n: Omit<Notification, 'id' | 'createdAt' | 'read'> & { createdAt?: string }) {
  await q(`INSERT INTO notifications (id, user_id, client_id, kind, text, href, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [
    newId(),
    n.userId,
    n.clientId,
    n.kind,
    n.text.slice(0, 120),
    n.href,
    n.createdAt ?? new Date().toISOString(),
  ]);
}

export async function createDossier(d: Omit<Dossier, 'createdAt' | 'status' | 'timeline'> & { status?: DossierStatus; createdAt?: string; timeline?: Dossier['timeline'] }) {
  const at = d.createdAt ?? new Date().toISOString();
  const [r] = await q(
    `INSERT INTO dossiers (id, user_id, client_id, name, period, type, status, files, timeline, assignee, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10,$11) RETURNING *`,
    [d.id, d.userId, d.clientId, d.name, d.period, d.type, d.status ?? 'received', JSON.stringify(d.files), JSON.stringify(d.timeline ?? [{ step: 'received', at }]), d.assignee ?? null, at],
  );
  return toDossier(r);
}

export async function addMessage(m: Omit<Message, 'id' | 'createdAt'> & { createdAt?: string }) {
  const [r] = await q(
    `INSERT INTO messages (id, user_id, client_id, author, author_name, body, dossier_id, files, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9) RETURNING *`,
    [newId(), m.userId, m.clientId, m.author, m.authorName, m.body, m.dossierId ?? null, JSON.stringify(m.files ?? []), m.createdAt ?? new Date().toISOString()],
  );
  const msg = toMessage(r);
  if (msg.author === 'team') await notify({ userId: msg.userId, clientId: msg.clientId, kind: 'message', text: msg.body, href: 'messages', createdAt: msg.createdAt });
  return msg;
}

export async function answerRequest(userId: string, requestId: string, note: string, files: StoredFile[]) {
  const [r] = await q(`UPDATE requests SET status = 'answered', answer = $3::jsonb WHERE id = $1 AND user_id = $2 AND status = 'open' RETURNING *`, [
    requestId,
    userId,
    JSON.stringify({ at: new Date().toISOString(), note, files }),
  ]);
  return r ? toRequest(r) : undefined;
}

export async function markNotificationsRead(userId: string) {
  await q(`UPDATE notifications SET read = true WHERE user_id = $1 AND read = false`, [userId]);
}

export async function createLead(locale: string, data: Record<string, string>) {
  await q(`INSERT INTO leads (id, locale, data) VALUES ($1,$2,$3::jsonb)`, [newId(), locale, JSON.stringify(data)]);
}

/* ---------- back-office (Delegis staff) ---------- */

export type StaffQueueRow = Dossier & { clientName: string; accountName: string };

/** All dossiers across all accounts, newest first, for the team's work queue. */
export async function staffQueue(status?: DossierStatus) {
  const rows = await q(
    `SELECT d.*, c.name AS client_name, u.company AS account_name FROM dossiers d
     JOIN clients c ON c.id = d.client_id JOIN users u ON u.id = d.user_id
     ${status ? 'WHERE d.status = $1' : ''} ORDER BY d.created_at DESC LIMIT 200`,
    status ? [status] : [],
  );
  return rows.map((r) => ({ ...toDossier(r), clientName: String(r.client_name), accountName: String(r.account_name) }) as StaffQueueRow);
}

export async function staffDossier(id: string) {
  const [r] = await q(
    `SELECT d.*, c.name AS client_name, u.company AS account_name FROM dossiers d JOIN clients c ON c.id = d.client_id JOIN users u ON u.id = d.user_id WHERE d.id = $1`,
    [id],
  );
  return r ? ({ ...toDossier(r), clientName: String(r.client_name), accountName: String(r.account_name) } as StaffQueueRow) : undefined;
}

/** Client-side workspace for one client company, regardless of who is reading (staff only). */
export async function clientWorkspace(clientId: string) {
  const [c] = await q(`SELECT * FROM clients WHERE id = $1`, [clientId]);
  if (!c) return undefined;
  return { client: toClient(c), ws: await getWorkspace(String(c.user_id), clientId) };
}

/** Clients with unread client messages (last message authored by the client). */
export async function staffInbox() {
  const rows = await q(
    `SELECT DISTINCT ON (m.client_id) m.*, c.name AS client_name FROM messages m JOIN clients c ON c.id = m.client_id ORDER BY m.client_id, m.created_at DESC`,
  );
  return rows
    .map((r) => ({ ...toMessage(r), clientName: String(r.client_name) }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const NEXT_STEP: Record<DossierStatus, { status: DossierStatus; step: TimelineStep }[]> = {
  received: [{ status: 'processing', step: 'encoding' }],
  processing: [
    { status: 'processing', step: 'review' },
    { status: 'done', step: 'delivered' },
  ],
  done: [],
};

/** Moves a dossier forward one step in its timeline and notifies the client. */
export async function advanceDossier(id: string, assignee?: string) {
  const d = await staffDossier(id);
  if (!d) return undefined;
  const done = new Set(d.timeline?.map((s) => s.step));
  const next = NEXT_STEP[d.status].find((n) => !done.has(n.step));
  if (!next) return d;
  const timeline = [...(d.timeline ?? []), { step: next.step, at: new Date().toISOString() }];
  const [r] = await q(`UPDATE dossiers SET status = $2, timeline = $3::jsonb, assignee = COALESCE(assignee, $4) WHERE id = $1 RETURNING *`, [
    id,
    next.status,
    JSON.stringify(timeline),
    assignee ?? null,
  ]);
  await notify({ userId: d.userId, clientId: d.clientId, kind: 'status', text: d.name, href: `dossiers/${d.id}` });
  return toDossier(r);
}

export async function createRequest(r: Omit<RequestItem, 'id' | 'createdAt' | 'status' | 'answer'> & { id?: string; status?: RequestItem['status']; answer?: RequestItem['answer']; createdAt?: string }) {
  const [row] = await q(
    `INSERT INTO requests (id, user_id, client_id, dossier_id, title, detail, status, due_at, answer, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10) RETURNING *`,
    [r.id ?? newId(), r.userId, r.clientId, r.dossierId ?? null, r.title, r.detail, r.status ?? 'open', r.dueAt ?? null, r.answer ? JSON.stringify(r.answer) : null, r.createdAt ?? new Date().toISOString()],
  );
  const req = toRequest(row);
  if (req.status === 'open') await notify({ userId: req.userId, clientId: req.clientId, kind: 'request', text: req.title, href: 'requests', createdAt: req.createdAt });
  return req;
}

export async function createDeliverable(d: Omit<Deliverable, 'id' | 'createdAt'> & { id?: string; createdAt?: string }) {
  const [row] = await q(
    `INSERT INTO deliverables (id, user_id, client_id, title, kind, period, file_name, stored, size, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [d.id ?? newId(), d.userId, d.clientId, d.title, d.kind, d.period, d.fileName, d.stored, d.size, d.createdAt ?? new Date().toISOString()],
  );
  const del = toDeliverable(row);
  await notify({ userId: del.userId, clientId: del.clientId, kind: 'document', text: del.title, href: 'documents', createdAt: del.createdAt });
  return del;
}

export async function createInvoice(i: Omit<Invoice, 'id'> & { id?: string }) {
  const [row] = await q(
    `INSERT INTO invoices (id, user_id, client_id, number, period, amount, status, stored, issued_at, due_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [i.id ?? newId(), i.userId, i.clientId, i.number, i.period, i.amount, i.status, i.stored ?? null, i.issuedAt, i.dueAt],
  );
  return toInvoice(row);
}

/** Removes a user and (via ON DELETE CASCADE) all of their data. Used by the seed to rebuild the demo. */
export async function deleteUserByEmail(email: string) {
  await q(`DELETE FROM users WHERE email = $1`, [email.toLowerCase()]);
}

/* ---------- accesses ---------- */

export type AccessInput = { label: string; kind: AccessKind; url?: string; login?: string; secret?: string; notes?: string };

/** The firm shares an access for one of its clients. */
export async function createAccess(userId: string, clientId: string, a: AccessInput, by: string, opts: { id?: string; createdAt?: string } = {}) {
  const at = opts.createdAt ?? new Date().toISOString();
  const [r] = await q(
    `INSERT INTO accesses (id, user_id, client_id, label, kind, url, login, secret, notes, status, updated_by, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'provided',$10,$11,$11) RETURNING *`,
    [opts.id ?? newId(), userId, clientId, a.label, a.kind, a.url || null, a.login || null, a.secret ? seal(a.secret) : null, a.notes ?? '', by, at],
  );
  return toAccess(r);
}

/** Delegis asks a firm for an access; the firm sees it on its Accès page and in its notifications. */
export async function requestAccess(clientId: string, a: { label: string; kind: AccessKind; note: string }, by: string, opts: { createdAt?: string } = {}) {
  const [c] = await q(`SELECT user_id FROM clients WHERE id = $1`, [clientId]);
  if (!c) return undefined;
  const at = opts.createdAt ?? new Date().toISOString();
  const [r] = await q(
    `INSERT INTO accesses (id, user_id, client_id, label, kind, status, request_note, requested_by, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,'requested',$6,$7,$8,$8) RETURNING *`,
    [newId(), c.user_id, clientId, a.label, a.kind, a.note, by, at],
  );
  const acc = toAccess(r);
  await notify({ userId: acc.userId, clientId, kind: 'request', text: a.label, href: 'accesses', createdAt: at });
  return acc;
}

/** The firm fills in (or updates) an access it owns. An empty secret keeps the current one. */
export async function provideAccess(userId: string, id: string, a: Omit<AccessInput, 'label' | 'kind'>, by: string) {
  const [r] = await q(
    `UPDATE accesses SET url = COALESCE($3, url), login = COALESCE($4, login), secret = COALESCE($5, secret), notes = COALESCE($6, notes),
       status = 'provided', updated_by = $7, updated_at = now()
     WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId, a.url || null, a.login || null, a.secret ? seal(a.secret) : null, a.notes || null, by],
  );
  return r ? toAccess(r) : undefined;
}

/** The firm withdraws an access: the stored secret is erased. */
export async function revokeAccess(userId: string, id: string, by: string) {
  const [r] = await q(`UPDATE accesses SET status = 'revoked', secret = NULL, updated_by = $3, updated_at = now() WHERE id = $1 AND user_id = $2 RETURNING *`, [id, userId, by]);
  return r ? toAccess(r) : undefined;
}

/** Staff only: decrypts a secret for use. */
export async function revealAccess(id: string) {
  const [r] = await q(`SELECT secret FROM accesses WHERE id = $1 AND status = 'provided'`, [id]);
  return r?.secret ? open(String(r.secret)) : null;
}

export type AccessRow = Access & { clientName: string; firmName: string };

export async function allAccesses(firmId?: string) {
  const rows = await q(
    `SELECT a.*, c.name AS client_name, u.company AS firm_name FROM accesses a JOIN clients c ON c.id = a.client_id JOIN users u ON u.id = a.user_id
     ${firmId ? 'WHERE a.user_id = $1' : ''} ORDER BY (a.status = 'requested') DESC, a.updated_at DESC`,
    firmId ? [firmId] : [],
  );
  return rows.map((r) => ({ ...toAccess(r), clientName: String(r.client_name), firmName: String(r.firm_name) }) as AccessRow);
}

/* ---------- admin: firms and team ---------- */

/** The Delegis account manager assigned to a firm, if any. */
export async function managerOf(user: User): Promise<TeamMember | null> {
  if (!user.managerId) return null;
  const m = await findUser(user.managerId);
  return m && m.role === 'staff' ? toMember(m) : null;
}

export async function listTeam() {
  return (await q(`SELECT * FROM users WHERE role = 'staff' ORDER BY name`)).map((r) => toMember(toUser(r)));
}

export async function updateStaffProfile(id: string, p: { name: string; title?: string; city?: string; phone?: string }) {
  await q(`UPDATE users SET name = $2, title = $3, city = $4, phone = $5 WHERE id = $1 AND role = 'staff'`, [id, p.name, p.title || null, p.city || null, p.phone || null]);
}

export type FirmRow = User & { clients: number; dossiers: number; open: number; pendingAccess: number; lastActivity?: string; managerName?: string };

/** Every accounting firm (client account) with its workload. */
export async function listFirms() {
  const rows = await q(
    `SELECT u.*, m.name AS manager_name,
       (SELECT count(*) FROM clients c WHERE c.user_id = u.id) AS n_clients,
       (SELECT count(*) FROM dossiers d WHERE d.user_id = u.id) AS n_dossiers,
       (SELECT count(*) FROM dossiers d WHERE d.user_id = u.id AND d.status <> 'done') AS n_open,
       (SELECT count(*) FROM accesses a WHERE a.user_id = u.id AND a.status = 'requested') AS n_access,
       (SELECT max(d.created_at) FROM dossiers d WHERE d.user_id = u.id) AS last_activity
     FROM users u LEFT JOIN users m ON m.id = u.manager_id
     WHERE u.role = 'client' ORDER BY u.company, u.name`,
  );
  return rows.map(
    (r) =>
      ({
        ...toUser(r),
        clients: Number(r.n_clients),
        dossiers: Number(r.n_dossiers),
        open: Number(r.n_open),
        pendingAccess: Number(r.n_access),
        lastActivity: r.last_activity ? iso(r.last_activity) : undefined,
        managerName: opt(r.manager_name),
      }) as FirmRow,
  );
}

export async function assignManager(firmId: string, managerId: string | null) {
  await q(`UPDATE users SET manager_id = $2 WHERE id = $1 AND role = 'client'`, [firmId, managerId]);
}

export async function updateFirm(id: string, p: { company: string; name: string; phone?: string; vatNumber?: string }) {
  await q(`UPDATE users SET company = $2, name = $3, phone = $4, vat_number = $5 WHERE id = $1 AND role = 'client'`, [id, p.company, p.name, p.phone || null, p.vatNumber || null]);
}
