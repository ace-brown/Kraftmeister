'use client';

import { useMutation } from '@tanstack/react-query';
import { updateAccount } from '../api/settings.api';

/** Mutates the user's email and/or password. No cache invalidation needed — auth state is managed separately. */
export function useUpdateAccount() {
  return useMutation({
    mutationFn: updateAccount,
  });
}
