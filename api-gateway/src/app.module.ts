import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './modules/jobs/jobs.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.dev' }),
    PrismaModule,
    RedisModule,
    JobsModule,
    CustomersModule,
    UsersModule,
  ],
})
export class AppModule {}
