import React from 'react';
import { IconArrowRight } from '../icons.jsx';

// AI guide + Analytics are intentionally NOT top-level destinations — the AI
// guide is a supporting capability folded into the analytics section, not a
// co-headline. These 5 links each map to a real section the visitor wants.
const LINKS = [
  ['Tour', '#live-tour'],
  ['How it works', '#how'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
];

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false); // mobile drawer
  const [activeHref, setActiveHref] = React.useState(null);
  const linksRef = React.useRef(null);
  const hoveringRef = React.useRef(false);
  const [ind, setInd] = React.useState({ left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile drawer is open.
  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open]);

  // Scrollspy: the section in the viewport band drives the active nav link.
  // Unified with the sliding indicator below — one system, scroll-reactive for
  // everyone (touch included), not just a desktop hover flourish.
  React.useEffect(() => {
    const targets = LINKS.map(([, h]) => document.querySelector(h)).filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActiveHref('#' + e.target.id);
      }
    }, { rootMargin: '-25% 0px -65% 0px' });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
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
        <a href="#top" className="v-nav__brand">
          <img src="/assets/viylsa-mark-sm.png" alt="" className="v-nav__mark" width="256" height="247"/>
          <span className="v-nav__brand-name">VIYLSA</span>
        </a>

        <ul
          ref={linksRef}
          className="v-nav__links"
          onMouseLeave={onLeaveList}
        >
          <span
            className="v-nav__indicator"
            style={{ left: ind.left + 'px', width: ind.width + 'px', opacity: ind.opacity }}
          />
          {LINKS.map(([l, h]) => (
            <li key={l}>
              <a href={h} aria-current={h === activeHref ? 'true' : undefined} onMouseEnter={onEnter}>{l}</a>
            </li>
          ))}
        </ul>

        <div className="v-nav__cta">
          <a href="#contact" className="v-btn v-btn--primary v-btn--sm">
            Book a demo <IconArrowRight size={16}/>
          </a>
          <button
            className={'v-nav__menu' + (open ? ' v-nav__menu--open' : '')}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={'v-nav__drawer' + (open ? ' v-nav__drawer--open' : '')}>
        <ul className="v-nav__drawer-links">
          {LINKS.map(([l, h], i) => (
            <li key={l} style={{ transitionDelay: open ? (60 + i * 50) + 'ms' : '0ms' }}>
              <a href={h} onClick={() => setOpen(false)}>
                <span className="v-nav__drawer-num">0{i + 1}</span> {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="v-nav__drawer-cta">
          <a href="#contact" className="v-btn v-btn--primary v-btn--lg" onClick={() => setOpen(false)}>
            Book a demo <IconArrowRight size={16}/>
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
