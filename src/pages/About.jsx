import React from 'react';
import Nav from '../components/Nav.jsx';
import FooterCTA from '../components/FooterCTA.jsx';
import { IconArrowRight, IconLinkedIn, IconWhatsApp, IconMail } from '../icons.jsx';
import useSpotlight from '../useSpotlight.js';

/* ---------------------------------------------------------------------------
   EDIT THIS BLOCK — everything the founders have to supply lives here.

   Nothing below invents biography, and nothing claims work VIYLSA has not done
   yet. There are no clients on the books, so no bio may describe running one.

   Fields, and how each behaves while empty:

     photo    ''  -> the monogram avatar renders instead (looks deliberate).
                     A path that 404s falls back to the monogram too, so it is
                     safe to set this before the file is in the repo.
     photoPos ''  -> CSS object-position for the 4:5 crop, e.g. 'center 34%'.
                     Use it when a face sits high or low in the frame.
     linkedin ''  -> that link is simply not rendered
     github   ''  -> same

   Portraits go in public/assets/team/ as <firstname>.jpg. Shoot all three the
   same way where you can (same light, same crop, 4:5, 1200x1500 or better);
   where you cannot, photoPos is there to rescue the framing.
--------------------------------------------------------------------------- */
const FOUNDERS = [
  {
    name: 'Aleena Tahir',
    role: 'Co-Founder & CEO',
    tag: 'The brain of the operation.',
    initial: 'AT',
    photo: '',
    photoPos: '',
    linkedin: 'https://www.linkedin.com/in/aleenatahir/',
    github: 'https://github.com/AleenaTahir1',
    bio: 'Deep in the tech with Saqlain by morning, planning the next post with Aena by afternoon, and the reason both of them have something to do tomorrow. She carries the plan for where VIYLSA goes next, and a habit of picking up whichever role the week turns out to be missing.',
  },
  {
    name: 'Saqlain Abbas',
    role: 'Co-Founder & CTO',
    tag: 'The philosopher, allegedly.',
    initial: 'SA',
    photo: '/assets/team/saqlain.jpg',
    photoPos: '',   // file is pre-cropped to 4:5, so the default centre crop is exact
    linkedin: 'https://www.linkedin.com/in/saqlainrazee/',
    github: 'https://github.com/Razee4315',
    bio: 'Will turn anything into a conversation about logic, and is the first to tell you he runs on the least of it. Self-declared ignoramus. Also the one who builds the tour player, the bilingual AI guide and the analytics behind them, and who knows every layer of the stack cold. The theory is negotiable. The code ships.',
  },
  {
    name: 'Aena Habib',
    role: 'Co-Founder & CMO',
    tag: 'The one with the ideas.',
    initial: 'AH',
    photo: '',
    photoPos: '',
    linkedin: 'https://www.linkedin.com/in/aena-habib-260947354/',
    github: 'https://github.com/EN-AenaHabib',
    bio: 'Every post, every frame and every “what if we did it like this” starts with her, and her eye is the reason a VIYLSA tour looks like VIYLSA. Put her and Aleena on the same problem and something ships. They are best friends, which at work almost never survives contact, and here somehow keeps producing.',
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
    p: 'The person who scopes your venue is holding the camera on the day, and answering your message six months later. You deal with the same faces from the first call onward.',
  },
  {
    n: '02',
    h: 'A fixed price before we shoot.',
    p: 'Every venue is different, so every tour is quoted to the space. You get that number after one call and before anyone turns up, never as a surprise at the end.',
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
  // A missing, renamed or not-yet-added portrait falls back to the monogram
  // rather than leaving a broken image on a live page. This is what makes it
  // safe to point `photo` at a file before the file is in the repo.
  const [imgFailed, setImgFailed] = React.useState(false);
  const showPhoto = f.photo && !imgFailed;
  return (
    <article className="va-founder" data-reveal="scale">
      <div className="va-founder__portrait">
        {showPhoto ? (
          <img
            src={f.photo}
            alt={f.name}
            width="600"
            height="750"
            loading="lazy"
            style={f.photoPos ? { objectPosition: f.photoPos } : undefined}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="va-founder__monogram" aria-hidden="true">{f.initial}</span>
        )}
      </div>
      <div className="va-founder__name">{f.name}</div>
      <div className="va-founder__role">{f.role}</div>
      {f.tag && <div className="va-founder__tag">{f.tag}</div>}
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
  const spotlight = useSpotlight();
  return (
    <>
      <a className="v-skip" href="#main">Skip to content</a>
      <Nav base="/" current="/about.html"/>

      <main id="main">
        {/* ---------- Hero ---------- */}
        {/* Grain + cursor spotlight reuse the homepage hero's own classes, so
            there is one definition of that texture rather than a copy that
            drifts. See src/useSpotlight.js. */}
        <header
          id="top"
          className="va-hero"
          ref={spotlight.ref}
          onMouseMove={spotlight.onMouseMove}
        >
          <div className="va-hero__glow" aria-hidden="true"></div>
          <div className="v-hero__grain" aria-hidden="true"></div>
          <div className="v-hero__grain-spot" aria-hidden="true"></div>
          <div className="v-wrap va-hero__inner">
            <h1 className="va-hero__h">
              Built in Islamabad,<br/>
              for venues <span className="v-serif v-serif--onband">across Pakistan.</span>
            </h1>
            <p className="va-hero__lede">
              VIYLSA turns universities, hotels, hospitals, real estate and showrooms
              into 360° virtual tours, each one with a built-in AI guide that answers
              visitors in English and Urdu, captures enquiries, and shows you exactly
              who came and what they cared about.
            </p>
            <div className="va-hero__meta">
              <div><span className="va-hero__k">Studio</span> Islamabad &amp; Rawalpindi</div>
              <div><span className="va-hero__k">Started as</span> An ICAT project</div>
              <div><span className="va-hero__k">Backed by</span> Ourselves, so far</div>
            </div>
          </div>
        </header>

        {/* ---------- Founders ----------
             Ahead of the story on purpose: on an About page the first question
             is "who are these people", and the story reads better once you know
             whose story it is. */}
        <section id="founders" className="v-section">
          <div className="v-wrap">
            <div className="v-section__head" data-reveal="blur">
              <div>
                <div className="v-eyebrow">The founders</div>
                <h2 className="v-h2">The three people who <span className="v-serif">turn up.</span></h2>
              </div>
            </div>
            <div className="va-founders" data-reveal-group>
              {FOUNDERS.map((f) => <FounderCard f={f} key={f.name}/>)}
            </div>
          </div>
        </section>

        {/* ---------- Story ---------- */}
        <section className="v-section v-section--haze">
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
                  <h3 className="va-chapter__h">It began as a project, not a company.</h3>
                  <p>
                    VIYLSA started at ICAT. We had an idea we wanted to build properly, so
                    we picked one: a virtual tour of a university campus. None of us set out
                    to start a business. We set out to make the thing work.
                  </p>
                  <p>
                    Building it taught us the craft the hard way. How to shoot a space so it
                    reads honestly. How to link scenes so walking through them feels like
                    walking through the building. How much of a visitor's question a tour can
                    answer on its own, and where it still needs someone to speak up.
                  </p>
                  <p>
                    Somewhere in that work the real discovery arrived, and it was not
                    technical. Almost every venue around us had the same gap: people decide
                    whether a place is worth visiting from their phone, long before they turn
                    up at the gate, and almost nobody was giving them anything to decide
                    with. A photo gallery and a phone number that only works between nine and
                    six. We had just built the missing piece by accident, and we knew we
                    could build it for anyone.
                  </p>
                </div>
              </article>

              <article className="va-chapter" data-reveal>
                <span className="va-chapter__n" aria-hidden="true">02</span>
                <div className="va-chapter__body">
                  <h3 className="va-chapter__h">We won ICAT, and then we tested it on strangers.</h3>
                  <p>
                    The project won. That was the first signal that we were not the only
                    people who found this interesting.
                  </p>
                  <p>
                    The second signal mattered more. We started showing the tour to friends,
                    then to their friends, then to people who had no reason to be kind to us.
                    The reaction kept coming back the same way, from people who owed us
                    nothing. That is a different kind of feedback from a grade, and it is the
                    one that made us take the idea seriously.
                  </p>
                  <p className="va-chapter__link">
                    <a href="/#live-tour" className="v-btn v-btn--link">
                      See that tour, still live, on the homepage <IconArrowRight size={15}/>
                    </a>
                  </p>
                </div>
              </article>

              <article className="va-chapter" data-reveal>
                <span className="va-chapter__n" aria-hidden="true">03</span>
                <div className="va-chapter__body">
                  <h3 className="va-chapter__h">Then we said it out loud, in front of experts.</h3>
                  <p>
                    We took VIYLSA to NEIC and pitched it to a panel of judges and industry
                    experts. Standing in front of people whose job is to find the hole in
                    your reasoning forces a certain honesty: what exactly is the product, who
                    exactly pays for it, and why now.
                  </p>
                  <p>
                    We were selected. What we walked away with was worth more than the
                    result, which was the confidence that this holds up outside the room we
                    built it in.
                  </p>
                </div>
              </article>

              <article className="va-chapter" data-reveal>
                <span className="va-chapter__n" aria-hidden="true">04</span>
                <div className="va-chapter__body">
                  <h3 className="va-chapter__h">Now we're bootstrapping it, on our own money.</h3>
                  <p>
                    VIYLSA is self-funded. Every rupee that has gone into the hardware came
                    out of our own pockets, deliberately, because we would rather own the
                    decisions while the product is still finding its shape.
                  </p>
                  <p>
                    So we are doing the unglamorous version: buying the kit, shooting the
                    venues ourselves, and taking on a first group of founding businesses at
                    locked-in early pricing. Small enough that every venue gets all three of
                    us on it.
                  </p>
                  <p>
                    The name is the whole promise. Bringing visits online, so that the first
                    visit to a place can happen from a phone in Lahore or a laptop abroad and
                    still be walkable, answerable and measurable. We want to build that for
                    businesses right across Pakistan.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Proof / MoU — renders only once a photo exists ---------- */}
        {MOU.image && (
          <section className="v-section">
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
                360° tour, and exactly what it takes to get there.
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
