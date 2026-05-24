import { Job } from "../../types/job.types";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Props {
  job: Job;
}

export function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-medium">{job.title}</h3>

            {job.address && (
              <p className="text-sm text-zinc-400">{job.address}</p>
            )}
          </div>

          <StatusBadge status={job.status} />
        </div>
      </Card>
    </Link>
  );
}
