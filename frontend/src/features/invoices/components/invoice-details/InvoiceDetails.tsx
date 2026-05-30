"use client";

import { PageContainer } from "@/components/layout/page-container";
import { TypographyP } from "@/components/ui/Typography";
import { useInvoice } from "../../hooks/useInvoice";
import { InvoiceDetailActions } from "./InvoiceDetailActions";
import { InvoiceDetailHeader } from "./InvoiceDetailHeader";
import { InvoiceDetailItems } from "./InvoiceDetailItems";

export default function InvoiceDetails({ id }: { id: string }) {
  const { data: invoice, isLoading, error } = useInvoice(id);

  if (isLoading) {
    return (
      <PageContainer>
        <TypographyP className="text-zinc-400 text-sm">
          Rechnung wird geladen...
        </TypographyP>
      </PageContainer>
    );
  }

  if (error || !invoice) {
    return (
      <PageContainer>
        <TypographyP className="text-red-400 text-sm">
          Rechnung nicht gefunden.
        </TypographyP>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <InvoiceDetailHeader invoice={invoice} />
      <div className="h-px bg-zinc-800 mb-6" />
      <InvoiceDetailActions invoice={invoice} />
      <div className="h-px bg-zinc-800 mb-6" />
      <InvoiceDetailItems invoice={invoice} />
    </PageContainer>
  );
}
