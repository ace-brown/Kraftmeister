import * as Sentry from '@sentry/nextjs';

/** Initialises Sentry for the Next.js edge runtime (middleware, edge API routes). */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
});
