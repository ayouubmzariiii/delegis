import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { locales, localeMeta } from './i18n';
import { organizationLd } from './seo';
import { officeLabel, site, telHref, toE164 } from './site';

const PHONE_E164 = '+212684199400';

/** Every value under `key`, anywhere in a JSON-LD tree. */
function collect(node: unknown, key: string, out: unknown[] = []): unknown[] {
  if (Array.isArray(node)) node.forEach((n) => collect(n, key, out));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === key) out.push(v);
      collect(v, key, out);
    }
  }
  return out;
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.ts$/.test(name) ? [p] : [];
  });
}

const SRC = path.resolve(__dirname, '..');
// Fictional demo workspace data (sample clients, invoices) is allowed to look made up.
const DEMO_FILES = /[\\/](lib[\\/](demo|seed)\.ts|content[\\/]demo-\w+\.ts)$/;
const publicSources = sourceFiles(SRC).filter((f) => !DEMO_FILES.test(f));

describe('contact details', () => {
  it('uses the Delegis number, in E.164 for machines', () => {
    expect(site.phone).toBe('+212 684199400');
    expect(site.phoneE164).toBe(PHONE_E164);
    expect(telHref(site.phone)).toBe(`tel:${PHONE_E164}`);
  });

  it('normalises displayed numbers for tel: links', () => {
    expect(toE164('+32 2 588 14 20')).toBe('+3225881420');
    expect(toE164('+212 684-199-400')).toBe(PHONE_E164);
    expect(telHref('+212 684 199 400')).toBe(`tel:${PHONE_E164}`);
  });

  it('keeps locations at city level, with no street, postcode or coordinates', () => {
    for (const o of site.offices) {
      expect(Object.keys(o).sort()).toEqual(['city', 'country', 'id']);
    }
  });

  it('names every location in each locale’s language', () => {
    for (const l of locales) {
      for (const o of site.offices) {
        const { city, country } = officeLabel(o, localeMeta[l].lang);
        expect(city).toBeTruthy();
        expect(country).not.toBe(o.country);
      }
    }
    expect(officeLabel(site.offices[1], 'fr')).toEqual({ city: 'Casablanca', country: 'Maroc' });
    expect(officeLabel(site.offices[1], 'en')).toEqual({ city: 'Casablanca', country: 'Morocco' });
    expect(officeLabel(site.offices[0], 'nl')).toEqual({ city: 'Brussel', country: 'België' });
  });

  it('does not show a VAT number until a real one is set', () => {
    expect(site.vat).toBeUndefined();
  });
});

describe('organization structured data', () => {
  for (const l of locales) {
    describe(l, () => {
      const ld = organizationLd(l);
      const graph = ld['@graph'] as Record<string, unknown>[];

      it('is plain, serialisable schema.org JSON-LD', () => {
        expect(ld['@context']).toBe('https://schema.org');
        expect(JSON.parse(JSON.stringify(ld))).toEqual(ld);
        for (const node of graph) {
          expect(typeof node['@type']).toBe('string');
          expect(String(node['@id'])).toMatch(new RegExp(`^${site.url}/#\\w+$`));
        }
        const ids = graph.map((n) => n['@id']);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it('only references nodes that exist', () => {
        const ids = new Set(graph.map((n) => n['@id']));
        const refs = [...collect(ld, 'parentOrganization'), ...collect(ld, 'publisher')] as { '@id': string }[];
        expect(refs.length).toBeGreaterThan(0);
        for (const r of refs) expect(ids.has(r['@id'])).toBe(true);
      });

      it('gives one telephone everywhere, in E.164', () => {
        const phones = collect(ld, 'telephone');
        expect(phones.length).toBeGreaterThan(0);
        expect(new Set(phones)).toEqual(new Set([PHONE_E164]));
      });

      it('has city-level addresses only', () => {
        expect(collect(ld, 'streetAddress')).toEqual([]);
        expect(collect(ld, 'postalCode')).toEqual([]);
        expect(collect(ld, 'geo')).toEqual([]);
        const addresses = collect(ld, 'address') as Record<string, string>[];
        expect(addresses).toHaveLength(site.offices.length);
        for (const a of addresses) {
          expect(a['@type']).toBe('PostalAddress');
          expect(a.addressLocality).toBeTruthy();
          expect(a.addressCountry).toMatch(/^[A-Z]{2}$/);
        }
      });
    });
  }
});

describe('no placeholder contact details in the site', () => {
  const PLACEHOLDERS = [/000 00 00/, /\b0000[.\s]000[.\s]000\b/, /Avenue Louise/i, /Boulevard d.Anfa/i, /\+32 2 /, /\+212 5 22/, /streetAddress/];

  it.each(publicSources.map((f) => [path.relative(SRC, f), f]))('%s', (_, file) => {
    const text = readFileSync(file, 'utf8');
    for (const re of PLACEHOLDERS) expect(text, `${re} in ${file}`).not.toMatch(re);
  });

  it('builds every tel: link through telHref', () => {
    const raw = publicSources.filter((f) => !f.endsWith(`${path.sep}site.ts`) && /tel:/.test(readFileSync(f, 'utf8')));
    expect(raw.map((f) => path.relative(SRC, f))).toEqual([]);
  });
});
