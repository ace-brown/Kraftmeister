import { PageHeader } from "@/components/ui/page-header";
import { getJobs } from "@/features/jobs/api/jobs.api";
import { JobCard } from "@/features/jobs/components/JobCard";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div>
      <PageHeader
        title="Jobs"
        description="Alle Aufträge verwalten"
        href="/jobs/new"
        buttonText="Neuer Job"
      />

      <div className="grid gap-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
