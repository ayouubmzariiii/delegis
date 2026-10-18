import { describe, expect, it } from 'vitest';
import { daysUntil, upcomingDeadlines } from './format';

describe('upcomingDeadlines', () => {
  it('returns the Q3 VAT return on 20 October when asked on 18 October', () => {
    const [first] = upcomingDeadlines(new Date(2026, 9, 18));
    expect(first).toMatchObject({ kind: 'vat', q: 3, y: 2026 });
    expect(first.date).toEqual(new Date(2026, 9, 20));
  });

  it('puts the Q4 return in January of the next year', () => {
    const list = upcomingDeadlines(new Date(2026, 11, 1), 5);
    expect(list.find((d) => d.kind === 'vat')).toMatchObject({ q: 4, y: 2026 });
    expect(list.find((d) => d.kind === 'vat')!.date).toEqual(new Date(2027, 0, 20));
  });

  it('is sorted and never in the past', () => {
    const now = new Date(2026, 4, 10);
    const list = upcomingDeadlines(now, 6);
    for (let i = 1; i < list.length; i++) expect(list[i].date.getTime()).toBeGreaterThanOrEqual(list[i - 1].date.getTime());
    for (const d of list) expect(daysUntil(d.date, now)).toBeGreaterThanOrEqual(0);
  });
});
