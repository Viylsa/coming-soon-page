import React from 'react';
import { IconArrowRight, IconPlay } from '../icons.jsx';

/* Live tour player — embeds VIYLSA's actual hosted tour as an iframe, so the
   marketing site shows the real product UI, not a mock. On touch devices it
   starts as a tap-to-load facade: this both defers the heavy WebGL until the
   visitor opts in (LCP/INP) and prevents the "drag pans the tour instead of
   scrolling the page" trap. On desktop the embed auto-loads. An error/timeout
   fallback keeps the most credibility-critical element from breaking silently. */

const TOUR_URL = 'https://razee4315.github.io/nutech-tour-threejs/';

function LiveTourPreview() {
  const coarse = React.useRef(typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);
  const [armed, setArmed] = React.useState(!coarse.current); // desktop auto-loads
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // Safety net: if the embed never loads (GH Pages down, offline), surface a
  // fallback with a direct link instead of an empty box.
  React.useEffect(() => {
    if (!armed || ready) return;
    const t = setTimeout(() => setFailed((f) => (ready ? f : true)), 10000);
    return () => clearTimeout(t);
  }, [armed, ready]);

  const stats = [
    ['14', 'panoramic scenes'],
    ['28', 'interactive hotspots'],
    ['3', 'buildings linked'],
    ['EN · UR', 'AI guide languages'],
  ];

  return (
    <section id="live-tour" className="v-section v-section--dark">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <div className="v-eyebrow v-eyebrow--crimson">Live client tour</div>
            <h2 className="v-h2">This is exactly what your visitors <span className="v-serif">walk into.</span></h2>
            <p className="v-tdemo__lede">
              Built for NUTECH, a university campus in Islamabad. Drag, click
              hotspots and browse every view: this is the live tour player,
              embedded right here. No mock, no marketing video.
            </p>
          </div>
          <a href={TOUR_URL} target="_blank" rel="noopener" className="v-btn v-btn--link">Open fullscreen ↗</a>
        </div>

        <div className="v-tdemo" data-reveal="wipe">
          <div className="v-tdemo__chrome">
            <div className="v-tdemo__url">
              <span className="v-tdemo__lock">●</span>
              VIYLSA tour player · NUTECH
            </div>
            <div className="v-tdemo__spacer"></div>
          </div>

          <div className="v-tdemo__stage">
            {!armed && (
              <button type="button" className="v-tdemo__facade" onClick={() => setArmed(true)} aria-label="Load the live NUTECH tour">
                <span className="v-tdemo__shot" aria-hidden="true"></span>
                <span className="v-tdemo__facade-cta">
                  <span className="v-tdemo__facade-play"><IconPlay size={20}/></span>
                  Walk the NUTECH campus
                </span>
                <span className="v-tdemo__facade-note">Tap to load the live 360° tour</span>
              </button>
            )}

            {armed && !failed && (
              <>
                {!ready && <div className="v-tdemo__loading"><span className="v-tdemo__loading-shimmer"></span>Loading the live tour…</div>}
                <iframe
                  className="v-tdemo__frame"
                  src={TOUR_URL}
                  title="VIYLSA Tour Player — live NUTECH campus tour"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-fullscreen allow-pointer-lock"
                  allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                  allowFullScreen
                  onLoad={() => setReady(true)}
                  onError={() => setFailed(true)}
                />
                {ready && (
                  <div className="v-tdemo__hint">
                    <svg className="v-tdemo__hint-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="M4 12h16"/></svg> Tap &amp; drag to look around
                  </div>
                )}
              </>
            )}

            {failed && (
              <div className="v-tdemo__fallback">
                <span className="v-tdemo__shot" aria-hidden="true"></span>
                <p>The live tour is taking a moment to load.</p>
                <a href={TOUR_URL} target="_blank" rel="noopener" className="v-btn v-btn--primary">Open the live tour ↗</a>
              </div>
            )}
          </div>
        </div>

        <div className="v-tdemo__stats" data-reveal>
          {stats.map(([n, l]) => (
            <div className="v-tdemo__stat" key={l}>
              <div className="v-tdemo__stat-n">
                {/^\d+$/.test(n) ? <b data-count={n}>{n}</b> : n}
              </div>
              <div className="v-tdemo__stat-l">{l}</div>
            </div>
          ))}
        </div>

        <div className="v-tdemo__captions" data-reveal-group>
          <div className="v-tdemo__cap" data-reveal>
            <div className="v-tdemo__cap-num">01</div>
            <div className="v-tdemo__cap-body">
              <b>Hotspots</b> let visitors read context like opening hours, room details and contact info, without leaving the scene.
            </div>
          </div>
          <div className="v-tdemo__cap" data-reveal>
            <div className="v-tdemo__cap-num">02</div>
            <div className="v-tdemo__cap-body">
              <b>Walking markers</b> teleport between locations the same way you'd walk them in person.
            </div>
          </div>
          <div className="v-tdemo__cap" data-reveal>
            <div className="v-tdemo__cap-num">03</div>
            <div className="v-tdemo__cap-body">
              <b>All Views</b> shows every location at a glance, for visitors who want to skim, not stroll.
            </div>
          </div>
        </div>

        <div id="founding" className="v-founding" data-reveal="scale">
          <div className="v-founding__body">
            <div className="v-eyebrow v-eyebrow--crimson">Founding venues · 2026</div>
            <h3 className="v-founding__h">Become a founding venue.</h3>
            <p className="v-founding__p">
              We're taking on a small group of founding venues this year: locked-in
              early pricing, priority shooting dates, and a tour built hand-in-hand
              with the founders who stay on call after launch.
            </p>
          </div>
          <a href="#contact" className="v-btn v-btn--primary v-btn--lg">
            Claim a founding slot <IconArrowRight size={18}/>
          </a>
        </div>
      </div>
    </section>
  );
}

export default LiveTourPreview;
