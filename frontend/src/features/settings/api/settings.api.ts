import { apiClient } from '@/lib/api/client';
import { Settings, UpdateAccountPayload, UpdateCompanyPayload } from '../types/settings.types';

/** Fetches the current company profile, invoice defaults, and user email. */
export async function getSettings(): Promise<Settings> {
  return apiClient('/settings');
}

/** Partially updates the company profile and invoice default fields. */
export async function updateCompany(data: UpdateCompanyPayload): Promise<Settings> {
  return apiClient('/settings/company', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/** Updates the authenticated user's email and/or password. */
export async function updateAccount(data: UpdateAccountPayload): Promise<void> {
  return apiClient('/settings/account', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
