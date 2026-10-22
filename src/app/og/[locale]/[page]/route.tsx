import { locales, isLocale } from '@/lib/i18n';
import { ogKey, sitePages } from '@/lib/pages';
import { shareCard } from '@/lib/og';

/** One share image per public page, built at deploy time: /og/<locale>/<page>.png */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => sitePages(locale).map((p) => ({ locale, page: `${ogKey(p.path)}.png` })));
}

export async function GET(_: Request, { params }: { params: Promise<{ locale: string; page: string }> }) {
  const { locale, page } = await params;
  const info = isLocale(locale) ? sitePages(locale).find((p) => `${ogKey(p.path)}.png` === page) : undefined;
  if (!info || !isLocale(locale)) return new Response('Not found', { status: 404 });
  if (locale === 'ar-ma') return shareCard('fr-ma', sitePages('fr-ma').find((p) => p.id === info.id)!);
  return shareCard(locale, info);
}
