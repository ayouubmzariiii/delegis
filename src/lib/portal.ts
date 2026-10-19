import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { resolveLocale } from './params';
import { currentUser } from './auth';
import { ALL_CLIENTS, getWorkspace, managerOf } from './db';
import { selectedClientId } from './clientScope';
import { DEMO_EMAIL } from './demo';
import { getApp } from '@/content/app';
import { getDict } from '@/content';

const load = cache(async (locale: string) => {
  const l = await resolveLocale(Promise.resolve({ locale }));
  const user = await currentUser();
  if (!user) redirect(`/${l}/login`);
  if (user.role === 'staff') redirect(`/${l}/admin`);
  const [account, manager] = await Promise.all([getWorkspace(user.id), managerOf(user)]);
  const clientId = await selectedClientId(user, account.clients);
  const ws = clientId === ALL_CLIENTS ? account : await getWorkspace(user.id, clientId);
  const client = account.clients.find((c) => c.id === clientId) ?? null;
  return {
    locale: l,
    user,
    /** Data scoped to the selected client (or the whole account in portfolio view). */
    ws,
    /** Unscoped account data, for the switcher and the portfolio table. */
    account,
    client,
    /** The Delegis account manager an admin assigned to this firm (null until assigned). */
    manager,
    isPortfolio: client === null,
    a: getApp(l),
    t: getDict(l),
    base: `/${l}/portal`,
    isDemo: user.email === DEMO_EMAIL,
  };
});

/** Everything a portal page needs: session user, scoped workspace data and localized strings. */
export async function portalContext(params: Promise<{ locale: string }>) {
  return load((await params).locale);
}

export type PortalContext = Awaited<ReturnType<typeof portalContext>>;
