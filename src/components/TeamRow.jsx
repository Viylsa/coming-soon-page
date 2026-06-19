function TeamRow() {
  const team = [
    { name: 'Aleena Tahir', role: 'Co-Founder & CEO', initial: 'A' },
    { name: 'Saqlain Abbas', role: 'Co-Founder & CTO', initial: 'S' },
    { name: 'Aena Habib', role: 'Co-Founder & CMO', initial: 'A' },
  ];
  return (
    <section id="team" className="v-section">
      <div className="v-wrap">
        <div data-reveal>
          <div className="v-eyebrow">The team</div>
          <h2 className="v-h2">Three founders. <span className="v-muted">On every shoot.</span></h2>
          <p className="v-team__lede">
            VIYLSA is built and shot in Islamabad &amp; Rawalpindi — the same three
            people who sell you a tour are the ones who turn up with the camera,
            train the AI guide, and stay reachable after launch.
          </p>
        </div>
        <div className="v-team" data-reveal-group>
          {team.map((m) => (
            <div className="v-person" key={m.name} data-reveal>
              <div className="v-person__avatar">{m.initial}</div>
              <div className="v-person__meta">
                <div className="v-person__name">{m.name}</div>
                <div className="v-person__role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TeamRow;
