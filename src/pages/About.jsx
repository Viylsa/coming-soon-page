import Nav from '../components/Nav.jsx';
import FooterCTA from '../components/FooterCTA.jsx';
import { IconArrowRight, IconLinkedIn, IconWhatsApp, IconMail } from '../icons.jsx';

/* ---------------------------------------------------------------------------
   EDIT THIS BLOCK — everything the founders have to supply lives here.

   Nothing below invents biography. Roles, the story beats and the numbers are
   all things the site already states or the live NUTECH tour already proves.
   The three fields that are intentionally blank (photo, linkedin, github) are
   the ones only you can fill; each renders gracefully while empty:

     photo    ''  -> the monogram avatar renders instead (looks deliberate)
     linkedin ''  -> that link is simply not rendered
     github   ''  -> same

   Drop portraits in public/assets/team/ and set `photo` to e.g.
   '/assets/team/aleena.jpg'. Shoot all three the same way — same wall, same
   light, same crop, 4:5 portrait, 1200×1500 or better.
--------------------------------------------------------------------------- */
const FOUNDERS = [
  {
    name: 'Aleena Tahir',
    role: 'Co-Founder & CEO',
    initial: 'AT',
    photo: '',
    linkedin: '',
    github: '',
    bio: 'Runs the client side of VIYLSA end to end — the first call, the walkthrough of your venue, the scope and the fixed quote that follows it. She is on the shoot, and she is who you reach after launch.',
  },
  {
    name: 'Saqlain Abbas',
    role: 'Co-Founder & CTO',
    initial: 'SA',
    photo: '',
    linkedin: '',
    github: 'https://github.com/Razee4315',
    bio: 'Builds the tour player, the bilingual AI guide and the analytics behind them. Everything that happens after the camera is packed away — stitching, hotspots, training the guide on your documents, the dashboard — is his.',
  },
  {
    name: 'Aena Habib',
    role: 'Co-Founder & CMO',
    initial: 'AH',
    photo: '',
    linkedin: '',
    github: '',
    bio: 'Shapes how a tour is presented once it goes live — the loading screen, the brand fit, the story a venue tells its visitors, and how it reaches them on WhatsApp, search and social.',
  },
];

/* The MoU / partnership proof block.
   The section does not render at all until `image` is set — a page with a
   visible empty frame reads as unfinished, and an absent section reads as a
   deliberate edit. Drop the photo in public/assets/ and set the path.

   BEFORE naming a partner here: get written permission from them to publish
   their name, logo or a photo of the signing. Verbal agreement at the table is
   not enough. Without it, leave `partner` empty — the caption still works. */
const MOU = {
  image: '',                     // e.g. '/assets/mou-signing.jpg'
  alt: 'VIYLSA founders signing a memorandum of understanding',
  partner: '',                   // e.g. 'NUTECH' — only with written permission
  date: '',                      // e.g. 'March 2026'
};

const PRINCIPLES = [
  {
    n: '01',
    h: 'The people who sell it, shoot it.',
    p: 'There is no account layer between you and the work. The person who scopes your venue is holding the camera on the day and answering your message six months later.',
  },
  {
    n: '02',
    h: 'A fixed price before we shoot.',
    p: 'Every venue is different, so every tour is quoted to the space. You get that number after one call and before anyone turns up — not as a surprise at the end.',
  },
  {
    n: '03',
    h: 'Proof over promises.',
    p: 'A real client tour is embedded on our homepage, not a marketing video of one. You can drag it, open the hotspots and judge the product before you talk to us.',
  },
];

const FACTS = [
  ['Based in', 'Islamabad & Rawalpindi, Pakistan'],
  ['Coverage', 'Venues across Pakistan'],
  ['AI guide', 'Answers in English & Urdu'],
  ['Typical shoot', 'A single afternoon, around your hours'],
  ['Delivery', 'Live in 3–10 days, by package'],
  ['Response', 'Within one business day'],
];

