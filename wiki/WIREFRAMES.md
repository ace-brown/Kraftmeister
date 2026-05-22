# Kraftmeister — Wireframes

> ASCII wireframes for screens not yet built. Serves as build reference.
> Already-built screens (Jobs list, Job form) are skipped — code is the source of truth.

---

## Dashboard `/dashboard`

```
┌─────────────────────────────────────────────────────────────┐
│  Kraftmeister                              [Profile] [Logout]│
├──────────┬──────────────────────────────────────────────────┤
│          │                                                    │
│ Dashboard│  Good morning! 👋                                 │
│ Jobs     │                                                    │
│ Customers│  ┌─────────────────┐  ┌─────────────────┐        │
│ Quotes   │  │  Open Jobs      │  │  Unpaid Invoices │        │
│ Invoices │  │                 │  │                  │        │
│ Settings │  │      12         │  │    € 4.820,00    │        │
│          │  │  jobs today     │  │   3 invoices     │        │
│          │  └─────────────────┘  └─────────────────┘        │
│          │                                                    │
│          │  Recent Jobs                        [+ New Job]   │
│          │  ┌───────────────────────────────────────────┐    │
│          │  │ 🔵 Kitchen sink repair  · Müller · TODAY  │    │
│          │  │ 🟡 Bathroom tiles       · Schmidt · OPEN  │    │
│          │  │ 🟡 Heating system       · Weber · OPEN    │    │
│          │  │ ✅ Window replacement   · Klein · DONE    │    │
│          │  │                              [View all →] │    │
│          │  └───────────────────────────────────────────┘    │
│          │                                                    │
│          │  Recent Customers                                  │
│          │  ┌───────────────────────────────────────────┐    │
│          │  │ Thomas Müller    · 0151 123 456            │    │
│          │  │ Anna Schmidt     · 0176 987 654            │    │
│          │  │ Klaus Weber      · 0160 555 333            │    │
│          │  └───────────────────────────────────────────┘    │
│          │                                                    │
└──────────┴──────────────────────────────────────────────────┘

── Mobile (bottom nav) ──────────────────────────────────────────
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  Good morning! 👋                                             │
│                                                               │
│  ┌──────────────────┐   ┌──────────────────┐                 │
│  │   Open Jobs      │   │ Unpaid Invoices   │                 │
│  │       12         │   │   € 4.820,00      │                 │
│  └──────────────────┘   └──────────────────┘                 │
│                                                               │
│  Recent Jobs                                  [+ New Job]    │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 🔵 Kitchen sink repair · Müller · TODAY             │     │
│  │ 🟡 Bathroom tiles      · Schmidt · OPEN             │     │
│  │ 🟡 Heating system      · Weber · OPEN               │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
├────────┬────────┬────────┬────────┐                          │
│   🏠   │   🔧   │   👥   │   📄   │                          │
│  Home  │  Jobs  │Customers│Invoices│                         │
└────────┴────────┴────────┴────────┘                          │
```

---

## Customer List `/customers`

