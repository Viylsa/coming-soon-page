import { useRef } from 'react';
import { IconArrowRight, IconPlay } from '../icons.jsx';

/* Editorial hero, now proof-led: type-led copy on the left, a tour-player frame
   on the right that previews the real product and links to the live embed one
   scroll down. The frame is an IMAGE-FREE placeholder — drop a real NUTECH still
   into .v-hero__shot later (background-image or an <img>); it looks intentional
   without one. The venue marquee is pinned to the hero's bottom edge so it is
   always inside the fold. */

const VENUES = ['Universities', 'Hotels', 'Hospitals', 'Event halls', 'Real estate', 'Showrooms', 'Restaurants', 'Schools'];

function Hero() {
  const heroRef = useRef(null);
  const raf = useRef(0);
  const pos = useRef({ x: 0, y: 0 });
  // Only fine pointers get the cursor-following grain spotlight — no work on
  // touch — and updates are coalesced to one per animation frame (the old code
  // wrote two CSS vars + read layout on every mousemove event: an INP risk).
  const fine = useRef(typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches);

  const handleMouseMove = (e) => {
    if (!fine.current) return;
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${pos.current.x - rect.left}px`);
      el.style.setProperty('--my', `${pos.current.y - rect.top}px`);
    });
  };

  return (
    <header id="top" className="v-hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="v-hero__glow" aria-hidden="true"/>
      <div className="v-hero__grain" aria-hidden="true"/>
      <div className="v-hero__grain-spot" aria-hidden="true"/>

      <div className="v-hero__inner">
        <div className="v-hero__copy">
          <div className="v-eyebrow v-eyebrow--crimson v-hero__eyebrow">360° virtual tours · Islamabad &amp; Rawalpindi</div>
          <h1 className="v-display">
            Bringing <span className="v-display__em">visits</span> online.
          </h1>
          <p className="v-hero__sub">
            <b>VIYLSA</b> turns your venue into a 360° tour anyone can walk from
            their phone, and shows you exactly who's interested.
          </p>
          <div className="v-hero__cta">
            <a href="#live-tour" className="v-btn v-btn--primary v-btn--lg">
              <IconPlay size={16}/> See a live client tour
            </a>
            <a href="#contact" className="v-btn v-btn--ghost-dark v-btn--lg">
              Book a demo <IconArrowRight size={18}/>
            </a>
          </div>
          <p className="v-hero__trust">
            <span className="v-hero__trust-dot" aria-hidden="true"></span>
            A live 360° campus tour already running for NUTECH
          </p>
        </div>

        {/* Focal proof object (desktop). Image-free placeholder; links to embed. */}
        <a href="#live-tour" className="v-hero__player" aria-label="Jump to the live client tour">
          <span className="v-hero__player-chrome">
            <span className="v-hero__player-lock">●</span>
            VIYLSA tour player · NUTECH
          </span>
          <span className="v-hero__player-stage">
            <span className="v-hero__shot" aria-hidden="true"></span>
            <span className="v-hero__player-live"><span className="v-hero__player-livedot"></span> LIVE</span>
            <span className="v-hero__player-cta">
              <span className="v-hero__player-play"><IconPlay size={18}/></span>
              Walk the campus
            </span>
            <span className="v-hero__player-hint">Tap &amp; drag to look around</span>
          </span>
        </a>
      </div>

      {/* Venue-type marquee — "built for every space", pinned to the hero bottom */}
      <div className="v-hero__marquee" aria-hidden="true">
        <div className="v-hero__marquee-track">
          {[...VENUES, ...VENUES, ...VENUES, ...VENUES].map((v, i) => (
            <span className="v-hero__marquee-item" key={i}>
              {v} <span className="v-hero__marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
export default Hero;
