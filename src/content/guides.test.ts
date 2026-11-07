import { describe, expect, it } from 'vitest';
import { locales } from '@/lib/i18n';
import { getDict } from '@/content';
import { getExtra, articleServices } from '@/content/extra';
import { linkTarget } from '@/components/ui/RichText';

const LINK = /\[([^\]]+)\]\((service|guide|page):([\w-]+)\)/g;
const shape = (l: (typeof locales)[number]) =>
  getExtra(l).guides.articles.map((a) => ({
    id: a.id,
    sections: a.sections.map((s) => [s.paragraphs.length, s.bullets?.length ?? 0]),
    links: a.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]).flatMap((t) => [...t.matchAll(LINK)].map((m) => `${m[2]}:${m[3]}`)),
    faq: a.faq?.length ?? 0,
  }));

describe('guides', () => {
  it('have the same articles, structure and inline links in every locale', () => {
    const ref = shape('fr-be');
    for (const l of locales) expect(shape(l), l).toEqual(ref);
  });

  it('only link to services, guides and pages that exist', () => {
    for (const l of locales) {
      const ids = new Set(getExtra(l).guides.articles.map((a) => a.id));
      const services = new Set(getDict(l).services.map((s) => s.id));
      for (const a of getExtra(l).guides.articles) {
        for (const t of a.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])])) {
          for (const m of t.matchAll(LINK)) {
            if (m[2] === 'service') expect(services.has(m[3] as never), `${l} ${a.id} ${m[0]}`).toBe(true);
            if (m[2] === 'guide') expect(ids.has(m[3] as never), `${l} ${a.id} ${m[0]}`).toBe(true);
            expect(() => linkTarget(l, m[2], m[3])).not.toThrow();
          }
        }
      }
    }
  });

  it('never leave unparsed link markup in the text', () => {
    for (const l of locales)
      for (const a of getExtra(l).guides.articles)
        for (const t of a.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])])) expect(t.replace(LINK, ''), `${l} ${a.id}`).not.toMatch(/\]\(|\[[^\]]*\]\(/);
  });

  it('map every guide to existing services', () => {
    const services = new Set(getDict('fr-be').services.map((s) => s.id));
    for (const ids of Object.values(articleServices)) for (const id of ids) expect(services.has(id)).toBe(true);
  });
});
