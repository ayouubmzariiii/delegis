import type { Lang } from './i18n';
import { cities } from '@/content/cities';

/** Turns a displayed phone number into its E.164 form for tel: links and structured data. */
export const toE164 = (phone: string) => phone.replace(/[^\d+]/g, '');
export const telHref = (phone: string) => `tel:${toE164(phone)}`;

const phone = '+212 684199400';

export const site = {
  name: 'Delegis',
  url: (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) || 'https://www.delegis.be').replace(/\/$/, ''),
  email: 'hello@delegis.be',
  phone,
  phoneE164: toE164(phone),
  // The team works remotely: locations stay at city level, with no street address or coordinates.
  offices: [
    { id: 'brussels', city: 'Bruxelles', country: 'BE' },
    { id: 'casablanca', city: 'Casablanca', country: 'MA' },
  ],
  // Set once the company number is registered; nothing is shown until then.
  vat: undefined as string | undefined,
  // Date of the last real content change; feeds sitemap lastmod. Update it when copy changes.
  contentUpdated: '2026-10-22',
  social: { linkedin: 'https://www.linkedin.com/company/delegis' },
};

export type Office = (typeof site.offices)[number];

/** City and country names in the page's language, e.g. "Casablanca" and "Morocco". */
export function officeLabel(o: Office, lang: Lang) {
  const city = cities.find((c) => c.id === o.id)?.name[lang] ?? o.city;
  const country = new Intl.DisplayNames([lang], { type: 'region' }).of(o.country) ?? o.country;
  return { city, country };
}
