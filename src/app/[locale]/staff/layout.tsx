import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/params';
import { currentUser } from '@/lib/auth';
import { logout } from '@/lib/actions';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/portal/ui';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Back-office · Delegis', robots: { index: false, follow: false } };

/** Internal back-office for Delegis staff (French UI: the production team works in French). */
export default async function StaffLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const user = await currentUser();
  if (!user) redirect(`/${locale}/login`);
  if (user.role !== 'staff') redirect(`/${locale}/portal`);
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-8">
          <Link href={`/${locale}/staff`} className="flex items-center gap-3">
            <Logo />
            <span className="rounded-md bg-ink px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">Back-office</span>
          </Link>
          <div className="ms-auto flex items-center gap-3">
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-sm font-medium sm:block">{user.name}</span>
            <form action={logout}>
              <input type="hidden" name="locale" value={locale} />
              <button className="rounded-lg px-3 py-1.5 text-sm text-ink-600 hover:bg-paper hover:text-ink">Déconnexion</button>
            </form>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
