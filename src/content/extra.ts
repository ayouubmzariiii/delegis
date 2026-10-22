import type { Extra, Article } from './extra-types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './extra-fr';
import nl from './extra-nl';
import en from './extra-en';
import ar from './extra-ar';
import { frMaArticles, frMaPages } from './fr-ma';

const extras: Record<Lang, Extra> = { fr, nl, en, ar };

// French pages for Morocco share the fr copy, with their own search snippets (see fr-ma.ts).
const frMa: Extra = {
  ...fr,
  firms: { ...fr.firms, ...frMaPages.firms },
  method: { ...fr.method, ...frMaPages.method },
  careers: { ...fr.careers, ...frMaPages.careers },
  guides: { ...fr.guides, ...frMaPages.guides, articles: fr.guides.articles.map((a) => ({ ...a, ...frMaArticles[a.id] })) },
};

export function getExtra(locale: Locale): Extra {
  return locale === 'fr-ma' ? frMa : extras[localeMeta[locale].lang];
}

export function getArticle(locale: Locale, slug: string) {
  return getExtra(locale).guides.articles.find((a) => a.slug === slug);
}

export function articleSlug(locale: Locale, id: Article['id']) {
  return getExtra(locale).guides.articles.find((a) => a.id === id)!.slug;
}
