import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'clxyz123' })
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ enum: Role, default: Role.ADMIN })
  @IsEnum(Role)
  role: Role = Role.ADMIN;
}
