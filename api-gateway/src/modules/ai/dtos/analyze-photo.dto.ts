import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class AnalyzePhotoDto {
  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsUrl()
  imageUrl!: string;
}
