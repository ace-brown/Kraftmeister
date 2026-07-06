import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceStatusDto } from './dtos/update-invoice-status.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  /** Computes subtotal, VAT amount, and total from a list of line items, each with its own VAT rate. */
  private calcTotals(
    items: { quantity: number; unitPrice: number; vatRate: number }[],
  ) {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const vatAmount = items.reduce(
      (sum, i) => sum + i.quantity * i.unitPrice * (i.vatRate / 100),
      0,
    );
    const total = subtotal + vatAmount;
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  }

  /** Generates a sequential invoice number in the format KM-YYYY-NNNN, scoped to the company and current year. */
  private async generateInvoiceNumber(companyId: string): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.invoice.count({
      where: { companyId, createdAt: { gte: new Date(`${year}-01-01`) } },
    });
    return `KM-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  /** Returns all invoices for the company with computed totals. */
  async findAll(companyId: string) {
    const invoices = await this.prisma.invoice.findMany({
      where: { companyId },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return invoices.map((inv) => ({ ...inv, ...this.calcTotals(inv.items) }));
  }

  /** Returns a single invoice with items, customer, and linked quote, throwing 404 if not found or owned by another company. */
  async findOne(id: string, companyId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, companyId },
      include: {
        items: true,
        customer: true,
        quote: { select: { id: true, status: true } },
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return { ...invoice, ...this.calcTotals(invoice.items) };
  }

  /** Creates a new invoice with auto-generated invoice number and line items. */
  async create(dto: CreateInvoiceDto, companyId: string) {
    const invoiceNumber = await this.generateInvoiceNumber(companyId);

    const invoice = await this.prisma.invoice.create({
      data: {
        companyId,
        customerId: dto.customerId,
        quoteId: dto.quoteId ?? null,
        invoiceNumber,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        items: {
          create: dto.items.map((item) => ({
            ...item,
            vatRate: item.vatRate ?? 19,
          })),
        },
      },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
    });
    return { ...invoice, ...this.calcTotals(invoice.items) };
  }

  /** Updates the status of an invoice after verifying ownership, and returns the updated record with computed totals. */
  async updateStatus(id: string, dto: UpdateInvoiceStatusDto, companyId: string) {
    await this.findOne(id, companyId);
    const invoice = await this.prisma.invoice.update({
      where: { id },
      data: { status: dto.status },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
    });
    return { ...invoice, ...this.calcTotals(invoice.items) };
  }
}
