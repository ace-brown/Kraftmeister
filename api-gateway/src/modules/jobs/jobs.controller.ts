import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
    this.jobService.create(jobDto);
  }
}
