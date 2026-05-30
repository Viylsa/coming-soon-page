/* Reveal-on-scroll + counter animations.
   Pure vanilla. Survives React re-renders by re-querying on every
   MutationObserver tick. Respects prefers-reduced-motion. */

(function () {
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Reveal-on-scroll ──────────────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  // ── Counter (data-count="1204") ───────────────────────────────────
  function animateCount(el) {
    if (REDUCE) {
      el.textContent = Number(el.dataset.count).toLocaleString();
      return;
    }
    const target = Number(el.dataset.count);
    const dur = Number(el.dataset.dur || 1400);
    const start = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString();
    el.textContent = '0';
    function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      // easeOutExpo
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        animateCount(e.target);
        countIo.unobserve(e.target);
      }
    }
  }, { threshold: 0.6 });

  function scan() {
    document.querySelectorAll('[data-reveal]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      if (REDUCE) { el.classList.add('is-in'); return; }
      io.observe(el);
    });
    document.querySelectorAll('[data-count]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      countIo.observe(el);
    });
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
})();
