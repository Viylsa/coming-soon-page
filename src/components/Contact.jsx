import React from 'react';
import { IconArrowRight, IconSparkle, IconMail, IconMapPin, IconClock, IconCheck, IconWhatsApp } from '../icons.jsx';

/* WhatsApp number — international format, digits only, no + (for wa.me links). */
const WHATSAPP_NUMBER = '923105968568';
const WHATSAPP_DISPLAY = '+92 310 5968568';
const EMAIL = 'viylsavirtualtour@gmail.com';

/* Contact section — closing call-to-action with a working form.
   WhatsApp is the primary channel (it works on every device, no mail client
   needed, and it's how B2B conversations start here); email is the fallback. */
function Contact() {
  const [sent, setSent] = React.useState(false);

  const readForm = (form) => {
    const el = form.elements;
    return {
      name: el.fullname.value.trim(),
      org: el.org.value.trim(),
      message: el.message.value.trim(),
    };
  };

  const composeText = ({ name, org, message }) =>
    'Hi VIYLSA — I\'d like to book a demo.\n\n' +
    'Name: ' + name + '\n' +
    (org ? 'Venue / organisation: ' + org + '\n' : '') +
    '\n' + message;

  const onSubmit = (e) => {
    e.preventDefault();
    const text = composeText(readForm(e.currentTarget));
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    setSent(true);
  };

  const onEmailInstead = (e) => {
    const form = e.currentTarget.closest('form');
    if (!form.reportValidity()) return;
    const { name, org, message } = readForm(form);
    const subject = encodeURIComponent('VIYLSA demo request — ' + (name || 'website'));
    const body = encodeURIComponent(composeText({ name, org, message }));
    window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
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
            <a className="v-contact__item" href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">
              <span className="v-contact__ic"><IconWhatsApp size={18}/></span>
              <span>
                <span className="v-contact__item-k">WhatsApp · fastest reply</span>
                <span className="v-contact__item-v">{WHATSAPP_DISPLAY}</span>
              </span>
            </a>
            <a className="v-contact__item" href={'mailto:' + EMAIL}>
              <span className="v-contact__ic"><IconMail size={18}/></span>
              <span>
                <span className="v-contact__item-k">Email</span>
                <span className="v-contact__item-v">{EMAIL}</span>
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
              <h3>Carrying on in WhatsApp</h3>
              <p>
                Your message is pre-filled — just press send and we'll reply
                within one business day. Didn't open? Message us directly on{' '}
                <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a>{' '}
                or email <a href={'mailto:' + EMAIL}>{EMAIL}</a>.
              </p>
            </div>
          ) : (
            <>
              <div className="v-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="fullname" type="text" required placeholder="Your name"/>
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
                <IconWhatsApp size={18}/> Book my demo on WhatsApp
              </button>
              <button type="button" className="v-btn v-btn--ghost-dark v-btn--lg v-contact__submit v-contact__submit--alt" onClick={onEmailInstead}>
                <IconMail size={16}/> Send by email instead
              </button>
              <p className="v-contact__formnote">Opens WhatsApp with your message pre-filled — no account or sign-up needed.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
export default Contact;
