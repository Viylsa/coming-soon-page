/* Stacked sections: each one pins in place while the next slides up over it.
 *
 * The CSS does the pinning (position: sticky). The only thing that cannot be
 * expressed in CSS is WHERE each section should pin, because that depends on
 * its own height relative to the viewport:
 *
 *   section shorter than the viewport -> top: 0
 *       It pins as soon as its top reaches the top of the screen, and the next
 *       section rides up over it. This is the effect you actually see.
 *
 *   section TALLER than the viewport  -> top: viewportHeight - sectionHeight
 *       A negative value. The section scrolls normally until its BOTTOM edge
 *       reaches the bottom of the screen, and only then pins. Without this,
 *       `top: 0` would pin a tall section by its top and everything below the
 *       fold inside it would be permanently unreachable — which is exactly what
 *       breaks Pricing, the live tour and the FAQ, all of which are taller than
 *       a viewport.
 *
 * So this measures each section and publishes --stack-top. A ResizeObserver
 * re-measures because the FAQ accordion changes height as items open, and the
 * numbers would otherwise go stale the moment someone expands one.
 *
 * Progressive enhancement, same contract as motion.js: the sticky rules are
 * gated behind html.v-stack, which is only added AFTER the first successful
 * measure. No JS, a failed bundle, or reduced motion -> sections simply scroll
 * normally, keeping the overlapping seams and losing only the pinning.
 */
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Pinning changes how the page responds to scrolling, so honour the same
  // preference the reveals and the hero entrance already respect.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let items = [];
  let frame = 0;
  // Flow position of each section, i.e. where it would sit with no pinning.
  const flowTops = new WeakMap();

  function measure() {
    frame = 0;
    const vh = window.innerHeight;
    const main = document.getElementById('main');
    if (!main) return;

    // main is never sticky, so its rect always reflects its true flow position.
    let acc = main.getBoundingClientRect().top + window.scrollY;

    for (const el of items) {
      const cs = getComputedStyle(el);
      acc += parseFloat(cs.marginTop) || 0;   // the negative seam overlap
      flowTops.set(el, acc);
      acc += el.offsetHeight;                 // a size, unaffected by sticky

      const top = Math.min(0, vh - el.offsetHeight);
      el.style.setProperty('--stack-top', Math.round(top) + 'px');
    }
    seam();   // stick points just moved, so the lip progress is stale
  }

  /* Where would `el` be if nothing were pinned?
   *
   * NOT offsetTop. In Chrome offsetTop of a sticky element includes its sticky
   * shift, so it changes as you scroll — using it to compute a scroll target
   * makes the target chase the element (measured: the same anchor resolved to
   * 5364 from the top of the page and 6596 from the bottom).
   *
   * The section's flow position comes from the arithmetic in measure(); the
   * offset of a nested target within it comes from the difference of the two
   * rects, which is immune because both shift together when the section pins. */
  function flowTopOf(el) {
    let section = null;
    for (const s of items) if (s === el || s.contains(el)) { section = s; break; }
    if (!section || !flowTops.has(section)) return null;
    const delta = el.getBoundingClientRect().top - section.getBoundingClientRect().top;
    return flowTops.get(section) + delta;
  }

  // Coalesce: a ResizeObserver on eight sections can fire several times for one
  // layout change, and each measure reads offsetHeight (a forced reflow).
  function schedule() {
    if (!frame) frame = requestAnimationFrame(measure);
  }

  let mainEl = null;
  let ro = null;

  /* Have the nodes we measured been thrown away?
   *
   * This is not hypothetical. The prerendered HTML already contains a full
   * #main, so on a real visit this module finds it and measures it at import
   * time — and then createRoot().render() (NOT hydrate) discards that entire
   * tree and builds a fresh one. Every element we measured is detached, our
   * ResizeObserver is watching orphans, and the live sections have no
   * --stack-top at all, so they all fall back to top:0. That is precisely the
   * broken case this module exists to avoid: tall sections pinned by the top
   * with their lower half unreachable. It shipped to production exactly once. */
  function isStale() {
    const m = document.getElementById('main');
    if (!m || m !== mainEl) return true;
    if (items.length !== m.children.length) return true;
    return items.length > 0 && !items[0].isConnected;
  }

  function init() {
    const m = document.getElementById('main');
    if (!m) return false;

    const kids = Array.from(m.children);
    if (kids.length < 2) return false;

    if (ro) ro.disconnect();
    mainEl = m;
    items = kids;

    measure();
    document.documentElement.classList.add('v-stack');

    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(schedule);
      items.forEach((el) => ro.observe(el));
    }
    return true;
  }

  /* Flatten each section's rounded lip as it arrives at its pinned position.
   *
   * A section held at the top of the viewport keeps its rounded top corners on
   * screen for as long as it is pinned, and the previous section shows through
   * them — two notches in the top corners for the whole time you are reading it.
   * So the radius is driven by how far the section still has to travel: full
   * radius while it is sliding up, zero the moment it locks.
   *
   * Cheap enough to run on scroll: one rAF per frame, eight rects, and the only
   * writes are two custom properties that affect paint, not layout.
   */
  let seamFrame = 0;
  function seam() {
    seamFrame = 0;
    const r = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stack-radius')) || 0;
    if (!r) return;
    for (const el of items) {
      const stick = parseFloat(el.style.getPropertyValue('--stack-top')) || 0;
      const travel = el.getBoundingClientRect().top - stick;   // 0 == pinned
      const t = travel <= 0 ? 0 : travel >= r ? 1 : travel / r;
      el.style.setProperty('--seam', t.toFixed(3));
    }
  }
  function onScroll() {
    if (!seamFrame) seamFrame = requestAnimationFrame(seam);
  }

  /* Anchor jumps have to be taken over once sections pin.
   *
   * The browser works out an anchor scroll from the target's CURRENT rect. For
   * a section that is already pinned, that rect is its stuck position, not its
   * position in the flow — so jumping UP to it (clicking Pricing while down at
   * Contact) moves the viewport by a delta that is wrong the moment the section
   * unpins, and it lands short with its heading cut off above the fold.
   * Measured: #pricing landed at -224px instead of the intended +90px.
   *
   * So compute where the target would be with nothing pinned (see flowTopOf)
   * and scroll there, honouring the target's own scroll-margin-top (90px, which
   * clears the floating nav).
   */
  function interceptAnchors() {
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      // Resolved at click time, not captured at init: #main is replaced when
      // React renders over the prerendered tree.
      if (!el || !mainEl || !mainEl.contains(el)) return;

      const flowTop = flowTopOf(el);
      if (flowTop == null) return;   // not in a stacked section: let the browser do it

      e.preventDefault();
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      window.scrollTo({ top: Math.max(0, flowTop - margin), behavior: 'smooth' });
      // Keep the URL and the back button honest without letting the browser do
      // its own (wrong) jump, which setting location.hash would trigger.
      if (history.pushState) history.pushState(null, '', '#' + id);
    });
  }

  // Registered once, never torn down: they read `items` at call time, so they
  // keep working across a re-init.
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  interceptAnchors();

  init();

  /* Stays connected for the life of the page rather than disconnecting on first
   * success. #main arrives late on a fresh render, and is REPLACED on a
   * prerendered one — so "it worked once" is not the end of the story. The
   * staleness check is a getElementById and two property reads, cheap enough to
   * run on a mutation batch. */
  const mo = new MutationObserver(() => {
    if (isStale()) init();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
