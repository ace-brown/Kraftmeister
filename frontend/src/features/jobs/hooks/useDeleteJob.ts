"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../api";
import { jobKeys } from "@/lib/query-client";

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}
