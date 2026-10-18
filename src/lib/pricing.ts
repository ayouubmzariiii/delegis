// All public rates live here (EUR, excl. VAT). Change a number and every page + the estimator update.
export const rates = {
  baseFee: 49,
  minimum: 150,
  sales: 0.8,
  purchases: 1.1,
  payrollPerEmployee: 4,
  cashPerEntry: 0.4,
  cashDailyFlat: 35,
  vatPrep: 45,
  codaPerLine: 0.15,
  peppol: 29,
  discounts: [
    { above: 1500, pct: 15 },
    { above: 500, pct: 10 },
  ],
  rangePct: 15,
  perDocument: { standard: 1.5, complex: 2.5, urgentSurchargePct: 50 },
  addons: { rescueFrom: 490, dedicatedFrom: 1690, hourly: 22 },
} as const;

export type EstimateInput = {
  sales: number;
  purchases: number;
  employees: number;
  hasCash: boolean;
  cashDaily: boolean;
  cashEntries: number;
  vatPrep: boolean;
  coda: boolean;
  codaLines: number;
  peppol: boolean;
};

export type EstimateLine = { key: string; amount: number };

export function estimate(i: EstimateInput) {
  const lines: EstimateLine[] = [
    { key: 'base', amount: rates.baseFee },
    { key: 'sales', amount: i.sales * rates.sales },
    { key: 'purchases', amount: i.purchases * rates.purchases },
    { key: 'payroll', amount: i.employees * rates.payrollPerEmployee },
  ];
  if (i.hasCash) lines.push({ key: 'cash', amount: i.cashDaily ? rates.cashDailyFlat : i.cashEntries * rates.cashPerEntry });
  if (i.vatPrep) lines.push({ key: 'vat', amount: rates.vatPrep });
  if (i.coda) lines.push({ key: 'coda', amount: i.codaLines * rates.codaPerLine });
  if (i.peppol) lines.push({ key: 'peppol', amount: rates.peppol });

  const docs = i.sales + i.purchases + (i.hasCash && !i.cashDaily ? i.cashEntries : 0);
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const discountPct = rates.discounts.find((d) => docs > d.above)?.pct ?? 0;
  const discount = (subtotal * discountPct) / 100;
  const raw = subtotal - discount;
  const total = Math.max(rates.minimum, Math.round(raw));
  const spread = rates.rangePct / 100;
  return {
    lines,
    docs,
    subtotal,
    discountPct,
    discount,
    total,
    minimumApplied: raw < rates.minimum,
    low: Math.max(rates.minimum, Math.round((total * (1 - spread)) / 5) * 5),
    high: Math.round((total * (1 + spread)) / 5) * 5,
  };
}

export function formatEur(n: number, lang: string, decimals = 0) {
  const loc = lang === 'nl' ? 'nl-BE' : lang === 'en' ? 'en-IE' : lang === 'ar' ? 'ar-MA' : 'fr-BE';
  return new Intl.NumberFormat(loc, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}
