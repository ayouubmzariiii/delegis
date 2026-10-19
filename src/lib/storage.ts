import { promises as fs } from 'fs';
import crypto from 'crypto';
import path from 'path';
import { q } from './sql';

/**
 * File storage, picked from the environment:
 * - BLOB_READ_WRITE_TOKEN set: Vercel Blob. Keys get a random suffix and the blob URL is only
 *   ever read server-side by the authenticated download route.
 * - DATABASE_URL set (e.g. Vercel with Neon only): in Postgres, table `stored_files`.
 *   Serverless filesystems are read-only, so the disk is never used there.
 * - Otherwise (local dev): ./data/uploads on disk.
 * `stored` values are opaque references returned by putFile and accepted by readFile.
 */
const LOCAL_DIR = path.join(process.cwd(), 'data', 'uploads');

const blobEnabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const dbEnabled = () => !!process.env.DATABASE_URL || process.env.DELEGIS_STORAGE === 'db';

/** Normalises a user-supplied file name into a safe key segment. */
export const safeName = (name: string) => name.replace(/[^\w.\-]+/g, '_').slice(-120) || 'file';

export async function putFile(key: string, body: Buffer | Uint8Array | string, contentType = 'application/octet-stream'): Promise<string> {
  const clean = key
    .split('/')
    .map((s) => safeName(s))
    .join('/');
  const buf = typeof body === 'string' ? Buffer.from(body) : Buffer.from(body);
  if (blobEnabled()) {
    const { put } = await import('@vercel/blob');
    const res = await put(clean, buf, { access: 'public', addRandomSuffix: true, contentType });
    return res.url;
  }
  if (dbEnabled()) {
    const id = crypto.randomUUID();
    // Base64 text keeps the value portable across the Neon HTTP driver and PGlite.
    await q(`INSERT INTO stored_files (id, key, content_type, data) VALUES ($1, $2, $3, $4)`, [id, clean, contentType, buf.toString('base64')]);
    return `db:${id}`;
  }
  const full = path.join(LOCAL_DIR, clean);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, buf);
  return `local:${clean}`;
}

/** Reads a stored file; returns null if missing or the reference is not one we issued. */
export async function readFile(stored: string): Promise<Buffer | null> {
  if (stored.startsWith('db:')) {
    const [r] = await q<{ data: string }>(`SELECT data FROM stored_files WHERE id = $1`, [stored.slice(3)]);
    return r ? Buffer.from(r.data, 'base64') : null;
  }
  if (stored.startsWith('local:')) {
    const full = path.resolve(LOCAL_DIR, stored.slice('local:'.length));
    if (!full.startsWith(path.resolve(LOCAL_DIR) + path.sep)) return null; // no path traversal
    try {
      return await fs.readFile(full);
    } catch {
      return null;
    }
  }
  if (/^https:\/\/[\w.-]+\.blob\.vercel-storage\.com\//.test(stored)) {
    const res = await fetch(stored);
    return res.ok ? Buffer.from(await res.arrayBuffer()) : null;
  }
  return null;
}
