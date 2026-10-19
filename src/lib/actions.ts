'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { LANG_COOKIE, isLocale, type Locale } from './i18n';
import {
  addMessage,
  createClient,
  createAccess,
  provideAccess,
  revokeAccess,
  requestAccess,
  revealAccess,
  assignManager,
  updateFirm,
  updateStaffProfile,
  findUser,
  answerRequest,
  createDossier,
  createLead,
  createUser,
  findUserByEmail,
  markNotificationsRead,
  newId,
  updateUser,
  advanceDossier,
  createRequest,
  createDeliverable,
  staffDossier,
  clientWorkspace,
} from './db';
import type { AccessKind, StoredFile, User } from './types';
import { DEMO_EMAIL } from './demo';
import { STAFF, ensureDemoSeeded } from './seed';
import { putFile } from './storage';
import { createSession, currentUser, destroySession } from './auth';
import { CLIENT_COOKIE, ownedClientId } from './clientScope';

export type FormState = { ok?: boolean; error?: string } | undefined;

const str = (f: FormData, k: string, max = 2000) => String(f.get(k) ?? '').trim().slice(0, max);
const loc = (f: FormData): Locale => {
  const l = str(f, 'locale', 10);
  return isLocale(l) ? l : 'fr-be';
};
/** The portal and the admin are app screens: no language prefix in their URLs (see middleware). */
const portalPath = (p = '') => `/portal${p}`;
const refreshPortal = () => revalidatePath('/[locale]/portal', 'layout');
const refreshAdmin = () => {
  revalidatePath('/[locale]/admin', 'layout');
  refreshPortal();
};
/** Remembers the language the user signed in with, so /portal renders in it. */
const rememberLang = async (l: Locale) => (await cookies()).set(LANG_COOKIE, l, { sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 365 });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Vercel functions accept request bodies up to 4.5 MB; keep each file under that. */
const MAX_FILE = 4 * 1024 * 1024;
const landing = (u: User) => (u.role === 'staff' ? '/admin' : portalPath('/welcome'));

/* ---------- public ---------- */

export async function submitLead(_: FormState, f: FormData): Promise<FormState> {
  if (str(f, 'website')) return { ok: true }; // honeypot
  const email = str(f, 'email', 200);
  if (!EMAIL_RE.test(email) || !str(f, 'name') || f.get('consent') !== 'on') return { error: 'invalid' };
  const data: Record<string, string> = {};
  for (const k of ['name', 'company', 'email', 'phone', 'service', 'message', 'estimate']) data[k] = str(f, k);
  await createLead(loc(f), data);
  // TODO: forward to CRM / e-mail (e.g. Resend, HubSpot) once credentials exist.
  return { ok: true };
}

/* ---------- auth ---------- */

export async function register(_: FormState, f: FormData): Promise<FormState> {
  const email = str(f, 'email', 200).toLowerCase();
  const password = String(f.get('password') ?? '');
  if (!EMAIL_RE.test(email) || password.length < 8 || !str(f, 'name')) return { error: 'invalid' };
  if (await findUserByEmail(email)) return { error: 'exists' };
  const user = await createUser({ email, name: str(f, 'name', 120), company: str(f, 'company', 160), passwordHash: await bcrypt.hash(password, 10) });
  await createSession(user.id);
  await rememberLang(loc(f));
  redirect(portalPath('/welcome'));
}

export async function login(_: FormState, f: FormData): Promise<FormState> {
  const email = str(f, 'email', 200).toLowerCase();
  // Demo accounts are created on first use, whether through a demo button or a password login.
  if ((await demoEnabled()) && (email === DEMO_EMAIL || STAFF.some((s) => s.email === email))) await ensureDemoSeeded();
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(String(f.get('password') ?? ''), user.passwordHash))) return { error: 'invalid' };
  await createSession(user.id);
  await rememberLang(loc(f));
  redirect(landing(user));
}

/** Demo is on unless DEMO_ENABLED=false (turn it off before launch). */
export async function demoEnabled() {
  return process.env.DEMO_ENABLED !== 'false';
}

/**
 * Signs in to a seeded demo user: the client account (default) or a Delegis staff member (as=staff).
 * The demo data lives in the database like any other account; it is seeded once (npm run db:seed,
 * or automatically on the first demo login of a fresh deployment).
 */
