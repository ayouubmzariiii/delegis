'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { AppText } from '@/content/app-types';
import type { Dossier, DossierStatus, Message, User } from '@/lib/types';
import { addClient, respondToRequest, sendMessage, updateProfile, type FormState } from '@/lib/actions';
import { Icon } from '@/components/ui/Icon';
import { buttonClass, cx } from '@/components/ui/primitives';
import { StatusBadge, Avatar } from './ui';

const field = 'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm placeholder:text-ink-400 focus:border-go-600 focus:outline-none focus:ring-4 focus:ring-go-100';

/* ---------- Dossier table with search + status filter ---------- */

export function DossierTable({
  dossiers,
  a,
  statusLabels,
  filesLabel,
  base,
  lang,
  clientNames,
  clientLabel,
}: {
  clientNames?: Record<string, string>;
  clientLabel?: string;
  dossiers: Dossier[];
  a: AppText['dossiers'];
  statusLabels: Record<DossierStatus, string>;
  filesLabel: string;
  base: string;
  lang: string;
}) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | DossierStatus>('all');
  const df = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }), [lang]);
  const list = dossiers.filter((d) => (status === 'all' || d.status === status) && (d.name + d.period + (clientNames?.[d.clientId] ?? '')).toLowerCase().includes(q.toLowerCase()));
  const counts = (s: DossierStatus) => dossiers.filter((d) => d.status === s).length;

  return (
    <div className="rounded-2xl border border-line bg-white shadow-card">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{a.search}</span>
          <Icon name="search" className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={a.search} className={cx(field, 'ps-9')} />
        </label>
        <div role="tablist" aria-label={a.colStatus} className="flex gap-1 overflow-x-auto rounded-xl bg-paper p-1">
          {(['all', 'received', 'processing', 'done'] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={status === s}
              onClick={() => setStatus(s)}
              className={cx('whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition', status === s ? 'bg-white text-ink shadow-card' : 'text-ink-500 hover:text-ink')}
            >
              {s === 'all' ? `${a.all} · ${dossiers.length}` : `${statusLabels[s]} · ${counts(s)}`}
            </button>
          ))}
        </div>
      </div>
      {list.length === 0 ? (
        <p className="px-6 py-12 text-center text-sm text-ink-500">{a.empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-start text-xs text-ink-500">
              <tr className="border-b border-line">
                <th className="px-5 py-3 text-start font-medium">{a.colName}</th>
                {clientNames && <th className="hidden px-5 py-3 text-start font-medium lg:table-cell">{clientLabel}</th>}
                <th className="hidden whitespace-nowrap px-5 py-3 text-start font-medium md:table-cell">{a.colPeriod}</th>
                <th className="hidden whitespace-nowrap px-5 py-3 text-end font-medium sm:table-cell">{a.colFiles}</th>
                <th className="hidden whitespace-nowrap px-5 py-3 text-start font-medium md:table-cell">{a.colDate}</th>
                <th className="whitespace-nowrap px-5 py-3 text-end font-medium">{a.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((d) => (
                <tr key={d.id} className="group hover:bg-paper">
                  <td className="px-5 py-3.5">
                    <Link href={`${base}/dossiers/${d.id}`} className="flex items-center gap-3 font-medium group-hover:text-go-700">
                      <Icon name="folder" className="h-[18px] w-[18px] shrink-0 text-ink-400" />
                      <span className="truncate">{d.name}</span>
                    </Link>
                  </td>
                  {clientNames && <td className="hidden max-w-[12rem] truncate px-5 py-3.5 text-ink-600 lg:table-cell">{clientNames[d.clientId]}</td>}
                  <td className="hidden whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-600 md:table-cell">{d.period || '—'}</td>
                  <td className="hidden whitespace-nowrap px-5 py-3.5 text-end tabular text-ink-600 sm:table-cell">
                    {d.files.length} <span className="text-ink-400">{filesLabel}</span>
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-3.5 text-ink-600 md:table-cell">{df.format(new Date(d.createdAt))}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-end">
                    <StatusBadge status={d.status} label={statusLabels[d.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------- File input with selected-file chips ---------- */

function FilePicker({ label, name = 'files' }: { label: string; name?: string }) {
  const [names, setNames] = useState<string[]>([]);
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 py-2 text-sm text-ink-600 hover:border-go-300 hover:text-ink">
      <Icon name="clip" className="h-4 w-4" />
      <span className="truncate">{names.length ? names.join(', ') : label}</span>
      <input type="file" name={name} multiple className="sr-only" onChange={(e) => setNames(Array.from(e.target.files ?? []).map((f) => f.name))} />
    </label>
  );
}

/* ---------- Answer a request ---------- */

export function RequestAnswerForm({ id, locale, a }: { id: string; locale: string; a: AppText['requests'] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(respondToRequest, undefined);
  if (state?.ok) return <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ok-700"><Icon name="check" className="h-4 w-4" /> {a.sent}</p>;
  return (
    <form action={action} className="mt-4 space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="requestId" value={id} />
      <textarea name="note" rows={2} placeholder={a.note} className={field} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilePicker label={a.attach} />
        <button disabled={pending} className={buttonClass('primary')}>
          <Icon name="send" className="h-4 w-4" /> {a.send}
        </button>
      </div>
    </form>
  );
}

/* ---------- Conversation ---------- */

export function Conversation({
  messages,
  user,
  locale,
  a,
  dossierNames,
  initialDossier,
  clientId,
}: {
  clientId: string;
  messages: Message[];
  user: Pick<User, 'name'>;
  locale: string;
  a: AppText['messages'];
  dossierNames: Record<string, string>;
  initialDossier?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const df = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }), [locale]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);
  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <div className="flex h-[calc(100vh-15rem)] min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3 text-sm text-ink-600">
        <span className="h-2 w-2 rounded-full bg-ok-600" /> {a.status}
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto bg-paper/60 px-4 py-6 sm:px-6" aria-live="polite">
        {messages.length === 0 && <p className="text-center text-sm text-ink-500">{a.empty}</p>}
        {messages.map((m) => {
          const mine = m.author === 'client';
          return (
            <div key={m.id} className={cx('flex items-end gap-3', mine && 'flex-row-reverse')}>
              <Avatar name={mine ? user.name : m.authorName} tone={mine ? 'ink' : 'go'} size="sm" />
              <div className={cx('max-w-[78%]', mine && 'text-end')}>
                <p className="mb-1 text-xs text-ink-500">
                  <span className="font-semibold text-ink-700">{mine ? a.you : m.authorName}</span> · {df.format(new Date(m.createdAt))}
                </p>
                <div className={cx('inline-block rounded-2xl px-4 py-2.5 text-start text-[15px] leading-relaxed', mine ? 'rounded-ee-md bg-go-600 text-white' : 'rounded-es-md border border-line bg-white')}>
                  {m.dossierId && dossierNames[m.dossierId] && (
                    <span className={cx('mb-1 block text-xs font-medium', mine ? 'text-white/80' : 'text-go-700')}>{a.about.replace('{name}', dossierNames[m.dossierId])}</span>
                  )}
                  {m.body}
                  {m.files && m.files.length > 0 && (
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {m.files.map((f) => (
                        <span key={f.stored} className={cx('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs', mine ? 'bg-white/15' : 'bg-paper')}>
                          <Icon name="clip" className="h-3 w-3" /> {f.name}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
      <form ref={formRef} action={action} className="border-t border-line bg-white p-3 sm:p-4">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="clientId" value={clientId} />
        {initialDossier && <input type="hidden" name="dossierId" value={initialDossier} />}
        <div className="flex items-end gap-2">
          <label className="flex-1">
            <span className="sr-only">{a.placeholder}</span>
            <textarea
              name="body"
              required
              rows={1}
              placeholder={a.placeholder}
              className={cx(field, 'max-h-40 resize-none')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
          </label>
          <label className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-line text-ink-500 hover:text-ink" title="Fichier">
            <Icon name="clip" className="h-5 w-5" />
            <input type="file" name="files" multiple className="sr-only" />
          </label>
          <button disabled={pending} className={cx(buttonClass('primary'), 'h-11')} aria-label={a.send}>
            <Icon name="send" className="h-4 w-4" />
            <span className="hidden sm:inline">{a.send}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Profile ---------- */

export function ProfileForm({ user, locale, a }: { user: User; locale: string; a: AppText['settings'] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, undefined);
  const rows: [keyof User, string, string?][] = [
    ['name', a.name],
    ['company', a.company],
    ['phone', a.phone, 'tel'],
    ['vatNumber', a.vat],
    ['software', a.software],
  ];
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {rows.map(([k, label, type]) => (
        <label key={k} className="block">
          <span className="mb-1.5 block text-sm font-medium">{label}</span>
          <input name={k} type={type ?? 'text'} defaultValue={String(user[k] ?? '')} className={field} />
        </label>
      ))}
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.email}</span>
        <input value={user.email} readOnly className={cx(field, 'bg-paper text-ink-500')} />
      </label>
      <div className="flex items-center gap-4 sm:col-span-2">
        <button disabled={pending} className={buttonClass('primary')}>{a.save}</button>
        {state?.ok && <span className="flex items-center gap-1.5 text-sm text-ok-700"><Icon name="check" className="h-4 w-4" /> {a.saved}</span>}
      </div>
    </form>
  );
}

/* ---------- Add a client company ---------- */

export function AddClientForm({ locale, a, cancelHref }: { locale: string; a: AppText['clients']; cancelHref?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addClient, undefined);
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2" key={state?.ok ? 'done' : 'form'}>
      <input type="hidden" name="locale" value={locale} />
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium">{a.name}</span>
        <input name="name" required className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.vat}</span>
        <input name="vatNumber" placeholder="BE 0…" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{a.software}</span>
        <input name="software" placeholder="Exact Online" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium">{a.sector}</span>
        <input name="sector" className={field} />
      </label>
      <div className="flex items-center gap-3 sm:col-span-2">
        <button disabled={pending} className={buttonClass('primary')}>
          <Icon name="plus" className="h-4 w-4" /> {a.create}
        </button>
        {cancelHref && <Link href={cancelHref} className={buttonClass('ghost')}>{a.cancel}</Link>}
        {state?.error && <span className="text-sm text-red-700">!</span>}
      </div>
    </form>
  );
}
