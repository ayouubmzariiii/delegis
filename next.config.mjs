/** @type {import('next').NextConfig} */

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // PGlite ships WASM + data files; load it from node_modules instead of bundling.
  serverExternalPackages: ['@electric-sql/pglite'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 1920, 2560, 3200],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  experimental: { serverActions: { bodySizeLimit: '100mb' } },
  // The back-office moved from /staff to /admin.
  async redirects() {
    return [{ source: '/:locale/staff/:path*', destination: '/:locale/admin/:path*', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
