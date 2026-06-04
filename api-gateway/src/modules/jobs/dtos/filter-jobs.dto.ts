import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsDateString } from 'class-validator';
import { JOB_STATUSES } from '../entities/job.entity';
import type { JobStatus } from '../entities/job.entity';

export class FilterJobsDto {
  @ApiPropertyOptional({ enum: JOB_STATUSES, example: 'OPEN' })
  @IsOptional()
  @IsIn(JOB_STATUSES)
  status?: JobStatus;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  date?: string; // expected format: YYYY-MM-DD
}
