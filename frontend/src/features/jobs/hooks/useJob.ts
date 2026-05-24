"use client";

import { useQuery } from "@tanstack/react-query";

import { getJob } from "../api/jobs.api";
import { jobKeys } from "@/lib/query-client";

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => getJob(id),
  });
}
