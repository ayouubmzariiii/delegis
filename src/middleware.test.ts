import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

const run = (path: string, lang = '') =>
  middleware(new NextRequest(`https://delegis.online${path}`, { headers: lang ? { 'accept-language': lang } : {} }));
const target = (res: Response) => new URL(res.headers.get('location')!).pathname + new URL(res.headers.get('location')!).search;

describe('middleware redirects', () => {
  it('keeps the language root temporary and language-aware', () => {
    expect(run('/').status).toBe(307);
    expect(target(run('/', 'nl-BE'))).toBe('/nl-be');
  });

  it('sends paths without a locale permanently to the default locale', () => {
    const res = run('/services/assistant-dedie', 'nl-BE');
    expect(res.status).toBe(308);
    expect(target(res)).toBe('/fr-be/services/assistant-dedie');
  });

  it('keeps the query string', () => {
    expect(target(run('/contact?service=vat'))).toBe('/fr-be/contact?service=vat');
  });
});
