import { IconCheck, IconArrowRight } from '../icons.jsx';

function Pricing() {
  const plans = [
    {
      name: 'Starter',
      blurb: 'Small retail outlets, cafés, boutiques & compact commercial spaces.',
      coverage: [
        ['Space', '500 – 1,000 sq ft'],
        ['Scenes', 'Up to 10 panoramas'],
        ['Hotspots', 'Up to 8 hotspots'],
        ['Delivery', '3 – 5 days'],
        ['Revisions', '1 round'],
      ],
      features: [
        'AI guide trained on your FAQ & pricing — replies in English & Urdu',
        'Professional 360° panoramic photography',
        'Standard UI with clean navigation',
        'Custom branded loading screen',
        'Fully responsive — mobile, tablet & desktop',
        'Shareable link + Google Maps integration',
        'VR-ready (Meta Quest, Pico) — on request',
        '6 months hosting & maintenance',
      ],
      featured: false,
      cta: 'Get a quote',
    },
    {
      name: 'Professional',
      blurb: 'Medium offices, restaurants, real-estate agencies & growing businesses.',
      coverage: [
        ['Space', '1,000 – 2,000 sq ft'],
        ['Scenes', 'Up to 20 panoramas'],
        ['Hotspots', 'Up to 20 — video & links'],
        ['Delivery', '5 – 7 days'],
        ['Revisions', '2 rounds'],
      ],
      plus: 'Everything in Starter, plus',
      features: [
        'Smarter AI guide — trained on floor plans, brochures & lead routing',
        'Visitor analytics — visits, dwell time & most-viewed spaces',
        'Custom UI with your logo & colour theme',
        'Colour grading & mini-map navigation',
        'Video embeds, links & info overlays',
        'WhatsApp & lead-form integration',
        'Social sharing enabled',
      ],
      featured: true,
      cta: 'Get a quote',
    },
    {
      name: 'Enterprise',
      blurb: 'Large properties, hotels, hospitals, campuses & enterprise clients.',
      coverage: [
        ['Space', '2,000 – 4,000 sq ft+'],
        ['Scenes', 'Up to 40 panoramas'],
        ['Hotspots', 'Up to 60 rich media'],
        ['Delivery', '7 – 10 days'],
        ['Revisions', '3 rounds'],
      ],
      plus: 'Everything in Professional, plus',
      features: [
        'Fully trained AI guide with lead routing & handoff',
        'Analytics — visitor counts, dwell time & most-viewed spaces',
        'Lead capture form & contact integration',
        'Fully custom UI/UX built to your brand',
        'VR mode (Meta Quest, Pico & compatible)',
        'Voiceover + background music',
        'Priority support',
      ],
      featured: false,
      cta: 'Talk to sales',
    },
  ];

  return (
    <section id="pricing" className="v-section v-section--haze">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <div className="v-eyebrow">Packages</div>
            <h2 className="v-h2">Three ways to bring your space <span className="v-serif">online.</span></h2>
          </div>
          <div className="v-pricing__note">All packages are fully customisable to your space &amp; needs.</div>
        </div>

        <div className="v-pricing">
          {plans.map((p, i) => (
            <div className={'v-plan ' + (p.featured ? 'v-plan--featured' : '')} key={p.name} data-reveal data-reveal-delay={i + 1}>
              {p.featured && <span className="v-plan__tag">Most popular</span>}
              <div className="v-plan__name">{p.name}</div>
              <div className="v-plan__blurb">{p.blurb}</div>

              <div className="v-plan__coverage">
                {p.coverage.map(([k, v]) => (
                  <div className="v-plan__cov-row" key={k}>
                    <span className="v-plan__cov-k">{k}</span>
                    <span className="v-plan__cov-v">{v}</span>
                  </div>
                ))}
              </div>

              <div className="v-plan__price">
                <div className="v-plan__num">Call for price</div>
                <div className="v-plan__onboard">Custom quote · no fixed tiers</div>
              </div>

              {p.plus && <div className="v-plan__plus">{p.plus}:</div>}
              <ul className="v-plan__features">
                {p.features.map((f) => (
                  <li key={f}><IconCheck size={16}/> {f}</li>
                ))}
              </ul>
              <a href="#contact" className={'v-btn v-btn--lg ' + (p.featured ? 'v-btn--primary' : 'v-btn--ghost')}>
                {p.cta} <IconArrowRight size={16}/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pricing;
