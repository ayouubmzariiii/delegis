import Link from 'next/link';
import type { ReactNode } from 'react';
import type { PortalContext } from '@/lib/portal';
import { ClientSwitcher } from './ClientSwitcher';
import { logout, markAllRead } from '@/lib/actions';
import { fmtRelative } from '@/lib/format';
import { getApp } from '@/content/app';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';
import { SideNav, type NavItem } from './SideNav';
import { Avatar } from './ui';
import { telHref } from '@/lib/site';

const kindIcon = { message: 'chat', request: 'inbox', status: 'folder', document: 'download', invoice: 'receipt' } as const;

export function Shell({ ctx, children }: { ctx: PortalContext; children: ReactNode }) {
  const { locale, user, ws, account, client, manager } = ctx;
  const a = getApp(locale);
  const openByClient = Object.fromEntries(account.clients.map((c) => [c.id, account.requests.filter((r) => r.clientId === c.id && r.status === 'open').length]));
  const clientName = (id: string) => account.clients.find((c) => c.id === id)?.name;
  const base = `/portal`;
  const unread = ws.notifications.filter((n) => !n.read);
  const openRequests = ws.requests.filter((r) => r.status === 'open').length;
  const pendingAccess = ws.accesses.filter((x) => x.status === 'requested').length;
  const unreadMessages = unread.filter((n) => n.kind === 'message').length;
  const items: NavItem[] = [
    { href: base, label: a.nav.overview, icon: 'home' },
    { href: `${base}/clients`, label: a.clients.navLabel, icon: 'users'},
    { href: `${base}/dossiers`, label: a.nav.dossiers, icon: 'folder' },
    { href: `${base}/requests`, label: a.nav.requests, icon: 'inbox', badge: openRequests },
    { href: `${base}/messages`, label: a.nav.messages, icon: 'chat', badge: unreadMessages },
    { href: `${base}/accesses`, label: a.nav.accesses, icon: 'key', badge: pendingAccess },
    { href: `${base}/documents`, label: a.nav.documents, icon: 'download' },
    { href: `${base}/invoices`, label: a.nav.invoices, icon: 'receipt' },
    { href: `${base}/settings`, label: a.nav.settings, icon: 'settings' },
  ];

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href={base} className="px-2 pt-1" aria-label="Delegis">
        <Logo />
      </Link>

      <div className="flex items-center gap-3 px-2">
        <Avatar name={user.company || user.name} tone="ink" size="md" />
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-500">{a.firm.label}</span>
          <span className="block truncate text-sm font-semibold">{user.company || user.name}</span>
        </span>
      </div>
      <ClientSwitcher clients={account.clients} current={client} counts={openByClient} locale={locale} a={a.clients} />
      <nav aria-label="Portal" className="flex-1">
        <SideNav items={items} base={base} />
      </nav>
      <div className="rounded-xl bg-white p-3 ring-1 ring-line">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{a.team.title}</p>
        {manager ? (
          <>
            <div className="mt-3 flex items-center gap-2.5">
              <Avatar name={manager.name} size="sm" />
              <span className="min-w-0 text-sm">
                <span className="block truncate font-medium">{manager.name}</span>
                <span className="block truncate text-[11px] text-ink-500">{[manager.title, manager.city].filter(Boolean).join(' · ')}</span>
              </span>
            </div>
            <div className="mt-2 space-y-0.5 text-[11px]">
              <a href={`mailto:${manager.email}`} className="block truncate text-ink-600 hover:text-go-700">{manager.email}</a>
              {manager.phone && (
                <a href={telHref(manager.phone)} dir="ltr" className="block text-ink-600 hover:text-go-700">{manager.phone}</a>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm font-medium">{a.team.unassigned}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-500">{a.team.unassignedText}</p>
          </>
        )}
        <Link href={`${base}/messages`} className={`${buttonClass('secondary')} mt-3 h-9 w-full`}>
          <Icon name="chat" className="h-4 w-4" /> {a.overview.write}
        </Link>
      </div>
      <div className="flex items-center justify-between px-2 text-sm">
        <Link href={`/${locale}`} className="text-ink-500 hover:text-ink">
          ← {a.nav.backToSite}
        </Link>
        <form action={logout}>
          <input type="hidden" name="locale" value={locale} />
          <button className="flex items-center gap-1.5 text-ink-500 hover:text-ink" title={a.nav.logout}>
            <Icon name="logout" className="h-4 w-4" />
            <span className="sr-only">{a.nav.logout}</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 start-0 hidden w-72 overflow-y-auto border-e border-line bg-paper-200/60 lg:block">{sidebar}</aside>

      <div className="lg:ps-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/85 px-4 backdrop-blur sm:px-8">
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg hover:bg-paper" aria-label="Menu">
              <Icon name="menu" />
            </summary>
            <div className="fixed inset-y-0 start-0 z-50 w-72 overflow-y-auto border-e border-line bg-paper shadow-lift">{sidebar}</div>
          </details>
          <div className="flex-1" />
          <Link href={`${base}/dossiers#upload`} className={`${buttonClass('primary')} hidden sm:inline-flex`}>
            <Icon name="upload" className="h-4 w-4" /> {a.nav.upload}
          </Link>
          <details className="relative">
            <summary className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-ink-600 hover:bg-paper hover:text-ink" aria-label={a.nav.notifications}>
              <Icon name="bell" />
              {unread.length > 0 && <span className="absolute end-2 top-2 h-2.5 w-2.5 rounded-full bg-go-600 ring-2 ring-white" />}
            </summary>
            <div className="absolute end-0 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="font-semibold">{a.notifications.title}</p>
                {unread.length > 0 && (
                  <form action={markAllRead}>
                    <input type="hidden" name="locale" value={locale} />
                    <button className="text-xs font-semibold text-go-700 hover:underline">{a.notifications.markRead}</button>
                  </form>
                )}
              </div>
              {ws.notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-ink-500">{a.notifications.empty}</p>
              ) : (
                <ul className="max-h-96 divide-y divide-line overflow-y-auto">
                  {ws.notifications.slice(0, 8).map((n) => (
                    <li key={n.id}>
                      <Link href={`${base}/${n.href}`} className={`flex gap-3 px-4 py-3 hover:bg-paper ${n.read ? '' : 'bg-go-50/50'}`}>
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-go-50 text-go-600">
                          <Icon name={kindIcon[n.kind]} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold text-ink-500">{a.notifications.kinds[n.kind]}{!client && clientName(n.clientId) ? ` · ${clientName(n.clientId)}` : ''}</span>
                          <span className="block truncate text-sm">{n.text}</span>
                          <span className="block text-[11px] text-ink-400">{fmtRelative(n.createdAt, locale)}</span>
                        </span>
                        {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-go-600" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
          <Link href={`${base}/settings`} className="flex items-center gap-2 rounded-lg p-1 pe-2 hover:bg-paper">
            <Avatar name={user.name} tone="ink" size="sm" />
            <span className="hidden text-sm font-medium sm:block">{user.name}</span>
          </Link>
        </header>

        <main id="main" className="px-4 py-8 sm:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
