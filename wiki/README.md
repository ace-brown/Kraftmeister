## Project Overview

I am building a SaaS web app for small Handwerk businesses (Germany/EU market), targeting solo workers and small teams (1–50 employees) like electricians, plumbers, and carpenters.

The goal is to reduce administrative work after physical jobs by digitizing:

- job management
- quotes and invoices
- customer CRM
- AI-assisted automation

---

## Core Product Idea

A mobile-first web app (PWA) where craftsmen can:

### 1. Job Management

- Create jobs with address, notes, photos
- Track status: open → in progress → done
- Simple calendar scheduling

### 2. Quotes & Invoices

- Generate quotes on-site from mobile
- Convert quote → invoice in one click
- Export PDF invoices (GoBD-compliant structure later)
- Include SEPA/bank details

### 3. Customer Management (CRM)

- Store customer data
- Track job history
- Basic messaging/notes system

### 4. AI Features (core differentiation)

- Convert voice notes → structured job/quote
- Extract tasks from photos
- Suggest pricing based on job type
- Auto-generate invoice line items

---

## Current Tech Stack

### Frontend

- Next.js (React, TypeScript)
- Tailwind CSS
- shadcn/ui
- PWA-first design (mobile optimized)

### Backend (Microservices setup)

- NestJS API Gateway (main backend)
- FastAPI Python AI service

### Infrastructure

- Docker (all services containerized)
- Docker Compose (local orchestration)
- GitHub Actions (CI/CD pipeline)

### Data

- PostgreSQL (main database)
- Redis (cache + queues)

---

## Current Architecture

```
Frontend (Next.js PWA)
        ↓
API Gateway (NestJS)
        ↓
AI Service (FastAPI)
        ↓
PostgreSQL + Redis
```

All services communicate via Docker internal networking.

---

## Dev Setup Status

- Frontend already initialized
- Backend services being set up
- Docker Compose is being introduced from early stage
- Goal is production-style architecture from day 1 (not toy project)

---

## My Goals for This Project

- Build a strong portfolio project for Fullstack AI Engineer roles in Germany
- Learn real-world microservices architecture
- Learn Docker + CI/CD + backend design
- Show production-level SaaS thinking
- Eventually deploy a real MVP

---

## Constraints / Preferences

- Prefer simple but scalable architecture
- Avoid overengineering (no Kubernetes yet)
- Use TypeScript heavily
- Python only for AI-related services
- Keep system understandable for solo developer

---

## What I want help with

When I ask questions, help me with:

- architecture decisions
- backend/frontend implementation
- Docker + CI/CD setup
- microservices communication
- AI integration design
- best practices for production SaaS
- debugging setup issues

---

# ROOT STRUCTURE

```text id="root1"
Kraftmeister/
│
├── frontend/                # Next.js PWA (mobile-first app)
├── api-gateway/            # NestJS main backend
├── ai-service/             # FastAPI (AI logic)
│
├── services/               # optional future microservices
│
├── infrastructure/         # infra configs (docker, nginx, etc.)
├── scripts/                # dev/utility scripts
│
├── docker-compose.yml      # local orchestration
├── .env                    # global env vars
├── .gitignore
├── README.md
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

# 🎨 FRONTEND (Next.js PWA)

```text id="frontend1"
frontend/
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   ├── customers/
│   │   ├── invoices/
│   │   └── layout.tsx
│   │
│   ├── components/        # reusable UI components
│   ├── features/          # domain-based logic (VERY IMPORTANT)
│   │   ├── jobs/
│   │   ├── customers/
│   │   ├── invoices/
│   │   └── ai/
│   │
│   ├── lib/               # helpers (api client, utils)
│   ├── store/             # state management (if needed)
│   └── styles/
│
├── public/
├── Dockerfile
├── next.config.js
└── package.json
```

---

# ⚙️ API GATEWAY (NestJS)

This is your main backend (auth, business logic, routing).

```text id="backend1"
api-gateway/
│
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── jobs/
│   │   ├── customers/
│   │   ├── invoices/
│   │   ├── ai-proxy/        # calls AI service
│   │
│   ├── common/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── decorators/
│   │   ├── filters/
│   │
│   ├── config/
│   ├── database/
│   ├── main.ts
│
├── test/
├── Dockerfile
├── nest-cli.json
└── package.json
```

---

# 🤖 AI SERVICE (FastAPI)

This handles:

- voice → text
- image → job extraction
- quote generation
- pricing suggestions

```text id="ai1"
ai-service/
│
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── voice.py
│   │   │   ├── vision.py
│   │   │   ├── quotes.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── llm_client.py
│   │
│   ├── services/
│   │   ├── transcription.py
│   │   ├── pricing.py
│   │   ├── extraction.py
│   │
│   ├── main.py
│
├── models/
├── Dockerfile
├── requirements.txt
└── README.md
```

---

# 🧩 INFRASTRUCTURE

```text id="infra1"
infrastructure/
│
├── nginx/
│   └── default.conf
│
├── postgres/
│   └── init.sql
│
├── redis/
│
└── docker/
    ├── frontend.Dockerfile
    ├── gateway.Dockerfile
    └── ai.Dockerfile
```

---

# 🐳 DOCKER COMPOSE (ROOT)

This is your orchestration layer:

```text id="docker1"
docker-compose.yml
```

Will later include:

- frontend
- api-gateway
- ai-service
- postgres
- redis

---

# 🔁 SERVICES (future scaling)

```text id="services1"
services/
│
├── notification-service/   # WhatsApp/email/SMS
├── pdf-service/            # invoice generation
├── file-service/           # uploads/images
└── analytics-service/      # usage tracking
```
