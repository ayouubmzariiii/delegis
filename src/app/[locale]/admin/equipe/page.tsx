import { resolveLocale } from '@/lib/params';
import { listFirms, listTeam } from '@/lib/db';
import { Card, Avatar } from '@/components/portal/ui';
import { StaffForm } from '@/components/admin/forms';

/** The Delegis team: profiles shown to firms (title, office, phone) and their portfolio. */
export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const [team, firms] = await Promise.all([listTeam(), listFirms()]);

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight">Équipe</h1>
      <p className="mt-1.5 text-ink-600">Le nom, la fonction, le bureau et le téléphone sont affichés aux cabinets dont la personne est responsable.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {team.map((m) => {
          const portfolio = firms.filter((f) => f.managerId === m.id);
          return (
            <Card key={m.id}>
              <div className="mb-4 flex items-center gap-3">
                <Avatar name={m.name} size="lg" />
                <div className="min-w-0">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-ink-500">{m.email}</p>
                  <p className="text-xs text-ink-500">{portfolio.length ? `Responsable de : ${portfolio.map((f) => f.company).join(', ')}` : 'Aucun cabinet assigné'}</p>
                </div>
              </div>
              <StaffForm locale={locale} member={m} />
            </Card>
          );
        })}
      </div>

      <Card title="Ajouter un membre" className="mt-6">
        <StaffForm locale={locale} />
      </Card>
    </>
  );
}
