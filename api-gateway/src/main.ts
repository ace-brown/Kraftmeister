import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
