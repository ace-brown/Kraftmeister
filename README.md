# Kraftmeister

**A full-stack SaaS application for German tradespeople (Handwerk) to manage jobs, customers, quotes, and invoices — with an AI layer for voice notes, invoice suggestions, and photo analysis.**

> 🇩🇪 German summary below · Deutsche Zusammenfassung unten

**Live Demo:** [kraftmeister.org](http://kraftmeister.org)  
**API Docs:** [kraftmeister.org/api/docs](http://kraftmeister.org/api/docs)

---

## What This Project Demonstrates

This is a portfolio project built to demonstrate the full-stack + LLM engineering skills relevant to the **German startup and scale-up market (2024–2025)**:

| Skill | Implementation |
|---|---|
| **LLM integration (OpenAI)** | Voice → job notes, AI invoice suggestions, photo analysis |
| **LangChain + prompt engineering** | Structured output via Pydantic + ChatPromptTemplate |
| **NestJS / TypeScript backend** | REST API with Prisma ORM, multi-tenant architecture |
| **FastAPI / Python AI service** | Stateless microservice, proxied through NestJS |
| **Next.js 16 (App Router)** | Mobile-first frontend, TanStack Query, React Hook Form, Zod |
| **PostgreSQL + Prisma 7** | Relational schema, migrations, driver adapter pattern |
| **Docker + Docker Compose** | Full local dev environment, one command to boot |
| **JWT authentication** | Access + refresh token flow, Redis token store |
| **CI/CD** | GitHub Actions — type-check, build, lint on every PR |
| **Production deployment** | Hetzner VPS · Docker Compose · Nginx · [kraftmeister.org](http://kraftmeister.org) |
| **PDF generation** | German-law-compliant invoice PDFs |

---

## Stack

**Frontend:** Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · TanStack Query · React Hook Form · Zod

**Backend:** NestJS · TypeScript · Prisma 7 · PostgreSQL · Redis · JWT

**AI Service:** FastAPI · Python 3.12 · LangChain · OpenAI (GPT-4o, Whisper, Vision) · Pydantic v2

**Infrastructure:** Docker · Docker Compose · Nginx (prod) · GitHub Actions

---

## Who Uses This App

Kraftmeister is a **B2B tool for the tradesperson**, not their clients. Only the company (e.g. a plumbing business) registers and logs in. Their customers never touch the app — they only receive PDFs by email or WhatsApp.

**Example — Mr Smith's Plumbing Company:**

1. A client calls about broken pipes → Mr Smith opens Kraftmeister and adds the client to his Customers list (name, phone, address)
2. He creates a **Job**: "Fix pipes at 12 Baker St"
3. He builds a **Quote** with line items — Labor: 3h × €50, New pipe: €30, Total: €180 + 19% VAT — downloads it as a PDF and sends it to the client
4. Client agrees → Mr Smith clicks "Convert to Invoice" → downloads the PDF invoice → client pays
5. Mr Smith marks the invoice as **PAID**

The app replaces a paper notebook, an Excel spreadsheet, and Word invoice templates — all in one place.

---

## Core User Journey

```
Customer → Job → Quote → Invoice → PDF Download
```

With AI shortcuts at every step:
- 🎤 Speak job notes on-site → AI fills the form
- 🤖 Describe a job → AI suggests German Handwerk line items and pricing
- 📸 Upload a site photo → AI identifies issues and suggests tasks

---

## Running Locally

**Prerequisites:** Docker + Docker Compose

```bash
git clone <repo-url>
cd Kraftmeister
docker compose up
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API Gateway | http://localhost:4000 |
| API Docs (Swagger) | http://localhost:4000/api/docs |
| AI Service | http://localhost:8000 |

---

## Project Structure

```
kraftmeister/
├── frontend/        # Next.js 16 (App Router)
├── api-gateway/     # NestJS REST API
├── ai-service/      # FastAPI AI microservice
└── docker-compose.yml
```

---

## Current Build Status

| Feature | Status |
|---|---|
| Docker Compose environment | ✅ Done |
| Jobs, Customers, Quotes, Invoices CRUD | ✅ Done |
| JWT auth + multi-tenancy | ✅ Done |
| File uploads + PDF generation | ✅ Done |
| AI Service — voice, suggestions, photo analysis | ✅ Done |
| Production hardening (helmet, throttler, Sentry, Swagger) | ✅ Done |
| CI/CD + deployment | ✅ Done — live at [kraftmeister.org](http://kraftmeister.org) |

---

## Why Handwerk?

The German Handwerk sector has 1 million+ businesses, most still running on paper, WhatsApp, and Word. German invoice law adds real complexity (Steuernummer, USt-IdNr, Leistungsdatum, sequential numbering). It's a technically interesting and underserved market — a good fit for demonstrating both engineering depth and product thinking.

---

---

## 🇩🇪 Deutsche Zusammenfassung

**Kraftmeister** ist eine Full-Stack-SaaS-Anwendung für Handwerksbetriebe zur Verwaltung von Aufträgen, Kunden, Angeboten und Rechnungen — ergänzt durch KI-Funktionen für Sprachnotizen, Positionsvorschläge und Fotoanalyse.

Das Projekt dient als Portfolio-Projekt und demonstriert den Tech-Stack, der von deutschen Startups und Scale-ups gesucht wird: Next.js, NestJS, FastAPI, LangChain, OpenAI, Docker und PostgreSQL.

**Live:** [kraftmeister.org](http://kraftmeister.org)

**Lokaler Start:** `docker compose up` — danach läuft die Anwendung unter `http://localhost:3000`.
