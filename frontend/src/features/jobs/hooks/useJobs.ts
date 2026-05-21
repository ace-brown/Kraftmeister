"use client";

import { useQuery } from "@tanstack/react-query";

import { getJobs } from "../api/jobs.api";
import { jobKeys } from "@/lib/query-client";

export function useJobs() {
  return useQuery({
    queryKey: jobKeys.all,
    queryFn: getJobs,
  });
}
