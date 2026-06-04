import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuoteStatus } from '@prisma/client';
import { CreateQuoteItemDto } from './create-quote.dto';

export class UpdateQuoteDto {
  @ApiPropertyOptional({ enum: QuoteStatus, example: 'DRAFT' })
  @IsEnum(QuoteStatus)
  @IsOptional()
  status?: QuoteStatus;

  @ApiPropertyOptional({ example: 19 })
  @IsNumber()
  @IsOptional()
  vatRate?: number;

  @ApiPropertyOptional({ type: [CreateQuoteItemDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuoteItemDto)
  items?: CreateQuoteItemDto[];
}
