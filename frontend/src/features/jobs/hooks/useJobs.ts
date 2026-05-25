"use client";

import { useQuery } from "@tanstack/react-query";

import { getJobs } from "../api/jobs.api";
import { jobKeys } from "@/lib/query-client";
import { JobFilters } from "../types";

export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => getJobs(filters),
  });
}
