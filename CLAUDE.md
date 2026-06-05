# Collaboration Style

Whatever the user asks, help them step by step to debug, solve, or implement the issue at hand. Do not give the full answer right away unless the user explicitly asks for it. Guide them through the process: ask clarifying questions, suggest what to check next, explain the reasoning behind each step, and wait for their response before moving forward.

---

# Kraftmeister — Project Guide

A SaaS app for German Handwerk (tradespeople) to manage jobs, customers, quotes, and invoices.
Portfolio project targeting Full-Stack LLM / AI Engineer roles in the German job market.

See `SPEC.md` for the full roadmap and build order.

---

## How to Run

```bash
docker compose up           # start everything
docker compose up --build   # rebuild images (needed after Dockerfile changes)
docker compose up -d        # detached (background)
docker compose logs -f <service>   # stream logs for a specific service
docker compose up -d --build api-gateway   # rebuild + restart one service

# Prisma migrations (run inside the container — never from host)
docker compose exec api-gateway npx prisma migrate dev
```

### Stopping stuck containers

**Never run `docker` or `docker compose` with `sudo`** — it creates containers owned by root/dnsmasq that can't be stopped normally.

**Always run `docker compose down` before shutting down or rebooting** — this cleanly removes all containers so Docker starts fresh. Containers that survive a reboot may lose their network connection and can't be reached by hostname.

If a container gets stuck, follow this order:
```bash
docker rm -f <container-name>           # step 1: normal force remove
sudo -u dnsmasq kill -9 <pid>           # step 2: if stuck, get PID via `docker inspect <name> | grep Pid` then kill as dnsmasq (this is specific to this machine)
# reboot is the last resort

# If a container is running but unreachable by hostname (e.g. redis, postgres), check its network:
docker inspect <name> | grep -A5 '"Networks"'
# If Networks is empty, reconnect it:
docker network connect kraftmeister_default <name>
```

---

## Services & Ports

| Service | Port (host) | Port (container) | Notes |
|---|---|---|---|
| frontend | 3000 | 3000 | Next.js 16 dev server |
| api-gateway | 4000 | 4000 | NestJS REST API |
| postgres | 5433 | 5432 | host port is 5433 to avoid conflicts |
| redis | 6379 | 6379 | not yet wired to NestJS |
| ai-service | 8000 | 8000 | FastAPI — has no main.py yet, exits on start |

**Env files:** All environment variables live in `.env.dev` (dev) and `.env.prod` (prod) at the project root. Both are gitignored. Copy `.env.dev.example` to get started. Docker Compose loads them via `env_file: .env.dev`.

**Important:** The frontend `apiClient` in `src/lib/api/client.ts` defaults to `http://localhost:3001` if `NEXT_PUBLIC_API_URL` is missing — always ensure `.env.dev` is present.

---

## Key Technical Decisions & Gotchas

