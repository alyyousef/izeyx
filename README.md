# IZEYX: izeyx.com

## 1. Project overview

The complete marketing website for IZEYX, a B2B digital transformation and technology services company. Built with Next.js App Router, TypeScript, and Tailwind CSS v4. Full design rationale lives in the [design system](docs/design.md); product/business context lives in the [product brief](docs/product.md).

## 2. Business overview

IZEYX helps growing businesses replace fragmented, manual ways of working with connected digital systems, including websites, custom software, automation, AI agents, systems integration, and data/analytics, delivered as one coherent operating layer rather than disconnected purchases. The site's job is to generate qualified B2B enquiries via the "Book a discovery call" conversion path. See the [product brief](docs/product.md) for full positioning, audience, and constraints.

## 3. Technology stack

- Next.js 16 (App Router, React Server Components, Turbopack)
- React 19.2, TypeScript (strict)
- Tailwind CSS v4 (`@theme inline` token system, no separate config file)
- `next/font` (Source Serif 4, Geist, Geist Mono)
- Server Actions for the contact form (no client-side form library)
- Vitest unit tests, Playwright browser tests, and axe accessibility checks
- Structured JSON logs with optional Sentry error monitoring
- No UI component library, no animation library, and no analytics; see the [design system](docs/design.md) for why

## 4. Prerequisites

- Node.js 20.9+ (required by Next.js 16)
- npm (this project uses npm; a `package-lock.json` is committed)

## 5. Installation

```bash
npm install
```

## 6. Development commands

```bash
npm run dev         # start the dev server at http://localhost:3000
npm run lint         # ESLint (flat config)
npm run typecheck    # tsc --noEmit
npm run test:unit    # contact and static-content unit tests
npm run test:e2e     # route, accessibility, and keyboard checks
npm run test:unit    # contact-flow and static-content tests
npm run test:e2e     # route, keyboard, and accessibility checks (starts the dev server locally)
```

## 7. Production build

```bash
npm run build
npm run start        # serve the production build locally
```

## 8. Folder structure

```
src/
  app/                  # routes (App Router), one folder per URL segment
  components/
    ui/                 # Button, Container, Section, SectionHeader, LogoWordmark, Breadcrumbs...
    layout/             # SiteFooter
    navigation/         # SiteHeader, MobileNavigation, HeaderToneWatcher
    sections/           # homepage/page-level composed sections (Hero, CtaSection, cards...)
    diagrams/           # SystemDiagram, WorkflowDiagram, ProcessTimeline
    media/              # MediaPlaceholder
    forms/              # ContactForm
  data/                  # typed content: services, work, insights, process, capabilities
  lib/                   # site-config, seo helpers, contact validation/mailer
  types/                  # shared content types
assets/brand/             # full-resolution editable brand-source files
public/images/            # runtime website images organized by content type
```

## 9. Design system overview

See the [design system](docs/design.md) for the full direction contract, color/typography rationale, layout system, diagram system, and anti-pattern checklist. In short: an editorial, systems-diagram visual language (not a template SaaS look), with semantic CSS custom-property tokens consumed via Tailwind's `@theme inline`, and a `.on-dark` class that re-points every token so the same components work correctly on light and dark sections without duplicated dark-mode classes.

## 10. Brand colours

Fixed: black `#000000`, primary blue-violet `#3432C7`, deep blue `#1800AD`. The full semantic token table (backgrounds, surfaces, text, borders, focus, success/error) is in the [design system](docs/design.md) §1 and defined in `src/app/globals.css`. Never hardcode hex values in components; use the existing `bg-*`/`text-*`/`border-*` utilities, which read from the tokens.

## 11. Typography

Display (hero + major headings only): **Source Serif 4**. Body, interface, and card/list titles: **Geist**. Genuinely technical content only (e.g. filenames): **Geist Mono**. Composite `.text-display`/`.text-heading`/`.text-subheading`/`.text-title`/`.label`/`.text-meta` classes in `src/app/globals.css` bundle family + size + weight + tracking per role; use those instead of stacking raw Tailwind text utilities. The rationale is in the [design system](docs/design.md) §2. Loaded via `next/font/google` in `src/app/layout.tsx`.

## 12–15. Editing content (services, case studies, insights, process)

All editorial content is in `src/data/*.ts` as typed arrays, with no CMS or database. Full field-by-field editing instructions are in the **[content guide](docs/content-guide.md)**. Quick reference:

| Content | File | Adds/removes a route automatically? |
|---|---|---|
| Services | `src/data/services.ts` | Yes; `/services/[slug]` is generated from this array |
| Case studies | `src/data/work.ts` | Yes; `/work/[slug]` |
| Insight articles | `src/data/insights.ts` | Yes; `/insights/[slug]` |
| Process stages | `src/data/process.ts` | No; fixed 8-stage structure on `/process` and the homepage |
| Homepage capability index | `src/data/capabilities.ts` | No |
| Nav, footer links, site metadata, contact/social details | `src/lib/site-config.ts` | No |

## 16. Replacing images

