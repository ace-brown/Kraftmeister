"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "../api";
import { jobKeys } from "@/lib/query-client";

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.id) });
    },
  });
}
