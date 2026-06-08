'use client';

import { PageHeader } from '@/components/ui/page-header';
import { useSettings } from '../hooks/useSettings';
import { CompanyProfileForm } from './CompanyProfileForm';
import { AccountForm } from './AccountForm';

/** Fetches settings and renders the company profile and account forms. */
export function SettingsView() {
  const { data: settings, isLoading, isError } = useSettings();

  if (isLoading) return <p className="text-zinc-400 text-sm">Loading…</p>;
  if (isError || !settings) return <p className="text-red-500 text-sm">Failed to load settings.</p>;

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your company profile and account." />
      <CompanyProfileForm settings={settings} />
      <AccountForm settings={settings} />
    </div>
  );
}
