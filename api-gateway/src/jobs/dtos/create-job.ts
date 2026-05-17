import { IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string | undefined;
  @IsString()
  description: string | undefined;
  @IsString()
  status: string | undefined;
}
