import React from 'react';
import { IconSparkle, IconArrowRight } from '../icons.jsx';

/* Compact bilingual AI-guide demo CARD. Embedded as a supporting sub-block in
   the "What you get back" section — the guide is a capability of the tour, not a
   co-headline, so it no longer owns a full section or a nav slot.

   P1-03: the card is a SCRIPTED EXAMPLE, and every state says so. The header
   carries the disclaimer (not a tooltip), the questions describe what the guide
   can do rather than asserting real fees/dates/locations, the completion line
   never claims a message was sent, and a "Next example" button gives reading
   control — nothing cycles on a timer while you're mid-read. Urdu copy changed?
   Re-run `npm run subset:urdu` to regenerate the font subset. */
export default function AIGuideCard() {
  const SCRIPT = [
    {
      qen: 'What are the hostel fees per semester?',
      aen: 'Whatever the venue puts in its approved fee schedule. The guide answers only from documents the venue signs off, so there\'s no guessing and no waiting for office hours.',
      qur: 'ہاسٹل کی فیس فی سمسٹر کتنی ہے؟',
      aur: 'جو جواب انتظامیہ نے اپنی منظور شدہ فیس فہرست میں لکھا ہو۔ گائیڈ صرف منظور شدہ دستاویزات سے جواب دیتی ہے، اندازہ نہیں لگاتی۔',
    },
    {
      qen: 'When does admission close?',
      aen: 'Deadlines come straight from the venue\'s own documents. If a question isn\'t covered, the guide hands the visitor to the venue\'s contact details instead of guessing.',
      qur: 'داخلے کی آخری تاریخ کب ہے؟',
      aur: 'آخری تاریخیں ادارے کی اپنی دستاویزات سے آتی ہیں۔ اگر کوئی سوال ان میں نہ ہو تو گائید زائرے کو براہ راست رابطے کی تفصیل تک پہنچا دیتی ہے۔',
    },
    {
      qen: 'Where is the computer lab?',
      aen: 'Directions, timings, anything: in English or Urdu, any hour of the day. Every conversation is logged for the venue\'s dashboard.',
      qur: 'کمپیوٹر لیب کہاں ہے؟',
      aur: 'راستے، اوقات، کوئی بھی سوال، انگریزی یا اردو میں، دن رات ہر وقت۔ ہر گفتگو ادارے کے ڈیش بورڈ میں محفوظ ہوتی ہے۔',
    },
  ];

  const REDUCE = React.useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState(REDUCE.current ? 'done' : 'typing'); // typing → done
  const [lang, setLang] = React.useState('en');

  // A short typing beat keeps the demo feeling like a chat; reduced motion (or a
  // second read) lands straight on the answer. Timer is cleaned up on unmount.
  React.useEffect(() => {
    if (REDUCE.current) { setPhase('done'); return; }
    setPhase('typing');
    const t = setTimeout(() => setPhase('done'), 1400);
    return () => clearTimeout(t);
  }, [idx, lang]);

  const ex = SCRIPT[idx];
  const rtl = lang === 'ur';
  const q = rtl ? ex.qur : ex.qen;
  const a = rtl ? ex.aur : ex.aen;

  return (
    <div className="v-ai__chat">
      <div className="v-ai__head">
        <span className="v-ai__avatar" aria-hidden="true"><IconSparkle size={15}/></span>
        <div className="v-ai__head-meta">
          <div className="v-ai__name">VIYLSA AI Guide</div>
          {/* Persistent, not a tooltip: the disclaimer IS the status line. */}
          <div className="v-ai__sub">Scripted example · no message is sent</div>
        </div>
        <div className="v-ai__langs" role="group" aria-label="Answer language">
          <button className={'v-ai__lang' + (lang === 'en' ? ' is-on' : '')} aria-pressed={lang === 'en'} lang="en" onClick={() => setLang('en')}>EN</button>
          <button className={'v-ai__lang' + (lang === 'ur' ? ' is-on' : '')} aria-pressed={lang === 'ur'} lang="ur" onClick={() => setLang('ur')}>اردو</button>
        </div>
      </div>

      {/* aria-live is safe here: content changes only on an explicit button
          press, never on a timer, so nothing announces over the reader. */}
      <div className="v-ai__feed" aria-live="polite">
        <div
          key={'q' + idx + lang}
          className="v-ai__bubble v-ai__bubble--user"
          dir={rtl ? 'rtl' : 'ltr'}
          lang={rtl ? 'ur' : 'en'}
        >
          {q}
        </div>
        {phase === 'typing' && !REDUCE.current ? (
          <div className="v-ai__bubble v-ai__bubble--ai v-ai__typing" role="img" aria-label="The guide is composing an answer">
            <span></span><span></span><span></span>
          </div>
        ) : (
          <div
            key={'a' + idx + lang}
            className="v-ai__bubble v-ai__bubble--ai"
            dir={rtl ? 'rtl' : 'ltr'}
            lang={rtl ? 'ur' : 'en'}
          >
            {a}
          </div>
        )}
      </div>

      <div className="v-ai__foot">
        <button
          type="button"
          className="v-ai__next"
          onClick={() => setIdx((i) => (i + 1) % SCRIPT.length)}
        >
          Next example <IconArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}
