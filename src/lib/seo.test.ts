import { describe, expect, it } from 'vitest';
import { locales } from './i18n';
import { allPages } from './routes';
import { ogKey, sitePages } from './pages';
import { buildMetadata } from './seo';

/** Every indexable page's [id, title, description] for a locale. */
const metas = (l: (typeof locales)[number]): [string, string, string][] =>
  sitePages(l)
    .filter((p) => p.indexable)
    .map((p) => [p.id, p.title, p.description]);

describe('SEO metadata', () => {
  for (const l of locales) {
    describe(l, () => {
      const rows = metas(l);

      it('keeps titles within 60 characters', () => {
        const long = rows.filter(([, title]) => title.length > 60).map(([id, title]) => `${id} (${title.length}): ${title}`);
        expect(long).toEqual([]);
      });

      it('keeps descriptions between 70 and 160 characters', () => {
        const bad = rows.filter(([, , d]) => d.length < 70 || d.length > 160).map(([id, , d]) => `${id} (${d.length})`);
        expect(bad).toEqual([]);
      });

      it('has unique titles and descriptions', () => {
        expect(new Set(rows.map((r) => r[1])).size).toBe(rows.length);
        expect(new Set(rows.map((r) => r[2])).size).toBe(rows.length);
      });
    });
  }

  it('never reuses a title or description across locales', () => {
    const all = locales.flatMap((l) => metas(l).map(([id, title, d]) => ({ key: `${l}:${id}`, title, d })));
    const dupes = (k: 'title' | 'd') =>
      Object.values(Object.groupBy(all, (r) => r[k]))
        .filter((g) => g!.length > 1)
        .map((g) => g!.map((r) => r.key).join(' = '));
    expect(dupes('title')).toEqual([]);
    expect(dupes('d')).toEqual([]);
  });

  it('lists exactly the pages in the sitemap', () => {
    for (const l of locales) {
      expect(sitePages(l).filter((p) => p.indexable).map((p) => p.path).sort()).toEqual(allPages().map((fn) => fn(l)).sort());
    }
  });

  it('gives every page its own share image', () => {
    for (const l of locales) {
      const pages = sitePages(l);
      expect(new Set(pages.map((p) => ogKey(p.path))).size).toBe(pages.length);
      for (const p of pages) {
        const og = buildMetadata({ locale: l, pathFor: () => p.path, title: p.title, description: p.description }).openGraph!;
        expect(og.images).toEqual([expect.objectContaining({ url: expect.stringMatching(new RegExp(`/og/${l}/${ogKey(p.path).replace(/[~.]/g, '\\$&')}\\.png$`)), width: 1200, height: 630 })]);
      }
    }
  });
});
