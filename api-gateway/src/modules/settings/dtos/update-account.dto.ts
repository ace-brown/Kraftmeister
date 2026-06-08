import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

// If newPassword is provided, the service must also require currentPassword.
export class UpdateAccountDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  currentPassword?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  newPassword?: string;
}
