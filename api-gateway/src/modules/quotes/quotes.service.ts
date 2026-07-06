import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  /** Computes subtotal, VAT amount, and total from line items at a single VAT rate. */
  private calcTotals(
    items: { quantity: number; unitPrice: number }[],
    vatRate: number,
  ) {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const vatAmount = subtotal * (vatRate / 100);
    const total = subtotal + vatAmount;
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  }

  /** Returns all quotes for the company with computed totals. */
  async findAll(companyId: string) {
    const quotes = await this.prisma.quote.findMany({
      where: { companyId },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return quotes.map((q) => ({ ...q, ...this.calcTotals(q.items, q.vatRate) }));
  }

  /** Returns a single quote with items, customer, job, and linked invoice, throwing 404 if not found or owned by another company. */
  async findOne(id: string, companyId: string) {
    const quote = await this.prisma.quote.findFirst({
      where: { id, companyId },
      include: {
        items: true,
        customer: true,
        job: { select: { id: true, title: true } },
        invoice: { select: { id: true, invoiceNumber: true, status: true } },
      },
    });
    if (!quote) throw new NotFoundException('Quote not found');
    return { ...quote, ...this.calcTotals(quote.items, quote.vatRate) };
  }

  /** Creates a new quote with line items and calculates the total at the specified VAT rate (defaults to 19%). */
  async create(dto: CreateQuoteDto, companyId: string) {
    const vatRate = dto.vatRate ?? 19;
    const { total } = this.calcTotals(dto.items, vatRate);

    const quote = await this.prisma.quote.create({
      data: {
        companyId,
        customerId: dto.customerId,
        jobId: dto.jobId ?? null,
        vatRate,
        total,
        items: { create: dto.items },
      },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
    });
    return { ...quote, ...this.calcTotals(quote.items, quote.vatRate) };
  }

  /** Updates a quote's status, VAT rate, or items in a transaction; replaces all items if a new items array is provided. */
  async update(id: string, dto: UpdateQuoteDto, companyId: string) {
    const existing = await this.findOne(id, companyId);
    const vatRate = dto.vatRate ?? existing.vatRate;

    return this.prisma.$transaction(async (tx) => {
      if (dto.items) {
        await tx.quoteItem.deleteMany({ where: { quoteId: id } });
      }
      const itemsForCalc = dto.items ?? existing.items;
      const { total } = this.calcTotals(itemsForCalc, vatRate);

      const updated = await tx.quote.update({
        where: { id },
        data: {
          ...(dto.status && { status: dto.status }),
          vatRate,
          total,
          ...(dto.items && { items: { create: dto.items } }),
        },
        include: {
          items: true,
          customer: { select: { id: true, name: true, email: true } },
        },
      });
      return { ...updated, ...this.calcTotals(updated.items, updated.vatRate) };
    });
  }

  /** Converts a quote to an invoice by copying its line items and auto-generating a sequential invoice number. */
  async convertToInvoice(id: string, companyId: string) {
    const quote = await this.findOne(id, companyId);

    const year = new Date().getFullYear();
    const count = await this.prisma.invoice.count({
      where: {
        companyId,
        createdAt: { gte: new Date(`${year}-01-01`) },
      },
    });
    const invoiceNumber = `KM-${year}-${String(count + 1).padStart(4, '0')}`;

    const invoice = await this.prisma.invoice.create({
      data: {
        companyId,
        customerId: quote.customerId,
        quoteId: id,
        invoiceNumber,
        items: {
          create: quote.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            vatRate: quote.vatRate,
          })),
        },
      },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
    });

    const subtotal = invoice.items.reduce(
      (sum, i) => sum + i.quantity * i.unitPrice,
      0,
    );
    const vatAmount = subtotal * (quote.vatRate / 100);
    const total = subtotal + vatAmount;
    return {
      ...invoice,
      subtotal: parseFloat(subtotal.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  }
}
