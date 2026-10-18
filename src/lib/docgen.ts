/**
 * Real document generators used by the seed and the back-office:
 * valid PDF files, Belgian CODA statements, Peppol BIS 3.0 (UBL) invoices and CSV exports.
 * No dependencies — the PDF writer emits a standard single-page PDF 1.4 with Helvetica.
 */

const pdfEscape = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // core fonts are Latin-1; strip accents for safety
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/([\\()])/g, '\\$1');

export type PdfLine = { text: string; size?: number; bold?: boolean; gap?: number };

/** Builds a one-page A4 PDF from lines of text. Returns the file bytes. */
export function makePdf(lines: PdfLine[]): Buffer {
  let y = 800;
  const ops: string[] = ['BT'];
  for (const l of lines) {
    y -= l.gap ?? (l.size ?? 11) + 6;
    ops.push(`/${l.bold ? 'F2' : 'F1'} ${l.size ?? 11} Tf`, `1 0 0 1 56 ${y} Tm`, `(${pdfEscape(l.text)}) Tj`);
  }
  ops.push('ET');
  const stream = ops.join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  ];
  let out = '%PDF-1.4\n';
  const offsets: number[] = [];
  objects.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out));
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out);
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, 'latin1');
}

const eur = (n: number) => n.toFixed(2).replace('.', ',') + ' EUR';

export type InvoiceDoc = {
  title: string;
  number: string;
  date: string;
  seller: { name: string; vat: string };
  buyer: { name: string; vat: string };
  lines: { label: string; amount: number }[];
  vatRate?: number;
};

/** A readable invoice PDF (supplier invoice, sales invoice or Delegis invoice). */
export function invoicePdf(d: InvoiceDoc): Buffer {
  const rate = d.vatRate ?? 21;
  const net = d.lines.reduce((s, l) => s + l.amount, 0);
  const vat = Math.round(net * rate) / 100;
  return makePdf([
    { text: d.seller.name, size: 18, bold: true },
    { text: `TVA ${d.seller.vat}`, size: 9 },
    { text: d.title, size: 14, bold: true, gap: 40 },
    { text: `N° ${d.number}   ·   Date ${d.date}`, size: 10 },
    { text: `Client : ${d.buyer.name} (TVA ${d.buyer.vat})`, size: 10, gap: 24 },
    ...d.lines.map((l) => ({ text: `${l.label.padEnd(60, '.')} ${eur(l.amount)}`, size: 10, gap: 22 })),
    { text: `Total HTVA : ${eur(net)}`, size: 11, bold: true, gap: 34 },
    { text: `TVA ${rate} % : ${eur(vat)}`, size: 11 },
    { text: `Total TVAC : ${eur(net + vat)}`, size: 12, bold: true },
  ]);
}

/** Simple tabular report as PDF. */
export function reportPdf(title: string, subtitle: string, rows: string[][]): Buffer {
  return makePdf([
    { text: 'Delegis', size: 16, bold: true },
    { text: title, size: 14, bold: true, gap: 34 },
    { text: subtitle, size: 10 },
    ...rows.map((r, i) => ({ text: r.join('   |   '), size: 9, bold: i === 0, gap: i === 0 ? 26 : 15 })),
  ]);
}

/** CSV with ; separator and BOM (opens correctly in Excel with Belgian locale). */
export function csv(rows: (string | number)[][]): Buffer {
  return Buffer.from('﻿' + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n'), 'utf8');
}

/** Belgian CODA bank statement (fixed 128-char records: header 0, old balance 1, movements 21, new balance 8, trailer 9). */
export function coda(opts: { date: Date; account: string; holder: string; movements: { amount: number; label: string }[]; opening: number }): Buffer {
  const d = `${String(opts.date.getDate()).padStart(2, '0')}${String(opts.date.getMonth() + 1).padStart(2, '0')}${String(opts.date.getFullYear()).slice(2)}`;
  const amt = (n: number) => String(Math.round(Math.abs(n) * 1000)).padStart(15, '0');
  const sign = (n: number) => (n < 0 ? '1' : '0');
  const rec = (s: string) => s.padEnd(128, ' ').slice(0, 128);
  const lines = [rec(`0000${d}00000        DELEGIS DEMO              ${opts.holder.slice(0, 26).padEnd(26)}0`), rec(`1 ${opts.account.replace(/\s/g, '').padEnd(37)}${sign(opts.opening)}${amt(opts.opening)}${d}`)];
  let bal = opts.opening;
  opts.movements.forEach((m, i) => {
    bal += m.amount;
    lines.push(rec(`21${String(i + 1).padStart(4, '0')}0000${''.padEnd(21)}${sign(m.amount)}${amt(m.amount)}${d}000000000${m.label.slice(0, 53)}`));
  });
  lines.push(rec(`8 ${opts.account.replace(/\s/g, '').padEnd(37)}${sign(bal)}${amt(bal)}${d}`), rec(`9${''.padEnd(15)}${String(lines.length - 1).padStart(6, '0')}`));
  return Buffer.from(lines.join('\r\n'), 'latin1');
}

/** Minimal Peppol BIS Billing 3.0 UBL invoice. */
export function ublInvoice(d: { id: string; date: string; seller: { name: string; vat: string }; buyer: { name: string; vat: string }; net: number }): Buffer {
  const vat = Math.round(d.net * 21) / 100;
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const party = (p: { name: string; vat: string }) =>
    `<cac:Party><cbc:EndpointID schemeID="0208">${p.vat.replace(/\D/g, '')}</cbc:EndpointID><cac:PartyLegalEntity><cbc:RegistrationName>${esc(p.name)}</cbc:RegistrationName></cac:PartyLegalEntity><cac:PartyTaxScheme><cbc:CompanyID>BE${p.vat.replace(/\D/g, '')}</cbc:CompanyID><cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme></cac:PartyTaxScheme></cac:Party>`;
  return Buffer.from(
    `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>${d.id}</cbc:ID>
  <cbc:IssueDate>${d.date}</cbc:IssueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>${party(d.seller)}</cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>${party(d.buyer)}</cac:AccountingCustomerParty>
  <cac:TaxTotal><cbc:TaxAmount currencyID="EUR">${vat.toFixed(2)}</cbc:TaxAmount></cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">${d.net.toFixed(2)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">${d.net.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">${(d.net + vat).toFixed(2)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">${(d.net + vat).toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
</Invoice>
`,
    'utf8',
  );
}
