import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  findAll(search?: string) {
    const where: any = { deletedAt: null };

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

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) throw new NotFoundException('Keine Kunde gefunden!');

    return customer;
  }

  async create(data: CreateCustomerDto) {
    // TODO Phase 4.3: replace with companyId from JWT
    const company = await this.prisma.company.findFirstOrThrow();
    return this.prisma.customer.create({ data: { ...data, companyId: company.id } });
  }

  update(data: UpdateCustomerDto, id: string) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  // Soft delete
  delete(id: string) {
    return this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
