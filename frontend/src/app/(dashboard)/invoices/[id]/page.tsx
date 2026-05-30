import InvoiceDetails from "@/features/invoices/components/invoice-details/InvoiceDetails";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvoiceDetails id={id} />;
}
