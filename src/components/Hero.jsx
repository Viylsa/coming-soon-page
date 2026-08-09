import { IconArrowRight } from '../icons.jsx';
import useSpotlight from '../useSpotlight.js';

/* Type-led editorial hero — the brand carries it, centred. Deep ink, a soft
   crimson glow + film grain, big type; a small eyebrow + live trust line add
   proof, and a venue-type marquee (pinned to the hero's bottom edge so it's
   always inside the fold) says "built for every space". The live client tour is
   one scroll away at #live-tour. */

const VENUES = ['Universities', 'Hotels', 'Hospitals', 'Event halls', 'Real estate', 'Showrooms', 'Restaurants', 'Schools'];

function Hero() {
  // Cursor-following grain spotlight — see src/useSpotlight.js. Shared with the
  // About hero so the two openings stay identical.
  const spotlight = useSpotlight();

  return (
    <header id="top" className="v-hero" ref={spotlight.ref} onMouseMove={spotlight.onMouseMove}>
      <div className="v-hero__glow" aria-hidden="true"/>
      <div className="v-hero__grain" aria-hidden="true"/>
      <div className="v-hero__grain-spot" aria-hidden="true"/>

      <div className="v-hero__inner">
        <div className="v-hero__copy">
          <h1 className="v-display">
            Bringing <span className="v-display__em">visits</span> online.
          </h1>
          <p className="v-hero__sub">
            <b>VIYLSA</b> turns your venue into a 360° tour anyone can walk from
            their phone, and shows you exactly who's interested.
          </p>
          <div className="v-hero__cta">
            <a href="#contact" className="v-btn v-btn--primary v-btn--lg">
              Book a demo <IconArrowRight size={18}/>
            </a>
          </div>
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
