import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../api/jobs.api";
import { jobKeys } from "@/lib/query-client";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.all,
      });
    },
  });
}
