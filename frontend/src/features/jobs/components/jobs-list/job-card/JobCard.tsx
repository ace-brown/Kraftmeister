"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useDeleteJob } from "../../../hooks";
import { JobCardProps } from "../../../types/job.types";
import { JobDeleteDialog } from "./JobDeleteDialog";

export function JobCard({ job }: JobCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: deleteJob, isPending } = useDeleteJob();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    deleteJob(job.id, { onSuccess: () => setConfirmOpen(false) });
  };

  return (
    <>
      <Card className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-medium truncate">{job.title}</h3>
              <StatusBadge status={job.status} />
            </div>
            {job.address && (
              <p className="text-sm text-zinc-400 truncate">{job.address}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm">Ansehen</Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              className="text-zinc-500 hover:text-red-400 hover:bg-transparent px-1"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </Card>

      <JobDeleteDialog
        job={job}
        open={confirmOpen}
        isPending={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
