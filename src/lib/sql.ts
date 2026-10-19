import path from 'path';

/**
 * Postgres access.
 * - Production (Vercel): Neon serverless driver over HTTP, configured with DATABASE_URL.
 * - Local / CI: PGlite, a real embedded Postgres (WASM) persisted to ./data/pglite,
 *   or in-memory when DELEGIS_DB=memory (tests). Same SQL and schema everywhere.
 */
type Row = Record<string, unknown>;
type QueryFn = (text: string, params?: unknown[]) => Promise<Row[]>;

let ready: Promise<QueryFn> | null = null;

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'staff')),
  phone text,
  vat_number text,
  software text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS clients (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  vat_number text,
  software text,
  sector text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS clients_user_idx ON clients(user_id);
CREATE TABLE IF NOT EXISTS dossiers (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  period text NOT NULL DEFAULT '',
  type text NOT NULL CHECK (type IN ('dossier', 'document')),
  status text NOT NULL CHECK (status IN ('received', 'processing', 'done')),
  files jsonb NOT NULL DEFAULT '[]',
  timeline jsonb NOT NULL DEFAULT '[]',
  assignee text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS dossiers_client_idx ON dossiers(client_id, created_at DESC);
CREATE TABLE IF NOT EXISTS messages (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  author text NOT NULL CHECK (author IN ('client', 'team')),
  author_name text NOT NULL,
  body text NOT NULL,
  dossier_id text REFERENCES dossiers(id) ON DELETE SET NULL,
  files jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS messages_client_idx ON messages(client_id, created_at);
CREATE TABLE IF NOT EXISTS requests (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  dossier_id text REFERENCES dossiers(id) ON DELETE SET NULL,
  title text NOT NULL,
  detail text NOT NULL DEFAULT '',
  status text NOT NULL CHECK (status IN ('open', 'answered')),
  due_at timestamptz,
  answer jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS requests_client_idx ON requests(client_id, status);
CREATE TABLE IF NOT EXISTS deliverables (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('report', 'vat', 'ledger', 'peppol')),
  period text NOT NULL DEFAULT '',
  file_name text NOT NULL,
  stored text NOT NULL,
  size integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS invoices (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  number text NOT NULL UNIQUE,
  period text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  status text NOT NULL CHECK (status IN ('paid', 'due')),
  stored text,
  issued_at timestamptz NOT NULL,
  due_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS notifications (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  kind text NOT NULL,
  text text NOT NULL,
  href text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id, created_at DESC);
ALTER TABLE users ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS manager_id text REFERENCES users(id) ON DELETE SET NULL;
CREATE TABLE IF NOT EXISTS accesses (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  label text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('software', 'bank', 'tax', 'other')),
  url text,
  login text,
  secret text,
  notes text NOT NULL DEFAULT '',
  status text NOT NULL CHECK (status IN ('requested', 'provided', 'revoked')),
  request_note text,
  requested_by text,
  updated_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS accesses_client_idx ON accesses(client_id, status);
CREATE TABLE IF NOT EXISTS leads (
  id text PRIMARY KEY,
  locale text NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
`;

async function connect(): Promise<QueryFn> {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    const run: QueryFn = async (text, params = []) => (await sql.query(text, params)) as Row[];
    // Neon's HTTP driver runs one statement per call.
    for (const stmt of SCHEMA.split(';').map((s) => s.trim()).filter(Boolean)) await run(stmt);
    return run;
  }
  const { PGlite } = await import('@electric-sql/pglite');
  const db = process.env.DELEGIS_DB === 'memory' ? new PGlite() : new PGlite(path.join(process.cwd(), 'data', 'pglite'));
  await db.exec(SCHEMA);
  return async (text, params = []) => (await db.query<Row>(text, params)).rows;
}

/** Run a parameterised query ($1, $2…). The schema is created on first use. */
export async function q<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  ready ??= connect();
  const run = await ready;
  return (await run(text, params)) as T[];
}

/** For tests: drop the cached connection. */
export function resetConnection() {
  ready = null;
}
