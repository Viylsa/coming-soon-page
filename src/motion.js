/* Reveal-on-scroll, counters, hero choreography, cursor-reactive panorama,
   magnetic CTAs. Pure vanilla. Survives React re-renders by re-querying on
   every MutationObserver tick. Respects prefers-reduced-motion throughout. */

(function () {
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE   = window.matchMedia('(pointer: fine)').matches;

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

  // ── Hero entrance: reveal the collage on load (above the fold) ─────
  function fireHero() {
    const hero = document.querySelector('.v-hero:not(.is-in)');
    if (hero) requestAnimationFrame(() => hero.classList.add('is-in'));
  }

  // ── Cursor-reactive panorama + drag-to-look hint ──────────────────
  function bindTilt() {
    document.querySelectorAll('[data-tilt]:not(.is-tilt)').forEach((stage) => {
      stage.classList.add('is-tilt');
      const photo = stage.querySelector('.v-hpv__photo');
      const hint  = stage.querySelector('.v-hpv__draghint');

      // The hint fades the first time the visitor does anything to the stage.
      const dismiss = () => { if (hint) hint.classList.add('is-gone'); };
      stage.addEventListener('pointerdown', dismiss, { once: true, passive: true });
      window.addEventListener('scroll', dismiss, { once: true, passive: true });

      if (!photo || REDUCE || !FINE) return;
      let raf = 0, target = 0, cur = 0;
      const loop = () => {
        cur += (target - cur) * 0.12;
        photo.style.setProperty('--cursor-pan', cur.toFixed(2) + 'px');
        if (Math.abs(target - cur) > 0.15) raf = requestAnimationFrame(loop);
        else raf = 0;
      };
      stage.addEventListener('mousemove', (e) => {
        const r = stage.getBoundingClientRect();
        target = (0.5 - (e.clientX - r.left) / r.width) * 36;   // px, inverted = natural look
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
      stage.addEventListener('mouseleave', () => { target = 0; if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });
    });
  }

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
      io.observe(el);
    });
    document.querySelectorAll('[data-count]:not(.is-watched)').forEach((el) => {
      el.classList.add('is-watched');
      countIo.observe(el);
    });
    fireHero();
    bindTilt();
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
})();
