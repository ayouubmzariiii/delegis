import { resolveLocale } from '@/lib/params';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

/** Marketing chrome (header + footer). The client portal has its own app shell. */
export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  return (
    <>
      <Header locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
