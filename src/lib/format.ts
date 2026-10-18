import { localeMeta, type Locale } from './i18n';

export function fmtBytes(n: number, locale: Locale) {
  const nf = new Intl.NumberFormat(localeMeta[locale].hreflang, { maximumFractionDigits: 1 });
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${nf.format(n / 1024)} KB`;
  return `${nf.format(n / 1024 ** 2)} MB`;
}

export function fmtDate(iso: string, locale: Locale, style: 'short' | 'medium' | 'long' = 'medium') {
  return new Intl.DateTimeFormat(localeMeta[locale].hreflang, { dateStyle: style }).format(new Date(iso));
}

export function fmtDateTime(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeMeta[locale].hreflang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
}

/** "il y a 3 heures" style relative time. */
export function fmtRelative(iso: string, locale: Locale, now = Date.now()) {
  const rtf = new Intl.RelativeTimeFormat(localeMeta[locale].hreflang, { numeric: 'auto' });
  const diff = (new Date(iso).getTime() - now) / 1000;
  const abs = Math.abs(diff);
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  if (abs < 86400 * 30) return rtf.format(Math.round(diff / 86400), 'day');
  return fmtDate(iso, locale);
}

export type Deadline = { kind: 'vat' | 'listing' | 'closing'; date: Date; q?: number; y: number };

/**
 * Belgian compliance calendar (simplified, quarterly VAT filer):
 * - quarterly VAT return: 20th of the month after the quarter
 * - annual client listing: 31 March for the previous year
 * - annual accounts filing (calendar year): 31 July
 */
export function upcomingDeadlines(now = new Date(), count = 3): Deadline[] {
  const out: Deadline[] = [];
  for (let y = now.getFullYear() - 1; y <= now.getFullYear() + 1; y++) {
    for (let q = 1; q <= 4; q++) out.push({ kind: 'vat', q, y, date: new Date(y + (q === 4 ? 1 : 0), q === 4 ? 0 : q * 3, 20) });
    out.push({ kind: 'listing', y, date: new Date(y + 1, 2, 31) });
    out.push({ kind: 'closing', y, date: new Date(y + 1, 6, 31) });
  }
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return out
    .filter((d) => d.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
}

export const daysUntil = (d: Date, now = new Date()) => Math.ceil((d.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) / 864e5);
