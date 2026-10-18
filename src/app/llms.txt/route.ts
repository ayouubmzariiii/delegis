import { locales, localeMeta } from '@/lib/i18n';
import { absUrl } from '@/lib/seo';
import { paths } from '@/lib/routes';
import { site } from '@/lib/site';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';

export const dynamic = 'force-static';

/** llms.txt — a plain-text map of the site for AI assistants and answer engines. */
export function GET() {
  const fr = getDict('fr-be');
  const x = getExtra('fr-be');
  const lines = [
    `# ${site.name}`,
    '',
    `> ${fr.home.metaDescription}`,
    '',
    'Delegis is a B2B back-office provider: bookkeeping data entry, CODA bank reconciliation, VAT return preparation, Peppol e-invoicing, payroll preparation and customer service for companies and accounting firms in Belgium, with a production centre in Casablanca, Morocco.',
    '',
    '## Key pages (fr-BE)',
    `- [${fr.nav.pricing}](${absUrl('fr-be', paths.pricing())}): public unit prices and an online estimator`,
    `- [${x.nav.firms}](${absUrl('fr-be', paths.firms())}): white-label offer for accounting firms`,
    `- [${x.nav.method}](${absUrl('fr-be', paths.method())}): onboarding, quality control, security`,
    '',
    '## Services',
    ...fr.services.map((s) => `- [${s.name}](${absUrl('fr-be', paths.service('fr-be', s.id))}): ${s.short}`),
    '',
    '## Guides',
    ...x.guides.articles.map((a) => `- [${a.title}](${absUrl('fr-be', paths.guide('fr-be', a.id))}): ${a.excerpt}`),
    '',
    '## Languages',
    ...locales.map((l) => `- ${localeMeta[l].label}: ${absUrl(l, '')}`),
    '',
    `Contact: ${site.email}`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
