"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { Quote, QuoteStatus } from "../../types";

export function QuoteDetailHeader({ quote }: { quote: Quote }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <TypographyH1 className="text-xl font-semibold">
          Angebot — {quote.customer.name}
        </TypographyH1>
        <TypographyP className="text-zinc-400 text-sm mt-1">
          Erstellt am {new Date(quote.createdAt).toLocaleDateString("de-DE")}
          {quote.job && ` · Auftrag: ${quote.job.title}`}
        </TypographyP>
      </div>
      <StatusBadge status={quote.status as QuoteStatus} />
    </div>
  );
}
