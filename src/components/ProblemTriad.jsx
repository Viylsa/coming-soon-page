function ProblemTriad() {
  const items = [
    {
      n: '01',
      h: 'Static photos lie.',
      p: 'A wide-angle lens makes a tiny room look palatial — be it a lecture hall, a hospital ward, or a wedding lawn. A tour shows the space as it really is: corner to corner, ceiling to floor.',
    },
    {
      n: '02',
      h: 'Your doors close at 6.',
      p: 'Digital demand doesn\'t. A student in Lahore, a patient\'s family abroad, a couple booking a hall — none of them should have to wait for your gate to open to look inside.',
    },
    {
      n: '03',
      h: 'You don\'t know who visited.',
      p: 'No name. No path through the building. No idea what they cared about. Every walk-in is a black box — until a tour hands you the receipt.',
    },
  ];
  const audience = ['Universities', 'Real estate', 'Hotels', 'Hospitals', 'Event halls', 'Retail'];
  return (
    <section className="v-section">
      <div className="v-wrap">
        <div data-reveal="blur">
          <div className="v-eyebrow">The problem</div>
          <h2 className="v-h2">Why a photo gallery <span className="v-serif">isn't enough.</span></h2>
        </div>
        <div className="v-truths">
          {items.map((it, i) => (
            <div className="v-truth" key={it.n} data-reveal data-reveal-delay={i + 1}>
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
