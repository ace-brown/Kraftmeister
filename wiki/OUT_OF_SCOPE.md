# Kraftmeister — MVP Out of Scope

> If you catch yourself building any of the below, stop. Ship the core first.

---

## Explicitly Out of Scope for MVP

### Auth & Users
- No team roles (ADMIN / WORKER / OFFICE) — single user per company only
- No employee accounts or worker assignment to jobs
- No invite system
- No social login (Google, Apple)

### Communication
- No email sending (invoices, quotes sent manually by the user)
- No WhatsApp integration
- No SMS notifications
- No in-app messaging

### Scheduling & Calendar
- No calendar view for jobs
- No Google/Outlook calendar sync
- No appointment booking for customers
- No recurring jobs

### Billing & Payments
- No subscription billing (Stripe) for the SaaS itself
- No online payment link on invoices (SEPA, PayPal, Stripe)
- No partial payments or installment tracking
- No DATEV or accounting software export

### Customers
- No customer portal (customers cannot log in)
- No customer-facing quote acceptance flow
- No automated overdue reminders

### Analytics & Reporting
- No revenue dashboard or charts
- No monthly/yearly earnings reports
- No job profitability tracking
- No AI cost tracking per user (post-MVP billing signal)

### Infrastructure
- No multi-region deployment
- No mobile app (iOS / Android) — mobile-first web only
- No offline mode / Service Worker
- No real-time updates (WebSockets)

### AI
- No fine-tuning pipeline
- No LangChain agents or multi-step reasoning
- No RAG / vector search over job history
- No AI-generated customer replies or templates

### Misc
- No dark mode
- No multi-language support (German only)
- No white-labelling for resellers
- No API for third-party integrations
- No audit log / change history

---

## The Rule

> **If it's not on the core flow — Customer → Job → Quote → Invoice → PDF — it does not exist yet.**

When in doubt, open `USER_JOURNEY.md` and ask: does this feature appear in the happy path? If no, add it to `SPEC.md` Phase 12 and move on.
