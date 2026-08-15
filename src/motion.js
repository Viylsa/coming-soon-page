/* Reveal-on-scroll (single + staggered groups), counters, CTA spotlight,
   off-screen marquee pause. Pure vanilla. Survives React re-renders by
   re-querying on every MutationObserver tick. Respects prefers-reduced-motion.
   (Nav scrollspy + the sliding indicator now live in Nav.jsx — one system.) */

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

  const inFirstView = (el) => el.getBoundingClientRect().top < window.innerHeight * 0.95;

  // Reveal one element with the will-change promote/release dance.
  function reveal(el, delayMs) {
    if (delayMs) el.style.transitionDelay = delayMs + 'ms';
    el.style.willChange = 'opacity, transform';
    el.classList.add('is-in');
    const clear = () => {
      el.style.willChange = '';
      el.style.transitionDelay = '';
      el.removeEventListener('transitionend', clear);
    };
    el.addEventListener('transitionend', clear);
  }

  // ── Reveal-on-scroll (single elements) ────────────────────────────
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { reveal(e.target, 0); io.unobserve(e.target); }
    }
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  // ── Staggered group reveal ([data-reveal-group]) ──────────────────
  // Children cascade in sequence so a row of cards/stats reads as choreographed
  // rather than popping as a block or via crude hand-typed delay tiers.
  function revealGroup(group, stagger) {
    group.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el, i) => reveal(el, i * stagger));
  }
  const groupIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      revealGroup(e.target, 80);
      groupIo.unobserve(e.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

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

  // ── Primary CTA spotlight (cursor-following highlight) ────────────
  // rAF-coalesced: one layout read + var write per frame, not per mousemove.
  function bindMagnetic() {
    if (REDUCE || !FINE) return;
    document.querySelectorAll('.v-btn--primary:not(.is-mag)').forEach((btn) => {
      btn.classList.add('is-mag');
      let raf = 0, mx = 0, my = 0;
      btn.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = btn.getBoundingClientRect();
          btn.style.setProperty('--sx', (((mx - r.left) / r.width) * 100).toFixed(1) + '%');
          btn.style.setProperty('--sy', (((my - r.top) / r.height) * 100).toFixed(1) + '%');
        });
      });
    });
  }

  // ── Pause the venue marquee while it's off-screen (saves wakeups) ──
  const marqueeIo = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('is-paused', !e.isIntersecting);
  });
  function bindMarquee() {
    document.querySelectorAll('.v-hero__marquee:not(.is-marq)').forEach((m) => {
      m.classList.add('is-marq');
      marqueeIo.observe(m);
    });
  }

  function scan() {
    // Groups first so their children are claimed before the single-element pass.
    document.querySelectorAll('[data-reveal-group]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      if (REDUCE) { el.querySelectorAll('[data-reveal]').forEach((k) => k.classList.add('is-in')); return; }
      if (inFirstView(el)) { revealGroup(el, 0); return; }  // above fold: no flash, no stagger
      groupIo.observe(el);
    });
    document.querySelectorAll('[data-reveal]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      if (REDUCE) { el.classList.add('is-in'); return; }
      if (el.closest('[data-reveal-group]')) return;   // a group owns this child
      // Kill the first-paint flash: anything in the first viewport reveals
      // synchronously inside the MutationObserver microtask (before paint).
      if (inFirstView(el)) { el.classList.add('is-in'); return; }
      io.observe(el);
    });
    document.querySelectorAll('[data-count]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      countIo.observe(el);
    });
    bindMagnetic();
    bindMarquee();
  }

  // Initial pass + re-scan whenever React adds nodes. Bursts (the AI chat swaps
  // keyed bubbles every cycle) are coalesced into one scan per frame.
  let scanQueued = false;
  const mo = new MutationObserver(() => {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(() => { scanQueued = false; scan(); });
  });
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
