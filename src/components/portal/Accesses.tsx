'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { saveAccess, withdrawAccess, type FormState } from '@/lib/actions';
import type { Access, AccessKind } from '@/lib/types';
import type { AppText } from '@/content/app-types';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';

const field = 'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm placeholder:text-ink-400 focus:border-go-600 focus:outline-none focus:ring-4 focus:ring-go-100';
const KINDS: AccessKind[] = ['software', 'bank', 'tax', 'other'];

function Saved({ state, a }: { state: FormState; a: AppText['accesses'] }) {
  if (state?.ok) return <span className="flex items-center gap-1.5 text-sm text-ok-700"><Icon name="check" className="h-4 w-4" /> {a.saved}</span>;
  if (state?.error) return <span className="text-sm text-red-700">!</span>;
  return null;
}

/** Credential fields shared by "add" and "provide / edit". The password is write-only. */
function CredentialFields({ a, access }: { a: AppText['accesses']; access?: Access }) {
  return (
    <>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium">{a.url}</span>
        <input name="url" type="text" inputMode="url" defaultValue={access?.url} placeholder="https://" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.login}</span>
        <input name="login" autoComplete="off" defaultValue={access?.login} className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.secret}</span>
        <input name="secret" type="password" autoComplete="new-password" placeholder={access?.hasSecret ? '••••••••' : ''} className={field} />
        {access?.hasSecret && <span className="mt-1 block text-xs text-ink-500">{a.secretKeep}</span>}
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium">{a.notes}</span>
        <textarea name="notes" rows={2} defaultValue={access?.notes} placeholder={a.notesPh} className={field} />
      </label>
    </>
  );
}

export function AddAccessForm({ locale, clientId, a }: { locale: string; clientId: string; a: AppText['accesses'] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveAccess, undefined);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);
  return (
    <form ref={ref} action={action} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="clientId" value={clientId} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.label}</span>
        <input name="label" required placeholder={a.labelPh} className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.kind}</span>
        <select name="kind" defaultValue="software" className={field}>
          {KINDS.map((k) => (
            <option key={k} value={k}>
              {a.kinds[k]}
            </option>
          ))}
        </select>
      </label>
      <CredentialFields a={a} />
      <div className="flex items-center gap-3 sm:col-span-2">
        <button disabled={pending} className={buttonClass('primary')}>
          <Icon name="key" className="h-4 w-4" /> {a.add}
        </button>
        <Saved state={state} a={a} />
      </div>
    </form>
  );
}

/** One access row: shows what is stored (never the password) and opens an inline form to provide or update it. */
export function AccessItem({ access, locale, a, updated, requested }: { access: Access; locale: string; a: AppText['accesses']; updated: string; requested?: string }) {
  const [open, setOpen] = useState(access.status === 'requested');
  const [state, action, pending] = useActionState<FormState, FormData>(saveAccess, undefined);
  useEffect(() => {
    if (state?.ok) setOpen(false);
  }, [state]);
  const isRequest = access.status === 'requested';
  const revoked = access.status === 'revoked';
  return (
    <li id={access.id} className="px-5 py-4">
      <div className="flex flex-wrap items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isRequest ? 'bg-[#FFF5E6] text-[#9A5F0B]' : revoked ? 'bg-paper-200 text-ink-400' : 'bg-go-50 text-go-600'}`}>
          <Icon name="key" className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 font-semibold">
            {access.label}
            <span className="rounded-full bg-paper-200 px-2 py-0.5 text-[11px] font-medium text-ink-600">{a.kinds[access.kind]}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${isRequest ? 'bg-[#FFF5E6] text-[#9A5F0B]' : revoked ? 'bg-paper-200 text-ink-500' : 'bg-ok-50 text-ok-700'}`}
            >
              {a.status[access.status]}
            </span>
          </p>
          {isRequest ? (
            <>
              {requested && <p className="mt-0.5 text-xs text-ink-500">{requested}</p>}
              {access.requestNote && <p className="mt-2 rounded-lg bg-paper px-3 py-2 text-sm text-ink-700">{access.requestNote}</p>}
            </>
          ) : (
            <dl className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-600">
              {access.login && (
                <div className="flex gap-1.5">
                  <dt className="text-ink-400">{a.login}</dt>
                  <dd className="font-mono text-xs leading-5">{access.login}</dd>
                </div>
              )}
              {!revoked && (
                <dd className="flex items-center gap-1 text-xs">
                  <Icon name="shield" className="h-3.5 w-3.5 text-ok-600" /> {access.hasSecret ? a.encrypted : a.noSecret}
                </dd>
              )}
              <dd className="text-xs text-ink-400">{updated}</dd>
            </dl>
          )}
          {!isRequest && access.notes && <p className="mt-1.5 text-sm text-ink-600">{access.notes}</p>}
        </div>
        {!revoked && (
          <div className="flex items-center gap-2">
            {!open && (
              <button type="button" onClick={() => setOpen(true)} className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-go-300 hover:text-go-700">
                {isRequest ? a.provide : a.edit}
              </button>
            )}
            {!isRequest && (
              <form action={withdrawAccess} onSubmit={(e) => !confirm(a.revokeConfirm) && e.preventDefault()}>
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="accessId" value={access.id} />
                <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-paper hover:text-red-700">{a.revoke}</button>
              </form>
            )}
          </div>
        )}
      </div>
      {open && !revoked && (
        <form action={action} className="mt-4 grid gap-4 rounded-xl border border-line bg-paper/50 p-4 sm:ms-12 sm:grid-cols-2">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="accessId" value={access.id} />
          <CredentialFields a={a} access={access} />
          <div className="flex items-center gap-3 sm:col-span-2">
            <button disabled={pending} className={buttonClass('primary')}>
              <Icon name="check" className="h-4 w-4" /> {isRequest ? a.provide : a.save}
            </button>
            {!isRequest && (
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-ink-500 hover:text-ink">
                ✕
              </button>
            )}
            <Saved state={state} a={a} />
          </div>
        </form>
      )}
    </li>
  );
}
