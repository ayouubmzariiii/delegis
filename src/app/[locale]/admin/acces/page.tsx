import { resolveLocale } from '@/lib/params';
import { allAccesses } from '@/lib/db';
import { q } from '@/lib/sql';
import { Card } from '@/components/portal/ui';
import { AccessTable } from '@/components/admin/AccessTable';
import { RequestAccessForm } from '@/components/admin/forms';

/** All accesses shared by firms, requested ones first. */
export default async function AccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const [rows, clients] = await Promise.all([
    allAccesses(),
    q<{ id: string; name: string; firm: string }>(`SELECT c.id, c.name, u.company AS firm FROM clients c JOIN users u ON u.id = c.user_id ORDER BY u.company, c.name`),
  ]);
  const requested = rows.filter((r) => r.status === 'requested');
  const active = rows.filter((r) => r.status !== 'requested');

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight">Accès</h1>
      <p className="mt-1.5 text-ink-600">Identifiants partagés par les cabinets (logiciels, banques, MyMinfin). Mots de passe chiffrés, affichés uniquement à la demande.</p>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title={`En attente du cabinet · ${requested.length}`} pad={false}>
            <AccessTable rows={requested} locale={locale} />
          </Card>
          <Card title={`Accès partagés · ${active.length}`} pad={false}>
            <AccessTable rows={active} locale={locale} />
          </Card>
        </div>
        <Card title="Demander un accès">
          <p className="mb-4 text-sm text-ink-600">Le cabinet reçoit une notification et le complète depuis sa page Accès.</p>
          <RequestAccessForm locale={locale} clients={clients} />
        </Card>
      </div>
    </>
  );
}
