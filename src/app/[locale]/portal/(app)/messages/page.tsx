import { localeMeta } from '@/lib/i18n';
import { portalContext } from '@/lib/portal';
import { PageTitle, Avatar } from '@/components/portal/ui';
import { Conversation } from '@/components/portal/interactive';
import { PortfolioTable } from '@/components/portal/Portfolio';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function MessagesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ dossier?: string }> }) {
  const ctx = await portalContext(params);
  const { locale, user, ws, a, client, base, manager } = ctx;
  // The people actually working on this account: the assigned manager plus whoever answered in this thread.
  const team = [...new Set([manager?.name, ...ws.messages.filter((m) => m.author === 'team').map((m) => m.authorName)].filter((n): n is string => !!n))].slice(0, 4);
  const { dossier } = await searchParams;
  const dossierNames = Object.fromEntries(ws.dossiers.map((d) => [d.id, d.name]));
  return (
    <>
      <PageTitle
        title={client ? `${a.messages.title} · ${client.name}` : a.messages.title}
        intro={client ? a.messages.intro : a.clients.pickFirst}
        action={
          <div className="flex -space-x-2 rtl:space-x-reverse" aria-label={a.overview.teamTitle}>
            {team.map((n, i) => (
              <span key={n} title={n}>
                <Avatar name={n} tone={i ? 'ok' : 'go'} />
              </span>
            ))}
          </div>
        }
      />
      {client ? (
        <Conversation
          messages={ws.messages}
          user={user}
          locale={localeMeta[locale].hreflang}
          a={a.messages}
          dossierNames={dossierNames}
          initialDossier={dossier && dossierNames[dossier] ? dossier : undefined}
          clientId={client.id}
        />
      ) : (
        <PortfolioTable ctx={ctx} back={`${base}/messages`} />
      )}
    </>
  );
}
