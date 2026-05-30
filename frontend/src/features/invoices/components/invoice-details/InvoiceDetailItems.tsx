"use client";

import { Separator } from "@/components/ui/separator";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { Invoice } from "../../types";

export function InvoiceDetailItems({ invoice }: { invoice: Invoice }) {
  return (
    <div className="mb-6">
      <TypographyH2 className="text-base font-semibold mb-4">Positionen</TypographyH2>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_60px_100px_60px_100px] gap-2 text-xs text-zinc-400 px-1">
          <span>Beschreibung</span>
          <span>Menge</span>
          <span>Einzelpreis</span>
          <span>MwSt.</span>
          <span className="text-right">Gesamt</span>
        </div>

        {invoice.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_60px_100px_60px_100px] gap-2 py-2 border-b border-zinc-800 text-sm px-1"
          >
            <TypographyP className="text-sm">{item.description}</TypographyP>
            <TypographyP className="text-sm text-zinc-300">{item.quantity}</TypographyP>
            <TypographyP className="text-sm text-zinc-300">
              €{item.unitPrice.toFixed(2)}
            </TypographyP>
            <TypographyP className="text-sm text-zinc-300">
              {item.vatRate}%
            </TypographyP>
            <TypographyP className="text-sm text-right">
              €{(item.quantity * item.unitPrice).toFixed(2)}
            </TypographyP>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col items-end gap-1 text-sm">
        <div className="flex gap-8 text-zinc-400">
          <span>Netto</span>
          <span>€{invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex gap-8 text-zinc-400">
          <span>MwSt.</span>
          <span>€{invoice.vatAmount.toFixed(2)}</span>
        </div>
        <div className="flex gap-8 font-semibold text-base mt-1">
          <span>Gesamt</span>
          <span>€{invoice.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
