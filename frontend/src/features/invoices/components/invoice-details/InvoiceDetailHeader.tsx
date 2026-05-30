"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { Invoice, InvoiceStatus } from "../../types";

export function InvoiceDetailHeader({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <TypographyH1 className="text-xl font-semibold">
          {invoice.invoiceNumber}
        </TypographyH1>
        <TypographyP className="text-zinc-400 text-sm mt-1">
          {invoice.customer.name} · Erstellt am{" "}
          {new Date(invoice.createdAt).toLocaleDateString("de-DE")}
          {invoice.dueDate &&
            ` · Fällig: ${new Date(invoice.dueDate).toLocaleDateString("de-DE")}`}
        </TypographyP>
      </div>
      <StatusBadge status={invoice.status as InvoiceStatus} />
    </div>
  );
}
