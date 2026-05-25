"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { JobFilters, JobStatus } from "../types/job.types";
import JobsList from "./jobs-list/JobList";
import { JobsFilterBar } from "./jobs-list/JobsFilterBar";

export default function JobsView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: JobFilters = {
    status: (searchParams.get("status") as JobStatus) || undefined,
    date: searchParams.get("date") || undefined,
  };

  const handleFiltersChange = useCallback(
    (newFilters: JobFilters) => {
      const params = new URLSearchParams();
      if (newFilters.status) params.set("status", newFilters.status);
      if (newFilters.date) params.set("date", newFilters.date);
      const query = params.toString();
      router.replace(query ? `/jobs?${query}` : "/jobs");
    },
    [router],
  );

  return (
    <>
      <PageHeader
        title="Jobs"
        description="Alle Aufträge verwalten"
        action={
          <Link href="/jobs/new">
            <Button>Neuer Job</Button>
          </Link>
        }
      />
      <JobsFilterBar filters={filters} onChange={handleFiltersChange} />
      <JobsList filters={filters} />
    </>
  );
}
