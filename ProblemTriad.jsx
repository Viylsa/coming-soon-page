function ProblemTriad() {
  const items = [
    {
      kicker: '01',
      h: 'Static photos lie.',
      p: 'A wide-angle lens makes a 12-sq-m room look palatial. Tours show the room as it is — corner to corner, ceiling to floor.',
    },
    {
      kicker: '02',
      h: 'Physical venues close at 6.',
      p: 'Digital demand is 24 / 7. A buyer in Dubai shouldn\'t have to wait for office hours to see a flat in Islamabad.',
    },
    {
      kicker: '03',
      h: 'You don\'t know who visited.',
      p: 'No name. No path through the building. No idea what they cared about. Every walk-in is a black box. Tours give you the receipt.',
    },
  ];
  return (
    <section className="v-section">
      <div className="v-wrap">
        <div data-reveal>
          <div className="v-eyebrow">The problem</div>
          <h2 className="v-h2">
            Static photos lie. <span className="v-serif">Tours don't.</span>
          </h2>
        </div>
        <div className="v-triad">
          {items.map((it, i) => (
            <div className="v-triad__item" key={it.kicker} data-reveal data-reveal-delay={i + 1}>
              <div className="v-triad__kicker">{it.kicker}</div>
              <h3 className="v-triad__h">{it.h}</h3>
              <p className="v-triad__p">{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProblemTriad = ProblemTriad;
