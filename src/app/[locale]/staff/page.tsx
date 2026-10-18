import Link from 'next/link';
import { resolveLocale } from '@/lib/params';
import { staffAdvance } from '@/lib/actions';
import { staffInbox, staffQueue } from '@/lib/db';
import { fmtRelative } from '@/lib/format';
import type { DossierStatus } from '@/lib/types';
import { Card, StatusBadge, Avatar } from '@/components/portal/ui';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/primitives';

const LABEL: Record<DossierStatus, string> = { received: 'Reçu', processing: 'En traitement', done: 'Terminé' };
const NEXT_LABEL: Record<string, string> = { received: 'Démarrer l’encodage', processing: 'Étape suivante' };

export default async function StaffHome({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ status?: string }> }) {
  const locale = await resolveLocale(params);
  const { status } = await searchParams;
  const filter = (['received', 'processing', 'done'] as const).find((s) => s === status);
  const [queue, all, inbox] = await Promise.all([staffQueue(filter), staffQueue(), staffInbox()]);
  const count = (s: DossierStatus) => all.filter((d) => d.status === s).length;
  const waiting = inbox.filter((m) => m.author === 'client');
  const base = `/${locale}/staff`;

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight">File de travail</h1>
      <p className="mt-1.5 text-ink-600">Tous les dossiers déposés par les clients, du plus récent au plus ancien.</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          ['À démarrer', count('received'), 'received'],
          ['En traitement', count('processing'), 'processing'],
          ['Terminés', count('done'), 'done'],
          ['Messages en attente', waiting.length, ''],
        ].map(([l, v, s]) => (
          <Link key={String(l)} href={s ? `${base}?status=${s}` : '#inbox'} className="rounded-2xl border border-line bg-white p-5 shadow-card hover:border-go-300">
            <dt className="text-sm text-ink-500">{l}</dt>
            <dd className="mt-2 font-display text-3xl font-bold tabular">{v}</dd>
          </Link>
        ))}
      </dl>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-3">
        <Card
          title="Dossiers"
          className="xl:col-span-2"
          pad={false}
          action={
            <nav className="flex gap-1 rounded-lg bg-paper p-1 text-xs">
              {[['', 'Tous'], ['received', 'Reçus'], ['processing', 'En cours'], ['done', 'Terminés']].map(([s, l]) => (
                <Link key={s} href={s ? `${base}?status=${s}` : base} className={cx('rounded-md px-2.5 py-1 font-medium', (filter ?? '') === s ? 'bg-white shadow-card' : 'text-ink-500 hover:text-ink')}>
                  {l}
                </Link>
              ))}
            </nav>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-sm">
              <thead className="bg-paper/60 text-xs text-ink-500">
                <tr>
                  <th className="px-5 py-3 text-start font-medium">Dossier</th>
                  <th className="px-5 py-3 text-start font-medium">Client</th>
                  <th className="px-5 py-3 text-end font-medium">Pièces</th>
                  <th className="px-5 py-3 text-start font-medium">Déposé</th>
                  <th className="px-5 py-3 text-end font-medium">Statut</th>
                  <th className="w-px px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {queue.slice(0, 60).map((d) => (
                  <tr key={d.id} className="hover:bg-paper/60">
                    <td className="px-5 py-3">
                      <Link href={`${base}/dossiers/${d.id}`} className="font-medium hover:text-go-700">{d.name}</Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className="block">{d.clientName}</span>
                      <span className="block text-xs text-ink-500">{d.accountName}</span>
                    </td>
                    <td className="px-5 py-3 text-end tabular">{d.files.length}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-ink-600">{fmtRelative(d.createdAt, locale)}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-end">
                      <StatusBadge status={d.status} label={LABEL[d.status]} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-end">
                      {d.status !== 'done' && (
                        <form action={staffAdvance}>
                          <input type="hidden" name="locale" value={locale} />
                          <input type="hidden" name="dossierId" value={d.id} />
                          <button className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold hover:border-go-300 hover:text-go-700">{NEXT_LABEL[d.status]}</button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Conversations" pad={false}>
          <ul id="inbox" className="divide-y divide-line">
            {inbox.slice(0, 12).map((m) => (
              <li key={m.id} className="flex gap-3 px-5 py-3.5">
                <Avatar name={m.clientName} tone={m.author === 'client' ? 'go' : 'ink'} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    {m.clientName}
                    {m.author === 'client' && <span className="rounded-full bg-[#FFF5E6] px-1.5 text-[10px] font-bold text-[#9A5F0B]">à répondre</span>}
                  </p>
                  <p className="line-clamp-2 text-xs text-ink-600">
                    {m.author === 'team' ? `${m.authorName} : ` : ''}
                    {m.body}
                  </p>
                  <p className="text-[11px] text-ink-400">{fmtRelative(m.createdAt, locale)}</p>
                </div>
                {(m.dossierId ?? all.find((d) => d.clientId === m.clientId)?.id) && (
                  <Link href={`${base}/dossiers/${m.dossierId ?? all.find((d) => d.clientId === m.clientId)?.id}`} className="self-center text-ink-400 hover:text-go-700" aria-label="Ouvrir le dossier">
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
