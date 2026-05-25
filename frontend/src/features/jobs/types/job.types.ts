export type JobStatus = "open" | "in-progress" | "done";

export interface Job {
  id: string;
  title: string;
  description?: string;
  status: JobStatus;
  address?: string;
  createdAt: string;
}

export interface JobDetailStatusProps {
  status: JobStatus;
}

export type CreateJobPayload = {
  title: string;
  description?: string;
  status?: string;
  address?: string;
};
