export const JOB_STATUSES = [
  'OPEN',
  'IN_PROGRESS',
  'DONE',
  'CANCELLED',
] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];
