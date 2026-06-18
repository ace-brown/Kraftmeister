import { Job } from '@/features/jobs/types/job.types';
import { Invoice } from '@/features/invoices/types/invoice.types';
import { Customer } from '@/features/customers/types/customer.types';

export interface DashboardStatsProps {
  openJobsCount: number;
  jobsLoading: boolean;
  unpaidCount: number;
  unpaidTotal: number;
  invoicesLoading: boolean;
  customersCount: number;
  customersLoading: boolean;
}

export interface DashboardOpenJobsProps {
  jobs: Job[] | undefined;
  isLoading: boolean;
}

export interface DashboardInvoicesProps {
  invoices: Invoice[];
  isLoading: boolean;
}

export interface DashboardCustomersProps {
  customers: Customer[];
  isLoading: boolean;
}
