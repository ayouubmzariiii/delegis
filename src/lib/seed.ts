import bcrypt from 'bcryptjs';
import { addMessage, createAccess, requestAccess, createClient, createDeliverable, createDossier, createInvoice, createRequest, createUser, deleteUserByEmail, findUserByEmail } from './db';
import { q } from './sql';
import { putFile } from './storage';
import { coda, csv, invoicePdf, reportPdf, ublInvoice } from './docgen';
import { DEMO_CLIENTS, DEMO_EMAIL, DEMO_USER, TEAM, buildDemoWorkspace } from './demo';
import type { StoredFile } from './types';
import fr from '@/content/demo-fr';

/** Delegis staff accounts used by the back-office (fictional people). */
export const STAFF = [
  { email: 'thomas.lambert@delegis.test', name: TEAM.manager.name, title: 'Responsable de compte', city: 'Bruxelles', phone: '+32 2 588 14 20' },
  { email: 'yasmine.elidrissi@delegis.test', name: TEAM.specialist.name, title: 'Comptable senior · Encodage & TVA', city: 'Casablanca', phone: '+212 522 48 71 30' },
] as const;

const SUPPLIERS = ['Brico Matériaux SA', 'Total Energies Belgium', 'Würth Belgium', 'Proximus SA', 'Engie Electrabel', 'Bol.com BV', 'Makro Cash & Carry', 'Securex ASBL'];

/** Deterministic PRNG so the seeded documents are stable. */
function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

/** Generates the real content of a dossier file from its name. */
function fileContent(name: string, client: (typeof DEMO_CLIENTS)[number], date: Date, rand: () => number): { body: Buffer; type: string } {
  const amount = Math.round((80 + rand() * 2400) * 100) / 100;
  const day = date.toISOString().slice(0, 10);
  const supplier = SUPPLIERS[Math.floor(rand() * SUPPLIERS.length)];
  const vat = () => `BE 0${Math.floor(400 + rand() * 500)}.${Math.floor(100 + rand() * 899)}.${Math.floor(100 + rand() * 899)}`;
  const me = { name: client.name, vat: client.vatNumber };
  if (name.endsWith('.cod'))
    return {
      type: 'text/plain',
      body: coda({ date, account: 'BE68 5390 0754 7034', holder: client.name, opening: 12_000 + rand() * 8000, movements: Array.from({ length: 6 }, () => ({ amount: Math.round((rand() - 0.6) * 300000) / 100, label: SUPPLIERS[Math.floor(rand() * SUPPLIERS.length)].toUpperCase() })) }),
    };
  if (name.endsWith('.xml')) return { type: 'application/xml', body: ublInvoice({ id: name.replace('.xml', ''), date: day, seller: { name: supplier, vat: vat() }, buyer: me, net: amount }) };
  if (name.endsWith('.csv')) return { type: 'text/csv', body: csv([['Date', 'Libellé', 'Montant'], ...Array.from({ length: 8 }, (_, i) => [day, `Ligne ${i + 1}`, (rand() * 500).toFixed(2).replace('.', ',')])]) };
  if (name.startsWith('Vente_'))
    return { type: 'application/pdf', body: invoicePdf({ title: 'Facture de vente', number: name.replace('.pdf', ''), date: day, seller: me, buyer: { name: `Client ${Math.floor(rand() * 900 + 100)} SRL`, vat: vat() }, lines: [{ label: 'Prestations du mois', amount }] }) };
  if (name.startsWith('Achat_'))
    return { type: 'application/pdf', body: invoicePdf({ title: "Facture d'achat", number: name.replace('.pdf', ''), date: day, seller: { name: supplier, vat: vat() }, buyer: me, lines: [{ label: 'Fournitures et services', amount }] }) };
  return { type: 'application/pdf', body: reportPdf(name.replace(/[_.]/g, ' '), client.name, [['Document', 'Date'], [name, day]]) };
}

async function storeFiles(userId: string, folder: string, files: StoredFile[], client: (typeof DEMO_CLIENTS)[number], date: Date, rand: () => number) {
  const out: StoredFile[] = [];
  for (const f of files) {
    const { body, type } = fileContent(f.name, client, date, rand);
    out.push({ name: f.name, size: body.length, stored: await putFile(`${userId}/${folder}/${f.name}`, body, type) });
  }
  return out;
}

