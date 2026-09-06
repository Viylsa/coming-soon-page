import React from 'react';
import { IconArrowRight } from '../icons.jsx';

// AI guide + Analytics are intentionally NOT top-level destinations — the AI
// guide is a supporting capability folded into the analytics section, not a
// co-headline. Each link maps to a real destination the visitor wants.
// About is the one cross-page entry: it is a whole page, not a section, and it
// carries the founders and the story, so it earns a nav slot rather than being
// reachable only from the footer.
const LINKS = [
  ['Tour', '#live-tour'],
  ['How it works', '#how'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
  ['About', '/about.html'],
  ['Contact', '#contact'],
];

const isFragment = (href) => href.startsWith('#');
/* Fragments get the page prefix (see `base` below); real paths are used as-is,
   otherwise base='/' would turn '/about.html' into '//about.html', which the
   browser reads as a protocol-relative URL and sends to another host. */
const resolve = (base, href) => (isFragment(href) ? base + href : href);

/* `base` prefixes every in-page href so the same nav serves a sub-page. On the
   homepage it stays '' and the links are plain fragments (smooth-scrolled by
   motion.js, which only intercepts href^="#"). On /about.html it is '/', so the
   links become '/#pricing' and navigate home first. The scrollspy below still
   queries the bare fragment, finds nothing off-homepage, and bails — which is
   exactly right: no section here, no indicator. */
function Nav({ base = '', current = null, ctaHref = null }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false); // mobile drawer
  // `current` seeds the active link on a sub-page, where there are no sections
  // for the scrollspy to observe, so the sliding indicator still parks somewhere
  // meaningful instead of hiding.
  const [activeHref, setActiveHref] = React.useState(current);
  const linksRef = React.useRef(null);
  const drawerRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const hoveringRef = React.useRef(false);
  const [ind, setInd] = React.useState({ left: 0, width: 0, opacity: 0 });

  // The demo CTA defaults to this page's #contact; About passes its own so the
  // header CTA stays local (see P2-10) while section links still go home.
  const demoHref = ctaHref ?? base + '#contact';

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Mobile drawer — a modal dialog pattern (P1-01):
     - closed state is inert + aria-hidden, so no invisible focus targets;
     - open moves focus into the menu, contains Tab inside it, and Escape
       returns focus to the trigger;
     - following a link closes the menu WITHOUT yanking focus back — attention
       belongs to the destination;
     - the body's previous overflow value is restored verbatim;
     - growing past the menu breakpoint closes it and releases the scroll lock;
     - the state is broadcast (viylsa:menu) so the sticky CTA can hide too. */
  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('viylsa:menu', { detail: { open: true } }));

    // Focus lands on the menu panel itself; Tab containment keeps it there.
    const raf = requestAnimationFrame(() => drawerRef.current?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const dialog = drawerRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      document.dispatchEvent(new CustomEvent('viylsa:menu', { detail: { open: false } }));
    };
  }, [open]);

  // Resizing onto the desktop layout must never leave a locked page or a
  // rendered-but-unreachable menu (the drawer is display:none ≥881px).
  React.useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 881px)');
    const onChange = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

  // Scrollspy: whichever section is actually ON TOP at the probe line drives the
  // active nav link. Unified with the sliding indicator below — one system,
  // scroll-reactive for everyone (touch included), not a desktop hover flourish.
  //
  // This used to be an IntersectionObserver over a -25%/-65% band, taking the
  // last entry that reported intersecting. That broke the moment sections became
  // sticky: pinned sections keep occupying the band after you have scrolled past
  // them, so several intersect at once and the "winner" was whichever fired last
  // — which parked Contact as active while you were still on the live tour.
  //
  // Sections stack in DOM order (later paints over earlier), so the section a
  // visitor is actually looking at is the LAST one whose box spans the probe
  // line. That is true whether or not the stacking is active, so there is one
  // code path for both.
  React.useEffect(() => {
    // Fragments only — querySelector('/about.html') is not a valid selector and
    // would throw, taking the whole nav down with it.
    const linked = LINKS.filter(([, h]) => isFragment(h))
      .map(([, h]) => [h, document.querySelector(h)])
      .filter(([, el]) => el);
    if (!linked.length) return;   // sub-page: `current` already seeded the state

    let queued = false;
    const update = () => {
      queued = false;
      const probe = window.innerHeight * 0.38;
      let active = null;
      for (const [href, el] of linked) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) active = href;
      }
      setActiveHref(active);
    };
    const onScroll = () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const positionTo = (a) => {
    const parent = linksRef.current;
    if (!parent || !a) return;
    const r = a.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    setInd({ left: r.left - pr.left, width: r.width, opacity: 1 });
  };
  const positionToHref = (href) => {
    const parent = linksRef.current;
    if (!parent) return;
    const a = href && parent.querySelector('a[href="' + href + '"]');
    if (a) positionTo(a); else setInd((s) => ({ ...s, opacity: 0 }));
  };

  // Park the indicator under the active link when not hovering; recompute on
  // resize (the old code only moved it on mouseenter, so it desynced after a
  // viewport change).
  React.useEffect(() => {
    if (!hoveringRef.current) positionToHref(activeHref);
    const onResize = () => { if (!hoveringRef.current) positionToHref(activeHref); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref]);

  const onEnter = (e) => { hoveringRef.current = true; positionTo(e.currentTarget); };
  const onLeaveList = () => { hoveringRef.current = false; positionToHref(activeHref); };

  return (
    <nav className={'v-nav' + (scrolled ? ' v-nav--scrolled' : '')}>
      <div className="v-nav__pill">
        <a href={base + '#top'} className="v-nav__brand">
          <img src="/assets/viylsa-mark-sm.png" alt="" className="v-nav__mark" width="256" height="247"/>
          <span className="v-nav__brand-name">VIYLSA</span>
        </a>

        {/* The sliding indicator lives on this wrapper, OUTSIDE the <ul>: a span
            cannot be a direct child of a list (P1-07). positionTo measures
            against this wrapper, which shares the list's box exactly. */}
        <div ref={linksRef} className="v-nav__links-wrap" onMouseLeave={onLeaveList}>
          <span
            className="v-nav__indicator"
            aria-hidden="true"
            style={{ left: ind.left + 'px', width: ind.width + 'px', opacity: ind.opacity }}
          />
          <ul className="v-nav__links">
            {LINKS.map(([l, h]) => (
              <li key={l}>
                <a
                  href={resolve(base, h)}
                  aria-current={h === activeHref ? 'true' : undefined}
                  onMouseEnter={onEnter}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="v-nav__cta">
          <a href={demoHref} className="v-btn v-btn--primary v-btn--sm">
            Book a demo <IconArrowRight size={16}/>
          </a>
          <button
            ref={triggerRef}
            className={'v-nav__menu' + (open ? ' v-nav__menu--open' : '')}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="v-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile drawer — modal menu. `inert` (React 18 renders it as the bare
          attribute) removes closed content from tab order AND the a11y tree
          while keeping it mounted for the close animation. */}
      <div
        id="v-nav-drawer"
        ref={drawerRef}
        className={'v-nav__drawer' + (open ? ' v-nav__drawer--open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        aria-hidden={!open}
        {...(open ? {} : { inert: '' })}
      >
        <ul className="v-nav__drawer-links">
          {LINKS.map(([l, h], i) => (
            <li key={l} style={{ transitionDelay: open ? (60 + i * 50) + 'ms' : '0ms' }}>
              <a href={resolve(base, h)} onClick={() => setOpen(false)}>
                <span className="v-nav__drawer-num" aria-hidden="true">0{i + 1}</span> {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="v-nav__drawer-cta">
          <a href={demoHref} className="v-btn v-btn--primary v-btn--lg" onClick={() => setOpen(false)}>
            Book a demo <IconArrowRight size={16}/>
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
