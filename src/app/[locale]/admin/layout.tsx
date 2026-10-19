import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/params';
import { currentUser } from '@/lib/auth';
import { logout } from '@/lib/actions';
import { q } from '@/lib/sql';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/portal/ui';
import { AdminNav } from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Back-office · Delegis', robots: { index: false, follow: false } };

/** Internal back-office for the Delegis team (French UI: the production team works in French). */
export default async function AdminLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const user = await currentUser();
  if (!user) redirect(`/${locale}/login`);
  if (user.role !== 'staff') redirect(`/portal`);
  const [c] = await q<{ queue: string; access: string }>(
    `SELECT (SELECT count(*) FROM dossiers WHERE status = 'received') AS queue, (SELECT count(*) FROM accesses WHERE status = 'requested') AS access`,
  );
  const base = `/admin`;
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-8">
          <Link href={base} className="flex items-center gap-3">
            <Logo />
            <span className="rounded-md bg-ink px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">Admin</span>
          </Link>
          <div className="ms-auto flex items-center gap-3">
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-sm sm:block">
              <span className="block font-medium leading-tight">{user.name}</span>
              {user.title && <span className="block text-xs text-ink-500">{user.title}</span>}
            </span>
            <form action={logout}>
              <input type="hidden" name="locale" value={locale} />
              <button className="rounded-lg px-3 py-1.5 text-sm text-ink-600 hover:bg-paper hover:text-ink">Déconnexion</button>
            </form>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <AdminNav base={base} counts={{ queue: Number(c?.queue ?? 0), access: Number(c?.access ?? 0) }} />
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
