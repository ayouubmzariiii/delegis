import { describe, expect, it } from 'vitest';
import { locales, localeMeta, type Locale } from './i18n';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { cities } from '@/content/cities';

/** Every indexable page's [title, description] for a locale. */
function metas(l: Locale): [string, string, string][] {
  const t = getDict(l);
  const x = getExtra(l);
  const lang = localeMeta[l].lang;
  const fill = (s: string, c: string) => s.replaceAll('{city}', c);
  return [
    ['home', t.home.metaTitle, t.home.metaDescription],
    ['services', t.servicesPage.metaTitle, t.servicesPage.metaDescription],
    ['pricing', t.pricing.metaTitle, t.pricing.metaDescription],
    ['about', t.about.metaTitle, t.about.metaDescription],
    ['contact', t.contact.metaTitle, t.contact.metaDescription],
    ['privacy', t.privacy.metaTitle, t.privacy.metaDescription],
    ['firms', x.firms.metaTitle, x.firms.metaDescription],
    ['method', x.method.metaTitle, x.method.metaDescription],
    ['careers', x.careers.metaTitle, x.careers.metaDescription],
    ['guides', x.guides.metaTitle, x.guides.metaDescription],
    ...t.services.map((s) => [`service:${s.id}`, s.metaTitle, s.metaDescription] as [string, string, string]),
    ...x.guides.articles.map((a) => [`guide:${a.id}`, a.metaTitle, a.metaDescription] as [string, string, string]),
    ...cities.map((c) => [`city:${c.id}`, fill(t.cities.metaTitle, c.name[lang]), fill(t.cities.metaDescription, c.name[lang])] as [string, string, string]),
  ];
}

describe('SEO metadata', () => {
  for (const l of locales) {
    describe(l, () => {
      const rows = metas(l);

      it('keeps titles within 65 characters', () => {
        const long = rows.filter(([, title]) => title.length > 65).map(([id, title]) => `${id} (${title.length}): ${title}`);
        expect(long).toEqual([]);
      });

      it('keeps descriptions between 70 and 170 characters', () => {
        const bad = rows.filter(([, , d]) => d.length < 70 || d.length > 170).map(([id, , d]) => `${id} (${d.length})`);
        expect(bad).toEqual([]);
      });

      it('has unique titles and descriptions', () => {
        expect(new Set(rows.map((r) => r[1])).size).toBe(rows.length);
        expect(new Set(rows.map((r) => r[2])).size).toBe(rows.length);
      });
    });
  }
});
