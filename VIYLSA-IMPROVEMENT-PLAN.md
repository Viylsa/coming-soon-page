# VIYLSA — frontend, UI and UX implementation plan

Prepared 6 September 2026 for the current repository. This is a practical handoff for the next implementation agent, not a request to replace the site with a generic template.

## 1. Read this first

**Goal:** make VIYLSA feel trustworthy, carefully composed, easy to use and dependable on a phone. Improve the small details as well as the major conversion flow. Keep the warm paper, near-black, wine-crimson, Playfair Display and Geist identity; keep the real tour central.

**Project root:** `C:\Users\Saqlain\Desktop\VIYLSA\coming-soon-page`.

**Primary specification:** this file, `VIYLSA-IMPROVEMENT-PLAN.md`.

**Historical reference:** `VIYLSA-UI-AUDIT.md`. It describes an older version. Many recommendations are already implemented, and its old line numbers, scores and claims are not evidence about today's site. When they conflict, inspect current source and use this plan. Do not blindly reapply the old audit.

### Scope and evidence

This review inspected the React sections, About page, styles, tokens, motion and stacking engines, entry points, metadata, legal pages, build scripts and README. Findings labelled **confirmed** are supported by current source. **Validate** means a runtime/browser check is needed. **Design recommendation** means an intentional refinement, not a measured defect.

The Vite production compilation passed during this review after installing dependencies locally with `npm install --no-package-lock --ignore-scripts`. Full `npm run build:static` stopped at prerender because Puppeteer's expected Chrome executable was missing. That is an environment prerequisite, not evidence that deployment is broken. No production form was submitted. No live product capabilities or business claims were independently verified. No browser screenshots or measured accessibility/performance scores were produced in this review; the implementation agent must do visual QA before claiming completion.

Only documentation is requested in this task. The next agent should implement the plan. Dependencies/build output may exist locally; application source was not changed by this review.

### Preserve what already works

- The homepage already puts the NUTECH tour immediately after the hero.
- AI is already folded into Analytics rather than a top-level navigation destination.
- About already has real founder portraits, social links, image fallbacks and the shared contact form.
- Contact already posts to Formspree, has a native action/method, shows errors and offers a genuine WhatsApp link.
- Analytics already labels its figures illustrative. Retain that disclosure.
- FAQ already uses native `details`/`summary`; labels, skip link, global focus styling, self-hosted fonts and reduced-motion handling already exist.
- Hero already uses small-viewport sizing and a four-copy marquee. Verify geometry; do not treat the old marquee implementation as current.

### Priorities

| Priority | Meaning | Main work |
| --- | --- | --- |
| P1 | Fix before calling the site polished | Menu accessibility, truthful messaging, form states, tour loading, reliable navigation and motion |
| P2 | Core design and conversion refinement | Hero proof, typography, pricing clarity, mobile layout, About and footer |
| P3 | Maintainability and measured optimization | CSS consolidation, lifecycle cleanup, asset and build improvements |

There is no confirmed production outage in this review. Do not inflate every improvement into a critical bug.

## 2. Design direction and page narrative

The strongest direction is an editorial studio site backed by a working product demonstration. Retain the current sequence: **Hero → real tour → why it helps → analytics with supporting AI example → process → packages → FAQ → contact → footer**. About should deepen trust without becoming required reading before someone understands the service.

Use one dominant task at a time. The hero offers a conversation plus an obvious way to explore the tour. The tour earns trust. Packages explain fit. Contact explains the next step. Decorative effects should never compete with these jobs.

Do not add stock photos, invented client logos, unsupported testimonials, fake counters, urgency countdowns, gratuitous gradients, extra animation libraries or new sections simply to make the page longer. Improve composition before adding content.

## 3. P1 — confirmed issues and reliability work

### P1-01. Make the mobile menu a complete keyboard interaction

**Where:** `src/components/Nav.jsx`, `.v-nav__drawer` in `src/styles/styles.css`.

**Current:** the drawer remains mounted and is hidden using opacity, transforms and `pointer-events: none`. Its anchors remain keyboard-focusable. The toggle has `aria-expanded` but no `aria-controls`; opening locks body scrolling and Escape closes it, but focus placement/restoration and background isolation are absent.

**Why:** invisible links can receive focus, and a visitor can navigate into page content behind an apparently open overlay.

**How:** choose a coherent pattern. For the current scroll-locking overlay, use a correctly implemented modal navigation pattern: a labelled dialog containing normal navigation links, focus on open, a reachable close control, focus containment, background inertness and focus return on dismiss. Alternatively redesign it as a nonmodal disclosure and remove modal-like scroll blocking. Do not mix these patterns. Give the trigger `aria-controls` pointing to a stable ID. Closed content must be absent from tab order and the accessibility tree, using conditional rendering, `hidden` or carefully managed inertness. Preserve close animation only if it does not leave ghost focus targets. Restore the previous body overflow value, not an assumed empty value.

