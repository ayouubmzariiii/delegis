import { localeMeta } from '@/lib/i18n';
import { getFaqs } from '@/content/faq';
import { FaqSection } from '@/components/sections/FaqSection';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { site, officeLabel } from '@/lib/site';
import { getDict } from '@/content';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section, Heading } from '@/components/ui/primitives';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const a = getDict(locale).about;
  return buildMetadata({ locale, pathFor: paths.about, title: a.metaTitle, description: a.metaDescription });
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const faqs = getFaqs(locale);
  const t = getDict(locale);
  const [lead, ...rest] = t.about.paragraphs;
  return (
    <>
      <PageHeader photo={{ k: 'heroTeam', lang: localeMeta[locale].lang }} crumbs={crumbs(locale, [t.nav.about, paths.about()])} label={t.nav.about} title={t.about.h1} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="font-display text-3xl leading-snug lg:col-span-5">{lead}</p>
          <div className="space-y-6 text-lg leading-relaxed text-ink-700 lg:col-span-6 lg:col-start-7">
            {rest.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="mt-20 grid gap-4 sm:grid-cols-2" dir="ltr">
          {site.offices.map((o, i) => {
            const { city, country } = officeLabel(o, localeMeta[locale].lang);
            return (
              <div key={o.id} className={`rounded-[1.75rem] p-8 ${i === 0 ? 'bg-ink text-white' : 'bg-mark text-ink'}`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60">{o.country}</p>
                <p className="mt-6 text-display-md font-semibold">{city}</p>
                <p className="mt-2 text-sm opacity-75">{country}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section className="border-t border-line">
        <Heading index="01" label={t.nav.about} title={t.about.valuesTitle} />
        <dl className="mt-12 grid border-t-2 border-go-600 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.values.map((v, i) => (
            <div key={v.title} className={`border-b border-line py-8 lg:border-b-0 lg:pe-6 ${i > 0 ? 'lg:border-s lg:ps-6' : ''}`}>
              <dt className="text-lg font-semibold">{v.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-600">{v.text}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <FaqSection title={faqs.title} items={faqs.about} />
    </>
  );
}
