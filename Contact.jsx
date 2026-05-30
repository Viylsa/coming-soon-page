const { IconArrowRight, IconSparkle, IconMail, IconMapPin, IconClock, IconCheck } = window.VIcons;

/* Contact section — closing call-to-action with a working form.
   The form composes a pre-filled email (no backend needed) and also
   lists direct contact details. */
function Contact() {
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const el = e.currentTarget.elements;
    const name = el.fullname.value.trim();
    const email = el.email.value.trim();
    const org = el.org.value.trim();
    const message = el.message.value.trim();

    const subject = encodeURIComponent('VIYLSA enquiry — ' + (name || 'website'));
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      (org ? 'Venue / organisation: ' + org + '\n' : '') +
      '\nMessage:\n' + message
    );
    window.location.href =
      'mailto:viylsavirtualtour@gmail.com?subject=' + subject + '&body=' + body;
    setSent(true);
  };

  return (
    <section id="contact" className="v-contact">
      <div className="v-contact__glow"/>
      <div className="v-wrap v-contact__inner">
        <div className="v-contact__intro" data-reveal="left">
          <div className="v-eyebrow v-eyebrow--crimson"><IconSparkle size={14}/> Contact</div>
          <h2 className="v-contact__h">
            Let's bring your space <span className="v-serif">online.</span>
          </h2>
          <p className="v-contact__p">
            Tell us about your venue — a university, a property, a hotel, a hall.
            We'll show you exactly how it looks as a 360° tour, and what it takes
            to get there.
          </p>

          <div className="v-contact__details">
            <a className="v-contact__item" href="mailto:viylsavirtualtour@gmail.com">
              <span className="v-contact__ic"><IconMail size={18}/></span>
              <span>
                <span className="v-contact__item-k">Email</span>
                <span className="v-contact__item-v">viylsavirtualtour@gmail.com</span>
              </span>
            </a>
            <div className="v-contact__item">
              <span className="v-contact__ic"><IconMapPin size={18}/></span>
              <span>
                <span className="v-contact__item-k">Based in</span>
                <span className="v-contact__item-v">Islamabad &amp; Rawalpindi, Pakistan</span>
              </span>
            </div>
            <div className="v-contact__item">
              <span className="v-contact__ic"><IconClock size={18}/></span>
              <span>
                <span className="v-contact__item-k">Response</span>
                <span className="v-contact__item-v">Within one business day</span>
              </span>
            </div>
          </div>
        </div>

        <form className="v-contact__form" data-reveal="right" onSubmit={onSubmit}>
          {sent ? (
            <div className="v-contact__sent">
              <span className="v-contact__sent-ic"><IconCheck size={26}/></span>
              <h3>Your message is ready to send</h3>
              <p>
                We've opened your email app with everything filled in — just press
                send. Prefer to write us directly?{' '}
                <a href="mailto:viylsavirtualtour@gmail.com">viylsavirtualtour@gmail.com</a>
              </p>
            </div>
          ) : (
            <>
              <div className="v-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="fullname" type="text" required placeholder="Your name"/>
              </div>
              <div className="v-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" required placeholder="you@example.com"/>
              </div>
              <div className="v-field">
                <label htmlFor="c-org">Venue / organisation <span className="v-field__opt">(optional)</span></label>
                <input id="c-org" name="org" type="text" placeholder="University, hotel, property…"/>
              </div>
              <div className="v-field">
                <label htmlFor="c-msg">What would you like to bring online?</label>
                <textarea id="c-msg" name="message" rows="4" required placeholder="Tell us about your space…"></textarea>
              </div>
              <button type="submit" className="v-btn v-btn--primary v-btn--lg v-contact__submit">
                Send message <IconArrowRight size={18}/>
              </button>
              <p className="v-contact__formnote">Opens in your email app — no account or sign-up needed.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
window.Contact = Contact;
