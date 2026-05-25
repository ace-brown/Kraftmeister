"use client";

import { useJob } from "../../hooks";

// { id: "cmph7jzv8000001qwn3laltv1",
//   title: "fjsfj kjfds ",
//   description: "jfs f skfj sfj s sdfjdsf ds ksfjdslf s fkdsjf",
//   status: "open",
//   address: "jdsjfkdsf",
//   createdAt: "2026-05-22T17:43:03.764Z"
// }

export default function JobDetails({ id }: { id: string }) {
  const { data, error, isLoading } = useJob(id);
  return <div>JobDetails</div>;
}

// ```
// ┌─────────────────────────────────────────────────────────────┐
// │  ← Back to Jobs                           [Edit] [+ Quote]  │
// ├─────────────────────────────────────────────────────────────┤
// │  Kitchen sink repair                    🟡 OPEN             │
// │  Thomas Müller · Hauptstraße 12, Stuttgart                   │
// │  Created: 12.05.2024                                        │
// ├─────────────────────────────────────────────────────────────┤
// │  Description                                                 │
// │  Kitchen sink is leaking under the cabinet. Customer        │
// │  reports slow drain and water damage to cabinet floor.      │
// ├─────────────────────────────────────────────────────────────┤
// │  Status                                                      │
// │  [OPEN] → [IN PROGRESS] → [DONE] · [CANCEL]                │
// ├─────────────────────────────────────────────────────────────┤
// │  Photos                                          [+ Upload] │
// │  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
// │  │  [img]   │  │  [img]   │  │    +     │                  │
// │  │[Analyze] │  │[Analyze] │  │          │                  │
// │  └──────────┘  └──────────┘  └──────────┘                  │
// │                                                              │
// │  ┌───────────────────────────────────────────────────────┐  │
// │  │ 🤖 AI Analysis: Water damage visible on cabinet       │  │
// │  │ floor. Likely P-trap failure. Suggested tasks:        │  │
// │  │ • Replace P-trap                                      │  │
// │  │ • Seal cabinet base                                   │  │
// │  └───────────────────────────────────────────────────────┘  │
// └─────────────────────────────────────────────────────────────┘
// ```
