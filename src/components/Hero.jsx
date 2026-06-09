import React from 'react';
import { IconArrowRight, IconPlay, IconSparkle } from '../icons.jsx';

/* Walk-in hero — the hero IS the product. A full-bleed campus panorama
   drifts slowly behind the copy; "Step inside" swaps it for the real,
   walkable tour right here (iframe loads only on click, so first paint
   stays light). */

const TOUR_URL = 'https://razee4315.github.io/nutech-tour-threejs/';

function Hero() {
  const [walking, setWalking] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const exit = () => { setWalking(false); setLoaded(false); };

  return (
    <header id="top" className={'v-hero' + (walking ? ' v-hero--walking' : '')}>
      <div className="v-hero__pano" aria-hidden="true"/>
      <div className="v-hero__shade" aria-hidden="true"/>
      <div className="v-hero__grain" aria-hidden="true"/>

      <div className="v-hero__inner">
        <div className="v-hero__copy" data-reveal="left">
          <div className="v-eyebrow v-eyebrow--crimson">
            <IconSparkle size={14}/> 360° tours with a built-in AI guide — built for Pakistan
          </div>
          <h1 className="v-display">
            Bringing <em>visits</em> <br/>online.
          </h1>
          <p className="v-hero__sub">
            A 360° tour anyone can walk from their phone — with an AI guide that
            answers visitors in <b>Urdu or English</b>, 24/7, and a dashboard that
            tells you exactly who's interested.
          </p>
          <div className="v-hero__cta">
            <button type="button" className="v-btn v-btn--primary v-btn--lg" onClick={() => setWalking(true)}>
              <IconPlay size={16}/> Step inside the live tour
            </button>
            <a href="#contact" className="v-btn v-btn--ghost-dark v-btn--lg">
              Book a 10-minute demo <IconArrowRight size={18}/>
            </a>
          </div>
          <div className="v-hero__strip">
            <span>You're looking at a <b>real tour</b> — a university campus in Islamabad</span>
            <span className="v-hero__dot">·</span>
            <span>AI guide in <b>English &amp; Urdu</b></span>
          </div>
        </div>
      </div>

      {walking && (
        <div className="v-hero__tour">
          {!loaded && <div className="v-hero__tour-loading">Loading the live tour…</div>}
          <iframe
            className="v-hero__tour-frame"
            src={TOUR_URL}
            title="VIYLSA live campus tour"
            allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
          <div className="v-hero__tour-bar">
            <span className="v-hero__tour-label">
              <span className="v-hero__tour-dot"/> Live tour · University campus, Islamabad
            </span>
            <div className="v-hero__tour-actions">
              <a href={TOUR_URL} target="_blank" rel="noopener">Fullscreen ↗</a>
              <button type="button" onClick={exit}>✕ Exit tour</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Hero;
