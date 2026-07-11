"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { Invoice, InvoiceStatus } from "../../types";

export function InvoiceDetailHeader({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <Link href="/invoices">
          <Button variant="ghost" size="sm" className="mb-2 -ml-2 text-zinc-400 hover:text-white">
            ← Zurück zu Rechnungen
          </Button>
        </Link>
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
