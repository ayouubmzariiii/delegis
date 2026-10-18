import type { Hook } from './hook-types';

const en: Hook = {
  hero: {
    eyebrow: 'Bookkeeping back office for Belgian companies and accountancy firms',
    title: 'Your books up to date,',
    highlight: 'without losing your evenings.',
    text: 'You upload your invoices, CODA statements and payslips. Our team posts them in your software within 48 h, checks everything twice, and your accountant just signs off.',
    cta: 'Book a test month',
    ctaNote: 'Reply within 24 working hours · No commitment',
    secondary: 'See pricing',
  },
  calc: {
    title: 'What does data entry cost you today?',
    docsLabel: 'Documents to post per month',
    unit: 'documents',
    hoursLabel: 'hours of data entry per month',
    inhouseLabel: 'Estimated in-house cost',
    delegisLabel: 'With Delegis',
    savingLabel: 'Estimated saving per year',
    note: 'Based on 35 documents/hour and 52 €/hour full employer cost. Indicative estimate.',
    cta: 'Work out my exact price',
  },
  proof: [
    { value: '48 h', label: 'standard turnaround' },
    { value: '2×', label: 'check on every document' },
    { value: '1 month', label: 'notice, no lock-in' },
    { value: 'EU', label: 'data hosting' },
  ],
  bento: {
    label: 'Services',
    title: 'Everything your office keeps pushing to next week',
    lead: 'Thirteen services, one contact, inside your own software.',
    encodingStat: '214 documents posted in September for one client',
    peppolBadge: 'Mandatory since 1 January 2026',
    rescueSeal: 'On time, or 10 % refunded per day late',
    toolsLabel: 'Works with',
    allServices: 'See all 13 services',
  },
  beforeAfter: {
    label: 'A typical month',
    title: 'The same month, two ways to live it',
    without: 'Without Delegis',
    with: 'With Delegis',
    withoutItems: [
      { day: 'Week 1', text: 'Invoices arrive by email, on WhatsApp, in a shoebox.' },
      { day: 'Week 2', text: 'Someone posts them between calls. The CODA files wait.' },
      { day: 'Week 3', text: 'The accountant chases: documents are missing for the VAT return.' },
      { day: 'Week 4', text: 'A late night catching up before the deadline.' },
    ],
    withItems: [
      { day: 'Day 1', text: 'You drop the documents into the portal, or they arrive via Peppol.' },
      { day: 'Day 2', text: 'Everything is posted and checked in your software.' },
      { day: 'Day 3', text: 'We ask for any missing documents, one by one, in the portal.' },
      { day: 'Month end', text: 'Your accountant gets a clean file and the VAT prepared.' },
    ],
    withoutSummary: '≈ 17 h of in-house work and a stressful deadline',
    withSummary: '≈ 20 minutes of your time, the rest is done',
  },
  risk: [
    { title: 'A test month', text: 'We post one real month. You compare it with your own work before deciding.' },
    { title: 'No commitment', text: 'Monthly contract, cancel with one month’s notice.' },
    { title: 'Guaranteed turnaround', text: 'On Dossier Rescue: 10 working days or a partial refund.' },
  ],
  stickyCta: 'Test month',
};

export default en;