### Next.js 16
- Version 16.2.6 — has breaking changes vs Next.js 14/15.
- Turbopack panics on this version in Docker. Dev script uses `--webpack` flag: `next dev --webpack`.
- Flag to disable Turbopack is `--webpack`, NOT `--no-turbopack` (that flag doesn't exist in v16).
- `useRouter` from `next/navigation` works normally. `router.push()` is synchronous.

### Prisma 7
- Version 7.8.0 — breaking change: `PrismaClient` requires a driver adapter, it no longer reads `DATABASE_URL` automatically.
- Must use `@prisma/adapter-pg` with `pg`. See `api-gateway/src/prisma/prisma.service.ts`.
- Prisma CLI must be run inside the Docker container (`docker compose exec api-gateway npx prisma migrate dev`) — not from the host — so it uses the Docker network URL (`postgres:5432`).
- Schema has no `url` in the datasource block — the adapter provides the connection at runtime.

### NestJS (api-gateway)
- Compiled output goes to `dist/src/main.js` (not `dist/main.js`) because `rootDir` is not set in tsconfig.
- Dockerfile CMD is `node dist/src/main` (prod). Docker Compose overrides with `npm run start:dev` (hot-reload watcher).
- Hot-reload is active in dev — editing any `.ts` file triggers automatic recompile and restart.
- `PORT` env var not set in docker-compose — app defaults to 4000 in `main.ts`.

### TanStack Query v5 (5.100+)
- Mutation hooks handle cache invalidation in `onSuccess`. Callers pass their own callback to `mutate()`:
  ```ts
  mutate(payload, { onSuccess: () => router.push('/jobs') });
  ```
- Both the hook-level and `mutate()`-level `onSuccess` fire — hook runs cache invalidation, caller handles navigation/UI.
- **Query keys must include filters.** `useJobs(filters)` uses `jobKeys.list(filters)` so each filter combination gets its own cache slot. Invalidating `jobKeys.all` (`["jobs"]`) still clears all of them via prefix matching.
- `jobKeys` lives in `src/lib/query-client.ts`: `all`, `list(filters?)`, `detail(id)`.

### CORS (NestJS `main.ts`)
- `enableCors` methods array must include `'PATCH'`. Missing it silently blocks all PATCH requests with a CORS error in the browser — no server-side log, `status: null` in DevTools.
- Current allowed methods: `GET, POST, PUT, PATCH, DELETE, OPTIONS`.

### Prisma CLI in Docker
- Use `-T` flag when piping stdin: `docker compose exec -T api-gateway npx prisma db execute --stdin <<< "SQL"`.
- Without `-T`, Docker throws "cannot attach stdin to a TTY-enabled container".

### Status enums
- `JobStatus` enum values are uppercase (`OPEN`, `IN_PROGRESS`, `DONE`, `CANCELLED`) — both in Prisma and on the frontend.
- Single source of truth: `JOB_STATUSES` const array in `job.types.ts`. `JobStatus` type is derived from it. Zod schema uses `z.enum(JOB_STATUSES)`. Never hardcode status strings elsewhere.
- `JOB_STATUS_LABELS` (also in `job.types.ts`) maps enum values to display strings (`IN_PROGRESS` → `"In Progress"`).

### Radix UI / shadcn Dialog
- `DialogContent` requires either `<DialogDescription>` inside it or `aria-describedby={undefined}` to suppress the accessibility warning.
- Always include `<DialogDescription>` inside `<DialogHeader>` — even a short one-liner is fine.

### Next.js `useSearchParams()` in production builds
- Any component using `useSearchParams()` must be wrapped in a `<Suspense>` boundary in its page file.
- This does not fail in dev mode — only caught during `next build`. Always wrap at the page level: `<Suspense><ComponentUsingSearchParams /></Suspense>`.

### Production deployment gotchas

- **`NEXT_PUBLIC_*` vars are baked at build time**, not runtime. `env_file` in Docker Compose only injects vars at container start — too late for Next.js. Must pass them as Docker build args. In `docker-compose.prod.yml` use `build.args`, and in the frontend `Dockerfile` declare `ARG NEXT_PUBLIC_API_URL` + `ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL` before `RUN npm run build`.
- **Export env vars before building** so Docker Compose can substitute `${VAR}` in the compose file: `export $(grep -v '^#' .env.prod | xargs) && docker-compose -f docker-compose.prod.yml up -d --build`.
- **`CORS_ORIGIN` must include the port** if the frontend isn't on port 80. `http://kraftmeister.org` ≠ `http://kraftmeister.org:3000`. Once Nginx is in front, use the domain with no port.
- **In production, `NEXT_PUBLIC_API_URL` should go through Nginx** (e.g. `http://kraftmeister.org/api`), not directly to port 4000. Nginx strips the `/api` prefix and proxies to port 4000 internally.
- **Run migrations after first deploy**: `docker exec api-gateway npx prisma migrate deploy` — the production database starts empty.

### Button `disabled` vs `pointer-events-none`
- shadcn `Button` with `disabled` applies `opacity-50` — this washes out all styling including active/highlight states.
- For non-interactive display buttons that still need to show colour, use `className="pointer-events-none"` instead of the `disabled` prop.
- Use `disabled` only on the active item in a set (e.g. current status chip) where the faded look is intentional.

---

## Architecture

```
Browser
  └── Next.js frontend (:3000)
        └── fetch → NestJS api-gateway (:4000)
              ├── PrismaService → PostgreSQL (:5432)
              ├── (Redis — not yet connected)
              └── (ai-service proxy — not yet built)

ai-service (:8000) — FastAPI, currently has no main.py
```

---

## Current Database Schema (Prisma)

Only one model exists so far (`api-gateway/prisma/schema.prisma`):

```prisma
enum JobStatus {
  OPEN
  IN_PROGRESS
  DONE
  CANCELLED
}

model Job {
  id          String    @id @default(cuid())
  title       String
  description String?
  status      JobStatus @default(OPEN)
  address     String?
  createdAt   DateTime  @default(now())
}
```

No `companyId`, `customerId`, or auth yet — intentionally deferred (see SPEC.md Phase 4).

---

## API Endpoints (What Exists Today)

### Jobs
| Method | Path | Notes |
|---|---|---|
| GET | /jobs | ✅ Working. Supports `?status=OPEN&date=YYYY-MM-DD` query params |
| POST | /jobs | ✅ Working |
| GET | /jobs/:id | ✅ Working |
| PATCH | /jobs/:id | ✅ Working |
| DELETE | /jobs/:id | ✅ Working — returns 204 No Content |

### Quotes
| Method | Path | Notes |
|---|---|---|
| GET | /quotes | ✅ Working. Returns items + customer + computed subtotal/vatAmount/total |
| POST | /quotes | ✅ Working. Body: `{ customerId, jobId?, vatRate?, items: [{description, quantity, unitPrice}] }` |
| GET | /quotes/:id | ✅ Working. Includes items, customer, job, invoice |
| PATCH | /quotes/:id | ✅ Working. Partial update: status, vatRate, items (replaces all items if provided) |
| POST | /quotes/:id/convert-to-invoice | ✅ Working. Creates Invoice from Quote, copies items, auto-generates invoiceNumber |

### Invoices
| Method | Path | Notes |
|---|---|---|
| GET | /invoices | ✅ Working. Returns items + customer + computed subtotal/vatAmount/total |
| POST | /invoices | ✅ Working. Manual creation with items |
| GET | /invoices/:id | ✅ Working. Includes items, customer, quote |
| PATCH | /invoices/:id/status | ✅ Working. Body: `{ status: "DRAFT" \| "SENT" \| "PAID" \| "CANCELLED" }` |

---

## Frontend Structure

```
src/
├── app/
│   ├── (auth)/login/          — page exists, no logic yet
│   ├── (auth)/register/       — page exists, no logic yet
│   └── (dashboard)/
│       ├── layout.tsx         — dashboard shell with sidebar
│       ├── dashboard/         — page exists, no logic yet
│       ├── jobs/
│       │   ├── page.tsx       — ✅ list page, fetches GET /jobs
│       │   ├── new/page.tsx   — ✅ create form, posts to POST /jobs, redirects on success
│       │   └── [id]/page.tsx  — ✅ detail page with status change + edit dialog
│       ├── customers/         — ✅ fully wired (list, new, detail, edit)
│       ├── quotes/
│       │   ├── page.tsx       — ✅ list page with status badges + totals
│       │   ├── new/page.tsx   — ✅ line item builder form (dynamic rows, VAT calc, customer/job select)
│       │   └── [id]/page.tsx  — ✅ detail with status change + "Convert to Invoice" button
│       ├── invoices/
│       │   ├── page.tsx       — ✅ list with status badges + totals
│       │   └── [id]/page.tsx  — ✅ detail with Mark as Sent/Paid/Cancelled actions
│       └── dashboard/         — ✅ stats (open jobs, unpaid invoices, recent customers)
├── components/
│   ├── ui/                    — shadcn/ui components + custom (field.tsx, page-header.tsx, etc.)
│   └── layout/                — sidebar, topbar, mobile-nav, page-container
├── features/
│   ├── jobs/                  — fully wired
│   ├── customers/             — fully wired
│   ├── quotes/
│   │   ├── api/               — getQuotes, getQuote, createQuote, updateQuote, convertToInvoice
│   │   ├── hooks/             — useQuotes, useQuote, useCreateQuote, useUpdateQuote, useConvertToInvoice
│   │   ├── schemas/           — createQuoteSchema (Zod, with useFieldArray items)
│   │   ├── types/quote.types.ts — Quote, QuoteItem, QuoteStatus, QUOTE_STATUSES, payload types
│   │   └── components/
│   │       ├── QuotesView.tsx      — list with StatusBadge
│   │       ├── QuoteForm.tsx       — dynamic line item builder with VAT calc
│   │       └── quote-details/      — header, items table, actions (status + convert)
│   └── invoices/
│       ├── api/               — getInvoices, getInvoice, updateInvoiceStatus
│       ├── hooks/             — useInvoices, useInvoice, useUpdateInvoiceStatus
│       ├── types/invoice.types.ts — Invoice, InvoiceItem, InvoiceStatus, INVOICE_STATUSES, payload types
│       └── components/
│           ├── InvoicesView.tsx     — list with StatusBadge
│           └── invoice-details/     — header, items table, actions (sent/paid/cancel)
├── lib/
│   ├── api/client.ts          — fetch wrapper, throws on !response.ok, calls response.json()
│   ├── query-client.ts        — QueryClient config + jobKeys, customerKeys, quoteKeys, invoiceKeys
│   └── utils.ts
└── providers/QueryProvider.tsx
```

---

## Feature Pattern (follow this for new features)

**Backend (NestJS):**
1. Add model to `prisma/schema.prisma` → run `npx prisma migrate dev`
2. Create `src/modules/<feature>/` with module, controller, service, dtos/
3. Register module in `app.module.ts`
4. Return data from controller methods (missing `return` = empty response body = frontend `onSuccess` never fires)

**Frontend:**
1. Add types to `src/features/<feature>/types/`
2. Add API functions to `src/features/<feature>/api/`
3. Add TanStack Query hooks to `src/features/<feature>/hooks/`
4. Build components in `src/features/<feature>/components/`
5. Wire into `src/app/(dashboard)/<feature>/` pages

**Docstring / Comment Rules (always follow across all services):**
- **Every function and method must have a docstring or a short inline comment** — this applies to Python (FastAPI/ai-service), TypeScript (NestJS/api-gateway), and TypeScript/React (frontend).
- Python: use triple-quoted docstrings (`"""..."""`) on every `def` / `async def`.
- TypeScript/NestJS: use JSDoc (`/** ... */`) on every public method in services and controllers.
- TypeScript/React: use a single-line JSDoc comment on every hook, API function, and component with non-obvious behaviour.
- The comment must explain **what the function does and why**, not just restate the name. One clear sentence is enough.

**Frontend UI Rules (always follow):**
- **Always use shadcn/ui components** from `src/components/ui/` — `Button`, `Card`, `Input`, `Select`, `Badge`, `Separator`, etc. Never use raw HTML elements when a shadcn component exists.
- **Always use Typography components** from `src/components/ui/Typography/` for all text — `TypographyH1` for page titles, `TypographyH2` for section headers, `TypographyP` for body text. Never use raw `<h1>`, `<h2>`, `<p>` tags directly.
- Typography components accept a `className` prop for overrides (e.g. smaller size, custom color) — use it instead of reaching for raw elements.
- Use `PageContainer` from `src/components/layout/page-container.tsx` to wrap every page body.
- Use `PageHeader` from `src/components/ui/page-header.tsx` for page titles + action buttons.
- **Split components aggressively** — if a component has distinct visual sections (header, description, status, photos), each section gets its own file. The parent component should only handle data fetching and composing the pieces, with no UI logic buried in it. Group related sub-components in a dedicated subfolder (e.g. `job-details/`).
- **Never use raw `<button>` or `<div>` where a shadcn component exists.** Always use `Button` from `src/components/ui/button.tsx` for any clickable action, and `Card` from `src/components/ui/card.tsx` for any card-like container. Raw HTML elements are only acceptable when no shadcn equivalent exists.
- **Never define types inside a component file.** All types and interfaces belong in `src/features/<feature>/types/`. Import them from there. Inline `interface Props` or `type X` in a component file is not allowed.
