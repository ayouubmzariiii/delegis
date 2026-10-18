import Link from 'next/link';
import type { PortalContext } from '@/lib/portal';
import { selectClient } from '@/lib/actions';
import { fmtRelative } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';

const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÀ-ÿ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/** Clean table of the account's client companies; "Ouvrir" scopes the portal to that client. */
export function ClientTable({ ctx }: { ctx: PortalContext }) {
  const { account, a, locale, base } = ctx;
  const c = a.clients;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <h2 className="font-display text-base font-semibold">
          {c.navLabel} <span className="ms-1 text-sm font-normal text-ink-500">{account.clients.length}</span>
        </h2>
        <Link href={`${base}/clients/new`} className={buttonClass('primary')}>
          <Icon name="plus" className="h-4 w-4" /> {c.newClient}
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-paper/60 text-xs text-ink-500">
            <tr>
              <th className="px-5 py-3 text-start font-medium">{c.colClient}</th>
              <th className="px-5 py-3 text-start font-medium">{c.software}</th>
              <th className="px-5 py-3 text-end font-medium">{c.colOpen}</th>
              <th className="px-5 py-3 text-end font-medium">{c.colProcessing}</th>
              <th className="px-5 py-3 text-start font-medium">{c.colLast}</th>
              <th className="w-px px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {account.clients.map((cl) => {
              const dossiers = account.dossiers.filter((d) => d.clientId === cl.id);
              const open = account.requests.filter((r) => r.clientId === cl.id && r.status === 'open').length;
              const processing = dossiers.filter((d) => d.status === 'processing').length;
              return (
                <tr key={cl.id} className="hover:bg-paper/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-go-50 text-xs font-bold text-go-700">{initials(cl.name)}</span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{cl.name}</p>
                        <p className="truncate font-mono text-[11px] text-ink-500">{[cl.vatNumber, cl.sector].filter(Boolean).join(' · ') || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-ink-600">{cl.software || '—'}</td>
                  <td className="px-5 py-3.5 text-end">
                    <span className={`inline-flex min-w-[1.75rem] justify-center rounded-full px-2 py-0.5 text-xs font-bold ${open ? 'bg-[#FFF5E6] text-[#9A5F0B]' : 'bg-paper-200 text-ink-500'}`}>{open}</span>
                  </td>
                  <td className="px-5 py-3.5 text-end tabular">{processing}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-ink-600">{dossiers[0] ? fmtRelative(dossiers[0].createdAt, locale) : '—'}</td>
                  <td className="px-5 py-3.5 text-end">
                    <form action={selectClient}>
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="clientId" value={cl.id} />
                      <input type="hidden" name="back" value={base} />
                      <button className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-go-300 hover:text-go-700">
                        {c.open} <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Kept for compatibility: the overview's "all clients" view now uses the table. */
export const ClientCards = ClientTable;
