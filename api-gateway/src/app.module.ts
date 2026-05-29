import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule, JobsModule, CustomersModule],
})
export class AppModule {}
