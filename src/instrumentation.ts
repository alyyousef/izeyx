import * as Sentry from "@sentry/nextjs";
import type { Instrumentation } from "next";
import { logger } from "@/lib/logger";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  logger.error("request.unhandled_error", error, {
    method: request.method,
    route: context.routePath,
    routeType: context.routeType,
    router: context.routerKind,
  });

  Sentry.captureRequestError(error, request, context);
};
