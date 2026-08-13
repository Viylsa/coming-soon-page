import { IconArrowRight } from '../icons.jsx';
import useSpotlight from '../useSpotlight.js';

/* Type-led editorial hero — the brand carries it, centred. Deep ink, a soft
   crimson glow + film grain, big type, and pinned to the bottom edge (so it is
   always inside the fold) a real 360° frame from the live client tour.

   That slot used to hold a marquee of venue types — HOTELS · HOSPITALS · EVENT
   HALLS scrolling past. It borrowed the visual grammar of a client logo bar
   without any clients in it, and it meant a company selling 360° tours showed
   nothing of one above the fold. The panorama is the same asset the embedded
   player loads two sections down, so the first screen is now evidence. */

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

      {/* The strip is one full equirectangular width of the tour's library
          scene, so advancing it by exactly one copy wraps with no seam: this is
          a real rotation through the room, not a photo sliding sideways. */}
      <a className="v-hero__pano" href="#live-tour" aria-label="See the live NUTECH campus tour">
        <span className="v-hero__pano-track" aria-hidden="true">
          {/* lowercase: this React version does not recognise the camelCase
              fetchPriority prop and drops it with a console warning */}
          <img src="/assets/tour/nutech-library-band.jpg" alt="" width="2800" height="717" fetchpriority="high"/>
          <img src="/assets/tour/nutech-library-band.jpg" alt="" width="2800" height="717"/>
        </span>
        <span className="v-hero__pano-chip">
          <span className="v-hero__pano-dot" aria-hidden="true"></span>
          Live now · NUTECH campus library
        </span>
      </a>
    </header>
  );
}
export default Hero;
