import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiBearerAuth()
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  /** Returns all quotes for the company with computed subtotal, VAT, and total. */
  @Get()
  findAll(@CurrentUser() user: { companyId: string }) {
    return this.quotesService.findAll(user.companyId);
  }

  /** Returns a single quote with items, customer, job, and linked invoice, or 404 if not found. */
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.quotesService.findOne(id, user.companyId);
  }

  /** Creates a new quote with line items and calculates the total at the given VAT rate. */
  @Post()
  create(
    @Body() dto: CreateQuoteDto,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.quotesService.create(dto, user.companyId);
  }

  /** Partially updates a quote's status, VAT rate, or line items (replacing all items if provided). */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateQuoteDto,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.quotesService.update(id, dto, user.companyId);
  }

  /** Converts a quote into an invoice, copying its line items and generating an invoice number. */
  @Post(':id/convert-to-invoice')
  convertToInvoice(
    @Param('id') id: string,
    @CurrentUser() user: { companyId: string },
  ) {
    return this.quotesService.convertToInvoice(id, user.companyId);
  }
}
