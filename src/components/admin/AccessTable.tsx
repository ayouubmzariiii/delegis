import type { AccessRow } from '@/lib/db';
import type { Locale } from '@/lib/i18n';
import { fmtRelative } from '@/lib/format';
import { RevealSecret } from './forms';

const KIND = { software: 'Logiciel', bank: 'Banque', tax: 'Fiscal', other: 'Autre' } as const;
const STATUS = {
  requested: ['À fournir par le cabinet', 'bg-[#FFF5E6] text-[#9A5F0B]'],
  provided: ['Actif', 'bg-ok-50 text-ok-700'],
  revoked: ['Retiré', 'bg-paper-200 text-ink-500'],
} as const;

/** Shared accesses as the team sees them: who, what, state, and the password on demand. */
export function AccessTable({ rows, locale, showFirm = true }: { rows: AccessRow[]; locale: Locale; showFirm?: boolean }) {
  if (!rows.length) return <p className="px-5 py-10 text-center text-sm text-ink-500">Aucun accès.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[52rem] text-sm">
        <thead className="bg-paper/60 text-xs text-ink-500">
          <tr>
            <th className="px-5 py-3 text-start font-medium">Accès</th>
            <th className="px-5 py-3 text-start font-medium">Client{showFirm ? ' · cabinet' : ''}</th>
            <th className="px-5 py-3 text-start font-medium">Identifiant</th>
            <th className="px-5 py-3 text-start font-medium">Mot de passe</th>
            <th className="px-5 py-3 text-end font-medium">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((x) => (
            <tr key={x.id} className="align-top">
              <td className="px-5 py-3">
                <span className="block font-semibold">{x.label}</span>
                <span className="block text-xs text-ink-500">
                  {KIND[x.kind]}
                  {x.url && (
                    <>
                      {' · '}
                      <a href={x.url} target="_blank" rel="noreferrer noopener" className="text-go-700 hover:underline">
                        {x.url.replace(/^https?:\/\//, '')}
                      </a>
                    </>
                  )}
                </span>
                {(x.status === 'requested' ? x.requestNote : x.notes) && <span className="mt-1 block max-w-sm text-xs text-ink-600">{x.status === 'requested' ? x.requestNote : x.notes}</span>}
              </td>
              <td className="px-5 py-3">
                <span className="block">{x.clientName}</span>
                {showFirm && <span className="block text-xs text-ink-500">{x.firmName}</span>}
              </td>
              <td className="px-5 py-3 font-mono text-xs">{x.login ?? '—'}</td>
              <td className="px-5 py-3">{x.status === 'provided' && x.hasSecret ? <RevealSecret accessId={x.id} /> : <span className="text-ink-400">—</span>}</td>
              <td className="whitespace-nowrap px-5 py-3 text-end">
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS[x.status][1]}`}>{STATUS[x.status][0]}</span>
                <span className="mt-1 block text-[11px] text-ink-400">
                  {x.status === 'requested' ? `${x.requestedBy ?? ''} · ` : x.updatedBy ? `${x.updatedBy} · ` : ''}
                  {fmtRelative(x.updatedAt, locale)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
