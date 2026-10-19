import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolveLocale } from '@/lib/params';
import { staffAdvance } from '@/lib/actions';
import { clientWorkspace, staffDossier } from '@/lib/db';
import { fmtBytes, fmtDateTime, fmtRelative } from '@/lib/format';
import type { TimelineStep } from '@/lib/types';
import { Card, StatusBadge, Avatar } from '@/components/portal/ui';
import { DeliverForm, ReplyForm, RequestForm, RequestAccessForm } from '@/components/admin/forms';
import { AccessTable } from '@/components/admin/AccessTable';
import { Icon } from '@/components/ui/Icon';
import { buttonClass, cx } from '@/components/ui/primitives';

const STEPS: { step: TimelineStep; label: string }[] = [
  { step: 'received', label: 'Pièces reçues' },
  { step: 'encoding', label: 'Encodage' },
  { step: 'review', label: 'Contrôle (4 yeux)' },
  { step: 'delivered', label: 'Livré' },
];
const LABEL = { received: 'Reçu', processing: 'En traitement', done: 'Terminé' } as const;

export default async function StaffDossier({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const d = await staffDossier(id);
  if (!d) notFound();
  const target = await clientWorkspace(d.clientId);
  if (!target) notFound();
  const { ws, client } = target;
  const done = new Map((d.timeline ?? []).map((s) => [s.step, s.at]));
  const requests = ws.requests.filter((r) => r.dossierId === d.id);
  const thread = ws.messages.slice(-12);

  return (
    <>
      <Link href={`/${locale}/admin`} className="text-sm text-ink-500 hover:text-ink">
        ← File de travail
      </Link>
      <div className="mb-6 mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-go-700">
            {client.name} ·{' '}
            <Link href={`/${locale}/admin/cabinets/${d.userId}`} className="hover:underline">
              {d.accountName}
            </Link>
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">{d.name}</h1>
          <p className="mt-2 flex items-center gap-3 text-sm text-ink-600">
            <StatusBadge status={d.status} label={LABEL[d.status]} /> {d.period && <span className="font-mono text-xs">{d.period}</span>} {client.software && <span>{client.software}</span>}
          </p>
        </div>
        {d.status !== 'done' && (
          <form action={staffAdvance}>
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="dossierId" value={d.id} />
            <button className={buttonClass('primary')}>
              <Icon name="check" className="h-4 w-4" /> Passer à l’étape suivante
            </button>
          </form>
        )}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Suivi">
            <ol className="grid gap-4 sm:grid-cols-4">
              {STEPS.map((s, i) => {
                const at = done.get(s.step);
                return (
                  <li key={s.step}>
                    <span className={cx('flex h-8 w-8 items-center justify-center rounded-full', at ? 'bg-go-600 text-white' : 'bg-paper-200 text-ink-400')}>
                      {at ? <Icon name="check" className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </span>
                    <p className="mt-2 text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-ink-400">{at ? fmtDateTime(at, locale) : '—'}</p>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card title={`Pièces · ${d.files.length}`} pad={false}>
            <ul className="divide-y divide-line">
              {d.files.map((f, i) => (
                <li key={`${f.stored}-${i}`} className="flex items-center gap-3 px-5 py-2.5 text-sm">
                  <span className="w-12 font-mono text-[10px] font-bold uppercase text-ink-500">{f.name.split('.').pop()}</span>
                  <span className="min-w-0 flex-1 truncate">{f.name}</span>
                  <span className="text-xs text-ink-400">{fmtBytes(f.size, locale)}</span>
                  <a href={`/api/files/dossier/${d.id}/${i}`} className="text-ink-500 hover:text-go-700" aria-label={`Télécharger ${f.name}`}>
                    <Icon name="download" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>

          <Card title={`Conversation avec ${client.name}`}>
            <ul className="mb-5 space-y-3">
              {thread.map((m) => (
                <li key={m.id} className={cx('flex gap-3', m.author === 'team' && 'flex-row-reverse text-end')}>
                  <Avatar name={m.authorName} tone={m.author === 'team' ? 'go' : 'ink'} size="sm" />
                  <div className={cx('max-w-[80%] rounded-2xl px-4 py-2.5 text-sm', m.author === 'team' ? 'bg-go-600 text-white' : 'border border-line bg-paper')}>
                    <p className={cx('mb-0.5 text-[11px]', m.author === 'team' ? 'text-white/80' : 'text-ink-500')}>
                      {m.authorName} · {fmtRelative(m.createdAt, locale)}
                    </p>
                    {m.body}
                  </div>
                </li>
              ))}
            </ul>
            <ReplyForm locale={locale} clientId={client.id} dossierId={d.id} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title={`Accès du client · ${ws.accesses.filter((x) => x.status === 'provided').length}`} pad={false}>
            <AccessTable rows={ws.accesses.filter((x) => x.status !== 'revoked').map((x) => ({ ...x, clientName: client.name, firmName: d.accountName }))} locale={locale} showFirm={false} />
            <details className="border-t border-line">
              <summary className="cursor-pointer px-5 py-3 text-sm font-semibold text-go-700">Demander un accès</summary>
              <div className="px-5 pb-5">
                <RequestAccessForm locale={locale} clients={[{ id: client.id, name: client.name }]} />
              </div>
            </details>
          </Card>
          <Card title="Demander une pièce">
            <RequestForm locale={locale} dossierId={d.id} />
            {requests.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                {requests.map((r) => (
                  <li key={r.id} className="flex items-start gap-2">
                    <span className={cx('mt-1.5 h-2 w-2 shrink-0 rounded-full', r.status === 'open' ? 'bg-[#E3901A]' : 'bg-ok-600')} />
                    <span className="flex-1">
                      {r.title}
                      {r.answer && (
                        <span className="block text-xs text-ink-500">
                          Réponse : {r.answer.note || '—'}
                          {r.answer.files.map((f, i) => (
                            <a key={f.stored} href={`/api/files/request/${r.id}/${i}`} className="ms-2 text-go-700 underline">
                              {f.name}
                            </a>
                          ))}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title="Livrer un document">
            <DeliverForm locale={locale} dossierId={d.id} />
          </Card>
          <Card title="Responsable">
            <p className="text-sm">{d.assignee ?? 'Non assigné'}</p>
          </Card>
        </div>
      </div>
    </>
  );
}
