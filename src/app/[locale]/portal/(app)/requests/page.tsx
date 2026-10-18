import Link from 'next/link';
import { portalContext } from '@/lib/portal';
import { fmtDate, fmtRelative } from '@/lib/format';
import { fmt } from '@/content/app';
import { PageTitle, Empty } from '@/components/portal/ui';
import { RequestAnswerForm } from '@/components/portal/interactive';
import { Icon } from '@/components/ui/Icon';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Demandes · Delegis' };

export default async function RequestsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, ws, a, base, isPortfolio, account } = await portalContext(params);
  const clientName = (id: string) => account.clients.find((c) => c.id === id)?.name ?? '';
  const open = ws.requests.filter((r) => r.status === 'open');
  const answered = ws.requests.filter((r) => r.status === 'answered');
  const dossierName = (id?: string) => ws.dossiers.find((d) => d.id === id)?.name;

  return (
    <>
      <PageTitle title={a.requests.title} intro={a.requests.intro} />
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-600">
        {a.requests.open} <span className="rounded-full bg-go-600 px-2 py-0.5 text-[11px] text-white">{open.length}</span>
      </h2>
      {open.length === 0 ? (
        <Empty>{a.requests.empty}</Empty>
      ) : (
        <ul className="space-y-4">
          {open.map((r) => (
            <li key={r.id} id={r.id} className="scroll-mt-24 rounded-2xl border border-line border-s-4 border-s-[#E3901A] bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  {isPortfolio && <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-go-700">{clientName(r.clientId)}</p>}
                  <p className="font-display text-lg font-semibold">{r.title}</p>
                  <p className="mt-1 text-[15px] text-ink-600">{r.detail}</p>
                  {r.dossierId && (
                    <Link href={`${base}/dossiers/${r.dossierId}`} className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-go-700 hover:underline">
                      <Icon name="folder" className="h-3.5 w-3.5" /> {dossierName(r.dossierId)}
                    </Link>
                  )}
                </div>
                <div className="text-end text-xs text-ink-500">
                  {r.dueAt && <p className="rounded-md bg-[#FFF5E6] px-2 py-1 font-semibold text-[#9A5F0B]">{fmt(a.requests.due, { d: fmtDate(r.dueAt, locale) })}</p>}
                  <p className="mt-1">{fmtRelative(r.createdAt, locale)}</p>
                </div>
              </div>
              <RequestAnswerForm id={r.id} locale={locale} a={a.requests} />
            </li>
          ))}
        </ul>
      )}

      {answered.length > 0 && (
        <>
          <h2 className="mb-3 mt-10 text-sm font-semibold text-ink-600">{a.requests.answered}</h2>
          <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
            {answered.map((r) => (
              <li key={r.id} id={r.id} className="flex items-start gap-3 px-5 py-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ok-50 text-ok-700">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-sm text-ink-600">{r.detail}</span>
                  {r.answer && (
                    <span className="mt-1 block text-xs text-ink-500">
                      {fmt(a.requests.answeredOn, { d: fmtDate(r.answer.at, locale) })}
                      {r.answer.files.length > 0 && ` · ${r.answer.files.map((f) => f.name).join(', ')}`}
                      {r.answer.note && ` · “${r.answer.note}”`}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
