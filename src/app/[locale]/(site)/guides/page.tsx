import Link from 'next/link';
import { getFaqs } from '@/content/faq';
import { FaqSection } from '@/components/sections/FaqSection';
import { localeMeta } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getExtra } from '@/content/extra';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/primitives';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const g = getExtra(locale).guides;
  return buildMetadata({ locale, pathFor: paths.guides, title: g.metaTitle, description: g.metaDescription });
}

export default async function GuidesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const faqs = getFaqs(locale);
  const x = getExtra(locale);
  const g = x.guides;
  const df = new Intl.DateTimeFormat(localeMeta[locale].hreflang, { dateStyle: 'long' });
  const [first, ...rest] = g.articles;
  return (
    <>
      <PageHeader crumbs={crumbs(locale, [x.nav.guides, paths.guides()])} label={x.nav.guides} title={g.h1} intro={g.intro} />
      <Section>
        <Link href={href(locale, paths.guide(locale, first.id))} className="group grid overflow-hidden rounded-[2rem] surface-blue text-white lg:grid-cols-12">
          <div className="p-8 sm:p-12 lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
              {df.format(new Date(first.date))} · {first.readingMinutes} {g.minutes}
            </p>
            <h2 className="mt-6 text-display-md font-semibold">{first.title}</h2>
            <p className="mt-4 max-w-xl text-lg text-white/70">{first.excerpt}</p>
            <span className="mt-10 inline-flex items-center gap-2 font-medium text-mark">
              {g.read} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </span>
          </div>
          <div aria-hidden="true" className="hidden items-end justify-end bg-go-600 p-10 font-display text-[9rem] font-bold leading-none text-white lg:col-span-4 lg:flex">2026</div>
        </Link>
        <ul className="mt-16 border-t-2 border-go-600">
          {rest.map((a) => (
            <li key={a.id} className="border-b border-line">
              <Link href={href(locale, paths.guide(locale, a.id))} className="group grid gap-2 py-8 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="font-mono text-xs text-ink-500 md:col-span-3">
                  {df.format(new Date(a.date))} · {a.readingMinutes} {g.minutes}
                </span>
                <span className="text-2xl font-medium tracking-tight transition-colors group-hover:text-go-700 md:col-span-5">{a.title}</span>
                <span className="text-sm text-ink-600 md:col-span-4">{a.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <FaqSection title={faqs.title} items={faqs.guides} />
    </>
  );
}
