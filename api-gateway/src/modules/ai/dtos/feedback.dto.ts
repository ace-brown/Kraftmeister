import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({ example: 'suggest-items' })
  @IsString()
  feature!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  rating!: boolean;
}