/**
 * (Re)creates the demo: two staff users, one fiduciary client account with three client companies,
 * and ~12 months of dossiers, messages, requests, deliverables and invoices — every file a real,
 * generated document stored in the configured storage.
 */
export async function seedDemo(opts: { password?: string; log?: (s: string) => void } = {}) {
  const log = opts.log ?? (() => {});
  const password = opts.password ?? process.env.DEMO_PASSWORD ?? 'demo-delegis-2026';
  const hash = await bcrypt.hash(password, 10);
  const rand = rng(424242);

  for (const s of STAFF) await deleteUserByEmail(s.email);
  await deleteUserByEmail(DEMO_EMAIL);
  // Files of a previous demo stored in Postgres (keys start with the owner's id).
  await q(`DELETE FROM stored_files WHERE key LIKE $1`, [`${DEMO_USER.id}/%`]);

  const staff = [];
  for (const s of STAFF) staff.push(await createUser({ ...s, company: 'Delegis', passwordHash: hash, role: 'staff' }));
  const user = await createUser({ ...DEMO_USER, email: DEMO_EMAIL, passwordHash: hash, managerId: staff[0].id, createdAt: new Date(Date.now() - 400 * 864e5).toISOString() });
  log(`users: ${DEMO_EMAIL} + ${STAFF.length} staff`);

  const ws = buildDemoWorkspace(fr);
  const clientById = new Map(DEMO_CLIENTS.map((c) => [`demo-client-${c.key}`, c]));

  for (const c of ws.clients) await createClient({ ...c, userId: user.id });
  log(`clients: ${ws.clients.length}`);

  let fileCount = 0;
  for (const d of ws.dossiers) {
    const files = await storeFiles(user.id, d.id, d.files, clientById.get(d.clientId)!, new Date(d.createdAt), rand);
    fileCount += files.length;
    await createDossier({ ...d, userId: user.id, files });
  }
  log(`dossiers: ${ws.dossiers.length} (${fileCount} files stored)`);

  for (const m of ws.messages) await addMessage({ ...m, userId: user.id });
  for (const r of ws.requests) {
    const answer = r.answer && { ...r.answer, files: await storeFiles(user.id, `req-${r.id}`, r.answer.files, clientById.get(r.clientId)!, new Date(r.answer.at), rand) };
    await createRequest({ ...r, userId: user.id, answer });
  }
  log(`messages: ${ws.messages.length}, requests: ${ws.requests.length}`);

  for (const d of ws.deliverables) {
    const client = clientById.get(d.clientId)!;
    const inPeriod = ws.dossiers.filter((x) => x.clientId === d.clientId && x.period === d.period);
    const body =
      d.kind === 'report'
        ? reportPdf(d.title, client.name, [['Dossier', 'Pièces', 'Statut'], ...inPeriod.map((x) => [x.name, String(x.files.length), x.status])])
        : d.kind === 'peppol'
          ? csv([['Fichier', 'Taille'], ...inPeriod.flatMap((x) => x.files.map((f) => [f.name, f.size]))])
          : d.kind === 'vat'
            ? csv([['Grille', 'Libellé', 'Montant (EUR)'], ['03', 'Opérations à 21 %', '48 920,00'], ['54', 'TVA due', '10 273,20'], ['59', 'TVA déductible', '6 412,85'], ['71', 'Solde dû', '3 860,35']])
            : csv([['Compte', 'Libellé', 'Débit', 'Crédit'], ['604000', 'Achats de marchandises', '1 284,50', ''], ['411000', 'TVA à récupérer', '269,75', ''], ['440000', 'Fournisseurs', '', '1 554,25']]);
    const stored = await putFile(`${user.id}/deliverables/${d.fileName}`, body, d.fileName.endsWith('.pdf') ? 'application/pdf' : 'text/csv');
    await createDeliverable({ ...d, userId: user.id, stored, size: body.length });
  }
  log(`deliverables: ${ws.deliverables.length}`);

  for (const i of ws.invoices) {
    const client = clientById.get(i.clientId)!;
    const body = invoicePdf({ title: 'Facture Delegis', number: i.number, date: i.issuedAt.slice(0, 10), seller: { name: 'Delegis', vat: 'BE 0000.000.000' }, buyer: { name: client.name, vat: client.vatNumber }, lines: [{ label: `Dossier mensuel ${i.period}`, amount: i.amount }] });
    const stored = await putFile(`${user.id}/invoices/${i.number}.pdf`, body, 'application/pdf');
    await createInvoice({ ...i, userId: user.id, stored });
  }
  log(`invoices: ${ws.invoices.length}`);

  // Shared access: some provided by the firm, some still requested by the team.
  const ago = (d: number) => new Date(Date.now() - d * 864e5).toISOString();
  await createAccess(user.id, 'demo-client-brico', { label: 'Exact Online', kind: 'software', url: 'https://start.exactonline.be', login: 'delegis@cabinet-dubois.be', secret: 'Demo-Exact-2026!', notes: 'Utilisateur dédié Delegis, droits comptabilité uniquement. 2FA par e-mail vers comptabilite@cabinet-dubois.be.' }, DEMO_USER.name, { createdAt: ago(320) });
  await createAccess(user.id, 'demo-client-brico', { label: 'Isabel 6 · CODA', kind: 'bank', url: 'https://www.isabel.eu', login: 'BRICOPRO-RO', secret: 'Demo-Isabel-2026!', notes: 'Accès en lecture seule, export CODA quotidien.' }, DEMO_USER.name, { createdAt: ago(300) });
  await createAccess(user.id, 'demo-client-lemaire', { label: 'Winbooks on Web', kind: 'software', url: 'https://www.winbooksonweb.be', login: 'delegis.lemaire', secret: 'Demo-Winbooks-2026!', notes: '' }, DEMO_USER.name, { createdAt: ago(210) });
  await requestAccess('demo-client-brico', { label: 'MyMinfin · mandat TVA', kind: 'tax', note: 'Pour déposer la déclaration TVA du T3 : ajoutez Delegis comme mandataire dans MyMinfin, ou partagez un accès au compte du dossier.' }, STAFF[0].name, { createdAt: ago(2) });
  await requestAccess('demo-client-nord', { label: 'Yuki', kind: 'software', note: 'Invitez yasmine.elidrissi@delegis.test comme utilisateur « Comptable » sur l’administration Atelier Nord BV.' }, STAFF[1].name, { createdAt: ago(1) });
  log('accesses: 5');

  // History reads as already seen, except the last few days.
  await q(`UPDATE notifications SET read = true WHERE user_id = $1 AND created_at < now() - interval '3 days'`, [user.id]);
  return user;
}

