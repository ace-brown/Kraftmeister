import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SuggestItemsDto {
  @ApiProperty({ example: 'Badezimmer renovieren' })
  @IsString()
  jobDescription!: string;

  @ApiPropertyOptional({ example: 'Sanitär' })
  @IsString()
  @IsOptional()
  jobType?: string;
}