export async function loginDemo(_: FormState, f: FormData): Promise<FormState> {
  const l = loc(f);
  if (!(await demoEnabled())) redirect(`/${l}/login`);
  await ensureDemoSeeded();
  const user = await findUserByEmail(f.get('as') === 'staff' ? STAFF[1].email : DEMO_EMAIL);
  if (!user) return { error: 'invalid' };
  await createSession(user.id);
  (await cookies()).delete(CLIENT_COOKIE);
  await rememberLang(l);
  redirect(landing(user));
}

export async function logout(f: FormData) {
  await destroySession();
  redirect(`/${loc(f)}/login`);
}

/* ---------- portal ---------- */

async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');
  return user;
}

/** Stores uploaded files (Vercel Blob in production, disk locally) and returns their metadata. */
async function saveFiles(ownerId: string, folder: string, f: FormData, field = 'files'): Promise<StoredFile[] | null> {
  const files = f.getAll(field).filter((x): x is File => x instanceof File && x.size > 0);
  if (files.some((x) => x.size > MAX_FILE)) return null;
  const out: StoredFile[] = [];
  for (const file of files.slice(0, 20)) {
    const stored = await putFile(`${ownerId}/${folder}/${file.name}`, Buffer.from(await file.arrayBuffer()), file.type || 'application/octet-stream');
    out.push({ name: file.name, size: file.size, stored });
  }
  return out;
}

export async function uploadDossier(_: FormState, f: FormData): Promise<FormState> {
  const user = await requireUser();
  const clientId = await ownedClientId(user, str(f, 'clientId', 80));
  if (!clientId) return { error: 'client' };
  const id = newId();
  const files = await saveFiles(user.id, id, f);
  if (!files || !files.length) return { error: 'invalid' };
  await createDossier({
    id,
    userId: user.id,
    clientId,
    name: str(f, 'name', 120) || files[0].name,
    period: str(f, 'period', 20),
    type: f.get('type') === 'document' ? 'document' : 'dossier',
    files,
  });
  refreshPortal();
  return { ok: true };
}

export async function sendMessage(_: FormState, f: FormData): Promise<FormState> {
  const user = await requireUser();
  const clientId = await ownedClientId(user, str(f, 'clientId', 80));
  if (!clientId) return { error: 'client' };
  const body = str(f, 'body', 4000);
  if (!body) return { error: 'invalid' };
  const files = (await saveFiles(user.id, `msg-${newId()}`, f)) ?? [];
  const dossierId = str(f, 'dossierId', 80) || undefined;
  await addMessage({ userId: user.id, clientId, author: 'client', authorName: user.name, body, dossierId, files });
  refreshPortal();
  return { ok: true };
}

export async function respondToRequest(_: FormState, f: FormData): Promise<FormState> {
  const user = await requireUser();
  const id = str(f, 'requestId', 80);
  const files = await saveFiles(user.id, `req-${id}`, f);
  if (!files) return { error: 'invalid' };
  const note = str(f, 'note', 2000);
  if (!files.length && !note) return { error: 'invalid' };
  await answerRequest(user.id, id, note, files);
  refreshPortal();
  return { ok: true };
}

export async function markAllRead() {
  const user = await requireUser();
  await markNotificationsRead(user.id);
  refreshPortal();
}

export async function updateProfile(_: FormState, f: FormData): Promise<FormState> {
  const user = await requireUser();
  await updateUser(user.id, {
    name: str(f, 'name', 120) || user.name,
    company: str(f, 'company', 160),
    phone: str(f, 'phone', 40),
    vatNumber: str(f, 'vatNumber', 40),
    software: str(f, 'software', 60),
  });
  refreshPortal();
  return { ok: true };
}

/** Switches the client company the portal is scoped to ('all' = portfolio view). */
export async function selectClient(f: FormData) {
  const user = await requireUser();
  const id = str(f, 'clientId', 80);
  const jar = await cookies();
  const owned = id === 'all' ? 'all' : await ownedClientId(user, id);
  if (owned && (id === 'all' || owned === id)) jar.set(CLIENT_COOKIE, owned, { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 90 });
  const back = str(f, 'back', 300);
  redirect(back.startsWith('/portal') ? back : portalPath());
}

