import * as Sentry from "@sentry/nextjs";
import { logger, type LogContext } from "@/lib/logger";

export function reportServerError(event: string, error: unknown, context: LogContext = {}) {
  logger.error(event, error, context);

  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  Sentry.withScope((scope) => {
    scope.setTag("event", event);
    Object.entries(context).forEach(([key, value]) => {
      if (value !== undefined) scope.setExtra(key, value);
    });
    Sentry.captureException(error);
  });
}
