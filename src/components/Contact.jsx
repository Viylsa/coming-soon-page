import React from 'react';
import { IconArrowRight, IconSparkle, IconMail, IconMapPin, IconClock, IconCheck, IconWhatsApp } from '../icons.jsx';

/* WhatsApp number — international format, digits only, no + (for wa.me links). */
const WHATSAPP_NUMBER = '923105968568';
const WHATSAPP_DISPLAY = '+92 310 5968568';
const EMAIL = 'viylsavirtualtour@gmail.com';

/* Contact section — closing call-to-action with a working form.
   WhatsApp is the primary channel (it works on every device, no mail client
   needed, and it's how B2B conversations start here); email is the fallback.

   The primary action is a REAL anchor whose href is the wa.me deep link, built
   live from the (controlled) field values. That means it works in every browser
   and in-app webview — and even with JS disabled — instead of relying on
   window.open(), which returns null when blocked (popup blockers, the Instagram/
   Facebook in-app browsers common in Pakistan, desktop without WhatsApp) while
   the old code still flipped to a "sent" success state. No more false success. */
function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', org: '', message: '' });
  const waRef = React.useRef(null);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const composeText = ({ name, org, message }) =>
    'Hi VIYLSA, I\'d like to book a demo.\n\n' +
    'Name: ' + name.trim() + '\n' +
    (org.trim() ? 'Venue / organisation: ' + org.trim() + '\n' : '') +
    '\n' + message.trim();

  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(composeText(form));

  const onWaClick = (e) => {
    const f = e.currentTarget.closest('form');
    if (f && !f.reportValidity()) { e.preventDefault(); return; }
    setSent(true); // the anchor navigation (new tab) proceeds normally
  };

  // Enter inside a field submits the form — route it through the same anchor so
  // there is a single conversion path. (Native validation has already passed if
  // onSubmit fires.)
  const onSubmit = (e) => {
    e.preventDefault();
    if (waRef.current) waRef.current.click();
  };

  const onEmailInstead = (e) => {
    const f = e.currentTarget.closest('form');
    if (!f.reportValidity()) return;
    const subject = encodeURIComponent('VIYLSA demo request — ' + (form.name.trim() || 'website'));
    const body = encodeURIComponent(composeText(form));
    window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
  };

  return (
    <section id="contact" className="v-contact">
      <div className="v-contact__glow"/>
      <div className="v-wrap v-contact__inner">
        <div className="v-contact__intro" data-reveal>
          <div className="v-eyebrow v-eyebrow--crimson"><IconSparkle size={14}/> Contact</div>
          <h2 className="v-contact__h">
            Let's bring your space <span className="v-serif">online.</span>
          </h2>
          <p className="v-contact__p">
            Tell us about your venue: a university, a property, a hotel, a hall.
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

        <form className="v-contact__form" data-reveal onSubmit={onSubmit}>
          {sent ? (
            <div className="v-contact__sent">
              <span className="v-contact__sent-ic"><IconCheck size={26}/></span>
              <h3>Continue in WhatsApp</h3>
              <p>
                Your message is pre-filled. Just press send and we'll reply
                within one business day. Didn't open? Message us directly on{' '}
                <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a>{' '}
                or email <a href={'mailto:' + EMAIL}>{EMAIL}</a>.
              </p>
            </div>
          ) : (
            <>
              <div className="v-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="fullname" type="text" required placeholder="Your name" value={form.name} onChange={update('name')}/>
              </div>
              <div className="v-field">
                <label htmlFor="c-org">Venue / organisation <span className="v-field__opt">(optional)</span></label>
                <input id="c-org" name="org" type="text" placeholder="University, hotel, property…" value={form.org} onChange={update('org')}/>
              </div>
              <div className="v-field">
                <label htmlFor="c-msg">What would you like to bring online?</label>
                <textarea id="c-msg" name="message" rows="4" required placeholder="Tell us about your space…" value={form.message} onChange={update('message')}></textarea>
              </div>
              <a ref={waRef} href={waHref} target="_blank" rel="noopener" className="v-btn v-btn--primary v-btn--lg v-contact__submit" onClick={onWaClick}>
                <IconWhatsApp size={18}/> Book my demo on WhatsApp
              </a>
              <button type="button" className="v-btn v-btn--ghost-dark v-btn--lg v-contact__submit v-contact__submit--alt" onClick={onEmailInstead}>
                <IconMail size={16}/> Send by email instead
              </button>
              <p className="v-contact__formnote">Opens WhatsApp with your message ready to send. No VIYLSA account or sign-up needed.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
export default Contact;
