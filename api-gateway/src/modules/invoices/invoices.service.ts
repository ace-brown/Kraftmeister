import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceStatusDto } from './dtos/update-invoice-status.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

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

  private async generateInvoiceNumber(companyId: string): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.invoice.count({
      where: { companyId, createdAt: { gte: new Date(`${year}-01-01`) } },
    });
    return `KM-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  async findAll() {
    const company = await this.prisma.company.findFirstOrThrow();
    const invoices = await this.prisma.invoice.findMany({
      where: { companyId: company.id },
      include: {
        items: true,
        customer: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return invoices.map((inv) => ({ ...inv, ...this.calcTotals(inv.items) }));
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        items: true,
        customer: true,
        quote: { select: { id: true, status: true } },
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return { ...invoice, ...this.calcTotals(invoice.items) };
  }

  async create(dto: CreateInvoiceDto) {
    const company = await this.prisma.company.findFirstOrThrow();
    const invoiceNumber = await this.generateInvoiceNumber(company.id);

    const invoice = await this.prisma.invoice.create({
      data: {
        companyId: company.id,
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

  async updateStatus(id: string, dto: UpdateInvoiceStatusDto) {
    await this.findOne(id);
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
