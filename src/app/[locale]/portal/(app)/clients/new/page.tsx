import Link from 'next/link';
import { portalContext } from '@/lib/portal';
import { AddClientForm } from '@/components/portal/interactive';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function NewClientPage({ params }: { params: Promise<{ locale: string }> }) {
  const { a, base, locale } = await portalContext(params);
  return (
    <div className="mx-auto max-w-xl">
      <Link href={`${base}/clients`} className="text-sm text-ink-500 hover:text-ink">
        ← {a.clients.navLabel}
      </Link>
      <div className="mt-4 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">{a.clients.newClient}</h1>
        <p className="mb-6 mt-1.5 text-sm text-ink-600">{a.clients.newClientText}</p>
        <AddClientForm locale={locale} a={a.clients} cancelHref={`${base}/clients`} />
      </div>
    </div>
  );
}
