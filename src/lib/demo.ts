import type { DemoText } from '@/content/demo-types';
import type { Client, Deliverable, Dossier, Invoice, Message, Notification, RequestItem, StoredFile, TimelineStep, Workspace } from './types';

/**
 * Demo account: a fictional Belgian SME and fictional Delegis staff.
 * Everything is generated relative to `now` so the portal always looks current,
 * and deterministically so reseeding produces the same workspace.
 */
export const DEMO_EMAIL = 'demo@delegis.test';
export const DEMO_USER = { id: 'demo-user', name: 'Camille Dubois', company: 'Cabinet Dubois & Associés', phone: '+32 470 00 00 00', vatNumber: 'BE 0700.000.000', software: 'Exact Online' } as const;

/** The fiduciary's client companies (fictional). The first one has the richest history. */
export const DEMO_CLIENTS = [
  { key: 'brico', name: 'Brico Pro SRL', vatNumber: 'BE 0712.345.601', software: 'Exact Online', sector: 'Construction', seed: 20260917, months: 12, rich: true },
  { key: 'lemaire', name: 'Boulangerie Lemaire SRL', vatNumber: 'BE 0723.456.702', software: 'Winbooks', sector: 'Horeca', seed: 4401, months: 9, rich: false },
  { key: 'nord', name: 'Atelier Nord BV', vatNumber: 'BE 0734.567.803', software: 'Yuki', sector: 'Design', seed: 7713, months: 6, rich: false },
] as const;
type DemoClient = (typeof DEMO_CLIENTS)[number];
export const TEAM = {
  manager: { name: 'Thomas Lambert', initials: 'TL' },
  specialist: { name: 'Yasmine El Idrissi', initials: 'YE' },
} as const;

const DAY = 864e5;
const pad = (n: number) => String(n).padStart(2, '0');
const ym = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

/** Deterministic pseudo-random generator. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function files(prefix: string, count: number, ext: string, rand: () => number, period: string): StoredFile[] {
  return Array.from({ length: count }, (_, i) => {
    const name = `${prefix}_${period.replace('-', '')}_${pad(i + 1)}.${ext}`;
    return { name, size: Math.round(60_000 + rand() * 900_000), stored: name };
  });
}

/** Timeline for a dossier given its status and creation time. */
function timeline(status: Dossier['status'], created: Date): { step: TimelineStep; at: string }[] {
  const steps: TimelineStep[] = status === 'received' ? ['received'] : status === 'processing' ? ['received', 'encoding'] : ['received', 'encoding', 'review', 'delivered'];
  return steps.map((step, i) => ({ step, at: new Date(created.getTime() + i * 0.9 * DAY + i * 3 * 3600e3).toISOString() }));
}

