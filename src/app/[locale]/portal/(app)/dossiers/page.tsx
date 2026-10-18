import { localeMeta } from '@/lib/i18n';
import { portalContext } from '@/lib/portal';
import { PageTitle } from '@/components/portal/ui';
import { DossierTable } from '@/components/portal/interactive';
import { UploadForm } from '@/components/sections/Forms';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function DossiersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, ws, account, client, isPortfolio, a, t, base } = await portalContext(params);
  const clientNames = Object.fromEntries(account.clients.map((c) => [c.id, c.name]));
  return (
    <>
      <PageTitle title={client ? `${a.dossiers.title} · ${client.name}` : a.dossiers.title} intro={a.dossiers.intro} />
      <div id="upload" className="mb-6 scroll-mt-24">
        <UploadForm t={t.portal} locale={locale} clients={account.clients} clientId={client?.id} clientLabel={a.clients.label} />
      </div>
      <DossierTable
        dossiers={ws.dossiers}
        a={a.dossiers}
        statusLabels={t.portal.status}
        filesLabel={t.portal.files}
        base={base}
        lang={localeMeta[locale].hreflang}
        clientNames={isPortfolio ? clientNames : undefined}
        clientLabel={a.clients.label}
      />
    </>
  );
}
