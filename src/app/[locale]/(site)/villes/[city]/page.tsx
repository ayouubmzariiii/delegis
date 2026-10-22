import Link from 'next/link';
import { getFaqs } from '@/content/faq';
import { FaqSection } from '@/components/sections/FaqSection';
import { notFound } from 'next/navigation';
import { locales, isLocale, localeMeta, type Locale } from '@/lib/i18n';
import { absUrl, buildMetadata, localServiceLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { href, paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getDict } from '@/content';
import { getUi } from '@/content/ui';
import { cities, citiesForMarket } from '@/content/cities';
import { cityDescription, cityLocal } from '@/content/city-local';
import { PageHeader } from '@/components/sections/PageHeader';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { Section, Heading, ButtonLink } from '@/components/ui/primitives';

type P = { params: Promise<{ locale: string; city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((c) => ({ locale, city: c.slug[localeMeta[locale].lang] })));
}

async function load(params: P['params']) {
  const { locale, city } = await params;
  if (!isLocale(locale)) notFound();
  const lang = localeMeta[locale].lang;
  const c = cities.find((x) => x.slug[lang] === city);
  if (!c) notFound();
  return { locale: locale as Locale, c, name: c.name[lang] };
}

const fill = (s: string, city: string) => s.replaceAll('{city}', city);

export async function generateMetadata({ params }: P) {
  const { locale, c, name } = await load(params);
  const t = getDict(locale).cities;
  return buildMetadata({ locale, pathFor: (l) => paths.city(l, c.id), title: fill(t.metaTitle, name), description: cityDescription(locale, c.id, name) });
}

export default async function CityPage({ params }: P) {
  const { locale, c, name } = await load(params);
  const faqs = getFaqs(locale);
  const t = getDict(locale);
  const ui = getUi(locale);
  const { lang, market } = localeMeta[locale];
  const local = cityLocal[c.id][lang];
  return (
    <>
      <JsonLd data={localServiceLd({ name: fill(t.cities.h1, name), description: cityDescription(locale, c.id, name), url: absUrl(locale, paths.city(locale, c.id)), city: c.name.en, country: c.country === 'BE' ? 'Belgium' : 'Morocco' })} />
      <PageHeader
        crumbs={crumbs(locale, [name, paths.city(locale, c.id)])}
        label={`${c.region} · ${c.country === 'BE' ? t.cities.belgium : t.cities.morocco}`}
        title={fill(t.cities.h1, name)}
        intro={fill(t.cities.intro, name)}
      >
        <ButtonLink href={href(locale, paths.contact())} size="lg" className="mt-10" arrow>
          {t.nav.quote}
        </ButtonLink>
      </PageHeader>
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <Heading index="01" label={name} title={fill(t.cities.localTitle, name)} lead={fill(t.cities.localText, name)} size="md" className="lg:col-span-5" />
          <div className="lg:col-span-7 lg:pt-10">
            <ServiceIndex locale={locale} services={t.services.slice(0, 6)} colService={ui.index.colService} colFrom={ui.index.colFrom} />
          </div>
        </div>
      </Section>
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading index="02" label={name} title={local.title} size="md" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-700">
              {local.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{local.sectorsTitle}</h3>
            <ul className="mt-5 space-y-3 border-t-2 border-go-600 pt-5">
              {local.sectors.map((s) => (
                <li key={s} className="border-b border-line pb-3 font-medium">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section className="border-t border-line">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{t.cities.title}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {citiesForMarket(market)
            .filter((o) => o.id !== c.id)
            .map((o) => (
              <li key={o.id}>
                <Link href={href(locale, paths.city(locale, o.id))} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-ink">
                  {o.name[lang]}
                </Link>
              </li>
            ))}
        </ul>
      </Section>
      <FaqSection title={faqs.title} items={faqs.city} city={name} />
    </>
  );
}
