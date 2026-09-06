import { IconCheck, IconArrowRight } from '../icons.jsx';

/* Packages are quoted, not priced online — never invent amounts. The "Space"
   rows are guidance about what each package is sized for, not hard limits.
   `onChoose` carries the selected package into the contact form's enquiry
   context (P2-08) — App owns the state; Contact renders it. */
function Pricing({ onChoose }) {
  const plans = [
    {
      name: 'Starter',
      blurb: 'Small retail outlets, cafés, boutiques & compact commercial spaces.',
      coverage: [
        ['Typical space', '500 – 1,000 sq ft'],
        ['Scenes', 'Up to 10 panoramas'],
        ['Hotspots', 'Up to 8 hotspots'],
        ['Delivery', '3 – 5 days'],
        ['Revisions', '1 round'],
      ],
      features: [
        'AI guide trained on your FAQ and pricing, replies in English & Urdu',
        'Professional 360° panoramic photography',
        'Custom branded loading screen',
        'Shareable link + Google Maps integration',
        '6 months hosting & maintenance',
      ],
      featured: false,
    },
    {
      name: 'Professional',
      blurb: 'Medium offices, restaurants, real-estate agencies & growing businesses.',
      coverage: [
        ['Typical space', '1,000 – 2,000 sq ft'],
        ['Scenes', 'Up to 20 panoramas'],
        ['Hotspots', 'Up to 20, video & links'],
        ['Delivery', '5 – 7 days'],
        ['Revisions', '2 rounds'],
      ],
      plus: 'Everything in Starter, plus',
      features: [
        'Smarter AI guide, trained on floor plans, brochures & lead routing',
        'Visitor analytics: visits, dwell time & most-viewed spaces',
        'Custom UI with your logo & colour theme',
        'Video embeds, links & info overlays',
        'WhatsApp & lead-form integration',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      blurb: 'Large properties, hotels, hospitals, campuses & enterprise clients.',
      coverage: [
        ['Typical space', '2,000 sq ft and up'],
        ['Scenes', 'Up to 40 panoramas'],
        ['Hotspots', 'Up to 60 rich media'],
        ['Delivery', '7 – 10 days'],
        ['Revisions', '3 rounds'],
      ],
      plus: 'Everything in Professional, plus',
      features: [
        'Fully trained AI guide with lead routing & handoff',
        'Fully custom UI/UX built to your brand',
        'VR-ready export (Meta Quest, Pico) on request',
        'Voiceover and background music on request',
        'A direct line to the founders',
      ],
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="v-section v-section--haze">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <h2 className="v-h2">Three packages,<br/>sized to your space.</h2>
            <p className="v-pricing__note">
              Quoted to your venue, with a fixed price agreed before we shoot.
              No prices online, no surprises later. The ranges below show what
              each package is sized for.
            </p>
          </div>
        </div>

        <div className="v-pricing" data-reveal-group>
          {plans.map((p) => (
            <div className={'v-plan ' + (p.featured ? 'v-plan--featured' : '')} key={p.name} data-reveal="scale">
              {/* Scope-based, not a popularity claim (P1-02). */}
              {p.featured && <span className="v-plan__tag">For growing venues</span>}
              {/* A real heading: package names introduce their own content. */}
              <h3 className="v-plan__name">{p.name}</h3>
              <div className="v-plan__blurb">{p.blurb}</div>

              <div className="v-plan__coverage">
                {p.coverage.map(([k, v]) => (
                  <div className="v-plan__cov-row" key={k}>
                    <span className="v-plan__cov-k">{k}</span>
                    <span className="v-plan__cov-v">{v}</span>
                  </div>
                ))}
              </div>

              {p.plus && <div className="v-plan__plus">{p.plus}:</div>}
              <ul className="v-plan__features">
                {p.features.map((f) => (
                  <li key={f}><IconCheck size={16}/> {f}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={'v-btn v-btn--lg ' + (p.featured ? 'v-btn--primary' : 'v-btn--ghost')}
                aria-label={`Get a quote for ${p.name}`}
                onClick={() => onChoose && onChoose(p.name)}
              >
                Get a quote <IconArrowRight size={16}/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pricing;
