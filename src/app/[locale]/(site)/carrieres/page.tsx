import { localeMeta } from '@/lib/i18n';
import { getFaqs } from '@/content/faq';
import { FaqSection } from '@/components/sections/FaqSection';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getExtra } from '@/content/extra';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section, Heading, buttonClass } from '@/components/ui/primitives';
import { Icon } from '@/components/ui/Icon';

const JOBS_EMAIL = 'jobs@delegis.ma';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const c = getExtra(locale).careers;
  return buildMetadata({ locale, pathFor: paths.careers, title: c.metaTitle, description: c.metaDescription });
}

export default async function CareersPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const faqs = getFaqs(locale);
  const x = getExtra(locale);
  const c = x.careers;
  return (
    <>
      <PageHeader photo={{ k: 'teamLaptop', lang: localeMeta[locale].lang }} crumbs={crumbs(locale, [x.nav.careers, paths.careers()])} label={c.kicker} title={c.h1} intro={c.intro} />

      <Section>
        <Heading index="01" label="Casablanca" title={c.perksTitle} />
        <dl className="mt-12 grid border-t-2 border-go-600 sm:grid-cols-2 lg:grid-cols-4">
          {c.perks.map((p, i) => (
            <div key={p.title} className={`border-b border-line py-8 lg:border-b-0 lg:pe-6 ${i > 0 ? 'lg:border-s lg:ps-6' : ''}`}>
              <dt className="text-lg font-semibold">{p.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-600">{p.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="border-t border-line">
        <Heading index="02" label="Jobs" title={c.rolesTitle} />
        <ul className="mt-12 border-t-2 border-go-600">
          {c.roles.map((r) => (
            <li key={r.title} className="border-b border-line">
              <a href={`mailto:${JOBS_EMAIL}?subject=${encodeURIComponent(r.title)}`} className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="font-mono text-xs text-go-700 md:col-span-3">{r.type}</span>
                <span className="text-xl font-medium tracking-tight md:col-span-4">{r.title}</span>
                <span className="text-sm text-ink-600 md:col-span-4">{r.text}</span>
                <Icon name="arrow" className="hidden h-4 w-4 justify-self-end text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-ink md:col-span-1 md:block rtl:rotate-180" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-col justify-between gap-6 rounded-[2rem] bg-mark p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-display-md font-semibold">{c.applyTitle}</h2>
            <p className="mt-2 max-w-xl text-ink/75">{c.applyText}</p>
          </div>
          <a href={`mailto:${JOBS_EMAIL}`} className={`${buttonClass('primary', 'lg')} shrink-0`}>
            {c.applyCta} <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </Section>
      <FaqSection title={faqs.title} items={faqs.careers} />
    </>
  );
}