Unfilled photo, screenshot, and portrait slots use clean, text-free `MediaPlaceholder` visuals. The full replacement list, including filenames, dimensions, aspect ratios, and alt-text guidance, is in the **[asset replacement plan](docs/asset-todo.md)**.

## 17. Contact form configuration

The form (`src/components/forms/ContactForm.tsx`) validates client- and server-side (`src/lib/contact-validation.ts`), submits via a Server Action (`src/app/contact/actions.ts`), and sends through a provider-agnostic mailer (`src/lib/contact-mailer.ts`) gated entirely by environment variables. **Without those variables, enquiries are not delivered or stored: the form clearly reports that online submission is unavailable and directs the visitor to the published phone/email details.** It never reports a genuine enquiry as sent unless delivery succeeds. Spam mitigation is a honeypot field (real visitors never fill it; no CAPTCHA dependency added).

To make it actually send email, set the three variables below (see §18). The default implementation targets the [Resend](https://resend.com) API; swap the `fetch` call in `contact-mailer.ts` for a different provider if preferred. The validation, gating, and honest-failure behavior stay the same either way.

## 18. Environment variables

Copy `.env.example` to `.env.local` for development, or set these in your host for production:

| Variable | Required for | Notes |
|---|---|---|
| `CONTACT_RECIPIENT_EMAIL` | Contact form to send | Where enquiries land |
| `CONTACT_FROM_EMAIL` | Contact form to send | Must be authorised with your email provider |
| `EMAIL_PROVIDER_API_KEY` | Contact form to send | Never exposed to the client; read only in the Server Action |
| `NEXT_PUBLIC_SITE_URL` | Production builds and correct canonical/OG/sitemap URLs | Required in production; must be a public HTTPS origin |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional centralized error reporting | Public project DSN; default PII collection is disabled |
| `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` | Optional source-map upload | Build/CI secrets; never expose the auth token to the browser |
| `NEXT_PUBLIC_SENTRY_DSN` | Central error reporting | Optional; reporting remains disabled when unset |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Performance tracing | Optional; defaults to `0` (disabled) |
| `NEXT_PUBLIC_APP_ENV` | Client error environment label | Optional environment name |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | Production source-map uploads | Optional build secrets; never expose the auth token to the browser |

None of these are committed; `.gitignore` excludes `.env*` while keeping `.env.example` tracked.

## 19. Testing and CI

`tests/unit` checks contact parsing, validation, delivery-state behavior, honeypot handling, and relationships between typed content records. `tests/e2e` smoke-tests representative static and dynamic routes, runs Axe against key pages, and verifies the mobile menu's keyboard focus trap, Escape behavior, and focus restoration.

GitHub Actions runs lint, typecheck, unit tests, the production build, and Chromium browser/accessibility tests for every push and pull request. To install the local browser once, run `npx playwright install chromium`; CI installs Chromium and its Linux dependencies automatically.

## 20. Logging and error monitoring

Server events are emitted as single-line structured JSON through `src/lib/logger.ts`. Contact events include a generated request ID, provider/status metadata, and the selected service category, but never the visitor's name, email, company, phone, role, or message. Caught delivery failures are both logged and reported through `src/lib/monitoring.ts`.

Sentry is optional and stays inactive until `NEXT_PUBLIC_SENTRY_DSN` is configured. Client, server, edge, route-transition, and request-error instrumentation are wired with `sendDefaultPii: false`. Configure alert routing in the Sentry project for the appropriate operational channel.

## 21. Deployment

See the **[deployment guide](docs/deployment.md)**. The app has no local-filesystem or absolute-path dependencies and builds as a standard Next.js app suitable for Vercel or any Node-compatible host.

## 22. SEO configuration

Central config in `src/lib/site-config.ts` (name, domain, default title/description) and `src/lib/seo.ts` (`buildMetadata`, JSON-LD helpers for Organization/Article/Breadcrumb schema). Every route sets unique metadata via `buildMetadata`; `src/app/sitemap.ts` and `src/app/robots.ts` are generated from the same content data so they can't drift out of sync with real routes.

## 23. Accessibility notes

Target: WCAG 2.2 AA. Skip-to-content link, semantic landmarks, visible focus states (including on dark sections via a lighter `--focus-dark` token; see the [design system](docs/design.md)), keyboard-operable mobile menu (focus trap on open, Escape to close, focus returned to the trigger), accessible disclosure controls (native `<details>`/`<summary>` for FAQs and the capability index, which work without JavaScript), form error summaries with `role="alert"` and programmatic focus management, and global support for `prefers-reduced-motion`. This is not a substitute for a manual screen-reader pass before launch; see the [pre-launch checklist](docs/pre-launch-checklist.md).

## 24. Remaining placeholders

The full list is in the **[asset replacement plan](docs/asset-todo.md)**. The published email, phone, New Cairo address, working hours, LinkedIn, and X profile are marked as confirmed in `src/lib/site-config.ts`. The calendar booking URL remains an unpublished placeholder, while photography, team profiles, and approved case-study assets still need final content.

## 25. Pre-launch checklist

See the **[pre-launch checklist](docs/pre-launch-checklist.md)**.
