import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
}
