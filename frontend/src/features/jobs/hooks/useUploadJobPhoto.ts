"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadJobPhoto } from "../api";
import { jobKeys } from "@/lib/query-client";

/** Uploads a photo to MinIO via the api-gateway and invalidates the job cache. */
export function useUploadJobPhoto(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadJobPhoto(jobId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
}
