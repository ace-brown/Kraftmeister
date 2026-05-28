import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/layout/page-container";
import CustomerForm from "@/features/customers/components/new-customer-form/CustomerForm";

export default function NewCustomerPage() {
  return (
    <PageContainer>
      <Link
        href="/customers"
        className="text-sm text-zinc-400 hover:text-white mb-4 inline-block"
      >
        ← Zurück zu Kunden
      </Link>
      <PageHeader
        title="Neuer Kunde"
        description="Erstelle einen neuen Kunden"
      />

      <CustomerForm />
    </PageContainer>
  );
}
