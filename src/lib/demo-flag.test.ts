import { afterEach, describe, expect, it, vi } from 'vitest';
import { isDemoEmail, isDemoOn } from './demo-flag';

afterEach(() => vi.unstubAllEnvs());

describe('demo switch', () => {
  it('is off in production unless explicitly turned on', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('DEMO_ENABLED', '');
    expect(isDemoOn()).toBe(false);
    vi.stubEnv('DEMO_ENABLED', 'true');
    expect(isDemoOn()).toBe(true);
  });

  it('is on in development unless explicitly turned off', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('DEMO_ENABLED', '');
    expect(isDemoOn()).toBe(true);
    vi.stubEnv('DEMO_ENABLED', 'false');
    expect(isDemoOn()).toBe(false);
  });

  it('recognises the seeded demo accounts', () => {
    expect(isDemoEmail('demo@delegis.test')).toBe(true);
    expect(isDemoEmail('Thomas.Lambert@DELEGIS.test')).toBe(true);
    expect(isDemoEmail('client@example.be')).toBe(false);
  });
});
