import * as Sentry from '@sentry/nextjs';

/** Initialises Sentry for the Next.js server runtime (SSR, API routes, Server Components). */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
});
