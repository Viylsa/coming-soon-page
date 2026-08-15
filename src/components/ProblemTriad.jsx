function ProblemTriad() {
  const items = [
    {
      n: '01',
      h: 'Static photos lie.',
      p: 'A wide-angle lens makes a tiny room look palatial, whether it\'s a lecture hall, a hospital ward, or a wedding lawn. A tour shows the space as it really is: corner to corner, ceiling to floor.',
    },
    {
      n: '02',
      h: 'Your doors close at 6.',
      p: 'Digital demand doesn\'t. A student in Lahore, a patient\'s family abroad, a couple booking a hall: none of them should have to wait for your gate to open to look inside.',
    },
    {
      n: '03',
      h: 'You don\'t know who visited.',
      p: 'No name. No path through the building. No idea what they cared about. Every walk-in is a black box, until a tour hands you the receipt.',
    },
  ];
  const audience = ['Universities', 'Real estate', 'Hotels', 'Hospitals', 'Event halls', 'Retail'];
  return (
    <section className="v-section">
      <div className="v-wrap">
        {/* aside head — label in a left margin column, like a printed report */}
        <div className="v-section__head" data-reveal="blur">
          <h2 className="v-h2">Why a photo<br/>gallery isn't enough.</h2>
        </div>
        {/* The section argues "static photos lie" and then asks you to take
            its word for it. This shows it first: one real 360° scene from the
            NUTECH tour with the slice a single wide-angle photograph captures
            marked on it. Same room, same camera position. It sits ABOVE the
            three reasons deliberately — low in a pinned section it was being
            covered by the next band before anyone reached the caption. */}
        <figure className="v-lens" data-reveal="wipe">
          <div className="v-lens__frame">
            <img
              src="/assets/tour/nutech-lab-strip.jpg"
              alt="A 360° view of the NUTECH computer lab. A marked rectangle covers less than a fifth of it — the slice a single wide-angle photograph captures."
              width="2000" height="454" loading="lazy" decoding="async"
            />
            <div className="v-lens__crop" aria-hidden="true">
              <span className="v-lens__crop-label">One photo</span>
            </div>
          </div>
          <figcaption className="v-lens__cap">
            <span className="v-lens__cap-k">NUTECH computer lab · one camera position</span>
            Everything outside the rectangle is what a gallery leaves out, and
            what a visitor can walk through for themselves in the tour.
          </figcaption>
        </figure>
        <div className="v-truths" data-reveal-group>
          {items.map((it) => (
            <div className="v-truth" key={it.n} data-reveal>
              <span className="v-truth__n" aria-hidden="true">{it.n}</span>
              <div className="v-truth__body">
                <h3 className="v-truth__h">{it.h}</h3>
                <p className="v-truth__p">{it.p}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="v-audience" data-reveal>
          <span className="v-audience__label">Built for</span>
          <ul className="v-audience__list">
            {audience.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default ProblemTriad;
