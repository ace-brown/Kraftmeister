import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Get()
  findAllJobs() {
    return this.jobService.findAll();
  }

  @Get(':id')
  findOneJob(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post()
  createJob(@Body() jobDto: CreateJobDto) {
    return this.jobService.create(jobDto);
  }
}
