# SPEC.md — Kraftmeister SaaS App

> Build target: Portfolio project for **Full-Stack LLM / AI Engineer** roles in the German job market.
> Stack choices are optimized for what German startups and scale-ups currently hire for.

---

## Current Progress Summary

| Area                                              | Status         |
| ------------------------------------------------- | -------------- |
| Monorepo + Docker Compose + hot-reload            | ✅ Done        |
| PostgreSQL + Prisma (Job model only)              | ✅ Done        |
| NestJS scaffolded + PrismaModule + ValidationPipe | ✅ Done        |
| `GET /jobs`, `POST /jobs`                         | ✅ Done        |
| `/jobs` list page + TanStack Query                | ✅ Done        |
| `/jobs/new` form + React Hook Form + Zod          | ✅ Done        |
| Product brief (Phase 0.1)                         | ✅ Done        |
| Auth, Customers, Quotes, Invoices                 | ⏳ Not started |
| AI Service                                        | ⏳ Not started |

---

## Phase 0 — Product Definition

> **TODO:** This phase was skipped in favor of getting something running. Come back to it before adding Customers/Quotes/Invoices.
>
> **Process:**
>
> 1. Write a one-page brief: what Kraftmeister does, who uses it, what the MVP solves.
> 2. Sketch the user journey on paper: `Customer → Job → Quote → Invoice → PDF`.
> 3. Draw or Figma wireframes for: Dashboard, Customer list, Job form, Quote builder, Invoice view.
> 4. Write down what is OUT OF SCOPE for MVP so you don't gold-plate.

- [x] **0.1** Write a one-page product brief. → `wiki/PRODUCT_BRIEF.md`
- [x] **0.2** Define the MVP user journey: `Customer → Job → Quote → Invoice → PDF`. → `wiki/USER_JOURNEY.md`
- [x] **0.3** List the 5 core database entities: `companies`, `users`, `customers`, `jobs`, `quotes`, `invoices`, `invoice_items`.
- [x] **0.4** Sketch wireframes for: Dashboard, Customer list, Job form, Quote builder, Invoice view. → `wiki/WIREFRAMES.md`
- [x] **0.5** Document what is explicitly OUT OF SCOPE for MVP. → `wiki/OUT_OF_SCOPE.md`

---

## Phase 1 — Monorepo & Infrastructure Foundation

**Goal:** One command boots the entire system. Everything reproducible.

**Tech:** Docker, Docker Compose, PostgreSQL, Redis, Node.js, Python 3.12

### 1.1 Repository Structure

- [x] Initialize Git monorepo with `frontend/`, `api-gateway/`, `ai-service/`, `docker-compose.yml`.
- [x] Add `.gitignore`, `.env.example`, `README.md`.

### 1.2 Docker Compose

- [x] `docker-compose.yml` with services: `frontend`, `api-gateway`, `postgres`, `redis`, `ai-service`.
- [x] Configure hot-reload via bind mounts for `api-gateway` in dev mode (frontend already has it).
- [x] Add health checks for `postgres` and `redis`.
- [x] Add `depends_on` with `condition: service_healthy` for dependent services.
- [x] Create `.env.dev` and `.env.prod` templates. Never commit secrets.

### 1.3 PostgreSQL + Prisma

- [x] Prisma initialized in `api-gateway/`.
- [x] `DATABASE_URL` via environment variable (using `@prisma/adapter-pg` for Prisma 7).
- [x] Initial migration with `Job` model.

---

## Phase 2 — Complete Jobs Feature (CURRENT FOCUS)

**Goal:** Finish the Jobs feature end-to-end before moving to the next resource.

### 2.1 Backend — Finish Jobs Module

- [x] `GET /jobs` — list all jobs.
- [x] `POST /jobs` — create a job.
- [x] `GET /jobs/:id` — single job with all fields.
- [x] `PATCH /jobs/:id` — update fields including status transitions.
- [x] `DELETE /jobs/:id` — delete a job (returns 204 No Content).
- [x] Add query param filters to `GET /jobs`: `status`, `date`.
- [x] Status enum in Prisma: `OPEN | IN_PROGRESS | DONE | CANCELLED` (currently stored as plain string).

