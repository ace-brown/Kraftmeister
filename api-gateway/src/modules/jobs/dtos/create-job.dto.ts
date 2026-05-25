import { IsString, IsOptional, IsIn } from 'class-validator';
import { JOB_STATUSES } from '../entities/job.entity';
import type { JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(JOB_STATUSES)
  status?: JobStatus;

  @IsOptional()
  @IsString()
  address?: string;
}
