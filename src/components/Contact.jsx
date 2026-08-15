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
/* Formspree endpoint — posting here delivers the enquiry to the VIYLSA inbox.
   The <form> carries this as a real action/method too, so with JS disabled or
   the bundle failed the browser posts natively and Formspree renders its own
   confirmation. The fetch below is the enhancement, not the mechanism. */
const FORM_ENDPOINT = 'https://formspree.io/f/mdenloak';

function Contact() {
  // idle -> sending -> sent | error
  const [status, setStatus] = React.useState('idle');
  const [form, setForm] = React.useState({ name: '', email: '', org: '', message: '' });
  const sent = status === 'sent';

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const composeText = ({ name, org, message }) =>
    'Hi VIYLSA, I\'d like to book a demo.\n\n' +
    'Name: ' + name.trim() + '\n' +
    (org.trim() ? 'Venue / organisation: ' + org.trim() + '\n' : '') +
    '\n' + message.trim();

  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(composeText(form));

  /* Post to Formspree without leaving the page. On a network failure the state
     goes to 'error' rather than a success screen: the one thing this form must
     never do is tell someone their enquiry arrived when it did not. The error
     state hands them WhatsApp and the mail address instead. */
  const onSubmit = async (e) => {
    e.preventDefault();
    const el = e.currentTarget;
    if (!el.reportValidity()) return;
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(el),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
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
          <h2 className="v-contact__h">
            Let's bring your space<br/><span className="v-serif">online.</span>
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

        <form
          className="v-contact__form"
          data-reveal
          action={FORM_ENDPOINT}
          method="POST"
          onSubmit={onSubmit}
        >
          {sent ? (
            <div className="v-contact__sent">
              <span className="v-contact__sent-ic"><IconCheck size={26}/></span>
              <h3>Thanks — that's with us</h3>
              <p>
                Your enquiry is in our inbox and we'll reply within one business
                day. In a hurry? Message us on{' '}
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
              {/* Named `email` because Formspree uses that field as the reply-to
                  address — without it an enquiry arrives with no way to answer it. */}
              <div className="v-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" required placeholder="you@venue.com" value={form.email} onChange={update('email')}/>
              </div>
              <div className="v-field">
                <label htmlFor="c-org">Venue / organisation <span className="v-field__opt">(optional)</span></label>
                <input id="c-org" name="org" type="text" placeholder="University, hotel, property…" value={form.org} onChange={update('org')}/>
              </div>
              <div className="v-field">
                <label htmlFor="c-msg">What would you like to bring online?</label>
                <textarea id="c-msg" name="message" rows="4" required placeholder="Tell us about your space…" value={form.message} onChange={update('message')}></textarea>
              </div>

              {/* Formspree reads these: a readable subject line in the inbox, and
                  a honeypot that only a bot fills in. */}
              <input type="hidden" name="_subject" value="VIYLSA demo request from the website"/>
              <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: 'none' }}/>

              <button type="submit" className="v-btn v-btn--primary v-btn--lg v-contact__submit" disabled={status === 'sending'}>
                <IconMail size={17}/> {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
              <a href={waHref} target="_blank" rel="noopener" className="v-btn v-btn--ghost-dark v-btn--lg v-contact__submit v-contact__submit--alt">
                <IconWhatsApp size={18}/> Or message us on WhatsApp
              </a>

              {status === 'error' ? (
                <p className="v-contact__formnote v-contact__formnote--error" role="alert">
                  That didn't send — the connection dropped somewhere. Please
                  message us on <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a>{' '}
                  or email <a href={'mailto:' + EMAIL}>{EMAIL}</a> and we'll pick it up straight away.
                </p>
              ) : (
                <p className="v-contact__formnote">Goes straight to our inbox — we reply within one business day. No VIYLSA account or sign-up needed.</p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
export default Contact;
