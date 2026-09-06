import { IconCamera, IconSparkle, IconBox } from '../icons.jsx';

function HowItWorks() {
  const steps = [
    {
      n: '01',
      Icon: IconCamera,
      h: 'We capture your space',
      p: 'Our Islamabad & Rawalpindi crew shoots your venue in a single visit. No hardware to buy, nothing to ship, no closure needed. Photography time is separate from build time.',
    },
    {
      n: '02',
      Icon: IconSparkle,
      h: 'We build, you review',
      p: 'We stitch the panoramas, link the walking routes, add hotspots and (optionally) train the AI guide on your documents. You review the tour and approve it before anything goes live.',
    },
    {
      n: '03',
      Icon: IconBox,
      h: 'We publish and support',
      p: 'One line of code on your site, or a shareable link for WhatsApp & email. Delivery lands within the window in your package, and we stay on call after launch.',
    },
  ];
  return (
    <section id="how" className="v-section v-band">
      <div className="v-band__grain" aria-hidden="true"></div>
      <div className="v-band__glow" aria-hidden="true"></div>
      <div className="v-wrap">
        {/* bare head — the brand band is announcement enough; no eyebrow label */}
        <div className="v-section__head" data-reveal="blur">
          <h2 className="v-h2 v-h2--onband">Three steps.<br/>From shoot to live tour.</h2>
        </div>
        {/* Each card used to carry a big ghost numeral AND a "Step 01" label —
            the same number twice, and the third separate 01/02/03 treatment on
            the page. The Problem section keeps the big numerals; the steps keep
            the small mono label. */}
        <div className="v-rail" data-reveal-group>
          {steps.map(({ n, Icon, h, p }) => (
            <div className="v-rail__step" key={n} data-reveal="scale">
              <div className="v-rail__node"><Icon size={22}/></div>
              <div className="v-rail__n">Step {n}</div>
              <h3 className="v-rail__h">{h}</h3>
              <p className="v-rail__p">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
