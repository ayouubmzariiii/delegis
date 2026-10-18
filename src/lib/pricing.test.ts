import { describe, expect, it } from 'vitest';
import { estimate, rates, type EstimateInput } from './pricing';

const base: EstimateInput = {
  sales: 0,
  purchases: 0,
  employees: 0,
  hasCash: false,
  cashDaily: false,
  cashEntries: 0,
  vatPrep: false,
  coda: false,
  codaLines: 0,
  peppol: false,
};

describe('estimate', () => {
  it('applies the monthly minimum on tiny dossiers', () => {
    const r = estimate(base);
    expect(r.total).toBe(rates.minimum);
    expect(r.minimumApplied).toBe(true);
  });

  it('sums unit rates for a typical SME', () => {
    const r = estimate({ ...base, sales: 100, purchases: 200, employees: 5, vatPrep: true });
    const expected = rates.baseFee + 100 * rates.sales + 200 * rates.purchases + 5 * rates.payrollPerEmployee + rates.vatPrep;
    expect(r.total).toBe(Math.round(expected));
    expect(r.discountPct).toBe(0);
  });

  it('gives 10 % above 500 documents and 15 % above 1 500', () => {
    expect(estimate({ ...base, purchases: 501 }).discountPct).toBe(10);
    expect(estimate({ ...base, purchases: 1501 }).discountPct).toBe(15);
  });

  it('counts cash entries as documents only when not on the daily flat fee', () => {
    expect(estimate({ ...base, hasCash: true, cashEntries: 600 }).docs).toBe(600);
    expect(estimate({ ...base, hasCash: true, cashDaily: true, cashEntries: 600 }).docs).toBe(0);
  });

  it('returns a range that brackets the total', () => {
    const r = estimate({ ...base, sales: 300, purchases: 400 });
    expect(r.low).toBeLessThanOrEqual(r.total);
    expect(r.high).toBeGreaterThanOrEqual(r.total);
  });
});
