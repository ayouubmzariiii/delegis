import Link from 'next/link';
import { portalContext } from '@/lib/portal';
import { daysUntil, fmtDate, fmtRelative, upcomingDeadlines } from '@/lib/format';
import { TEAM } from '@/lib/demo';
import { fmt } from '@/content/app';
import { Card, StatusBadge, Avatar, Empty } from '@/components/portal/ui';
import { ClientTable } from '@/components/portal/ClientCards';
import { StatsPanel } from '@/components/portal/Stats';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function Overview({ params }: { params: Promise<{ locale: string }> }) {
  const ctx = await portalContext(params);
  const { locale, user, ws, a, t, base, client } = ctx;
  const o = a.overview;
  const hour = new Date().getHours();
  const hello = `${hour < 12 ? o.morning : hour < 18 ? o.afternoon : o.evening}, ${user.name.split(' ')[0]}`;

  // "All clients": just the client cards — pick one to start working.
  if (!client) {
    return (
      <>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight">{hello}</h1>
          <p className="mt-1.5 text-ink-600">{a.clients.portfolioIntro}</p>
        </div>
        <StatsPanel ctx={ctx} />
        <div className="mt-6">
          <ClientTable ctx={ctx} />
        </div>
      </>
    );
  }

  const open = ws.requests.filter((r) => r.status === 'open');
  const processing = ws.dossiers.filter((d) => d.status === 'processing');
  const next = upcomingDeadlines()[0];
  const nextLabel = next && (next.kind === 'vat' ? fmt(o.deadlineVat, { q: next.q!, y: next.y }) : next.kind === 'listing' ? fmt(o.deadlineListing, { y: next.y }) : fmt(o.deadlineClosing, { y: next.y }));
  const nextIn = next && daysUntil(next.date);

  const kpis = [
    { label: o.kpiRequests, value: String(open.length), href: `${base}/requests`, alert: open.length > 0 },
    { label: o.kpiProcessing, value: String(processing.length), href: `${base}/dossiers`, alert: false },
    { label: o.kpiDeadline, value: next ? (nextIn === 0 ? o.today : fmt(o.inDays, { n: nextIn! })) : '—', sub: nextLabel, href: `${base}#deadline`, alert: false },
  ];

  return (
    <>
      <div className="mb-8">
        <p className="text-sm font-semibold text-go-700">{client.name}</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">{hello}</h1>
        <p className="mt-1.5 text-ink-600">{o.summary}</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        {kpis.map((k) => (
          <Link key={k.label} href={k.href} className={`rounded-2xl border p-5 transition hover:shadow-lift ${k.alert ? 'border-[#F3C987] bg-[#FFF8EC]' : 'border-line bg-white shadow-card'}`}>
            <dt className={`text-sm ${k.alert ? 'font-medium text-[#9A5F0B]' : 'text-ink-500'}`}>{k.label}</dt>
            <dd className="mt-2 font-display text-3xl font-bold tabular">{k.value}</dd>
            {k.sub && <dd className="mt-0.5 truncate text-xs text-ink-500">{k.sub}</dd>}
          </Link>
        ))}
      </dl>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        <Card title={o.actionTitle} action={open.length > 0 && <Link href={`${base}/requests`} className="text-sm font-semibold text-go-700 hover:underline">{o.seeAll}</Link>} pad={false}>
          {open.length === 0 ? (
            <div className="p-5">
              <Empty>{o.actionEmpty}</Empty>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {open.map((r) => (
                <li key={r.id}>
                  <Link href={`${base}/requests#${r.id}`} className="flex items-center gap-3 px-5 py-4 hover:bg-paper">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#E3901A]" />
                    <span className="min-w-0 flex-1 truncate font-medium">{r.title}</span>
                    {r.dueAt && <span className="shrink-0 text-xs text-ink-500">{fmt(a.requests.due, { d: fmtDate(r.dueAt, locale, 'short') })}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={a.dossiers.title} action={<Link href={`${base}/dossiers`} className="text-sm font-semibold text-go-700 hover:underline">{o.seeAll}</Link>} pad={false}>
          <ul className="divide-y divide-line">
            {ws.dossiers.slice(0, 5).map((d) => (
              <li key={d.id}>
                <Link href={`${base}/dossiers/${d.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-paper">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{d.name}</span>
                    <span className="block text-xs text-ink-500">{fmtRelative(d.createdAt, locale)}</span>
                  </span>
                  <StatusBadge status={d.status} label={t.portal.status[d.status]} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6">
        <StatsPanel ctx={ctx} />
      </div>

      {/* One quiet strip: upload, next deadline, contact */}
      <div id="deadline" className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-card md:flex-row md:items-center">
        <Link href={`${base}/dossiers#upload`} className={buttonClass('primary')}>
          <Icon name="upload" className="h-4 w-4" /> {a.nav.upload}
        </Link>
        {next && (
          <p className="flex items-center gap-2 text-sm text-ink-600 md:border-s md:border-line md:ps-4">
            <Icon name="calendar" className="h-4 w-4 text-go-600" />
            <span className="font-medium text-ink">{nextLabel}</span> · {fmtDate(next.date.toISOString(), locale)}
          </p>
        )}
        <Link href={`${base}/messages`} className="flex items-center gap-3 text-sm md:ms-auto">
          <Avatar name={TEAM.manager.name} size="sm" />
          <span>
            <span className="block font-medium">{TEAM.manager.name}</span>
            <span className="block text-xs text-ink-500">{o.write} →</span>
          </span>
        </Link>
      </div>
    </>
  );
}
