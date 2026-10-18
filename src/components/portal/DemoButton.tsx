'use client';

import { useActionState } from 'react';
import { loginDemo, type FormState } from '@/lib/actions';
import { Icon } from '@/components/ui/Icon';
import { buttonClass } from '@/components/ui/primitives';

/** One-click demo sign-ins (client account or Delegis staff) with pending states, like a real login. */
export function DemoButton({ locale, cta, note, or, connecting, staffCta }: { locale: string; cta: string; note: string; or: string; connecting: string; staffCta: string }) {
  const [, clientAction, clientPending] = useActionState<FormState, FormData>(loginDemo, undefined);
  const [, staffAction, staffPending] = useActionState<FormState, FormData>(loginDemo, undefined);
  return (
    <div className="mt-8">
      <div className="relative mb-6 text-center">
        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
        <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-ink-500">{or}</span>
      </div>
      <form action={clientAction}>
        <input type="hidden" name="locale" value={locale} />
        <button type="submit" disabled={clientPending} aria-busy={clientPending} className={`${buttonClass('secondary', 'lg')} w-full border-go-300 bg-go-50 text-go-800 hover:bg-go-100 disabled:opacity-80`}>
          {clientPending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-go-300 border-t-go-700" /> : <Icon name="user" className="h-4 w-4" />}
          {clientPending ? connecting : cta}
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-ink-500">{note}</p>
      <form action={staffAction} className="mt-4 text-center">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="as" value="staff" />
        <button type="submit" disabled={staffPending} className="text-sm font-medium text-ink-600 underline-offset-4 hover:text-ink hover:underline disabled:opacity-60">
          {staffPending ? connecting : staffCta}
        </button>
      </form>
    </div>
  );
}