```
┌─────────────────────────────────────────────────────────────┐
│  Customers                                  [+ New Customer] │
├─────────────────────────────────────────────────────────────┤
│  🔍 Search by name, phone, email...                          │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  Name        │  Phone       │  Email       │  Actions       │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  Thomas      │ 0151 123 456 │ t.mueller    │ [View] [Edit]  │
│  Müller      │              │ @gmail.com   │                │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  Anna        │ 0176 987 654 │ a.schmidt    │ [View] [Edit]  │
│  Schmidt     │              │ @web.de      │                │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  Klaus Weber │ 0160 555 333 │ k.weber      │ [View] [Edit]  │
│              │              │ @t-online.de │                │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

---

## Customer Detail `/customers/:id`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Customers                             [Edit]      │
├─────────────────────────────────────────────────────────────┤
│  Thomas Müller                                               │
│  Hauptstraße 12, 70173 Stuttgart                             │
│  📞 0151 123 456   ✉️  t.mueller@gmail.com                   │
├─────────────────────────────────────────────────────────────┤
│  Job History                                  [+ New Job]   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Kitchen sink repair    OPEN      12.05.2024   [View]  │  │
│  │ Bathroom renovation    DONE      03.03.2024   [View]  │  │
│  │ Boiler replacement     DONE      10.01.2024   [View]  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Job Detail `/jobs/:id`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Jobs                           [Edit] [+ Quote]  │
├─────────────────────────────────────────────────────────────┤
│  Kitchen sink repair                    🟡 OPEN             │
│  Thomas Müller · Hauptstraße 12, Stuttgart                   │
│  Created: 12.05.2024                                        │
├─────────────────────────────────────────────────────────────┤
│  Description                                                 │
│  Kitchen sink is leaking under the cabinet. Customer        │
│  reports slow drain and water damage to cabinet floor.      │
├─────────────────────────────────────────────────────────────┤
│  Status                                                      │
│  [OPEN] → [IN PROGRESS] → [DONE] · [CANCEL]                │
├─────────────────────────────────────────────────────────────┤
│  Photos                                          [+ Upload] │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  [img]   │  │  [img]   │  │    +     │                  │
│  │[Analyze] │  │[Analyze] │  │          │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🤖 AI Analysis: Water damage visible on cabinet       │  │
│  │ floor. Likely P-trap failure. Suggested tasks:        │  │
│  │ • Replace P-trap                                      │  │
│  │ • Seal cabinet base                                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Quote Builder `/quotes/new`

```
┌─────────────────────────────────────────────────────────────┐
│  New Quote                                                   │
│  For: Kitchen sink repair · Thomas Müller                    │
├─────────────────────────────────────────────────────────────┤
│  Line Items                          [🤖 Suggest Items]     │
│  ┌────────────────────┬──────┬────────────┬────────┬──────┐ │
│  │ Description        │ Qty  │ Unit Price │ Total  │      │ │
│  ├────────────────────┼──────┼────────────┼────────┼──────┤ │
│  │ Replace P-trap     │  1   │  € 45,00   │ €45,00 │ [x]  │ │
│  ├────────────────────┼──────┼────────────┼────────┼──────┤ │
│  │ Labour (2h)        │  2   │  € 75,00   │€150,00 │ [x]  │ │
│  ├────────────────────┼──────┼────────────┼────────┼──────┤ │
│  │ Seal cabinet base  │  1   │  € 30,00   │ €30,00 │ [x]  │ │
│  ├────────────────────┼──────┼────────────┼────────┴──────┤ │
│  │ [+ Add item]       │      │            │               │ │
│  └────────────────────┴──────┴────────────┴───────────────┘ │
│                                                              │
│                              Subtotal:        € 225,00      │
│                              VAT (19%):        € 42,75      │
│                              ─────────────────────────      │
│                              Total:           € 267,75      │
│                                                              │
│                              [Cancel]    [Save as Draft]    │
└─────────────────────────────────────────────────────────────┘
```

---

## Invoice View `/invoices/:id`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Invoices          [Download PDF]  [Mark as Paid] │
├─────────────────────────────────────────────────────────────┤
│  INVOICE                                     🟡 SENT        │
│  ─────────────────────────────────────────────────────────  │
│  Invoice No:    KM-2024-0001                                 │
│  Date:          15.05.2024                                   │
│  Due date:      29.05.2024                                   │
│  ─────────────────────────────────────────────────────────  │
│  FROM                          TO                           │
│  Your Company GmbH             Thomas Müller                 │
│  Musterstraße 1                Hauptstraße 12               │
│  70173 Stuttgart               70173 Stuttgart              │
│  USt-IdNr: DE123456789                                      │
│  ─────────────────────────────────────────────────────────  │
│  Description              Qty    Unit Price    Total        │
│  ─────────────────────────────────────────────────────────  │
│  Replace P-trap            1       € 45,00    € 45,00      │
│  Labour (2h)               2       € 75,00    € 150,00     │
│  Seal cabinet base         1       € 30,00    € 30,00      │
│  ─────────────────────────────────────────────────────────  │
│                        Subtotal:              € 225,00      │
│                        VAT 19%:               € 42,75       │
│                        ─────────────────────────────        │
│                        Total:                 € 267,75      │
│  ─────────────────────────────────────────────────────────  │
│  Payment: Bank transfer within 14 days                      │
│  IBAN: DE89 3704 0044 0532 0130 00                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Status Badge Reference

| Status | Color | Used on |
|---|---|---|
| `OPEN` | 🔵 Blue | Jobs |
| `IN_PROGRESS` | 🟡 Yellow | Jobs |
| `DONE` | ✅ Green | Jobs |
| `CANCELLED` | ⛔ Red | Jobs, Quotes, Invoices |
| `DRAFT` | ⚪ Grey | Quotes, Invoices |
| `SENT` | 🟡 Yellow | Quotes, Invoices |
| `PAID` | ✅ Green | Invoices |
