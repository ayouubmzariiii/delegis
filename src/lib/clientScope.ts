import 'server-only';
import { cookies } from 'next/headers';
import { ALL_CLIENTS, getWorkspace, listClients } from './db';
import type { Client, User } from './types';

export const CLIENT_COOKIE = 'delegis_client';

/**
 * The client company the user is currently working on.
 * Returns ALL_CLIENTS for the portfolio view; anything not owned by the user falls back to it.
 */
export async function selectedClientId(user: User, clients?: Client[]): Promise<string> {
  const list = clients ?? (await getWorkspace(user.id)).clients;
  const wanted = (await cookies()).get(CLIENT_COOKIE)?.value;
  if (wanted && list.some((c) => c.id === wanted)) return wanted;
  // Single-client accounts never see the portfolio view.
  return list.length === 1 ? list[0].id : ALL_CLIENTS;
}

/** Validates a client id coming from a form; it must belong to the user. */
export async function ownedClientId(user: User, id: string | null | undefined): Promise<string | null> {
  const clients = await listClients(user.id);
  if (id && clients.some((c) => c.id === id)) return id;
  const selected = await selectedClientId(user, clients);
  return selected === ALL_CLIENTS ? null : selected;
}
