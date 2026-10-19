import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale, LANG_COOKIE } from '@/lib/i18n';

const isLocale = (s: string | undefined) => !!s && (locales as readonly string[]).includes(s);

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

/** App screens live at /portal and /admin, without a language prefix. */
const APP = /^\/(portal|admin)(\/.*)?$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const [, first, ...rest] = pathname.split('/');
  const url = req.nextUrl.clone();

  // /portal…, /admin… → rendered by the [locale] routes. The admin is French-only;
  // the portal uses the language the user signed in with (cookie), else the browser's.
  const app = pathname.match(APP);
  if (app) {
    const cookie = req.cookies.get(LANG_COOKIE)?.value;
    const lang = app[1] === 'admin' ? 'fr-be' : isLocale(cookie) ? cookie! : pickLocale(req);
    url.pathname = `/${lang}${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (isLocale(first)) {
    // Old prefixed app URLs (/fr-be/portal…, /nl-be/admin…, /fr-be/staff…) → clean ones.
    const section = rest[0];
    if (section === 'portal' || section === 'admin' || section === 'staff') {
      url.pathname = `/${section === 'staff' ? 'admin' : section}${rest.length > 1 ? `/${rest.slice(1).join('/')}` : ''}`;
      const res = NextResponse.redirect(url, 308);
      if (section === 'portal') res.cookies.set(LANG_COOKIE, first, { sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 365 });
      return res;
    }
    return NextResponse.next();
  }

  if (first === 'staff') {
    url.pathname = `/admin${rest.length ? `/${rest.join('/')}` : ''}`;
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/${pickLocale(req)}${pathname === '/' ? '' : pathname}`;
  // 307 for the language root keeps "/" neutral; hreflang x-default points to /fr-be.
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!api|_next|og.png|icon.svg|logo.svg|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
