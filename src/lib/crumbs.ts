import type { Locale } from './i18n';
import { href } from './routes';
import { absUrl } from './seo';
import { getDict } from '@/content';
import type { Crumb } from '@/components/sections/PageHeader';

/** Build breadcrumbs from [name, localeLessPath] pairs; Home is prepended automatically. */
export function crumbs(locale: Locale, ...items: [string, string][]): Crumb[] {
  return [[getDict(locale).common.home, ''] as [string, string], ...items].map(([name, p]) => ({
    name,
    href: href(locale, p),
    url: absUrl(locale, p),
  }));
}
