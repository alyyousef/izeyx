# Content guide

All editorial content lives in typed TypeScript data files under `src/data/`. There is no CMS and no database (see `product.md` for why a lightweight local-content approach was chosen deliberately for launch). Editing a data file and saving it is the entire workflow; TypeScript will flag a missing required field at build time rather than letting a broken page ship silently.

## Services: `src/data/services.ts`

An array of `Service` objects (type defined in `src/types/content.ts`). Each entry automatically becomes both a row on `/services` and a full page at `/services/[slug]`.

Fields:
- `slug`: the URL segment. Changing it changes the live URL; update any internal links (footer, `serviceSlugToInterest` in `src/lib/contact-form.ts`) if you rename one.
- `shortName`: used in compact contexts (related-services lists).
- `name`, `eyebrow`, `summary`, `problem`, `heroDescription`: copy for the hero and services-overview row.
- `problems`: string array rendered as the "what we typically hear" list.
- `deliverables`: string array; the first three appear on `/services`, the full list on the service page.
- `useCases`: `{ title, description }[]`, rendered as example situations.
- `engagementApproach`: exactly the number of steps you want shown (currently 3 each); rendered as a numbered row.
- `relatedServiceSlugs`: must match other services' `slug` values; controls the "Often paired with" section.
- `faqs`: `{ question, answer }[]`.
- `diagram`: a type tag (`"system" | "workflow" | "journey" | ...). The actual diagram content for non-"system" services is configured separately in `src/data/service-diagrams.ts` (see below). This field is currently informational and intended for future use; `integrations` is hardcoded to the system-map diagram in `src/app/services/[slug]/page.tsx`.

To add a new service: add an object to the array, then add a matching entry to `serviceDiagrams` in `src/data/service-diagrams.ts` (a `WorkflowDiagramConfig` with 3–5 `{label, description}` steps) so its page renders a diagram section.

## Case studies: `src/data/work.ts`

An array of `CaseStudy` objects. Each becomes a card on `/work` and a full page at `/work/[slug]`.

Fields worth knowing:
- `clientIsPlaceholder: boolean`: when `true`, the detail page shows the explicit placeholder-notice banner and appends "(placeholder)" next to the client name. **Set this to `false` only once the project is real and the client has approved being named.**
- `outcome: string | null`: leave `null` until there's a real, verifiable result to report. The outcome section is hidden entirely when `null`; never fill it with an invented figure.
- `testimonial: { quote, attribution } | null`: the same rule applies. `null` hides the section; only add a real, permission-cleared quote.
- `featured: boolean`: controls whether it appears as the large `CaseStudyFeature` on the homepage/work-page (only the first featured item is used as the homepage feature; the rest render as smaller rows).
- `published: boolean`: set to `false` to remove a case study from listings and make its detail page 404, without deleting the data.

## Insight articles: `src/data/insights.ts`

An array of `InsightArticle` objects. Each becomes a card on `/insights` and a full page at `/insights/[slug]`.

- `content` is an array of typed sections: `{ type: "paragraph", heading?, text }`, `{ type: "pullquote", text, attribution? }`, or `{ type: "list", heading?, items }`. Order in the array is render order.
- `tableOfContents`: `{ id, label }[]`; each `id` must match a `paragraph`/`list` section's own `id` field for the in-page anchor links to work.
- `relatedSlugs`: must match other articles' `slug` values.
- Keep `author` as a role/team label ("IZEYX Team"), not an invented individual's name, unless a real author is confirmed.

To add a new article: add an object to the array with a unique `slug`; it's picked up automatically by `/insights` and `generateStaticParams`.

## Process stages: `src/data/process.ts`

A fixed array of 8 `ProcessStage` objects (Discover → Improve), rendered in full on `/process` and as a condensed row on the homepage. Editing the `summary`/`clientContributes`/`izeyxDelivers` text is safe; adding or removing stages will change the "eight stages" framing used in copy across the homepage and `/process`. Update that copy too if the count changes.

## Homepage capability index: `src/data/capabilities.ts`

The 8-item numbered list on the homepage ("Eight capabilities, one connected practice"). Items 1–7 link to the matching `/services/[slug]` page; item 8 ("Ongoing support") links to `/process` since hosting/maintenance/support was deliberately folded into the process page rather than given its own service route (see README/final report for why).

## Site-wide config: `src/lib/site-config.ts`

- `siteConfig.contact` / `siteConfig.social`: business email, phone, address, hours, LinkedIn, and booking link. Each has an `isPlaceholder: true` flag that renders a visible "(placeholder)" label in the UI; **set it to `false` once you replace the value with a real one**, or the site will keep telling visitors it's a placeholder.
- `primaryNav` / `footerNav`: header and footer navigation. Add a route here if you add a new top-level page.
- `ctaCopy`: the two standard CTA labels used across the site ("Book a discovery call" / "Explore our capabilities").

## FAQs on the contact/service pages

Service FAQs live inline on each `Service` object (`faqs` field) rather than in a shared file, since they're written for that specific service's objections.
