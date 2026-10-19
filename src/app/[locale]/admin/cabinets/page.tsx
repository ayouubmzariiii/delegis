import Link from 'next/link';
import { resolveLocale } from '@/lib/params';
import { listFirms, listTeam } from '@/lib/db';
import { fmtRelative } from '@/lib/format';
import { Card, Avatar } from '@/components/portal/ui';
import { CreateFirmForm } from '@/components/admin/forms';
import { Icon } from '@/components/ui/Icon';

/** Every accounting firm that sends us dossiers, with workload and assigned manager. */
export default async function FirmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const [firms, team] = await Promise.all([listFirms(), listTeam()]);
  const base = `/admin`;
  const unassigned = firms.filter((f) => !f.managerName).length;

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight">Cabinets</h1>
      <p className="mt-1.5 text-ink-600">Les bureaux comptables clients de Delegis. Chaque cabinet nous confie les dossiers de ses propres clients.</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ['Cabinets', firms.length],
          ['Clients gérés', firms.reduce((s, f) => s + f.clients, 0)],
          ['Sans responsable', unassigned],
        ].map(([l, v]) => (
          <div key={String(l)} className={`rounded-2xl border p-5 shadow-card ${l === 'Sans responsable' && v ? 'border-[#F3C987] bg-[#FFF8EC]' : 'border-line bg-white'}`}>
            <dt className="text-sm text-ink-500">{l}</dt>
            <dd className="mt-2 font-display text-3xl font-bold tabular">{v}</dd>
          </div>
        ))}
      </dl>

      <Card title={`Tous les cabinets · ${firms.length}`} pad={false} className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead className="bg-paper/60 text-xs text-ink-500">
              <tr>
                <th className="px-5 py-3 text-start font-medium">Cabinet</th>
                <th className="px-5 py-3 text-start font-medium">Responsable</th>
                <th className="px-5 py-3 text-end font-medium">Clients</th>
                <th className="px-5 py-3 text-end font-medium">Dossiers en cours</th>
                <th className="px-5 py-3 text-end font-medium">Accès à fournir</th>
                <th className="px-5 py-3 text-start font-medium">Dernier dépôt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {firms.map((f) => (
                <tr key={f.id} className="hover:bg-paper/60">
                  <td className="px-5 py-3">
                    <Link href={`${base}/cabinets/${f.id}`} className="flex items-center gap-3">
                      <Avatar name={f.company || f.name} tone="ink" size="sm" />
                      <span>
                        <span className="block font-semibold hover:text-go-700">{f.company || '—'}</span>
                        <span className="block text-xs text-ink-500">
                          {f.name} · {f.email}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-3">{f.managerName ?? <span className="rounded-full bg-[#FFF5E6] px-2 py-0.5 text-xs font-bold text-[#9A5F0B]">À assigner</span>}</td>
                  <td className="px-5 py-3 text-end tabular">{f.clients}</td>
                  <td className="px-5 py-3 text-end tabular">{f.open}</td>
                  <td className="px-5 py-3 text-end tabular">{f.pendingAccess || '—'}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-ink-600">{f.lastActivity ? fmtRelative(f.lastActivity, locale) : '—'}</td>
                </tr>
              ))}
              {!firms.length && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-ink-500">
                    Aucun cabinet pour l’instant.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <details className="group mt-6 rounded-2xl border border-line bg-white shadow-card">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 font-display font-semibold">
          <Icon name="plus" className="h-4 w-4 text-go-600" /> Ouvrir un compte cabinet
          <span className="ms-auto text-sm font-normal text-ink-500">Le cabinet se connecte ensuite avec cet e-mail et ce mot de passe.</span>
        </summary>
        <div className="border-t border-line p-5">
          <CreateFirmForm locale={locale} team={team.map((m) => ({ id: m.id, name: m.name }))} />
        </div>
      </details>
    </>
  );
}
