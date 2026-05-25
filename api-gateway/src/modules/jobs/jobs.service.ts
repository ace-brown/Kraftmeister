import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  findAll(filters: FilterJobsDto) {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.date) {
      const start = new Date(filters.date);
      const end = new Date(filters.date);
      end.setDate(end.getDate() + 1);
      where.createdAt = { gte: start, lt: end };
    }

    return this.prisma.job.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) throw new NotFoundException('Job nicht gefunden!');

    return job;
  }

  create(data: CreateJobDto) {
    return this.prisma.job.create({ data });
  }

  update(data: UpdateJobDto, id: string) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }
}
