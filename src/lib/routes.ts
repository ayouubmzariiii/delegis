import { localeMeta, locales, type Locale } from './i18n';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { cities } from '@/content/cities';
import type { ServiceId } from '@/content/types';
import type { Article } from '@/content/extra-types';

/**
 * Single source of truth for every public URL.
 * Each builder returns the path WITHOUT the locale prefix so it can feed hreflang maps.
 */
export const paths = {
  home: () => '',
  services: () => '/services',
  service: (l: Locale, id: ServiceId) => `/services/${getDict(l).services.find((s) => s.id === id)!.slug}`,
  pricing: () => '/tarifs',
  firms: () => '/fiduciaires',
  method: () => '/methode',
  guides: () => '/guides',
  guide: (l: Locale, id: Article['id']) => `/guides/${getExtra(l).guides.articles.find((a) => a.id === id)!.slug}`,
  careers: () => '/carrieres',
  about: () => '/a-propos',
  contact: () => '/contact',
  privacy: () => '/rgpd',
  city: (l: Locale, id: string) => `/villes/${cities.find((c) => c.id === id)!.slug[localeMeta[l].lang]}`,
  login: () => '/login',
  portal: () => '/portal',
} as const;

/** Prefix a locale-less path with its locale. */
export const href = (l: Locale, path: string) => `/${l}${path}`;

/** Every indexable page as a function of locale — used by sitemap and the language switcher. */
export function allPages(): ((l: Locale) => string)[] {
  const fr = 'fr-be' as const;
  return [
    paths.home,
    paths.services,
    paths.pricing,
    paths.firms,
    paths.method,
    paths.guides,
    paths.careers,
    paths.about,
    paths.contact,
    paths.privacy,
    ...getDict(fr).services.map((s) => (l: Locale) => paths.service(l, s.id)),
    ...getExtra(fr).guides.articles.map((a) => (l: Locale) => paths.guide(l, a.id)),
    ...cities.map((c) => (l: Locale) => paths.city(l, c.id)),
  ];
}

/** Map of equivalent paths across locales, for the language switcher. */
export function alternatesTable(): Record<Locale, string>[] {
  return allPages().map((fn) => Object.fromEntries(locales.map((l) => [l, fn(l)])) as Record<Locale, string>);
}
