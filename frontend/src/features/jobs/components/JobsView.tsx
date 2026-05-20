"use client";

import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import JobsList from "./jobs-list/JobList";

export default function JobsView() {
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
      <JobsList />
    </>
  );
}
