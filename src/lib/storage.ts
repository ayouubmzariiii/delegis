import { promises as fs } from 'fs';
import path from 'path';

/**
 * File storage.
 * - Production (Vercel): Vercel Blob (BLOB_READ_WRITE_TOKEN). Keys get a random suffix and the
 *   blob URL is only ever read server-side by the authenticated download route.
 * - Local / CI: ./data/uploads on disk.
 * `stored` values are opaque references returned by putFile and accepted by readFile.
 */
const LOCAL_DIR = path.join(process.cwd(), 'data', 'uploads');

const blobEnabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;

/** Normalises a user-supplied file name into a safe key segment. */
export const safeName = (name: string) => name.replace(/[^\w.\-]+/g, '_').slice(-120) || 'file';

export async function putFile(key: string, body: Buffer | Uint8Array | string, contentType = 'application/octet-stream'): Promise<string> {
  const clean = key
    .split('/')
    .map((s) => safeName(s))
    .join('/');
  if (blobEnabled()) {
    const { put } = await import('@vercel/blob');
    const res = await put(clean, Buffer.from(body as Uint8Array), { access: 'public', addRandomSuffix: true, contentType });
    return res.url;
  }
  const full = path.join(LOCAL_DIR, clean);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, body);
  return `local:${clean}`;
}

/** Reads a stored file; returns null if missing or the reference is not one we issued. */
export async function readFile(stored: string): Promise<Buffer | null> {
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
