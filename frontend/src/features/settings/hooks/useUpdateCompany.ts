'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsKeys } from '@/lib/query-client';
import { updateCompany } from '../api/settings.api';

/** Mutates company profile fields and refreshes the settings cache on success. */
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompany,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: settingsKeys.all }),
  });
}
