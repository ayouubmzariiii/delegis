import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { currentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Every portal route requires a session. */
export default async function PortalGuard({ children }: { children: React.ReactNode }) {
  if (!(await currentUser())) redirect('/login');
  return children;
}
