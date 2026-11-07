import type { Article } from './extra-types';

/** Guides published in November 2026 (en). Same ids, structure and links in every language. */
export const guidesEn: Article[] = [
  {
    id: 'vat-deadlines',
    slug: 'belgian-vat-return-deadlines-calendar',
    title: 'Belgian VAT returns: deadlines, calendar and common pitfalls',
    metaTitle: 'Belgian VAT return deadlines and calendar 2026',
    metaDescription:
      'Monthly by the 20th, quarterly by the 25th: Belgian VAT return deadlines, the listings you must not forget and a simple method to never file late again.',
    excerpt: 'Which deadlines apply to your business, what to file alongside the return and how to prepare every period without a last-minute rush.',
    readingMinutes: 7,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Monthly or quarterly: which regime applies?',
        paragraphs: [
          'In Belgium the periodic VAT return is monthly by default. A business may file quarterly as long as its annual turnover excluding VAT does not exceed €2.5 million, except for certain activities (energy products, new vehicles, mobile phones, computers…) where the threshold is much lower.',
          'The quarterly regime means less paperwork, but it also delays the refund of a VAT credit. A business that invests heavily or exports often benefits from switching to monthly returns, which is requested from the competent VAT office.',
        ],
      },
      {
        h2: 'Filing and payment deadlines',
        paragraphs: [
          'Since the reform that took effect in 2025, the deadlines are no longer the same for everyone. Both the return and the payment must reach the FPS Finance by the same date.',
        ],
        bullets: [
          'Monthly return: by the 20th of the month after the period (March VAT is filed and paid by 20 April).',
          'Quarterly return: by the 25th of the month after the quarter, i.e. 25 April, 25 July, 25 October and 25 January.',
          'When a deadline falls on a Saturday, Sunday or public holiday, check the exact date published by the FPS Finance on MyMinfin: that date is binding.',
          'The payment must be credited to the FPS Finance account by the deadline, not just ordered: allow one or two business days of margin.',
        ],
      },
      {
        h2: 'What to file besides the return',
        paragraphs: ['The periodic return is only part of your VAT obligations. Three other documents come back regularly:'],
        bullets: [
          'The EC sales listing (supplies and services to VAT-registered customers in the EU), filed with the same frequency as the return.',
          'The annual listing of Belgian VAT-registered customers, due by 31 March of the following year.',
          'Special or corrective returns when an error is found: correcting spontaneously is better than waiting for an audit.',
        ],
      },
      {
        h2: 'What filing late costs',
        paragraphs: [
          'A late return triggers an administrative fine that rises with repeated offences, and a late payment generates late interest on the VAT due. Beyond the money, repeated delays draw the administration’s attention and make refund requests harder.',
          'In practice, most delays do not come from the VAT calculation but from missing documents: purchase invoices received late, unprocessed bank statements, forgotten credit notes.',
        ],
      },
      {
        h2: 'A simple method to stop rushing',
        paragraphs: [
          'VAT is prepared during the period, not after it. If invoices are [booked every week](service:encoding) and bank statements reconciled as they come in, the return becomes a final check.',
          'Since 2026 most B2B invoices arrive through Peppol: they are faster to process, provided someone monitors the inbox. Our guide to [Peppol e-invoicing](guide:peppol-2026) covers this in detail.',
        ],
        bullets: [
          'Days 1 to 5 after period end: chase missing documents.',
          'Days 5 to 10: bookkeeping complete, bank reconciliation closed.',
          'Days 10 to 15: VAT grid prepared, consistency checks, sign-off by the accountant.',
          'Before the deadline: filing on Intervat and payment, with a few days of margin.',
        ],
      },
      {
        h2: 'Checks before you file',
        paragraphs: [
          'A well-prepared return can be checked in minutes: output VAT matches the period’s turnover, reverse-charge operations (domestic and intra-EU) appear on both sides of the grid, and no VAT is deducted on non-deductible costs such as restaurants or part of car expenses.',
          'If you would rather delegate this work, our [VAT return preparation](service:vat) service delivers a checked grid, ready for your accountant to approve and file, at [public per-item prices](page:pricing).',
        ],
      },
    ],
    faq: [
      { q: 'What is the deadline for a quarterly Belgian VAT return?', a: 'The 25th of the month after the quarter: 25 April, 25 July, 25 October and 25 January. Both the return and the payment must arrive by that date.' },
      { q: 'Can I switch from quarterly to monthly returns?', a: 'Yes. A business that qualifies for quarterly filing may opt for monthly returns, for example to recover a VAT credit sooner. The request goes to the competent VAT office.' },
      { q: 'Is the annual customer listing still required?', a: 'Yes, for VAT-registered businesses that invoiced Belgian VAT-registered customers. It is filed through Intervat by 31 March of the following year.' },
    ],
  },
  {
    id: 'coda-reconciliation',
    slug: 'coda-files-bank-reconciliation',
    title: 'CODA files: how to automate bank reconciliation',
    metaTitle: 'CODA files and bank reconciliation in Belgium',
    metaDescription:
      'What a CODA file contains, how to activate it with your bank and how to match payments using the structured communication, without retyping a single line.',
    excerpt: 'The Belgian bank statement format explained simply, and a method to match payments without spending your evenings on statements.',
    readingMinutes: 6,
    date: '2026-11-07',
    sections: [
      {
        h2: 'What is a CODA file?',
        paragraphs: [
          'CODA (coded statement of account) is the standard format for electronic bank statements in Belgium, defined by Febelfin, the Belgian financial sector federation. Every day the account moves, the bank produces a text file with the opening balance, each transaction and the new balance.',
          'The file is built for machines: 128-character lines, each with a record type. Your accounting software reads it directly, so statements no longer have to be copied by hand.',
        ],
        bullets: [
          'Record 0: header (bank, date, account holder).',
          'Record 1: opening balance.',
          'Records 2 and 3: transactions and details (amount, counterparty, communication).',
          'Record 8: new balance. Record 9: end of file and control totals.',
        ],
      },
      {
        h2: 'How to receive your CODA files',
        paragraphs: [
          'Belgian banks supply CODA files on request, usually through a mandate signed by the account holder. The easiest route is a distribution service that collects files from all your banks and delivers them daily to your accounting software or your accountant.',
          'Once the feed is live, check that it covers every account: current account, savings, foreign-currency accounts and business credit cards, which are often forgotten.',
        ],
      },
      {
        h2: 'Structured communication: the key to automatic matching',
        paragraphs: [
          'In Belgium an invoice can carry a structured communication in the form +++123/4567/89012+++. The last two digits are a modulo 97 check, which lets the software detect typing errors.',
          'When the customer pays with that communication, the CODA file passes it on unchanged and the software finds the invoice without hesitation. It is the most effective way to raise your automatic matching rate.',
        ],
      },
      {
        h2: 'The payments that cause trouble',
        paragraphs: ['Even with CODA, some transactions still need a human:'],
        bullets: [
          'Grouped payments covering several invoices, or partial payments.',
          'Free-text or missing communication, counterparty name different from the customer.',
          'Bank fees, card terminals and platforms (Stripe, PayPal, Mollie) that pay out net amounts.',
          'Refunds, credit notes and customer prepayments.',
        ],
      },
      {
        h2: 'A reconciliation routine that holds',
        paragraphs: [
          'Reconciliation is best done weekly: amounts are still fresh, questions to customers stay simple, and the open-items list is reliable enough to [chase late payments](guide:late-payment).',
          'The golden rule: an unidentified transaction never stays in a suspense account for more than a month. After that it becomes very costly to trace, especially at [year-end closing](guide:annual-closing).',
        ],
      },
      {
        h2: 'Outsourcing reconciliation',
        paragraphs: [
          'Processing CODA files is a regular, precise and easy-to-describe task, which makes it a good fit for outsourcing. Our [bank reconciliation and CODA](service:bank) service processes your statements, matches payments and only flags the cases that need a decision, inside your own software.',
        ],
      },
    ],
    faq: [
      { q: 'Do CODA files cost money?', a: 'It depends on the bank and the distribution service you choose. Many accounting firms and accounting packages include CODA collection in their offer.' },
      { q: 'What is the difference between CODA and CAMT.053?', a: 'CAMT.053 is the international XML format (ISO 20022) for bank statements. CODA remains the reference format in Belgium and most Belgian software reads both.' },
      { q: 'Can I reconcile without CODA?', a: 'Yes, from PDF statements or CSV exports, but it is slower and more error-prone. CODA is strongly recommended once you have more than a few dozen transactions a month.' },
    ],
  },
  {
    id: 'annual-closing',
    slug: 'year-end-closing-annual-accounts-nbb',
    title: 'Year-end closing and filing annual accounts with the NBB: a step-by-step guide',
    metaTitle: 'Year-end closing and NBB annual accounts: the guide',
    metaDescription:
      'Year-end adjustments, general meeting, filing with the National Bank within seven months: the calendar and checklist for a Belgian year-end closing.',
    excerpt: 'What to prepare, in what order and by when, from the last invoice of the financial year to filing the annual accounts.',
    readingMinutes: 8,
    date: '2026-11-07',
    sections: [
      {
        h2: 'The legal calendar',
        paragraphs: [
          'For a Belgian company, closing follows a calendar set by the Code of Companies and Associations. For a financial year ending on 31 December, it looks like this:',
        ],
        bullets: [
          'The board prepares the annual accounts and, where required, the management report.',
          'The general meeting approves the accounts within six months of year-end, i.e. by 30 June at the latest.',
          'The accounts are filed with the National Bank of Belgium within 30 days of approval, and no later than seven months after year-end, i.e. by 31 July.',
          'The corporate income tax return follows its own calendar, set each year by the FPS Finance.',
        ],
      },
      {
        h2: 'Year-end adjustments',
        paragraphs: ['Before the accounts are drawn up, the books must reflect the real position at closing date. These are the year-end entries:'],
        bullets: [
          'Depreciation of fixed assets according to the depreciation plan.',
          'Stock count and work in progress.',
          'Prepaid expenses and accrued income, accrued expenses and deferred income.',
          'Write-downs on doubtful receivables and provisions for risks.',
          'Estimate of corporate income tax for the year.',
        ],
      },
      {
        h2: 'The preparation checklist',
        paragraphs: [
          'A fast closing is prepared throughout the year. The cleaner the books in December, the less work is left in January. Before you start, check at least these points:',
        ],
        bullets: [
          'Every invoice of the year is [booked](service:encoding), including those received in January for the previous year.',
          'Bank accounts are reconciled up to 31 December and suspense accounts are empty (see our guide to [CODA files](guide:coda-reconciliation)).',
          'Customer and supplier balances are supported and old receivables reviewed.',
          'VAT, social security and payroll tax accounts agree with the returns filed.',
          'Contracts, loans and leases are up to date in the fixed-asset and debt schedules.',
        ],
      },
      {
        h2: 'Filing with the National Bank',
        paragraphs: [
          'Annual accounts are filed through the Central Balance Sheet Office’s online application, in structured format (XBRL) or PDF depending on the model used: micro, abridged or full according to the size of the company. Filing is charged, and the fee depends on the model and format.',
          'Late filing triggers a surcharge that grows with the delay. The real risk lies elsewhere: a company that fails to file for three consecutive financial years can be dissolved by the court, and in a bankruptcy the absence of filings can be held against the directors.',
        ],
      },
      {
        h2: 'How much time to allow',
        paragraphs: [
          'For an SME with up-to-date books, closing takes a few working days spread over two to four weeks, the time needed to collect the last documents and inventory data. A file that is behind must first be caught up: that is what our [Dossier Rescue](service:rescue) is for.',
          'If your team or accountant is short of hands in spring, our [closing support](service:closing) service prepares the notes, depreciation schedules and review file, so the accountant only has to check and sign.',
        ],
      },
    ],
    faq: [
      { q: 'What is the deadline for filing annual accounts in Belgium?', a: 'Thirty days after approval by the general meeting, and no later than seven months after the end of the financial year. For a 31 December year-end, that is 31 July.' },
      { q: 'What happens if I file late?', a: 'The National Bank applies a surcharge that grows with the delay. Failing to file for three consecutive years also exposes the company to dissolution by the court.' },
      { q: 'Can a company close its books on a date other than 31 December?', a: 'Yes, the closing date is set in the articles of association. The six- and seven-month deadlines then run from that date.' },
    ],
  },
  {
    id: 'late-payment',
    slug: 'late-payment-belgium-interest-reminders',
    title: 'Late payment between businesses: interest, compensation and reminders',
    metaTitle: 'Late B2B payment in Belgium: your rights',
    metaDescription:
      'A 60-day maximum payment term, €40 compensation, 10.5% interest in 2026: what Belgian law provides against late payment and how to chase unpaid invoices.',
    excerpt: 'The rules that protect your cash flow from customers who pay late, and a reminder process that keeps the relationship intact.',
    readingMinutes: 7,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Permitted payment terms',
        paragraphs: [
          'Between businesses, the Act of 2 August 2002 on combating late payment sets the framework. Without an agreement, an invoice is payable within 30 days of receipt, or of delivery if that comes later.',
          'Since 1 February 2022, parties can no longer agree on a term longer than 60 days. A 90-day clause is deemed unwritten, and any verification period counts within those 60 days.',
        ],
      },
      {
        h2: 'What is due from the first day of delay',
        paragraphs: ['If the customer does not pay by the due date, two amounts are owed automatically, without prior formal notice:'],
        bullets: [
          'Late-payment interest at the statutory rate for commercial transactions: the ECB rate plus eight percentage points, rounded up to the next half point. It is 10.5% a year for 2026.',
          'A flat compensation of €40 per invoice for recovery costs, on top of interest.',
          'Further reasonable recovery costs can be claimed if they are justified.',
        ],
      },
      {
        h2: 'And with consumers?',
        paragraphs: [
          'The rules are stricter towards consumers. The Code of Economic Law requires a first free reminder, leaving at least 14 days to pay, before any interest or compensation can be charged, and those amounts are capped. If you also invoice private individuals, your terms and reminder templates must reflect this.',
        ],
      },
      {
        h2: 'An effective reminder process',
        paragraphs: [
          'Most delays are not bad faith: a lost invoice, the wrong recipient, a missing purchase order. A quick, courteous reminder solves most cases, provided it is systematic.',
        ],
        bullets: [
          'Before the due date: a friendly reminder for large amounts.',
          'Day 3: first reminder by e-mail, with the invoice and the structured communication.',
          'Day 15: phone call to understand what is blocking and get a payment date.',
          'Day 30: formal written notice mentioning interest and compensation.',
          'After that: payment plan, recovery through a bailiff or court proceedings.',
        ],
      },
      {
        h2: 'Uncontested debts',
        paragraphs: [
          'Between businesses, a certain, due and uncontested debt can be recovered without going to court, through a procedure run by a bailiff. If the debtor does not respond, the bailiff obtains an enforceable title. It is often faster and cheaper than a summons.',
        ],
      },
      {
        h2: 'Making reminders a routine',
        paragraphs: [
          'Effective chasing depends on reliable data: payments must be [reconciled every week](guide:coda-reconciliation) so you never chase a customer who has already paid. After that, it is a matter of regularity.',
          'Our [credit management](service:credit) service chases your customers in your name, by e-mail and phone, tracks payment promises and sends you a weekly list of cases to escalate. [Get in touch](page:contact) to discuss it.',
        ],
      },
    ],
    faq: [
      { q: 'Can I charge €40 on every invoice paid late?', a: 'Yes. Between businesses, the €40 flat compensation is due per invoice paid late, on top of interest, without prior formal notice.' },
      { q: 'What is the late-payment interest rate in 2026?', a: 'For commercial transactions the statutory rate is 10.5% a year in 2026. It is reviewed every six months and published by the FPS Finance.' },
      { q: 'Can a customer impose a 90-day payment term?', a: 'No. Since 2022 a contractual payment term between businesses cannot exceed 60 days. A longer clause is deemed unwritten.' },
    ],
  },
];
