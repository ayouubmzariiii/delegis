'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { submitLead, login, register, uploadDossier, type FormState } from '@/lib/actions';
import type { Dict } from '@/content/types';
import { Icon } from '@/components/ui/Icon';

export function ContactForm({
  t,
  services,
  locale,
  estimate,
  defaultService,
}: {
  t: Dict['contact'];
  services: { id: string; name: string }[];
  locale: string;
  estimate?: string;
  defaultService?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitLead, undefined);
  if (state?.ok)
    return (
      <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-8 flex items-start gap-3 border-brand/50 bg-brand-50" role="status">
        <Icon name="check" className="mt-0.5 h-5 w-5 text-brand" />
        <p className="font-medium">{t.sent}</p>
      </div>
    );
  return (
    <form action={action} className="rounded-[2rem] border border-line bg-white p-6 sm:p-8 grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="c-name">{t.name}</label>
        <input id="c-name" name="name" required autoComplete="name" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="c-company">{t.company}</label>
        <input id="c-company" name="company" autoComplete="organization" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="c-email">{t.email}</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="c-phone">{t.phone}</label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium" htmlFor="c-service">{t.service}</label>
        <select id="c-service" name="service" defaultValue={defaultService} className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none">
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium" htmlFor="c-message">{t.message}</label>
        <textarea id="c-message" name="message" rows={5} className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
      </div>
      {estimate && (
        <div className="sm:col-span-2 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm">
          <Icon name="check" className="h-4 w-4 text-brand" />
          {t.estimateAttached}
          <input type="hidden" name="estimate" value={estimate} />
        </div>
      )}
      <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-ink" />
        {t.consent}
      </label>
      {state?.error && <p className="sm:col-span-2 text-sm text-red-700" role="alert">{t.error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-go-600 px-5 text-sm font-semibold text-white hover:bg-go-700 disabled:opacity-50 w-full sm:w-auto">
          {t.send} <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>
    </form>
  );
}

export function AuthForm({ t, locale, mode, connecting }: { t: Dict['auth']; locale: string; mode: 'login' | 'register'; connecting?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(mode === 'login' ? login : register, undefined);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      {mode === 'register' && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="a-name">{t.name}</label>
            <input id="a-name" name="name" required autoComplete="name" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="a-company">{t.company}</label>
            <input id="a-company" name="company" autoComplete="organization" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
          </div>
        </>
      )}
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="a-email">{t.email}</label>
        <input id="a-email" name="email" type="email" required autoComplete="email" className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="a-password">{t.password}</label>
        <input
          id="a-password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          className="w-full rounded-xl border border-line bg-paper-50 px-4 py-3 text-[15px] placeholder:text-ink-400 focus:border-ink focus:bg-white focus:outline-none"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-700" role="alert">
          {state.error === 'exists' ? t.exists : t.invalid}
        </p>
      )}
      <button type="submit" disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-go-600 px-5 text-sm font-semibold text-white hover:bg-go-700 disabled:opacity-50 w-full">
        {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
        {pending && connecting ? connecting : mode === 'login' ? t.login : t.register}
      </button>
      <p className="text-center text-sm">
        <Link href={`/${locale}/login${mode === 'login' ? '?mode=register' : ''}`} className="font-medium text-ink underline-offset-4 hover:underline">
          {mode === 'login' ? t.toRegister : t.toLogin}
        </Link>
      </p>
    </form>
  );
}

const uField = 'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm placeholder:text-ink-400 focus:border-go-600 focus:outline-none focus:ring-4 focus:ring-go-100';

/**
 * Upload panel. Files are always attached to one client company:
 * preselected when the portal is scoped to a client, chosen here in the "all clients" view.
 */
export function UploadForm({
  t,
  locale,
  clients = [],
  clientId,
  clientLabel,
}: {
  t: Dict['portal'];
  locale: string;
  clients?: { id: string; name: string }[];
  clientId?: string | null;
  clientLabel?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(uploadDossier, undefined);
  const [names, setNames] = useState<string[]>([]);
  const [drag, setDrag] = useState(false);
  const pick = !clientId && clients.length > 1;
  return (
    <form action={action} className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6" key={state?.ok ? String(Date.now()) : 'form'}>
      <input type="hidden" name="locale" value={locale} />
      {clientId && <input type="hidden" name="clientId" value={clientId} />}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold">{t.uploadTitle}</h2>
          <p className="mt-0.5 text-sm text-ink-600">{t.uploadText}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <div className={`grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1`}>
          {pick && (
            <label className="block sm:col-span-2 lg:col-span-1">
              <span className="mb-1.5 block text-sm font-medium">{clientLabel}</span>
              <select name="clientId" required defaultValue="" className={uField}>
                <option value="" disabled>—</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">{t.dossierName}</span>
            <input name="name" className={uField} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">{t.period}</span>
            <input name="period" className={uField} placeholder="2026-10" />
          </label>
          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="mb-1.5 block text-sm font-medium">{t.type}</span>
            <select name="type" className={uField}>
              <option value="dossier">{t.types.dossier}</option>
              <option value="document">{t.types.document}</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-3">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={() => setDrag(false)}
            className={`relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${drag ? 'border-go-600 bg-go-50' : 'border-line-strong bg-paper hover:border-go-300'}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-go-50 text-go-600"><Icon name="upload" className="h-5 w-5" /></span>
            <span className="text-sm font-medium">{t.choose}</span>
            <span className="text-xs text-ink-500">PDF · JPG · XLSX · CSV · CODA · XML</span>
            {names.length > 0 && <span className="mt-1 max-w-full truncate text-xs font-medium text-go-700">{names.length} · {names.join(', ')}</span>}
            <input type="file" name="files" multiple required accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv,.cod,.txt,.xml" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => setNames(Array.from(e.target.files ?? []).map((f) => f.name))} />
          </label>
          <div className="flex items-center justify-between gap-3">
            {state?.ok ? <p className="text-sm font-medium text-ok-700" role="status">{t.sent}</p> : <span />}
            <button type="submit" disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-go-600 px-5 text-sm font-semibold text-white hover:bg-go-700 disabled:opacity-50">
              <Icon name="upload" className="h-4 w-4" /> {t.submit}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
