import { useRef } from 'react';
import { IconArrowRight, IconPlay } from '../icons.jsx';

/* Type-led editorial hero — the brand carries it, centred. Deep ink, a soft
   crimson glow + film grain, big type; a small eyebrow + live trust line add
   proof, and a venue-type marquee (pinned to the hero's bottom edge so it's
   always inside the fold) says "built for every space". The live client tour is
   one scroll away at #live-tour. */

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
