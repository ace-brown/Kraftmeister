import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as Record<string, unknown>).message ??
          exception.message);

    const body = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error(
      { statusCode, path: request.url },
      `HTTP ${statusCode}: ${request.method} ${request.url}`,
    );

    response.status(statusCode).json(body);
  }
}
