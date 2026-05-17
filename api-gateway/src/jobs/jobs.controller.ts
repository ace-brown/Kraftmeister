import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job';

@Controller('jobs')
export class JobsController {
  @Get()
  findAllJobs() {
    return 'This action returns all jobs';
  }

  @Post()
  createJob(@Body() body: CreateJobDto) {
    console.log('body: ', body);
    return 'This action creates a new job';
  }

  @Get('/:id')
  findJobById(@Param('id') id: string) {
    console.log('id: ', id);
    return `This action returns a job with id ${id}`;
  }
}
