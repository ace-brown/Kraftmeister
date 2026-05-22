# Kraftmeister — Product Brief

---

## What is Kraftmeister?

Kraftmeister is a SaaS web app for German tradespeople (*Handwerker*) — plumbers, electricians, painters, and similar — to manage their entire job lifecycle in one place: from the first customer call to the paid invoice.

The name reflects the target user: **Kraft** (strength, power) + **Meister** (master tradesperson, a formal German qualification). It's software built for people who master their trade but shouldn't have to master paperwork.

---

## Who Uses It?

**Primary users:**
- **Solo tradesperson** — one person running their own business, wearing every hat: worker, salesperson, accountant.
- **Small Handwerk company** — an owner with 2–10 workers. Often an office admin or the owner's partner handles scheduling and billing while workers are on-site.

**What they have in common:**
- Time-poor and on-site most of the day
- Not tech-savvy — they need something that just works on mobile
- Operate under German tax law (VAT requirements, invoice numbering, Steuernummer)
- Currently managing everything on paper, WhatsApp, Excel, or Word

---

## The Problem

Three problems, all connected:

1. **Paper chaos** — Jobs are tracked in notebooks or memory. Quotes are written by hand or copy-pasted from old Word files. Nothing is searchable or linked.

2. **Slow invoicing** — After finishing a job, creating and sending an invoice takes hours. The delay hurts cash flow. Some invoices never get sent at all.

3. **No overview** — There's no single place to see: what's open, what's in progress, what's waiting on payment. Things fall through the cracks.

The result: tradespeople lose money — either through forgotten invoices, underquoting, or time wasted on admin instead of billable work.

---

## What Kraftmeister Does (MVP)

A single workflow: **Customer → Job → Quote → Invoice → PDF**

| Step | What happens |
|---|---|
| Customer | Store customer contact info, see their full history |
| Job | Create a job for a customer, track status, add photos on-site |
| Quote | Build a line-item quote, auto-calculate VAT (19%), send to customer |
| Invoice | Convert quote to invoice, auto-number it (KM-2024-0001), mark as paid |
| PDF | Download a legally compliant German invoice PDF at any time |

**AI layer (differentiator):**
- Speak job notes into the phone → AI fills the job form
- Describe a job → AI suggests invoice line items based on German Handwerk pricing
- Upload a site photo → AI identifies issues and suggests tasks

---

## What It Is NOT (MVP Scope)

- No calendar or scheduling
- No WhatsApp integration
- No team permissions or role management
- No accounting software sync (DATEV, etc.)
- No subscription billing for end users
- No mobile app (mobile-first web only)

---

## Why It Exists (Portfolio Angle)

Kraftmeister is built as a portfolio project demonstrating full-stack LLM engineering for the German job market. The tech stack mirrors what German startups and scale-ups hire for: Next.js, NestJS, Prisma, FastAPI, LangChain, OpenAI, Docker, PostgreSQL.

The Handwerk market is specifically chosen because:
- 1 million+ Handwerk businesses in Germany
- Massively underserved by modern software
- German legal requirements (VAT, invoice law) add real-world complexity that interviewers respect
