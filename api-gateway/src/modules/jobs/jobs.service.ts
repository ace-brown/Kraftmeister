import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  /** Returns all jobs for the company matching the given filters, ordered by creation date descending. */
  findAll(companyId: string, filters: FilterJobsDto) {
    const where: any = { companyId };

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

  /** Returns a single job by ID scoped to the company, throwing 404 if not found or owned by another company. */
  async findOne(id: string, companyId: string) {
    const job = await this.prisma.job.findFirst({
      where: { id, companyId },
    });

    if (!job) throw new NotFoundException('Job nicht gefunden!');

    return job;
  }

  /** Creates a new job under the given company. */
  async create(data: CreateJobDto, companyId: string) {
    return this.prisma.job.create({ data: { ...data, companyId } });
  }

  /** Partially updates a job's fields after verifying ownership. */
  async update(data: UpdateJobDto, id: string, companyId: string) {
    await this.findOne(id, companyId);
    return this.prisma.job.update({ where: { id }, data });
  }

  /** Permanently deletes a job by ID after verifying ownership. */
  async delete(id: string, companyId: string) {
    await this.findOne(id, companyId);
    return this.prisma.job.delete({ where: { id } });
  }

  /** Removes a photo URL from the job's photos array after verifying ownership. */
  async removePhoto(id: string, url: string, companyId: string) {
    const job = await this.findOne(id, companyId);
    return this.prisma.job.update({
      where: { id },
      data: { photos: job.photos.filter((p) => p !== url) },
    });
  }

  /** Appends a photo URL to the job's photos array after verifying ownership. */
  async addPhoto(id: string, url: string, companyId: string) {
    await this.findOne(id, companyId);
    return this.prisma.job.update({
      where: { id },
      data: { photos: { push: url } },
    });
  }
}
