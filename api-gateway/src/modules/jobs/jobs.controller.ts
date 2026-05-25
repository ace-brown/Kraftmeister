import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Get()
  findAllJobs(@Query() filters: FilterJobsDto) {
    return this.jobService.findAll(filters);
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

  @Delete(':id')
  @HttpCode(204)
  deleteJob(@Param('id') id: string) {
    return this.jobService.delete(id);
  }
}
