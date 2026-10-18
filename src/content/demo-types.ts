/** Localized content for the seeded demo account (fictional company and people). */
export type DemoText = {
  months: string[]; // 12 month names
  monthly: string; // "Comptabilité {m}"
  vat: string; // "Préparation TVA T{q} {y}"
  peppolBatch: string;
  leasing: string;
  payroll: string;
  /** Conversation, oldest first. {m} = previous month name. */
  messages: { author: 'team' | 'client'; who: 'manager' | 'specialist' | 'client'; body: string; daysAgo: number }[];
  requests: { title: string; detail: string; open: boolean; daysAgo: number; dueInDays: number }[];
  deliverables: { report: string; vat: string; ledger: string; peppol: string }; // {m} {q} {y}
  /** Reply the team sends automatically after a client message in the demo. */
  autoReply: string;
};
