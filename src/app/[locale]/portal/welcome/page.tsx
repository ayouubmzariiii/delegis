import { redirect } from 'next/navigation';
import { resolveLocale } from '@/lib/params';
import { currentUser } from '@/lib/auth';
import { getApp, fmt } from '@/content/app';
import { WelcomeSequence } from '@/components/portal/Welcome';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Delegis' };

export default async function WelcomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const user = await currentUser();
  if (!user) redirect(`/${locale}/login`);
  const w = getApp(locale).welcome;
  return <WelcomeSequence title={fmt(w.title, { name: user.name.split(' ')[0] })} subtitle={w.subtitle} steps={w.steps} skip={w.skip} href={`/${locale}/portal`} />;
}