Handle opening at mobile width and resizing above 880px: close the drawer and release scroll lock. Bound its height to the available viewport and allow the menu itself to scroll on short landscape screens. Dismissing with Escape should restore trigger focus; choosing a section should move attention to the destination rather than stealing it back to the menu trigger.

**Acceptance:** tab through the closed menu without encountering invisible links; open and traverse it using only keyboard; Escape and destination links work; screen reader state matches visibility; resizing and short-screen scrolling never leave the page locked.

### P1-02. Resolve conflicting promises and implied tracking

**Where:** `Hero.jsx`, `ProblemTriad.jsx`, `Analytics.jsx`, `HowItWorks.jsx`, `Pricing.jsx`, `FAQ.jsx`, `src/pages/About.jsx`, `index.html`.

**Confirmed conflicts:**

- Process says “Usually one afternoon” and “Live the same day”; packages say 3–5, 5–7 and 7–10 days.
- Hero says “exactly who's interested”; Analytics says “who came”; the problem section suggests identifying visitors. This can imply named identification of anonymous visitors.
- Professional is tagged “Most venues start here,” which is still a popularity claim even though a comment says the previous unsupported popularity claim was removed.
- About source comments say there are no clients on the books, while visible copy calls the campus example a “real client tour.” The commercial relationship is not established by the code.
- AI capability, analytics availability and included services are described more broadly in some sections than the package breakdown establishes.

**How:** create one small approved content/config source for package scope, delivery ranges, contacts and product capabilities. Distinguish the photography appointment from production and approval time. Safe process direction: “We capture your space → build and review your tour → publish and support it.” Add that delivery depends on agreed scope and approvals, using actual package ranges.

Replace identity claims with observable behavior: “See which spaces attract attention and collect enquiries from visitors who choose to get in touch.” Replace the featured badge with a scope description such as “For growing venues.” Use “NUTECH campus tour” until the owner confirms whether it is a paid commission, pilot or student-built demonstration. Do not invent a relationship in either direction.

Review FAQ promises such as uninterrupted hosting after renewal, photography ownership and AI accuracy against approved terms. Do not invent renewal prices, refund terms, service guarantees or contractual commitments. Keep unresolved business details in an implementation report; use conservative, accurate copy in the UI.

**Acceptance:** process, packages, FAQ, About, metadata and contact promise the same thing. No copy implies identifying anonymous people. No unsupported popularity or institutional endorsement claim remains.

### P1-03. Clearly label the scripted AI example and give reading control

**Where:** `src/components/AIGuide.jsx`, supporting text in `Analytics.jsx`, relevant CSS.

**Current:** the card cycles fabricated hostel fees, admissions timing and a lab location. Its header says “Trained on this venue” and its final status says “Enquiry logged · ready in your dashboard.” Unlike the analytics card, it has no visible illustrative disclaimer. It changes every nine seconds, and reduced motion is sampled only once.

**Why:** next to a real named campus tour, visitors can reasonably mistake these for that institution's facts or a functioning chat/lead submission.

**How:** put “Scripted example — no message is sent” in the card's persistent header or caption, not a tooltip. Use neutral examples that do not imply real fees, dates or floor locations. Change the completion status to “Example: an enquiry appears in your dashboard.” Replace “Trained on this venue” with copy that describes the example honestly. Keep both languages equivalent.

Prefer a static initial exchange with explicit “Next example” and language controls. If autoplay remains, add a visible pause/resume control, pause while focus is inside or the document is hidden, and respect preference changes while the page is open. Avoid a repeatedly announcing live region for decorative scripted content. Give EN an accessible name such as “English”; preserve `aria-pressed` and `lang`/`dir` on Urdu content. Keep controls and labels understandable without color.

**Acceptance:** a reader immediately recognizes a demo, can finish reading without interruption, can switch language without losing context, and never sees a status suggesting a real message was submitted.

### P1-04. Fix the live-tour loading lifecycle

**Where:** `src/components/LiveTourPreview.jsx`, `.v-tdemo*` CSS.

**Current:** the 12-second timeout starts when the component mounts although the iframe is lazy-loaded. It can enter a failure state before loading is attempted. The failure branch removes the iframe and offers no retry. Cross-origin iframe `load` does not prove the embedded application is usable, and `onError` is not a reliable detector of all embedded failures. “Open fullscreen” actually opens a new tab. The sandbox string also contains `allow-fullscreen`, which is not a sandbox token; fullscreen permission belongs in the existing allow mechanisms.

**How:** prefer a real tour poster and explicit “Explore the live tour” button, creating the iframe after activation. This provides intent, protects page scrolling and postpones WebGL/network cost. If near-viewport automatic loading is retained, start the timeout only when loading is initiated. Model `idle/loading/loaded-or-ready/slow/error` explicitly. A slow warning should keep a valid in-progress load alive where possible. Add retry with a fresh loading attempt and timer cleanup, plus an always available “Open tour in a new tab” link.

