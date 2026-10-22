import type { MetadataRoute } from 'next';
import { locales, localeMeta, defaultLocale } from '@/lib/i18n';
import { absUrl } from '@/lib/seo';
import { allPages, paths } from '@/lib/routes';
import { site } from '@/lib/site';
import { getExtra } from '@/content/extra';

export default function sitemap(): MetadataRoute.Sitemap {
  // Real edit dates, so Google keeps trusting lastmod: guides carry their own, everything else the last content pass.
  const guideDates = new Map(locales.flatMap((l) => getExtra(l).guides.articles.map((a) => [absUrl(l, paths.guide(l, a.id)), a.date] as const)));
  return allPages().flatMap((pathFor) =>
    locales.map((l) => {
      const url = absUrl(l, pathFor(l));
      return {
        url,
        lastModified: guideDates.get(url) ?? site.contentUpdated,
        changeFrequency: 'monthly' as const,
        priority: pathFor(l) === '' ? 1 : pathFor(l).split('/').length > 2 ? 0.7 : 0.85,
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((x) => [localeMeta[x].hreflang, absUrl(x, pathFor(x))])),
            'x-default': absUrl(defaultLocale, pathFor(defaultLocale)),
          },
        },
      };
    }),
  );
}
