import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IncomingMessage } from 'http';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JobsModule } from './modules/jobs/jobs.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.dev' }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: { colorize: true, singleLine: true },
              }
            : undefined,
        level: process.env.LOG_LEVEL ?? 'info',
        genReqId: (req: IncomingMessage) => {
          const id =
            (req.headers['x-request-id'] as string | undefined) ?? randomUUID();
          (req.headers as Record<string, string>)['x-request-id'] = id;
          return id;
        },
      },
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    JobsModule,
    CustomersModule,
    QuotesModule,
    InvoicesModule,
    AiModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
