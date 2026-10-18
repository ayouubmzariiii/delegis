'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { selectClient } from '@/lib/actions';
import type { Client } from '@/lib/types';
import type { AppText } from '@/content/app-types';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/primitives';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÀ-ÿ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/** Dropdown to scope the whole portal to one client company (or all of them). */
export function ClientSwitcher({
  clients,
  current,
  counts,
  locale,
  a,
}: {
  clients: Client[];
  current: Client | null;
  counts: Record<string, number>;
  locale: string;
  a: AppText['clients'];
}) {
  const pathname = usePathname() ?? `/${locale}/portal`;
  // Detail pages (e.g. a dossier) belong to one client, so switching goes back to the list.
  const back = pathname.replace(/\/dossiers\/[^/]+$/, '/dossiers');
  const multi = clients.length > 1;
  const base = `/${locale}/portal`;

  const Option = ({ id, label, sub, active, badge }: { id: string; label: string; sub?: string; active: boolean; badge?: number }) => (
    <form action={selectClient}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="clientId" value={id} />
      <input type="hidden" name="back" value={back} />
      <button className={cx('flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-start hover:bg-paper', active && 'bg-go-50')}>
        <span className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold', id === 'all' ? 'bg-ink text-white' : 'bg-go-50 text-go-700 ring-1 ring-go-100')}>
          {id === 'all' ? <Icon name="folder" className="h-4 w-4" /> : initials(label)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{label}</span>
          {sub && <span className="block truncate font-mono text-[10px] text-ink-500">{sub}</span>}
        </span>
        {!!badge && <span className="rounded-full bg-[#FFF5E6] px-1.5 text-[10px] font-bold text-[#9A5F0B]">{badge}</span>}
        {active && <Icon name="check" className="h-4 w-4 text-go-600" />}
      </button>
    </form>
  );

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white p-3 transition hover:border-go-300">
        <span className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold', current ? 'bg-go-50 text-go-700' : 'bg-ink text-white')}>
          {current ? initials(current.name) : <Icon name="folder" className="h-4 w-4" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-500">{a.label}</span>
          <span className="block truncate text-sm font-semibold">{current ? current.name : a.all}</span>
        </span>
        <Icon name="arrow" className="h-4 w-4 rotate-90 text-ink-400 transition group-open:-rotate-90" />
        <span className="sr-only">{a.switch}</span>
      </summary>
      {(
        <div className="absolute inset-x-0 z-50 mt-2 space-y-0.5 rounded-xl border border-line bg-white p-1.5 shadow-lift">
          {multi && <Option id="all" label={a.all} sub={a.count.replace('{n}', String(clients.length))} active={!current} />}
          {multi && <div className="my-1 h-px bg-line" />}
          {clients.map((c) => (
            <Option key={c.id} id={c.id} label={c.name} sub={c.vatNumber} active={current?.id === c.id} badge={counts[c.id]} />
          ))}
          <div className="my-1 h-px bg-line" />
          <Link href={`${base}/clients/new`} className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-semibold text-go-700 hover:bg-go-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-go-600 text-white"><Icon name="plus" className="h-4 w-4" /></span>
            {a.add}
          </Link>
        </div>
      )}
    </details>
  );
}
