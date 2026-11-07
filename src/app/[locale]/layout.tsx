import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '../globals.css';
import { localeMeta } from '@/lib/i18n';
import { localeParams, resolveLocale } from '@/lib/params';
import { site } from '@/lib/site';
import { organizationLd } from '@/lib/seo';
import { getDict } from '@/content';
import { JsonLd } from '@/components/ui/JsonLd';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const display = Inter_Tight({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-display', display: 'swap' });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600'], variable: '--font-arabic', display: 'swap' });

export const generateStaticParams = localeParams;
export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  // Google Search wants a crawlable square icon in a multiple of 48 px; /favicon.ico also covers clients that request it directly.
  icons: {
    icon: [
      // Largest PNG first: fetchers that only read the first icon get one Google accepts (multiple of 48 px).
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  authors: [{ name: site.name, url: site.url }],
  publisher: site.name,
  category: 'business',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#FFFFFF', width: 'device-width', initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const meta = localeMeta[locale];
  const t = getDict(locale);
  const fonts = [sans.variable, mono.variable, display.variable, meta.lang === 'ar' ? arabic.variable : ''].join(' ');
  return (
    <html lang={meta.hreflang} dir={meta.dir} className={fonts}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          {t.common.skip}
        </a>
        {children}
        <JsonLd data={organizationLd(locale)} />
      </body>
    </html>
  );
}
