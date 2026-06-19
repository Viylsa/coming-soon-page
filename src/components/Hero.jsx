import { useRef } from 'react';
import { IconArrowRight, IconPlay } from '../icons.jsx';

/* Type-led editorial hero — the brand carries it, not a client's venue.
   No photography: deep ink, soft crimson glow, film grain, big type.
   The venue-type marquee says "this is for every space"; the live client
   tour is one scroll away (#live-tour), framed there as Tour #001. */

const VENUES = ['Universities', 'Hotels', 'Hospitals', 'Event halls', 'Real estate', 'Showrooms', 'Restaurants', 'Schools'];

function Hero() {
  const heroRef = useRef(null);

  // Feed cursor position to CSS as --mx/--my so the crimson grain layer's
  // radial mask can follow the pointer (see .v-hero__grain-spot).
  const handleMouseMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <header id="top" className="v-hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="v-hero__glow" aria-hidden="true"/>
      <div className="v-hero__grain" aria-hidden="true"/>
      <div className="v-hero__grain-spot" aria-hidden="true"/>

      <div className="v-hero__inner">
        <div className="v-hero__copy" data-reveal>
          <h1 className="v-display">
            Bringing <em>visits</em> online.
          </h1>
          <p className="v-hero__sub">
            <b>VIYLSA</b> turns any venue in Islamabad, Rawalpindi and across
            Pakistan into a 360° virtual tour you can walk from any phone — with
            an AI guide that answers visitors in <b>Urdu or English</b>, 24/7,
            and a dashboard that tells you exactly who's interested.
          </p>
          <div className="v-hero__cta">
            <a href="#live-tour" className="v-btn v-btn--primary v-btn--lg">
              <IconPlay size={16}/> See a live client tour
            </a>
            <a href="#contact" className="v-btn v-btn--ghost-dark v-btn--lg">
              Book a 10-minute demo <IconArrowRight size={18}/>
            </a>
          </div>
        </div>
      </div>

      {/* Venue-type marquee — "built for every space", no client imagery */}
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
