import type { DemoText } from './demo-types';

const en: DemoText = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthly: 'Bookkeeping {m}',
  vat: 'VAT preparation Q{q} {y}',
  peppolBatch: 'Peppol invoices received — weekly batch',
  leasing: 'Van lease agreement',
  payroll: 'Timesheets and payroll variables',
  messages: [
    { author: 'team', who: 'manager', daysAgo: 21, body: 'Hi Camille, the August close is done. The report is available under Documents.' },
    { author: 'client', who: 'client', daysAgo: 20, body: 'Thanks Thomas! Was the €2,340 Brico Matériaux invoice booked as a fixed asset?' },
    { author: 'team', who: 'specialist', daysAgo: 20, body: 'Yes, posted to 230000 and depreciated over 5 years. The schedule is attached to the report.' },
    { author: 'team', who: 'specialist', daysAgo: 6, body: 'For September we’re still missing two documents: I’ve set up a request for you under Requests.' },
    { author: 'client', who: 'client', daysAgo: 5, body: 'I’ll look at it first thing tomorrow, they’re in the van.' },
    { author: 'team', who: 'manager', daysAgo: 1, body: 'Quick reminder: the Q3 VAT return is ready. Your accountant can approve it on Intervat before the 20th.' },
  ],
  requests: [
    { title: 'Missing invoice: Total Energies', detail: 'Fuel receipt from 14 September (€86.40) shows on the CODA statement, with no matching invoice.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'Bol.com payment support', detail: 'Payment of €1,245.00 received on 22 September: please send us the Bol.com sales statement.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'Würth supplier credit note', detail: 'Credit note NC-0091 from July has been found and entered.', open: false, daysAgo: 40, dueInDays: 5 },
  ],
  deliverables: {
    report: 'Monthly report — {m}',
    vat: 'VAT grid prepared — Q{q} {y}',
    ledger: 'Provisional general ledger {y}',
    peppol: 'Peppol journal — {m}',
  },
  autoReply: 'Thanks for your message, it’s come through. I’ll look into it and get back to you today.',
};

export default en;
