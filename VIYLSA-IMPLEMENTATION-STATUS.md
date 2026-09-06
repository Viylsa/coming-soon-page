# VIYLSA — Implementation status

Written 6 September 2026 after implementing `VIYLSA-IMPROVEMENT-PLAN.md`.
All P1 and P2 items are implemented; applicable P3 items are done or explicitly
resolved below. The full QA matrix ran green against the production build
(`npm run build:static` + `npm run qa`).

## Environment prerequisite (resolved)

Puppeteer's expected Chrome was missing, which blocked prerendering in the
previous review. Resolved locally with `npx puppeteer browsers install chrome`
(Chrome 152, matching puppeteer 25.x). CI already installs Chrome in
`.github/workflows/deploy.yml`, so deployment was never broken. Full
`npm run build:static` now passes and prerenders **both** React routes.

## Completed plan items

### P1

- **P1-01 Mobile menu — complete modal pattern.** Drawer is now a
  `role="dialog"` panel (`#v-nav-drawer`) with `aria-modal`, `aria-controls` on
  the trigger, `inert` + `aria-hidden` while closed (no ghost focus targets,
  close animation preserved), focus moved into the menu on open, Tab contained,
  Escape restoring trigger focus, destination links closing the menu *without*
  stealing focus back, the body's previous overflow value restored verbatim,
  auto-close when resized past 880px, and a bounded scrollable height
  (`max-height: 100dvh − 120px`). Verified by keyboard in the QA harness.
- **P1-02 Truthful, consistent messaging.** One narrative everywhere: identity
  claims replaced with observable behaviour ("which spaces draw attention",
  "enquiries from visitors who choose to get in touch"); "Usually one afternoon /
  Live the same day" replaced by shoot → build & review → publish with package
  delivery windows; featured tag is now "For growing venues" (scope, not
  popularity); the campus example is called the "NUTECH campus tour" — no
  client/commercial relationship claimed anywhere (About principle 3 included);
  AI examples assert no real fees/dates/locations; FAQ shooting answer aligned
  with JSON-LD; OG/Twitter/llms.txt/JSON-LD reviewed for the same claims.
- **P1-03 AI guide honesty + reading control.** Persistent header line
  "Scripted example · no message is sent" (not a tooltip); examples describe
  capability instead of asserting facts; completion line reads "Example: an
  enquiry appears in your dashboard"; the 9s autoplay cycle is **gone** — a
  "Next example" button gives reading control; language buttons carry
  `aria-pressed`, visible EN/اردو names and `lang`; feed is `aria-live` but only
  changes on user action. Urdu subset font regenerated for the new strings.
- **P1-04 Tour loading lifecycle.** Poster + explicit "Explore the live tour"
  activation (iframe created only on intent); explicit idle → loading → slow →
  ready / error states; 8s slow notice keeps the load alive and is
  non-blocking; 14s timeout yields retry with a fresh iframe + fresh timers;
  "Open tour in a new tab" available in every state; invalid
  `allow-fullscreen` sandbox token removed (fullscreen stays in `allow` +
  `allowFullScreen`); stable 16:9 / 3:4 stage, no layout shift.
- **P1-05 Contact form states.** `autoComplete` name/email/organization;
  16px inputs (no iOS zoom); synchronous double-submit guard; AbortController
  with 15s timeout and cleanup; Formspree JSON validation errors surfaced,
  generic honest message otherwise, and the timeout path explicitly says the
  outcome is unconfirmed rather than claiming failure; values preserved on all
  error paths; success says "Your enquiry has been received", moves focus to
  the confirmation heading, and no longer claims "in our inbox"; expected next
  step stated before submit; privacy link beside submission; unused
  `onEmailInstead` removed; `privacy.html` updated to describe the real
  Formspree pathway (and no longer falsely claims Google Fonts).
- **P1-06 Navigation, stacking, reveals.** Stacking is now desktop-only
  (≥900px width and ≥560px height, re-evaluated live on resize; reduced motion
  disables it) — natural scrolling is the baseline on phones. New
  initial-hash + popstate/hashchange reconciliation fixes direct visits like
  `/#pricing` landing at the top (the browser's fragment scroll was being
  cancelled by the React remount). `prefers-reduced-motion` changes are
  honoured mid-visit in both motion.js (reveals everything immediately) and
  stackSections.js (tears the pin down). Reduced-motion CSS now neutralises
  `filter` and `clip-path` as well as opacity/transform.
