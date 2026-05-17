"use client";

import { useQuery } from "@tanstack/react-query";

import { getJobs } from "../api/jobs.api";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
}