If the separate tour application can emit a ready message, validate both the exact expected origin and `event.source === iframe.contentWindow`. Otherwise treat `load` as document-load evidence only and avoid asserting application health. Do not require changes to an unavailable second repository; provide a honest fallback. Remove the invalid sandbox token while preserving necessary capabilities. Verify permissions against actual tour behavior.

Use a stable aspect ratio or responsive stage min-height for poster/loading/ready/error states. Make overlays nonblocking once interaction begins. Give loading and slow states restrained accessible status text. On touch devices provide a clear way to leave interaction and resume page scrolling. The external link should remain usable if embedded interaction is inaccessible.

**Acceptance:** waiting on the hero does not prematurely fail the tour; slow/offline states are actionable; retry works; keyboard can enter and leave; the player does not unexpectedly capture normal scrolling; state transitions do not move surrounding content.

### P1-05. Complete the contact form's state design

**Where:** `src/components/Contact.jsx`, `.v-field*`, `.v-contact*`, `privacy.html`.

**Current:** labels and required fields exist, but autocomplete is absent; inputs are styled at 15px; fetch has no bounded timeout; success replaces the form controls without explicit focus/status handling. Error copy assumes a dropped connection even for server rejection. Success says the enquiry is “in our inbox,” although HTTP acceptance does not independently verify inbox delivery. Privacy copy discusses WhatsApp/email but does not explain the actual Formspree form pathway.

**How:**

1. Add `autoComplete="name"`, `email` and `organization` as appropriate; disable unwanted email capitalization and spelling correction. Keep entered values on failure. Use at least 16px text for mobile fields to avoid common iOS focus zoom.
2. Keep native validation as the baseline. If custom validation is added, attach clear inline errors with `aria-describedby` and `aria-invalid`, and focus the first invalid field. Reject all-whitespace required values without overrestricting real names.
3. Guard duplicate submission synchronously; keep button label/width stable while sending, expose busy state, and add an AbortController timeout with cleanup. A timeout is an uncertain outcome, so explain that confirmation could not be obtained; do not guarantee that nothing arrived.
4. Parse useful server validation responses where available. Use a generic failure message for other errors, retaining retry and the composed WhatsApp fallback. Do not blame the connection for every status.
5. On confirmed HTTP success say “Your enquiry has been received” or “Your enquiry was submitted.” Announce the result and deliberately move focus to a focusable confirmation heading when replacing the form. Do not claim a calendar appointment was booked.
6. State the expected next step before submission: the team replies to arrange a demo and discuss scope. Keep response-time promises only if operationally supported.
7. Add a readable privacy link near submission. Update the factual data-flow description to include the form processor and external contact/tour services. Have the owner confirm actual retention and handling; do not manufacture a legal policy.
8. Clean out the unused `onEmailInstead` handler and stale comments that call WhatsApp the primary form action. Preserve the real form action/method and the working email/WhatsApp paths.

**Acceptance:** test invalid inputs, rapid double submission, slow response, successful acceptance, non-2xx responses, network failure and timeout using intercepted/mock requests. No real lead submission is needed. Values survive errors; screen reader users hear results; no state claims more than the application knows.

### P1-06. Make navigation, stacking and reveals dependable

**Where:** `src/stackSections.js`, `src/motion.js`, `src/main.jsx`, `src/about.jsx`, `src/components/Nav.jsx`, `src/styles/styles.css`.

**Current architecture:** browser-snapshotted HTML is discarded by `createRoot`, and global mutation observers reconnect motion/stacking behavior. Stacking calculates section flow positions and overrides fragment clicks. This is sophisticated but increases the number of interacting systems. The click handler uses smooth scrolling and `pushState`; direct hashes, focus and history still need explicit testing. Reduced-motion preferences are captured at startup. The motion observer schedules `scan()` in rAF even though a nearby comment promises a synchronous microtask reveal.

**How:** make natural document scrolling the reliable baseline. Recommended: disable overlapping sticky sections on phones, short viewports and reduced motion. Keep desktop stacking only where visual testing proves every section remains readable and focus-visible. Do not retain it purely because the code exists, and do not redesign the whole page just to remove it.

Test direct visits to `/#pricing`, About → `/#contact`, nested `#ai-guide`, skip link, repeated up/down section clicks, Back/Forward, font arrival, FAQ expansion and orientation changes. Ensure destinations land beneath the floating navigation and receive appropriate keyboard focus. Add explicit initial-hash/history reconciliation only if required by the existing interception behavior; preserve modified-click and native link semantics.

Tie initialization and cleanup to a deliberate lifecycle rather than accumulating module-global listeners. Scope mutation scanning to necessary nodes and guard unavailable APIs before hiding content. Content must remain visible if enhancement initialization fails. React remounting and pre-rendering need a conscious strategy: either retain remounting with verified stable first paint, or introduce hydration with deterministic markup. Do not switch to `hydrateRoot` blindly while serializing transient loading states and DOM mutations.

