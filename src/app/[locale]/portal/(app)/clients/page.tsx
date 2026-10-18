import { portalContext } from '@/lib/portal';
import { PageTitle } from '@/components/portal/ui';
import { ClientTable } from '@/components/portal/ClientCards';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const ctx = await portalContext(params);
  const { account, a } = ctx;
  const open = account.requests.filter((r) => r.status === 'open').length;
  const processing = account.dossiers.filter((d) => d.status === 'processing').length;
  return (
    <>
      <PageTitle title={a.clients.navLabel} intro={a.clients.portfolioIntro} />
      <dl className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          [a.stats.clients, account.clients.length],
          [a.overview.kpiRequests, open],
          [a.overview.kpiProcessing, processing],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <dt className="text-sm text-ink-500">{l}</dt>
            <dd className="mt-2 font-display text-3xl font-bold tabular">{v}</dd>
          </div>
        ))}
      </dl>
      <ClientTable ctx={ctx} />
    </>
  );
}
