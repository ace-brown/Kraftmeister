"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUpdateInvoiceStatus } from "../../hooks/useUpdateInvoiceStatus";
import { Invoice, InvoiceStatus } from "../../types";

export function InvoiceDetailActions({ invoice }: { invoice: Invoice }) {
  const { mutate: updateStatus, isPending } = useUpdateInvoiceStatus();

  const handleStatusChange = (status: InvoiceStatus) => {
    updateStatus({ id: invoice.id, status });
  };

  const canMarkSent = invoice.status === "DRAFT";
  const canMarkPaid = invoice.status === "SENT";
  const canCancel = invoice.status !== "PAID" && invoice.status !== "CANCELLED";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {invoice.quote && (
        <Link href={`/quotes/${invoice.quote.id}`}>
          <Button size="sm" variant="outline">
            Angebot anzeigen
          </Button>
        </Link>
      )}

      <div className="ml-auto flex gap-2">
        {canMarkSent && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange("SENT")}
            disabled={isPending}
          >
            Als versendet markieren
          </Button>
        )}
        {canMarkPaid && (
          <Button
            size="sm"
            onClick={() => handleStatusChange("PAID")}
            disabled={isPending}
          >
            Als bezahlt markieren
          </Button>
        )}
        {canCancel && (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleStatusChange("CANCELLED")}
            disabled={isPending}
          >
            Stornieren
          </Button>
        )}
        <Button size="sm" variant="outline" disabled>
          PDF herunterladen
        </Button>
      </div>
    </div>
  );
}
