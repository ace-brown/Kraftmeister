import { IsOptional, IsIn, IsDateString } from 'class-validator';
import { JOB_STATUSES } from '../entities/job.entity';
import type { JobStatus } from '../entities/job.entity';

export class FilterJobsDto {
  @IsOptional()
  @IsIn(JOB_STATUSES)
  status?: JobStatus;

  @IsOptional()
  @IsDateString()
  date?: string; // expected format: YYYY-MM-DD
}
