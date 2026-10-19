/** Strings for the authenticated client portal (dashboard app). Placeholders in {braces}. */
export type AppText = {
  stats: { title: string; volume: string; volumeSub: string; mix: string; turnaround: string; turnaroundSub: string; answered: string; answeredSub: string; clients: string; hours: string; days: string };
  clients: {
    label: string;
    all: string;
    switch: string;
    portfolio: string;
    portfolioIntro: string;
    add: string;
    name: string;
    vat: string;
    software: string;
    sector: string;
    create: string;
    created: string;
    manage: string;
    colClient: string;
    colOpen: string;
    colProcessing: string;
    colLast: string;
    open: string;
    pickFirst: string;
    count: string; // {n}
    navLabel: string;
    newClient: string;
    newClientText: string;
    cancel: string;
  };
  nav: {
    overview: string;
    dossiers: string;
    requests: string;
    messages: string;
    documents: string;
    invoices: string;
    settings: string;
    accesses: string;
    logout: string;
    backToSite: string;
    notifications: string;
    upload: string;
  };
  login: { connecting: string };
  welcome: { title: string; subtitle: string; steps: string[]; skip: string }; // title has {name}
  overview: {
    morning: string;
    afternoon: string;
    evening: string;
    summary: string;
    kpiRequests: string;
    kpiProcessing: string;
    kpiFiles: string;
    kpiDeadline: string;
    actionTitle: string;
    actionEmpty: string;
    deadlinesTitle: string;
    deadlineVat: string; // {q} {y}
    deadlineListing: string; // {y}
    deadlineClosing: string; // {y}
    inDays: string; // {n}
    today: string;
    activityTitle: string;
    teamTitle: string;
    roleManager: string;
    roleSpecialist: string;
    write: string;
    seeAll: string;
    latestDocs: string;
  };
  dossiers: {
    title: string;
    intro: string;
    search: string;
    all: string;
    colName: string;
    colPeriod: string;
    colFiles: string;
    colDate: string;
    colStatus: string;
    empty: string;
    back: string;
    timelineTitle: string;
    steps: Record<'received' | 'encoding' | 'review' | 'delivered', string>;
    filesTitle: string;
    assignee: string;
    discuss: string;
    pending: string;
  };
  requests: {
    title: string;
    intro: string;
    open: string;
    answered: string;
    due: string; // {d}
    note: string;
    attach: string;
    send: string;
    answeredOn: string; // {d}
    empty: string;
    sent: string;
  };
  messages: {
    title: string;
    intro: string;
    placeholder: string;
    send: string;
    you: string;
    empty: string;
    status: string;
    about: string; // "À propos de : {name}"
  };
  documents: { title: string; intro: string; kinds: Record<'report' | 'vat' | 'ledger' | 'peppol', string>; download: string; empty: string };
  invoices: { title: string; intro: string; number: string; period: string; amount: string; status: string; paid: string; due: string; dueOn: string; totalDue: string; download: string };
  settings: {
    title: string;
    intro: string;
    profile: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    vat: string;
    software: string;
    save: string;
    saved: string;
    security: string;
    securityText: string;
    demoNote: string;
  };
  /** The signed-in accounting firm (account owner of every dossier). */
  firm: { label: string; clientsOf: string; firstTitle: string; firstText: string; firstCta: string };
  /** The Delegis account manager assigned to the firm. */
  team: { title: string; unassigned: string; unassignedText: string; email: string; call: string };
  accesses: {
    title: string;
    intro: string; // {client}
    security: string;
    tip: string;
    requestedTitle: string;
    requestedBy: string; // {name} {d}
    provide: string;
    sharedTitle: string;
    empty: string;
    add: string;
    label: string;
    labelPh: string;
    kind: string;
    kinds: Record<'software' | 'bank' | 'tax' | 'other', string>;
    url: string;
    login: string;
    secret: string;
    secretKeep: string;
    notes: string;
    notesPh: string;
    save: string;
    saved: string;
    edit: string;
    revoke: string;
    revokeConfirm: string;
    status: Record<'requested' | 'provided' | 'revoked', string>;
    encrypted: string;
    noSecret: string;
    updated: string; // {d}
    revokedTitle: string;
  };
  notifications: { title: string; markRead: string; empty: string; kinds: Record<'message' | 'request' | 'status' | 'document' | 'invoice', string> };
};