Listen for motion-preference changes. Reduced-motion CSS should neutralize `filter` and `clip-path` as well as opacity/transform so unrevealed blur/wipe variants cannot remain obscured. Clean up pending rAF work and observers when replaced or unmounted.

**Acceptance:** no inaccessible section tails, concealed focused controls, blank reveal states, initial content flash, wrong hash landing or broken browser history. Compare actual viewport screenshots while scrolling, not only a full-page screenshot of a sticky layout.

### P1-07. Repair small semantic defects

**Where:** `Nav.jsx`, `Pricing.jsx`, `FooterCTA.jsx`, repeated icon usage.

**Confirmed:** the desktop nav's `ul` has a decorative `span` as a direct child. Move the indicator to a positioned wrapper outside the list or use a pseudo-element. Keep the actual list children as `li`.

Use real headings for package names and footer group labels when they introduce sections of content; choose levels to preserve a logical hierarchy. Keep decorative icons out of accessible names. Use `aria-current="page"` for About and a suitable current-location state for active section links. Ensure visually repeated CTA labels have context where needed, e.g. “Get a quote for Professional.”

**Acceptance:** inspect the accessibility tree, heading outline and keyboard flow; fix actionable automated findings without replacing native semantics unnecessarily.

## 4. P2 — visual and conversion refinement, section by section

### P2-01. Hero: add proof and a second route, not more decoration

**Where:** `Hero.jsx`, hero CSS and existing tokens.

**Why:** the elegant title explains the ambition but the current hero has one contact CTA and no direct tour CTA. New visitors may want proof before starting a conversation.

**Change:** keep “Bringing visits online.” Add a restrained secondary “Explore the live tour” link to `#live-tour`, alongside the primary demo request. Add one small factual line such as “360° tours · Islamabad & Rawalpindi” or “Explore the NUTECH campus example.” Avoid endorsement language until confirmed. Suggested subcopy: “Let people explore your space in 360°, from any device. See what interests them and collect enquiries.” Validate “any device” if support is limited; “from their phone” is a safer alternative.

Keep the headline dominant, body measure around 40–55 characters per line and the CTA group compact. On phones stack buttons only when needed, with equal hit areas and visibly different emphasis. Keep top padding sufficient for the nav and bottom padding sufficient for the marquee. Favor content-safe minimum heights over forcing everything into one viewport on landscape phones or at zoom.

**Acceptance:** first-time visitors can identify the product, geography and next action; the title does not clip; CTA and marquee never overlap; 320px widths and short heights remain usable.

### P2-02. Typography: reserve tiny mono text for true decoration

**Where:** `src/styles/colors_and_type.css`, `styles.css`, `about.css`.

**Current:** many meaningful labels use 10–11px mono uppercase text: form details, chat state, dashboard labels, footer headings and roles. The existing type tokens are good but many rules bypass them.

**Change:** use 16–18px body copy with comfortable line height, generally 12–14px meaningful metadata, and 16px mobile input text. Do not increase every caption indiscriminately; important reading content gets priority. Reduce letter spacing on dense labels, particularly long uppercase strings. Reserve Playfair for major editorial moments; body, form controls, dense data and instructional labels should remain easy to scan. Align numeric columns and use tabular numerals where appropriate.

Use balanced heading wrapping as an enhancement. Replace forced `<br/>` breaks where they produce awkward mobile lines; use breakpoint-specific line control only if it materially improves composition. Check italic overshoots, descenders and Urdu Nastaliq line height without clipping. If Urdu strings change, regenerate the subset font and verify all glyphs.

**Acceptance:** no essential text requires zoom to read; 200% zoom works; enlarged text and longer labels wrap without overlap. Verify computed contrast, rather than assuming a token passes on every translucent background.

### P2-03. Establish consistent alignment, rhythm and surfaces

**Where:** shared wrap, section, card and button styles.

**Change:** align section headings, content edges, cards and CTA groups to one container system. Start with roughly 20–24px mobile gutters and the existing desktop wrap, then adjust for 320px widths. Use the current spacing scale consistently: tight spacing within related content, larger spacing between groups. Avoid giving every section the same height or decorative header.

Keep a deliberate dark hero → lighter proof/content → wine process → lighter decision sections → dark contact rhythm. Distinguish sections through spacing and headings as well as background tone. Reduce arbitrary radius/shadow variants; use one family for cards, another for controls and the existing pill only where justified. Hover may add slight emphasis but must not move adjacent layout. Provide clear pressed, disabled, loading and keyboard-focus states.

**Acceptance:** edges line up across sections, spacing reflects relationships, cards do not look like unrelated components, and the page remains readable without animation.

### P2-04. Tour details: finish the proof section

**Where:** `LiveTourPreview.jsx`, `.v-tdemo__stats`, captions and founding offer CSS.

**Confirmed:** three tour stats are rendered but desktop CSS defines four grid columns, and the small-screen rule defines two. This creates an unbalanced empty slot.

