# DEPLOYMENT.md

This app is a standard Next.js 16 App Router project with no static-export constraints (it uses Server Actions for the contact form and dynamic OG/icon image generation, both of which need a Node.js server runtime, not `output: "export"`). It will deploy cleanly to Vercel or any Node-compatible host (Netlify, Render, a self-managed Node server behind a reverse proxy, etc.).

**Nothing has been deployed as part of this build.** The steps below are guidance for whoever deploys it, with explicit authorisation, when ready.

## Before deploying

1. Run the full validation sequence locally and confirm it's clean:
   ```bash
   npm install
   npm run lint
   npm run typecheck
   npm run test:unit
   npm run build
   npx playwright install chromium
   npm run test:e2e
   ```
2. Set the environment variables listed in `.env.example` / README section 18 in the host's environment configuration. `NEXT_PUBLIC_SITE_URL` is required and production builds reject missing, local, non-HTTPS, or path-based values. Set the three `CONTACT_*`/`EMAIL_PROVIDER_API_KEY` variables for online enquiry delivery; without them, enquiries are not sent or stored and the UI directs visitors to the published contact details. Configure `NEXT_PUBLIC_SENTRY_DSN` before launch if centralized error alerts are required; add Sentry source-map credentials only as protected CI or hosting secrets.
3. Point DNS for `izeyx.com` at the chosen host once one is picked. Nothing in the codebase assumes a specific host.
4. Work through `PRE_LAUNCH_CHECKLIST.md`, in particular verifying the currently published business contact details and completing legal review of `/privacy` and `/terms`.

## Vercel (typical path for a Next.js app)

1. Import the repository into Vercel.
2. Framework preset: Next.js (auto-detected).
3. Add the environment variables from `.env.example` under Project Settings → Environment Variables.
4. Deploy. No custom build command or output directory override is needed.

## Any other Node host

1. `npm install && npm run build`
2. `npm run start` (runs `next start`, defaults to port 3000, set `PORT` if the host requires a different one)
3. Ensure the host injects the same environment variables listed in `.env.example`.

## Things that are already handled

- **Domain configuration is centralised**, `siteConfig.url` (`src/lib/site-config.ts`) validates and normalizes `NEXT_PUBLIC_SITE_URL`, and every canonical URL, sitemap entry, and OpenGraph URL derives from it. Production builds reject missing or unsafe origins.
- **No absolute local paths:** all asset references are root-relative (`/images/...`).
- **No secrets in the client bundle**, `EMAIL_PROVIDER_API_KEY` is only read inside a `"use server"` module (`src/lib/contact-mailer.ts`, imported only from `src/app/contact/actions.ts`).
- **Production diagnostics:** server events are structured JSON and contact-delivery errors are sent to Sentry when a DSN is configured, without default PII collection. Sentry source-map credentials are build-only secrets.
- **Automated checks:** `.github/workflows/ci.yml` runs lint, typecheck, unit tests, production build, route smoke tests, keyboard navigation checks, and automated Axe accessibility scans.
- **`sitemap.xml` / `robots.txt`** are generated from the same content data that drives the actual routes (`src/app/sitemap.ts`, `src/app/robots.ts`), so they can't silently drift out of sync.
- **Freshness metadata is conservative:** sitemap entries only include `lastModified` when the content has a real known date (currently insight publication dates), rather than treating every deployment as a content update.

## Things to decide at deploy time (not codebase concerns)

- Whether to point `EMAIL_PROVIDER_API_KEY` at Resend (the implemented default, see `src/lib/contact-mailer.ts`) or swap in a different provider.
- Whether to add analytics. None is included by default (see DESIGN.md / brief: "Do not include analytics until a provider is deliberately configured"). Add it deliberately, then update `/privacy` accordingly.
- CDN/image-hosting strategy once real photography replaces the `MediaPlaceholder` components (see `TODO_ASSETS.md`), `next/image` handles optimisation automatically once real files exist under `public/images/`.
- **Self-hosted cache invalidation:** Next may serve generated static responses with long shared-cache lifetimes. Deploy releases atomically (or explicitly purge the reverse proxy/CDN) so a new release cannot continue serving pages from the previous build. Vercel's immutable deployment model handles replacement; custom hosting must verify it.
