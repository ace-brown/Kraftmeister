import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(public jobs: JobsService) {}

  @Get()
  findAllJobs() {
    return this.jobs.findAll();
  }

  @Post()
  createJob(@Body() body: CreateJobDto) {
    return this.jobs.create(body);
  }

  @Get('/:id')
  async findJobById(@Param('id') id: string) {
    const job = await this.jobs.findById(id);

    if (!job) throw new NotFoundException('Job not found');

    return job;
  }
}
