import { IconArrowRight, IconPlay, IconSparkle } from '../icons.jsx';

function Hero() {
  return (
    <header id="top" className="v-hero">
      <div className="v-hero__grain"/>
      <div className="v-hero__glow"/>
      <div className="v-hero__inner">
        <div className="v-hero__copy" data-reveal="left">
          <div className="v-eyebrow v-eyebrow--crimson">
            <IconSparkle size={14}/> Pakistan's first 360° tours with a built-in AI guide
          </div>
          <h1 className="v-display">
            Bringing <em>visits</em> <br/>online.
          </h1>
          <p className="v-hero__sub">
            A 360° tour anyone can walk from their phone — with an AI guide that
            answers visitors in <b>Urdu or English</b>, 24/7, and a dashboard that
            tells you exactly who's interested.
          </p>
          <div className="v-hero__cta">
            <a href="#contact" className="v-btn v-btn--primary v-btn--lg">
              Book a 10-minute demo <IconArrowRight size={18}/>
            </a>
            <a href="#how" className="v-btn v-btn--ghost-dark v-btn--lg">
              <IconPlay size={16}/> See a live tour
            </a>
          </div>
          <div className="v-hero__strip">
            <span><b>360°</b> tours</span>
            <span className="v-hero__dot">·</span>
            <span>AI guide in <b>English &amp; Urdu</b></span>
            <span className="v-hero__dot">·</span>
            <span><b>Live</b> visitor analytics</span>
          </div>
        </div>

        <div className="v-hero__preview">
          {/* Secondary cards peeking out from behind */}
          <div className="v-hpv__peek v-hpv__peek--back">
            <img src="/assets/screens/tour-classroom.png" alt=""/>
            <span className="v-hpv__peek-label">Lecture Hall 4</span>
          </div>
          <div className="v-hpv__peek v-hpv__peek--mid">
            <img src="/assets/screens/tour-entrance.png" alt=""/>
            <span className="v-hpv__peek-label">Main Entrance</span>
          </div>

          {/* Main browser-framed scene */}
          <div className="v-hpv__frame">
            <div className="v-hpv__chrome">
              <div className="v-hpv__dots">
                <span></span><span></span><span></span>
              </div>
              <div className="v-hpv__url">
                <span className="v-hpv__lock">●</span>
                viylsa.app/tour/campus
              </div>
            </div>
            <div className="v-hpv__stage" data-tilt>
              <div className="v-hpv__pan">
                <img
                  src="/assets/screens/tour-building.png"
                  alt="University academic block — 360° tour"
                  className="v-hpv__photo"
                />
              </div>
              {/* Drag-to-look cue — fades out on first interaction (motion.js) */}
              <div className="v-hpv__draghint">
                <span className="v-hpv__draghint-ic">⟷</span> Drag to look around
              </div>
              {/* Live viewers badge */}
              <div className="v-hpv__live">
                <span className="v-hpv__live-dot"></span>
                <b>3</b> watching now
              </div>
              {/* Hotspot + tooltip */}
              <div className="v-hpv__hotspot" style={{ top: '46%', left: '52%' }}>
                <span className="v-hpv__hot-i">i</span>
                <div className="v-hpv__tooltip">
                  <div className="v-hpv__tip-eyebrow">About this block</div>
                  Faculty offices · open Mon–Fri
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI chat exchange */}
          <div className="v-hpv__chat">
            <div className="v-hpv__chat-head">
              <span className="v-hpv__chat-avatar"><IconSparkle size={12}/></span>
              <div>
                <div className="v-hpv__chat-name">AI Guide</div>
                <div className="v-hpv__chat-sub">Trained on this venue</div>
              </div>
            </div>
            <div className="v-hpv__chat-bubble v-hpv__chat-bubble--user">
              How much does it cost to rent?
            </div>
            <div className="v-hpv__chat-bubble v-hpv__chat-bubble--ai">
              <span className="v-hpv__chat-typing"><span></span><span></span><span></span></span>
              <span className="v-hpv__chat-text">₨ 85,000 / month · 3-bed · east-facing balcony</span>
            </div>
          </div>

          {/* Floating analytics card */}
          <div className="v-hpv__analytics">
            <div className="v-hpv__an-row">
              <span className="v-hpv__an-label">Today's visits</span>
              <span className="v-hpv__an-trend">↑ 24%</span>
            </div>
            <div className="v-hpv__an-num"><b data-count="342">342</b></div>
            <svg className="v-hpv__sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
              <path d="M0,22 L10,18 L20,20 L30,14 L40,16 L50,10 L60,12 L70,7 L80,9 L90,4 L100,6"
                    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M0,22 L10,18 L20,20 L30,14 L40,16 L50,10 L60,12 L70,7 L80,9 L90,4 L100,6 L100,28 L0,28 Z"
                    fill="url(#sparkFill)" opacity="0.18"/>
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="currentColor"/>
                  <stop offset="1" stopColor="currentColor" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Hero;
