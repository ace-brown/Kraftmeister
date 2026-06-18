import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH2, TypographyP } from '@/components/ui/Typography';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DashboardCustomersProps } from '../types/dashboard.types';

/** Renders the list of the 5 most recent customers, each linking to their detail page. */
export function DashboardCustomers({ customers, isLoading }: DashboardCustomersProps) {
  return (
    <div>
      <TypographyH2 className="text-base font-semibold mb-3">Letzte Kunden</TypographyH2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !customers.length && (
        <TypographyP className="text-zinc-400 text-sm">Keine Kunden vorhanden</TypographyP>
      )}
      <div className="flex flex-col gap-2">
        {customers.map((customer) => (
          <Link key={customer.id} href={`/customers/${customer.id}`}>
            <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
              <CardContent className="py-3 flex items-center justify-between">
                <TypographyP className="text-sm font-medium">{customer.name}</TypographyP>
                <TypographyP className="text-xs text-zinc-400">
                  {customer.email ?? customer.phone ?? '—'}
                </TypographyP>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
