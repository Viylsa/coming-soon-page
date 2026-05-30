const { IconCamera, IconSparkle, IconBox, IconArrowRight } = window.VIcons;

function HowItWorks() {
  const steps = [
    {
      n: '01',
      Icon: IconCamera,
      h: 'We capture',
      p: 'Our team brings a 360° rig and shoots the venue in one afternoon. You don\'t need any hardware.',
    },
    {
      n: '02',
      Icon: IconSparkle,
      h: 'We train the AI',
      p: 'Feed it your floor plan, FAQ, pricing, and brochures. It answers visitors in English and Urdu, 24 / 7.',
    },
    {
      n: '03',
      Icon: IconBox,
      h: 'You embed',
      p: 'One line of code on your website — or a shareable link for WhatsApp & email campaigns. Live the same day.',
    },
  ];
  return (
    <section id="how" className="v-section v-section--haze">
      <div className="v-wrap">
        <div data-reveal>
          <div className="v-eyebrow">How it works</div>
          <h2 className="v-h2">Three steps. <span className="v-muted">Usually one afternoon.</span></h2>
        </div>
        <div className="v-steps">
          {steps.map(({ n, Icon, h, p }, i) => (
            <React.Fragment key={n}>
              <div className="v-step" data-reveal data-reveal-delay={i + 1}>
                <div className="v-step__head">
                  <span className="v-step__n">{n}</span>
                  <span className="v-step__ic"><Icon size={24}/></span>
                </div>
                <h3 className="v-step__h">{h}</h3>
                <p className="v-step__p">{p}</p>
              </div>
              {i < 2 && <div className="v-step__arrow"><IconArrowRight size={18}/></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
