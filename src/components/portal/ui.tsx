import type { ReactNode } from 'react';
import type { DossierStatus } from '@/lib/types';
import { cx } from '@/components/ui/primitives';

export function Card({ title, action, children, className, pad = true }: { title?: string; action?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={cx('rounded-2xl border border-line bg-white shadow-card', className)}>
      {title && (
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 className="font-display text-base font-semibold">{title}</h2>
          {action}
        </header>
      )}
      <div className={pad ? 'p-5' : ''}>{children}</div>
    </section>
  );
}

const statusStyle: Record<DossierStatus, string> = {
  received: 'bg-paper-200 text-ink-700 ring-line-strong',
  processing: 'bg-go-50 text-go-700 ring-go-100',
  done: 'bg-ok-50 text-ok-700 ring-ok-600/20',
};

export function StatusBadge({ status, label }: { status: DossierStatus; label: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset', statusStyle[status])}>
      <span className={cx('h-1.5 w-1.5 rounded-full', status === 'done' ? 'bg-ok-600' : status === 'processing' ? 'bg-go-600' : 'bg-ink-400')} />
      {label}
    </span>
  );
}

export function Avatar({ name, tone = 'go', size = 'md' }: { name: string; tone?: 'go' | 'ink' | 'ok'; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const t = { go: 'bg-go-600 text-white', ink: 'bg-ink text-white', ok: 'bg-ok-600 text-white' }[tone];
  const s = { sm: 'h-7 w-7 text-[11px]', md: 'h-9 w-9 text-xs', lg: 'h-12 w-12 text-sm' }[size];
  return (
    <span aria-hidden="true" className={cx('inline-flex shrink-0 items-center justify-center rounded-full font-bold', t, s)}>
      {initials}
    </span>
  );
}

export function PageTitle({ title, intro, action }: { title: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        {intro && <p className="mt-1.5 text-ink-600">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-line-strong px-6 py-10 text-center text-sm text-ink-500">{children}</p>;
}
