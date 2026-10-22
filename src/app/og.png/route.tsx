import { shareCard } from '@/lib/og';
import { sitePages } from '@/lib/pages';

export const dynamic = 'force-static';

/** Site-wide fallback share image (structured data, manifest): the French-Belgian home card. */
export function GET() {
  return shareCard('fr-be', sitePages('fr-be')[0]);
}
