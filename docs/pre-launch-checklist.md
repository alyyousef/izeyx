# Pre-launch checklist

## Content and business information

- [ ] Verify the published email, phone, New Cairo address, working hours, LinkedIn URL, and X URL in `src/lib/site-config.ts`; they are currently marked as confirmed. Replace the calendar booking placeholder before publishing a direct-booking link.
- [ ] Replace or confirm real case studies in `src/data/work.ts` (or keep the current entries clearly labelled as placeholders if none exist yet, do not silently un-flag `clientIsPlaceholder` without real client approval).
- [ ] Add real team profiles / photography on `/about`, or keep the current placeholder slots (see `asset-todo.md`).
- [ ] Confirm company history / founding date / location before adding them to `/about`. None are currently stated, which is intentional until confirmed.
- [ ] Legal review of `/privacy` and `/terms`: the copy on both pages is still unreviewed draft text, even though the visible placeholder banner was removed from `/privacy` at the client's request. `/terms` still shows its banner; do not launch either page without a real review.
- [ ] Decide whether `/privacy` and `/terms` should be indexed by search engines once finalised (currently `noindex` in their route metadata, see `src/app/privacy/page.tsx` / `src/app/terms/page.tsx`).

## Contact form

- [ ] Set `CONTACT_RECIPIENT_EMAIL`, `CONTACT_FROM_EMAIL`, `EMAIL_PROVIDER_API_KEY` in the production environment.
- [ ] Send a real test enquiry through the live form and confirm the email arrives.
- [ ] Confirm the "from" address is authorised/verified with the chosen email provider (required by most transactional email APIs, including the default Resend implementation).

## Assets

- [ ] Work through `asset-todo.md` top to bottom; replace at least the "Required before launch" table.
- [ ] Confirm no `MediaPlaceholder` remains for an asset that's actually available.

## Technical validation

- [ ] `npm run lint`, clean.
- [ ] `npm run typecheck`, clean.
- [ ] `npm run test:unit`, clean.
- [ ] `npm run build`, succeeds, no warnings that indicate a real problem.
- [ ] `npm run test:e2e`, clean after `npx playwright install chromium`.
- [ ] Manual click-through of all routes listed in the final report / sitemap.
- [ ] `NEXT_PUBLIC_SITE_URL` is the public HTTPS origin; the production build intentionally fails for missing, localhost, insecure, or path-based values.
- [ ] If self-hosting behind a CDN/reverse proxy, verify each deployment atomically replaces or purges cached static responses.

## Accessibility and quality (manual, automated checks alone are not sufficient)

- [ ] Full keyboard-only pass: tab through header, mobile menu, every form, every disclosure control (`<details>` FAQs/capability index) on a real browser.
- [ ] Screen reader spot-check (VoiceOver or NVDA) of the homepage and the contact form's error/success states.
- [ ] Run an automated audit (Lighthouse / axe) as a floor check, not a substitute for the manual pass above.
- [ ] Confirm color contrast holds on a real display, not just computed values, especially the dark-section states.

## SEO

- [ ] Confirm `sitemap.xml` and `robots.txt` resolve correctly on the production domain.
- [ ] Submit the sitemap to Google Search Console (or equivalent) once live.
- [ ] Spot-check Open Graph previews (the auto-generated image at `/opengraph-image`) in a real share-preview tool.

## Analytics and tracking (only if/when added)

- [ ] If analytics is added post-launch, update `/privacy` to describe it. The current copy states no non-essential cookies or tracking scripts are in use, which must stay true until it's deliberately changed.

## Final sign-off

- [ ] Everything above is either checked or explicitly deferred with a written reason and owner.
