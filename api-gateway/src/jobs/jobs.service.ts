import { Injectable } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(public jobs: JobsRepository) {}

  findById(id: string) {
    return this.jobs.findById(id);
  }

  findAll() {
    return this.jobs.findAll();
  }

  create(job: any) {
    return this.jobs.create(job);
  }
}
