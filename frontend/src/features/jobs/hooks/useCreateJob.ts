import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { createJob } from "../api/jobs.api";
import { jobKeys } from "@/lib/query-client";
import { CreateJobPayload, Job } from "../types/job.types";

export function useCreateJob(
  options?: UseMutationOptions<Job, Error, CreateJobPayload>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.all,
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
