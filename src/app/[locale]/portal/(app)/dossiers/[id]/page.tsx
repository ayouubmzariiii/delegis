import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portalContext } from '@/lib/portal';
import { fmtBytes, fmtDate, fmtDateTime } from '@/lib/format';
import type { TimelineStep } from '@/lib/types';
import { Card, StatusBadge, Avatar } from '@/components/portal/ui';
import { Icon } from '@/components/ui/Icon';
import { buttonClass, cx } from '@/components/ui/primitives';

const STEPS: TimelineStep[] = ['received', 'encoding', 'review', 'delivered'];

export const dynamic = 'force-dynamic';

export default async function DossierPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const { locale, account: ws, a, t, base } = await portalContext(params);
  const d = ws.dossiers.find((x) => x.id === id);
  if (!d) notFound();
  const done = new Map((d.timeline ?? []).map((s) => [s.step, s.at]));
  const thread = ws.messages.filter((m) => m.dossierId === d.id);
  const requests = ws.requests.filter((r) => r.dossierId === d.id);
  const total = d.files.reduce((n, f) => n + f.size, 0);

  return (
    <>
      <Link href={`${base}/dossiers`} className="text-sm text-ink-500 hover:text-ink">
        ← {a.dossiers.back}
      </Link>
      <div className="mb-8 mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{d.name}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-600">
            <StatusBadge status={d.status} label={t.portal.status[d.status]} />
            {d.period && <span className="font-mono text-xs">{d.period}</span>}
            <span>{fmtDate(d.createdAt, locale, 'long')}</span>
          </p>
        </div>
        <Link href={`${base}/messages?dossier=${d.id}`} className={buttonClass('secondary')}>
          <Icon name="chat" className="h-4 w-4" /> {a.dossiers.discuss}
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title={a.dossiers.timelineTitle}>
            <ol className="grid gap-4 sm:grid-cols-4">
              {STEPS.map((s, i) => {
                const at = done.get(s);
                const current = !at && (i === 0 || done.has(STEPS[i - 1]));
                return (
                  <li key={s} className="relative">
                    {i < STEPS.length - 1 && <span aria-hidden="true" className={cx('absolute start-10 top-4 hidden h-0.5 w-[calc(100%-2rem)] sm:block', done.has(STEPS[i + 1]) ? 'bg-go-600' : 'bg-line')} />}
                    <span className={cx('relative flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white', at ? 'bg-go-600 text-white' : current ? 'bg-go-50 text-go-700 ring-go-100' : 'bg-paper-200 text-ink-400')}>
                      {at ? <Icon name="check" className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </span>
                    <p className={cx('mt-3 text-sm font-medium', !at && 'text-ink-500')}>{a.dossiers.steps[s]}</p>
                    <p className="text-xs text-ink-400">{at ? fmtDateTime(at, locale) : a.dossiers.pending}</p>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card title={`${a.dossiers.filesTitle} · ${d.files.length}`} action={<span className="text-xs text-ink-500">{fmtBytes(total, locale)}</span>} pad={false}>
            <ul className="divide-y divide-line">
              {d.files.map((f, i) => (
                <li key={`${f.stored}-${i}`} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper font-mono text-[10px] font-bold uppercase text-ink-500">{f.name.split('.').pop()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{f.name}</span>
                    <span className="block text-xs text-ink-400">{fmtBytes(f.size, locale)}</span>
                  </span>
                  <a href={`/api/files/dossier/${d.id}/${i}`} className="rounded-lg p-2 text-ink-500 hover:bg-paper hover:text-go-700" title={a.documents.download}>
                    <Icon name="download" className="h-4 w-4" />
                    <span className="sr-only">{a.documents.download} {f.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          {d.assignee && (
            <Card title={a.dossiers.assignee}>
              <div className="flex items-center gap-3">
                <Avatar name={d.assignee} />
                <span>
                  <span className="block text-sm font-semibold">{d.assignee}</span>
                  <span className="block text-xs text-ink-500">{a.overview.roleSpecialist}</span>
                </span>
              </div>
            </Card>
          )}
          {requests.length > 0 && (
            <Card title={a.requests.title} pad={false}>
              <ul className="divide-y divide-line">
                {requests.map((r) => (
                  <li key={r.id}>
                    <Link href={`${base}/requests#${r.id}`} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-paper">
                      <span className={cx('h-2 w-2 shrink-0 rounded-full', r.status === 'open' ? 'bg-[#E3901A]' : 'bg-ok-600')} />
                      <span className="flex-1">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {thread.length > 0 && (
            <Card title={a.messages.title} pad={false}>
              <ul className="divide-y divide-line">
                {thread.map((m) => (
                  <li key={m.id} className="px-5 py-3 text-sm">
                    <p className="font-semibold">{m.author === 'client' ? a.messages.you : m.authorName}</p>
                    <p className="mt-0.5 text-ink-600">{m.body}</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
