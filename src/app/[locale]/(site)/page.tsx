import Link from 'next/link';
import { localeMeta } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { formatEur, rates } from '@/lib/pricing';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { getHook } from '@/content/hook';
import { getUi } from '@/content/ui';
import { cities } from '@/content/cities';
import { Section, Heading, ButtonLink, Container } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { Hero } from '@/components/sections/Hero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { CostCalculator } from '@/components/sections/CostCalculator';
import { FeatureRow, OverlayCard } from '@/components/sections/FeatureRow';

const TOOLS = ['Exact Online', 'Winbooks', 'Bob 50', 'Yuki', 'Odoo', 'Octopus', 'Horus', 'Silverfin', 'Codabox'];

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  return buildMetadata({ locale, pathFor: paths.home, title: t.home.metaTitle, description: t.home.metaDescription });
}

export default async function Home({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const x = getExtra(locale);
  const k = getHook(locale);
  const ui = getUi(locale);
  const { lang } = localeMeta[locale];
  const eur = (n: number, d = 0) => formatEur(n, lang, d);
  const svc = (id: string) => t.services.find((s) => s.id === id)!;
  const grid = ['encoding', 'bank', 'vat', 'peppol', 'payroll', 'data-entry', 'customer', 'rescue', 'dedicated'].map(svc);

  return (
    <>
      <Hero locale={locale} t={t} k={k} ui={ui} />

      {/* Proof figures + software */}
      <section className="border-b border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-line py-10 lg:grid-cols-4 lg:divide-x rtl:lg:divide-x-reverse">
            {k.proof.map((p) => (
              <div key={p.label} className="px-2 py-3 lg:px-8">
                <dt className="sr-only">{p.label}</dt>
                <dd className="font-display text-4xl font-bold tracking-tight text-go-600" dir="ltr">{p.value}</dd>
                <dd className="mt-1 text-sm text-ink-600">{p.label}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col items-center gap-5 border-t border-line py-8 lg:flex-row lg:justify-between">
            <p className="shrink-0 text-sm font-medium text-ink-500">{x.home.marqueeLabel}</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" dir="ltr">
              {TOOLS.map((tool) => (
                <li key={tool} className="font-display text-lg font-bold tracking-tight text-ink-500">{tool}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 01 · Services */}
      <Section labelledBy="svc" className="dots-soft bg-paper">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Heading index="01" label={ui.index.label} title={ui.index.title} lead={ui.index.lead} id="svc" />
          <ButtonLink href={href(locale, paths.services())} variant="secondary" className="shrink-0" arrow>
            {ui.index.all}
          </ButtonLink>
        </div>
        <div className="mt-12">
          <ServiceGrid locale={locale} services={grid} fromLabel={t.common.from} />
        </div>
      </Section>

      {/* 02 · How it works */}
      <Section labelledBy="proc">
        <Heading index="02" label={ui.process.label} title={t.home.howTitle} id="proc" className="mx-auto text-center" />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-4">
          <span aria-hidden="true" className="absolute inset-x-[12%] top-7 hidden h-px bg-gradient-to-r from-go-100 via-go-300 to-go-100 md:block" />
          {t.home.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-line bg-white p-6 text-center shadow-card">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-go-600 font-display text-xl font-bold text-white shadow-glow">{i + 1}</span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 03 · Photo feature rows */}
      <Section className="dots-soft border-t border-line bg-paper">
        <div className="space-y-24 sm:space-y-28">
          <FeatureRow
            photo="focus"
            lang={lang}
            label={svc('encoding').name}
            title={svc('encoding').h1}
            text={svc('encoding').intro}
            points={svc('encoding').deliverables.slice(0, 3)}
            action={<ButtonLink href={href(locale, paths.service(locale, 'encoding'))} variant="secondary" arrow>{t.common.learnMore}</ButtonLink>}
            overlay={
              <OverlayCard>
                <table className="font-mono text-[11px] tabular" dir="ltr">
                  <tbody>
                    <tr><td className="pe-6 text-ink-500">604000</td><td className="pe-6">Brico Pro SRL</td><td className="text-end">1 284,50</td></tr>
                    <tr><td className="pe-6 text-ink-500">411000</td><td className="pe-6">TVA 21 %</td><td className="text-end">269,75</td></tr>
                    <tr><td className="pe-6 text-ink-500">440000</td><td className="pe-6">—</td><td className="text-end font-semibold text-go-700">1 554,25</td></tr>
                  </tbody>
                </table>
              </OverlayCard>
            }
          />
          <FeatureRow
            reverse
            photo="desk"
            lang={lang}
            label={svc('peppol').name}
            title={svc('peppol').h1}
            text={svc('peppol').intro}
            points={svc('peppol').deliverables.slice(0, 3)}
            action={<ButtonLink href={href(locale, paths.service(locale, 'peppol'))} variant="secondary" arrow>{t.common.learnMore}</ButtonLink>}
            overlay={
              <OverlayCard>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-go-600 text-white"><Icon name="bolt" className="h-3.5 w-3.5" /></span>
                  {k.bento.peppolBadge}
                </p>
              </OverlayCard>
            }
          />
          <FeatureRow
            photo="teamLaptop"
            lang={lang}
            label={x.method.kicker}
            title={x.method.qualityTitle}
            text={x.method.intro}
            points={x.method.quality.slice(0, 3).map((q) => `${q.value} ${q.label} : ${q.text}`)}
            action={<ButtonLink href={href(locale, paths.method())} variant="secondary" arrow>{x.nav.method}</ButtonLink>}
            overlay={
              <OverlayCard>
                <p className="text-[11px] font-medium text-ink-500">{x.method.quality[2].label}</p>
                <p className="font-display text-3xl font-bold text-go-600" dir="ltr">{x.method.quality[2].value}</p>
              </OverlayCard>
            }
          />
        </div>
      </Section>

      {/* 04 · Pricing */}
      <Section labelledBy="price">
        <Heading index="03" label={ui.pricing.label} title={ui.pricing.title} lead={ui.pricing.lead} id="price" />
        <div className="mt-12">
          <CostCalculator c={k.calc} lang={lang} cta={`${href(locale, paths.pricing())}#estimator`} perMonth={t.common.perMonth} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            { tag: t.pricing.modelATag, title: t.pricing.modelATitle, text: t.pricing.modelAText, price: eur(rates.minimum), unit: t.common.perMonth, hl: true },
            { tag: t.pricing.modelBTag, title: t.pricing.modelBTitle, text: t.pricing.modelBText, price: eur(rates.perDocument.standard, 2), unit: t.pricing.perPage, hl: false },
          ].map((m) => (
            <div key={m.title} className={`flex flex-col justify-between gap-6 rounded-2xl border p-7 sm:flex-row sm:items-end ${m.hl ? 'border-go-300 bg-go-50' : 'border-line bg-white'}`}>
              <div className="max-w-sm">
                <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-go-700 ring-1 ring-go-100">{m.tag}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{m.text}</p>
              </div>
              <p className="shrink-0 text-end">
                <span className="block text-xs text-ink-500">{t.common.from}</span>
                <span className="font-display text-3xl font-bold tabular">{m.price}</span>
                <span className="text-sm text-ink-500"> {m.unit}</span>
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {k.risk.map((r) => (
            <li key={r.title} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ok-50 text-ok-700"><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-ink-600">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 05 · Two offices */}
      <section aria-labelledby="bridge" className="surface-blue py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Heading index="04" label={`${cities[0].name[lang]} · ${cities[7].name[lang]}`} title={t.home.bridgeTitle} id="bridge" tone="light" className="lg:col-span-7" />
            <p className="text-lg leading-relaxed text-white/80 lg:col-span-5">{t.home.bridgeText}</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {(
              [
                ['brussels', 0, 'BE', t.footer.companyTitle],
                ['casablanca', 7, 'MA', x.nav.careers],
              ] as const
            ).map(([key, ci, cc]) => (
              <figure key={key} className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10">
                <Photo k={key} lang={lang} sizes="(min-width: 768px) 600px, 100vw" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <figcaption className="absolute bottom-6 end-6 start-6 flex items-end justify-between">
                  <span>
                    <span className="inline-block rounded-md bg-white/15 px-2 py-0.5 font-mono text-[11px] backdrop-blur">{cc}</span>
                    <span className="mt-2 block font-display text-3xl font-bold tracking-tight">{cities[ci].name[lang]}</span>
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-xs backdrop-blur" dir="ltr">UTC+1</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 · Audience */}
      <Section labelledBy="aud">
        <Heading index="05" label={ui.audience.label} title={ui.audience.title} id="aud" className="mx-auto text-center" />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {[
            { ...ui.audience.sme, to: `${href(locale, paths.pricing())}#estimator`, photo: 'flatlay' as const },
            { ...ui.audience.firms, to: href(locale, paths.firms()), photo: 'teamWork' as const },
          ].map((a) => (
            <Link key={a.title} href={a.to} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="relative block aspect-[16/9] overflow-hidden">
                <Photo k={a.photo} lang={lang} sizes="(min-width: 1024px) 600px, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute start-5 top-5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-go-700 shadow-card">{a.tag}</span>
              </span>
              <span className="flex flex-1 flex-col p-8">
                <span className="font-display text-2xl font-semibold">{a.title}</span>
                <span className="mt-3 text-ink-600">{a.text}</span>
                <span className="mt-6 grid flex-1 gap-2.5">
                  {a.points.map((p) => (
                    <span key={p} className="flex items-center gap-3 text-[15px]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-go-50 text-go-600"><Icon name="check" className="h-3 w-3" /></span>
                      {p}
                    </span>
                  ))}
                </span>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-go-600">
                  {a.cta} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 07 · Security */}
      <Section labelledBy="sec" className="border-t border-line bg-paper">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading index="06" label={ui.security.label} title={ui.security.title} lead={ui.security.lead} id="sec" size="md" />
            <ButtonLink href={href(locale, paths.privacy())} variant="secondary" className="mt-8" arrow>
              {ui.security.cta}
            </ButtonLink>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {t.privacy.sections.slice(0, 6).map((s) => (
              <div key={s.title} className="rounded-2xl border border-line bg-white p-6">
                <dt className="flex items-center gap-3 font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-go-50 text-go-600"><Icon name="shield" className="h-[18px] w-[18px]" /></span>
                  {s.title}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-600">{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 08 · Guides */}
      <Section labelledBy="gd">
        <div className="flex items-end justify-between gap-6">
          <Heading index="07" label={ui.guides.label} title={ui.guides.title} id="gd" />
          <ButtonLink href={href(locale, paths.guides())} variant="secondary" className="hidden shrink-0 sm:inline-flex" arrow>{x.nav.guides}</ButtonLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {x.guides.articles.map((a, i) => (
            <Link key={a.id} href={href(locale, paths.guide(locale, a.id))} className={`group flex flex-col rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-lift ${i === 0 ? 'border-transparent bg-go-600 text-white' : 'border-line bg-white'}`}>
              <span className={`text-xs font-semibold ${i === 0 ? 'text-white' : 'text-go-700'}`}>{a.readingMinutes} {x.guides.minutes}</span>
              <span className="mt-4 flex-1 font-display text-lg font-semibold leading-snug">{a.title}</span>
              <span className={`mt-3 text-sm ${i === 0 ? 'text-white' : 'text-ink-600'}`}>{a.excerpt}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 09 · FAQ */}
      <Section labelledBy="faq" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading index="08" label={ui.faq.label} title={t.home.faqTitle} id="faq" size="md" />
            <Link href={href(locale, paths.contact())} className="mt-6 inline-block text-sm font-medium text-go-700 underline-offset-4 hover:underline">
              {ui.faq.more}
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={t.home.faq} />
          </div>
        </div>
      </Section>
    </>
  );
}