### 2.2 Frontend — Finish Jobs Pages

- [x] `/jobs` — list page with TanStack Query.
- [x] `/jobs/new` — create form with React Hook Form + Zod + redirect on success.
- [x] `/jobs/[id]` — detail page: show all job fields, status change button.
- [x] `/jobs` — filter bar: status dropdown + date picker; updates `useJobs(filters)` and reflects in URL query params.

---

## Phase 3 — Customers Feature

**Goal:** Full CRUD for customers on both backend and frontend.

### 3.1 Backend — Customers Module

Follow the NestJS module pattern:

```
modules/customers/
├── customers.module.ts
├── customers.controller.ts
├── customers.service.ts
└── dtos/
    ├── create-customer.dto.ts
    └── update-customer.dto.ts
```

- [x] Add `Customer` model to Prisma schema: `id, name, email, phone, address, createdAt`.
- [x] Run `prisma migrate dev`.
- [x] `GET /customers` — list all, with optional `search` query param.
- [x] `GET /customers/:id` — single customer (job history deferred to Phase 4 — requires `customerId` FK on `Job`).
- [x] `POST /customers` — create with validation.
- [x] `PATCH /customers/:id` — partial update.
- [x] `DELETE /customers/:id` — soft delete (add `deletedAt` field).

### 3.2 Frontend — Customers Pages

- [x] `/customers` — searchable table with Name, Phone, Email, Actions columns.
- [x] `/customers/new` — form with React Hook Form + Zod validation.
- [x] `/customers/[id]` — detail view (job history list deferred to Phase 4).
- [x] `/customers/[id]/edit` — prefilled edit form.

---

## Phase 4 — Expand Schema + Auth

> Add this phase before building Quotes and Invoices since those need `companyId` scoping.

**Goal:** Multi-tenancy and secure auth. Every query becomes scoped to a company.

**Tech:** NestJS, JWT, bcrypt, Passport.js, Redis

### 4.1 Expand Prisma Schema

- [ ] Add remaining models to `schema.prisma`:

```
Company       — id, name, address, vatId, createdAt
User          — id, companyId (FK), email, passwordHash, role (ADMIN|WORKER)
Customer      — add companyId (FK)
Job           — add companyId (FK), customerId (FK), photos[]
Quote         — id, companyId, customerId, jobId, status, items[], total, vatRate
QuoteItem     — id, quoteId, description, quantity, unitPrice
Invoice       — id, companyId, customerId, quoteId, invoiceNumber, status, dueDate
InvoiceItem   — id, invoiceId, description, quantity, unitPrice, vatRate
```

- [ ] Add indexes on all `companyId` foreign keys.
- [ ] Run `prisma migrate dev --name expand-schema`.
- [ ] Add a seed script (`scripts/seed.ts`) with demo company, user, and customers.

### 4.2 Redis Setup

- [ ] Connect Redis to NestJS via `@nestjs/cache-manager` and `cache-manager-redis-store`.
- [ ] Use Redis for: refresh token store, rate limiting.

### 4.3 NestJS Auth Module

- [ ] Install: `@nestjs/config`, `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`.
- [ ] Set up `ConfigModule` as global.
- [ ] `POST /auth/register` — create company + admin user.
- [ ] `POST /auth/login` — return `accessToken` (15min) + `refreshToken` (7d) stored in Redis.
- [ ] `POST /auth/refresh` — validate refresh token in Redis, issue new pair.
- [ ] `POST /auth/logout` — delete refresh token from Redis.
- [ ] Implement `JwtAuthGuard` and `CurrentUser` decorator.
- [ ] Hash passwords with `bcrypt` (12 rounds).
- [ ] Scope **all** DB queries to `companyId` from the JWT — this is multi-tenancy.

### 4.4 Frontend Auth

