import { IsString, IsOptional, IsIn } from 'class-validator';

type JobStatus = 'open' | 'in-progress' | 'done';

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['open', 'in-progress', 'done'])
  status?: JobStatus;

  @IsOptional()
  @IsString()
  address?: string;
}
