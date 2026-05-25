export const JOB_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "DONE",
  "CANCELLED",
] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CANCELLED: "Cancelled",
};

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

export interface JobDetailActionsProps {
  onEdit: () => void;
}

export interface JobEditDialogProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type CreateJobPayload = {
  title: string;
  description?: string;
  status?: JobStatus;
  address?: string;
};

export type UpdateJobPayload = {
  id: string;
  data: Partial<CreateJobPayload>;
};

export type JobFilters = {
  status?: JobStatus;
  date?: string;
};
