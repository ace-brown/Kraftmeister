import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { InvoiceStatus } from '@prisma/client';

export class UpdateInvoiceStatusDto {
  @ApiProperty({ enum: InvoiceStatus, example: 'SENT' })
  @IsEnum(InvoiceStatus)
  status!: InvoiceStatus;
}
