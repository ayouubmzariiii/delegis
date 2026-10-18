import Link from 'next/link';
import { localeMeta, type Locale } from '@/lib/i18n';
import { href, paths } from '@/lib/routes';
import { formatEur } from '@/lib/pricing';
import { servicePriceFrom } from '@/content';
import type { ServiceContent } from '@/content/types';
import { Icon } from '@/components/ui/Icon';

/** Services as a ledger-style index table rather than a card grid. */
export function ServiceIndex({ locale, services, colService, colFrom }: { locale: Locale; services: ServiceContent[]; colService: string; colFrom: string }) {
  const { lang } = localeMeta[locale];
  return (
    <div className="border-t-2 border-go-600">
      <div className="hidden grid-cols-12 gap-6 border-b border-line py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 md:grid">
        <span className="col-span-1">#</span>
        <span className="col-span-4">{colService}</span>
        <span className="col-span-5" />
        <span className="col-span-2 text-end">{colFrom}</span>
      </div>
      <ul>
        {services.map((s, i) => {
          const p = servicePriceFrom[s.id];
          return (
            <li key={s.id} className="border-b border-line">
              <Link href={href(locale, paths.service(locale, s.id))} className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-6 transition-colors hover:bg-white/60">
                <span className="col-span-2 font-mono text-xs text-ink-500 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="col-span-10 text-xl font-medium tracking-tight md:col-span-4">{s.name}</span>
                <span className="col-span-10 col-start-3 text-sm leading-relaxed text-ink-600 md:col-span-5 md:col-start-auto">{s.short}</span>
                <span className="col-span-10 col-start-3 flex items-center justify-between gap-3 md:col-span-2 md:col-start-auto md:justify-end">
                  {p !== undefined && <span className="font-mono text-sm tabular">{formatEur(p, lang, p < 10 ? 2 : 0)}</span>}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-ink-400 transition-all group-hover:translate-x-1 group-hover:text-ink rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
