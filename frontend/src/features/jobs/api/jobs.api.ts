import { apiClient } from "@/lib/api/client";
import {
  CreateJobPayload,
  Job,
  JobFilters,
  UpdateJobPayload,
} from "../types/job.types";

export async function getJobs(filters?: JobFilters): Promise<Job[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append("status", filters.status);
  if (filters?.date) params.append("date", filters.date);

  const query = params.toString();

  const url = query ? `/jobs?${query}` : "/jobs";

  return apiClient(url);
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
