import type { Dict, ServiceCategory, ServiceId } from './types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './fr';
import nl from './nl';
import en from './en';
import ar from './ar';
import { frMaPages, frMaServices } from './fr-ma';

const dicts: Record<Lang, Dict> = { fr, nl, en, ar };

// Market override: French pages for Morocco also speak to Moroccan companies.
const frMa: Dict = {
  ...fr,
  home: {
    ...fr.home,
    metaTitle: 'Externalisation comptable au Maroc & Belgique | Delegis',
    metaDescription:
      'Saisie comptable, back-office et service client externalisés depuis Casablanca pour entreprises marocaines et belges. Équipe francophone, offre en 24 h.',
    kicker: 'Externalisation B2B · Maroc & Belgique',
    text:
      'Depuis Casablanca, Delegis prend en charge la saisie comptable, le back-office administratif et le service client des entreprises marocaines et belges. Vous déposez, nous traitons, vous validez.',
  },
  servicesPage: { ...fr.servicesPage, ...frMaPages.services },
  pricing: { ...fr.pricing, ...frMaPages.pricing },
  about: { ...fr.about, ...frMaPages.about },
  contact: { ...fr.contact, ...frMaPages.contact },
  privacy: { ...fr.privacy, ...frMaPages.privacy },
  cities: { ...fr.cities, ...frMaPages.cities },
  services: fr.services.map((s) => ({ ...s, ...frMaServices[s.id] })),
};

export function getDict(locale: Locale): Dict {
  if (locale === 'fr-ma') return frMa;
  return dicts[localeMeta[locale].lang];
}

export const serviceCategory: Record<ServiceId, ServiceCategory> = {
  encoding: 'accounting',
  bank: 'accounting',
  vat: 'accounting',
  closing: 'accounting',
  peppol: 'accounting',
  credit: 'accounting',
  payroll: 'payroll',
  'data-entry': 'data',
  migration: 'data',
  customer: 'customer',
  ecommerce: 'customer',
  rescue: 'special',
  dedicated: 'special',
};

/** "From" price per service, for Offer schema and cards (EUR excl. VAT). */
export const servicePriceFrom: Partial<Record<ServiceId, number>> = {
  encoding: 0.8,
  bank: 0.15,
  vat: 45,
  peppol: 29,
  payroll: 4,
  'data-entry': 1.5,
  credit: 22,
  closing: 22,
  migration: 22,
  customer: 22,
  ecommerce: 22,
  rescue: 490,
  dedicated: 1690,
};

export function getService(locale: Locale, slug: string) {
  return getDict(locale).services.find((s) => s.slug === slug);
}

export function serviceSlug(locale: Locale, id: ServiceId) {
  return getDict(locale).services.find((s) => s.id === id)!.slug;
}
