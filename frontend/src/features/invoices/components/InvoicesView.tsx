"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/Typography";
import { useInvoices } from "../hooks";
import { InvoiceStatus } from "../types";

export default function InvoicesView() {
  const { data: invoices, isLoading, error } = useInvoices();

  return (
    <>
      <PageHeader
        title="Rechnungen"
        description="Alle Rechnungen verwalten"
      />

      {isLoading && <LoadingSpinner />}
      {error && (
        <TypographyP className="text-red-400">
          Fehler beim Laden der Rechnungen
        </TypographyP>
      )}
      {!isLoading && !error && !invoices?.length && (
        <EmptyState
          title="Keine Rechnungen"
          description="Rechnungen entstehen durch Umwandlung von Angeboten"
        />
      )}

      {!isLoading && !error && !!invoices?.length && (
        <div className="flex flex-col gap-3">
          {invoices.map((invoice) => (
            <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
              <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex flex-col gap-1">
                    <TypographyP className="font-medium text-sm">
                      {invoice.invoiceNumber}
                    </TypographyP>
                    <TypographyP className="text-xs text-zinc-400">
                      {invoice.customer.name} ·{" "}
                      {new Date(invoice.createdAt).toLocaleDateString("de-DE")}
                      {invoice.dueDate &&
                        ` · Fällig: ${new Date(invoice.dueDate).toLocaleDateString("de-DE")}`}
                    </TypographyP>
                  </div>
                  <div className="flex items-center gap-3">
                    <TypographyP className="font-semibold text-sm">
                      €{invoice.total.toFixed(2)}
                    </TypographyP>
                    <StatusBadge status={invoice.status as InvoiceStatus} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
