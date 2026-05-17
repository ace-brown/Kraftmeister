"use client";

import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

import { Button } from "@/components/ui/button";
import { JobCard } from "@/features/jobs/components/JobCard";
import { useJobs } from "@/features/jobs/hooks/useJobs";

export default function JobsPage() {
  const { data: jobs, isLoading, error } = useJobs();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-400">Fehler beim Laden der Jobs</div>;
  }

  return (
    <div>
      <PageHeader
        title="Jobs"
        description="Alle Aufträge verwalten"
        action={
          <Link href="/jobs/new">
            <Button>Neuer Job</Button>
          </Link>
        }
      />

      {!jobs?.length ? (
        <EmptyState
          title="Keine Jobs"
          description="Erstelle deinen ersten Auftrag"
        />
      ) : (
        <div className="grid gap-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
