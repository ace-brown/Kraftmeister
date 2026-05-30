"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { InvoiceStatus } from "@/features/invoices/types";

export default function DashboardPage() {
  const { data: openJobs, isLoading: jobsLoading } = useJobs({ status: "OPEN" });
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: customers, isLoading: customersLoading } = useCustomers();

  const unpaidInvoices = invoices?.filter(
    (inv) => inv.status === "DRAFT" || inv.status === "SENT",
  ) ?? [];
  const unpaidTotal = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const recentCustomers = customers?.slice(0, 5) ?? [];

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Übersicht deines Betriebs" />

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="py-5">
            <TypographyP className="text-xs text-zinc-400 mb-1">Offene Aufträge</TypographyP>
            {jobsLoading ? (
              <LoadingSpinner />
            ) : (
              <TypographyP className="text-3xl font-bold">
                {openJobs?.length ?? 0}
              </TypographyP>
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
                <TypographyP className="text-3xl font-bold">
                  {unpaidInvoices.length}
                </TypographyP>
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
              <TypographyP className="text-3xl font-bold">
                {customers?.length ?? 0}
              </TypographyP>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Open jobs list */}
        <div>
          <TypographyH2 className="text-base font-semibold mb-3">
            Offene Aufträge
          </TypographyH2>
          {jobsLoading && <LoadingSpinner />}
          {!jobsLoading && !openJobs?.length && (
            <TypographyP className="text-zinc-400 text-sm">
              Keine offenen Aufträge
            </TypographyP>
          )}
          <div className="flex flex-col gap-2">
            {openJobs?.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
                  <CardContent className="py-3 flex items-center justify-between">
                    <TypographyP className="text-sm font-medium">{job.title}</TypographyP>
                    <TypographyP className="text-xs text-zinc-400">
                      {new Date(job.createdAt).toLocaleDateString("de-DE")}
                    </TypographyP>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Unpaid invoices */}
          <div>
            <TypographyH2 className="text-base font-semibold mb-3">
              Unbezahlte Rechnungen
            </TypographyH2>
            {invoicesLoading && <LoadingSpinner />}
            {!invoicesLoading && !unpaidInvoices.length && (
              <TypographyP className="text-zinc-400 text-sm">
                Keine ausstehenden Rechnungen
              </TypographyP>
            )}
            <div className="flex flex-col gap-2">
              {unpaidInvoices.slice(0, 5).map((inv) => (
                <Link key={inv.id} href={`/invoices/${inv.id}`}>
                  <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
                    <CardContent className="py-3 flex items-center justify-between">
                      <div>
                        <TypographyP className="text-sm font-medium">
                          {inv.invoiceNumber}
                        </TypographyP>
                        <TypographyP className="text-xs text-zinc-400">
                          {inv.customer.name}
                        </TypographyP>
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

          {/* Recent customers */}
          <div>
            <TypographyH2 className="text-base font-semibold mb-3">
              Letzte Kunden
            </TypographyH2>
            {customersLoading && <LoadingSpinner />}
            {!customersLoading && !recentCustomers.length && (
              <TypographyP className="text-zinc-400 text-sm">
                Keine Kunden vorhanden
              </TypographyP>
            )}
            <div className="flex flex-col gap-2">
              {recentCustomers.map((customer) => (
                <Link key={customer.id} href={`/customers/${customer.id}`}>
                  <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
                    <CardContent className="py-3 flex items-center justify-between">
                      <TypographyP className="text-sm font-medium">
                        {customer.name}
                      </TypographyP>
                      <TypographyP className="text-xs text-zinc-400">
                        {customer.email ?? customer.phone ?? "—"}
                      </TypographyP>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
