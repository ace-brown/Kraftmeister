import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';
import { JobsService } from './jobs.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [JobsController],
  providers: [JobsRepository, JobsService],
  imports: [PrismaService],
})
export class JobsModule {}
