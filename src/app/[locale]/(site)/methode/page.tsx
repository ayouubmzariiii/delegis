import { localeMeta } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section, Heading } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const m = getExtra(locale).method;
  return buildMetadata({ locale, pathFor: paths.method, title: m.metaTitle, description: m.metaDescription });
}

export default async function MethodPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const x = getExtra(locale);
  const m = x.method;
  return (
    <>
      <PageHeader photo={{ k: 'flatlay', lang: localeMeta[locale].lang }} crumbs={crumbs(locale, [x.nav.method, paths.method()])} label={m.kicker} title={m.h1} intro={m.intro} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Heading index="01" label="Onboarding" title={m.timelineTitle} size="md" className="lg:col-span-4" />
          <ol className="border-t-2 border-go-600 lg:col-span-8">
            {m.timeline.map((s) => (
              <li key={s.day} className="grid grid-cols-12 gap-4 border-b border-line py-7">
                <span className="col-span-3 font-mono text-sm text-go-700 sm:col-span-2">{s.day}</span>
                <div className="col-span-9 sm:col-span-10">
                  <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <section className="surface-blue py-20 text-white sm:py-28">
        <div className="mx-auto w-full max-w-page px-5 sm:px-8">
          <Heading index="02" label="QA" title={m.qualityTitle} tone="light" />
          <dl className="mt-14 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {m.quality.map((q, i) => (
              <div key={q.label} className={`border-b border-white/10 py-8 lg:border-b-0 lg:pe-6 ${i > 0 ? 'lg:border-s lg:ps-6' : ''}`}>
                <dt className="font-display font-bold text-6xl leading-none text-mark tabular" dir="ltr">{q.value}</dt>
                <dd className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">{q.label}</dd>
                <dd className="mt-4 text-sm leading-relaxed text-white/75">{q.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Heading index="03" label="24 h" title={m.dayTitle} size="md" className="lg:col-span-4" />
          <ol className="relative border-s border-line-strong ps-8 lg:col-span-8">
            {m.day.map((s) => (
              <li key={s.time} className="relative pb-10 last:pb-0">
                <span aria-hidden="true" className="absolute -start-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-paper bg-ink" />
                <p className="font-mono text-sm text-go-700" dir="ltr">{s.time}</p>
                <p className="mt-1.5 text-[17px] leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <Heading index="04" label="FAQ" title={t.home.faqTitle} size="md" className="lg:col-span-4" />
          <div className="lg:col-span-8"><Accordion items={m.faq} /></div>
        </div>
      </Section>
    </>
  );
}
