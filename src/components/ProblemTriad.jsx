function ProblemTriad() {
  const items = [
    {
      n: '01',
      h: 'Photos show a frame. A tour shows the space.',
      p: 'A wide-angle photo can make a small room look palatial. The comparison below is an illustration of field of view, not a critique of anyone\'s gallery: a tour simply lets people see corner to corner, ceiling to floor, and judge for themselves.',
    },
    {
      n: '02',
      h: 'Open after hours.',
      p: 'A student in Lahore, a patient\'s family abroad, a couple booking a hall: they decide from their phone, long before your gate opens. A tour lets them explore whenever they like.',
    },
    {
      n: '03',
      h: 'You can\'t see what interested them.',
      p: 'Every walk-in is a black box. A tour shows you which spaces attract attention, and collects enquiries from the visitors who choose to get in touch.',
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
              alt="A 360° view of the NUTECH computer lab. A marked rectangle covers less than a fifth of it: the slice a single wide-angle photograph captures."
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
