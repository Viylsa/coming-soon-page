/* Live tour player — embeds the real ui_kits/tour-player as an iframe,
   so the marketing site shows VIYLSA's actual product UI (not a mock).
   Any update to the tour-player kit flows here automatically. */

function LiveTourPreview() {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <section id="live-tour" className="v-section v-section--haze">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <div className="v-eyebrow v-eyebrow--crimson">See the product</div>
            <h2 className="v-h2">This is exactly what your visitors <span className="v-serif">walk into.</span></h2>
            <p className="v-tdemo__lede">Drag, click hotspots, browse all views — the live tour player, embedded right here. No mock, no marketing video.</p>
          </div>
          <a href="https://razee4315.github.io/nutech-tour-threejs/" target="_blank" rel="noopener" className="v-btn v-btn--link">Open fullscreen ↗</a>
        </div>

        <div className="v-tdemo" data-reveal>
          <div className="v-tdemo__chrome">
            <div className="v-tdemo__dots">
              <span></span><span></span><span></span>
            </div>
            <div className="v-tdemo__url">
              <span className="v-tdemo__lock">●</span>
              razee4315.github.io/nutech-tour-threejs
            </div>
            <div className="v-tdemo__spacer"></div>
          </div>

          <div className="v-tdemo__stage">
            {!loaded && <div className="v-tdemo__loading">Loading tour…</div>}
            <iframe
              className="v-tdemo__frame"
              src="https://razee4315.github.io/nutech-tour-threejs/"
              title="VIYLSA Tour Player — NUTECH"
              loading="lazy"
              allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>

        <div className="v-tdemo__captions">
          <div className="v-tdemo__cap" data-reveal data-reveal-delay="1">
            <div className="v-tdemo__cap-num">01</div>
            <div className="v-tdemo__cap-body">
              <b>Hotspots</b> let visitors read context — opening hours, room details, contact info — without leaving the scene.
            </div>
          </div>
          <div className="v-tdemo__cap" data-reveal data-reveal-delay="2">
            <div className="v-tdemo__cap-num">02</div>
            <div className="v-tdemo__cap-body">
              <b>Walking markers</b> teleport between locations the same way you'd walk them in person.
            </div>
          </div>
          <div className="v-tdemo__cap" data-reveal data-reveal-delay="3">
            <div className="v-tdemo__cap-num">03</div>
            <div className="v-tdemo__cap-body">
              <b>All Views</b> shows every location at a glance — for visitors who want to skim, not stroll.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LiveTourPreview = LiveTourPreview;
