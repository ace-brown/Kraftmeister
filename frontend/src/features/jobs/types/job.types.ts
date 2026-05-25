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
  status?: string;
  address?: string;
};

export type UpdateJobPayload = {
  id: string;
  data: Partial<CreateJobPayload>;
};
