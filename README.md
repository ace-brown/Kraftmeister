# Kraftmeister

**A full-stack SaaS application for German tradespeople (Handwerk) to manage jobs, customers, quotes, and invoices — with an AI layer for voice notes, invoice suggestions, and photo analysis.**

> 🇩🇪 German summary below · Deutsche Zusammenfassung unten

**Live Demo:** _Coming soon_

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
| **CI/CD** | GitHub Actions pipeline (coming) |
| **PDF generation** | German-law-compliant invoice PDFs (coming) |

---

## Stack

**Frontend:** Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · TanStack Query · React Hook Form · Zod

**Backend:** NestJS · TypeScript · Prisma 7 · PostgreSQL · Redis · JWT

**AI Service:** FastAPI · Python 3.12 · LangChain · OpenAI (GPT-4o, Whisper, Vision) · Pydantic v2

**Infrastructure:** Docker · Docker Compose · Nginx (prod) · GitHub Actions

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
| Jobs — create + list | ✅ Done |
| Jobs — detail + edit | 🔧 In progress |
| Customers CRUD | ⏳ Next |
| Auth (JWT + multi-tenancy) | ⏳ Planned |
| Quotes + Invoices | ⏳ Planned |
| AI Service (voice, suggestions, vision) | ⏳ Planned |
| PDF generation (German invoice law) | ⏳ Planned |
| CI/CD + deployment | ⏳ Planned |

---

## Why Handwerk?

The German Handwerk sector has 1 million+ businesses, most still running on paper, WhatsApp, and Word. German invoice law adds real complexity (Steuernummer, USt-IdNr, Leistungsdatum, sequential numbering). It's a technically interesting and underserved market — a good fit for demonstrating both engineering depth and product thinking.

---

---

## 🇩🇪 Deutsche Zusammenfassung

**Kraftmeister** ist eine Full-Stack-SaaS-Anwendung für Handwerksbetriebe zur Verwaltung von Aufträgen, Kunden, Angeboten und Rechnungen — ergänzt durch KI-Funktionen für Sprachnotizen, Positionsvorschläge und Fotoanalyse.

Das Projekt dient als Portfolio-Projekt und demonstriert den Tech-Stack, der von deutschen Startups und Scale-ups gesucht wird: Next.js, NestJS, FastAPI, LangChain, OpenAI, Docker und PostgreSQL.

**Lokaler Start:** `docker compose up` — danach läuft die Anwendung unter `http://localhost:3000`.
