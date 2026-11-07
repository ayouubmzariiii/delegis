import { resolveLocale } from '@/lib/params';
import { listLeads } from '@/lib/db';
import { fmtDateTime } from '@/lib/format';
import { telHref } from '@/lib/site';
import { Card } from '@/components/portal/ui';

/** Requests sent through the public contact form, newest first. */
export default async function LeadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const leads = await listLeads();

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight">Demandes</h1>
      <p className="mt-1.5 text-ink-600">Messages envoyés depuis le formulaire de contact du site. Répondez sous 24 h ouvrables, comme annoncé.</p>

      <div className="mt-6 space-y-4">
        {leads.length === 0 && (
          <Card>
            <p className="text-sm text-ink-600">Aucune demande pour l’instant.</p>
          </Card>
        )}
        {leads.map((l) => {
          const d = l.data;
          return (
            <Card key={l.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">
                  {d.name}
                  {d.company && <span className="font-normal text-ink-500"> · {d.company}</span>}
                </p>
                <p className="font-mono text-xs text-ink-500">
                  {fmtDateTime(l.createdAt, locale)} · {l.locale}
                </p>
              </div>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <a href={`mailto:${d.email}`} className="text-go-700 underline-offset-4 hover:underline">{d.email}</a>
                {d.phone && (
                  <a href={telHref(d.phone)} className="text-go-700 underline-offset-4 hover:underline" dir="ltr">{d.phone}</a>
                )}
                {d.service && <span className="text-ink-600">Service : {d.service}</span>}
              </p>
              {d.estimate && <p className="mt-2 text-sm text-ink-600">Estimation : {d.estimate}</p>}
              {d.message && <p className="mt-3 whitespace-pre-line rounded-xl bg-paper px-4 py-3 text-sm text-ink-700">{d.message}</p>}
            </Card>
          );
        })}
      </div>
    </>
  );
}
