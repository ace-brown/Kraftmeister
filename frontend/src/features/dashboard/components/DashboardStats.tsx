import { Card, CardContent } from '@/components/ui/card';
import { TypographyP } from '@/components/ui/Typography';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DashboardStatsProps } from '../types/dashboard.types';

/** Renders the three top-level stat cards: open jobs, unpaid invoices, and total customers. */
export function DashboardStats({
  openJobsCount,
  jobsLoading,
  unpaidCount,
  unpaidTotal,
  invoicesLoading,
  customersCount,
  customersLoading,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="py-5">
          <TypographyP className="text-xs text-zinc-400 mb-1">Offene Aufträge</TypographyP>
          {jobsLoading ? (
            <LoadingSpinner />
          ) : (
            <TypographyP className="text-3xl font-bold">{openJobsCount}</TypographyP>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-5">
          <TypographyP className="text-xs text-zinc-400 mb-1">Unbezahlte Rechnungen</TypographyP>
          {invoicesLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <TypographyP className="text-3xl font-bold">{unpaidCount}</TypographyP>
              <TypographyP className="text-sm text-zinc-400 mt-1">
                €{unpaidTotal.toFixed(2)} ausstehend
              </TypographyP>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-5">
          <TypographyP className="text-xs text-zinc-400 mb-1">Kunden gesamt</TypographyP>
          {customersLoading ? (
            <LoadingSpinner />
          ) : (
            <TypographyP className="text-3xl font-bold">{customersCount}</TypographyP>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