/** The demo is complete once its last step (invoices) is in; a seed interrupted earlier is redone. */
async function demoComplete() {
  const demo = await findUserByEmail(DEMO_EMAIL);
  if (!demo?.managerId) return false;
  const [r] = await q<{ n: string }>(`SELECT count(*) AS n FROM invoices WHERE user_id = $1`, [demo.id]);
  return Number(r?.n) > 0;
}

/**
 * Seeds the demo on first use (demo button or demo password login), e.g. on a fresh Vercel deploy.
 * Also redoes a seed that was interrupted or predates the current demo model.
 * A row lock keeps concurrent serverless invocations from seeding at the same time.
 */
export async function ensureDemoSeeded() {
  if (await demoComplete()) return;
  const got = await q(
    `INSERT INTO app_locks (name) VALUES ('demo-seed') ON CONFLICT (name) DO UPDATE SET taken_at = now()
     WHERE app_locks.taken_at < now() - interval '5 minutes' RETURNING name`,
  );
  if (!got.length) {
    // Another request is seeding: wait for it (up to ~90 s).
    for (let i = 0; i < 45 && !(await demoComplete()); i++) await new Promise((r) => setTimeout(r, 2000));
    return;
  }
  try {
    if (!(await demoComplete())) await seedDemo();
  } finally {
    await q(`DELETE FROM app_locks WHERE name = 'demo-seed'`);
  }
}
