import type { MetadataRoute } from 'next';
import { locales, localeMeta, defaultLocale } from '@/lib/i18n';
import { absUrl } from '@/lib/seo';
import { allPages } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allPages().flatMap((pathFor) =>
    locales.map((l) => ({
      url: absUrl(l, pathFor(l)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: pathFor(l) === '' ? 1 : pathFor(l).split('/').length > 2 ? 0.7 : 0.85,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((x) => [localeMeta[x].hreflang, absUrl(x, pathFor(x))])),
          'x-default': absUrl(defaultLocale, pathFor(defaultLocale)),
        },
      },
    })),
  );
}
