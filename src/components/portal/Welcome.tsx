'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoMark } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/primitives';

const STEP_MS = 520;

/** Post-login transition: greets the user and ticks through loading steps, then opens the dashboard. */
export function WelcomeSequence({ title, subtitle, steps, skip, href }: { title: string; subtitle: string; steps: string[]; skip: string; href: string }) {
  const router = useRouter();
  const [done, setDone] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    router.prefetch(href);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = reduced ? 120 : STEP_MS;
    const t0 = setTimeout(() => setEntered(true), 30);
    const timers = steps.map((_, i) => setTimeout(() => setDone(i + 1), 400 + step * (i + 1)));
    const end = setTimeout(() => router.replace(href), 400 + step * (steps.length + 1) + 200);
    return () => [t0, end, ...timers].forEach(clearTimeout);
  }, [href, router, steps]);

  const pct = Math.round((done / steps.length) * 100);

  return (
    <div className="surface-blue relative flex min-h-screen items-center justify-center overflow-hidden px-5 text-white">
      <div aria-hidden="true" className="dots absolute -end-10 top-10 h-48 w-64 opacity-30" />
      <div aria-hidden="true" className="dots absolute -start-10 bottom-10 h-40 w-56 opacity-20" />
      <div className={cx('relative w-full max-w-md transition-all duration-700 ease-out', entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}>
        <div className="flex justify-center">
          <span className="relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-3xl bg-white/15 [animation-duration:2s]" />
            <span className="relative rounded-3xl bg-white p-3 shadow-glow">
              <LogoMark className="h-12 w-12" />
            </span>
          </span>
        </div>
        <h1 className="mt-8 text-center font-display text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-center text-white/75">{subtitle}</p>

        <ol className="mt-10 space-y-3 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15 backdrop-blur" aria-live="polite">
          {steps.map((s, i) => {
            const isDone = i < done;
            const active = i === done;
            return (
              <li key={s} className={cx('flex items-center gap-3 text-sm transition-opacity duration-300', isDone || active ? 'opacity-100' : 'opacity-40')}>
                <span className={cx('flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300', isDone ? 'bg-white text-go-700' : 'ring-1 ring-white/40')}>
                  {isDone ? <Icon name="check" className="h-3.5 w-3.5" /> : active ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}
                </span>
                <span className={isDone ? 'font-medium' : ''}>{s}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-white transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-6 text-center">
          <button onClick={() => router.replace(href)} className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
            {skip}
          </button>
        </p>
      </div>
    </div>
  );
}
