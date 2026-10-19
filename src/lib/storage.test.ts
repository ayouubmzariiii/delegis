import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { putFile, readFile } from './storage';

/** Postgres file storage: what Vercel uses when no Blob store is connected. */
describe('database file storage', () => {
  beforeAll(() => {
    process.env.DELEGIS_STORAGE = 'db';
  });
  afterAll(() => {
    delete process.env.DELEGIS_STORAGE;
  });

  it('stores and reads back binary files byte for byte', async () => {
    const body = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x00, 0xff, 0x10]);
    const ref = await putFile('user-1/dossier/scan 01.pdf', body, 'application/pdf');
    expect(ref).toMatch(/^db:/);
    expect(await readFile(ref)).toEqual(body);
  });

  it('returns null for unknown references', async () => {
    expect(await readFile('db:does-not-exist')).toBeNull();
    expect(await readFile('https://evil.example.com/x')).toBeNull();
  });
});
