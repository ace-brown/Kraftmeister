import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/layout/page-container";
import { JobForm } from "@/features/jobs/components/new-job-form/JobForm";

export default function NewJobPage() {
  return (
    <PageContainer>
      <Link
        href="/jobs"
        className="text-sm text-zinc-400 hover:text-white mb-4 inline-block"
      >
        ← Zurück zu Jobs
      </Link>
      <PageHeader
        title="Neuer Job"
        description="Erstelle einen neuen Auftrag"
      />
      <JobForm />
    </PageContainer>
  );
}
