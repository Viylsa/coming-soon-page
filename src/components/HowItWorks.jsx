import { IconCamera, IconSparkle, IconBox } from '../icons.jsx';

function HowItWorks() {
  const steps = [
    {
      n: '01',
      Icon: IconCamera,
      h: 'We capture',
      p: 'Our Islamabad & Rawalpindi crew brings a 360° rig and shoots your venue in one afternoon. No hardware to buy, nothing to ship.',
    },
    {
      n: '02',
      Icon: IconSparkle,
      h: 'We train the AI',
      p: 'Feed it your floor plan, FAQ, pricing and brochures. It answers visitors in English and Urdu, 24/7, like your best front-desk staffer.',
    },
    {
      n: '03',
      Icon: IconBox,
      h: 'You go live',
      p: 'One line of code on your site, or a shareable link for WhatsApp & email. Live the same day, on every device.',
    },
  ];
  return (
    <section id="how" className="v-section v-band">
      <div className="v-band__grain" aria-hidden="true"></div>
      <div className="v-band__glow" aria-hidden="true"></div>
      <div className="v-wrap">
        {/* bare head — the brand band is announcement enough; no eyebrow label */}
        <div className="v-section__head" data-reveal="blur">
          <h2 className="v-h2 v-h2--onband">Three steps.<br/>Usually one afternoon.</h2>
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
