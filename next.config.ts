import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// Static-rendering-compatible CSP (no nonces): nonces would force every page
// into dynamic rendering, which throws away this site's static generation.
// 'unsafe-inline' is required for script-src (Next's hydration/RSC bootstrap
// scripts) and style-src (React inline `style={{ aspectRatio }}` in
// MediaPlaceholder/ProcessTimeline); the directives that matter most against
// injection (object-src, base-uri, form-action, frame-ancestors) stay locked
// down regardless. frame-src allows only the Google Maps embed used on
// /contact and /about; connect-src allows only Sentry's ingest hosts, which
// stay unused until NEXT_PUBLIC_SENTRY_DSN is actually configured.
// 'unsafe-eval' is dev-only: React's dev-mode stack-trace reconstruction
// calls eval(), which a production build never does (see Next's CSP guide).
const isDev = process.env.NODE_ENV === "development";
// Vercel serves the deployed site over HTTPS, where upgrading any accidental
// HTTP subresource is useful. Keep this directive out of local production
// previews: WebKit correctly upgrades localhost assets to HTTPS and the local
// `next start` server only speaks HTTP, which would make the page appear
// completely unstyled in Safari-focused tests.
const shouldUpgradeInsecureRequests = Boolean(process.env.VERCEL);
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self' https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io;
  frame-src https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${shouldUpgradeInsecureRequests ? "upgrade-insecure-requests;" : ""}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  // The on-screen dev-route indicator is development-only chrome (never
  // shipped in production), but it sits directly over the site's own
  // bottom-left UI during local review, so it's turned off here.
  devIndicators: false,
  // Stop advertising the framework/version to every response.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: cspHeader },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});
