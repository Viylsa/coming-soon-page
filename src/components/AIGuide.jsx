import React from 'react';
import { IconSparkle, IconCheck } from '../icons.jsx';

/* Compact bilingual AI-guide demo CARD. Embedded as a supporting sub-block in
   the "What you get back" section — the guide is a capability of the tour, not a
   co-headline, so it no longer owns a full section or a nav slot. A scripted
   EN/Urdu conversation cycles on a (relaxed) timer and ends by capturing a lead.
   Dependency-light: one setState loop, no libraries. */
export default function AIGuideCard() {
  const SCRIPT = [
    {
      qen: 'What are the hostel fees per semester?',
      aen: 'Hostel fees are around Rs 45,000 a semester, mess included. Want the full breakdown?',
      qur: 'ہاسٹل کی فیس فی سمسٹر کتنی ہے؟',
      aur: 'ہاسٹل کی فیس تقریباً 45,000 روپے فی سمسٹر ہے، میس سمیت۔ کیا میں مکمل تفصیل بھیج دوں؟',
    },
    {
      qen: 'When does admission close?',
      aen: 'Admissions usually close at the end of August. I can send you the application form right now.',
      qur: 'داخلے کی آخری تاریخ کب ہے؟',
      aur: 'داخلے عموماً اگست کے آخر میں بند ہوتے ہیں۔ میں ابھی آپ کو داخلہ فارم بھیج سکتا ہوں۔',
    },
    {
      qen: 'Where is the computer lab?',
      aen: 'It\'s on the 2nd floor of the academic block. Tap here and I\'ll take you there.',
      qur: 'کمپیوٹر لیب کہاں ہے؟',
      aur: 'یہ اکیڈمک بلاک کی دوسری منزل پر ہے۔ یہاں ٹیپ کریں، میں آپ کو وہاں لے چلتا ہوں۔',
    },
  ];

  const REDUCE = React.useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const cardRef = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState('typing'); // typing → a → lead
  const [lang, setLang] = React.useState('en');
  const [inView, setInView] = React.useState(false);

  // Only run the conversation while the card is on screen.
  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (REDUCE.current) { setPhase('lead'); return; }
    if (!inView) return;
    setPhase('typing');
    const t1 = setTimeout(() => setPhase('a'), 1400);
    const t2 = setTimeout(() => setPhase('lead'), 3200);
    // ~9s per exchange — relaxed so the demo never dominates the section, but
    // with enough dwell time to read the answer (the Urdu ones especially).
    const t3 = setTimeout(() => setIdx((i) => (i + 1) % SCRIPT.length), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [idx, inView]);

  const ex = SCRIPT[idx];
  const rtl = lang === 'ur';
  const q = rtl ? ex.qur : ex.qen;
  const a = rtl ? ex.aur : ex.aen;

  return (
    <div className="v-ai__chat" ref={cardRef}>
      <div className="v-ai__head">
        <span className="v-ai__avatar"><IconSparkle size={15}/></span>
        <div className="v-ai__head-meta">
          <div className="v-ai__name">VIYLSA AI Guide</div>
          <div className="v-ai__sub"><span className="v-ai__dot"></span> Trained on this venue</div>
        </div>
        <div className="v-ai__langs" role="group" aria-label="Answer language">
          <button className={'v-ai__lang' + (lang === 'en' ? ' is-on' : '')} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          <button className={'v-ai__lang' + (lang === 'ur' ? ' is-on' : '')} aria-pressed={lang === 'ur'} onClick={() => setLang('ur')}>اردو</button>
        </div>
      </div>

      <div className="v-ai__feed">
        <div
          key={'q' + idx + lang}
          className="v-ai__bubble v-ai__bubble--user"
          dir={rtl ? 'rtl' : 'ltr'}
          lang={rtl ? 'ur' : 'en'}
        >
          {q}
        </div>
        {phase === 'typing' ? (
          <div className="v-ai__bubble v-ai__bubble--ai v-ai__typing" aria-label="typing">
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

      <div className={'v-ai__lead' + (phase === 'lead' ? ' is-shown' : '')}>
        <span className="v-ai__lead-ic"><IconCheck size={13}/></span>
        Enquiry logged · ready in your dashboard
      </div>
    </div>
  );
}
