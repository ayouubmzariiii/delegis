import { notFound } from 'next/navigation';
import { locales, isLocale, localeMeta, type Locale } from '@/lib/i18n';
import { absUrl, buildMetadata, serviceLd } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { formatEur } from '@/lib/pricing';
import { getDict, getService, serviceCategory, servicePriceFrom } from '@/content';
import { getHook } from '@/content/hook';
import { getUi } from '@/content/ui';
import { PageHeader } from '@/components/sections/PageHeader';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { Section, Heading, ButtonLink, Eyebrow } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';

type P = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getDict(locale).services.map((s) => ({ locale, slug: s.slug })));
}

async function load(params: P['params']) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const s = getService(locale, slug);
  if (!s) notFound();
  return { locale: locale as Locale, s };
}

export async function generateMetadata({ params }: P) {
  const { locale, s } = await load(params);
  return buildMetadata({ locale, pathFor: (l) => paths.service(l, s.id), title: s.metaTitle, description: s.metaDescription });
}

export default async function ServicePage({ params }: P) {
  const { locale, s } = await load(params);
  const t = getDict(locale);
  const k = getHook(locale);
  const ui = getUi(locale);
  const { lang } = localeMeta[locale];
  const price = servicePriceFrom[s.id];
  const path = paths.service(locale, s.id);
  const related = [
    ...t.services.filter((x) => x.id !== s.id && serviceCategory[x.id] === serviceCategory[s.id]),
    ...t.services.filter((x) => x.id !== s.id && serviceCategory[x.id] !== serviceCategory[s.id]),
  ].slice(0, 4);

  const aside =
    price !== undefined ? (
      <div className="rounded-[1.75rem] surface-blue p-7 text-white">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">{t.common.from}</p>
        <p className="mt-3 font-display font-bold text-6xl leading-none tabular">{formatEur(price, lang, price < 10 ? 2 : 0)}</p>
        <p className="mt-2 text-sm text-white/60">{t.common.exclVat}</p>
        <ButtonLink href={`${href(locale, paths.contact())}?service=${s.id}`} variant="inverse" className="mt-7 w-full" arrow>
          {k.hero.cta}
        </ButtonLink>
      </div>
    ) : undefined;

  return (
    <>
      <JsonLd data={serviceLd({ name: s.name, description: s.metaDescription, url: absUrl(locale, path), price })} />
      <PageHeader crumbs={crumbs(locale, [t.nav.services, paths.services()], [s.name, path])} label={s.name} title={s.h1} intro={s.intro} aside={aside} />

      <Section>
        <Heading index="01" label={s.name} title={t.service.benefitsTitle} />
        <dl className="mt-12 grid border-t-2 border-go-600 sm:grid-cols-2 lg:grid-cols-4">
          {s.benefits.map((b, i) => (
            <div key={b.title} className={`border-b border-line py-8 lg:border-b-0 ${i > 0 ? 'lg:border-s lg:ps-6' : ''} lg:pe-6 ${i % 2 === 1 ? 'sm:border-s sm:ps-6 lg:ps-6' : ''}`}>
              <dt className="text-lg font-semibold tracking-tight">{b.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-600">{b.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="border-y border-line bg-white py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-page gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading index="02" label={s.name} title={t.service.deliverablesTitle} />
            <ol className="mt-10 border-t-2 border-go-600">
              {s.deliverables.map((d, i) => (
                <li key={d} className="flex items-baseline gap-6 border-b border-line py-4">
                  <span className="font-mono text-xs text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[17px]">{d}</span>
                </li>
              ))}
            </ol>
          </div>
          {s.tools && (
            <div className="lg:col-span-4 lg:col-start-9">
              <Eyebrow>{t.service.toolsTitle}</Eyebrow>
              <ul className="mt-6 flex flex-wrap gap-2" dir="ltr">
                {s.tools.map((x) => (
                  <li key={x} className="rounded-full border border-line px-3.5 py-1.5 text-sm">{x}</li>
                ))}
              </ul>
              <div className="mt-10 space-y-3">
                {k.risk.map((r) => (
                  <p key={r.title} className="flex gap-3 text-sm">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-go-600" />
                    <span>
                      <span className="font-medium">{r.title}.</span> <span className="text-ink-600">{r.text}</span>
                    </span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <Heading index="03" label="FAQ" title={t.service.faqTitle} size="md" className="lg:col-span-4" />
          <div className="lg:col-span-8">
            <Accordion items={s.faq} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <Heading index="04" label={ui.index.label} title={t.service.relatedTitle} size="md" className="lg:col-span-4" />
          <div className="lg:col-span-8">
            <ServiceIndex locale={locale} services={related} colService={ui.index.colService} colFrom={ui.index.colFrom} />
          </div>
        </div>
      </Section>
    </>
  );
}
