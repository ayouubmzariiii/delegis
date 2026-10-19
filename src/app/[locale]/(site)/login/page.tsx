import { redirect } from 'next/navigation';
import { resolveLocale } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { href, paths } from '@/lib/routes';
import { currentUser } from '@/lib/auth';
import { getDict } from '@/content';
import { AuthForm } from '@/components/sections/Forms';
import { LogoMark } from '@/components/ui/Logo';
import { Container } from '@/components/ui/primitives';
import { getUi } from '@/content/ui';
import { demoEnabled } from '@/lib/actions';
import { DemoButton } from '@/components/portal/DemoButton';
import { getApp } from '@/content/app';

type P = { params: Promise<{ locale: string }>; searchParams: Promise<{ mode?: string }> };

export async function generateMetadata({ params }: P) {
  const locale = await resolveLocale(params);
  const a = getDict(locale).auth;
  return buildMetadata({ locale, pathFor: paths.login, title: a.loginMetaTitle, description: a.loginText, noindex: true });
}

export default async function LoginPage({ params, searchParams }: P) {
  const locale = await resolveLocale(params);
  const me = await currentUser();
  if (me) redirect(me.role === 'staff' ? `/${locale}/admin` : href(locale, paths.portal()));
  const mode = (await searchParams).mode === 'register' ? 'register' : 'login';
  const a = getDict(locale).auth;
  const demo = getUi(locale).demo;
  const app = getApp(locale);
  const showDemo = await demoEnabled();
  return (
    <section className="relative border-b border-line">
      <div aria-hidden="true" className="ruled absolute inset-0" />
      <Container className="relative flex justify-center py-20">
        <div className="w-full max-w-md rounded-[2rem] border border-line bg-white p-8 shadow-lift sm:p-10">
          <LogoMark className="h-10 w-10" />
          <h1 className="mt-8 text-3xl font-semibold tracking-tight">{mode === 'login' ? a.loginTitle : a.registerTitle}</h1>
          <p className="mb-8 mt-2 text-sm text-ink-600">{a.loginText}</p>
          <AuthForm t={a} locale={locale} mode={mode} connecting={app.login.connecting} />
          {showDemo && <DemoButton locale={locale} cta={demo.cta} note={demo.note} or={demo.or} connecting={app.login.connecting} staffCta={demo.staffCta} />}
        </div>
      </Container>
    </section>
  );
}
