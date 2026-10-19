import { portalContext } from '@/lib/portal';
import { fmtDate, fmtRelative } from '@/lib/format';
import { fmt } from '@/content/app';
import { PageTitle, Card, Empty } from '@/components/portal/ui';
import { PortfolioTable } from '@/components/portal/Portfolio';
import { AccessItem, AddAccessForm } from '@/components/portal/Accesses';
import { Icon } from '@/components/ui/Icon';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function AccessesPage({ params }: { params: Promise<{ locale: string }> }) {
  const ctx = await portalContext(params);
  const { locale, ws, a, client, base } = ctx;
  const t = a.accesses;
  if (!client)
    return (
      <>
        <PageTitle title={t.title} intro={a.clients.pickFirst} />
        <PortfolioTable ctx={ctx} back={`${base}/accesses`} />
      </>
    );

  const requested = ws.accesses.filter((x) => x.status === 'requested');
  const shared = ws.accesses.filter((x) => x.status === 'provided');
  const revoked = ws.accesses.filter((x) => x.status === 'revoked');
  const item = (x: (typeof ws.accesses)[number]) => (
    <AccessItem
      key={x.id}
      access={x}
      locale={locale}
      a={t}
      updated={fmt(t.updated, { d: fmtRelative(x.updatedAt, locale) })}
      requested={x.requestedBy ? fmt(t.requestedBy, { name: x.requestedBy, d: fmtDate(x.createdAt, locale, 'short') }) : undefined}
    />
  );

  return (
    <>
      <PageTitle title={`${t.title} · ${client.name}`} intro={fmt(t.intro, { client: client.name })} />

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {requested.length > 0 && (
            <section className="rounded-2xl border border-[#F3C987] bg-[#FFFBF3] shadow-card">
              <h2 className="flex items-center gap-2 border-b border-[#F3C987]/60 px-5 py-4 font-display text-base font-semibold text-[#7A4A06]">
                {t.requestedTitle}
                <span className="rounded-full bg-[#FFF0D6] px-2 text-xs font-bold">{requested.length}</span>
              </h2>
              <ul className="divide-y divide-[#F3C987]/50">{requested.map(item)}</ul>
            </section>
          )}

          <Card title={`${t.sharedTitle} · ${shared.length}`} pad={false}>
            {shared.length ? (
              <ul className="divide-y divide-line">{shared.map(item)}</ul>
            ) : (
              <div className="p-5">
                <Empty>{t.empty}</Empty>
              </div>
            )}
          </Card>

          <Card title={t.add}>
            <AddAccessForm locale={locale} clientId={client.id} a={t} />
          </Card>

          {revoked.length > 0 && (
            <Card title={t.revokedTitle} pad={false}>
              <ul className="divide-y divide-line opacity-75">{revoked.map(item)}</ul>
            </Card>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <Icon name="shield" className="h-6 w-6 text-ok-600" />
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.security}</p>
          </div>
          <div className="rounded-2xl border border-go-100 bg-go-50/60 p-5 text-sm leading-relaxed text-ink-700">{t.tip}</div>
        </aside>
      </div>
    </>
  );
}
