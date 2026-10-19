import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolveLocale } from '@/lib/params';
import { adminAssignManager } from '@/lib/actions';
import { allAccesses, findUser, getWorkspace, listTeam } from '@/lib/db';
import { fmtDate, fmtRelative } from '@/lib/format';
import { Card, StatusBadge, Avatar } from '@/components/portal/ui';
import { AdminAddClientForm, FirmForm, RequestAccessForm } from '@/components/admin/forms';
import { AccessTable } from '@/components/admin/AccessTable';
import { buttonClass } from '@/components/ui/primitives';

const LABEL = { received: 'Reçu', processing: 'En traitement', done: 'Terminé' } as const;

/** One accounting firm: its details, account manager, client companies, recent dossiers and accesses. */
export default async function FirmPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const firm = await findUser(id);
  if (!firm || firm.role !== 'client') notFound();
  const [ws, team, accesses] = await Promise.all([getWorkspace(firm.id), listTeam(), allAccesses(firm.id)]);
  const base = `/admin`;
  const manager = team.find((m) => m.id === firm.managerId);

  return (
    <>
      <Link href={`${base}/cabinets`} className="text-sm text-ink-500 hover:text-ink">
        ← Cabinets
      </Link>
      <div className="mb-6 mt-3 flex flex-wrap items-center gap-4">
        <Avatar name={firm.company || firm.name} tone="ink" size="lg" />
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{firm.company || firm.name}</h1>
          <p className="mt-1 text-sm text-ink-600">
            {firm.name} · {firm.email} · client depuis {fmtDate(firm.createdAt, locale)}
          </p>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title={`Clients du cabinet · ${ws.clients.length}`} pad={false}>
            <ul className="divide-y divide-line">
              {ws.clients.map((c) => {
                const ds = ws.dossiers.filter((d) => d.clientId === c.id);
                const open = ws.requests.filter((r) => r.clientId === c.id && r.status === 'open').length;
                return (
                  <li key={c.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5 text-sm">
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block text-xs text-ink-500">{[c.vatNumber, c.software, c.sector].filter(Boolean).join(' · ')}</span>
                    </span>
                    <span className="text-xs text-ink-600">
                      {ds.length} dossiers · {ds.filter((d) => d.status !== 'done').length} en cours{open ? ` · ${open} demandes ouvertes` : ''}
                    </span>
                  </li>
                );
              })}
              {!ws.clients.length && <li className="px-5 py-8 text-center text-sm text-ink-500">Ce cabinet n’a pas encore ajouté de client.</li>}
            </ul>
            <div className="border-t border-line p-5">
              <AdminAddClientForm locale={locale} firmId={firm.id} />
            </div>
          </Card>

          <Card title="Derniers dossiers" pad={false}>
            <ul className="divide-y divide-line">
              {ws.dossiers.slice(0, 8).map((d) => (
                <li key={d.id}>
                  <Link href={`${base}/dossiers/${d.id}`} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-paper">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{d.name}</span>
                      <span className="block text-xs text-ink-500">
                        {ws.clients.find((c) => c.id === d.clientId)?.name} · {fmtRelative(d.createdAt, locale)}
                      </span>
                    </span>
                    <StatusBadge status={d.status} label={LABEL[d.status]} />
                  </Link>
                </li>
              ))}
              {!ws.dossiers.length && <li className="px-5 py-8 text-center text-sm text-ink-500">Aucun dossier déposé.</li>}
            </ul>
          </Card>

          <Card title={`Accès · ${accesses.length}`} pad={false}>
            <AccessTable rows={accesses} locale={locale} showFirm={false} />
            {ws.clients.length > 0 && (
              <div className="border-t border-line p-5">
                <p className="mb-3 text-sm font-semibold">Demander un accès au cabinet</p>
                <RequestAccessForm locale={locale} clients={ws.clients.map((c) => ({ id: c.id, name: c.name }))} />
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Responsable de compte">
            {manager ? (
              <div className="mb-4 flex items-center gap-3">
                <Avatar name={manager.name} />
                <span className="text-sm">
                  <span className="block font-semibold">{manager.name}</span>
                  <span className="block text-xs text-ink-500">{[manager.title, manager.city].filter(Boolean).join(' · ')}</span>
                </span>
              </div>
            ) : (
              <p className="mb-4 text-sm text-[#9A5F0B]">Aucun responsable : le cabinet voit « Attribution en cours ».</p>
            )}
            <form action={adminAssignManager} className="flex gap-2">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="firmId" value={firm.id} />
              <select name="managerId" defaultValue={firm.managerId ?? ''} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm">
                <option value="">Non assigné</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                    {m.title ? ` · ${m.title}` : ''}
                  </option>
                ))}
              </select>
              <button className={buttonClass('secondary')}>Assigner</button>
            </form>
            <p className="mt-2 text-xs text-ink-500">Affiché dans le portail du cabinet avec son e-mail et son téléphone.</p>
          </Card>
          <Card title="Coordonnées">
            <FirmForm locale={locale} firm={{ id: firm.id, company: firm.company, name: firm.name, phone: firm.phone, vatNumber: firm.vatNumber, email: firm.email }} />
          </Card>
        </div>
      </div>
    </>
  );
}
