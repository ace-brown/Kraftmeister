import * as Sentry from '@sentry/nextjs';

/** Initialises Sentry for the browser. Runs on every page load in the client bundle. */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
});
