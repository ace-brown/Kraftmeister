import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.job.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(data: CreateJobDto) {
    return this.prisma.job.create({ data });
  }
}
