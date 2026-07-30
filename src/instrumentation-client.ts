import { getSentryClient } from "@/lib/client-monitoring";

// Monitoring is useful, but it is not render-critical. Loading it in idle
// time keeps SDK evaluation off the first-paint path. Navigations and actual
// error boundaries still request it immediately when needed.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const startMonitoring = () => {
    void getSentryClient();
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(startMonitoring, { timeout: 3000 });
  } else {
    globalThis.setTimeout(startMonitoring, 1500);
  }
}

export function onRouterTransitionStart(
  url: string,
  navigationType: "push" | "replace" | "traverse"
) {
  void getSentryClient().then((Sentry) => {
    Sentry?.captureRouterTransitionStart(url, navigationType);
  });
}
