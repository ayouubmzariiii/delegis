export type ServiceId =
  | 'encoding'
  | 'bank'
  | 'vat'
  | 'closing'
  | 'peppol'
  | 'credit'
  | 'payroll'
  | 'data-entry'
  | 'migration'
  | 'customer'
  | 'ecommerce'
  | 'rescue'
  | 'dedicated';

export type ServiceCategory = 'accounting' | 'payroll' | 'data' | 'customer' | 'special';

export type QA = { q: string; a: string };

export type ServiceContent = {
  id: ServiceId;
  slug: string; // localized, ASCII, used in the URL
  name: string;
  metaTitle: string; // <= 60 chars
  metaDescription: string; // 140-160 chars
  short: string; // card text, ~20 words
  h1: string;
  intro: string; // 2-3 sentences
  benefits: { title: string; text: string }[]; // 4 items
  deliverables: string[]; // 5-7 items
  tools?: string[];
  faq: QA[]; // 3-4 items
};

export type Dict = {
  nav: {
    services: string;
    pricing: string;
    cities: string;
    about: string;
    contact: string;
    login: string;
    portal: string;
    quote: string;
    menu: string;
    language: string;
  };
  common: {
    learnMore: string;
    from: string;
    perMonth: string;
    exclVat: string;
    home: string;
    readMore: string;
    skip: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    highlight: string;
    text: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
    stats: { value: string; label: string }[];
    servicesTitle: string;
    servicesText: string;
    howTitle: string;
    steps: { title: string; text: string }[];
    whyTitle: string;
    why: { title: string; text: string }[];
    estimatorTitle: string;
    estimatorText: string;
    bridgeTitle: string;
    bridgeText: string;
    faqTitle: string;
    faq: QA[];
    finalTitle: string;
    finalText: string;
  };
  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    categories: Record<'accounting' | 'payroll' | 'data' | 'customer' | 'special', string>;
  };
  service: {
    benefitsTitle: string;
    deliverablesTitle: string;
    toolsTitle: string;
    faqTitle: string;
    relatedTitle: string;
    ctaTitle: string;
    ctaText: string;
  };
  services: ServiceContent[];
  pricing: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    modelATag: string;
    modelATitle: string;
    modelAText: string;
    modelBTag: string;
    modelBTitle: string;
    modelBText: string;
    docStandard: string;
    docComplex: string;
    docUrgent: string;
    perPage: string;
    docCta: string;
    ratesTitle: string;
    addonsTitle: string;
    addons: { rescue: string; rescueText: string; dedicated: string; dedicatedText: string; hourly: string; hourlyText: string };
    faq: QA[];
  };
  estimator: {
    title: string;
    subtitle: string;
    sales: string;
    purchases: string;
    payroll: string;
    payrollUnit: string;
    docsUnit: string;
    cashToggle: string;
    cashDaily: string;
    cashEntries: string;
    extras: string;
    vat: string;
    coda: string;
    codaLines: string;
    peppol: string;
    resultLabel: string;
    range: string;
    breakdown: string;
    lines: Record<'base' | 'sales' | 'purchases' | 'payroll' | 'cash' | 'vat' | 'coda' | 'peppol', string>;
    discount: string;
    minimum: string;
    disclaimer: string;
    cta: string;
    docsCount: string;
  };
  cities: {
    title: string;
    metaTitle: string; // contains {city}
    metaDescription: string; // contains {city}
    h1: string; // contains {city}
    intro: string; // contains {city}
    localTitle: string; // contains {city}
    localText: string; // contains {city}
    belgium: string;
    morocco: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    paragraphs: string[];
    valuesTitle: string;
    values: { title: string; text: string }[];
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    estimateAttached: string;
    consent: string;
    send: string;
    sent: string;
    error: string;
    officesTitle: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    sections: { title: string; text: string }[];
  };
  auth: {
    loginMetaTitle: string;
    loginTitle: string;
    loginText: string;
    registerTitle: string;
    name: string;
    company: string;
    email: string;
    password: string;
    login: string;
    register: string;
    toRegister: string;
    toLogin: string;
    invalid: string;
    exists: string;
    logout: string;
  };
  portal: {
    title: string;
    welcome: string;
    uploadTitle: string;
    uploadText: string;
    dossierName: string;
    period: string;
    type: string;
    types: Record<'dossier' | 'document', string>;
    choose: string;
    submit: string;
    listTitle: string;
    empty: string;
    files: string;
    status: Record<'received' | 'processing' | 'done', string>;
    sent: string;
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    citiesTitle: string;
    rights: string;
    legal: string;
  };
};
