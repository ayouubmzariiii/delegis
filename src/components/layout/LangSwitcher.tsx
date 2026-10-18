'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeMeta, type Locale } from '@/lib/i18n';

/** `table` maps each page to its equivalent path in every locale. */
export function LangSwitcher({ locale, table, label }: { locale: Locale; table: Record<Locale, string>[]; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.slice(locale.length + 1);
  const row = table.find((r) => r[locale] === rest);
  const target = (l: Locale) => `/${l}${row ? row[l] : rest}`;

  return (
    <details className="relative">
      <summary className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 font-mono text-xs uppercase tracking-wider text-ink-600 hover:bg-ink/5 hover:text-ink">
        <span className="sr-only">{label}: </span>
        {localeMeta[locale].short}
      </summary>
      <ul className="absolute end-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={target(l)}
              hrefLang={localeMeta[l].hreflang}
              lang={localeMeta[l].lang}
              aria-current={l === locale ? 'true' : undefined}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm hover:bg-paper aria-[current]:font-semibold"
            >
              {localeMeta[l].label}
              <span className="font-mono text-[10px] text-ink-500">{localeMeta[l].short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
