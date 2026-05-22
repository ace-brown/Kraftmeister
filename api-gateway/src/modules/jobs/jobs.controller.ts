import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Get()
  findAllJobs() {
    return this.jobService.findAll();
  }

  @Post()
  createJob(@Body() jobDto: CreateJobDto) {
    return this.jobService.create(jobDto);
  }
}
