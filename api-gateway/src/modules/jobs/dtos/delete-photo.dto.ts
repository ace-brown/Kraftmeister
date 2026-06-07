import { IsString } from 'class-validator';

export class DeletePhotoDto {
  @IsString()
  url: string;
}
