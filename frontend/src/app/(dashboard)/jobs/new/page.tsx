import { PageHeader } from "@/components/ui/page-header";
import { JobForm } from "@/features/jobs/components/JobForm";

export default function NewJobPage() {
  return (
    <div>
      <PageHeader
        title="Neuer Job"
        description="Erstelle einen neuen Auftrag"
      />

      <JobForm />
    </div>
  );
}