- [ ] `/login` — email + password form, store tokens, redirect to dashboard.
- [ ] Middleware: protect all routes; redirect unauthenticated users to `/login`.
- [ ] Set up `axios` (or `fetch`) instance with JWT interceptor (auto-attach token, auto-refresh on 401).
- [ ] Create `AuthContext` for session state.

---

## Phase 5 — Quotes & Invoices

**Goal:** The core billing flow — the main value of the product.

### 5.1 Backend — Quotes Module

- [ ] `GET /quotes`, `GET /quotes/:id`.
- [ ] `POST /quotes` — create with `QuoteItem[]` in request body.
- [ ] `PATCH /quotes/:id` — update items and status.
- [ ] `POST /quotes/:id/convert-to-invoice` — create Invoice from Quote, copy items.
- [ ] Auto-calculate `subtotal`, `vatAmount`, `total` in service layer (not frontend).

### 5.2 Backend — Invoices Module

- [ ] `GET /invoices`, `GET /invoices/:id`.
- [ ] `POST /invoices` — manual creation (or via quote conversion).
- [ ] `PATCH /invoices/:id/status` — mark as PAID / SENT / CANCELLED.
- [ ] Auto-generate `invoiceNumber` in format: `KM-2024-0001` (sequential per company).

### 5.3 Frontend — Quotes Pages

- [ ] `/quotes/new` — line item builder: add/remove rows, description, qty, unit price; auto-compute VAT (19%) and total.
- [ ] `/quotes/[id]` — view with "Convert to Invoice" button + PDF download button.

### 5.4 Frontend — Invoices Pages

- [ ] `/invoices` — list with status badges (DRAFT / SENT / PAID / CANCELLED).
- [ ] `/invoices/[id]` — view with PDF download + "Mark as Paid" button.

### 5.5 Dashboard Page

- [ ] Show: today's open jobs (count + list), unpaid invoices (count + total), last 5 customers.
- [ ] Fetch via TanStack Query with `staleTime: 60_000`.

---

## Phase 6 — Backend Hardening

**Goal:** Production-grade API behaviour.

### 6.1 Error Handling & Logging

- [ ] Global `HttpExceptionFilter` returning `{ statusCode, message, timestamp, path }`.
- [ ] `LoggingInterceptor` to log all requests with method, path, duration, userId.
- [ ] Use `Pino` for structured JSON logging (`nestjs-pino`).
- [ ] Add request IDs via `X-Request-ID` header.

### 6.2 Mobile-First UI Rules

- [ ] All buttons minimum `h-12` (48px tap target).
- [ ] Bottom navigation bar on mobile (Dashboard, Jobs, Customers, Invoices).
- [ ] Forms single-column on mobile, two-column on `md+`.
- [ ] Test at 390px width (iPhone 14 viewport) throughout.

---

## Phase 7 — File Uploads & PDF Generation

**Goal:** Job photos uploadable. Invoices and quotes downloadable as PDF.

**Tech:** MinIO (S3-compatible), Multer (NestJS), PDFKit or Puppeteer, Sharp

### 7.1 File Upload Service

- [ ] Run MinIO in Docker Compose on port 9000.
- [ ] Add `@aws-sdk/client-s3` to `api-gateway`.
- [ ] `POST /files/upload` endpoint (multipart/form-data).
- [ ] Store file references in a `files` table linked to `jobId`.
- [ ] Validate file types (JPEG, PNG, WEBP only) and max size (10MB).
- [ ] Use `sharp` to resize uploaded photos to max 1600px; thumbnails at 400px.

### 7.2 PDF Generation

- [ ] `GET /invoices/:id/pdf` — generate and stream PDF as `application/pdf`.
- [ ] `GET /quotes/:id/pdf` — same for quotes.
- [ ] PDF must include: company logo placeholder, invoice number, customer data, line items, totals, VAT breakdown.
- [ ] German legal requirements: `Rechnungsnummer`, `Leistungsdatum`, `Steuernummer` / `USt-IdNr`, VAT shown separately.

---

