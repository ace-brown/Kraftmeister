'use client';

import { useQuery } from '@tanstack/react-query';
import { settingsKeys } from '@/lib/query-client';
import { getSettings } from '../api/settings.api';

/** Fetches the current settings (company profile + invoice defaults + email). */
export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: getSettings,
  });
}
