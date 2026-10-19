'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/primitives';

/** Tabs of the Delegis back-office, with live counters. */
export function AdminNav({ base, counts }: { base: string; counts: { queue: number; access: number } }) {
  const pathname = usePathname() ?? base;
  const items = [
    { href: base, label: 'File de travail', icon: 'folder', badge: counts.queue, exact: true },
    { href: `${base}/cabinets`, label: 'Cabinets', icon: 'users' },
    { href: `${base}/acces`, label: 'Accès', icon: 'key', badge: counts.access },
    { href: `${base}/equipe`, label: 'Équipe', icon: 'user' },
  ];
  return (
    <nav aria-label="Back-office" className="-mb-px flex gap-1 overflow-x-auto">
      {items.map((it) => {
        // A dossier page belongs to the work queue.
        const active = it.exact ? pathname === base || pathname.startsWith(`${base}/dossiers`) : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? 'page' : undefined}
            className={cx(
              'flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors',
              active ? 'border-go-600 text-ink' : 'border-transparent text-ink-500 hover:text-ink',
            )}
          >
            <Icon name={it.icon} className={cx('h-4 w-4', active ? 'text-go-600' : 'text-ink-400')} />
            {it.label}
            {!!it.badge && <span className="rounded-full bg-[#FFF5E6] px-1.5 text-[10px] font-bold text-[#9A5F0B]">{it.badge}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
