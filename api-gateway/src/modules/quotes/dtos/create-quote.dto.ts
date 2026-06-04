import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateQuoteItemDto {
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
}

export class CreateQuoteDto {
  @ApiProperty({ example: 'clxyz123' })
  @IsString()
  customerId!: string;

  @ApiPropertyOptional({ example: 'clxyz456' })
  @IsString()
  @IsOptional()
  jobId?: string;

  @ApiPropertyOptional({ example: 19 })
  @IsNumber()
  @IsOptional()
  vatRate?: number;

  @ApiProperty({ type: [CreateQuoteItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuoteItemDto)
  items!: CreateQuoteItemDto[];
}
