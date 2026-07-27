# TODO_ASSETS.md: Real assets still needed

Every item below currently renders as a polished, unmistakable placeholder (the `MediaPlaceholder` component at `src/components/media/MediaPlaceholder.tsx`) rather than a stock photo or invented screenshot. Replace the file, then remove the corresponding `MediaPlaceholder` usage (or point `next/image` at the new file), no layout changes should be required, since every placeholder already reserves the correct aspect ratio.

Filenames below are suggestions matching what the code already expects in placeholder labels; keep them or update the referencing component if you rename.

---

## Required before launch

| Asset | Appears on | Filename | Dimensions | Aspect ratio | Subject | Alt text guidance |
|---|---|---|---|---|---|---|
| Case study cover, Connected business transformation | `/work`, `/work/connected-business-transformation`, homepage Selected Work | `public/images/work/connected-business-transformation-cover.webp` | 1600×1000px (also used at 1920×1080 on the detail hero) | 16:10 / 16:9 | Real project screenshot or photo once this project is real | Describe what's shown (e.g. "Dashboard screen of the client portal"), never "image of project" |
| Case study cover, Connected commerce platform | `/work`, `/work/connected-commerce-platform` | `public/images/work/connected-commerce-platform-cover.webp` | 1600×1000px | 16:10 | Storefront or product screen | As above |
| Case study cover, Operations command centre | `/work`, `/work/operations-command-centre` | `public/images/work/operations-command-centre-cover.webp` | 1600×1000px | 16:10 | Internal dashboard screen | As above |
| Case study cover, Intelligent enquiry system | `/work`, `/work/intelligent-enquiry-system` | `public/images/work/intelligent-enquiry-system-cover.webp` | 1600×1000px | 16:10 | Workflow/automation UI screen | As above |
| Business email address | Footer, `/contact`, `/privacy`, `/terms` | N/A (text, `src/lib/site-config.ts`) | N/A | N/A | N/A | N/A |
| Telephone number | `/contact` | N/A (text, `src/lib/site-config.ts`) | N/A | N/A | N/A | N/A |
| Business address | `/contact` | N/A (text, `src/lib/site-config.ts`) | N/A | N/A | N/A | N/A |
| LinkedIn company URL | Footer, `/contact` | N/A (text, `src/lib/site-config.ts`) | N/A | N/A | N/A | N/A |
| Booking URL (if using an external scheduler) | `/contact` | N/A (text, `src/lib/site-config.ts`) | N/A | N/A | N/A | N/A |
| Contact-form email delivery | Server-side | N/A (env vars) | N/A | N/A | N/A | See `.env.example` and README "Contact form configuration" |

## Needed for full credibility, not launch-blocking

| Asset | Appears on | Filename | Dimensions | Aspect ratio | Subject | Alt text guidance |
|---|---|---|---|---|---|---|
| Team portrait × 3 (currently 3 generic slots) | `/about` | `public/images/team/team-member-1.webp`, `-2.webp`, `-3.webp` | 800×800px | 1:1 | Real headshots, consistent lighting/background | "Portrait of [Name], [Role]" |
| Office / workspace image | `/about` | `public/images/brand/office-placeholder.webp` | 1200×800px | 3:2 | A real photo of the working environment, once one exists | Describe the actual scene, not "office photo" |
| Article cover, Is this process worth automating | `/insights`, article detail | `public/images/insights/is-this-process-worth-automating-cover.webp` | 2100×900px (also shown smaller in list) | 21:9 | Original illustration or photo relevant to the topic | Describe the image's content, not the article title again |
| Article cover, Build or buy | `/insights`, article detail | `public/images/insights/build-or-buy-a-practical-framework-cover.webp` | 2100×900px | 21:9 | As above | As above |
| Article cover, Where AI actually helps | `/insights`, article detail | `public/images/insights/where-ai-actually-helps-cover.webp` | 2100×900px | 21:9 | As above | As above |
| Article cover, Why a website is a system | `/insights`, article detail | `public/images/insights/why-a-website-is-a-system-cover.webp` | 2100×900px | 21:9 | As above | As above |
| Gallery images per case study (optional, beyond the single cover) | Case study detail pages | `public/images/work/<slug>-gallery-1.webp`, `-2.webp`, … | 1600×1000px | 16:10 | Real implementation screenshots | Describe the specific screen/state shown |
| Testimonial quotes | Case study detail pages | N/A (data, `src/data/work.ts`) | N/A | N/A | N/A | Only add once a real, permission-cleared quote exists, `CaseStudy.testimonial` is `null` by design until then |

## Explicitly not placeholders (already real / already correct as-is)

- **Logo:** real and provided by the client. `izeyx-logomark.png` is the blue mark for light surfaces, while `izeyx-logomark-dark.png` is the white mark for dark surfaces; `LogoWordmark.tsx` switches between them automatically. `izeyx-logomark-source.png` and `izeyx-icon-source.png` preserve the full-resolution blue source used for browser/app icons, while the dark mark is used in the black Open Graph image. Regenerate these assets together if the logo changes again.
- **`MediaPlaceholder` background image:** `public/images/placeholders/coming-soon.jpg` is a deliberate branded "coming soon" backdrop shown behind every placeholder's label, replacing a flat striped pattern. It is not itself a real asset and doesn't need replacing on its own; it stays in place until the individual placeholders above are replaced one by one.
- **All diagrams** (system diagram, workflow diagrams, process timeline) are built from real HTML/CSS/SVG, not images. Nothing to replace; edit the data feeding them (`src/data/service-diagrams.ts`, `src/data/process.ts`) instead.

## How to replace a placeholder in practice

1. Add the real file to the matching `public/images/...` folder using the filename above (or update the reference if you choose a different name).
2. Swap the `MediaPlaceholder` usage for `next/image` with the same `width`/`height` (or `fill` + the existing aspect-ratio wrapper) so layout doesn't shift.
3. Write real, specific alt text. The guidance column above is a starting point, not copy-paste text.
4. Remove the corresponding row from this file once replaced.
