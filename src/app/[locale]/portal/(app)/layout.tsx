import { portalContext } from '@/lib/portal';
import { Shell } from '@/components/portal/Shell';

export default async function AppLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const ctx = await portalContext(params);
  return <Shell ctx={ctx}>{children}</Shell>;
}
