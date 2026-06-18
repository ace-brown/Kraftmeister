'use client';

import { PageContainer } from '@/components/layout/page-container';
import { PageHeader } from '@/components/ui/page-header';
import { AgentChat } from '@/features/ai/components/AgentChat';
import { useJobs } from '@/features/jobs/hooks/useJobs';
import { useInvoices } from '@/features/invoices/hooks/useInvoices';
import { useCustomers } from '@/features/customers/hooks/useCustomers';
import { DashboardStats } from './DashboardStats';
import { DashboardOpenJobs } from './DashboardOpenJobs';
import { DashboardInvoices } from './DashboardInvoices';
import { DashboardCustomers } from './DashboardCustomers';

/** Top-level dashboard view — fetches all data and composes the stat cards, lists, and AI chat panel. */
export function DashboardView() {
  const { data: openJobs, isLoading: jobsLoading } = useJobs({ status: 'OPEN' });
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: customers, isLoading: customersLoading } = useCustomers();

  const unpaidInvoices =
    invoices?.filter((inv) => inv.status === 'DRAFT' || inv.status === 'SENT') ?? [];
  const unpaidTotal = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const recentCustomers = customers?.slice(0, 5) ?? [];

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Übersicht deines Betriebs" />

      <DashboardStats
        openJobsCount={openJobs?.length ?? 0}
        jobsLoading={jobsLoading}
        unpaidCount={unpaidInvoices.length}
        unpaidTotal={unpaidTotal}
        invoicesLoading={invoicesLoading}
        customersCount={customers?.length ?? 0}
        customersLoading={customersLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardOpenJobs jobs={openJobs} isLoading={jobsLoading} />

        <div className="flex flex-col gap-6">
          <DashboardInvoices invoices={unpaidInvoices} isLoading={invoicesLoading} />
          <DashboardCustomers customers={recentCustomers} isLoading={customersLoading} />
        </div>
      </div>

      <div className="mt-6">
        <AgentChat />
      </div>
    </PageContainer>
  );
}
