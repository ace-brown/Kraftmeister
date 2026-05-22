# Kraftmeister — MVP User Journey

**Core flow:** Customer → Job → Quote → Invoice → PDF

---

## Full Flow Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  CUSTOMER   │────▶│     JOB     │────▶│    QUOTE    │────▶│   INVOICE   │────▶│     PDF     │
│             │     │             │     │             │     │             │     │             │
│ Who is it?  │     │ What to do? │     │ How much?   │     │ Bill sent?  │     │ Download &  │
│             │     │             │     │             │     │             │     │ archive     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

---

## Step-by-Step

### 1 — Customer

**Trigger:** A new person calls or messages to request work.

**User does:**
- Opens `/customers/new`
- Enters: name, phone, email, address
- Saves

**System does:**
- Creates customer record
- Customer is now selectable on job forms

**Data created:** `Customer { name, phone, email, address }`

**Variants:**
- Returning customer → search existing list, select, skip creation
- Walk-in / quick job → customer can be added later and linked to job

---

### 2 — Job

**Trigger:** Work is agreed upon. Tradesperson needs to track it.

**User does:**
- Opens `/jobs/new`
- Selects customer (or creates one inline)
- Enters: title, description, address (if different from customer), status
- Optionally speaks job notes via mic → AI fills form fields
- Saves

**System does:**
- Creates job linked to customer
- Status defaults to `OPEN`

**Data created:** `Job { customerId, title, description, address, status: OPEN }`

**On-site later:**
- User opens job on mobile
- Uploads photos from site
- Optionally: taps "Analyze photo" → AI returns issues + suggested tasks
- Updates status to `IN_PROGRESS`

**Status transitions:**
```
OPEN → IN_PROGRESS → DONE
              └──────────→ CANCELLED
```

---

### 3 — Quote

**Trigger:** Job scope is clear. Tradesperson wants to send a price.

**User does:**
- From job detail page → taps "Create Quote"
- Lands on `/quotes/new` (pre-linked to job)
- Adds line items: description, quantity, unit price
- Optionally: taps "Suggest Items" → AI pre-fills line items based on job description
- Reviews auto-calculated subtotal, VAT (19%), total
- Saves + sends to customer (email — post-MVP)

**System does:**
- Creates quote with items
- Calculates: `subtotal`, `vatAmount (19%)`, `total` server-side
- Status: `DRAFT` → `SENT`

**Data created:**
```
Quote { jobId, customerId, status: DRAFT }
  └── QuoteItem[] { description, quantity, unitPrice }
```

**Variants:**
- Customer accepts → proceed to invoice
- Customer negotiates → edit quote, re-send
- Customer declines → mark quote `CANCELLED`

---

### 4 — Invoice

**Trigger:** Customer accepts the quote. Time to bill.

**User does:**
- From quote detail page → taps "Convert to Invoice"
- Reviews invoice (pre-filled from quote)
- Confirms

**System does:**
- Creates invoice copied from quote items
- Auto-generates invoice number: `KM-2024-0001` (sequential per company)
- Sets status: `DRAFT` → `SENT`
- Sets due date (default: 14 days)

**Data created:**
```
Invoice { quoteId, customerId, invoiceNumber, status: DRAFT, dueDate }
  └── InvoiceItem[] { description, quantity, unitPrice, vatRate }
```

**Status transitions:**
```
DRAFT → SENT → PAID
          └──→ CANCELLED
```

**Variants:**
- Manual invoice (no quote) → user creates invoice directly at `/invoices/new`
- Partial payment → post-MVP
- Overdue reminder → post-MVP

---

### 5 — PDF

**Trigger:** Invoice needs to be shared with customer or archived.

**User does:**
- From invoice detail page → taps "Download PDF"

**System does:**
- Generates PDF on-demand
- Streams as `application/pdf`

**PDF contains (German legal requirements):**
- Company name, address, Steuernummer / USt-IdNr
- Customer name + address
- Invoice number (`Rechnungsnummer`)
- Service date (`Leistungsdatum`)
- Line items table with quantity, unit price, VAT rate
- Subtotal, VAT amount (shown separately), total
- Payment details + due date

**Variants:**
- Quote PDF → same flow from `/quotes/:id` → "Download PDF"

---

## AI Touchpoints Summary

| Step | AI Feature | How triggered |
|---|---|---|
| Job creation | Voice → job notes (Whisper + GPT-4o) | Mic button on job form |
| Job detail | Photo analysis (GPT-4o Vision) | "Analyze" button per photo |
| Quote creation | Invoice item suggestions (GPT-4o) | "Suggest Items" button |

---

## Happy Path (Fastest Route)

```
1. Search customer (or create in 10 seconds)
2. New job → speak description into mic → AI fills form → save
3. New quote → tap "Suggest Items" → AI fills line items → confirm → save
4. Convert to invoice → one tap
5. Download PDF → send to customer via WhatsApp (manually, for now)

Total time target: under 5 minutes from job agreed to invoice sent.
```

---

## Edge Cases (MVP must handle)

| Case | Handling |
|---|---|
| Job with no customer yet | Allow saving job with customer TBD, link later |
| Quote rejected by customer | Mark as `CANCELLED`, job stays `OPEN` for re-quote |
| Invoice created without a quote | Manual invoice creation at `/invoices/new` |
| Job cancelled mid-way | Status → `CANCELLED`, no invoice created |
| Duplicate invoice number | Auto-increment guaranteed server-side, no duplicates |
