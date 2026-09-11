import React from 'react';
import { IconArrowRight, IconPlay } from '../icons.jsx';

/* Live tour player — embeds VIYLSA's actual hosted tour as an iframe, so the
   marketing site shows the real product UI, not a mock.

   Lifecycle (P1-04): the third-party tour costs WebGL + network the moment it
   loads, so the iframe is created only after the visitor asks for it. States
   are modelled explicitly — idle → loading → (ready | slow → ready | error) —
   and every terminal state keeps an escape hatch:
     - 'slow' shows a non-blocking notice but keeps a healthy load alive;
     - 'error' (timeout) offers retry with a fresh iframe + fresh timer;
     - 'Open in a new tab' is available in every state, for when embedded
       interaction itself is inaccessible.
   A cross-origin iframe's `load` event proves the document arrived, not that
   the application is usable, so it is treated as document-load evidence only.
   The tour stats and the founding-venues offer live here too: one section,
   one story. */

const TOUR_URL = 'https://razee4315.github.io/NEIC-Tour/lab/';
const SLOW_MS = 8000;   // show the "still loading" notice
const FAIL_MS = 14000;  // give up and offer retry

function LiveTourPreview() {
  // idle -> loading -> ready | slow -> ready | error
  const [state, setState] = React.useState('idle');
  const [attempt, setAttempt] = React.useState(0);
  const timers = React.useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const activate = () => {
    clearTimers();
    setAttempt((a) => a + 1);
    setState('loading');
    // `slow` keeps the in-progress load alive; `error` replaces it with retry.
    timers.current.push(setTimeout(() => setState((s) => (s === 'loading' ? 'slow' : s)), SLOW_MS));
    timers.current.push(setTimeout(() => setState((s) => (s === 'loading' || s === 'slow' ? 'error' : s)), FAIL_MS));
  };

  const retry = () => {
    // Unmount and remount the iframe (new key) for a genuinely fresh attempt.
    setState('idle');
    setTimeout(activate, 0);
  };

  React.useEffect(() => clearTimers, []);

  const frameVisible = state === 'loading' || state === 'slow' || state === 'ready';

  // 'EN · UR' used to sit here as a fourth stat — the AI guide's own language
  // toggle says the same thing two sections down, and it was the only stat that
  // wasn't a count of something in this tour.
  const stats = [
    ['10', 'panoramic scenes'],
    ['15', 'interactive hotspots'],
    ['20', 'walking markers'],
  ];

  return (
    <section id="live-tour" className="v-section v-section--haze">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <h2 className="v-h2">This is exactly what<br/>your visitors <span className="v-serif">walk into.</span></h2>
            <p className="v-tdemo__lede">
              The NEIC tour, the NUTECH Entrepreneur &amp; Incubation Centre
              in Islamabad, live in the same player your visitors would use.
              Drag, click hotspots and browse every view. No mock, no marketing
              video.
            </p>
          </div>
          <a href={TOUR_URL} target="_blank" rel="noopener" className="v-btn v-btn--link">Open tour in a new tab ↗</a>
        </div>

        <div className="v-tdemo" data-reveal="wipe">
          <div className="v-tdemo__chrome">
            <div className="v-tdemo__url">
              <span className="v-tdemo__lock">●</span>
              VIYLSA tour player · NEIC
            </div>
            <div className="v-tdemo__spacer"></div>
          </div>

          <div className="v-tdemo__stage">
            {frameVisible && (
              <iframe
                key={attempt}
                className="v-tdemo__frame"
                src={TOUR_URL}
                title="VIYLSA Tour Player, live NEIC tour"
                sandbox="allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                allowFullScreen
                onLoad={() => setState((s) => (s === 'loading' || s === 'slow' ? 'ready' : s))}
              />
            )}
            {/* Poster behind/before the iframe — also the no-JS view. */}
            {state === 'idle' && (
              <div className="v-tdemo__poster">
                <img
                  src="/assets/tour/neic-entrance.jpg"
                  alt=""
                  width="1200" height="630" loading="lazy" decoding="async"
                />
                <div className="v-tdemo__poster-ui">
                  <button type="button" className="v-tdemo__play" onClick={activate}>
                    <span className="v-tdemo__play-ic"><IconPlay size={22}/></span>
                    Explore the live tour
                  </button>
                  <p className="v-tdemo__poster-hint">Loads the interactive tour · drag and tap to look around</p>
                </div>
              </div>
            )}
            {(state === 'loading' || state === 'slow') && (
              <div className="v-tdemo__loading" role="status">
                <span className="v-tdemo__loading-shimmer" aria-hidden="true"></span>
                {state === 'slow'
                  ? <span>Still loading. You can keep waiting or open it in a new tab.</span>
                  : <span>Loading the live tour…</span>}
                {state === 'slow' && (
                  <a href={TOUR_URL} target="_blank" rel="noopener" className="v-btn v-btn--sm v-btn--ghost-dark">Open in a new tab ↗</a>
                )}
              </div>
            )}
            {state === 'error' && (
              <div className="v-tdemo__fallback">
                <span className="v-tdemo__shot" aria-hidden="true"></span>
                <p>The live tour couldn't load here. You can try again, or open it directly. The tour itself is unchanged.</p>
                <div className="v-tdemo__fallback-row">
                  <button type="button" className="v-btn v-btn--primary" onClick={retry}>Retry loading</button>
                  <a href={TOUR_URL} target="_blank" rel="noopener" className="v-btn v-btn--ghost-dark">Open in a new tab ↗</a>
                </div>
              </div>
            )}
            {state === 'ready' && (
              <div className="v-tdemo__hint" aria-hidden="true">
                <svg className="v-tdemo__hint-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="M4 12h16"/></svg> Tap &amp; drag to look around
              </div>
            )}
          </div>
        </div>

        <div className="v-tdemo__stats" data-reveal>
          {stats.map(([n, l]) => (
            <div className="v-tdemo__stat" key={l}>
              <div className="v-tdemo__stat-n">
                {/^\d+$/.test(n)
                  ? <><b data-count={n} aria-hidden="true">{n}</b><span className="v-sr-only">{n}</span></>
                  : n}
              </div>
              <div className="v-tdemo__stat-l">{l}</div>
            </div>
          ))}
        </div>

        {/* These three used to be numbered 01/02/03 — the page's third separate
            numeral system, and misleading here: they are parallel features of
            the player, not an ordered sequence. */}
        <div className="v-tdemo__captions" data-reveal-group>
          <div className="v-tdemo__cap" data-reveal>
            <div className="v-tdemo__cap-body">
              <b>Hotspots</b> let visitors read context like opening hours, room details and contact info, without leaving the scene.
            </div>
          </div>
          <div className="v-tdemo__cap" data-reveal>
            <div className="v-tdemo__cap-body">
              <b>Walking markers</b> teleport between locations the same way you'd walk them in person.
            </div>
          </div>
          <div className="v-tdemo__cap" data-reveal>
            <div className="v-tdemo__cap-body">
              <b>All Views</b> shows every location at a glance, for visitors who want to skim, not stroll.
            </div>
          </div>
        </div>

        <div id="founding" className="v-founding" data-reveal="scale">
          <div className="v-founding__body">
            <h3 className="v-founding__h">Become a founding venue.</h3>
            <p className="v-founding__p">
              We're taking on a small group of founding venues this year: early
              pricing agreed before we shoot, priority shooting dates, and a tour
              built hand-in-hand with the founders who stay on call after launch.
            </p>
          </div>
          <a href="#contact" className="v-btn v-btn--primary v-btn--lg">
            Ask about founding venues <IconArrowRight size={18}/>
          </a>
        </div>
      </div>
    </section>
  );
}

export default LiveTourPreview;
