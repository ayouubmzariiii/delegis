import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { href, paths } from '@/lib/routes';
import type { ServiceId } from '@/content/types';
import type { Article } from '@/content/extra-types';

const PAGES = {
  pricing: paths.pricing,
  contact: paths.contact,
  firms: paths.firms,
  method: paths.method,
  services: paths.services,
  guides: paths.guides,
} as const;

const LINK = /\[([^\]]+)\]\((service|guide|page):([\w-]+)\)/g;

/** Resolves an inline link target such as service:vat or guide:peppol-2026 to a localized path. */
export function linkTarget(locale: Locale, kind: string, id: string): string {
  if (kind === 'service') return href(locale, paths.service(locale, id as ServiceId));
  if (kind === 'guide') return href(locale, paths.guide(locale, id as Article['id']));
  const page = PAGES[id as keyof typeof PAGES];
  if (!page) throw new Error(`Unknown page link: ${id}`);
  return href(locale, page());
}

/** Text with inline links written as [label](service:id), [label](guide:id) or [label](page:id). */
export function RichText({ locale, text }: { locale: Locale; text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} href={linkTarget(locale, m[2], m[3])} className="font-medium text-go-700 underline decoration-go-600/30 underline-offset-4 hover:decoration-go-600">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** The same text without link markup, for meta tags and structured data. */
export const plainText = (text: string) => text.replace(LINK, '$1');
