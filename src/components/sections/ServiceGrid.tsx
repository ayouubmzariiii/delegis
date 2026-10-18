import Link from 'next/link';
import { localeMeta, type Locale } from '@/lib/i18n';
import { href, paths } from '@/lib/routes';
import { formatEur } from '@/lib/pricing';
import { servicePriceFrom } from '@/content';
import { serviceIcon } from '@/content/icons';
import type { ServiceContent } from '@/content/types';
import { Icon } from '@/components/ui/Icon';

/** Card grid of services; the first card is featured (spans two columns on large screens). */
export function ServiceGrid({ locale, services, fromLabel }: { locale: Locale; services: ServiceContent[]; fromLabel: string }) {
  const { lang } = localeMeta[locale];
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => {
        const p = servicePriceFrom[s.id];
        const featured = i === 0;
        return (
          <li key={s.id} className={featured ? 'sm:col-span-2 lg:row-span-2' : ''}>
            <Link
              href={href(locale, paths.service(locale, s.id))}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift ${
                featured ? 'surface-blue border-transparent text-white' : 'border-line bg-white hover:border-go-300'
              }`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${featured ? 'bg-white/10 text-white ring-1 ring-white/20' : 'bg-go-50 text-go-600'}`}>
                <Icon name={serviceIcon[s.id]} />
              </span>
              <h3 className={`mt-5 font-display font-semibold tracking-tight ${featured ? 'text-3xl' : 'text-lg'}`}>{s.name}</h3>
              <p className={`mt-2 flex-1 leading-relaxed ${featured ? 'max-w-md text-[17px] text-white/75' : 'text-sm text-ink-600'}`}>{featured ? s.intro : s.short}</p>
              {featured && s.tools && (
                <ul className="mt-6 flex flex-wrap gap-1.5" dir="ltr">
                  {s.tools.slice(0, 7).map((tool) => (
                    <li key={tool} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/85 ring-1 ring-white/15">{tool}</li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-end justify-between">
                {p !== undefined && (
                  <span className={`text-sm ${featured ? 'text-white/70' : 'text-ink-500'}`}>
                    {fromLabel} <span className={`font-mono font-medium tabular ${featured ? 'text-white' : 'text-ink'}`}>{formatEur(p, lang, p < 10 ? 2 : 0)}</span>
                  </span>
                )}
                <span className={`flex h-8 w-8 items-center justify-center rounded-full transition ${featured ? 'bg-white text-go-700' : 'bg-paper text-ink group-hover:bg-go-600 group-hover:text-white'}`}>
                  <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