export async function addClient(_: FormState, f: FormData): Promise<FormState> {
  const user = await requireUser();
  const name = str(f, 'name', 160);
  if (!name) return { error: 'invalid' };
  const c = await createClient({ userId: user.id, name, vatNumber: str(f, 'vatNumber', 40), software: str(f, 'software', 60), sector: str(f, 'sector', 60) });
  (await cookies()).set(CLIENT_COOKIE, c.id, { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 90 });
  // Land on the new client's overview, ready to upload its first documents.
  redirect(portalPath());
}

/* ---------- back-office (Delegis staff) ---------- */

async function requireStaff() {
  const user = await requireUser();
  if (user.role !== 'staff') throw new Error('Forbidden');
  return user;
}
const refreshStaff = () => refreshAdmin();

/** Moves a dossier to its next processing step (encoding → review → delivered). */
export async function staffAdvance(f: FormData) {
  const staff = await requireStaff();
  await advanceDossier(str(f, 'dossierId', 80), staff.name);
  refreshStaff();
}

/** Replies to a client conversation as the signed-in staff member. */
export async function staffReply(_: FormState, f: FormData): Promise<FormState> {
  const staff = await requireStaff();
  const target = await clientWorkspace(str(f, 'clientId', 80));
  const body = str(f, 'body', 4000);
  if (!target || !body) return { error: 'invalid' };
  const files = (await saveFiles(target.client.userId, `msg-${newId()}`, f)) ?? [];
  await addMessage({ userId: target.client.userId, clientId: target.client.id, author: 'team', authorName: staff.name, body, dossierId: str(f, 'dossierId', 80) || undefined, files });
  refreshStaff();
  return { ok: true };
}

/** Asks the client for a missing document or clarification on a dossier. */
export async function staffRequest(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const d = await staffDossier(str(f, 'dossierId', 80));
  const title = str(f, 'title', 160);
  if (!d || !title) return { error: 'invalid' };
  const days = Math.min(30, Math.max(1, Number(str(f, 'days', 3)) || 5));
  await createRequest({ userId: d.userId, clientId: d.clientId, dossierId: d.id, title, detail: str(f, 'detail', 1000), dueAt: new Date(Date.now() + days * 864e5).toISOString() });
  refreshStaff();
  return { ok: true };
}

/** Delivers a document (report, VAT grid, ledger, Peppol journal) to the client. */
export async function staffDeliver(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const d = await staffDossier(str(f, 'dossierId', 80));
  const file = f.get('file');
  const kind = str(f, 'kind', 10) as 'report' | 'vat' | 'ledger' | 'peppol';
  if (!d || !(file instanceof File) || !file.size || file.size > MAX_FILE || !['report', 'vat', 'ledger', 'peppol'].includes(kind)) return { error: 'invalid' };
  const stored = await putFile(`${d.userId}/deliverables/${file.name}`, Buffer.from(await file.arrayBuffer()), file.type || 'application/octet-stream');
  await createDeliverable({ userId: d.userId, clientId: d.clientId, title: str(f, 'title', 160) || file.name, kind, period: d.period, fileName: file.name, stored, size: file.size });
  refreshStaff();
  return { ok: true };
}

/* ---------- accesses (firm side) ---------- */

const KINDS: AccessKind[] = ['software', 'bank', 'tax', 'other'];
const kindOf = (f: FormData): AccessKind => {
  const k = str(f, 'kind', 10) as AccessKind;
  return KINDS.includes(k) ? k : 'other';
};
const urlOf = (f: FormData) => {
  const u = str(f, 'url', 300);
  return !u || /^https?:\/\//i.test(u) ? u : `https://${u}`;
};

/** Creates an access for a client, or fills in / updates an existing one (id given). */
export async function saveAccess(_: FormState, f: FormData): Promise<FormState> {
  const user = await requireUser();
  const id = str(f, 'accessId', 80);
  const input = { url: urlOf(f), login: str(f, 'login', 200), secret: String(f.get('secret') ?? '').slice(0, 500), notes: str(f, 'notes', 1000) };
  if (id) {
    if (!(await provideAccess(user.id, id, input, user.name))) return { error: 'invalid' };
  } else {
    const clientId = await ownedClientId(user, str(f, 'clientId', 80));
    const label = str(f, 'label', 120);
    if (!clientId || !label) return { error: 'invalid' };
    await createAccess(user.id, clientId, { ...input, label, kind: kindOf(f) }, user.name);
  }
  refreshPortal();
  revalidatePath('/[locale]/admin', 'layout');
  return { ok: true };
}

