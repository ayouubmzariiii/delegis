import type { Extra } from './extra-types';

const en: Extra = {
  nav: { firms: 'Accounting firms', method: 'Method', guides: 'Guides', careers: 'Careers' },
  home: {
    heroBadge: 'Average turnaround in September: 31 h',
    invoiceLabel: 'Supplier invoice received',
    invoiceFields: [
      { label: 'Supplier', value: 'Brico Pro SRL' },
      { label: 'VAT no.', value: 'BE 0412.345.678' },
      { label: 'Amount excl. VAT', value: '€1,284.50' },
      { label: 'VAT 21 %', value: '€269.75' },
    ],
    ledgerLabel: 'Entry posted',
    marqueeLabel: 'We work directly in your software',
    compareKicker: 'The sum our clients do before signing',
    compareTitle: 'An in-house bookkeeper costs more than their salary',
    compareText:
      'For an SME handling around 600 documents a month, here is what a full-time data-entry post costs in Belgium, set against a monthly file with us.',
    compareInhouse: 'Salaried bookkeeper',
    compareDelegis: 'Delegis file',
    compareRows: [
      { label: 'Salary and employer contributions', inhouse: '≈ €4,300', delegis: '—' },
      { label: 'Holiday pay, 13th month (spread)', inhouse: '≈ €650', delegis: '—' },
      { label: 'Workstation, software, training', inhouse: '≈ €250', delegis: 'included' },
      { label: 'Cover during holidays', inhouse: 'to arrange', delegis: 'included' },
      { label: 'Estimated monthly cost', inhouse: '≈ €5,200', delegis: '≈ €780' },
    ],
    compareNote: 'Ballpark figures for an accounts clerk in Brussels in 2026. Your situation may differ: ask us for the exact calculation.',
    casesKicker: 'Typical situations',
    casesTitle: 'What people call us about most often',
    cases: [
      {
        who: 'Accounting firm in Liège, 4 staff',
        problem: 'March is coming, 180 files to close and one accountant on maternity leave.',
        solution: 'Two Delegis bookkeepers enter purchases and CODA statements in Winbooks for four months.',
        result: 'The firm meets its deadlines without hiring a temp it would have to train.',
      },
      {
        who: 'Food wholesaler in Antwerp',
        problem: 'Since January 2026, rejected Peppol invoices have been piling up and nobody has time to chase them.',
        solution: 'The Peppol desk takes over the inbox, resolves rejections with customers and books incoming invoices.',
        result: 'No invoice is now stuck for longer than 48 h.',
      },
      {
        who: 'E-commerce agency in Brussels',
        problem: 'Eight months of documents never booked, and a VAT inspection on the way.',
        solution: 'Rescue file: sorting, booking, bank reconciliation and returns prepared.',
        result: 'File brought up to date in 9 working days, at the quoted price.',
      },
    ],
    casesNote: 'Representative examples, described anonymously.',
    firmsTeaserTitle: 'Are you an accounting firm?',
    firmsTeaserText:
      'We work white-label, in your software, following your booking conventions. Your clients only ever see you.',
    firmsTeaserCta: 'Our offer for firms',
    guidesTitle: 'Practical guides',
  },
  firms: {
    metaTitle: 'Accounting Firm Outsourcing in Belgium | Delegis',
    metaDescription:
      'White-label bookkeeping support for Belgian accounting firms: your software, your conventions, your name. Accounting firm outsourcing you can scale monthly.',
    kicker: 'For accounting firms and chartered accountants',
    h1: 'More clients, same office',
    intro:
      'Most of our clients are accounting firms. They keep the relationship, the advice and the signature; we take on data entry, matching and preparation. Your client never knows we exist, and that is deliberate.',
    painsTitle: 'What we hear in every firm',
    pains: [
      { title: '“We’re turning clients away”', text: 'The book is full, but hiring a bookkeeper takes three months and training them takes six.' },
      { title: '“March, April, May”', text: 'Year-end closings and VAT quarters land at the same time. The team works overtime, and the mistakes pile up too.' },
      { title: '“Our juniors do data entry”', text: 'People trained to advise spend their days keying in fuel receipts.' },
      { title: '“Peppol changed everything”', text: 'New flows, new rejections, new questions from clients. And nobody extra to answer them.' },
    ],
    modelTitle: 'How we fit into your firm',
    model: [
      { title: 'White-label', text: 'We sign an NDA and a DPA with you. Your clients stay your clients.' },
      { title: 'In your tools', text: 'Named access to Bob, Winbooks, Exact, Yuki, Horus, Octopus or Silverfin. No exports.' },
      { title: 'Your conventions', text: 'We follow your booking manual, your suspense accounts and your analytical codes.' },
      { title: 'A fixed team', text: 'The same bookkeepers on your files month after month, with a team lead you can reach.' },
      { title: 'Flexible capacity', text: 'Scale up in March, scale down in August. One month’s notice.' },
      { title: 'Firm pricing', text: 'Volume discount from 1,500 documents a month, consolidated invoicing.' },
    ],
    quoteTitle: 'Your staff go back to what they were trained for: advising.',
    faq: [
      { q: 'Do your teams know Belgian accounting?', a: 'Yes. Every bookkeeper completes in-house training on the Belgian chart of accounts (PCMN), Belgian VAT and the main software packages before touching a client file, followed by 100 % review during their first month.' },
      { q: 'Can we trial it on a single file?', a: 'Yes. We offer a one-month pilot file, billed at the standard rate, with no commitment afterwards.' },
      { q: 'Who carries professional liability?', a: 'Your firm, as it does today. We are a production subcontractor; you review, approve and sign.' },
    ],
  },
  method: {
    metaTitle: 'Our Method: Onboarding, Quality, Security | Delegis',
    metaDescription:
      'How onboarding works at Delegis, how we check every document, and what happens to your files between upload and delivery. Outsourced bookkeeping in Belgium.',
    kicker: 'Method',
    h1: 'What happens between upload and delivery',
    intro:
      'Outsourcing means you no longer watch the work being done. We make up for that with method and numbers: at any moment you know where each document stands and who has handled it.',
    timelineTitle: 'The first ten days',
    timeline: [
      { day: 'D1', title: 'Scoping call', text: '45 minutes with your account manager: software, volumes, conventions, deadlines.' },
      { day: 'D2–3', title: 'Access and documents', text: 'Named logins set up, DPA signed, your booking manual received.' },
      { day: 'D4–6', title: 'Test file', text: 'A real month is booked, then compared line by line with your own work.' },
      { day: 'D7', title: 'Adjustments', text: 'We correct the differences and fix the rules in a shared file sheet.' },
      { day: 'D8–10', title: 'Production', text: 'Normal flow begins, with tighter checks during the first four weeks.' },
    ],
    qualityTitle: 'How we measure quality',
    quality: [
      { value: '2', label: 'pairs of eyes', text: 'Every document is booked by one bookkeeper and checked by a second.' },
      { value: '5 %', label: 'sample', text: 'A team lead randomly reviews 5 % of documents every week.' },
      { value: '< 0.5 %', label: 'target error rate', text: 'The actual rate is shown in your monthly report.' },
      { value: '4 h', label: 'to respond', text: 'Maximum time to answer a question, in business hours.' },
    ],
    dayTitle: 'A day in the life of your file',
    day: [
      { time: '08:30', text: 'Documents uploaded the day before are sorted and assigned to your file’s bookkeeper.' },
      { time: '10:00', text: 'Booking in your software. Doubtful documents go out as questions in the portal.' },
      { time: '14:00', text: 'CODA import and matching of the day’s payments.' },
      { time: '16:00', text: 'Cross-check by a second bookkeeper.' },
      { time: '17:30', text: 'Status updated in your portal. You see what is done and what is waiting.' },
    ],
    faq: [
      { q: 'What happens if a document is unreadable?', a: 'It is not booked. You receive a request in the portal, with the document attached.' },
      { q: 'Can I talk to the bookkeeper directly?', a: 'Yes, through messaging in the portal. Your account manager remains your contact for anything contractual.' },
    ],
  },
  careers: {
    metaTitle: 'Accounting Jobs in Casablanca: Join Delegis',
    metaDescription:
      'Delegis is hiring accountants and bookkeepers in Casablanca to work for Belgian clients. Permanent contracts, Belgian accounting training, daytime hours.',
    kicker: 'Careers · Casablanca',
    h1: 'Work on Belgian files, from Casablanca',
    intro:
      'We hire accounting profiles who want to learn a second framework, work in European software and progress quickly. No call centre, no night shifts.',
    perksTitle: 'What we offer',
    perks: [
      { title: 'Permanent contract from day one', text: 'After a probation period, with no temping agency in between.' },
      { title: 'Paid training', text: 'Six weeks on Belgian accounting, VAT and software before your first file.' },
      { title: 'Office hours', text: 'Monday to Friday, daytime, aligned with Belgian time.' },
      { title: 'Career path', text: 'Bookkeeper, then reviewer, then team lead. The criteria are written down and known.' },
    ],
    rolesTitle: 'Open positions',
    roles: [
      { title: 'Accounting file manager', type: 'Permanent · Casablanca', text: 'Bachelor’s degree (Bac+3) in accounting or finance, fluent French. Dutch is a real plus.' },
      { title: 'Accounting quality reviewer', type: 'Permanent · Casablanca', text: '3 years’ experience in an accounting firm, rigour and an eye for detail.' },
      { title: 'Customer service officer FR/EN/AR', type: 'Permanent · Casablanca', text: 'Excellent written communication, experience in B2B customer relations.' },
    ],
    applyTitle: 'Speculative application',
    applyText: 'Send your CV and a few lines about yourself to jobs@delegis.ma. We reply to every application.',
    applyCta: 'Apply by e-mail',
  },
  guides: {
    metaTitle: 'Guides: Bookkeeping, Peppol and Outsourcing | Delegis',
    metaDescription:
      'Practical guides for Belgian SMEs and accounting firms: Peppol e-invoicing in 2026, the real cost of in-house bookkeeping, outsourcing, nearshore Morocco.',
    h1: 'Practical guides',
    intro: 'What we explain to clients most often, written down once and for all.',
    read: 'Read the guide',
    minutes: 'min read',
    updated: 'Updated on',
    tocTitle: 'Contents',
    articles: [
      {
        id: 'peppol-2026',
        slug: 'peppol-e-invoicing-belgium-2026',
        title: 'Peppol e-invoicing in Belgium: what changes in 2026',
        metaTitle: 'Peppol E-Invoicing Belgium: the 2026 Mandate | Delegis',
        metaDescription:
          'Since 1 January 2026, structured e-invoicing is mandatory between Belgian businesses. Peppol e-invoicing in Belgium: who is affected, deadlines and fines.',
        excerpt: 'Who is affected, what you need in place, and what the mandate changes for your bookkeeping.',
        readingMinutes: 6,
        date: '2026-09-15',
        sections: [
          {
            h2: 'What the mandate says',
            paragraphs: [
              'Since 1 January 2026, VAT-registered businesses established in Belgium must issue and receive their B2B invoices in structured electronic form. A PDF sent by e-mail no longer counts as an electronic invoice in the legal sense.',
              'The default network is Peppol, using the Peppol BIS Billing 3.0 format. Both parties may agree on another channel, but in practice almost the entire market uses Peppol.',
            ],
          },
          {
            h2: 'Who is affected',
            paragraphs: ['The mandate covers transactions between Belgian VAT-registered businesses. A few categories remain out of scope.'],
            bullets: [
              'Affected: VAT-registered companies and self-employed people established in Belgium, for their invoices to other Belgian VAT-registered businesses.',
              'Not affected: invoices to private individuals, VAT-exempt businesses (Article 44), certain specific transactions.',
              'Invoices abroad: not covered by the Belgian mandate for now, although many businesses already send them via Peppol.',
            ],
          },
          {
            h2: 'The penalties',
            paragraphs: [
              'The legislator has set escalating administrative fines for repeated breaches: €1,500 the first time, €3,000 the second, €5,000 from the third onwards. A grace period has been announced for the first months of 2026, but it does not exempt anyone from getting their house in order.',
            ],
          },
          {
            h2: 'What it changes for your bookkeeping',
            paragraphs: [
              'Incoming invoices arrive as structured data, which speeds up booking. But someone still has to watch the Peppol inbox, deal with rejected invoices and chase suppliers who are still sending PDFs.',
              'It is this follow-up work, more than the technology, that causes trouble for most SMEs.',
            ],
          },
          {
            h2: 'The checklist',
            paragraphs: ['Before you consider yourself ready:'],
            bullets: [
              'Your business is registered on Peppol with its company number.',
              'Your invoicing software can issue in Peppol BIS 3.0 format.',
              'Your main customers have been informed and their identifiers checked.',
              'Someone is responsible for rejections and incoming invoices.',
              'Your accountant receives invoices without re-keying them.',
            ],
          },
        ],
        faq: [
          { q: 'Is a PDF by e-mail still valid?', a: 'No, not between Belgian VAT-registered businesses since 2026. It must be a structured electronic invoice, in principle via Peppol.' },
          { q: 'Does my accounting software receive Peppol invoices?', a: 'Most Belgian packages (Exact, Yuki, Octopus, Odoo, Billit…) are connected. Check that receiving is switched on and linked to the right company number.' },
        ],
      },
      {
        id: 'cost-inhouse',
        slug: 'cost-of-in-house-vs-outsourced-bookkeeping',
        title: 'What does in-house bookkeeping really cost?',
        metaTitle: 'In-House vs Outsourced Bookkeeping: the Real Cost',
        metaDescription:
          'Salary, contributions, holiday pay, cover: the real cost of a salaried bookkeeper in Belgium, compared with the price of outsourcing billed per document.',
        excerpt: 'The salary is only the visible part. The full calculation, line by line.',
        readingMinutes: 5,
        date: '2026-08-28',
        sections: [
          {
            h2: 'The salary is just the starting point',
            paragraphs: [
              'An experienced accounts clerk in Brussels earns around €3,300 gross a month in 2026. With employer contributions, the cost to the employer exceeds €4,300.',
              'On top of that come double holiday pay and the year-end bonus, which together add almost two extra months’ salary over the year.',
            ],
          },
          {
            h2: 'The costs people forget',
            paragraphs: ['They appear on no payslip, but they are real:'],
            bullets: [
              'The workstation, software licences and ongoing training.',
              'Holiday weeks, during which documents pile up.',
              'Recruitment and the learning period every time someone leaves.',
              'The senior accountant’s time spent checking and correcting.',
            ],
          },
          {
            h2: 'Bringing it down to a cost per document',
            paragraphs: [
              'A bookkeeper handles an average of 30 to 40 documents an hour on a well-organised file, far fewer on a messy one. Over a month of 150 productive hours, the full cost often comes to €1.50 to €3 per document.',
              'By comparison, our rates start at €0.80 for a sales invoice and €1.10 for a purchase invoice, review included.',
            ],
          },
          {
            h2: 'When to keep bookkeeping in-house',
            paragraphs: [
              'Outsourcing is not always the right answer. If your documents call for very detailed knowledge of the trade, or if your bookkeeper also covers reception and logistics, keeping them in-house can make sense. Most often, our clients keep one person in-house and hand the volume to us.',
            ],
          },
        ],
      },
      {
        id: 'outsourcing-checklist',
        slug: 'outsourcing-your-accounting-guide',
        title: 'Outsourcing your accounting: how to do it without losing control',
        metaTitle: 'Outsourcing Your Accounting in Belgium: the Guide',
        metaDescription:
          'What you can outsource, what you keep, the questions to ask a provider and the contract points to check before signing. Outsourced bookkeeping in Belgium.',
        excerpt: 'What you can hand over, what you keep, and the questions to ask before signing.',
        readingMinutes: 7,
        date: '2026-07-10',
        sections: [
          {
            h2: 'What you outsource, what you keep',
            paragraphs: [
              'You hand over production: data entry, matching, preparing returns, filing. You keep the decisions: approval, signature, advice, dealings with the tax authorities.',
              'In Belgium, keeping accounts on behalf of third parties and giving tax advice are regulated professions. A serious provider works for you or for your accountant, never in their place.',
            ],
          },
          {
            h2: 'Questions to ask a provider',
            paragraphs: ['Before you choose:'],
            bullets: [
              'Where is my data stored, and who has access to it?',
              'Do you work in my software or in yours?',
              'How do you measure errors, and will you show me that figure?',
              'Who answers when I have a question, and how quickly?',
              'What happens if I want to stop?',
            ],
          },
          {
            h2: 'What the contract should include',
            paragraphs: [
              'A service agreement with quantified deadlines and quality levels, a DPA compliant with Article 28 GDPR, a confidentiality clause, and an exit clause providing for the return of all your data.',
            ],
          },
          {
            h2: 'Getting started',
            paragraphs: [
              'Start with a test file covering a month you have already processed. Compare the result line by line. It is the simplest way to find out whether the provider understands your rules.',
            ],
          },
        ],
      },
      {
        id: 'why-morocco',
        slug: 'accounting-outsourcing-morocco-nearshore',
        title: 'Why Morocco for Belgian accounting outsourcing',
        metaTitle: 'Accounting Outsourcing in Morocco: Nearshore | Delegis',
        metaDescription:
          'Language, time zone, training, cost: what makes Morocco a natural home for the accounting back office of Belgian businesses, and the limits to be aware of.',
        excerpt: 'Language, time zone, training, cost: the concrete reasons, and the limits.',
        readingMinutes: 5,
        date: '2026-06-20',
        sections: [
          {
            h2: 'Language',
            paragraphs: [
              'French is the language of business and higher education in Morocco. Accountants read your documents, e-mails and procedures without translation, which avoids many of the errors seen in far-off offshoring.',
            ],
          },
          {
            h2: 'Time zone',
            paragraphs: [
              'Morocco is one hour from Belgium for most of the year. A question asked at 10 am gets an answer the same day, not the next morning.',
            ],
          },
          {
            h2: 'A pool of accountants',
            paragraphs: [
              'Moroccan business schools and universities train thousands of accounting and finance graduates every year. The Moroccan chart of accounts is based on the French model, close to the Belgian PCMN, which makes training quick.',
            ],
          },
          {
            h2: 'The limits to know about',
            paragraphs: [
              'Dutch remains rare: for a Flemish file, we combine Dutch-speaking bookkeepers with controlled translation tools. Transferring data outside the EU must be covered by standard contractual clauses, which we put in place every time.',
            ],
          },
        ],
      },
    ],
  },
};

export default en;