function FounderCard({ f }) {
  const hasLinks = f.linkedin || f.github;
  return (
    <article className="va-founder" data-reveal="scale">
      <div className="va-founder__portrait">
        {f.photo ? (
          <img src={f.photo} alt={f.name} width="600" height="750" loading="lazy" />
        ) : (
          <span className="va-founder__monogram" aria-hidden="true">{f.initial}</span>
        )}
      </div>
      <div className="va-founder__name">{f.name}</div>
      <div className="va-founder__role">{f.role}</div>
      <p className="va-founder__bio">{f.bio}</p>
      {hasLinks && (
        <div className="va-founder__links">
          {f.linkedin && (
            <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
               aria-label={f.name + ' on LinkedIn'}>
              <IconLinkedIn size={16}/> LinkedIn
            </a>
          )}
          {f.github && (
            <a href={f.github} target="_blank" rel="noopener noreferrer"
               aria-label={f.name + ' on GitHub'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.8c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>
              </svg> GitHub
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function About() {
  return (
    <>
      <a className="v-skip" href="#main">Skip to content</a>
      <Nav base="/"/>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <header className="va-hero">
          <div className="va-hero__glow" aria-hidden="true"></div>
          <div className="v-wrap va-hero__inner">
            <div className="v-eyebrow v-eyebrow--onband">About VIYLSA</div>
            <h1 className="va-hero__h">
              Three founders in Islamabad,<br/>
              bringing venues <span className="v-serif v-serif--onband">online.</span>
            </h1>
            <p className="va-hero__lede">
              VIYLSA turns universities, hotels, hospitals, real estate and showrooms
              into 360° virtual tours — each one with a built-in AI guide that answers
              visitors in English and Urdu, captures enquiries, and shows you exactly
              who came and what they cared about.
            </p>
            <div className="va-hero__meta">
              <div><span className="va-hero__k">Based in</span> Islamabad &amp; Rawalpindi</div>
              <div><span className="va-hero__k">Founded by</span> Three co-founders</div>
              <div><span className="va-hero__k">Live product</span> A real client tour, embedded</div>
            </div>
          </div>
        </header>

        {/* ---------- Story ---------- */}
        <section className="v-section">
          <div className="v-wrap">
            <div className="v-section__head" data-reveal="blur">
              <div>
                <div className="v-eyebrow">The story</div>
                <h2 className="v-h2">How VIYLSA <span className="v-serif">started.</span></h2>
              </div>
            </div>

            <div className="va-story" data-reveal-group>
              <article className="va-chapter" data-reveal>
                <span className="va-chapter__n" aria-hidden="true">01</span>
                <div className="va-chapter__body">
                  <h3 className="va-chapter__h">We kept noticing the same blind spot.</h3>
                  <p>
                    A walk-in is a black box. Someone visits your campus, your hotel, your
                    showroom — they look around, they leave, and you never learn their name,
                    the path they took, or the question they were about to ask. Meanwhile
                    almost everyone now decides whether a place is worth visiting from their
                    phone, hours or weeks before they turn up at the gate.
                  </p>
                  <p>
                    The tools most venues had for that first impression were a photo gallery
                    and a phone number that only works between nine and six. A wide-angle
                    lens makes a small room look palatial; a closed office makes an
                    interested visitor go somewhere else.
                  </p>
                </div>
              </article>

              <article className="va-chapter" data-reveal>
                <span className="va-chapter__n" aria-hidden="true">02</span>
                <div className="va-chapter__body">
                  <h3 className="va-chapter__h">So we built the first one, properly.</h3>
                  <p>
                    Our first full build was a university campus in Islamabad: fourteen
                    panoramic scenes, twenty-eight interactive hotspots, three buildings
                    linked so you can walk between them the way you would in person — with
                    an AI guide trained on the campus's own material, answering in English
                    and Urdu.
                  </p>
                  <p>
                    It is still live, and it is embedded on our homepage rather than filmed
                    for a showreel. That was deliberate. A new company asking a venue to
                    trust it with its front door should be able to hand over the real thing
                    and let it be judged.
                  </p>
                  <p className="va-chapter__link">
                    <a href="/#live-tour" className="v-btn v-btn--link">
                      See the live tour on the homepage <IconArrowRight size={15}/>
                    </a>
                  </p>
                </div>
              </article>

              <article className="va-chapter" data-reveal>
                <span className="va-chapter__n" aria-hidden="true">03</span>
                <div className="va-chapter__body">
                  <h3 className="va-chapter__h">Now we're doing it for a first group of venues.</h3>
                  <p>
                    VIYLSA is taking on a small number of founding venues: locked-in early
                    pricing, priority shooting dates, and a tour built hand-in-hand with the
                    founders who stay on call after launch. Small enough that every venue
                    gets all three of us; deliberately so.
                  </p>
                  <p>
                    The name is the whole promise. Bringing visits online — making the first
                    visit to a place something that can happen from a phone in Lahore or a
                    laptop abroad, and still be walkable, answerable and measurable.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Proof / MoU — renders only once a photo exists ---------- */}
        {MOU.image && (
          <section className="v-section v-section--haze">
            <div className="v-wrap">
              <div className="v-section__head" data-reveal="blur">
                <div>
                  <div className="v-eyebrow v-eyebrow--crimson">Partnerships</div>
                  <h2 className="v-h2">Signed, and on <span className="v-serif">the record.</span></h2>
                </div>
              </div>
              <figure className="va-figure" data-reveal="wipe">
                <div className="va-figure__frame">
                  <img src={MOU.image} alt={MOU.alt} loading="lazy"/>
                </div>
                <figcaption className="va-figure__cap">
                  <span className="va-figure__cap-k">Memorandum of understanding</span>
                  {MOU.partner
                    ? `Signed with ${MOU.partner}${MOU.date ? ' · ' + MOU.date : ''}.`
                    : `Signing our first institutional partnership${MOU.date ? ' · ' + MOU.date : ''}.`}
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {/* ---------- Founders ---------- */}
        <section id="founders" className="v-section">
          <div className="v-wrap">
            <div className="v-section__head" data-reveal="blur">
              <div>
                <div className="v-eyebrow">The founders</div>
                <h2 className="v-h2">The three people who <span className="v-serif">turn up.</span></h2>
              </div>
              <p className="va-founders__note">
                No account managers, no subcontracted crew. The same three people
                scope the venue, shoot it, train the AI guide and answer you after
                launch.
              </p>
            </div>
            <div className="va-founders" data-reveal-group>
              {FOUNDERS.map((f) => <FounderCard f={f} key={f.name}/>)}
            </div>
          </div>
        </section>

        {/* ---------- Principles — dark band ---------- */}
        <section className="v-section v-band">
          <div className="v-band__grain" aria-hidden="true"></div>
          <div className="v-band__glow" aria-hidden="true"></div>
          <div className="v-wrap">
            <div data-reveal="blur">
              <div className="v-eyebrow v-eyebrow--onband">How we work</div>
              <h2 className="v-h2 v-h2--onband">
                Three rules we don't <span className="v-serif v-serif--onband">bend.</span>
              </h2>
            </div>
            <div className="va-principles" data-reveal-group>
              {PRINCIPLES.map((p) => (
                <article className="va-principle" key={p.n} data-reveal="scale">
                  <div className="va-principle__n">{p.n}</div>
                  <h3 className="va-principle__h">{p.h}</h3>
                  <p className="va-principle__p">{p.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Facts ---------- */}
        <section className="v-section">
          <div className="v-wrap">
            <div className="v-section__head" data-reveal="blur">
              <div>
                <div className="v-eyebrow">The details</div>
                <h2 className="v-h2">Where we work, and <span className="v-serif">how fast.</span></h2>
              </div>
            </div>
            <dl className="va-facts" data-reveal-group>
              {FACTS.map(([k, v]) => (
                <div className="va-fact" key={k} data-reveal>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="va-cta">
          <div className="v-wrap va-cta__inner" data-reveal="scale">
            <div>
              <div className="v-eyebrow v-eyebrow--onband">Next step</div>
              <h2 className="va-cta__h">Let's bring your space <span className="v-serif v-serif--onband">online.</span></h2>
              <p className="va-cta__p">
                Tell us about your venue and we'll show you what it looks like as a
                360° tour — and exactly what it takes to get there.
              </p>
            </div>
            <div className="va-cta__actions">
              <a href="https://wa.me/923105968568" className="v-btn v-btn--primary v-btn--lg"
                 target="_blank" rel="noopener noreferrer">
                <IconWhatsApp size={18}/> WhatsApp us
              </a>
              <a href="mailto:viylsavirtualtour@gmail.com" className="v-btn v-btn--ghost-dark v-btn--lg">
                <IconMail size={16}/> Email instead
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterCTA base="/"/>
    </>
  );
}
