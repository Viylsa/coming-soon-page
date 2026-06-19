import { IconChart, IconCheck, IconSparkle } from '../icons.jsx';
import AIGuideCard from './AIGuide.jsx';

/* "What you get back" — pays off the Problem section's promise (you don't know
   who visited). A mock analytics dashboard (illustrative figures), with the
   bilingual AI guide folded in below as a supporting sub-block rather than its
   own full section. The numbers are an illustrative sample, clearly labelled. */
function Analytics() {
  const rooms = [
    ['Lecture Hall', 142, '100%'],
    ['Hostel rooms', 98, '69%'],
    ['Library', 76, '54%'],
    ['Cafeteria', 51, '36%'],
  ];
  return (
    <section id="analytics" className="v-section v-section--haze">
      <div className="v-wrap v-rcpt__grid">
        <div className="v-rcpt__intro" data-reveal="left">
          <div className="v-eyebrow v-eyebrow--crimson"><IconChart size={14}/> What you get back</div>
          <h2 className="v-h2">Every visit, <span className="v-serif">on the record.</span></h2>
          <p className="v-rcpt__lede">
            You stop guessing. A VIYLSA tour shows who came, which spaces they
            lingered in, and what they asked the AI guide while your office was
            closed.
          </p>
          <ul className="v-ai__points">
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> See which spaces visitors actually open</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Catch the after-hours demand you never saw</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> A bilingual AI guide replies in English &amp; Urdu, 24/7</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Every enquiry captured and waiting for you</li>
          </ul>
        </div>

        <div className="v-rcpt__dash" data-reveal="wipe">
          <div className="v-rcpt__card">
            <div className="v-rcpt__card-head">
              <span className="v-rcpt__card-title">Example dashboard · illustrative figures</span>
              <span className="v-rcpt__card-live">Illustrative — not a real venue</span>
            </div>

            <div className="v-rcpt__kpis">
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Visits</div>
                <div className="v-rcpt__kpi-num"><b>300+</b></div>
                <div className="v-rcpt__kpi-trend">in a sample week</div>
              </div>
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Leads captured</div>
                <div className="v-rcpt__kpi-num"><b>30+</b></div>
                <div className="v-rcpt__kpi-trend">captured automatically</div>
              </div>
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Avg. time in tour</div>
                <div className="v-rcpt__kpi-num">4:12</div>
                <div className="v-rcpt__kpi-trend">minutes per visit</div>
              </div>
            </div>

            <div className="v-rcpt__rooms">
              <div className="v-rcpt__rooms-h">Most-viewed spaces</div>
              {rooms.map(([name, views, w], i) => (
                <div className="v-rcpt__bar" key={name}>
                  <span className="v-rcpt__bar-label">{name}</span>
                  <span className="v-rcpt__bar-track">
                    <span className="v-rcpt__bar-fill" style={{ '--w': w, '--d': (i * 90) + 'ms' }}></span>
                  </span>
                  <span className="v-rcpt__bar-val">{views}</span>
                </div>
              ))}
            </div>

            <div className="v-rcpt__foot">
              Much of the traffic lands <b>after hours</b>, captured while your office is closed.
            </div>
          </div>
        </div>
      </div>

      {/* Bilingual AI-guide demo — supporting sub-block, not a headline section.
          #ai-guide kept as an alias anchor so old links / the sitemap don't 404. */}
      <span id="ai-guide" className="v-anchor" aria-hidden="true"></span>
      <div className="v-wrap v-ai__embed" data-reveal>
        <div className="v-ai__embed-head">
          <div className="v-eyebrow v-eyebrow--crimson"><IconSparkle size={14}/> The AI guide</div>
          <p className="v-ai__embed-p">
            Trained on your venue's own documents, it answers visitors in English
            and Urdu around the clock, and logs every enquiry straight to the
            dashboard above.
          </p>
        </div>
        <AIGuideCard/>
      </div>
    </section>
  );
}
export default Analytics;
