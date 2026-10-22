import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // Login and portal pages stay crawlable so Google sees their noindex, rather than indexing blocked URLs it finds in links.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
