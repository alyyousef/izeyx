type SentryClient = typeof import("@sentry/nextjs");

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const tracesSampleRate = Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? "0");

let sentryClientPromise: Promise<SentryClient | null> | undefined;

/**
 * Loads the sizeable browser monitoring SDK only when client monitoring is
 * configured or an error boundary actually needs it. Server-side monitoring
 * remains available through instrumentation.ts from the start of a request.
 */
export function getSentryClient() {
  if (!sentryDsn) {
    return Promise.resolve(null);
  }

  sentryClientPromise ??= import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      enabled: true,
      environment: process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV,
      sendDefaultPii: false,
      tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0,
    });

    return Sentry;
  });

  return sentryClientPromise;
}
