"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/Typography";
import { useUpdateQuote } from "../../hooks/useUpdateQuote";
import { useConvertToInvoice } from "../../hooks/useConvertToInvoice";
import { Quote, QuoteStatus, QUOTE_STATUSES, QUOTE_STATUS_LABELS } from "../../types";

export function QuoteDetailActions({ quote }: { quote: Quote }) {
  const router = useRouter();
  const { mutate: updateQuote, isPending: isUpdating } = useUpdateQuote();
  const { mutate: convert, isPending: isConverting } = useConvertToInvoice();

  const hasInvoice = !!quote.invoice;

  const handleStatusChange = (status: QuoteStatus) => {
    updateQuote({ id: quote.id, data: { status } });
  };

  const handleConvert = () => {
    convert(quote.id, {
      onSuccess: (data: any) => {
        router.push(`/invoices/${data.id}`);
      },
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Status buttons */}
      <div className="flex gap-2">
        {QUOTE_STATUSES.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={quote.status === s ? "default" : "outline"}
            className={quote.status === s ? "pointer-events-none" : ""}
            onClick={() => handleStatusChange(s)}
            disabled={isUpdating && quote.status !== s}
          >
            {QUOTE_STATUS_LABELS[s]}
          </Button>
        ))}
      </div>

      <div className="ml-auto flex gap-2">
        {hasInvoice ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/invoices/${quote.invoice!.id}`)}
          >
            Rechnung anzeigen
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleConvert}
            disabled={isConverting}
          >
            {isConverting ? "Konvertiere..." : "In Rechnung umwandeln"}
          </Button>
        )}
        <Button size="sm" variant="outline" disabled>
          PDF herunterladen
        </Button>
      </div>
    </div>
  );
}
