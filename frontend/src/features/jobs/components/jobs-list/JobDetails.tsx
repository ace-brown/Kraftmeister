"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageContainer } from "@/components/layout/page-container";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/Typography";
import { useJob } from "../../hooks";

export default function JobDetails({ id }: { id: string }) {
  const { data: job, error, isLoading } = useJob(id);

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-zinc-400 text-sm">Loading job...</p>
      </PageContainer>
    );
  }

  if (error || !job) {
    return (
      <PageContainer>
        <p className="text-red-400 text-sm">Job not found.</p>
      </PageContainer>
    );
  }

  const formattedDate = new Date(job.createdAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <PageContainer>
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/jobs" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← Back to Jobs
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Edit
          </Button>
          <Button size="sm" disabled>
            + Quote
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <TypographyH1>{job.title}</TypographyH1>
        <StatusBadge status={job.status} />
      </div>
      {job.address && (
        <p className="text-sm text-zinc-400 mb-1">{job.address}</p>
      )}
      <p className="text-xs text-zinc-500 mb-6">Created: {formattedDate}</p>

      <div className="h-px bg-zinc-800 mb-6" />

      {/* Description */}
      {job.description && (
        <section className="mb-6">
          <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2 pb-0">
            Description
          </TypographyH2>
          <TypographyP>{job.description}</TypographyP>
        </section>
      )}

      <div className="h-px bg-zinc-800 mb-6" />

      {/* Status transitions */}
      <section className="mb-6">
        <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-3 pb-0">
          Status
        </TypographyH2>
        <div className="flex items-center gap-2 flex-wrap">
          {(["open", "in-progress", "done"] as const).map((s, i, arr) => (
            <div key={s} className="flex items-center gap-2">
              <button
                disabled
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  job.status === s
                    ? "border-white text-white"
                    : "border-zinc-700 text-zinc-500"
                }`}
              >
                {s.toUpperCase()}
              </button>
              {i < arr.length - 1 && (
                <span className="text-zinc-600 text-xs">→</span>
              )}
            </div>
          ))}
          <span className="text-zinc-600 text-xs mx-1">·</span>
          <button
            disabled
            className="px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-700 text-zinc-500"
          >
            CANCEL
          </button>
        </div>
      </section>

      <div className="h-px bg-zinc-800 mb-6" />

      {/* Photos — placeholder until Phase 7 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide pb-0">
            Photos
          </TypographyH2>
          <Button variant="outline" size="sm" disabled>
            + Upload
          </Button>
        </div>
        <p className="text-xs text-zinc-600">
          Photo uploads coming in Phase 7.
        </p>
      </section>
    </PageContainer>
  );
}
