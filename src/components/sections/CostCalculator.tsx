'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import type { Hook } from '@/content/hook-types';
import { formatEur, rates } from '@/lib/pricing';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';

const DOCS_PER_HOUR = 35;
const INHOUSE_HOURLY = 52;
const MIN = 50;
const MAX = 3000;

/** Pure function, exported for tests. Blended unit price ≈ 40 % sales / 60 % purchases. */
export function compareCost(docs: number) {
  const hours = docs / DOCS_PER_HOUR;
  const inhouse = hours * INHOUSE_HOURLY;
  const delegis = Math.max(rates.minimum, rates.baseFee + docs * (0.4 * rates.sales + 0.6 * rates.purchases));
  return { hours, inhouse, delegis, yearlySaving: Math.max(0, (inhouse - delegis) * 12) };
}

export function CostCalculator({ c, lang, cta, perMonth }: { c: Hook['calc']; lang: string; cta: string; perMonth: string }) {
  const id = useId();
  const [docs, setDocs] = useState(600);
  const r = compareCost(docs);
  const eur = (n: number) => formatEur(Math.round(n / 10) * 10, lang);
  const max = Math.max(r.inhouse, r.delegis);

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-5">
      <div className="p-7 sm:p-10 lg:col-span-3">
        <p className="text-xl font-semibold tracking-tight">{c.title}</p>
        <div className="mt-8 flex items-end justify-between gap-4">
          <label htmlFor={id} className="text-sm text-ink-600">{c.docsLabel}</label>
          <output htmlFor={id} className="text-4xl font-semibold tracking-tight tabular">
            {docs.toLocaleString(lang === 'en' ? 'en-GB' : lang === 'nl' ? 'nl-BE' : 'fr-BE')}
          </output>
        </div>
        <input
          id={id}
          type="range"
          min={MIN}
          max={MAX}
          step={50}
          value={docs}
          onChange={(e) => setDocs(Number(e.target.value))}
          className="slider mt-5"
          style={{ ['--fill' as string]: `${((docs - MIN) / (MAX - MIN)) * 100}%` }}
        />
        <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-500" dir="ltr">
          <span>{MIN}</span>
          <span>{MAX}</span>
        </div>

        <div className="mt-10 space-y-5" dir="ltr">
          {[
            { label: c.inhouseLabel, sub: `${Math.round(r.hours)} ${c.hoursLabel}`, value: r.inhouse, bar: 'bg-ink-400' },
            { label: c.delegisLabel, sub: perMonth, value: r.delegis, bar: 'bg-go-600' },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">{row.label}</span>
                <span className="text-lg font-semibold tabular">{eur(row.value)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-paper-200">
                <div className={`h-2 rounded-full transition-[width] duration-300 ${row.bar}`} style={{ width: `${(row.value / max) * 100}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-ink-500">{row.sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-ink-500">{c.note}</p>
      </div>

      <div className="flex flex-col justify-between gap-10 surface-blue p-7 text-white sm:p-10 lg:col-span-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">{c.savingLabel}</p>
          <p className="mt-4 font-display font-bold text-6xl leading-none tabular text-mark sm:text-7xl" aria-live="polite">
            {eur(r.yearlySaving)}
          </p>
        </div>
        <div>
          <Link href={cta} className={`${buttonClass('inverse', 'lg')} w-full`}>
            {c.cta} <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
