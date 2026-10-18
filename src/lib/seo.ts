import type { Metadata } from 'next';
import { locales, localeMeta, defaultLocale, type Locale } from './i18n';
import { site } from './site';

/** Returns the localized path WITHOUT the locale prefix ('' for the home page). */
export type PathFor = (l: Locale) => string;

export const absUrl = (locale: Locale, path: string) => `${site.url}/${locale}${path}`;

export function buildMetadata({
  locale,
  pathFor,
  title,
  description,
  noindex,
}: {
  locale: Locale;
  pathFor: PathFor;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].hreflang] = absUrl(l, pathFor(l));
  languages['x-default'] = absUrl(defaultLocale, pathFor(defaultLocale));
  const url = absUrl(locale, pathFor(locale));
  return {
    title: { absolute: title },
    description,
    alternates: noindex ? undefined : { canonical: url, languages },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${site.url}/og.png`] },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export function organizationLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#org`,
        name: site.name,
        url: site.url,
        logo: { '@type': 'ImageObject', url: `${site.url}/logo.svg`, width: 512, height: 512 },
        image: `${site.url}/og.png`,
        email: site.email,
        description: 'Back-office comptable externalisé pour entreprises et fiduciaires en Belgique et au Maroc.',
        foundingLocation: { '@type': 'Place', name: 'Bruxelles, Belgique' },
        contactPoint: site.offices.map((o) => ({ '@type': 'ContactPoint', contactType: 'sales', telephone: o.phone, email: site.email, areaServed: o.country, availableLanguage: o.country === 'BE' ? ['fr', 'nl', 'en'] : ['fr', 'ar', 'en'] })),
        sameAs: [site.social.linkedin],
        areaServed: [
          { '@type': 'Country', name: 'Belgium' },
          { '@type': 'Country', name: 'Morocco' },
        ],
        knowsLanguage: ['fr', 'nl', 'en', 'ar'],
      },
      ...site.offices.map((o) => ({
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#${o.id}`,
        name: `${site.name} ${o.city}`,
        parentOrganization: { '@id': `${site.url}/#org` },
        url: absUrl(locale, ''),
        image: `${site.url}/og.png`,
        telephone: o.phone,
        email: site.email,
        priceRange: '€€',
        address: { '@type': 'PostalAddress', streetAddress: o.street, postalCode: o.postalCode, addressLocality: o.city, addressCountry: o.country },
        geo: { '@type': 'GeoCoordinates', latitude: o.lat, longitude: o.lng },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
      })),
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': `${site.url}/#org` },
        inLanguage: localeMeta[locale].hreflang,
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceLd({ name, description, url, price }: { name: string; description: string; url: string; price?: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': `${site.url}/#org` },
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Morocco' },
    ],
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price,
            priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
          },
        }
      : {}),
  };
}

/** ItemList of services for hub pages. */
export function itemListLd(name: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
  };
}

/** Local service page: the same offer, scoped to one city. */
export function localServiceLd({ name, description, url, city, country }: { name: string; description: string; url: string; city: string; country: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType: 'Accounting back-office outsourcing',
    provider: { '@id': `${site.url}/#org` },
    areaServed: { '@type': 'City', name: city, containedInPlace: { '@type': 'Country', name: country } },
  };
}
