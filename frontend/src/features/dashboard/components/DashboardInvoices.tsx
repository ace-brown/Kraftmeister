import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH2, TypographyP } from '@/components/ui/Typography';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { StatusBadge } from '@/components/ui/status-badge';
import { InvoiceStatus } from '@/features/invoices/types/invoice.types';
import { DashboardInvoicesProps } from '../types/dashboard.types';

/** Renders the list of unpaid invoices (DRAFT or SENT), each linking to its detail page. */
export function DashboardInvoices({ invoices, isLoading }: DashboardInvoicesProps) {
  return (
    <div>
      <TypographyH2 className="text-base font-semibold mb-3">Unbezahlte Rechnungen</TypographyH2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !invoices.length && (
        <TypographyP className="text-zinc-400 text-sm">Keine ausstehenden Rechnungen</TypographyP>
      )}
      <div className="flex flex-col gap-2">
        {invoices.slice(0, 5).map((inv) => (
          <Link key={inv.id} href={`/invoices/${inv.id}`}>
            <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
              <CardContent className="py-3 flex items-center justify-between">
                <div>
                  <TypographyP className="text-sm font-medium">{inv.invoiceNumber}</TypographyP>
                  <TypographyP className="text-xs text-zinc-400">{inv.customer.name}</TypographyP>
                </div>
                <div className="flex items-center gap-2">
                  <TypographyP className="text-sm font-semibold">
                    €{inv.total.toFixed(2)}
                  </TypographyP>
                  <StatusBadge status={inv.status as InvoiceStatus} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
