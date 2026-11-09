'use client';

import { useState } from 'react';
import Link from 'next/link';
import { locales, localeMeta, type Locale } from '@/lib/i18n';

/**
 * Reads the current page's equivalents from its hreflang tags when the menu opens. Search engines
 * pick up URL-like strings in page data, so a table of every path must never be sent to the client.
 * Until then, and on pages without hreflang tags, each language links to its home page.
 */
function readAlternates() {
  const found: Partial<Record<Locale, string>> = {};
  for (const l of locales) {
    const tag = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${localeMeta[l].hreflang}"]`);
    if (tag) found[l] = new URL(tag.href).pathname;
  }
  return found;
}

export function LangSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const [alternates, setAlternates] = useState<Partial<Record<Locale, string>>>({});

  return (
    <details className="relative" onToggle={(e) => e.currentTarget.open && setAlternates(readAlternates())}>
      <summary className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 font-mono text-xs uppercase tracking-wider text-ink-600 hover:bg-ink/5 hover:text-ink">
        <span className="sr-only">{label}: </span>
        {localeMeta[locale].short}
      </summary>
      <ul className="absolute end-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={alternates[l] ?? `/${l}`}
              prefetch={false}
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
