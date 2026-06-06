import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';
import { JOB_STATUSES } from '../entities/job.entity';
import type { JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @ApiProperty({ example: 'Badezimmer renovieren' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ example: 'Fliesen und Sanitär erneuern' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: JOB_STATUSES, example: 'OPEN' })
  @IsOptional()
  @IsIn(JOB_STATUSES)
  status?: JobStatus;

  @ApiPropertyOptional({ example: 'Musterstraße 1, 10115 Berlin' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'clx123abc' })
  @IsOptional()
  @IsString()
  customerId?: string;
}
