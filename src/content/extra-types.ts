import type { QA } from './types';

export type Article = {
  id: 'peppol-2026' | 'cost-inhouse' | 'outsourcing-checklist' | 'why-morocco';
  slug: string; // localized ASCII
  title: string; // H1
  metaTitle: string; // <= 60 chars
  metaDescription: string; // 140-160 chars
  excerpt: string;
  readingMinutes: number;
  date: string; // ISO
  sections: { h2: string; paragraphs: string[]; bullets?: string[] }[];
  faq?: QA[];
};

export type Extra = {
  nav: { firms: string; method: string; guides: string; careers: string };
  home: {
    heroBadge: string; // small live badge e.g. "Septembre : 41 218 pièces encodées"
    invoiceLabel: string; // "Facture fournisseur"
    invoiceFields: { label: string; value: string }[]; // 4 fields shown being encoded
    ledgerLabel: string; // "Écriture générée"
    marqueeLabel: string;
    compareKicker: string;
    compareTitle: string;
    compareText: string;
    compareInhouse: string;
    compareDelegis: string;
    compareRows: { label: string; inhouse: string; delegis: string }[];
    compareNote: string;
    casesKicker: string;
    casesTitle: string;
    cases: { who: string; problem: string; solution: string; result: string }[];
    casesNote: string;
    firmsTeaserTitle: string;
    firmsTeaserText: string;
    firmsTeaserCta: string;
    guidesTitle: string;
  };
  firms: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    h1: string;
    intro: string;
    painsTitle: string;
    pains: { title: string; text: string }[];
    modelTitle: string;
    model: { title: string; text: string }[];
    quoteTitle: string; // pull-quote style statement (not a testimonial)
    faq: QA[];
  };
  method: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    h1: string;
    intro: string;
    timelineTitle: string;
    timeline: { day: string; title: string; text: string }[];
    qualityTitle: string;
    quality: { value: string; label: string; text: string }[];
    dayTitle: string; // "Une journée type de votre dossier"
    day: { time: string; text: string }[];
    faq: QA[];
  };
  careers: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    h1: string;
    intro: string;
    perksTitle: string;
    perks: { title: string; text: string }[];
    rolesTitle: string;
    roles: { title: string; type: string; text: string }[];
    applyTitle: string;
    applyText: string;
    applyCta: string;
  };
  guides: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    read: string;
    minutes: string;
    updated: string;
    tocTitle: string;
    articles: Article[];
  };
};
