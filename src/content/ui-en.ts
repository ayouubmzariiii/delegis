import type { Ui } from './ui-types';

const en: Ui = {
  receipt: {
    title: 'File · September 2026',
    client: 'Brico Pro SRL',
    steps: [
      { label: 'Documents received', time: 'Mon 08:12' },
      { label: 'Posted in Exact Online', time: 'Tue 15:40' },
      { label: 'Checked by a second bookkeeper', time: 'Wed 10:05' },
      { label: 'Delivered to your accountant', time: 'Wed 11:30' },
    ],
    footer: '214 documents · 0 pending',
  },
  index: {
    label: 'Services',
    title: 'What we take off your desk',
    lead: 'Thirteen services, billed per document or per file. Pick one, or hand us the lot.',
    colService: 'Service',
    colFrom: 'From',
    all: 'All services',
  },
  process: { label: 'Method' },
  pricing: {
    label: 'Pricing',
    title: 'The price, before you even talk to us',
    lead: 'Move the slider: see what data entry costs you today, and what it would cost with us.',
    modelsTitle: 'Two ways to pay',
  },
  audience: {
    label: 'Who it’s for',
    title: 'Two kinds of client, one standard',
    sme: {
      tag: 'SMEs and sole traders',
      title: 'Your books kept, without hiring',
      text: 'You keep your accountant. We do the data entry waiting for them every month.',
      points: ['Purchases, sales and cash posted', 'VAT prepared before the deadline', 'Peppol handled end to end'],
      cta: 'Estimate my price',
    },
    firms: {
      tag: 'Accounting firms and accountants',
      title: 'More clients, without a bigger office',
      text: 'A white-label team in your software, following your conventions. Your clients only see you.',
      points: ['Capacity adjusted every month', 'The same team on your files', 'Firm rate from 1 500 documents'],
      cta: 'The offer for firms',
    },
  },
  security: {
    label: 'Security',
    title: 'Your data stays in Europe, and under control',
    lead: 'What we put in place before we touch your first file.',
    cta: 'Our GDPR policy',
  },
  guides: { label: 'Guides', title: 'Worth reading before you decide' },
  faq: { label: 'FAQ', more: 'Another question? Write to us.' },
  footerCta: {
    title: 'Send us a month of documents.',
    text: 'We’ll post them as a trial and send you the result with a fixed price.',
  },
  common: { section: 'Section', menu: 'Menu', close: 'Close' },
  demo: { or: 'or', cta: 'Explore the demo account', note: 'Instant access to a portal filled with sample data.', banner: 'Demo account · sample data, reset every time you sign in.', staffCta: "Delegis team access (demo)" },
};

export default en;
