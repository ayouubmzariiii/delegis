import Link from 'next/link';
import { localeMeta } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { absUrl, buildMetadata } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { formatEur, rates } from '@/lib/pricing';
import { getDict } from '@/content';
import { getUi } from '@/content/ui';
import { PageHeader } from '@/components/sections/PageHeader';
import { Estimator } from '@/components/sections/Estimator';
import { Section, Heading, ButtonLink, Eyebrow } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pricing;
  return buildMetadata({ locale, pathFor: paths.pricing, title: p.metaTitle, description: p.metaDescription });
}

export default async function PricingPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const ui = getUi(locale);
  const p = t.pricing;
  const e = t.estimator;
  const { lang } = localeMeta[locale];
  const eur = (n: number, d = 0) => formatEur(n, lang, d);

  const unitRates: [string, string][] = [
    [e.lines.base, `${eur(rates.baseFee)} ${t.common.perMonth}`],
    [e.sales, eur(rates.sales, 2)],
    [e.purchases, eur(rates.purchases, 2)],
    [e.payroll, `${eur(rates.payrollPerEmployee, 2)} / ${e.payrollUnit}`],
    [e.cashEntries, eur(rates.cashPerEntry, 2)],
    [e.cashDaily, `${eur(rates.cashDailyFlat)} ${t.common.perMonth}`],
    [e.vat, `${eur(rates.vatPrep)} ${t.common.perMonth}`],
    [e.coda, eur(rates.codaPerLine, 2)],
    [e.peppol, `${eur(rates.peppol)} ${t.common.perMonth}`],
    [e.minimum, `${eur(rates.minimum)} ${t.common.perMonth}`],
  ];

  const offerLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: p.h1,
    url: absUrl(locale, paths.pricing()),
    itemListElement: [
      { '@type': 'Offer', name: p.modelATitle, priceCurrency: 'EUR', price: rates.minimum },
      { '@type': 'Offer', name: p.modelBTitle, priceCurrency: 'EUR', price: rates.perDocument.standard },
    ],
  };

  return (
    <>
      <JsonLd data={offerLd} />
      <PageHeader crumbs={crumbs(locale, [t.nav.pricing, paths.pricing()])} label={ui.pricing.label} title={p.h1} intro={p.intro} />

      <Section id="estimator" className="scroll-mt-20">
        <Heading index="01" label={p.modelATag} title={p.modelATitle} lead={p.modelAText} />
        <div className="mt-12">
          <Estimator t={e} lang={lang} contactHref={href(locale, paths.contact())} exclVat={t.common.exclVat} perMonth={t.common.perMonth} />
        </div>
        <details className="group mt-6 rounded-[1.5rem] border border-line bg-white px-6 py-5">
          <summary className="flex cursor-pointer items-center justify-between font-medium">
            {p.ratesTitle}
            <Icon name="plus" className="h-4 w-4 transition-transform group-open:rotate-45" />
          </summary>
          <table className="mt-4 w-full text-sm">
            <tbody className="divide-y divide-line">
              {unitRates.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="py-3 text-start font-normal text-ink-600">{k}</th>
                  <td className="py-3 text-end font-mono tabular">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </Section>

      <section className="border-y border-line bg-white py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-page gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading index="02" label={p.modelBTag} title={p.modelBTitle} lead={p.modelBText} size="md" />
            <ButtonLink href={href(locale, paths.login())} variant="secondary" className="mt-8" arrow>
              {p.docCta}
            </ButtonLink>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-ink-500">{t.common.exclVat}</p>
          </div>
          <dl className="border-t-2 border-go-600 lg:col-span-6 lg:col-start-7">
            {[
              [p.docStandard, `${eur(rates.perDocument.standard, 2)} ${p.perPage}`],
              [p.docComplex, `${eur(rates.perDocument.complex, 2)} ${p.perPage}`],
              [p.docUrgent, `+${rates.perDocument.urgentSurchargePct} %`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-6">
                <dt className="text-[17px]">{k}</dt>
                <dd className="font-display text-4xl tabular">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <Heading index="03" label={p.addonsTitle} title={p.addonsTitle} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-3">
          {[
            { name: p.addons.rescue, text: p.addons.rescueText, price: eur(rates.addons.rescueFrom), to: href(locale, paths.service(locale, 'rescue')) },
            { name: p.addons.dedicated, text: p.addons.dedicatedText, price: `${eur(rates.addons.dedicatedFrom)} ${t.common.perMonth}`, to: href(locale, paths.service(locale, 'dedicated')) },
            { name: p.addons.hourly, text: p.addons.hourlyText, price: `${eur(rates.addons.hourly)} / h`, to: href(locale, paths.contact()) },
          ].map((a) => (
            <Link key={a.name} href={a.to} className="group flex flex-col bg-paper-50 p-8 transition-colors hover:bg-white">
              <h3 className="text-xl font-semibold">{a.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{a.text}</p>
              <p className="mt-8 flex items-end justify-between">
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-500">{t.common.from}</span>
                  <span className="text-2xl font-semibold tabular">{a.price}</span>
                </span>
                <Icon name="arrow" className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-ink rtl:rotate-180" />
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="04">FAQ</Eyebrow>
            <h2 className="mt-5 text-display-md font-semibold">{t.home.faqTitle}</h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={p.faq} />
          </div>
        </div>
      </Section>
    </>
  );
}
