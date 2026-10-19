'use client';

import { useActionState, useEffect, useRef } from 'react';
import {
  staffDeliver,
  staffReply,
  staffRequest,
  adminRevealAccess,
  adminRequestAccess,
  adminCreateFirm,
  adminUpdateFirm,
  adminAddClient,
  adminCreateStaff,
  adminUpdateStaff,
  type FormState,
} from '@/lib/actions';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';

const field = 'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm placeholder:text-ink-400 focus:border-go-600 focus:outline-none focus:ring-4 focus:ring-go-100';

function useResetOnSuccess(state: FormState) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);
  return ref;
}

const Feedback = ({ state, ok }: { state: FormState; ok: string }) =>
  state?.ok ? <span className="text-sm text-ok-700">{ok}</span> : state?.error ? <span className="text-sm text-red-700">Vérifiez les champs.</span> : null;

export function ReplyForm({ locale, clientId, dossierId }: { locale: string; clientId: string; dossierId?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(staffReply, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="clientId" value={clientId} />
      {dossierId && <input type="hidden" name="dossierId" value={dossierId} />}
      <textarea name="body" required rows={3} placeholder="Votre réponse au client…" className={field} />
      <div className="flex flex-wrap items-center gap-3">
        <input type="file" name="files" multiple className="text-xs" />
        <button disabled={pending} className={`${buttonClass('primary')} ms-auto`}>
          <Icon name="send" className="h-4 w-4" /> Envoyer
        </button>
      </div>
      <Feedback state={state} ok="Message envoyé au client." />
    </form>
  );
}

export function RequestForm({ locale, dossierId }: { locale: string; dossierId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(staffRequest, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="dossierId" value={dossierId} />
      <input name="title" required placeholder="Ex. Facture manquante : Proximus" className={field} />
      <textarea name="detail" rows={2} placeholder="Précisez la pièce attendue (montant, date…)" className={field} />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-ink-600">
          Délai
          <input name="days" type="number" min={1} max={30} defaultValue={5} className={`${field} w-20`} /> jours
        </label>
        <button disabled={pending} className={`${buttonClass('secondary')} ms-auto`}>
          <Icon name="inbox" className="h-4 w-4" /> Demander
        </button>
      </div>
      <Feedback state={state} ok="Demande envoyée au client." />
    </form>
  );
}

export function DeliverForm({ locale, dossierId }: { locale: string; dossierId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(staffDeliver, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="dossierId" value={dossierId} />
      <input name="title" placeholder="Titre du document (ex. Rapport mensuel)" className={field} />
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="kind" className={field} defaultValue="report">
          <option value="report">Rapport</option>
          <option value="vat">TVA</option>
          <option value="ledger">Grand livre</option>
          <option value="peppol">Peppol</option>
        </select>
        <input type="file" name="file" required className="self-center text-xs" />
      </div>
      <div className="flex items-center gap-3">
        <Feedback state={state} ok="Document livré au client." />
        <button disabled={pending} className={`${buttonClass('secondary')} ms-auto`}>
          <Icon name="upload" className="h-4 w-4" /> Livrer
        </button>
      </div>
    </form>
  );
}

/* ---------- accesses ---------- */

const KIND_LABEL = { software: 'Logiciel comptable', bank: 'Banque / CODA', tax: 'Administration fiscale', other: 'Autre' } as const;

/** Decrypts a shared password on demand and offers to copy it. */
export function RevealSecret({ accessId }: { accessId: string }) {
  const [state, action, pending] = useActionState(adminRevealAccess, undefined);
  if (state)
    return state.secret ? (
      <span className="inline-flex items-center gap-2">
        <code className="rounded bg-paper px-2 py-0.5 font-mono text-xs">{state.secret}</code>
        <button type="button" onClick={() => navigator.clipboard?.writeText(state.secret ?? '')} className="text-xs font-semibold text-go-700 hover:underline">
          Copier
        </button>
      </span>
    ) : (
      <span className="text-xs text-ink-500">Aucun mot de passe</span>
    );
  return (
    <form action={action}>
      <input type="hidden" name="accessId" value={accessId} />
      <button disabled={pending} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-semibold hover:border-go-300 hover:text-go-700">
        <Icon name="key" className="h-3.5 w-3.5" /> Afficher
      </button>
    </form>
  );
}

/** Asks a firm for an access on one of its clients. */
export function RequestAccessForm({ locale, clients }: { locale: string; clients: { id: string; name: string; firm?: string }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(adminRequestAccess, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      {clients.length === 1 ? (
        <input type="hidden" name="clientId" value={clients[0].id} />
      ) : (
        <select name="clientId" required className={field} defaultValue="">
          <option value="" disabled>
            Client concerné…
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firm ? `${c.firm} · ${c.name}` : c.name}
            </option>
          ))}
        </select>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="label" required placeholder="Ex. MyMinfin, Yuki, Isabel" className={field} />
        <select name="kind" className={field} defaultValue="software">
          {Object.entries(KIND_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <textarea name="note" rows={2} placeholder="Pourquoi et quels droits (ex. lecture seule, mandat TVA)…" className={field} />
      <div className="flex items-center gap-3">
        <Feedback state={state} ok="Demande envoyée au cabinet." />
        <button disabled={pending} className={`${buttonClass('secondary')} ms-auto`}>
          <Icon name="key" className="h-4 w-4" /> Demander l’accès
        </button>
      </div>
    </form>
  );
}

/* ---------- firms ---------- */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium">{label}</span>
    {children}
  </label>
);

export function CreateFirmForm({ locale, team }: { locale: string; team: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(adminCreateFirm, undefined);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <Field label="Cabinet (raison sociale)">
        <input name="company" required placeholder="Fiduciaire Martin SRL" className={field} />
      </Field>
      <Field label="Numéro de TVA">
        <input name="vatNumber" placeholder="BE 0…" className={field} />
      </Field>
      <Field label="Contact principal">
        <input name="name" required placeholder="Prénom Nom" className={field} />
      </Field>
      <Field label="Téléphone">
        <input name="phone" className={field} />
      </Field>
      <Field label="E-mail de connexion">
        <input name="email" type="email" required className={field} />
      </Field>
      <Field label="Mot de passe provisoire (8 caractères min.)">
        <input name="password" type="text" minLength={8} required autoComplete="off" className={field} />
      </Field>
      <Field label="Responsable de compte">
        <select name="managerId" className={field} defaultValue="">
          <option value="">Non assigné</option>
          {team.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="flex items-end gap-3">
        <button disabled={pending} className={buttonClass('primary')}>
          <Icon name="plus" className="h-4 w-4" /> Créer le cabinet
        </button>
        {state?.error === 'exists' ? <span className="text-sm text-red-700">Cet e-mail a déjà un compte.</span> : <Feedback state={state} ok="" />}
      </div>
    </form>
  );
}

export function FirmForm({ locale, firm }: { locale: string; firm: { id: string; company: string; name: string; phone?: string; vatNumber?: string; email: string } }) {
  const [state, action, pending] = useActionState<FormState, FormData>(adminUpdateFirm, undefined);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="firmId" value={firm.id} />
      <Field label="Cabinet">
        <input name="company" required defaultValue={firm.company} className={field} />
      </Field>
      <Field label="Contact principal">
        <input name="name" required defaultValue={firm.name} className={field} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Téléphone">
          <input name="phone" defaultValue={firm.phone} className={field} />
        </Field>
        <Field label="TVA">
          <input name="vatNumber" defaultValue={firm.vatNumber} className={field} />
        </Field>
      </div>
      <p className="text-xs text-ink-500">Connexion : {firm.email}</p>
      <div className="flex items-center gap-3">
        <Feedback state={state} ok="Enregistré." />
        <button disabled={pending} className={`${buttonClass('secondary')} ms-auto`}>
          Enregistrer
        </button>
      </div>
    </form>
  );
}

export function AdminAddClientForm({ locale, firmId }: { locale: string; firmId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(adminAddClient, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="firmId" value={firmId} />
      <input name="name" required placeholder="Raison sociale du client" className={field} />
      <input name="vatNumber" placeholder="BE 0…" className={field} />
      <input name="software" placeholder="Logiciel (ex. Exact Online)" className={field} />
      <input name="sector" placeholder="Secteur" className={field} />
      <div className="flex items-center gap-3 sm:col-span-2">
        <Feedback state={state} ok="Client ajouté." />
        <button disabled={pending} className={`${buttonClass('secondary')} ms-auto`}>
          <Icon name="plus" className="h-4 w-4" /> Ajouter le client
        </button>
      </div>
    </form>
  );
}

/* ---------- team ---------- */

export function StaffForm({ locale, member }: { locale: string; member?: { id: string; name: string; email: string; title?: string; city?: string; phone?: string } }) {
  const [state, action, pending] = useActionState<FormState, FormData>(member ? adminUpdateStaff : adminCreateStaff, undefined);
  const ref = useResetOnSuccess(member ? undefined : state);
  return (
    <form ref={ref} action={action} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {member && <input type="hidden" name="staffId" value={member.id} />}
      <input name="name" required defaultValue={member?.name} placeholder="Prénom Nom" className={field} />
      <input name="title" defaultValue={member?.title} placeholder="Fonction (ex. Responsable de compte)" className={field} />
      <input name="city" defaultValue={member?.city} placeholder="Bureau (ex. Bruxelles)" className={field} />
      <input name="phone" defaultValue={member?.phone} placeholder="Téléphone" className={field} />
      {!member && (
        <>
          <input name="email" type="email" required placeholder="prenom.nom@delegis.be" className={field} />
          <input name="password" type="text" minLength={8} required autoComplete="off" placeholder="Mot de passe provisoire" className={field} />
        </>
      )}
      <div className="flex items-center gap-3 sm:col-span-2">
        {state?.error === 'exists' ? <span className="text-sm text-red-700">Cet e-mail a déjà un compte.</span> : <Feedback state={state} ok={member ? 'Enregistré.' : 'Membre ajouté.'} />}
        <button disabled={pending} className={`${buttonClass(member ? 'secondary' : 'primary')} ms-auto`}>
          {member ? 'Enregistrer' : 'Ajouter à l’équipe'}
        </button>
      </div>
    </form>
  );
}
