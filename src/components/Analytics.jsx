import { IconChart, IconCheck } from '../icons.jsx';

/* "You get the receipt" — pays off the Problem section's promise (#03: you
   don't know who visited). A mock analytics dashboard: KPI tiles count up, the
   most-viewed-spaces bars grow when the section scrolls into view. The numbers
   are an illustrative sample of what the live campus tour reports. */
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
          <div className="v-eyebrow v-eyebrow--crimson"><IconChart size={14}/> The receipt</div>
          <h2 className="v-h2">Every visit, <span className="v-serif">on the record.</span></h2>
          <p className="v-rcpt__lede">
            A walk-in used to be a black box — no name, no path, no idea what they
            cared about. A VIYLSA tour hands you the receipt: who came, where they
            lingered, and what they were about to ask.
          </p>
          <ul className="v-ai__points">
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> See which spaces visitors actually open</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Catch the after-hours demand you never saw</li>
            <li><span className="v-ai__pt-ic"><IconCheck size={14}/></span> Every enquiry, captured and waiting for you</li>
          </ul>
        </div>

        <div className="v-rcpt__dash" data-reveal="wipe">
          <div className="v-rcpt__card">
            <div className="v-rcpt__card-head">
              <span className="v-rcpt__card-title">Campus tour · a sample week</span>
              <span className="v-rcpt__card-live">Sample data</span>
            </div>

            <div className="v-rcpt__kpis">
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Visits</div>
                <div className="v-rcpt__kpi-num"><b data-count="342">342</b></div>
                <div className="v-rcpt__kpi-trend">↑ 24% vs last week</div>
              </div>
              <div className="v-rcpt__kpi">
                <div className="v-rcpt__kpi-label">Leads captured</div>
                <div className="v-rcpt__kpi-num"><b data-count="37">37</b></div>
                <div className="v-rcpt__kpi-trend">by the AI guide</div>
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
              <b>61%</b> of visits came after 6pm — captured while your office was closed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Analytics;
