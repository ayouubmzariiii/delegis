import { localeMeta } from '@/lib/i18n';
import { portalContext } from '@/lib/portal';
import { fmtDate } from '@/lib/format';
import { formatEur } from '@/lib/pricing';
import { PageTitle } from '@/components/portal/ui';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/primitives';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Factures · Delegis' };

export default async function InvoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, ws, a, isPortfolio, account } = await portalContext(params);
  const clientName = (id: string) => account.clients.find((c) => c.id === id)?.name ?? '';
  const i = a.invoices;
  const lang = localeMeta[locale].lang;
  const due = ws.invoices.filter((x) => x.status === 'due');
  const totalDue = due.reduce((n, x) => n + x.amount, 0);

  return (
    <>
      <PageTitle title={i.title} intro={i.intro} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className={cx('rounded-2xl p-5', totalDue > 0 ? 'surface-blue text-white' : 'border border-line bg-white')}>
          <p className={cx('text-sm', totalDue > 0 ? 'text-white/85' : 'text-ink-500')}>{i.totalDue}</p>
          <p className="mt-2 font-display text-3xl font-bold tabular">{formatEur(totalDue, lang, 2)}</p>
          {due[0] && <p className="mt-1 text-sm text-white/85">{i.dueOn} : {fmtDate(due[0].dueAt, locale)}</p>}
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-sm text-ink-500">{i.paid}</p>
          <p className="mt-2 font-display text-3xl font-bold tabular">{formatEur(ws.invoices.filter((x) => x.status === 'paid').reduce((n, x) => n + x.amount, 0), lang, 2)}</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="text-xs text-ink-500">
            <tr className="border-b border-line">
              <th className="px-5 py-3 text-start font-medium">{i.number}</th>
              <th className="hidden px-5 py-3 text-start font-medium sm:table-cell">{i.period}</th>
              <th className="hidden px-5 py-3 text-start font-medium md:table-cell">{i.dueOn}</th>
              <th className="px-5 py-3 text-end font-medium">{i.amount}</th>
              <th className="px-5 py-3 text-end font-medium">{i.status}</th>
              <th className="px-5 py-3"><span className="sr-only">{i.download}</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ws.invoices.map((x) => (
              <tr key={x.id}>
                <td className="px-5 py-3.5">
                  <span className="block font-mono text-xs">{x.number}</span>
                  {isPortfolio && <span className="block text-xs text-ink-500">{clientName(x.clientId)}</span>}
                </td>
                <td className="hidden px-5 py-3.5 text-ink-600 sm:table-cell">{x.period}</td>
                <td className="hidden px-5 py-3.5 text-ink-600 md:table-cell">{fmtDate(x.dueAt, locale)}</td>
                <td className="px-5 py-3.5 text-end font-medium tabular">{formatEur(x.amount, lang, 2)}</td>
                <td className="px-5 py-3.5 text-end">
                  <span className={cx('rounded-full px-2.5 py-0.5 text-xs font-semibold', x.status === 'paid' ? 'bg-ok-50 text-ok-700' : 'bg-[#FFF5E6] text-[#9A5F0B]')}>{x.status === 'paid' ? i.paid : i.due}</span>
                </td>
                <td className="px-5 py-3.5 text-end">
                  <a href={`/api/files/invoice/${x.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-go-700 hover:underline">
                    <Icon name="download" className="h-3.5 w-3.5" /> {i.download}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
