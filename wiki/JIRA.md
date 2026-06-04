Kraftmeister — Jira Backlog

Copy each ticket into Jira. Epic links are shown as [EPIC] tags.
Priority: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

Epic: KM-INFRA — Infrastructure & DevOps

---

KM-1 · Set up CD pipeline (auto-deploy on push to main)
Type: Task · Priority: 🟠 High · Epic: KM-INFRA

Description:
Currently CI runs on every PR but there is no automatic deployment. Every production deploy requires manual SSH. Set up a GitHub Actions workflow that deploys to the Hetzner server on every merge to main.

Steps:
1. Generate a dedicated SSH key pair for GitHub Actions: ssh-keygen -t ed25519 -C "github-actions"
2. Add the public key to /root/.ssh/authorized_keys on the server
3. Add the private key as a GitHub secret: SSH_PRIVATE_KEY
4. Add SSH_HOST=167.233.34.251 and SSH_USER=root as GitHub secrets
5. Create .github/workflows/deploy.yml that triggers on push to main
6. The deploy job should: SSH into server → git pull → export $(grep -v '^#' .env.prod | xargs) → docker-compose -f docker-compose.prod.yml up -d --build

Verification:
- Merge a trivial change to main (e.g. update README)
- Confirm GitHub Actions deploy job passes
- Confirm the change is live at https://kraftmeister.org without manual SSH

---

KM-2 · SSL certificate with Let's Encrypt (HTTPS)
Type: Task · Priority: 🔴 Critical · Epic: KM-INFRA

Description:
The site runs on HTTP. Browsers block sensitive features (microphone for voice recording, COOP headers) on non-HTTPS origins. Certbot must be configured for kraftmeister.org.

Steps:
1. Run: certbot --nginx -d kraftmeister.org -d www.kraftmeister.org
2. Follow prompts, choose redirect HTTP → HTTPS
3. Verify auto-renew: certbot renew --dry-run
4. Update .env.prod: CORS_ORIGIN=https://kraftmeister.org
5. Update NEXT_PUBLIC_API_URL=https://kraftmeister.org/api
6. Rebuild frontend with new env vars
7. Update README links from http:// to https://

Verification:
- https://kraftmeister.org loads with valid padlock
- http://kraftmeister.org redirects to HTTPS
- Mic button on job form works (requires HTTPS)
- certbot renew --dry-run returns success

---

KM-3 · Fix Swagger UI at /api/docs in production
Type: Bug · Priority: 🟡 Medium · Epic: KM-INFRA

Description:
https://kraftmeister.org/api/docs returns nothing. The Nginx /api/ rewrite strips the prefix before forwarding to NestJS, so NestJS never sees /api/docs.

Steps:
1. Add a dedicated Nginx location block for /api/docs that proxies directly without rewriting
2. Place it before the /api/ catch-all block

Verification:
- https://kraftmeister.org/api/docs loads Swagger UI
- All endpoints are listed
- Authorize button accepts a JWT and protected endpoints return data

---

KM-4 · Add @ApiProperty() to all DTOs
Type: Task · Priority: 🟢 Low · Epic: KM-INFRA

Description:
Swagger currently shows empty request/response schemas because DTOs have no @ApiProperty() decorators. Adding them makes the API docs useful for employers exploring the Swagger UI.

