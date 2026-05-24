import JobDetails from "@/features/jobs/components/jobs-list/JobDetails";
import { useJob } from "@/features/jobs/hooks/useJob";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <JobDetails id={id} />
    </>
  );
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