export async function withdrawAccess(f: FormData) {
  const user = await requireUser();
  await revokeAccess(user.id, str(f, 'accessId', 80), user.name);
  refreshPortal();
}

/* ---------- admin: accesses, firms, team ---------- */


/** Asks a firm for an access to one of its clients' tools. */
export async function adminRequestAccess(_: FormState, f: FormData): Promise<FormState> {
  const staff = await requireStaff();
  const label = str(f, 'label', 120);
  if (!label || !(await requestAccess(str(f, 'clientId', 80), { label, kind: kindOf(f), note: str(f, 'note', 1000) }, staff.name))) return { error: 'invalid' };
  refreshAdmin();
  return { ok: true };
}

/** Decrypts a shared password for the signed-in team member. */
export async function adminRevealAccess(_: { secret?: string | null } | undefined, f: FormData) {
  await requireStaff();
  return { secret: await revealAccess(str(f, 'accessId', 80)) };
}

export async function adminAssignManager(f: FormData) {
  await requireStaff();
  const managerId = str(f, 'managerId', 80);
  const m = managerId ? await findUser(managerId) : undefined;
  await assignManager(str(f, 'firmId', 80), m?.role === 'staff' ? m.id : null);
  refreshAdmin();
}

/** Opens an account for a new accounting firm (the firm then signs in with this e-mail and password). */
export async function adminCreateFirm(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const email = str(f, 'email', 200).toLowerCase();
  const password = String(f.get('password') ?? '');
  const company = str(f, 'company', 160);
  if (!EMAIL_RE.test(email) || password.length < 8 || !company || !str(f, 'name')) return { error: 'invalid' };
  if (await findUserByEmail(email)) return { error: 'exists' };
  const managerId = str(f, 'managerId', 80);
  const firm = await createUser({
    email,
    name: str(f, 'name', 120),
    company,
    phone: str(f, 'phone', 40),
    vatNumber: str(f, 'vatNumber', 40),
    managerId: managerId && (await findUser(managerId))?.role === 'staff' ? managerId : undefined,
    passwordHash: await bcrypt.hash(password, 10),
  });
  redirect(`/admin/cabinets/${firm.id}`);
}

export async function adminUpdateFirm(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const company = str(f, 'company', 160);
  const name = str(f, 'name', 120);
  if (!company || !name) return { error: 'invalid' };
  await updateFirm(str(f, 'firmId', 80), { company, name, phone: str(f, 'phone', 40), vatNumber: str(f, 'vatNumber', 40) });
  refreshAdmin();
  return { ok: true };
}

/** Adds a client company to a firm on its behalf. */
export async function adminAddClient(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const firm = await findUser(str(f, 'firmId', 80));
  const name = str(f, 'name', 160);
  if (!firm || firm.role !== 'client' || !name) return { error: 'invalid' };
  await createClient({ userId: firm.id, name, vatNumber: str(f, 'vatNumber', 40), software: str(f, 'software', 60), sector: str(f, 'sector', 60) });
  refreshAdmin();
  return { ok: true };
}

/** Adds a Delegis team member (back-office access). */
export async function adminCreateStaff(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const email = str(f, 'email', 200).toLowerCase();
  const password = String(f.get('password') ?? '');
  if (!EMAIL_RE.test(email) || password.length < 8 || !str(f, 'name')) return { error: 'invalid' };
  if (await findUserByEmail(email)) return { error: 'exists' };
  await createUser({ email, name: str(f, 'name', 120), company: 'Delegis', role: 'staff', title: str(f, 'title', 80), city: str(f, 'city', 60), phone: str(f, 'phone', 40), passwordHash: await bcrypt.hash(password, 10) });
  refreshAdmin();
  return { ok: true };
}

export async function adminUpdateStaff(_: FormState, f: FormData): Promise<FormState> {
  await requireStaff();
  const name = str(f, 'name', 120);
  if (!name) return { error: 'invalid' };
  await updateStaffProfile(str(f, 'staffId', 80), { name, title: str(f, 'title', 80), city: str(f, 'city', 60), phone: str(f, 'phone', 40) });
  refreshAdmin();
  return { ok: true };
}
