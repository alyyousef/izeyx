# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Decision-makers at growing businesses who feel the operational cost of outdated or fragmented systems but do not have a large internal technology department to fix it: founders, business owners, general managers, operations managers, commercial and marketing managers, technology managers, and department heads at SMEs and professional-service firms. They are evaluating IZEYX in a B2B context, often after searching for a solution to a specific operational pain (lost leads, manual data entry, disconnected software) rather than browsing casually.

## Product Purpose

IZEYX is a B2B digital transformation and technology services company. It helps businesses replace outdated, disconnected, fragmented, repetitive, or manual ways of working with modern digital systems, including websites, custom software, automation, AI agents, systems integration, and data/analytics, delivered as a coherent, connected operating layer rather than one-off tools. The website's job is to generate qualified B2B enquiries by helping a visitor understand what IZEYX does, recognise their own operational problems in the copy, identify the relevant service, understand how an engagement works, and book a discovery call.

## Positioning

Most agencies and freelancers sell a single deliverable, such as a website, an app, or an automation script, in isolation. Most "AI consultancies" sell buzzwords without a clear mechanism. IZEYX starts with the business problem, not the technology, and treats every deliverable (website, software, automation, AI, integration, data) as one connected system rather than a disconnected purchase. The company's mechanism is stated as **from fragmented operations to connected systems**: IZEYX designs and builds the pieces so they work together and stays on as a long-term technology partner rather than handing over a finished artifact and disappearing.

## Operating Context

- The company is new and pre-portfolio: no confirmed clients, case studies, team bios, office, founding date, or press exist yet. The site must be commercially credible without fabricating any of these.
- The primary conversion action is booking a discovery call (a real-world consultative sales process, not self-serve software).
- Initial geographic relevance is Egypt and the wider Middle East, but the brand should not read as geographically restricted.
- The site will launch with placeholder case studies, placeholder team/photography, and a handful of placeholder insight articles, all clearly labelled as placeholders so they can be replaced later without a redesign.
- Content (services, case studies, insights, FAQs, process stages, nav) is intentionally structured as typed local data (no CMS yet) so a non-technical editor can update copy by editing data files.

## Capabilities and Constraints

**Confirmed service lines** (see `src/data/services.ts` for full detail): websites & digital experiences, custom web applications, business process automation, AI agents & intelligent assistants, systems integration, data & analytics, digital transformation consulting, and hosting/maintenance/continuing support.

**Constraints**:
- No fabricated clients, testimonials, revenue figures, performance metrics, awards, certifications, team size, or founding date. Anything not confirmed is a labelled placeholder.
- No exaggerated AI claims; AI is positioned as a practical capability applied only when it solves a genuine problem.
- No industry-specific claims beyond illustrative example use cases, clearly marked as examples rather than completed work.
- Contact form must fail honestly when no email provider is configured in the environment (no fake "message sent" success).

## Brand Commitments

- **Name:** IZEYX. **Domain:** izeyx.com.
- **Fixed brand colours:** black `#000000`, primary blue-violet `#3432C7`, deep blue `#1800AD`. No unrelated decorative accent hues; red/green reserved for genuine error/success states only.
- **Primary CTA:** "Book a discovery call." Low-commitment SaaS CTAs ("Start for free") are explicitly disallowed because IZEYX is a service company, not self-serve software.
- **Typography:** a distinctive pairing is required, excluding Inter, Arial, Roboto, and system defaults. The final pairing and rationale are recorded in `DESIGN.md`.
- **Visual mechanism:** "from fragmented operations to connected systems," expressed through original systems-map, node, and workflow diagrams built in HTML and CSS rather than a circuit-board cliché, stock photography, or glowing gradient blobs.

## Evidence on Hand

None. No real client work, testimonials, metrics, team photography, office photography, or press exists at launch. Every such area ships as a clearly labelled placeholder (see `TODO_ASSETS.md`) rather than being fabricated or omitted.

## Product Principles

1. Start with the business problem the visitor already recognises, not abstract "innovation" language.
2. Treat every deliverable, including websites, software, automation, AI, integration, and data, as part of one connected system, not a disconnected purchase.
3. Be honest about what is real (services, methodology, positioning) and what is a placeholder (clients, results, team, photography); never blur the two.
4. Write for a non-technical business decision-maker: direct, concrete, commercially credible, free of hype words.
5. Every route earns its place with a distinct purpose and conversion path; no thin pages.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Primary audience includes non-technical decision-makers, so clarity of language and predictable interaction patterns matter as much as technical conformance. No native-platform requirements (web only).
