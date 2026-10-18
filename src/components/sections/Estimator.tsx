'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Dict } from '@/content/types';
import { estimate, formatEur, rates, type EstimateInput } from '@/lib/pricing';
import { Icon } from '@/components/ui/Icon';
import { buttonClass, cx } from '@/components/ui/primitives';

type Props = { t: Dict['estimator']; lang: string; contactHref: string; exclVat: string; perMonth: string };

function Field({ id, label, hint, unit, value, max, step = 1, onChange }: { id: string; label: string; hint: string; unit: string; value: number; max: number; step?: number; onChange: (n: number) => void }) {
  return (
    <div className="border-b border-line py-6">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">
          {label} <span className="ms-1 font-mono text-[11px] text-ink-500">{hint}</span>
        </label>
        <span className="flex items-baseline gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={value}
            aria-label={label}
            onChange={(e) => onChange(Math.max(0, Math.min(max * 5, Number(e.target.value) || 0)))}
            className="w-24 rounded-lg border border-line bg-white px-2 py-1 text-end font-mono text-sm tabular focus:border-ink focus:outline-none"
          />
          <span className="w-20 text-xs text-ink-500">{unit}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider mt-4"
        style={{ ['--fill' as string]: `${(Math.min(value, max) / max) * 100}%` }}
      />
    </div>
  );
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-line py-4">
      <span className="text-[15px]">
        {label} {hint && <span className="ms-1 font-mono text-[11px] text-ink-500">{hint}</span>}
      </span>
      <span className="relative inline-flex shrink-0">
        <input type="checkbox" role="switch" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="h-6 w-11 rounded-full bg-line-strong transition-colors peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-go" />
        <span className="absolute start-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5 peer-checked:bg-mark rtl:peer-checked:-translate-x-5" />
      </span>
    </label>
  );
}

export function Estimator({ t, lang, contactHref, exclVat, perMonth }: Props) {
  const [s, setS] = useState<EstimateInput>({
    sales: 60,
    purchases: 120,
    employees: 5,
    hasCash: false,
    cashDaily: false,
    cashEntries: 100,
    vatPrep: true,
    coda: true,
    codaLines: 150,
    peppol: false,
  });
  const set = <K extends keyof EstimateInput>(k: K, v: EstimateInput[K]) => setS((p) => ({ ...p, [k]: v }));
  const r = useMemo(() => estimate(s), [s]);
  const eur = (n: number, d = 0) => formatEur(n, lang, d);
  const q = new URLSearchParams({
    est: String(r.total),
    sales: String(s.sales),
    purchases: String(s.purchases),
    employees: String(s.employees),
    cash: s.hasCash ? (s.cashDaily ? 'daily' : String(s.cashEntries)) : '0',
    opts: [s.vatPrep && 'vat', s.coda && 'coda', s.peppol && 'peppol'].filter(Boolean).join(','),
  });

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-12">
      <div className="px-6 pb-4 sm:px-10 lg:col-span-7">
        <div className="border-b border-line py-6">
          <p className="text-xl font-semibold tracking-tight">{t.title}</p>
          <p className="mt-1 text-sm text-ink-600">{t.subtitle}</p>
        </div>
        <Field id="e-sales" label={t.sales} hint={eur(rates.sales, 2)} unit={t.docsUnit} value={s.sales} max={1000} onChange={(n) => set('sales', n)} />
        <Field id="e-purch" label={t.purchases} hint={eur(rates.purchases, 2)} unit={t.docsUnit} value={s.purchases} max={1500} onChange={(n) => set('purchases', n)} />
        <Field id="e-pay" label={t.payroll} hint={eur(rates.payrollPerEmployee, 2)} unit={t.payrollUnit} value={s.employees} max={200} onChange={(n) => set('employees', n)} />
        <Toggle checked={s.hasCash} onChange={(v) => set('hasCash', v)} label={t.cashToggle} />
        {s.hasCash && (
          <div className="ps-4">
            <Toggle checked={s.cashDaily} onChange={(v) => set('cashDaily', v)} label={t.cashDaily} hint={eur(rates.cashDailyFlat)} />
            {!s.cashDaily && <Field id="e-cash" label={t.cashEntries} hint={eur(rates.cashPerEntry, 2)} unit={t.docsUnit} value={s.cashEntries} max={1500} onChange={(n) => set('cashEntries', n)} />}
          </div>
        )}
        <p className="pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{t.extras}</p>
        <Toggle checked={s.vatPrep} onChange={(v) => set('vatPrep', v)} label={t.vat} hint={`+${eur(rates.vatPrep)}`} />
        <Toggle checked={s.coda} onChange={(v) => set('coda', v)} label={t.coda} hint={eur(rates.codaPerLine, 2)} />
        {s.coda && (
          <div className="ps-4">
            <Field id="e-coda" label={t.codaLines} hint="" unit={t.docsUnit} value={s.codaLines} max={2000} step={10} onChange={(n) => set('codaLines', n)} />
          </div>
        )}
        <Toggle checked={s.peppol} onChange={(v) => set('peppol', v)} label={t.peppol} hint={`+${eur(rates.peppol)}`} />
      </div>

      <aside className="flex flex-col surface-blue p-6 text-white sm:p-10 lg:col-span-5" aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">{t.resultLabel}</p>
        <p className="mt-4 font-display font-bold text-7xl leading-none tabular">{eur(r.total)}</p>
        <p className="mt-2 text-sm text-white/60">
          {perMonth} · {exclVat}
        </p>
        <p className="mt-4 w-fit rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70">
          {t.range} {eur(r.low)} – {eur(r.high)}
        </p>
        <dl className="mt-10 space-y-2.5 border-t border-white/10 pt-6 text-sm">
          {r.lines
            .filter((l) => l.amount > 0)
            .map((l) => (
              <div key={l.key} className="flex justify-between gap-4">
                <dt className="text-white/70">{t.lines[l.key as keyof typeof t.lines]}</dt>
                <dd className="font-mono tabular">{eur(l.amount, 2)}</dd>
              </div>
            ))}
          {r.discountPct > 0 && (
            <div className="flex justify-between gap-4 text-mark">
              <dt>
                {t.discount} −{r.discountPct}%
              </dt>
              <dd className="font-mono tabular">−{eur(r.discount, 2)}</dd>
            </div>
          )}
        </dl>
        {r.minimumApplied && <p className="mt-2 text-xs text-white/60">{t.minimum}</p>}
        <p className="mt-2 font-mono text-[11px] text-white/60">
          {r.docs} {t.docsCount}
        </p>
        <div className="mt-auto pt-10">
          <Link href={`${contactHref}?${q.toString()}`} className={cx(buttonClass('inverse', 'lg'), 'w-full')}>
            {t.cta} <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-white/50">{t.disclaimer}</p>
        </div>
      </aside>
    </div>
  );
}
