import { afterEach, describe, expect, it, vi } from 'vitest';
import { q } from './sql';

// The contact form's server action only needs Next's request helpers to be importable.
vi.mock('next/headers', () => ({ cookies: async () => ({ get: () => undefined, set: () => {}, delete: () => {} }) }));
vi.mock('next/navigation', () => ({ redirect: () => { throw new Error('redirect'); } }));
vi.mock('next/cache', () => ({ revalidatePath: () => {} }));

const { submitLead, login } = await import('./actions');
const { listLeads } = await import('./db');

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const valid = { locale: 'nl-be', name: 'Jan Peeters', company: 'Peeters BV', email: 'jan@peeters.be', phone: '+32 470 12 34 56', service: 'encoding', message: 'Hallo', consent: 'on' };
type Row = { locale: string; data: Record<string, string> };
const leads = async (email = valid.email) => (await q(`SELECT locale, data FROM leads WHERE data->>'email' = $1`, [email])) as Row[];

describe('contact form', () => {
  it('stores a valid request with its locale', async () => {
    const before = (await leads()).length;
    expect(await submitLead(undefined, form(valid))).toEqual({ ok: true });
    const rows = await leads();
    expect(rows).toHaveLength(before + 1);
    const last = rows.find((r) => r.data.message === 'Hallo')!;
    expect(last.locale).toBe('nl-be');
    expect(last.data).toMatchObject({ name: 'Jan Peeters', email: 'jan@peeters.be', phone: '+32 470 12 34 56', service: 'encoding', message: 'Hallo' });
  });

  it('rejects a bad e-mail, a missing name or missing consent', async () => {
    const before = (await leads()).length;
    expect(await submitLead(undefined, form({ ...valid, email: 'not-an-email' }))).toEqual({ error: 'invalid' });
    expect(await submitLead(undefined, form({ ...valid, name: '  ' }))).toEqual({ error: 'invalid' });
    const noConsent = form(valid);
    noConsent.delete('consent');
    expect(await submitLead(undefined, noConsent)).toEqual({ error: 'invalid' });
    expect(await leads()).toHaveLength(before);
  });

  it('quietly drops bots that fill the honeypot', async () => {
    const before = (await leads()).length;
    expect(await submitLead(undefined, form({ ...valid, website: 'http://spam.example' }))).toEqual({ ok: true });
    expect(await leads()).toHaveLength(before);
  });

  it('falls back to the default locale and trims long fields', async () => {
    await submitLead(undefined, form({ ...valid, email: 'long@peeters.be', locale: 'xx', message: 'a'.repeat(5000) }));
    const [last] = await leads('long@peeters.be');
    expect(last.locale).toBe('fr-be');
    expect(last.data.message).toHaveLength(2000);
  });
});

describe('contact requests for the team', () => {
  it('are listed newest first in the back-office', async () => {
    await submitLead(undefined, form({ ...valid, email: 'first@client.be', message: 'Premier' }));
    await new Promise((r) => setTimeout(r, 5));
    await submitLead(undefined, form({ ...valid, email: 'second@client.be', message: 'Second' }));
    const emails = (await listLeads()).map((l) => l.data.email);
    expect(emails.indexOf('second@client.be')).toBeLessThan(emails.indexOf('first@client.be'));
    expect((await listLeads()).find((l) => l.data.email === 'second@client.be')).toMatchObject({ locale: 'nl-be', data: { message: 'Second' } });
  });

  it('are e-mailed through Resend when configured, with reply-to set to the prospect', async () => {
    const fetchMock = vi.fn(async () => new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'team@example.com');
    expect(await submitLead(undefined, form({ ...valid, email: 'mail@client.be' }))).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.resend.com/emails');
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ to: ['team@example.com'], reply_to: 'mail@client.be' });
    expect(body.subject).toContain('Peeters BV');
    expect(body.text).toContain('Hallo');
  });

  it('are not e-mailed without configuration, and a failing e-mail never loses the request', async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error('network down');
    });
    vi.stubGlobal('fetch', fetchMock);
    expect(await submitLead(undefined, form({ ...valid, email: 'quiet@client.be' }))).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();

    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'team@example.com');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await submitLead(undefined, form({ ...valid, email: 'down@client.be' }))).toEqual({ ok: true });
    expect(await leads('down@client.be')).toHaveLength(1);
  });
});

describe('demo accounts', () => {
  it('cannot sign in while the demo is off, even with the right password', async () => {
    const { createUser } = await import('./db');
    const bcrypt = (await import('bcryptjs')).default;
    await createUser({ email: 'sales.demo@delegis.test', name: 'Demo', company: 'Demo', passwordHash: await bcrypt.hash('demo-pass-123', 4) });
    const attempt = () => login(undefined, form({ email: 'sales.demo@delegis.test', password: 'demo-pass-123', locale: 'fr-be' }));

    vi.stubEnv('DEMO_ENABLED', 'true');
    await expect(attempt()).rejects.toThrow('redirect'); // signed in, sent to the portal

    vi.stubEnv('DEMO_ENABLED', 'false');
    expect(await attempt()).toEqual({ error: 'invalid' });
  });
});
