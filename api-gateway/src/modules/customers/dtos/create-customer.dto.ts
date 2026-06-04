import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Max Mustermann' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'max@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+49 30 12345678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Musterstraße 1, 10115 Berlin' })
  @IsString()
  @IsOptional()
  address?: string;
}
