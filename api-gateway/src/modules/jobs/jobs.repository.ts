import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class JobsRepository {
  async findById(id: string) {
    const content = await readFile('jobs.json', 'utf-8');
    const jobs = JSON.parse(content);
    return jobs[id];
  }

  async findAll() {
    const content = await readFile('jobs.json', 'utf-8');
    const jobs = JSON.parse(content);
    return jobs;
  }

  async create(job: any) {
    const content = await readFile('jobs.json', 'utf-8');
    const jobs = JSON.parse(content);

    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    jobs[id] = { id, job };

    await writeFile('jobs.json', JSON.stringify(jobs));
  }
}
