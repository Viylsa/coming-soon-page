const { IconCheck, IconArrowRight } = window.VIcons;

function Pricing() {
  const plans = [
    {
      name: 'Starter',
      blurb: 'Small retail outlets, cafés, boutiques & compact commercial spaces.',
      coverage: [
        ['Space', '500 – 1,000 sq ft'],
        ['Scenes', 'Up to 10 panoramas'],
        ['Hotspots', 'Up to 8 basic'],
      ],
      features: [
        'Professional 360° panoramic photography',
        'Standard UI with clean navigation',
        'Custom branded loading screen',
        'Background music integration',
        'Fully responsive — mobile, tablet & desktop',
        'Shareable link + Google Maps integration',
        '6 months hosting & maintenance',
        '1 round of revision · 5-day delivery',
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
        ['Hotspots', 'Advanced — video & links'],
      ],
      plus: 'Everything in Starter, plus',
      features: [
        'Custom UI with your logo & colour theme',
        'Colour grading & mini-map navigation',
        'Video embeds, links & info overlays',
        'Basic analytics — visits & time spent',
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
        ['Hotspots', 'Unlimited rich media'],
      ],
      plus: 'Everything in Professional, plus',
      features: [
        'Fully custom UI/UX built to your brand',
        'Voiceover + background music',
        'VR mode (Oculus, Pico & compatible)',
        'Lead capture form & contact integration',
        'Analytics — visitor count & dwell time',
        'Priority support',
      ],
      featured: false,
      cta: 'Talk to sales',
    },
  ];

  const table = {
    rows: [
      ['Space coverage', '500–1,000 sq ft', '1,000–2,000 sq ft', '2,000–4,000 sq ft'],
      ['360° scenes', 'Up to 10', 'Up to 20', 'Up to 40'],
      ['Interactive hotspots', 'Basic', 'Advanced', 'Unlimited rich media'],
      ['UI customization', 'Standard', 'Logo & colour theme', 'Fully custom UI/UX'],
      ['Background music', true, true, 'Voiceover + music'],
      ['Colour grading & mini-map', false, true, true],
      ['VR mode (Oculus, Pico)', false, false, true],
      ['Analytics (visits, time)', false, true, true],
      ['Social sharing', false, true, true],
      ['Lead capture / contact form', false, false, true],
      ['Hosting & maintenance', '6 months', '6 months', '6 months'],
      ['Revisions', '1 round', '1 round', '1 round'],
      ['Delivery time', '5 days', '5 days', '5 days'],
    ],
  };

  const Cell = ({ v }) => {
    if (v === true) return <span className="v-cmp__yes"><IconCheck size={15}/></span>;
    if (v === false) return <span className="v-cmp__no">—</span>;
    return <span className="v-cmp__txt">{v}</span>;
  };

  return (
    <section id="pricing" className="v-section v-section--haze">
      <div className="v-wrap">
        <div className="v-section__head" data-reveal>
          <div>
            <div className="v-eyebrow">Packages</div>
            <h2 className="v-h2">Three ways to bring your space <span className="v-serif">online.</span></h2>
          </div>
          <div className="v-pricing__note">All packages are fully customizable to your space &amp; needs.</div>
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

        <div className="v-cmp" data-reveal>
          <div className="v-cmp__title">Compare at a glance</div>
          <div className="v-cmp__scroll">
            <table className="v-cmp__table">
              <thead>
                <tr>
                  <th></th>
                  <th>Starter</th>
                  <th className="v-cmp__th-feat">Professional</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r) => (
                  <tr key={r[0]}>
                    <td className="v-cmp__feature">{r[0]}</td>
                    <td><Cell v={r[1]}/></td>
                    <td className="v-cmp__td-feat"><Cell v={r[2]}/></td>
                    <td><Cell v={r[3]}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Pricing = Pricing;
