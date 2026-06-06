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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';
import { MinioService } from '../minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobService: JobsService,
    private readonly minioService: MinioService,
  ) {}

  @Get()
  findAllJobs(@Query() filters: FilterJobsDto) {
    return this.jobService.findAll(filters);
  }

  @Get(':id')
  findJobById(@Param('id') id: string) {
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

  /** Accepts a multipart file upload, stores it in MinIO, and appends the URL to the job. */
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/photos')
  async uploadPhoto(@UploadedFile() file, @Param('id') id: string) {
    const url = await this.minioService.uploadPhoto(file, id);
    return this.jobService.addPhoto(id, url);
  }
}