## Phase 8 — AI Service Integration

**Goal:** 3 AI features that showcase LLM engineering for the portfolio.

**Tech:** FastAPI, Python 3.12, LangChain, OpenAI (GPT-4o, Whisper, Vision), Pydantic v2

### 8.1 FastAPI Service Setup

- [ ] Create `ai-service/main.py` with FastAPI app.
- [ ] Install: `fastapi`, `uvicorn`, `openai`, `langchain`, `langchain-openai`, `pydantic`, `python-dotenv`, `httpx`.
- [ ] Add `GET /health` endpoint.
- [ ] The AI service is stateless — no database access. NestJS owns all data.

### 8.2 NestJS AI Proxy Module

- [ ] Create `AiModule` in `api-gateway` with `HttpModule` (`@nestjs/axios`).
- [ ] All AI endpoints go through NestJS (authenticated, validated) and are proxied to FastAPI.
- [ ] FastAPI is NOT exposed to the internet.

### 8.3 Feature 1 — Voice to Job Notes

- [ ] `POST /ai/voice-to-job` (NestJS) → `POST /process/voice` (FastAPI).
- [ ] Accept: audio file (MP3/WEBM). Transcribe with OpenAI **Whisper**.
- [ ] Pass transcript to GPT-4o to extract structured `{ title, description, tasks, materials, priority, suggestedDate }`.
- [ ] Use LangChain `ChatOpenAI` + `JsonOutputParser` + Pydantic model.
- [ ] Frontend: mic button on job form → fills fields on response.

### 8.4 Feature 2 — AI Invoice Item Suggestions

- [ ] `POST /ai/suggest-items` → `POST /process/suggest-items`.
- [ ] Input: `{ jobDescription, jobType? }`. Output: line items with description, qty, unitPrice, unit.
- [ ] GPT-4o with few-shot prompt trained on German Handwerk line items.
- [ ] Frontend: "Suggest Items" button on Quote builder → populates line items table.

### 8.5 Feature 3 — Photo Analysis (Vision)

- [ ] `POST /ai/analyze-photo` → `POST /process/analyze-photo`.
- [ ] Input: image URL (from MinIO) or base64.
- [ ] GPT-4o Vision returns `{ summary, detectedIssues, suggestedTasks, estimatedComplexity }`.
- [ ] Frontend: per-photo "Analyze" button on Job detail page.

### 8.6 AI Engineering Best Practices

- [ ] Log all AI requests: model, tokens, latency, feature — store in `ai_logs` table.
- [ ] Retry logic in FastAPI with exponential backoff for OpenAI rate limits.
- [ ] All prompts wrapped in typed Pydantic models.
- [ ] `POST /ai/feedback` — thumbs-up/down on AI results, stored for future fine-tuning signal.

---

## Phase 9 — Testing

**Goal:** Demonstrate testing discipline.

**Tech:** Jest + Supertest (NestJS), Vitest + React Testing Library (Next.js), Pytest (FastAPI)

- [ ] Unit tests for all NestJS service methods (mock Prisma).
- [ ] Integration tests for auth flow (register → login → refresh → logout).
- [ ] E2E tests for: customers CRUD, quotes create + convert-to-invoice.
- [ ] Use separate `TEST_DATABASE_URL` pointing to test Postgres in Docker.
- [ ] Target: 70%+ coverage on service layer.
- [ ] Component tests for: `QuoteLineItemRow`, `InvoiceStatusBadge`, `CustomerForm`.
- [ ] MSW (`msw`) to mock API calls in frontend tests.
- [ ] FastAPI unit tests with mocked OpenAI client. Test retry logic with simulated rate limit errors.

---

## Phase 10 — Production Hardening

