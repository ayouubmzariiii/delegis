import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F6F8FC', padding: 80, color: '#0B1B33' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: '#0B1B33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: '#2F5BFF' }} />
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: -2 }}>delegis</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Vos pièces comptables,</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1, letterSpacing: -3, display: 'flex' }}>
            <span style={{ background: '#2F5BFF', padding: '0 12px' }}>encodées en 48 heures.</span>
          </div>
          <div style={{ fontSize: 28, marginTop: 36, color: '#4A525E' }}>Encodage · TVA · Peppol · Back-office — Belgique & Maroc</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
