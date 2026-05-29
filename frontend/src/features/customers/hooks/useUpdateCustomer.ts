"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerKeys } from "@/lib/query-client";
import { updateCustomer } from "../api";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      queryClient.invalidateQueries({
        queryKey: customerKeys.detail(variables.id),
      });
    },
  });
}