**Change:** use three equal columns where they fit, then a deliberate narrow layout such as three compact columns or one column. Do not leave one stat orphaned by accident. Confirm the 14 scenes / 28 hotspots / 3 buildings counts against the actual tour before treating them as proof. Avoid count-up animation if static values communicate faster.

Shorten the introductory copy and interaction hints. Explain drag/tap behavior once. Label the external action accurately. Keep the founding offer subordinate to the proof, and explain what “locked-in” pricing means only with approved terms; otherwise use “Ask about founding venue packages.” Do not imply that clicking the contact link actually reserves a slot.

**Acceptance:** the player is the clear focal point, stats balance at every breakpoint, instructions remain readable, and each CTA describes what actually happens.

### P2-05. Problem section: replace provocative claims with clear value

**Where:** `ProblemTriad.jsx`, `.v-lens*`, `.v-truth*`.

**Change:** consider “Photos show a frame. A tour shows the space.” instead of “Static photos lie.” Replace the blanket 6pm assumption with “Let people explore after hours.” Replace the identity claim as described in P1-02. Keep the real panorama comparison, but explain it as an illustration of field of view rather than proof that galleries are inherently misleading. The rectangle should not imply a calibrated lens comparison unless its geometry is documented.

On mobile, maintain enough image height for the comparison to make sense; a very thin full-width panorama may be technically responsive but visually unreadable. Consider a scrollable contained comparison or a separately composed mobile crop, with the caption preserving context. Do not hide meaningful visual evidence as a background image.

**Acceptance:** a visitor can understand each benefit quickly, the image comparison is legible on a phone, and the tone respects the buyer's existing website.

### P2-06. Analytics: make the example useful and internally coherent

**Where:** `Analytics.jsx`, `.v-rcpt*`.

**Change:** keep one prominent persistent example-data label; two long uppercase labels in the same header needlessly crowd the card. Make the headline and caption explain an actionable outcome: see which spaces draw interest and where enquiries originate. Remove any unverified “much of the traffic” implication from the sample footer or phrase it as a capability.

Derive bar widths from numeric sample values, not separate strings. Explain whether figures represent visits, views or unique visitors; room views need not sum to unique visits. Display the meaning of `4:12` clearly. Keep labels and numbers as text; bars should supplement them. Let long labels wrap or use a clear stacked mobile row instead of squeezing all columns.

**Acceptance:** the dashboard reads as illustrative product evidence, its units are understandable and its information remains available without color or animated fills.

### P2-07. Process: include review and approval

**Where:** `HowItWorks.jsx`.

**Change:** make the middle step “We build and review” rather than making AI training the primary production step. Mention the tour, hotspots and optional guide within it. State what the customer supplies and when they approve the result. Distinguish a short shoot from total delivery. Preserve three concise steps with one numbering system; avoid duplicating numerals as both decorations and labels.

**Acceptance:** a buyer knows what happens, what they need to provide, when they review it and what determines launch timing.

### P2-08. Packages: make choosing useful even without public prices

**Where:** `Pricing.jsx`, `Contact.jsx`, shared content/config.

**Current:** no monetary prices appear; all quote links go to the same empty contact form. “Everything in…” makes mobile visitors scroll back to compare. Square-foot boundaries overlap, and Enterprise's “2,000–4,000 sq ft+” is ambiguous for a campus or hotel.

**Change:** say “Packages” or “Packages & quotes” consistently in navigation and headings unless prices will actually be supplied. Add “Quoted to your space” and explain the main scope factors. Never invent price amounts. Clarify whether area is guidance or a hard limit; make scene counts, hotspots, revisions, hosting and delivery comparably structured. Make inherited hosting and analytics availability explicit enough to understand each card independently. Use scope-based featured copy.

When a package CTA is selected, carry its name into a visible editable contact field or enquiry context and the Formspree/WhatsApp message. Do not silently overwrite text the visitor already entered. A lightweight parent state or context suffices; no state-management library is necessary. Keep a usable anchor fallback. Give each CTA an accessible package-specific name. Align card bottoms on desktop without fixed heights that clip wrapped text.

**Acceptance:** readers understand custom quoting, can compare the important inclusions without guesswork, and the selected package arrives with their enquiry.

### P2-09. FAQ: support decisions rather than overpromise

**Where:** `FAQ.jsx`, FAQ CSS.

**Change:** keep native details/summary. Prioritize delivery, hosting/renewal, updates, ownership, website embedding and AI limitations. Use concrete approved answers. Link “privacy page” to the actual page rather than leaving it as plain text. Do not state the AI can never answer incorrectly merely because it uses approved documents; explain its intended fallback without guaranteeing perfect accuracy.

Make the entire summary a generous target. Keep the plus/minus indicator aligned when questions wrap. Opening multiple items should work and must not break section measurements. Do not build a custom accordion unless native behavior cannot meet a documented requirement.

