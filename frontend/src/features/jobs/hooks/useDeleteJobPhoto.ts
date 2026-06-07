"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobPhoto } from "../api";
import { jobKeys } from "@/lib/query-client";

/** Deletes a photo from MinIO and removes it from the job's photos array. */
export function useDeleteJobPhoto(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (url: string) => deleteJobPhoto(jobId, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
}
