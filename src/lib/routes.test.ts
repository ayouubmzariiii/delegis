import { describe, expect, it } from 'vitest';
import { locales } from './i18n';
import { allPages, alternatesTable, paths } from './routes';

describe('routes', () => {
  it('produces unique, ASCII, lowercase paths in every locale', () => {
    for (const l of locales) {
      const all = allPages().map((fn) => fn(l));
      expect(new Set(all).size).toBe(all.length);
      for (const p of all) expect(p).toMatch(/^(\/[a-z0-9-]+)*$/);
    }
  });

  it('localizes service slugs', () => {
    expect(paths.service('fr-be', 'encoding')).not.toBe(paths.service('nl-be', 'encoding'));
  });

  it('builds a complete alternates table', () => {
    for (const row of alternatesTable()) expect(Object.keys(row).sort()).toEqual([...locales].sort());
  });
});
