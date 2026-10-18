import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #4A72FF, #1834B0)' }}>
        <svg width="112" height="112" viewBox="0 0 32 32">
          <path d="M9 10h14M9 14h8" stroke="#fff" strokeOpacity=".45" strokeWidth="1.8" strokeLinecap="round" />
          <path d="m10.5 20.5 3.5 3.3 8-8.3" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