function buildOne(text: DemoText, now: Date, c: DemoClient): Omit<Workspace, 'clients'> {
  const rand = rng(c.seed);
  const uid = DEMO_USER.id;
  const cid = `demo-client-${c.key}`;
  const dossiers: Dossier[] = [];
  const clampPast = (d: Date) => new Date(Math.min(d.getTime(), now.getTime() - 3600e3));

  // 12 monthly accounting dossiers: current month received, previous in progress, older done.
  for (let back = 0; back < c.months; back++) {
    const month = new Date(now.getFullYear(), now.getMonth() - back, 1);
    const period = ym(month);
    const status: Dossier['status'] = back === 0 ? 'received' : back === 1 ? 'processing' : 'done';
    const created = clampPast(back === 0 ? new Date(now.getTime() - 2 * DAY) : new Date(month.getFullYear(), month.getMonth() + 1, 3, 9, Math.floor(rand() * 60)));
    dossiers.push({
      id: `demo-month-${period}`,
      userId: uid, clientId: cid,
      name: fill(text.monthly, { m: `${text.months[month.getMonth()]} ${month.getFullYear()}` }),
      period,
      type: 'dossier',
      files: [
        ...files('Achat_FA', 6 + Math.floor(rand() * 6), 'pdf', rand, period),
        ...files('Vente_FV', 3 + Math.floor(rand() * 4), 'pdf', rand, period),
        { name: `CODA_BE68539007547034_${period.replace('-', '')}.cod`, size: 18_000 + Math.round(rand() * 9000), stored: 'coda.cod' },
      ],
      status,
      createdAt: created.toISOString(),
      assignee: TEAM.specialist.name,
      timeline: timeline(status, created),
    });
  }

  // Quarterly VAT preparation (last four quarters).
  const currentQ = Math.floor(now.getMonth() / 3) + 1;
  for (let i = 1; i <= 4; i++) {
    let q = currentQ - i;
    let y = now.getFullYear();
    while (q < 1) {
      q += 4;
      y -= 1;
    }
    const status: Dossier['status'] = i === 1 ? 'processing' : 'done';
    const created = clampPast(new Date(y, q * 3, 5, 10));
    dossiers.push({
      id: `demo-vat-${y}-q${q}`,
      userId: uid, clientId: cid,
      name: fill(text.vat, { q, y }),
      period: `${y}-T${q}`,
      type: 'dossier',
      files: [
        { name: `Grille_TVA_T${q}_${y}.csv`, size: 42_000, stored: 'vat.csv' },
        { name: `Listing_intracom_T${q}_${y}.pdf`, size: 88_000, stored: 'ic.pdf' },
      ],
      status,
      createdAt: created.toISOString(),
      assignee: TEAM.manager.name,
      timeline: timeline(status, created),
    });
  }

  const extra = (id: string, name: string, f: StoredFile[], status: Dossier['status'], daysAgo: number, period = ''): Dossier => {
    const created = new Date(now.getTime() - daysAgo * DAY);
    return { id, userId: uid, clientId: cid, name, period, type: 'document', files: f, status, createdAt: created.toISOString(), assignee: TEAM.specialist.name, timeline: timeline(status, created) };
  };
  dossiers.push(
    extra('demo-peppol-batch', text.peppolBatch, files('Peppol_UBL_INV', 9, 'xml', rand, ym(now)), 'processing', 1.1, ym(now)),
    extra('demo-leasing', text.leasing, [{ name: 'Leasing_Renault_Master_2026.pdf', size: 1_240_000, stored: 'leasing.pdf' }], 'done', 40),
    extra('demo-payroll', text.payroll, [{ name: 'Pointages_equipe.csv', size: 64_000, stored: 'pay.csv' }, { name: 'Notes_de_frais.pdf', size: 380_000, stored: 'fees.pdf' }], 'done', 15, ym(new Date(now.getFullYear(), now.getMonth() - 1, 1))),
  );
  dossiers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // Conversation.
  const msgSource = c.rich ? text.messages : text.messages.slice(-2);
  const messages: Message[] = msgSource.map((m, i) => ({
    id: `demo-msg-${i}`,
    userId: uid, clientId: cid,
    author: m.author,
    authorName: m.who === 'client' ? DEMO_USER.name : TEAM[m.who].name,
    body: m.body,
    createdAt: new Date(now.getTime() - m.daysAgo * DAY - (10 - i) * 3600e3).toISOString(),
    dossierId: i === 3 ? dossiers.find((d) => d.status === 'processing' && d.type === 'dossier')?.id : undefined,
  }));

  // Requests for missing documents.
  const prevMonthDossier = dossiers.find((d) => d.id === `demo-month-${ym(new Date(now.getFullYear(), now.getMonth() - 1, 1))}`);
  const reqSource = c.rich ? text.requests : text.requests.slice(c.key === 'lemaire' ? 1 : 2, c.key === 'lemaire' ? 2 : 3);
  const requests: RequestItem[] = reqSource.map((r, i) => {
    const created = new Date(now.getTime() - r.daysAgo * DAY);
    return {
      id: `demo-req-${i}`,
      userId: uid, clientId: cid,
      dossierId: prevMonthDossier?.id,
      title: r.title,
      detail: r.detail,
      status: r.open ? 'open' : 'answered',
      createdAt: created.toISOString(),
      dueAt: new Date(now.getTime() + r.dueInDays * DAY).toISOString(),
      answer: r.open ? undefined : { at: new Date(created.getTime() + 1.5 * DAY).toISOString(), note: '', files: [{ name: 'NC-0091_Wurth.pdf', size: 154_000, stored: 'nc.pdf' }] },
    };
  });

  // Deliverables: monthly reports for the last 4 closed months, VAT grids, a ledger.
  const deliverables: Deliverable[] = [];
  for (let back = 2; back <= 5; back++) {
    const m = new Date(now.getFullYear(), now.getMonth() - back, 1);
    const label = `${text.months[m.getMonth()]} ${m.getFullYear()}`;
    deliverables.push(
      { id: `demo-rep-${ym(m)}`, userId: uid, clientId: cid, title: fill(text.deliverables.report, { m: label }), kind: 'report', period: ym(m), createdAt: new Date(m.getFullYear(), m.getMonth() + 1, 8, 16).toISOString(), fileName: `Rapport_${ym(m)}.pdf`, stored: '', size: 24_000 },
      { id: `demo-pep-${ym(m)}`, userId: uid, clientId: cid, title: fill(text.deliverables.peppol, { m: label }), kind: 'peppol', period: ym(m), createdAt: new Date(m.getFullYear(), m.getMonth() + 1, 8, 17).toISOString(), fileName: `Peppol_${ym(m)}.csv`, stored: '', size: 11_000 },
    );
  }
  for (const d of dossiers.filter((x) => x.id.startsWith('demo-vat') && x.status === 'done')) {
    const [y, q] = d.period.split('-T');
    deliverables.push({ id: `demo-vatdel-${d.period}`, userId: uid, clientId: cid, title: fill(text.deliverables.vat, { q, y }), kind: 'vat', period: d.period, createdAt: new Date(new Date(d.createdAt).getTime() + 6 * DAY).toISOString(), fileName: `TVA_${d.period}.csv`, stored: '', size: 8_000 });
  }
  deliverables.push({ id: 'demo-ledger', userId: uid, clientId: cid, title: fill(text.deliverables.ledger, { y: now.getFullYear() }), kind: 'ledger', period: String(now.getFullYear()), createdAt: new Date(now.getTime() - 9 * DAY).toISOString(), fileName: `Grand_livre_${now.getFullYear()}.csv`, stored: '', size: 96_000 });
  const deliverablesSorted = deliverables.filter((d) => new Date(d.createdAt) < now).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // Delegis invoices: last 6 months, the latest one still due.
  const invoices: Invoice[] = Array.from({ length: 6 }, (_, i) => {
    const m = new Date(now.getFullYear(), now.getMonth() - 1 - i, 1);
    const issued = new Date(m.getFullYear(), m.getMonth() + 1, 1, 9);
    return {
      id: `demo-inv-${ym(m)}`,
      userId: uid, clientId: cid,
      number: `DLG-${m.getFullYear()}-${pad(m.getMonth() + 1)}${pad(17 + i)}`,
      period: ym(m),
      amount: Math.round((290 + rand() * 120) * 100) / 100,
      status: i === 0 ? 'due' : 'paid',
      issuedAt: clampPast(issued).toISOString(),
      dueAt: new Date(issued.getTime() + 30 * DAY).toISOString(),
    };
  });

  // Notifications derived from recent events.
  const notifications: Notification[] = [
    { id: 'demo-n-1', userId: uid, clientId: cid, kind: 'message', text: messages[messages.length - 1].body.slice(0, 80), href: 'messages', createdAt: messages[messages.length - 1].createdAt, read: false },
    { id: 'demo-n-2', userId: uid, clientId: cid, kind: 'request', text: requests[0].title, href: 'requests', createdAt: requests[0].createdAt, read: false },
    { id: 'demo-n-3', userId: uid, clientId: cid, kind: 'document', text: deliverablesSorted[0].title, href: 'documents', createdAt: deliverablesSorted[0].createdAt, read: true },
    { id: 'demo-n-4', userId: uid, clientId: cid, kind: 'invoice', text: invoices[0].number, href: 'invoices', createdAt: invoices[0].issuedAt, read: true },
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) as Notification[];

  const clientId = `demo-client-${c.key}`;
  const tag = <T extends { id: string }>(list: T[]) => list.map((x) => ({ ...x, id: x.id.replace(/^demo-/, `demo-${c.key}-`), clientId }));
  // Messages may point at dossiers: keep those references in sync with the prefixed ids.
  const fixRef = (id?: string) => (id ? id.replace(/^demo-/, `demo-${c.key}-`) : id);
  return {
    dossiers: tag(dossiers),
    messages: tag(messages).map((m) => ({ ...m, dossierId: fixRef(m.dossierId) })),
    requests: tag(requests).map((r) => ({ ...r, dossierId: fixRef(r.dossierId) })),
    deliverables: tag(deliverablesSorted),
    invoices: tag(invoices).map((i) => ({ ...i, number: i.number.replace('DLG-', `DLG-${c.key.slice(0, 2).toUpperCase()}-`) })),
    notifications: c.rich ? tag(notifications) : tag(notifications.filter((n) => n.kind === 'request')),
  };
}

/** Full demo workspace: one fiduciary account with three client companies. */
export function buildDemoWorkspace(text: DemoText, now = new Date()): Workspace {
  const parts = DEMO_CLIENTS.map((c) => buildOne(text, now, c));
  const flat = <K extends keyof Omit<Workspace, 'clients'>>(k: K) => parts.flatMap((p) => p[k] as never[]) as Workspace[K];
  const byNew = <T extends { createdAt: string }>(l: T[]) => [...l].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const clients: Client[] = DEMO_CLIENTS.map((c, i) => ({
    id: `demo-client-${c.key}`,
    userId: DEMO_USER.id,
    name: c.name,
    vatNumber: c.vatNumber,
    software: c.software,
    sector: c.sector,
    createdAt: new Date(now.getTime() - (400 - i * 90) * DAY).toISOString(),
  }));
  return {
    clients,
    dossiers: byNew(flat('dossiers')),
    messages: [...flat('messages')].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    requests: byNew(flat('requests')),
    deliverables: byNew(flat('deliverables')),
    invoices: [...flat('invoices')].sort((a, b) => b.issuedAt.localeCompare(a.issuedAt)),
    notifications: byNew(flat('notifications')),
  };
}
