"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/Typography";
import { useQuotes } from "../hooks";
import { QUOTE_STATUS_LABELS, QuoteStatus } from "../types";

export default function QuotesView() {
  const { data: quotes, isLoading, error } = useQuotes();

  return (
    <>
      <PageHeader
        title="Angebote"
        description="Alle Angebote verwalten"
        action={
          <Link href="/quotes/new">
            <Button>Neues Angebot</Button>
          </Link>
        }
      />

      {isLoading && <LoadingSpinner />}
      {error && (
        <TypographyP className="text-red-400">
          Fehler beim Laden der Angebote
        </TypographyP>
      )}
      {!isLoading && !error && !quotes?.length && (
        <EmptyState
          title="Keine Angebote"
          description="Erstelle dein erstes Angebot"
        />
      )}

      {!isLoading && !error && !!quotes?.length && (
        <div className="flex flex-col gap-3">
          {quotes.map((quote) => (
            <Link key={quote.id} href={`/quotes/${quote.id}`}>
              <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex flex-col gap-1">
                    <TypographyP className="font-medium text-sm">
                      {quote.customer.name}
                    </TypographyP>
                    <TypographyP className="text-xs text-zinc-400">
                      {new Date(quote.createdAt).toLocaleDateString("de-DE")} ·{" "}
                      {quote.items.length}{" "}
                      {quote.items.length === 1 ? "Position" : "Positionen"}
                    </TypographyP>
                  </div>
                  <div className="flex items-center gap-3">
                    <TypographyP className="font-semibold text-sm">
                      €{quote.total.toFixed(2)}
                    </TypographyP>
                    <StatusBadge status={quote.status as QuoteStatus} />
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
