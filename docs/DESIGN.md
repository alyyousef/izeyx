# DESIGN.md: IZEYX Visual System

This file records the committed visual world for izeyx.com: durable rules that any future page, component, or section must follow. It was authored using the [Impeccable](https://github.com/pbakaus/impeccable) design methodology (installed at `.claude/skills/impeccable`), applied directly rather than through its interactive concept-selection flow. See "How this was authored" at the end of this document for why.

## Direction contract

**THESIS.** IZEYX's mechanism is turning fragmented operations into one connected system. The category default for a B2B technology site is a centered hero with a badge, an oversized heading, two buttons, and a glowing gradient dashboard mockup, followed by three identical icon cards repeated down the page. IZEYX refuses that shell by making "connected systems" the actual structure of the page. Literal nodes, joins, and structural rules carry the argument rather than decoration bolted onto a generic template.

**OWN-WORLD.** A near-white, faintly violet-tinted paper field carries black structural typography and hairline rules. Blue-violet (`#3432C7`) is spent almost exclusively on things that are live, such as links, buttons, active diagram nodes, and focus states, so its presence is a promise: *if it's blue-violet, you can act on it.* Deep blue (`#1800AD`) and black own whole section backgrounds at a small number of deliberate points, for pacing and emphasis, never as decoration. Diagrams are drawn from nodes, hairlines, and small technical labels rather than icons or illustrations. Corners stay close to square. Shadows stay close to none.

**STORY.** A visitor lands, sees a scattered set of business systems converge into one connected core within the first viewport, and understands the pitch before reading a word of body copy. Problem recognition, the capability index, the operating-system diagram, placeholder work, and an eight-stage process build the case in the interface's own vocabulary: editorial columns, numbered lists, diagrams, and timelines rather than repeated card grids, so the visitor trusts IZEYX enough to book a discovery call.

**FIRST VIEWPORT.** Asymmetric split: headline, supporting copy, and two calls to action sit left-aligned in roughly the left half; an original CSS/SVG-free system diagram sits in the right half, showing scattered labelled inputs (Website, CRM, Support, Spreadsheets, Calls) converging through connector lines into a single IZEYX core node, then fanning out to labelled outputs (Automation, AI assistant, Data). On narrow viewports the diagram moves below the text and simplifies to a vertical flow.

**FORM.** Editorial / systems-diagram composition: asymmetric hero, numbered capability index (not a card grid), alternating full-width rows for the operating-system section, a horizontal/vertical process timeline, an editorial list for problem recognition, diagrammatic service pages. This direction is pinned by the project brief (fixed brand colors, named typography starting point, and an explicit "fragmented to connected systems" visual mechanism), so it is committed directly rather than produced through Impeccable's interactive concept-roll. A brief-pinned direction supersedes the roll under the methodology's own rules.

---

## 1. Color system

### Strategy

**Restrained field, structural color-blocking.** Neutrals (near-white paper, black type) carry the great majority of the surface. Blue-violet is reserved for interactive/action elements only; it never decorates. Deep blue and black own complete section backgrounds at a small number of deliberate points per page (never more than needed for pacing) rather than tinting the whole site. No gradients except where explicitly noted below; no glow, no glassmorphism, no decorative blobs.

### Fixed brand colors (do not alter)

| Token | Value | Role |
|---|---|---|
| `--brand-black` | `#000000` | Structural type, rules, dark sections |
| `--brand-primary` | `#3432C7` | Primary interactive emphasis |
| `--brand-primary-strong` | `#1800AD` | Deeper anchors, selected states |

### Semantic tokens

Defined once in `src/app/globals.css` under `:root` and consumed everywhere via Tailwind's `@theme inline` mapping, components never reference raw hex values.

| Token | Light value | Usage |
|---|---|---|
| `--background` | `#FBFAFE` | Page canvas (near-white, faint violet tint) |
| `--surface` | `#FFFFFF` | Raised/panel surfaces on the canvas |
| `--surface-subtle` | `#F2F0FA` | Recessed surfaces, alternating rows, table stripes |
| `--foreground` | `#000000` | Primary text and structural type |
| `--muted` | `#57556A` | Secondary text (meets 4.5:1 on `--background` and `--surface`) |
| `--muted-soft` | `#6B6980` | Tertiary/metadata text (index digits, dates, structural micro-labels). Meets the same 4.5:1 as `--muted`, an earlier, lighter value tested at ~3.5:1 and was raised after an axe-core pass flagged its actual usages as real (non-decorative) label text |
| `--border` | `#E1DEEF` | Hairline dividers, card/table borders |
| `--border-strong` | `#000000` | Deliberate structural rules (section dividers, diagram lines) |
| `--primary` | `#3432C7` | Links, primary buttons, active states, diagram accents |
| `--primary-strong` | `#1800AD` | Hover/pressed states, deep anchors, selected nav item |
| `--primary-soft` | `#ECEBFA` | Light tint fills behind primary content (badges, active chips) |
| `--on-primary` | `#FFFFFF` | Text/icons on primary-filled surfaces |
| `--focus` | `#3432C7` | Focus ring color (light surfaces) |
| `--success` | `#15703A` | Genuine success states only |
| `--success-soft` | `#E7F5EC` | Success background fill |
| `--error` | `#B3261E` | Genuine validation/error states only |
| `--error-soft` | `#FBEAEA` | Error background fill |

### Dark-section tokens

Used only inside a component/section explicitly marked as a dark block (`.on-dark`), never as the page default:

| Token | Value | Usage |
|---|---|---|
| `--surface-dark` | `#000000` | Dark section background |
| `--surface-dark-alt` | `#0A0620` | Secondary dark background (black blended toward deep blue) for the one section that needs separation from a pure-black neighbor |
| `--foreground-dark` | `#FFFFFF` | Text on dark sections |
| `--muted-dark` | `#A9A6C6` | Secondary text on dark sections (meets 4.5:1 on `#000000`) |
| `--border-dark` | `rgba(255,255,255,0.16)` | Hairlines on dark sections |
| `--focus-dark` | `#8280F2` | Focus ring on dark sections (lighter than brand primary for contrast against black) |

### Rules

- No orange, green, pink, cyan, or red accents outside the `--success`/`--error` semantic pair, and those never appear as decoration.
- Blue-violet never covers a whole section as background tint; it is reserved for type, strokes, and controls. Only black/near-black owns full section backgrounds.
- No gradients by default. The single permitted exception is a very short (\<10% travel) linear fade from `--surface-dark` to `--surface-dark-alt` behind the homepage operating-system diagram, used to separate two stacked dark rows. This exception is documented here so it is never mistaken for decorative license elsewhere.
- All text/background pairs verified at 4.5:1 (body) / 3:1 (large text, controls, focus rings) minimum, checked with an automated axe-core pass across every route in addition to manual computation (see §8).

---

## 2. Typography

*Revised twice after the initial build, both times from user review rather than internal audit. First pass: the original pairing (Bricolage Grotesque display + IBM Plex Sans body + IBM Plex Mono for every eyebrow/label/index-number) tested as visually competent but read as a template default, uppercase tracked monospace labels are a named "AI-generated interface" tell, and one grotesque display face on every heading (hero down to a card title) flattened the hierarchy. Replaced with the editorial serif/sans split below. Second pass: fixing the font wasn't enough, the small uppercase "eyebrow" line sitting above almost every heading (`SectionHeader`'s `eyebrow` prop, `CTASection`'s `eyebrow` prop, `service.eyebrow`) was itself the template tell, independent of what typeface rendered it. That prop was removed from `SectionHeader` and `CTASection` entirely and every call site cleaned up, headings now stand alone, with the handful of eyebrows that carried real conversational value (e.g. "Does this sound familiar?") folded into the following description sentence instead of living as a separate styled kicker. `.label` itself lost its uppercase/tracking treatment and now reads as plain small text, for the structural cases that legitimately remain (footer nav headers, diagram node labels, asset-placeholder tags).*

### Families

| Role | Family | Loaded via |
|---|---|---|
| Display, hero and major section headings only | **Source Serif 4** | `next/font/google`, weights 400/500/600, italic for pull-quotes |
| Body, interface, navigation, card/item titles | **Geist** | `next/font/google`, weights 400/500/600 |
| Genuinely technical content only (filenames) | **Geist Mono** | `next/font/google`, weight 500 only |

**Why this pairing:** Source Serif 4 carries the editorial authority the brief's "McKinsey-adjacent, without copying their identity" direction calls for, confident at large sizes, restrained rather than decorative, and used *selectively* (hero, page titles, numbered index rows, pull-quotes) rather than on every heading, so its appearance still signals "this matters." Geist is a clean, neutral, highly legible grotesque built for interfaces; pairing a genuine text serif with a genuinely neutral sans is a real editorial pairing, not two display faces competing for attention. Geist Mono is loaded but used in exactly one place, the replacement-filename `<code>` reference inside `MediaPlaceholder`, because nothing else on the site is actually code, a command, a version number, or infrastructure metadata; index digits, dates, and diagram labels all moved to Geist so they read as content instead of decoration.

### Roles and scale

Fluid scale via `clamp()`, tuned so nothing breaks at 320px or stretches awkwardly at 1920px. Defined once as CSS custom properties in `src/app/globals.css` and consumed through composite `.text-*` utility classes (each bundles family + size + weight + line-height + letter-spacing for its role) rather than components stacking four or five Tailwind utilities by hand:

| Class | Token | Size (clamp) | Weight | Family | Used for |
|---|---|---|---|---|---|
| `.text-display` | `--text-display` | `clamp(2.5rem, 1.85rem + 3vw, 4.25rem)` | 500 | Serif | Hero H1, page-level H1s (service/case-study/article detail) |
| `.text-heading` | `--text-h2` | `clamp(1.875rem, 1.6rem + 1.35vw, 2.75rem)` | 500 | Serif | Major section headings (via `SectionHeader`), CTA headings |
| `.text-subheading` | `--text-h3` | `clamp(1.375rem, 1.28rem + 0.5vw, 1.625rem)` | 600 | Sans | In-page subheadings (legal-doc sections, case-study "The challenge"/"Approach" dividers, article sub-heads) |
| `.text-title` | `--text-h4` | `clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem)` | 600 | Sans | Card and list-item titles (case-study cards, FAQ questions, diagram step titles) |
| `.text-pullquote` |, | inherits container | 400 italic | Serif | Testimonials, article pull-quotes, a service's "the problem" callout |
| `.label` | `--text-label` | `0.75rem`, sentence case, no added tracking | 500 | Sans | Footer nav headers, diagram node labels, asset-placeholder tags, small structural text, never a heading kicker |
| `.text-meta` | `--text-meta` | `0.8125rem`, tabular-nums | 500 | Sans | Dates, reading time, index digits (01, 02…) |
| Body large | `--text-body-lg` | `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` | 400 | Sans | Intro/lede paragraphs |
| Body | `1rem` (Tailwind default) |, | 400 | Sans | Running text |

A handful of index-style number/title pairs (the numbered service index on `/services`, the homepage capability index, the "before → after" transformation table) intentionally keep the serif at a smaller weight (500, not the display's 600) as a deliberate editorial-index moment; every other heading-shaped element in a card, grid, or dense list uses the sans `.text-subheading`/`.text-title` pair. Navigation on desktop, mobile, and in the footer is sans only, per the rule that display type never carries wayfinding.

Letter-spacing and line-height are role-specific tokens (`--tracking-display` through `--tracking-meta`, `--leading-display` through `--leading-meta` in `globals.css`), not one flat value applied everywhere: large serif headings run tight (`-0.025em` to `-0.03em`) and dense (`1.05`–`1.1` leading); small uppercase labels run open (`0.08em`) and loose (`1.2`); body text stays close to neutral. Line length held to ~65ch for long-form paragraphs (insights articles, via `--reading-measure`) and shorter for marketing copy.

---

## 3. Layout system

- **Spacing scale:** 4px base (`1` = 4px … following Tailwind's default scale), so section rhythm can use both the tight 4/8px steps for inline groups and the generous 96–160px steps for section padding.
- **Container widths:** content container `max-width: 1280px` with fluid horizontal padding (`clamp(1.25rem, 4vw, 4rem)`); long-form article text constrained further to ~68ch inside that container.
- **Grid:** 12-column CSS grid at ≥1024px for asymmetric splits (hero 7/5, alternating rows), collapsing to a single column below 768px. Grids are used for genuine multi-track relationships (hero split, capability index, work grid), never as an automatic wrapper for unrelated content.
- **Corner radii:** restrained; `--radius-sm: 2px` (inputs, tags), `--radius-md: 4px` (cards, media placeholders). No large rounded-rectangle icon tiles, no pill-shaped buttons except the mobile menu's close affordance where a circular target is the clearer touch shape.
- **Composition variety:** homepage sections deliberately use five different structural patterns (split hero, editorial list, before/after composition, numbered index, alternating rows, horizontal timeline, two-column CTA) rather than repeating one card grid throughout. See section 5.
- **Dark/light rhythm:** the homepage alternates light → light → **dark** (operating system) → light → light → **dark** (final CTA), giving the page two deliberate anchor points rather than a single tone throughout or an unpredictable mix.

---

## 4. Diagram and visual system

All diagrams are original HTML/CSS constructions (no stock imagery, no generic 3D renders, no circuit-board clichés). Three reusable primitives:

1. **`SystemDiagram`**, scattered input nodes converging via connector lines into a core node, then fanning out to outputs. Used in the hero and the services overview. Labels are explanatory (Website, CRM, Operations, Data…), never implied as real client systems.
2. **`WorkflowDiagram`:** a horizontal sequence of labelled steps joined by directional connectors, used for automation/AI-solution pages (input → reasoning → approval → action) and the "operating system" homepage section.
3. **`ProcessTimeline`:** a vertical (mobile) / horizontal-rail (desktop) sequence of numbered stages with what-the-client-provides / what-IZEYX-delivers detail, used on `/process` and echoed in condensed form on the homepage.

All three ship an accessible textual equivalent (a visually-hidden or adjacent description list) so the diagram's meaning survives without CSS or for screen-reader users, per the accessibility rules in section 6.

---

## 5. Section composition catalogue (anti-repetition rule)

To satisfy the brief's ban on "three identical service cards in every section" and "repeated sections with identical layouts," each homepage section uses a distinct structural pattern:

| Section | Pattern |
|---|---|
| Hero | Asymmetric split: text left, system diagram right |
| Problem recognition | Editorial two-column list (problem statement + short elaboration), not cards |
| Transformation statement | Before/after horizontal composition with a connecting arrow, no invented metrics |
| Capability overview | Numbered editorial index (01–08), each row expands into a detail panel on interaction |
| Operating system | Full-width dark section, layered horizontal diagram |
| Selected work | Asymmetric grid: one large featured placeholder + smaller list rows |
| Engagement process | Horizontal rail timeline (desktop) / vertical stepped list (mobile) |
| Why IZEYX | Two-column list with short editorial statements, no icon tiles |
| Final CTA | Full-width dark band, large editorial statement, single CTA |

Service, work, and insight detail pages each get a distinct hero/body composition appropriate to their content (see `/services/[slug]`, `/work/[slug]`, `/insights/[slug]` implementations) rather than one shared template with the heading swapped.

---

## 6. Motion, interaction, and accessibility commitments

- Motion is CSS-only (opacity/transform), subtle, and respects `prefers-reduced-motion: reduce` by disabling non-essential transitions/reveals.
- No bounce/elastic easing, no scroll-jacking, no custom cursors, no autoplay video, no parallax beyond a very slight (≤8px) transform on the hero diagram.
- Every interactive element has a visible focus ring using `--focus` / `--focus-dark`, meets a 44×44px minimum touch target, and is reachable/operable by keyboard alone.
- Diagrams carry a textual equivalent; decorative elements carry empty `alt`/`aria-hidden`.
- Color is never the sole carrier of meaning (form errors pair icon + text + color; diagrams pair label + position + color).

---

## 7. Anti-pattern checklist (enforced during build and final review)

No glowing gradient blobs, no glassmorphism/backdrop-blur cards, no floating translucent panels, no nested cards, no rounded-square icon tiles above every heading, no generic 3D shapes, no fake browser-window mockups, no stock photography of people pointing at laptops, no decorative meaningless code snippets, no particle/dot-grid backgrounds without compositional purpose, no fake logos/awards/testimonials/metrics/case-study results, no "seamless"/"unlock your potential"/"revolutionise"-style copy, no Inter/Arial/Roboto/system-default as brand type, no emoji as service icons, no animation added purely to look busy, **no uppercase tracked monospace used decoratively for labels/index numbers that aren't genuinely technical content**, **no small "eyebrow" label sitting above a heading as a separate styled kicker** (both added after the typography revisions in §2, the second is a named "AI cluster" tell independent of which typeface renders it; a heading either stands on its own or its lead-in becomes a real sentence in the description, never a badge above it).

---

## 8. How this was authored

Impeccable was installed for this project via `npx impeccable install --providers=claude --scope=project` (installed into `.claude/skills/impeccable`, hooks registered in `.claude/settings.local.json` for post-edit and stop-time design detection). Because the slash commands it installs (`/impeccable init`, `/impeccable shape`, etc.) are not registered until Claude Code restarts and picks up the newly-installed skill, this build read the underlying reference files directly (`init.md`, `new-work.md`, `colorize.md`, `typeset.md`, `layout.md`, `audit.md`, `harden.md`, `clarify.md`, `critique.md`, `adapt.md`, `optimize.md`, `polish.md`) and followed that methodology manually for this run, including running the bundled detector (`node .claude/skills/impeccable/scripts/detect.mjs`) against the built pages.

The interactive concept-selection flow (`concept-seed.mjs` / `serve-question.mjs`, which opens a browser page for a human to pick between dice-rolled directions) was intentionally not run: the project brief already pins the direction, fixed brand colors, a named typography starting point, and an explicit "fragmented operations → connected systems" visual mechanism, and Impeccable's own methodology states a brief- or user-pinned direction supersedes the roll. The direction contract above was written directly against that pinned brief instead.

**One remaining step for a future session:** after restarting Claude Code, run `/impeccable init` to let Impeccable register this file as its own tracked product record (it will find `PRODUCT.md` already complete) and confirm `.impeccable/` housekeeping files are in place; this is a bookkeeping step for the tool's own state, not a prerequisite for the site being complete.
