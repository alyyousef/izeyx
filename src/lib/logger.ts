type LogLevel = "info" | "warn" | "error";

export type LogContext = Record<string, string | number | boolean | null | undefined | string[]>;

function serialiseError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(typeof (error as Error & { digest?: unknown }).digest === "string"
        ? { digest: (error as Error & { digest: string }).digest }
        : {}),
    };
  }

  return { name: "UnknownError", message: "A non-Error value was thrown." };
}

function write(level: LogLevel, event: string, context: LogContext = {}, error?: unknown) {
  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    service: "izeyx-web",
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
    ...context,
    ...(error === undefined ? {} : { error: serialiseError(error) }),
  });

  if (level === "error") {
    console.error(payload);
  } else if (level === "warn") {
    console.warn(payload);
  } else {
    console.info(payload);
  }
}

export const logger = {
  info(event: string, context?: LogContext) {
    write("info", event, context);
  },
  warn(event: string, context?: LogContext) {
    write("warn", event, context);
  },
  error(event: string, error: unknown, context?: LogContext) {
    write("error", event, context, error);
  },
};
