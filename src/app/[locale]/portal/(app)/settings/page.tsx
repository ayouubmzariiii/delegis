import { portalContext } from '@/lib/portal';
import { PageTitle, Card } from '@/components/portal/ui';
import { ProfileForm } from '@/components/portal/interactive';
import { Icon } from '@/components/ui/Icon';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Paramètres · Delegis' };

export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const ctx = await portalContext(params);
  const { locale, user, a, isDemo } = ctx;
  const s = a.settings;
  return (
    <>
      <PageTitle title={s.title} intro={s.intro} />
      {isDemo && <p className="mb-6 rounded-xl border border-go-100 bg-go-50 px-4 py-3 text-sm text-go-800">{s.demoNote}</p>}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title={s.profile} className="lg:col-span-2">
          <ProfileForm user={user} locale={locale} a={s} />
        </Card>
        <Card title={s.security}>
          <p className="flex gap-3 text-sm leading-relaxed text-ink-600">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-go-600" /> {s.securityText}
          </p>
        </Card>
      </div>
    </>
  );
}