- **P1-07 Semantic defects.** Nav indicator moved out of the `<ul>` onto a
  wrapper; package names are real `h3`s; footer column labels are `h2`s inside
  labelled `<nav>`s; package CTAs have accessible names ("Get a quote for
  Enterprise"); decorative icons/numbers out of accessible names; About keeps
  `aria-current` via the `current` prop.

### P2

- **P2-01 Hero.** Secondary "Explore the live tour" CTA next to Book a demo;
  factual trust line "Live example: the NUTECH campus tour · 360° tours ·
  Islamabad & Rawalpindi"; sub-copy rewritten non-identifying, "from their
  phone" (not "any device"); CTAs stack full-width on small phones.
- **P2-02 Typography.** Meaningful mono labels raised from 10–11px to
  ~11.5–12.5px (form labels, dashboard, package coverage, tour stats, contact
  keys, footer headings, AI status); letter-spacing eased; inputs at 16px;
  tabular numerals retained for figures; decorative labels left small.
- **P2-03 Rhythm/alignment.** Existing container/spacing system retained (it
  was already coherent); visual pass confirmed edge alignment at 320/390/1440.
- **P2-04 Tour details.** Stats grid now three real columns at every width
  (was four defined for three items); copy tightened; founding-venue CTA is
  "Ask about founding venues" (no slot-reservation implication) and "locked-in
  early pricing" became "early pricing agreed before we shoot".
- **P2-05 Problem section.** "Photos show a frame. A tour shows the space.";
  after-hours framed as exploration, not a 6pm blanket; visitor-identification
  claim removed; panorama gets a 220px centre-cropped frame on phones so the
  comparison stays legible; caption explains it is a field-of-view illustration.
- **P2-06 Analytics.** One persistent "Example dashboard · illustrative
  figures" label; bar widths derived from the numeric values; units explained
  (unique visits, room views, minutes:seconds); "much of the traffic" claim
  replaced with a capability statement; stacked bar rows preserved on small
  screens; information available without colour/animation.
- **P2-07 Process.** Steps are capture → "We build, you review" → "We publish
  and support", naming what the customer supplies, when they approve, and what
  sets launch timing; no duplicated numerals.
- **P2-08 Packages.** "Quoted to your venue" explainer under the heading; area
  rows renamed "Typical space" (guidance, not a hard limit); Enterprise is
  "2,000 sq ft and up"; "Get a quote" carries the package into a visible,
  editable "Package of interest" select in the contact form and into the
  composed WhatsApp message; existing visitor input is never overwritten;
  footer link renamed "Packages".
- **P2-09 FAQ.** Privacy mention is now a real link; shooting/delivery answer
  distinguishes shoot day from delivery window; native `details/summary`
  retained; AI answer already used the honest fallback wording.
- **P2-10 About.** Bios lead with role and contribution; "Self-declared
  ignoramus" removed (warmth kept); NUTECH relationship left unclaimed; About
  nav CTA targets the local `#contact` via an explicit `ctaHref` prop while
  section links still resolve home.
- **P2-11 Footer / legal / 404.** `overflow-wrap: anywhere` on email links,
  `min-width: 0` on footer grid items; column-heading contrast raised; 44px
  social targets without larger glyphs; new-tab links named; legal pages and
  404 gained visible `:focus-visible` styles; privacy policy now factual.
- **P2-12 Sticky CTA.** `bottom: calc(16px + env(safe-area-inset-bottom))`;
  pointer-events tied to visibility (plus `aria-hidden`/`tabindex`) so the
  hidden bar can never intercept taps, including under reduced motion; hides
  while the mobile menu is open (via `viylsa:menu` event) and while Contact is
  visible.

### P3

- **P3-01 CSS consolidation.** Partial, deliberate: removed dead rules touched
  by this work (`.v-rcpt__card-live`, old four-column stats, duplicate hero
  rules); a full inventory-and-rewrite of the 1.7k-line stylesheet was **not**
  done — risk without visual diffing outweighed benefit, and no further
  appended overrides were needed for this work.
- **P3-02 Performance.** No measurements taken (no field data, no lab profiler
  in this environment). Structural wins landed anyway: the tour's WebGL cost is
  now deferred behind explicit activation, and the AI demo no longer runs
  timers/IntersectionObservers. Recorded as outstanding.
- **P3-03 Prerender determinism.** Browser/preview-server cleanup now runs even
  when Chrome fails to launch; the snapshot no longer contains the tour iframe
  (poster instead, so the build never depends on the external tour server being
  healthy); AI demo is static (no timer-dependent frames to bake); transient
  states verified absent from dist HTML by the no-JS QA checks.
- **P3-04 Search/social consistency.** Homepage title now "VIYLSA | 360°
  Virtual Tours in Pakistan"; OG/Twitter descriptions match the
  non-identifying analytics copy; JSON-LD FAQ kept in step with visible FAQ.
- **P3-05 Documentation.** README rewritten: both prerendered routes, Chrome
  prerequisite, `qa` script, and a "where to edit what" map.

## Changed files

Source: `src/App.jsx`, `src/motion.js`, `src/stackSections.js`,
`src/components/{Nav,Hero,LiveTourPreview,ProblemTriad,Analytics,AIGuide,
HowItWorks,Pricing,FAQ,Contact,FooterCTA,StickyCTA}.jsx`, `src/pages/About.jsx`,
`src/styles/styles.css`.
Shell/meta: `index.html`, `privacy.html`, `terms.html`, `public/404.html`,
`public/llms.txt`, `README.md`, `package.json` (+`subset-font` dev dep).
Scripts: `scripts/prerender.mjs`, `scripts/subset-urdu-font.mjs` (JS fallback
when python/fonttools is absent), plus new QA tooling `scripts/qa.mjs`,
`scripts/shots.mjs`, `scripts/section-shots.mjs`.
Assets: `public/fonts/noto-nastaliq-urdu-subset.woff2` (regenerated, 98 KB).
Evidence: `shots-baseline/`, `shots-final/`, `shots-sections/`.

## Verification results (`npm run build:static` + `npm run qa`, all green)

- Vite build + full static prerender pass; sitemap regenerated.
- 35/35 automated checks pass, including: no-JS prerendered content visible
  with no tour iframe baked in; menu keyboard flow (closed-inert, open-traverse,
  Escape restore, destination navigation, resize close, scroll-lock release);
  contact form mocked success / 400-with-server-message / network failure /
  15s timeout (all preserving values; success focusing the confirmation
  heading); package selection reaching both the form select and the WhatsApp
  text and staying editable; tour idle → loading → timeout → retry; direct
  `/#pricing` deep link and Back/Forward history; reduced-motion at startup and
  toggled mid-visit; no horizontal overflow at 320px; sticky-CTA hidden state
  inert at the contact section; all fragment targets resolving on both routes;
  no unexpected console errors on /, /about.html, /privacy.html, /terms.html,
  and a missing URL.
- Visual review: live scrolled viewports at 1440×900 and 390×844 for every
  section (sticky layouts cannot be judged from full-page captures), plus
  hero, menu-open drawer, and About founders — compared against
  `shots-baseline/`.
- No real enquiry was submitted; Formspree and the tour URL were only exercised
  via request interception.

## Checks not run / limitations

- Chromium-only automation. No Safari/iOS, Firefox, or real screen-reader
  testing was possible in this environment; keyboard and semantics were
  verified in Chromium only.
- No Lighthouse/performance profiling (P3-02 outstanding) and no contrast
  meter pass; token contrast was reasoned about, not measured.
- Urdu rendering verified in Chromium screenshots of the EN state only; the
  UR state's shaping uses the regenerated subset (49 glyphs) but was not
  reviewed by a fluent reader.
- Cross-origin iframe `load` is treated as document-load evidence only, per
  plan; actual application health inside the tour still can't be asserted.

## Owner-dependent decisions (no invented facts)

1. **NUTECH relationship** — is it a paid commission, a pilot, or a
   student-built demonstration? Copy currently says only "NUTECH campus tour".
   If a relationship is confirmed, the tour section, About principle 3, and
   llms.txt can say so.
2. **Stats accuracy** — "14 scenes / 28 hotspots / 3 buildings" still needs
   confirming against the live tour.
3. **Founding-venue terms** — what "early pricing agreed before we shoot"
   actually commits to; renewal terms and refunds stay unstated online until
   approved.
4. **Response-time promise** — "Within one business day" is kept from the
   existing site; confirm it is operationally supported.
5. **Privacy specifics** — Formspree pathway is now described factually;
   retention/handling details still need the owner's input.
6. **Package area ranges** — now labelled "typical space" (guidance); confirm
   whether they are hard limits.
7. **Delivery windows** — 3–5 / 5–7 / 7–10 days kept from the existing
   packages; confirm they remain accurate now that review/approval is
   explicit.
