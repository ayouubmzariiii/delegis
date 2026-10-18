'use client';

import { useActionState, useEffect, useRef } from 'react';
import { staffDeliver, staffReply, staffRequest, type FormState } from '@/lib/actions';
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
