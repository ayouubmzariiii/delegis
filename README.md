# Delegis

B2B accounting back-office outsourcing for Belgian SMEs and accounting firms, with a production team in Casablanca.
Multilingual marketing site (5 locales), public price estimator, a multi-client **client portal** and an **admin back-office**,
running on Postgres with file storage — designed to deploy on **Vercel**.

## Stack

- **Next.js 15** (App Router, React 19, Server Actions), TypeScript `strict`, Tailwind CSS 3
- **Postgres** — Neon (serverless driver) in production via `DATABASE_URL`; [PGlite](https://pglite.dev) (embedded Postgres) locally and in tests. Same schema and SQL everywhere (`src/lib/sql.ts`).
- **File storage** — Vercel Blob in production via `BLOB_READ_WRITE_TOKEN`; `./data/uploads` locally (`src/lib/storage.ts`). Blob URLs are never exposed: downloads go through an authenticated route.
- Auth: signed JWT session cookie (`jose`) + `bcryptjs`; roles `client` and `staff`
- **Vitest** (unit + DB integration tests on real Postgres), **ESLint**

## Getting started (local)

```bash
npm install
cp .env.example .env.local   # set AUTH_SECRET
npm run db:seed              # creates the schema and inserts the demo (PGlite in ./data/pglite, files in ./data/uploads)
npm run dev                  # http://localhost:3000 → /fr-be
npm run check                # typecheck + lint + tests
```

## Deploy on Vercel

1. Import the repository in Vercel (framework: Next.js).
2. Add a **Neon Postgres** database (Vercel Marketplace → Storage) — this sets `DATABASE_URL`.
3. Add a **Vercel Blob** store — this sets `BLOB_READ_WRITE_TOKEN`.
4. Set `AUTH_SECRET` (long random string) and `NEXT_PUBLIC_SITE_URL`.
5. Deploy. The schema is created on first request. Seed the demo once from your machine:
   ```bash
   DATABASE_URL=… BLOB_READ_WRITE_TOKEN=… npm run db:seed
   ```
   (Or let the first click on a demo button seed it.)

Limits: Vercel functions accept request bodies up to 4.5 MB, so uploads are capped at 4 MB per file. For larger files, switch uploads to direct-to-Blob client uploads (`@vercel/blob/client`).

## What the system does

**Client portal** (`/[locale]/portal`, role `client`) — the account is an **accounting firm** (bureau comptable). It owns every dossier and files each one under one of its own **client companies**, selected with the sidebar switcher (or "All clients"). A new firm starts with no clients; nothing is created on its behalf. The sidebar shows the Delegis account manager an admin assigned to the firm (name, title, office, e-mail, phone).

| Route | Purpose |
|---|---|
| `/portal` | Statistics (6-month volume, status mix, turnaround, request rate), to-dos, recent dossiers |
| `/portal/clients` · `/clients/new` | Client companies and adding one |
| `/portal/dossiers` · `/dossiers/[id]` | Upload documents for a client; processing timeline and files |
| `/portal/requests` | Missing-document requests from the team, answered with a note and files |
| `/portal/messages` | Conversation with the team |
| `/portal/accesses` | Credentials the team needs for a client (accounting software, bank/CODA, MyMinfin…): the firm adds them, or provides those the team requested. Passwords are AES-256-GCM encrypted (`src/lib/vault.ts`), never sent back to the portal, and erased when revoked |
| `/portal/documents`, `/portal/invoices` | Deliverables and Delegis invoices (real PDF/CSV files) |

**Admin back-office** (`/[locale]/admin`, role `staff`; old `/staff` URLs redirect) — French UI for the Delegis team:

| Route | Purpose |
|---|---|
| `/admin` | Work queue across all firms: advance a dossier (received → encoding → 4-eyes review → delivered), conversations |
| `/admin/dossiers/[id]` | Files, timeline, reply, request a document, deliver a file, the client's accesses |
| `/admin/cabinets` · `/cabinets/[id]` | Firms with workload; open a firm account, edit its details, assign its account manager, add clients for it, request accesses |
| `/admin/acces` | Every shared access (requested first); reveal a password on demand; request a new one |
| `/admin/equipe` | Team members and the profile firms see (title, office, phone); add a member |

Every action writes to the database and creates a notification on the firm's side.

## Demo data

`npm run db:seed` (`src/lib/seed.ts`) inserts, through the same data layer the app uses:

- a client account `demo@delegis.test` (fiduciary *Cabinet Dubois & Associés*) with 3 client companies,
- 2 staff accounts (`thomas.lambert@delegis.test`, account manager of the demo firm; `yasmine.elidrissi@delegis.test`),
- 3 shared accesses (encrypted) and 2 open access requests,
- ~48 dossiers, messages, requests, deliverables and invoices over 12 months,
- **real generated files** (`src/lib/docgen.ts`): valid PDF invoices and reports, Belgian CODA statements (128-char records), Peppol BIS 3.0 UBL invoices, CSV exports.

Password for all demo users: `DEMO_PASSWORD` (default `demo-delegis-2026`). The login page also has one-click buttons for the client and the team.
All people and companies are fictional. Turn the demo off with `DEMO_ENABLED=false`.

## Structure

```
src/
  app/[locale]/(site)/     marketing pages (static, per locale)
  app/[locale]/portal/     client portal (dynamic, noindex)
  app/[locale]/admin/      admin back-office (dynamic, noindex)
  app/api/files/           authenticated downloads
  components/              ui/ · layout/ · sections/ · portal/ · admin/
  content/                 typed dictionaries per language
  lib/                     sql · db · vault · storage · seed · docgen · auth · actions · routes · seo · pricing · stats
scripts/seed.ts            npm run db:seed
```

## SEO

Static HTML for 250+ indexable pages, localized slugs, canonical + full `hreflang` cluster, JSON-LD per page type (Organization, Service, FAQPage, Article, BreadcrumbList, ItemList), sitemap, robots, `llms.txt`, web manifest, security headers.

## Before going live

- Set `DEMO_ENABLED=false` (or keep it as a public sales demo).
- Replace placeholder office addresses, phone numbers and VAT number in `src/lib/site.ts`.
- Wire `submitLead` to e-mail/CRM; replace Unsplash photos with your own.
