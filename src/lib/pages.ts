import { localeMeta, type Locale } from './i18n';
import { paths } from './routes';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { cities } from '@/content/cities';
import { cityDescription } from '@/content/city-local';

/** A public page as search engines and link previews see it. */
export type PageInfo = {
  id: string;
  path: string; // without the locale prefix
  title: string; // <title>
  description: string;
  heading: string; // headline on the share image
  section: string; // small label above it
  indexable: boolean;
};

/** Every public page of a locale, with its search snippet and share-image text. */
export function sitePages(l: Locale): PageInfo[] {
  const t = getDict(l);
  const x = getExtra(l);
  const lang = localeMeta[l].lang;
  const fill = (s: string, c: string) => s.replaceAll('{city}', c);
  const page = (id: string, path: string, title: string, description: string, heading: string, section: string, indexable = true): PageInfo => ({ id, path, title, description, heading, section, indexable });
  return [
    page('home', paths.home(), t.home.metaTitle, t.home.metaDescription, `${t.home.title} ${t.home.highlight}`, t.home.kicker),
    page('services', paths.services(), t.servicesPage.metaTitle, t.servicesPage.metaDescription, t.servicesPage.h1, t.nav.services),
    page('pricing', paths.pricing(), t.pricing.metaTitle, t.pricing.metaDescription, t.pricing.h1, t.nav.pricing),
    page('about', paths.about(), t.about.metaTitle, t.about.metaDescription, t.about.h1, t.nav.about),
    page('contact', paths.contact(), t.contact.metaTitle, t.contact.metaDescription, t.contact.h1, t.nav.contact),
    page('privacy', paths.privacy(), t.privacy.metaTitle, t.privacy.metaDescription, t.privacy.h1, t.privacy.h1),
    page('firms', paths.firms(), x.firms.metaTitle, x.firms.metaDescription, x.firms.h1, x.nav.firms),
    page('method', paths.method(), x.method.metaTitle, x.method.metaDescription, x.method.h1, x.nav.method),
    page('careers', paths.careers(), x.careers.metaTitle, x.careers.metaDescription, x.careers.h1, x.nav.careers),
    page('guides', paths.guides(), x.guides.metaTitle, x.guides.metaDescription, x.guides.h1, x.nav.guides),
    ...t.services.map((s) => page(`service:${s.id}`, paths.service(l, s.id), s.metaTitle, s.metaDescription, s.h1, t.nav.services)),
    ...x.guides.articles.map((a) => page(`guide:${a.id}`, paths.guide(l, a.id), a.metaTitle, a.metaDescription, a.title, x.nav.guides)),
    ...cities.map((c) =>
      page(`city:${c.id}`, paths.city(l, c.id), fill(t.cities.metaTitle, c.name[lang]), cityDescription(l, c.id, c.name[lang]), fill(t.cities.h1, c.name[lang]), c.name[lang]),
    ),
    page('login', paths.login(), t.auth.loginMetaTitle, t.auth.loginText, t.auth.loginTitle, t.nav.login, false),
  ];
}

/** Share-image file name for a page path: '' → 'home', '/services/x' → 'services~x'. */
export const ogKey = (path: string) => (path ? path.slice(1).replaceAll('/', '~') : 'home');
