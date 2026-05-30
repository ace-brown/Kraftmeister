"use client";

import { PageContainer } from "@/components/layout/page-container";
import { TypographyP } from "@/components/ui/Typography";
import { useQuote } from "../../hooks/useQuote";
import { QuoteDetailActions } from "./QuoteDetailActions";
import { QuoteDetailHeader } from "./QuoteDetailHeader";
import { QuoteDetailItems } from "./QuoteDetailItems";

export default function QuoteDetails({ id }: { id: string }) {
  const { data: quote, isLoading, error } = useQuote(id);

  if (isLoading) {
    return (
      <PageContainer>
        <TypographyP className="text-zinc-400 text-sm">
          Angebot wird geladen...
        </TypographyP>
      </PageContainer>
    );
  }

  if (error || !quote) {
    return (
      <PageContainer>
        <TypographyP className="text-red-400 text-sm">
          Angebot nicht gefunden.
        </TypographyP>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <QuoteDetailHeader quote={quote} />
      <div className="h-px bg-zinc-800 mb-6" />
      <QuoteDetailActions quote={quote} />
      <div className="h-px bg-zinc-800 mb-6" />
      <QuoteDetailItems quote={quote} />
    </PageContainer>
  );
}
