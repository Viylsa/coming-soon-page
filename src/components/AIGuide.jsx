import React from 'react';
import { IconSparkle, IconCheck } from '../icons.jsx';

/* "Meet the AI guide" — demonstrates the bilingual assistant instead of just
   naming it. A scripted conversation cycles on a timer, answers can be flipped
   to Urdu (RTL), and each exchange ends by "capturing a lead" — tying the AI
   to the analytics story. Dependency-light: one setState loop, no libraries. */
function AIGuide() {
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
  const sectionRef = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState('typing'); // typing → a → lead
  const [lang, setLang] = React.useState('en');
  const [inView, setInView] = React.useState(false);

  // Only run the conversation while the section is on screen.
  React.useEffect(() => {
    const el = sectionRef.current;
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
    const t1 = setTimeout(() => setPhase('a'), 1200);
    const t2 = setTimeout(() => setPhase('lead'), 2900);
    // 7s per exchange — enough dwell time to actually read the answer
    // (the Urdu ones especially) before it cycles.
    const t3 = setTimeout(() => setIdx((i) => (i + 1) % SCRIPT.length), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [idx, inView]);

  const ex = SCRIPT[idx];
  const rtl = lang === 'ur';
  const q = rtl ? ex.qur : ex.qen;
  const a = rtl ? ex.aur : ex.aen;

  return (
    <section id="ai-guide" className="v-section" ref={sectionRef}>
      <div className="v-wrap v-ai__grid">
        <div className="v-ai__intro" data-reveal="left">
          <div className="v-eyebrow v-eyebrow--crimson"><IconSparkle size={14}/> The AI guide</div>
          <h2 className="v-h2">The guide that <span className="v-serif">never sleeps.</span></h2>
          <p className="v-ai__lede">
            Every tour ships with an assistant trained on your floor plan, FAQ and
            pricing. It answers visitors in English <em>and</em> Urdu the moment they
            ask — and quietly captures the lead while your office is closed.
          </p>
          <ul className="v-ai__points">
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Trained on your venue's own documents</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Replies in English &amp; Urdu, around the clock</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Turns a casual question into a captured lead</li>
          </ul>
        </div>

        <div className="v-ai__demo" data-reveal="wipe">
          <div className="v-ai__chat">
            <div className="v-ai__head">
              <span className="v-ai__avatar"><IconSparkle size={15}/></span>
              <div className="v-ai__head-meta">
                <div className="v-ai__name">VIYLSA AI Guide</div>
                <div className="v-ai__sub"><span className="v-ai__dot"></span> Trained on this venue</div>
              </div>
              <div className="v-ai__langs" role="group" aria-label="Answer language">
                <button className={'v-ai__lang' + (lang === 'en' ? ' is-on' : '')} onClick={() => setLang('en')}>EN</button>
                <button className={'v-ai__lang' + (lang === 'ur' ? ' is-on' : '')} onClick={() => setLang('ur')}>اردو</button>
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
              Lead captured · added to your dashboard
            </div>
          </div>
          <div className="v-ai__caption">An example of how the guide answers, in either language.</div>
        </div>
      </div>
    </section>
  );
}
export default AIGuide;
