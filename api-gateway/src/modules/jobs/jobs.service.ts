import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  /** Returns all jobs matching the given filters, ordered by creation date descending. */
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

  /** Returns a single job by ID, throwing 404 if not found. */
  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) throw new NotFoundException('Job nicht gefunden!');

    return job;
  }

  /** Creates a new job, resolving companyId from the first company (to be replaced with JWT companyId in Phase 4.3). */
  async create(data: CreateJobDto) {
    // TODO Phase 4.3: replace with companyId from JWT
    const company = await this.prisma.company.findFirstOrThrow();
    return this.prisma.job.create({ data: { ...data, companyId: company.id } });
  }

  /** Partially updates a job's fields. */
  update(data: UpdateJobDto, id: string) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }

  /** Permanently deletes a job by ID. */
  delete(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }

  /** Removes a photo URL from the job's photos array. */
  async removePhoto(id: string, url: string) {
    const job = await this.findOne(id);
    return this.prisma.job.update({
      where: { id },
      data: { photos: job.photos.filter((p) => p !== url) },
    });
  }

  /** Appends a photo URL to the job's photos array. */
  addPhoto(id: string, url: string) {
    return this.prisma.job.update({
      where: { id },
      data: { photos: { push: url } },
    });
  }
}
