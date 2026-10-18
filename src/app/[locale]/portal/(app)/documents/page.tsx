import { portalContext } from '@/lib/portal';
import { fmtBytes, fmtDate } from '@/lib/format';
import { PageTitle, Empty } from '@/components/portal/ui';
import { Icon } from '@/components/ui/Icon';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Documents · Delegis' };

const kindIcon = { report: 'ledger', vat: 'percent', ledger: 'database', peppol: 'bolt' } as const;

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, ws, a, isPortfolio, account } = await portalContext(params);
  const clientName = (id: string) => account.clients.find((c) => c.id === id)?.name ?? '';
  return (
    <>
      <PageTitle title={a.documents.title} intro={a.documents.intro} />
      {ws.deliverables.length === 0 ? (
        <Empty>{a.documents.empty}</Empty>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ws.deliverables.map((d) => (
            <li key={d.id} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-go-50 text-go-600">
                  <Icon name={kindIcon[d.kind]} className="h-5 w-5" />
                </span>
                <span className="rounded-md bg-paper px-2 py-0.5 text-[11px] font-semibold text-ink-600">{a.documents.kinds[d.kind]}</span>
              </div>
              <p className="mt-4 flex-1 font-medium">{d.title}</p>
              {isPortfolio && <p className="mt-1 text-xs font-semibold text-go-700">{clientName(d.clientId)}</p>}
              <p className="mt-1 text-xs text-ink-500">
                {fmtDate(d.createdAt, locale)} · {fmtBytes(d.size, locale)}
              </p>
              <a href={`/api/files/deliverable/${d.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-go-700 hover:underline">
                <Icon name="download" className="h-4 w-4" /> {a.documents.download}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
