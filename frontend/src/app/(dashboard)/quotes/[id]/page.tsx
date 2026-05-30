import QuoteDetails from "@/features/quotes/components/quote-details/QuoteDetails";

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuoteDetails id={id} />;
}