**Acceptance:** every question works with keyboard and touch, expanded content is fully reachable, and the most common purchasing concerns are answered consistently with packages and terms.

### P2-10. About: keep personality, lead with competence

**Where:** `src/pages/About.jsx`, `src/styles/about.css`.

**Change:** preserve authentic founder photos and voice. Shorten dense origin-story paragraphs and lead each bio with role, responsibility and contribution. The CTO's “Self-declared ignoramus” and similar self-deprecation can undermine confidence before competence is established; retain warmth in a brief secondary sentence if the owner wants it. Avoid adding fake professional history.

Use consistent portrait ratio, visual scale and eye-line where possible, with individual object positions rather than blindly cropping everyone identically. Keep real social links with descriptive accessible names. Keep the absent MoU image block absent; do not add placeholder partnership proof. Reconcile the claimed client relationship with P1-02.

About already has Contact near the bottom, while its shared nav demo CTA uses the home-page base. Prefer that CTA to target the local `#contact` on About, while product section links still go home. Use explicit props rather than breaking the shared base resolver.

**Acceptance:** founders feel credible and approachable; the page scans easily; local contact navigation works; portraits and story headings survive mobile wrapping.

### P2-11. Footer, legal pages and 404: finish the edges

**Where:** `FooterCTA.jsx`, `privacy.html`, `terms.html`, `public/404.html`, related CSS.

**Change:** long email addresses need `overflow-wrap` and grid items need `min-width: 0` where appropriate. Preserve usable email text rather than truncating the only contact detail. Raise small/low-opacity headings and verify contrast on the actual dark background. Give social icons generous invisible padding without enlarging the glyphs. Distinguish external links when helpful.

Give legal pages consistent brand typography, focus treatment, a useful home route and comfortable mobile measure. Update factual policy references to actual contact pathways as in P1-05. Inspect the built 404 page: meaningful title, useful home/tour/contact routes, no broken assets, and correct host behavior for a missing URL. Do not infer a valid HTTP 404 from its visual appearance alone.

**Acceptance:** every footer and legal-page route resolves in the production preview; long content wraps; keyboard focus is visible; a lost visitor can recover.

### P2-12. Mobile sticky CTA: prevent hidden overlays and collisions

**Where:** `StickyCTA.jsx`, `.v-sticky-cta`, integration with menu state.

**Current:** the fixed bar has a hardcoded `bottom: 16px`. Hidden state uses opacity and a transform; reduced-motion CSS removes the transform, so an invisible link can remain positioned over content unless pointer interaction is also disabled. Contact visibility hides it, but its visibility is not coordinated with the menu.

**Change:** use `bottom: calc(16px + env(safe-area-inset-bottom, 0px))`; account for side safe areas where needed. Set hidden state to `pointer-events: none` and visible state to `pointer-events: auto`, as well as accessible visibility. Hide while navigation is open, a relevant form control is focused or contact is visible. Reserve enough page-end space when necessary, and decide whether it should stay hidden at the footer rather than reappearing after Contact leaves view.

**Acceptance:** no invisible tap interception in reduced motion; no home-indicator collision; no overlap with active form controls or menu; bar appearance does not move page content.

## 5. Interaction polish checklist

Apply this after functional fixes, not as an excuse to add more motion.

- Buttons: consistent heights and icon gaps; visible hover, focus, pressed, disabled and loading states; no width jump when labels change.
- Targets: aim for roughly 44×44 CSS pixels for primary touch controls, especially hamburger, language controls, social links and compact actions. This is a design target, not a claim about a measured compliance score.
- Links: inline prose links need a persistent visual cue beyond color. Avoid ambiguous “click here.” New-tab actions should be named accurately.
- Focus: clear on light, wine and dark surfaces; never clipped by card overflow or hidden behind the fixed nav. Skip link must move users to meaningful main content.
- Motion: short, subtle transitions; do not blur readable content merely for flair. Give moving marquee content a pause mechanism if retaining continuous motion, or make it static. Hover pause alone is insufficient for touch and keyboard users.
- Urdu: correct language/direction metadata, complete glyph coverage, adequate line height, no truncated marks and sensible mixed numeral/punctuation display. Have a fluent reader verify revised copy.
- Loading: stable geometry, useful explanation and recovery; do not run decorative shimmer forever when nothing is progressing.
- Images: intrinsic dimensions, purposeful alt text, responsive sizing, consistent crops and fallback handling for meaningful portraits/posters.
- Selection/zoom: selectable body text, browser zoom enabled, no text clipping at enlarged sizes, no horizontal page overflow concealed by a global overflow rule.
- Scroll: let users control pace; test with keyboard, touch and trackpad, including inside the external player.

## 6. P3 — frontend quality, performance and discoverability

### P3-01. Consolidate CSS after the visual decisions settle

