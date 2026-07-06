import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceStatusDto } from './dtos/update-invoice-status.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiBearerAuth()
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  /** Returns all invoices for the company, each including computed subtotal, VAT, and total. */
  @Get()
  findAll(@CurrentUser() user: { companyId: string }) {
    return this.invoicesService.findAll(user.companyId);
  }

  /** Returns a single invoice with items, customer, and linked quote, or 404 if not found. */
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.invoicesService.findOne(id, user.companyId);
  }

  /** Creates a new invoice with line items and auto-generates an invoice number. */
  @Post()
  create(
    @Body() dto: CreateInvoiceDto,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.invoicesService.create(dto, user.companyId);
  }

  /** Updates the status of an invoice (DRAFT, SENT, PAID, CANCELLED). */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateInvoiceStatusDto,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.invoicesService.updateStatus(id, dto, user.companyId);
  }
}
