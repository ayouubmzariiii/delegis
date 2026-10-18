import { describe, expect, it } from 'vitest';
import { coda, csv, invoicePdf, makePdf, ublInvoice } from './docgen';

describe('docgen', () => {
  it('writes a structurally valid PDF with a correct xref offset', () => {
    const pdf = makePdf([{ text: 'Bonjour é' }]).toString('latin1');
    expect(pdf.startsWith('%PDF-1.4')).toBe(true);
    expect(pdf.trimEnd().endsWith('%%EOF')).toBe(true);
    const startxref = Number(pdf.match(/startxref\n(\d+)/)![1]);
    expect(pdf.slice(startxref, startxref + 4)).toBe('xref');
  });

  it('puts invoice totals in the PDF', () => {
    const pdf = invoicePdf({ title: 'Facture', number: 'F1', date: '2026-10-01', seller: { name: 'A', vat: 'BE 1' }, buyer: { name: 'B', vat: 'BE 2' }, lines: [{ label: 'x', amount: 100 }] }).toString('latin1');
    expect(pdf).toContain('121,00 EUR');
  });

  it('emits 128-character CODA records', () => {
    const lines = coda({ date: new Date(2026, 8, 30), account: 'BE68 5390 0754 7034', holder: 'Test', opening: 1000, movements: [{ amount: -86.4, label: 'TOTAL' }] })
      .toString('latin1')
      .split('\r\n');
    expect(lines.length).toBe(5);
    for (const l of lines) expect(l).toHaveLength(128);
  });

  it('produces Peppol BIS 3.0 UBL with the right totals', () => {
    const xml = ublInvoice({ id: 'INV-1', date: '2026-10-01', seller: { name: 'S', vat: 'BE 0712.345.601' }, buyer: { name: 'B&B', vat: 'BE 0723.456.702' }, net: 100 }).toString('utf8');
    expect(xml).toContain('poacc:billing:3.0');
    expect(xml).toContain('<cbc:PayableAmount currencyID="EUR">121.00</cbc:PayableAmount>');
    expect(xml).toContain('B&amp;B');
  });

  it('quotes CSV cells and adds a BOM', () => {
    expect(csv([['a"b', 1]]).toString('utf8')).toBe('﻿"a""b";"1"');
  });
});
