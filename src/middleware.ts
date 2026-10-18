import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

function pickLocale(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry') || '';
  const accept = (req.headers.get('accept-language') || '').toLowerCase();
  if (country === 'MA') return accept.startsWith('ar') ? 'ar-ma' : 'fr-ma';
  if (accept.startsWith('nl')) return 'nl-be';
  if (accept.startsWith('ar')) return 'ar-ma';
  if (accept.startsWith('en')) return 'en';
  if (accept.includes('fr-ma')) return 'fr-ma';
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];
  if ((locales as readonly string[]).includes(first)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === '/' ? '' : pathname}`;
  // 307 for the language root keeps "/" neutral; hreflang x-default points to /fr-be.
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!api|_next|og.png|icon.svg|logo.svg|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
