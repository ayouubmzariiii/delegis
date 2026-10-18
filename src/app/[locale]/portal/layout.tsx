import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/params';
import { currentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Every portal route requires a session. */
export default async function PortalGuard({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  if (!(await currentUser())) redirect(`/${locale}/login`);
  return children;
}