`styles.css` contains layered amendments and legacy component styles. Inventory actual usage first. Remove unused rules/imports only after checking both React routes and static pages. Group each component's base, responsive and reduced-motion states together; route shared colors/type/spacing through tokens. Remove stale comments that describe old behavior, including contradictory stacking/reveal comments. Do not split files purely for aesthetics or introduce a CSS framework to avoid understanding the cascade.

**Done when:** production screenshots are unchanged by cleanup, selectors have clear ownership and fixes no longer require another appended override.

### P3-02. Measure performance before choosing optimizations

Measure the built/prerendered site on a cold mobile load, then after activating the tour. The embedded WebGL application should be accounted for separately from the landing-page shell. Defer it by intent or proximity as P1-04 describes. Profile blur, grain, fixed backdrop filters, scroll-time rect reads and repeated mutation scanning on a mid-range phone. Reduce expensive effects before adding dependencies.

Check images and fonts actually transferred, not merely emitted to `dist`; unused unicode subsets in build output do not necessarily download. Preserve self-hosting and preload only fonts that contribute to first paint. Compare CSS inlining against cacheable external CSS instead of assuming more inlining is always faster. Keep dimensions stable through font swaps and language changes.

Suggested targets: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms where meaningful field data exists. Lab tests provide diagnostic evidence and cannot certify field INP. Record test conditions and limitations rather than inventing scores.

### P3-03. Make prerendering deterministic and testable

**Where:** `scripts/prerender.mjs`, package scripts and deployment workflow.

The script depends on installed Puppeteer Chrome and currently navigates with `networkidle0`, potentially coupling marketing builds to third-party iframe requests. Provide a deterministic prerender mode: render a stable tour poster and static example conversation, skip third-party loading, wait for explicit local readiness and fonts, and fail visibly if required content is missing. Avoid serializing a temporary failure/loading UI into published HTML. Ensure browser and preview-server cleanup also works when launch itself fails.

Install the expected browser in the development/CI setup or configure an explicitly supported executable; do not silently substitute a random browser version and declare parity. Check the repository's existing lockfile and deployment install command before choosing `npm ci` versus `npm install`. Add a lockfile only as a deliberate implementation change, not a side effect of this audit.

**Done when:** `npm run build:static` succeeds in the documented environment; both React routes render usable content with JavaScript disabled; the build does not need a healthy external tour server; no transient error state is baked into HTML.

### P3-04. Keep search/social content consistent with the page

**Where:** `index.html`, `about.html`, `scripts/gen-sitemap.mjs`, `public/robots.txt`, `public/llms.txt`, `public/assets/og-image.jpg`.

Refine the homepage title toward the core offering, e.g. “VIYLSA | 360° Virtual Tours in Pakistan,” keeping AI as a supporting feature if accurate. Align Open Graph/Twitter descriptions with the revised, non-identifying visitor analytics copy. Inspect the actual share image for tiny text and mobile crop safety. Keep canonical host/path consistent across metadata, sitemap and social links.

Inspect structured data and machine-readable content after copy edits so they do not retain old scope, pricing, FAQ or relationship claims. Do not add review ratings or unsupported organization facts. Avoid treating `llms.txt` as a guarantee of discovery or ranking. Verify generated routes and local assets in the production build.

### P3-05. Keep documentation accurate

README still calls About static and describes homepage-only prerendering, while the current code prerenders both React routes. Update the architecture map, setup, browser prerequisite and validation commands. Record how to change packages, contact details, example data, tour URL, fonts and approved claims without hunting through multiple files.

## 7. Implementation sequence

1. **Baseline:** read this document, current source and any applicable `AGENTS.md`; inspect git status. Capture homepage/About screenshots at desktop and mobile widths before editing. Resolve browser setup. Do not overwrite unrelated user work.
2. **Trust and conversion:** implement P1-02, P1-03 and P1-05; unify approved copy/config; connect package selection to enquiry context. Use conservative wording for unknown business facts and record remaining questions.
3. **Interaction foundations:** implement menu, iframe lifecycle, sticky CTA and semantic fixes. Test keyboard and all mocked form/tour states.
4. **Scroll and rendering:** validate stacking, anchors, motion preference changes, initial paint and prerendered/no-JS behavior. Simplify enhancements where they compromise reading.
5. **Visual pass:** implement P2 refinements across homepage, About and supporting pages. Work mobile and desktop together; adjust tokens before one-off overrides.
6. **Measured cleanup:** consolidate CSS, optimize proven bottlenecks, finish metadata and documentation. Avoid expanding scope into the external tour application's implementation.
7. **Release evidence:** run the matrix below, fix failures, write an implementation report with changed files, checks, screenshots and outstanding owner decisions. Do not publish or submit real enquiries just to verify a UI change.

If context runs low, finish a coherent phase and save exact completed IDs, remaining IDs and test results in `VIYLSA-IMPLEMENTATION-STATUS.md`. The next agent should resume from that record rather than repeat the audit.

## 8. QA matrix and definition of done

### Viewports and content

