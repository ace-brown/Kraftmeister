import * as Sentry from '@sentry/nestjs';

/** Initialises Sentry error tracking. Must be imported before any other module in main.ts. */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
});
