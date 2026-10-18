import type { PortalContext } from '@/lib/portal';
import { selectClient } from '@/lib/actions';
import { fmtRelative } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';
import { Card } from './ui';

/** Consolidated table of the account's client companies; each row switches the portal to that client. */
export function PortfolioTable({ ctx, back }: { ctx: PortalContext; back?: string }) {
  const { account, a, locale, base } = ctx;
  const c = a.clients;
  const rows = account.clients.map((cl) => {
    const dossiers = account.dossiers.filter((d) => d.clientId === cl.id);
    return {
      cl,
      open: account.requests.filter((r) => r.clientId === cl.id && r.status === 'open').length,
      processing: dossiers.filter((d) => d.status === 'processing').length,
      last: dossiers[0]?.createdAt,
    };
  });
  return (
    <Card title={`${c.portfolio} · ${account.clients.length}`} pad={false}>
      <p className="border-b border-line px-5 py-3 text-sm text-ink-600">{c.portfolioIntro}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-ink-500">
            <tr className="border-b border-line">
              <th className="px-5 py-3 text-start font-medium">{c.colClient}</th>
              <th className="hidden px-5 py-3 text-start font-medium md:table-cell">{c.software}</th>
              <th className="whitespace-nowrap px-5 py-3 text-end font-medium">{c.colOpen}</th>
              <th className="hidden whitespace-nowrap px-5 py-3 text-end font-medium sm:table-cell">{c.colProcessing}</th>
              <th className="hidden whitespace-nowrap px-5 py-3 text-start font-medium lg:table-cell">{c.colLast}</th>
              <th className="px-5 py-3"><span className="sr-only">{c.open}</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(({ cl, open, processing, last }) => (
              <tr key={cl.id} className="hover:bg-paper">
                <td className="px-5 py-3.5">
                  <span className="block font-semibold">{cl.name}</span>
                  <span className="block font-mono text-[11px] text-ink-500">{cl.vatNumber}{cl.sector ? ` · ${cl.sector}` : ''}</span>
                </td>
                <td className="hidden px-5 py-3.5 text-ink-600 md:table-cell">{cl.software ?? '—'}</td>
                <td className="px-5 py-3.5 text-end">
                  <span className={`inline-flex min-w-[1.75rem] justify-center rounded-full px-2 py-0.5 text-xs font-bold ${open ? 'bg-[#FFF5E6] text-[#9A5F0B]' : 'bg-paper-200 text-ink-500'}`}>{open}</span>
                </td>
                <td className="hidden px-5 py-3.5 text-end tabular sm:table-cell">{processing}</td>
                <td className="hidden whitespace-nowrap px-5 py-3.5 text-ink-600 lg:table-cell">{last ? fmtRelative(last, locale) : '—'}</td>
                <td className="px-5 py-3.5 text-end">
                  <form action={selectClient}>
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="clientId" value={cl.id} />
                    <input type="hidden" name="back" value={back ?? base} />
                    <button className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-go-300 hover:text-go-700">
                      {c.open} <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
