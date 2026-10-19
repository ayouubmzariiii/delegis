import 'server-only';
import crypto from 'crypto';

/**
 * AES-256-GCM encryption for shared credentials (accesses).
 * Key: ACCESS_ENCRYPTION_KEY if set, otherwise derived from AUTH_SECRET.
 * Format: v1:<iv>:<tag>:<ciphertext>, base64url.
 */
function key() {
  const raw = process.env.ACCESS_ENCRYPTION_KEY || process.env.AUTH_SECRET;
  if (!raw && process.env.NODE_ENV === 'production') throw new Error('ACCESS_ENCRYPTION_KEY or AUTH_SECRET must be set');
  return crypto.createHash('sha256').update(`delegis-vault:${raw || 'dev-only-secret-change-me'}`).digest();
}

export function seal(plain: string) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([c.update(plain, 'utf8'), c.final()]);
  return ['v1', iv, c.getAuthTag(), data].map((p) => (typeof p === 'string' ? p : p.toString('base64url'))).join(':');
}

export function open(sealed: string): string | null {
  const [v, iv, tag, data] = sealed.split(':');
  if (v !== 'v1' || !iv || !tag || data === undefined) return null;
  try {
    const d = crypto.createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64url'));
    d.setAuthTag(Buffer.from(tag, 'base64url'));
    return Buffer.concat([d.update(Buffer.from(data, 'base64url')), d.final()]).toString('utf8');
  } catch {
    return null;
  }
}
