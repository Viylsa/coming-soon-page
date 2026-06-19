/* Reveal-on-scroll, counters, CTA spotlight, nav scrollspy. Pure vanilla.
   Survives React re-renders by re-querying on every MutationObserver tick.
   Respects prefers-reduced-motion throughout. */

(function () {
  // No-op in any non-browser (build-time prerender) context.
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE   = window.matchMedia('(pointer: fine)').matches;

  // Mark that JS (and therefore the reveal machinery) is live. The initial
  // hidden state of [data-reveal] is gated behind html.v-js (see styles.css),
  // so a no-JS visitor or a failed bundle load can NEVER leave content stuck at
  // opacity:0 — it just renders fully visible. Added synchronously, first thing.
  document.documentElement.classList.add('v-js');

  // ── Reveal-on-scroll ──────────────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const el = e.target;
        el.style.willChange = 'opacity, transform';        // promote transiently…
        el.classList.add('is-in');
        const clear = () => { el.style.willChange = ''; el.removeEventListener('transitionend', clear); };
        el.addEventListener('transitionend', clear);        // …and release after the reveal
        io.unobserve(el);
      }
    }
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  // ── Counter (data-count="1204") ───────────────────────────────────
  function animateCount(el) {
    const target = Number(el.dataset.count);
    if (REDUCE) { el.textContent = target.toLocaleString(); return; }
    const dur = Number(el.dataset.dur || 1400);
    let start = null;
    const fmt = (n) => Math.round(n).toLocaleString();
    el.textContent = '0';
    function tick(t) {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);   // easeOutExpo
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { animateCount(e.target); countIo.unobserve(e.target); }
    }
  }, { threshold: 0.6 });

  // ── Primary CTA spotlight (cursor-following highlight; no magnetic
  //    translation — it fights the :active transform and reads as gimmick) ──
  function bindMagnetic() {
    if (REDUCE || !FINE) return;
    document.querySelectorAll('.v-btn--primary:not(.is-mag)').forEach((btn) => {
      btn.classList.add('is-mag');
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--sx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
        btn.style.setProperty('--sy', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
      });
    });
  }

  // ── Scrollspy: highlight the nav link for the section in view ──────
  const spyIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = '#' + e.target.id;
      document.querySelectorAll('.v-nav__links a').forEach((a) => {
        if (a.getAttribute('href') === id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-25% 0px -65% 0px' });
  function bindScrollspy() {
    document.querySelectorAll('.v-nav__links a[href^="#"]').forEach((a) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target && !target.classList.contains('is-spied')) {
        target.classList.add('is-spied');
        spyIo.observe(target);
      }
    });
  }

  function scan() {
    document.querySelectorAll('[data-reveal]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      if (REDUCE) { el.classList.add('is-in'); return; }
      // Kill the first-paint flash. createRoot() re-mounts the prerendered DOM
      // without .is-in, so [data-reveal] elements blink to opacity:0 until the
      // observer fires. This scan runs inside the MutationObserver microtask
      // (before paint), so anything already in the first viewport is revealed
      // synchronously — no blink, no observer round-trip. Below-fold elements
      // still animate in on scroll via the observer.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        el.classList.add('is-in');
        return;
      }
      io.observe(el);
    });
    document.querySelectorAll('[data-count]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      countIo.observe(el);
    });
    bindMagnetic();
    bindScrollspy();
  }

  // Initial pass + re-scan whenever React adds nodes
  const mo = new MutationObserver(() => scan());
  function start() {
    scan();
    mo.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // ── Dev-only: assert every in-page anchor resolves to a live id ───
  // Catches dead "#…" links after section renames/merges (e.g. the AI-guide
  // demotion). Stripped from the production bundle by Vite's dead-code pass.
  if (import.meta.env && import.meta.env.DEV) {
    setTimeout(() => {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        const id = a.getAttribute('href').slice(1);
        if (id && !document.getElementById(id)) {
          // eslint-disable-next-line no-console
          console.warn('[viylsa] dead in-page anchor →', a.getAttribute('href'), a);
        }
      });
    }, 1500);
  }
})();