Test 320×568, 360×800, 390×844, 768×1024, 1024×768, 1366×768 and 1440×900, plus a short landscape phone. Exercise both sides of the 700px sticky-CTA and 880px navigation breakpoints. Inspect live scrolled viewports, not just full-page captures. Check 200% zoom and reflow at approximately 320 CSS pixels, long email/organization names, expanded FAQs and the longest Urdu example. Confirm no horizontal page overflow.

### Interaction cases

| Area | Required cases |
| --- | --- |
| Navigation | Closed/open menu, keyboard traversal, Escape, desktop resize, direct hashes, About-to-home links, local About contact, Back/Forward |
| Tour | Idle, activated, slow, load, offline/failure, retry, external fallback, entry/exit by keyboard, touch scroll recovery |
| Contact | Empty, invalid email, whitespace required fields, pending, rapid double submit, success, rejected response, timeout, network failure, WhatsApp composition |
| Packages | Each plan selected, existing message preserved, selection editable, submitted context correct |
| Motion | Normal, reduced at startup, preference changed while open, background tab, offscreen pause, failed enhancement |
| Rendering | Cold production load, slow JS/fonts, no JS after prerender, both React routes, direct deep link, missing URL |
| Accessibility | Heading outline, link names, hidden controls, focus visibility/order, status announcements, contrast and target size |

Use Chromium for repeatable automated checks and Safari/iOS and Firefox where available; explicitly report unavailable browsers. Automated accessibility scans should be supplemented by keyboard and screen-reader smoke tests. Do not claim cross-browser verification from Chromium alone.

### Useful targeted automated checks

- All internal fragment destinations exist, including cross-page routes.
- Closed menu has no focusable descendants; open menu's chosen interaction pattern works.
- Form mock success/failure/timeout produce correct accessible states and preserve data.
- Deferred tour starts only when intended and can retry.
- Package context survives to both enquiry channels.
- Production route smoke checks, no unexpected console errors, and no accidental page-level overflow.

Avoid writing tests that only repeat static JSX strings or assert arbitrary CSS values. Add regression tests for behavior that would lose leads, hide content or trap navigation.

### Completion checklist

- [ ] All P1 items implemented or explicitly resolved with evidence.
- [ ] Visual changes verified on the viewport matrix and compared against baseline.
- [ ] Claims agree across visible content, metadata, machine-readable content and policies.
- [ ] Contact and tour failure paths are useful and honest.
- [ ] No hidden focus/tap targets; accessible focus and status behavior verified.
- [ ] Reduced-motion and no-JS production content remain usable.
- [ ] Vite build and full static build pass in the documented environment.
- [ ] No broken local links/assets or unexpected browser errors.
- [ ] Changes confined to authorized scope; no invented commercial facts or live test leads.
- [ ] Implementation report distinguishes passed, failed, unavailable and owner-dependent checks.

## 9. Copy-paste prompt for the implementation agent

```text
Act as a senior frontend engineer and UI/UX designer. Implement the improvement plan in my existing VIYLSA project; do not stop at giving advice or another audit.

Project root:
C:\Users\Saqlain\Desktop\VIYLSA\coming-soon-page

Read this primary specification first:
C:\Users\Saqlain\Desktop\VIYLSA\coming-soon-page\VIYLSA-IMPROVEMENT-PLAN.md

The older VIYLSA-UI-AUDIT.md is historical context only. Many items in it are already implemented. Current source and the new plan take precedence. Read applicable AGENTS.md instructions and inspect git status before editing.

Preserve the wine-crimson, warm-paper, near-black, Playfair/Geist brand direction and the real-tour-first narrative. Improve the current site with restraint and attention to small details; do not replace it with a generic landing-page template. Keep the React/Vite architecture unless a specific verified issue requires a change.

Follow the implementation sequence in the plan: trust/copy and conversion, accessible menu and form/tour states, reliable scrolling/rendering, responsive visual polish, then measured cleanup and QA. Work through P1 and P2 thoroughly and handle applicable P3 improvements. Treat unmeasured concerns as hypotheses to validate, not proven failures.

Make reasonable implementation decisions autonomously. Do not invent prices, testimonials, client relationships, delivery promises, AI guarantees or product capabilities. Use conservative accurate wording for unresolved business facts, and record only the essential owner questions while continuing independent work. Preserve existing user changes. Do not publish or send real enquiries as part of testing.

Capture baseline and final desktop/mobile screenshots. Test the production build, all relevant routes, keyboard navigation, reduced motion, direct hashes/history, no-JS prerendered content, responsive layouts, Urdu text, and mocked form/tour failure states. The previous review compiled Vite successfully but full prerender lacked Puppeteer's expected Chrome; resolve and document that prerequisite. Do not claim checks you could not run.

Create VIYLSA-IMPLEMENTATION-STATUS.md in the project root with completed plan IDs, remaining work, changed files, validation results and any owner-dependent decisions. If context becomes limited, save enough detail to resume without repeating work. Finish with a concise report linking the changed artifacts and showing the verified result.
```