Steps:
1. Add @ApiProperty() to every field in all DTOs under api-gateway/src/modules/*/dtos/
2. Add @ApiTags('auth'), @ApiTags('jobs') etc. to each controller

Verification:
- Swagger UI shows full request body schemas for every endpoint
- Response schemas are documented

---

Epic: KM-TEST — Testing

---

KM-5 · NestJS unit tests for service layer
Type: Story · Priority: 🟠 High · Epic: KM-TEST

Description:
No unit tests exist. Add Jest tests for all NestJS service methods with Prisma mocked. Target 70%+ coverage on the service layer.

Steps:
1. Install test deps: @nestjs/testing, jest, @types/jest
2. Add a TEST_DATABASE_URL in .env.test pointing to a test Postgres container
3. Write tests for: JobsService, CustomersService, QuotesService, InvoicesService, AuthService
4. Mock PrismaService using jest.mock()
5. Add npm run test to the CI workflow

Verification:
- npm run test passes with no failures
- Coverage report shows 70%+ on service files
- CI job goes green

---

KM-6 · Integration tests for auth flow
Type: Story · Priority: 🟠 High · Epic: KM-TEST

Description:
Test the full auth lifecycle: register → login → access protected route → refresh token → logout.

Steps:
1. Use Supertest with a real test database
2. Test: POST /auth/register creates company + user
3. Test: POST /auth/login returns access + refresh tokens
4. Test: protected route returns 401 without token
5. Test: POST /auth/refresh issues new token pair
6. Test: POST /auth/logout invalidates refresh token

Verification:
- All 6 tests pass
- Refresh token is actually deleted from Redis after logout (verify with redis-cli)

---

KM-7 · Frontend component tests
Type: Story · Priority: 🟡 Medium · Epic: KM-TEST

Description:
Add React Testing Library + MSW tests for key UI components.

Steps:
1. Install: vitest, @testing-library/react, msw
2. Write tests for: QuoteForm (line item add/remove), InvoiceStatusBadge (correct colour per status), CustomerForm (validation errors)
3. Mock API calls with MSW handlers

Verification:
- npm run test passes in the frontend
- MSW intercepts API calls correctly (no real network requests in tests)

---

KM-8 · FastAPI unit tests
Type: Story · Priority: 🟡 Medium · Epic: KM-TEST

Description:
Add Pytest tests for the AI service with mocked Anthropic and OpenAI clients.

Steps:
1. Install: pytest, pytest-asyncio, httpx
2. Mock anthropic.AsyncAnthropic and openai.AsyncOpenAI
3. Test each route: /process/voice, /process/suggest-items, /process/analyze-photo
4. Simulate a rate limit error (429) and verify tenacity retries 3 times
5. Add pytest to the CI workflow for ai-service

Verification:
- All tests pass with mocked clients
- Retry test confirms 3 attempts before raising
- CI ai-service job goes green

---

Epic: KM-AI — AI Enhancements

---

KM-9 · Fix token count tracking (replace tokens: 0 placeholder)
Type: Bug · Priority: 🟡 Medium · Epic: KM-AI

Description:
All AiLog records are saved with tokens: 0. Real token counts are available in LangChain's response metadata but are not being returned to NestJS.

Steps:
1. In claude.py, after each chain.ainvoke(), extract token usage from the LangChain response metadata
2. Return token counts alongside the AI result from each FastAPI endpoint
3. Update the response schemas in ai_schemas.py to include inputTokens: int and outputTokens: int
4. Update NestJS AiService to read these values and store them in AiLog

Verification:
- Call POST /ai/suggest-items and check the ai_logs table in the database
- tokens column should have a non-zero value
- Token count matches what the Anthropic dashboard reports

---

KM-10 · LangChain ReAct agent for job history queries
Type: Story · Priority: 🟢 Low · Epic: KM-AI

Description:
A conversational agent that can answer questions about the company's job history using LangChain's ReAct pattern. E.g. "How many open jobs do I have this week?" or "Which customer had the most jobs last month?"

Steps:
1. Add POST /ai/agent endpoint to FastAPI
2. Create a LangChain ReAct agent with tools that call back to NestJS (GET /jobs, GET /customers, GET /invoices)
3. Add POST /ai/agent proxy in NestJS AiController
4. Add a chat UI component in the frontend dashboard

Verification:
- Query "How many open jobs?" returns a correct count matching the database
- Agent uses the correct tool (GET /jobs with status=OPEN filter)
- Response is in German

---

KM-11 · AI fine-tuning data pipeline
Type: Story · Priority: 🟢 Low · Epic: KM-AI

Description:
Use collected AiFeedback records (thumbs up/down) to build a fine-tuning dataset. Export feedback-linked AI inputs/outputs as JSONL for future OpenAI or Anthropic fine-tuning.

Steps:
1. Add inputSnapshot and outputSnapshot text fields to AiFeedback Prisma model
2. When saving feedback, also save the original AI input and output
3. Create GET /ai/feedback/export endpoint that returns JSONL of positive feedback records
4. Document the fine-tuning pipeline in wiki/AI_FINETUNING.md

Verification:
- Submit thumbs-up on a suggestion, call export endpoint
- JSONL output contains the original prompt and response
- Format is compatible with OpenAI fine-tuning API

---

Epic: KM-FEAT — New Features

---

KM-12 · Email notifications (send invoice PDF via email)
Type: Story · Priority: 🟠 High · Epic: KM-FEAT

Description:
Tradespeople need to send invoice PDFs directly to customers by email without leaving the app.
Tech: Resend (simpler) or AWS SES

Steps:
1. Sign up for Resend, get API key
2. Install resend in api-gateway
3. Create EmailModule with EmailService.sendInvoice(invoiceId, recipientEmail)
4. Add POST /invoices/:id/send endpoint
5. Frontend: add "Send by Email" button on invoice detail page with email input dialog

Verification:
- Click "Send by Email" on an invoice
- Email arrives with PDF attachment
- Invoice status changes to SENT automatically

---

KM-13 · Subscription billing with Stripe
Type: Story · Priority: 🟠 High · Epic: KM-FEAT

Description:
Monetise the app. Companies pay a monthly subscription to use Kraftmeister.

Steps:
1. Create Stripe account, get API keys
2. Install stripe in api-gateway
3. Add SubscriptionModule with POST /billing/checkout → Stripe Checkout session
4. Add Stripe webhook handler POST /billing/webhook for subscription events
5. Add subscriptionStatus field to Company model
6. Gate features behind active subscription using a NestJS guard
7. Add billing page to frontend

Verification:
- Use Stripe test mode: complete checkout with card 4242 4242 4242 4242
- Webhook updates subscriptionStatus to ACTIVE
- After subscription expires (test clock), features are gated

---

KM-14 · Team roles (ADMIN / WORKER / OFFICE)
Type: Story · Priority: 🟡 Medium · Epic: KM-FEAT

Description:
Currently all users are ADMIN. Add role-based access: WORKER can only see/edit jobs, OFFICE can manage customers and invoices but not billing.

Steps:
1. User.role already has ADMIN | WORKER — add OFFICE
2. Create RolesGuard and @Roles() decorator in NestJS
3. Apply role restrictions per endpoint
4. Frontend: hide UI elements based on role from JWT claims
5. Add user management page for ADMIN to invite and assign roles

Verification:
- WORKER user cannot access /invoices or /customers
- OFFICE user cannot access /billing
- ADMIN can change a user's role

---

KM-15 · Google Calendar sync
Type: Story · Priority: 🟡 Medium · Epic: KM-FEAT

Description:
Create a Google Calendar event automatically when a job is created or updated with a date.

Steps:
1. Set up Google Cloud project, enable Calendar API, get OAuth credentials
2. Add OAuth flow to frontend (Google login for calendar permission)
3. Store refresh token per user in database
4. Add CalendarService in NestJS that creates/updates events via Google API
5. Hook into job create/update to sync calendar

Verification:
- Create a job with a date → event appears in Google Calendar
- Update job date → calendar event updates
- Delete job → calendar event is removed

---

KM-16 · WhatsApp invoice links via Twilio
Type: Story · Priority: 🟢 Low · Epic: KM-FEAT

Description:
Send a WhatsApp message to the customer with a link to view/download their invoice.

Steps:
1. Set up Twilio account with WhatsApp sandbox
2. Install twilio in api-gateway
3. Add POST /invoices/:id/whatsapp endpoint
4. Frontend: add "Send via WhatsApp" button on invoice detail (phone number input)

Verification:
- Click "Send via WhatsApp" on an invoice
- WhatsApp message arrives on test phone with invoice link

---

KM-17 · Offline support (Service Worker + IndexedDB)
Type: Story · Priority: 🟢 Low · Epic: KM-FEAT

Description:
Tradespeople often work on sites without good signal. Allow creating job notes offline that sync when connectivity returns.

Steps:
1. Add next-pwa to frontend
2. Configure Service Worker to cache app shell
3. Use IndexedDB (via idb) to queue job note drafts offline
4. Sync queue to API when connection is restored
5. Add offline indicator to the UI

Verification:
- Open app, go offline (DevTools → Network → Offline)
- Create a job note → it saves locally
- Go back online → note syncs and appears in the database

---

Epic: KM-PORTFOLIO — Portfolio Presentation

---

KM-18 · Record Loom demo video
Type: Task · Priority: 🔴 Critical · Epic: KM-PORTFOLIO

Description:
A demo video is essential for the portfolio. Employers watch the video before reading code.

Script:
1. Login (10s)
2. Create a customer (15s)
3. Create a job — use the mic button, AI fills the form (20s)
4. Create a quote — use "Suggest Items", AI populates line items (20s)
5. Convert quote to invoice, download PDF (15s)
6. Mark invoice as paid (10s)
7. Show Swagger UI at /api/docs (10s)

Verification:
- Video is under 2 minutes
- All AI features are visible
- Link added to README

---

KM-19 · Add architecture diagram to README
Type: Task · Priority: 🟡 Medium · Epic: KM-PORTFOLIO

Description:
A visual architecture diagram helps employers understand the system at a glance.

Steps:
1. Create a diagram (use Excalidraw or draw.io) showing: Browser → Nginx → Next.js → NestJS → Prisma → PostgreSQL, and NestJS → FastAPI → Anthropic/OpenAI
2. Export as PNG and add to wiki/architecture.png
3. Embed in README

Verification:
- Diagram is visible in GitHub README preview
- All services and connections are labeled

---

KM-20 · Add CI passing badge to README
Type: Task · Priority: 🟡 Medium · Epic: KM-PORTFOLIO

Description:
A green CI badge in the README signals code quality to employers instantly.

Steps:
1. Go to GitHub → Actions → CI workflow → ... menu → Create status badge
2. Copy the Markdown badge and add it to the top of README.md

Verification:
- Badge is visible in README
- Badge shows green after a successful CI run

---