- [ ] `helmet` for HTTP security headers.
- [ ] `@nestjs/throttler` — 100 req/min per IP globally, stricter on `/auth/*`.
- [ ] CORS locked to frontend origin in production.
- [ ] All routes require `JwtAuthGuard` unless explicitly `@Public()`.
- [ ] Structured JSON logs with `nestjs-pino`. Include: `requestId`, `userId`, `companyId`, `method`, `path`, `statusCode`, `duration`.
- [ ] Integrate **Sentry** in both NestJS and Next.js.
- [ ] Log AI usage per company per month (foundation for future billing).
- [ ] Enable `@nestjs/swagger` — OpenAPI docs at `/api/docs`. Add `@ApiProperty()` to all DTOs.

---

## Phase 11 — CI/CD & Deployment

**Tech:** GitHub Actions, Docker, Nginx, Let's Encrypt, Hetzner VPS

- [ ] On every PR: lint, type-check (`tsc --noEmit`), unit tests, build Docker images.
- [ ] On merge to `main`: build & push Docker images to GitHub Container Registry (GHCR).
- [ ] On tag `v*.*.*`: deploy to production via SSH.
- [ ] Single VPS (Hetzner CX21 ~6€/month).
- [ ] `docker-compose.prod.yml` with `restart: always`, no bind mounts, production env vars.
- [ ] Add `infrastructure/` folder with Nginx config + SSL env templates.
- [ ] Nginx: reverse proxy frontend (:80/:443 → :3000), API (:443/api → :4000). FastAPI internal only.
- [ ] Certbot for Let's Encrypt SSL with auto-renew via cron.
- [ ] Three environments: `development` (local Docker), `staging` (VPS subdomain), `production` (main domain).

---

## Phase 12 — Post-MVP Enhancements

Only tackle these after the core app is demo-ready.

- [ ] **12.1 Subscription Billing** — Stripe Checkout + webhook handler.
- [ ] **12.2 Email Notifications** — Resend or AWS SES. Send invoice PDFs via email.
- [ ] **12.3 Calendar Sync** — Google Calendar API. Create events from jobs.
- [ ] **12.4 Offline Support** — Service Worker + IndexedDB for job notes on-site without signal.
- [ ] **12.5 Team Roles** — `ADMIN | WORKER | OFFICE` roles with NestJS `RolesGuard`.
- [ ] **12.6 AI Fine-tuning Pipeline** — Use collected feedback to build a fine-tuning dataset.
- [ ] **12.7 LangChain Agents** — ReAct agent that can query job history.
- [ ] **12.8 WhatsApp Integration** — Twilio API for sending invoice links via WhatsApp.

---

## Portfolio Presentation Checklist

Before sharing with employers:

- [ ] README.md: what the app does, how to run it, architecture diagram, screenshots.
- [ ] Swagger UI live at `/api/docs` on staging.
- [ ] Demo video (Loom): login → create job → voice note → AI fills form → generate invoice → download PDF.
- [ ] GitHub Actions green (CI passing badge in README).
- [ ] Sentry catching errors in production.
- [ ] AI token usage is logged (shows you understand LLM cost management).
- [ ] App is deployed and publicly accessible.

---

## Skills This Project Demonstrates (German Job Market 2024–2025)

| Skill                                   | Where shown |
| --------------------------------------- | ----------- |
| LLM API integration (OpenAI)            | Phase 8     |
| LangChain / prompt engineering          | Phase 8     |
| Structured output from LLMs             | Phase 8     |
| NestJS / TypeScript backend             | Phases 2–5  |
| FastAPI / Python backend                | Phase 8     |
| PostgreSQL + Prisma ORM                 | Phase 4.1   |
| REST API design                         | Phases 2–5  |
| Docker + Docker Compose                 | Phase 1     |
| CI/CD with GitHub Actions               | Phase 11    |
| Multi-tenant SaaS architecture          | Phase 4.2   |
| JWT authentication                      | Phase 4.2   |
| Next.js App Router                      | Phases 2–5  |
| PDF generation                          | Phase 7     |
| File uploads + S3                       | Phase 7     |
| Testing (Jest, Pytest, RTL)             | Phase 9     |
| Production observability (Sentry, Pino) | Phase 10    |
| Deployment (Nginx, VPS, SSL)            | Phase 11    |
