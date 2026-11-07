/**
 * Whether the public demo (one-click client and team logins, fictional data) is switched on.
 * Off in production unless DEMO_ENABLED=true: the demo team account can open the back-office,
 * which would expose real clients' files once they exist. On by default in development.
 */
export function isDemoOn() {
  const flag = process.env.DEMO_ENABLED;
  if (flag) return flag === 'true';
  return process.env.NODE_ENV !== 'production';
}

/** Seeded demo accounts all use this domain (see seed.ts and demo.ts). */
export const isDemoEmail = (email: string) => email.toLowerCase().endsWith('@delegis.test');
