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
- `onSuccess` callback has 4 params: `(data, variables, onMutateResult, context)` — not 3.
- Hook-level `onSuccess` overrides the one passed to `mutate()`. Pattern used in this project:
  accept `options?: UseMutationOptions<TData, TError, TVariables>` in the hook, spread it, then
  override `onSuccess` to run cache invalidation first then call `options?.onSuccess?.()`.

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
model Job {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("open")
  address     String?
  createdAt   DateTime @default(now())
}
```

No `companyId`, `customerId`, or auth yet — intentionally deferred (see SPEC.md Phase 4).

---

## API Endpoints (What Exists Today)

### Jobs
| Method | Path | Status |
|---|---|---|
| GET | /jobs | ✅ Working |
| POST | /jobs | ✅ Working |
| GET | /jobs/:id | ❌ Not built |
| PATCH | /jobs/:id | ❌ Not built |

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
│       │   └── [id]/page.tsx  — page exists, no logic yet
│       ├── customers/         — pages exist, no logic yet
│       ├── quotes/            — pages exist, no logic yet
│       └── invoices/          — pages exist, no logic yet
├── components/
│   ├── ui/                    — shadcn/ui components + custom (field.tsx, page-header.tsx, etc.)
│   └── layout/                — sidebar, topbar, mobile-nav, page-container
├── features/
│   └── jobs/                  — the only fully wired feature
│       ├── api/jobs.api.ts    — getJobs(), createJob()
│       ├── hooks/useJobs.ts   — TanStack Query GET hook
│       ├── hooks/useCreateJob.ts — TanStack Query mutation hook (accepts options for onSuccess)
│       ├── schemas/           — Zod validation schema
│       ├── types/job.types.ts — Job, CreateJobPayload types
│       └── components/        — JobForm, JobList, JobCard, JobsView
├── lib/
│   ├── api/client.ts          — fetch wrapper, throws on !response.ok, calls response.json()
│   ├── query-client.ts        — QueryClient config + jobKeys cache key factory
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
