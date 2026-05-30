const { IconArrowRight, IconMenu } = window.VIcons;

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false); // mobile drawer
  const linksRef = React.useRef(null);
  const [ind, setInd] = React.useState({ left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer when a link is clicked
  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    ['Product', '#how'],
    ['Tours', '#tours'],
    ['Pricing', '#pricing'],
    ['Team', '#team'],
  ];

  const moveIndicator = (e) => {
    const a = e.currentTarget;
    const parent = linksRef.current;
    if (!parent) return;
    const r = a.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    setInd({ left: r.left - pr.left, width: r.width, opacity: 1 });
  };
  const hideIndicator = () => setInd((s) => ({ ...s, opacity: 0 }));

  return (
    <nav className={'v-nav' + (scrolled ? ' v-nav--scrolled' : '')}>
      <div className="v-nav__pill">
        <a href="#top" className="v-nav__brand">
          <img src="assets/viylsa-mark.png" alt="" className="v-nav__mark"/>
          <span className="v-nav__brand-name">VIYLSA</span>
        </a>

        <ul
          ref={linksRef}
          className="v-nav__links"
          onMouseLeave={hideIndicator}
        >
          <span
            className="v-nav__indicator"
            style={{ left: ind.left + 'px', width: ind.width + 'px', opacity: ind.opacity }}
          />
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} onMouseEnter={moveIndicator}>{l}</a>
            </li>
          ))}
        </ul>

        <div className="v-nav__cta">
          <a href="#contact" className="v-btn v-btn--link">Contact</a>
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
          {links.map(([l, h], i) => (
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
window.Nav = Nav;
