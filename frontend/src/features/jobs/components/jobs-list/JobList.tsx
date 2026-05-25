"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

import { JobCard } from "@/features/jobs/components/jobs-list/JobCard";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { JobsListProps } from "@/features/jobs/types/job.types";

export default function JobsList({ filters }: JobsListProps) {
  const { data: jobs, isLoading, error } = useJobs(filters);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-400">Fehler beim Laden der Jobs</div>;
  }

  return (
    <div>
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
