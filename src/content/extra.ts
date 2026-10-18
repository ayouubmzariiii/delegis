import type { Extra, Article } from './extra-types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './extra-fr';
import nl from './extra-nl';
import en from './extra-en';
import ar from './extra-ar';

const extras: Record<Lang, Extra> = { fr, nl, en, ar };

export function getExtra(locale: Locale): Extra {
  return extras[localeMeta[locale].lang];
}

export function getArticle(locale: Locale, slug: string) {
  return getExtra(locale).guides.articles.find((a) => a.slug === slug);
}

export function articleSlug(locale: Locale, id: Article['id']) {
  return getExtra(locale).guides.articles.find((a) => a.id === id)!.slug;
}
