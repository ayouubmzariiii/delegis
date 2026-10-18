'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/primitives';

export type NavItem = { href: string; label: string; icon: string; badge?: number };

/** Sidebar links with active state (client-side so it follows navigation). */
export function SideNav({ items, base }: { items: NavItem[]; base: string }) {
  const pathname = usePathname() ?? '';
  return (
    <ul className="space-y-1">
      {items.map((it) => {
        const active = it.href === base ? pathname === base : pathname.startsWith(it.href);
        return (
          <li key={it.href}>
            <Link
              href={it.href}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-white text-ink shadow-card ring-1 ring-line' : 'text-ink-600 hover:bg-white/70 hover:text-ink',
              )}
            >
              <Icon name={it.icon} className={cx('h-[18px] w-[18px]', active ? 'text-go-600' : 'text-ink-400 group-hover:text-ink-600')} />
              <span className="flex-1">{it.label}</span>
              {!!it.badge && <span className="min-w-[1.25rem] rounded-full bg-go-600 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">{it.badge}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
