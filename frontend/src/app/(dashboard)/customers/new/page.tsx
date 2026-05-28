import { PageHeader } from "@/components/ui/page-header";
import CustomerForm from "@/features/customers/components/new-customer-form/CustomerForm";

export default function NewCustomerPage() {
  return (
    <div>
      <PageHeader
        title="Neuer Kunde"
        description="Erstelle einen neuen Kunden"
      />

      <CustomerForm />
    </div>
  );
}
