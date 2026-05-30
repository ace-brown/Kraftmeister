import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url } = req;
    const userId = (req as Request & { user?: { id: string } }).user?.id ?? 'anonymous';
    const requestId = req.headers['x-request-id'] as string | undefined;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.info(
          { method, path: url, duration, userId, requestId },
          `${method} ${url} ${duration}ms`,
        );
      }),
    );
  }
}
