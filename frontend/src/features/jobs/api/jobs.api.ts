import { apiClient } from "@/lib/api/client";
import { CreateJobPayload, Job } from "../types/job.types";

export async function getJobs(): Promise<Job[]> {
  return apiClient("/jobs");
}

export async function getJob(id: string) {
  return apiClient(`/jobs/${id}`);
}

export async function createJob(data: CreateJobPayload): Promise<Job> {
  return apiClient("/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
