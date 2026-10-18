import Link from 'next/link';
import { localeMeta, type Locale } from '@/lib/i18n';
import { href, paths } from '@/lib/routes';
import type { Dict } from '@/content/types';
import type { Hook } from '@/content/hook-types';
import type { Ui } from '@/content/ui-types';
import { Container, ButtonLink } from '@/components/ui/primitives';
import { Photo } from '@/components/ui/Photo';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';

/** Belgian compliance vocabulary — proper nouns, identical in every language. */
const COMPLIANCE = ['Peppol BIS 3.0', 'Intervat', 'CODA', 'PCMN', 'RGPD · DPA'];

/** Static product card: what a client sees in the portal. Decorative. */
function DashboardCard({ t, ui }: { t: Dict; ui: Ui }) {
  const st = t.portal.status;
  const rows = [
    { name: t.services[0].name, n: 214, s: 'done' as const },
    { name: t.services[1].name, n: 38, s: 'processing' as const },
    { name: t.services[4].name, n: 61, s: 'received' as const },
  ];
  const badge = { done: 'bg-ok-50 text-ok-700', processing: 'bg-go-50 text-go-700', received: 'bg-paper-200 text-ink-600' };
  const bars = [38, 52, 44, 61, 58, 72, 66, 84, 79, 92, 88, 100];
  return (
    <div className="w-[22rem] overflow-hidden rounded-2xl border border-line bg-white shadow-lift" dir="ltr">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <LogoMark className="h-6 w-6" />
          <span className="text-sm font-semibold">{ui.receipt.client}</span>
        </div>
        <span className="font-mono text-[10px] text-ink-500">{ui.receipt.title.split('·').pop()?.trim()}</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        {[
          ['214', t.portal.files],
          ['0', st.received],
          ['31 h', ui.receipt.steps[3].label],
        ].map(([v, l]) => (
          <div key={l} className="px-4 py-3">
            <p className="font-display text-xl font-bold tabular">{v}</p>
            <p className="truncate text-[11px] text-ink-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="flex h-16 items-end gap-1 border-b border-line px-4 py-3" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} className={`flex-1 rounded-sm ${i === bars.length - 1 ? 'bg-go-600' : 'bg-go-100'}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 px-4 py-2.5 text-[13px]">
            <Icon name="file" className="h-4 w-4 shrink-0 text-ink-400" />
            <span className="flex-1 truncate font-medium">{r.name}</span>
            <span className="font-mono text-[11px] text-ink-500">{r.n}</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${badge[r.s]}`}>{st[r.s]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero({ locale, t, k, ui }: { locale: Locale; t: Dict; k: Hook; ui: Ui }) {
  const { lang } = localeMeta[locale];
  const peppol = t.services.find((s) => s.id === 'peppol')!;
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="ruled absolute inset-0" />
      <Container className="relative grid items-center gap-14 pb-20 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="lg:col-span-6">
          <Link
            href={href(locale, paths.service(locale, 'peppol'))}
            className="inline-flex items-center gap-2 rounded-full border border-go-100 bg-white py-1 pe-3 ps-1 text-xs font-semibold text-ink shadow-card transition hover:border-go-300"
          >
            <span className="rounded-full bg-go-600 px-2 py-0.5 text-[10px] font-bold text-white">2026</span>
            {peppol.name}
            <Icon name="arrow" className="h-3.5 w-3.5 text-go-600 rtl:rotate-180" />
          </Link>
          <h1 className="mt-7 font-display text-display-xl font-bold text-ink">
            {k.hero.title} <span className="bg-gradient-to-r from-go-600 to-go-800 bg-clip-text text-transparent">{k.hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{k.hero.text}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={href(locale, paths.contact())} size="lg" arrow>
              {k.hero.cta}
            </ButtonLink>
            <ButtonLink href={href(locale, paths.pricing())} size="lg" variant="secondary">
              {k.hero.secondary}
            </ButtonLink>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-500">
            <Icon name="check" className="h-4 w-4 text-ok-600" /> {k.hero.ctaNote}
          </p>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Compliance">
            {COMPLIANCE.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 font-mono text-[11px] text-ink-700">
                <Icon name="shield" className="h-3.5 w-3.5 text-go-600" /> {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: photo + floating product UI */}
        <div className="relative lg:col-span-6">
          <div aria-hidden="true" className="dots absolute -end-6 -top-6 h-32 w-40 rounded-2xl" />
          <div aria-hidden="true" className="absolute -bottom-5 -end-5 h-[calc(100%-2rem)] w-[calc(100%-6rem)] max-w-[30rem] rounded-[2rem] bg-go-100" />
          <div className="relative ms-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-paper-200 shadow-lift sm:aspect-[5/5]">
            <Photo k="heroTeam" lang={lang} sizes="(min-width: 1024px) 560px, 100vw" priority />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-go-900/15 via-transparent to-transparent" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-10 start-0 hidden sm:block lg:-start-4 xl:-start-8">
            <DashboardCard t={t} ui={ui} />
          </div>
          <div aria-hidden="true" className="absolute end-4 top-6 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pe-4 shadow-lift ring-1 ring-ink/5 backdrop-blur sm:-end-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ok-50 text-ok-700">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold" dir="ltr">Peppol · INV-2026-0917</span>
              <span className="block text-xs text-ink-500">{ui.receipt.steps[0].label}</span>
            </span>
          </div>
          <div aria-hidden="true" className="absolute bottom-6 end-4 rounded-2xl bg-go-600 px-5 py-4 text-white shadow-glow sm:-end-4">
            <p className="text-[11px] font-medium text-white">{k.proof[0].label}</p>
            <p className="font-display text-3xl font-bold" dir="ltr">{k.proof[0].value}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
