import { IconCheck } from '../icons.jsx';
import AIGuideCard from './AIGuide.jsx';

/* "What you get back" — pays off the Problem section's promise (you don't know
   who visited). A mock analytics dashboard (illustrative figures), with the
   bilingual AI guide folded in below as a supporting sub-block rather than its
   own full section. The numbers are an illustrative sample, clearly labelled. */
function Analytics() {
  // Bar widths derive from the numbers themselves, never a separate string.
  const rooms = [
    ['Lecture Hall', 142],
    ['Hostel rooms', 98],
    ['Library', 76],
    ['Cafeteria', 51],
  ];
  const maxViews = Math.max(...rooms.map(([, v]) => v));
  return (
    <section id="analytics" className="v-section v-section--haze">
      <div className="v-wrap v-rcpt__grid">
        <div className="v-rcpt__intro" data-reveal>
          {/* rule head — the label heads a hairline that runs out to the measure */}
          <div className="v-section__head">
            <h2 className="v-h2">Every visit,<br/>on the record.</h2>
          </div>
          <p className="v-rcpt__lede">
            You stop guessing. A VIYLSA tour shows you which spaces attract
            attention and captures enquiries from visitors who choose to get in
            touch, while your office is closed.
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
            {/* ONE persistent example-data label; two long uppercase labels
                crowded the same header (P2-06). */}
            <div className="v-rcpt__card-head">
              <span className="v-rcpt__card-title">Example dashboard · illustrative figures</span>
            </div>

            <div className="v-rcpt__kpis">
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Visits</div>
                <div className="v-rcpt__kpi-num"><b>300+</b></div>
                <div className="v-rcpt__kpi-trend">unique visits in a sample week</div>
              </div>
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Leads captured</div>
                <div className="v-rcpt__kpi-num"><b>30+</b></div>
                <div className="v-rcpt__kpi-trend">enquiries from the tour</div>
              </div>
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Avg. time in tour</div>
                <div className="v-rcpt__kpi-num">4:12</div>
                <div className="v-rcpt__kpi-trend">minutes:seconds per visit</div>
              </div>
            </div>

            <div className="v-rcpt__rooms">
              <div className="v-rcpt__rooms-h">Most-viewed spaces · room views in a sample week</div>
              {rooms.map(([name, views], i) => (
                <div className="v-rcpt__bar" key={name}>
                  <span className="v-rcpt__bar-label">{name}</span>
                  <span className="v-rcpt__bar-track">
                    <span className="v-rcpt__bar-fill" style={{ '--w': Math.round((views / maxViews) * 100) + '%', '--d': (560 + i * 120) + 'ms' }}></span>
                  </span>
                  <span className="v-rcpt__bar-val">{views}</span>
                </div>
              ))}
            </div>

            <div className="v-rcpt__foot">
              The live product shows <b>when visits happen</b>, including the
              after-hours demand you'd otherwise never see.
            </div>
          </div>
        </div>
      </div>

      {/* Bilingual AI-guide demo — supporting sub-block, not a headline section.
          #ai-guide kept as an alias anchor so old links / the sitemap don't 404. */}
      <span id="ai-guide" className="v-anchor" aria-hidden="true"></span>
      <div className="v-wrap v-ai__embed" data-reveal>
        <div className="v-ai__embed-head">
          <p className="v-ai__embed-p">
            Trained on your venue's own documents, it answers visitors in English
            and Urdu around the clock, and logs every enquiry straight to the
            dashboard above. The card below is a scripted example.
          </p>
        </div>
        <AIGuideCard/>
      </div>
    </section>
  );
}
export default Analytics;
