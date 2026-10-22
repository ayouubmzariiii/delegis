import { describe, expect, it, vi } from 'vitest';
import { q } from './sql';

// The contact form's server action only needs Next's request helpers to be importable.
vi.mock('next/headers', () => ({ cookies: async () => ({ get: () => undefined, set: () => {}, delete: () => {} }) }));
vi.mock('next/navigation', () => ({ redirect: () => { throw new Error('redirect'); } }));
vi.mock('next/cache', () => ({ revalidatePath: () => {} }));

const { submitLead } = await import('./actions');

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
