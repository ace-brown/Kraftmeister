import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateInvoiceItemDto {
  @ApiProperty({ example: 'Arbeitszeit' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0.01)
  quantity!: number;

  @ApiProperty({ example: 85.0 })
  @IsNumber()
  @Min(0)
  unitPrice!: number;

  @ApiPropertyOptional({ example: 19 })
  @IsNumber()
  @IsOptional()
  vatRate?: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 'clxyz123' })
  @IsString()
  customerId!: string;

  @ApiPropertyOptional({ example: 'clxyz456' })
  @IsString()
  @IsOptional()
  quoteId?: string;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiProperty({ type: [CreateInvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items!: CreateInvoiceItemDto[];
}
