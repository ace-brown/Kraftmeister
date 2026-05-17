import { apiClient } from "@/lib/api/client";
import { Job } from "../types/job.types";

export async function getJobs(): Promise<Job[]> {
  return apiClient("/jobs");
}
