import { apiClient } from "@/lib/api/client";
import { CreateJobPayload, Job, UpdateJobPayload } from "../types/job.types";

export async function getJobs(): Promise<Job[]> {
  return apiClient("/jobs");
}

export async function getJob(id: string): Promise<Job> {
  return apiClient(`/jobs/${id}`);
}

export async function createJob(data: CreateJobPayload): Promise<Job> {
  return apiClient("/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateJob({ id, data }: UpdateJobPayload): Promise<Job> {
  return apiClient(`/jobs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
