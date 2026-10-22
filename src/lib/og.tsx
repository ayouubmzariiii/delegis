import { readFile } from 'fs/promises';
import path from 'path';
import { ImageResponse } from 'next/og';
import type { Locale } from './i18n';
import type { PageInfo } from './pages';
import { site } from './site';

// No Arabic card: the image renderer has no right-to-left layout, so ar-ma pages share the fr-ma cards.
type CardLocale = Exclude<Locale, 'ar-ma'>;

const TAGLINE: Record<CardLocale, string> = {
  'fr-be': 'Back-office comptable pour la Belgique',
  'nl-be': 'Boekhoudkundige backoffice voor België',
  en: 'Accounting back office for Belgium',
  'fr-ma': 'Back-office comptable · Maroc & Belgique',
};

const SERVICES: Record<CardLocale, string[]> = {
  'fr-be': ['Encodage', 'CODA', 'TVA', 'Peppol'],
  'nl-be': ['Inboeking', 'CODA', 'Btw', 'Peppol'],
  en: ['Bookkeeping', 'CODA', 'VAT', 'Peppol'],
  'fr-ma': ['Saisie', 'Back-office', 'Paie', 'Service client'],
};

const font = (file: string) => readFile(path.join(process.cwd(), 'assets/og-fonts', file));

/** The branded 1200×630 card used for link previews (Google, LinkedIn, WhatsApp, Discord…). */
export async function shareCard(locale: CardLocale, info: Pick<PageInfo, 'heading' | 'section'>) {
  const [display, body] = await Promise.all([font('inter-tight-latin-700-normal.woff'), font('inter-latin-500-normal.woff')]);
  const heading = info.heading;
  const size = heading.length > 70 ? 56 : heading.length > 45 ? 66 : 78;
  const host = new URL(site.url).host.replace(/^www\./, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#FFFFFF',
          fontFamily: 'Body',
          backgroundColor: '#0B1B33',
          backgroundImage: 'radial-gradient(circle at 88% 0%, rgba(74,114,255,0.75), rgba(74,114,255,0) 55%), radial-gradient(circle at 0% 100%, rgba(24,52,176,0.85), rgba(24,52,176,0) 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg width="60" height="60" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4A72FF" />
                  <stop offset="1" stopColor="#1834B0" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="9" fill="url(#g)" />
              <path d="M9 10h14M9 14h8" stroke="#fff" strokeOpacity=".45" strokeWidth="1.8" strokeLinecap="round" />
              <path d="m10.5 20.5 3.5 3.3 8-8.3" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontFamily: 'Display', fontSize: 44, letterSpacing: -1.5 }}>Delegis</div>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#C7D5FF', fontFamily: 'Body' }}>{TAGLINE[locale]}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#8FA8FF',
              fontFamily: 'Body',
              marginBottom: 22,
            }}
          >
            {info.section}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Display',
              fontSize: size,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
              textAlign: 'left',
            }}
          >
            {heading}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <div style={{ display: 'flex', gap: 12, flexDirection: 'row' }}>
            {SERVICES[locale].map((s) => (
              <div
                key={s}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  borderRadius: 999,
                  fontSize: 22,
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  fontFamily: 'Body',
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#C7D5FF' }}>{host}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Display', data: display, weight: 700, style: 'normal' },
        { name: 'Body', data: body, weight: 500, style: 'normal' },
      ],
    },
  );
}
