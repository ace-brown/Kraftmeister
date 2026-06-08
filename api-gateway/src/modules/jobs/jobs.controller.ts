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
import { DeletePhotoDto } from './dtos/delete-photo.dto';

@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobService: JobsService,
    private readonly minioService: MinioService,
  ) {}

  /** Returns all jobs, optionally filtered by status and/or creation date. */
  @Get()
  findAllJobs(@Query() filters: FilterJobsDto) {
    return this.jobService.findAll(filters);
  }

  /** Returns a single job by ID, or 404 if not found. */
  @Get(':id')
  findJobById(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  /** Creates a new job under the current company. */
  @Post()
  createJob(@Body() jobDto: CreateJobDto) {
    return this.jobService.create(jobDto);
  }

  /** Partially updates a job's fields. */
  @Patch(':id')
  updateJob(@Body() jobDto: UpdateJobDto, @Param('id') id: string) {
    return this.jobService.update(jobDto, id);
  }

  /** Permanently deletes a job by ID. */
  @Delete(':id')
  @HttpCode(204)
  deleteJob(@Param('id') id: string) {
    return this.jobService.delete(id);
  }

  /** Deletes a photo from MinIO and removes its URL from the job. */
  @Delete(':id/photos')
  @HttpCode(204)
  async deletePhoto(@Body() { url }: DeletePhotoDto, @Param('id') id: string) {
    await this.minioService.deletePhoto(url);
    return this.jobService.removePhoto(id, url);
  }

  /** Accepts a multipart file upload, stores it in MinIO, and appends the URL to the job. */
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/photos')
  async uploadPhoto(@UploadedFile() file, @Param('id') id: string) {
    const url = await this.minioService.uploadPhoto(file, id);
    return this.jobService.addPhoto(id, url);
  }
}
