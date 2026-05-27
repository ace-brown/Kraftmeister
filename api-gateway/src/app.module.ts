import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [PrismaModule, JobsModule, CustomersModule],
})
export class AppModule {}
