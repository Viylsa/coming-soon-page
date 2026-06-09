import { IconArrowRight, IconPlay, IconSparkle } from '../icons.jsx';

/* Type-led editorial hero — the brand carries it, not a client's venue.
   No photography: deep ink, soft crimson glow, film grain, big type.
   The venue-type marquee says "this is for every space"; the live client
   tour is one scroll away (#live-tour), framed there as Tour #001. */

const VENUES = ['Universities', 'Hotels', 'Hospitals', 'Event halls', 'Real estate', 'Showrooms', 'Restaurants', 'Schools'];

function Hero() {
  return (
    <header id="top" className="v-hero">
      <div className="v-hero__glow" aria-hidden="true"/>
      <div className="v-hero__grain" aria-hidden="true"/>

      <div className="v-hero__inner">
        <div className="v-hero__copy" data-reveal>
          <div className="v-eyebrow v-eyebrow--crimson">
            <IconSparkle size={14}/> 360° tours · AI guide in Urdu &amp; English · built for Pakistan
          </div>
          <h1 className="v-display">
            Bringing <em>visits</em> online.
          </h1>
          <p className="v-hero__sub">
            Any venue, walkable from any phone — with an AI guide that answers
            visitors in <b>Urdu or English</b>, 24/7, and a dashboard that tells
            you exactly who's interested.
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
          {[...VENUES, ...VENUES].map((v, i) => (
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
