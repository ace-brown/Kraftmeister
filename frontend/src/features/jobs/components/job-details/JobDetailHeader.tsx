import { StatusBadge } from "@/components/ui/status-badge";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { Job } from "@/features/jobs/types";

interface Props {
  job: Job;
}

export function JobDetailHeader({ job }: Props) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="flex items-start justify-between mb-1">
        <TypographyH1>{job.title}</TypographyH1>
        <StatusBadge status={job.status} />
      </div>
      {job.address && (
        <TypographyP className="text-sm text-zinc-400 mb-1 mt-0">
          {job.address}
        </TypographyP>
      )}
      <p className="text-xs text-zinc-500 mb-6">Created: {formattedDate}</p>
    </>
  );
}
