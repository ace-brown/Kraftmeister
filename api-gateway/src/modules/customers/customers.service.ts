import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  /** Returns all non-deleted customers, with optional case-insensitive search across name, email, and phone. */
  findAll(companyId: string, search?: string) {
    const where: any = { companyId, deletedAt: null };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.customer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Returns a single customer by ID, throwing 404 if not found. */
  async findOne(id: string, companyId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id, companyId },
    });

    if (!customer) throw new NotFoundException('Keine Kunde gefunden!');

    return customer;
  }

  /** Creates a new customer. */
  async create(data: CreateCustomerDto, companyId: string) {
    return this.prisma.customer.create({
      data: { ...data, companyId },
    });
  }

  /** Partially updates a customer's fields. */
  update(data: UpdateCustomerDto, id: string, companyId: string) {
    return this.prisma.customer.update({
      where: { id, companyId },
      data,
    });
  }

  /** Soft-deletes a customer by setting deletedAt, preserving historical data on jobs and invoices. */
  delete(id: string, companyId: string) {
    return this.prisma.customer.update({
      where: { id, companyId },
      data: { deletedAt: new Date() },
    });
  }
}
