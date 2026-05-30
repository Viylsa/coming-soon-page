function TeamRow() {
  const team = [
    { name: 'Aleena Tahir', role: 'Co-Founder & CEO', bio: 'LLMs & AI Agents — building the chatbot engine.', initial: 'A' },
    { name: 'Saqlain Abbas', role: 'Co-Founder & CTO', bio: 'Full-stack — platform architecture & development.', initial: 'S' },
    { name: 'Aena Habib', role: 'CMO', bio: 'Brand strategy & growth marketing lead.', initial: 'A' },
  ];
  return (
    <section id="team" className="v-section">
      <div className="v-wrap">
        <div data-reveal>
          <div className="v-eyebrow">The team</div>
          <h2 className="v-h2">Three founders. <span className="v-muted">All in.</span></h2>
        </div>
        <div className="v-team">
          {team.map((m, i) => (
            <div className="v-person" key={m.name} data-reveal data-reveal-delay={i + 1}>
              <div className="v-person__avatar">{m.initial}</div>
              <div className="v-person__name">{m.name}</div>
              <div className="v-person__role">{m.role}</div>
              <p className="v-person__bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.TeamRow = TeamRow;
