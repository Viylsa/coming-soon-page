const { IconArrowRight, IconPlay } = window.VIcons;

/* Single featured showcase — VIYLSA's one real, live tour (NUTECH).
   No placeholder venues: when there's one real thing, show it big. */
function TourGallery() {
  const stats = [
    ['14', 'panoramic scenes'],
    ['28', 'interactive hotspots'],
    ['3', 'buildings linked'],
    ['EN · UR', 'AI guide languages'],
  ];
  return (
    <section id="tours" className="v-section">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <div className="v-eyebrow">Live tour</div>
            <h2 className="v-h2">Built for the things people <span className="v-serif">need to walk through.</span></h2>
          </div>
          <a href="https://razee4315.github.io/nutech-tour-threejs/" target="_blank" rel="noopener" className="v-btn v-btn--link">Open the tour ↗</a>
        </div>

        <div className="v-showcase" data-reveal>
          <a
            href="https://razee4315.github.io/nutech-tour-threejs/"
            target="_blank"
            rel="noopener"
            className="v-showcase__media"
          >
            <img src="assets/screens/tour-building.png" alt="NUTECH campus — 360° virtual tour"/>
            <span className="v-showcase__badge">360° · Live</span>
            <span className="v-showcase__play"><IconPlay size={22}/></span>
            <span className="v-showcase__hint">Click to walk the campus</span>
          </a>

          <div className="v-showcase__body">
            <div className="v-showcase__kicker">University · Islamabad</div>
            <h3 className="v-showcase__title">NUTECH Campus</h3>
            <p className="v-showcase__p">
              Our first production tour: the National University of Technology
              (NUTECH) in Islamabad. Walk from the main gate to the
              academic block and into a lecture hall — with an AI guide answering
              questions along the way.
            </p>
            <div className="v-showcase__stats">
              {stats.map(([n, l]) => (
                <div className="v-showcase__stat" key={l}>
                  <div className="v-showcase__stat-n">{n}</div>
                  <div className="v-showcase__stat-l">{l}</div>
                </div>
              ))}
            </div>
            <a href="https://razee4315.github.io/nutech-tour-threejs/" target="_blank" rel="noopener" className="v-btn v-btn--primary v-btn--lg">
              Take the tour <IconArrowRight size={18}/>
            </a>
          </div>
        </div>

        <p className="v-showcase__more">
          More tours coming soon — <a href="#contact">be one of the first venues</a>.
        </p>
      </div>
    </section>
  );
}
window.TourGallery = TourGallery;
