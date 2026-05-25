import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';

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

  @Patch(':id')
  updateJob(@Body() jobDto: UpdateJobDto, @Param('id') id: string) {
    return this.jobService.update(jobDto, id);
  }
}
