"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { TypographyP } from "@/components/ui/Typography";
import { useJob } from "../../../hooks";
import { JobDetailActions } from "./JobDetailActions";
import { JobDetailDescription } from "./JobDetailDescription";
import { JobDetailHeader } from "./JobDetailHeader";
import { JobDetailPhotos } from "./JobDetailPhotos";
import { JobDetailStatus } from "./JobDetailStatus";
import { JobEditDialog } from "./JobEditDialog";

export default function JobDetails({ id }: { id: string }) {
  const { data: job, error, isLoading } = useJob(id);
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <PageContainer>
        <TypographyP className="text-zinc-400 text-sm">Loading job...</TypographyP>
      </PageContainer>
    );
  }

  if (error || !job) {
    return (
      <PageContainer>
        <TypographyP className="text-red-400 text-sm">Job not found.</TypographyP>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <JobDetailActions onEdit={() => setEditOpen(true)} />
      <JobDetailHeader job={job} />
      <div className="h-px bg-zinc-800 mb-6" />
      {job.description && <JobDetailDescription description={job.description} />}
      <div className="h-px bg-zinc-800 mb-6" />
      <JobDetailStatus status={job.status} />
      <div className="h-px bg-zinc-800 mb-6" />
      <JobDetailPhotos />

      <JobEditDialog job={job} open={editOpen} onOpenChange={setEditOpen} />
    </PageContainer>
  );
}
