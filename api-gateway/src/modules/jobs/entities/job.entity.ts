export const JOB_STATUSES = ['open', 'in-progress', 'done'] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];
