import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Back-office comptable`,
    short_name: site.name,
    description: 'Encodage comptable, TVA, Peppol et back-office externalisés pour entreprises belges et marocaines.',
    start_url: '/fr-be',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#2F5BFF',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
