import { IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuoteStatus } from '@prisma/client';
import { CreateQuoteItemDto } from './create-quote.dto';

export class UpdateQuoteDto {
  @IsEnum(QuoteStatus)
  @IsOptional()
  status?: QuoteStatus;

  @IsNumber()
  @IsOptional()
  vatRate?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuoteItemDto)
  items?: CreateQuoteItemDto[];
}
