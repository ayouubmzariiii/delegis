import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, isLocale, localeMeta, type Locale } from '@/lib/i18n';
import { absUrl, buildMetadata } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { site } from '@/lib/site';
import { getDict } from '@/content';
import { getExtra, getArticle } from '@/content/extra';
import { Breadcrumbs } from '@/components/sections/PageHeader';
import { Container, Section, Eyebrow } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';

type P = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getExtra(locale).guides.articles.map((a) => ({ locale, slug: a.slug })));
}

async function load(params: P['params']) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const a = getArticle(locale, slug);
  if (!a) notFound();
  return { locale: locale as Locale, a };
}

export async function generateMetadata({ params }: P) {
  const { locale, a } = await load(params);
  const meta = buildMetadata({ locale, pathFor: (l) => paths.guide(l, a.id), title: a.metaTitle, description: a.metaDescription });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: a.date, modifiedTime: a.date } };
}

const anchor = (i: number) => `s${i + 1}`;

export default async function ArticlePage({ params }: P) {
  const { locale, a } = await load(params);
  const t = getDict(locale);
  const x = getExtra(locale);
  const g = x.guides;
  const path = paths.guide(locale, a.id);
  const df = new Intl.DateTimeFormat(localeMeta[locale].hreflang, { dateStyle: 'long' });

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.metaDescription,
          datePublished: a.date,
          dateModified: a.date,
          inLanguage: localeMeta[locale].hreflang,
          mainEntityOfPage: absUrl(locale, path),
          image: `${site.url}/og.png`,
          author: { '@type': 'Organization', name: site.name, url: site.url },
          publisher: { '@id': `${site.url}/#org` },
        }}
      />
      <article>
        <header className="border-b border-line">
          <Container className="pb-16 pt-10">
            <Breadcrumbs items={crumbs(locale, [x.nav.guides, paths.guides()], [a.title, path])} />
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <Eyebrow>
                <time dateTime={a.date}>{df.format(new Date(a.date))}</time> · {a.readingMinutes} {g.minutes}
              </Eyebrow>
              <h1 className="mt-6 text-display-lg font-semibold">{a.title}</h1>
              <p className="mt-6 font-display text-2xl leading-snug text-ink-600">{a.excerpt}</p>
            </div>
          </Container>
        </header>

        <Container className="grid gap-12 py-16 lg:grid-cols-12">
          <nav aria-label={g.tocTitle} className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{g.tocTitle}</p>
              <ol className="mt-4 space-y-1 text-sm">
                {a.sections.map((s, i) => (
                  <li key={s.h2}>
                    <a href={`#${anchor(i)}`} className="flex gap-3 py-1.5 text-ink-600 hover:text-ink">
                      <span className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, '0')}</span>
                      {s.h2}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-[42rem] lg:col-span-7">
            {a.sections.map((s, i) => (
              <section key={s.h2} id={anchor(i)} className="scroll-mt-24 pb-12">
                <h2 className="text-display-md font-semibold">{s.h2}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="mt-5 text-[18px] leading-[1.75] text-ink-700">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="mt-6 space-y-3 border-s-2 border-mark ps-6">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-[17px] leading-relaxed text-ink-700">{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </article>

      {a.faq && (
        <Section className="border-t border-line">
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 className="text-display-md font-semibold lg:col-span-4">{t.home.faqTitle}</h2>
            <div className="lg:col-span-8"><Accordion items={a.faq} /></div>
          </div>
        </Section>
      )}

      <Section className="border-t border-line">
        <ul className="border-t-2 border-go-600">
          {g.articles
            .filter((o) => o.id !== a.id)
            .map((o) => (
              <li key={o.id} className="border-b border-line">
                <Link href={href(locale, paths.guide(locale, o.id))} className="grid gap-2 py-6 transition-colors hover:text-go-700 md:grid-cols-12 md:gap-6">
                  <span className="text-xl font-medium md:col-span-7">{o.title}</span>
                  <span className="text-sm text-ink-600 md:col-span-5">{o.excerpt}</span>
                </Link>
              </li>
            ))}
        </ul>
      </Section>
    </>
  );
}
