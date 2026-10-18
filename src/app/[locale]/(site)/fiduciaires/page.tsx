import { localeMeta } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { absUrl, buildMetadata, serviceLd } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { getUi } from '@/content/ui';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section, Heading, ButtonLink } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const f = getExtra(locale).firms;
  return buildMetadata({ locale, pathFor: paths.firms, title: f.metaTitle, description: f.metaDescription });
}

export default async function FirmsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const x = getExtra(locale);
  const ui = getUi(locale);
  const f = x.firms;
  return (
    <>
      <JsonLd data={serviceLd({ name: f.h1, description: f.metaDescription, url: absUrl(locale, paths.firms()) })} />
      <PageHeader photo={{ k: 'teamWork', lang: localeMeta[locale].lang }} crumbs={crumbs(locale, [x.nav.firms, paths.firms()])} label={f.kicker} title={f.h1} intro={f.intro}>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={href(locale, paths.contact())} size="lg" arrow>{ui.audience.firms.cta}</ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <Heading index="01" label={x.nav.firms} title={f.painsTitle} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {f.pains.map((p) => (
            <figure key={p.title} className="rounded-[1.75rem] border border-line bg-white p-8">
              <blockquote className="font-display text-3xl leading-tight">{p.title}</blockquote>
              <figcaption className="mt-4 text-[15px] leading-relaxed text-ink-600">{p.text}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <section className="surface-blue py-20 text-white sm:py-28">
        <div className="mx-auto w-full max-w-page px-5 sm:px-8">
          <Heading index="02" label="White label" title={f.modelTitle} tone="light" />
          <dl className="mt-14 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-3">
            {f.model.map((m, i) => (
              <div key={m.title} className={`border-b border-white/10 py-8 ${i % 3 !== 0 ? 'lg:border-s lg:ps-8' : ''} lg:pe-8`}>
                <dt className="flex items-center gap-3 text-lg font-semibold">
                  <span className="font-mono text-xs text-mark">{String(i + 1).padStart(2, '0')}</span>
                  {m.title}
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-white/70">{m.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <p className="mx-auto max-w-4xl text-center font-display text-display-lg">“{f.quoteTitle}”</p>
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {ui.audience.firms.points.map((p) => (
            <li key={p} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-go-600" /> {p}</li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <Heading index="03" label="FAQ" title={t.home.faqTitle} size="md" className="lg:col-span-4" />
          <div className="lg:col-span-8"><Accordion items={f.faq} /></div>
        </div>
      </Section>
    </>
  );
}
