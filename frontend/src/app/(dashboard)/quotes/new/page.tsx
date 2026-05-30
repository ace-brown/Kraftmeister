"use client";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { QuoteForm } from "@/features/quotes/components/QuoteForm";

export default function NewQuotePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Neues Angebot"
        description="Erstelle ein Angebot für einen Kunden"
      />
      <QuoteForm />
    </PageContainer>
  );
}
