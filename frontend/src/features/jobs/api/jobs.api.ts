import { apiClient } from "@/lib/api/client";
import {
  CreateJobPayload,
  Job,
  JobFilters,
  UpdateJobPayload,
} from "../types/job.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

export async function deleteJob(id: string): Promise<void> {
  return apiClient(`/jobs/${id}`, { method: "DELETE" });
}

/** Uploads a photo file for a job — uses raw fetch because apiClient forces JSON content-type. */
export async function uploadJobPhoto(id: string, file: File): Promise<Job> {
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/jobs/${id}/photos`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) throw new Error("Photo upload failed");
  return res.json();
}
