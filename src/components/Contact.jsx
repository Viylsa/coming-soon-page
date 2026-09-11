import React from 'react';
import { IconArrowRight, IconMail, IconMapPin, IconClock, IconCheck, IconWhatsApp, IconInstagram } from '../icons.jsx';

/* WhatsApp number — international format, digits only, no + (for wa.me links). */
const WHATSAPP_NUMBER = '923105968568';
const WHATSAPP_DISPLAY = '+92 310 5968568';
const EMAIL = 'viylsavirtualtour@gmail.com';

/* Contact section — closing call-to-action with a working form.

   The primary action is a REAL anchor whose href is the wa.me deep link, built
   live from the (controlled) field values. That means it works in every browser
   and in-app webview — and even with JS disabled — instead of relying on
   window.open(), which returns null when blocked while the old code still
   flipped to a "sent" success state. No more false success.

   Formspree endpoint — posting here delivers the enquiry to the VIYLSA inbox.
   The <form> carries this as a real action/method too, so with JS disabled or
   the bundle failed the browser posts natively and Formspree renders its own
   confirmation. The fetch below is the enhancement, not the mechanism. */
const FORM_ENDPOINT = 'https://formspree.io/f/mdenloak';
const SUBMIT_TIMEOUT_MS = 15000;

function Contact({ package: selectedPackage = '' }) {
  // idle -> sending -> sent | error
  const [status, setStatus] = React.useState('idle');
  const [form, setForm] = React.useState({ name: '', email: '', org: '', pkg: selectedPackage, budget: '', message: '' });
  const sent = status === 'sent';
  const sentRef = React.useRef(null);
  const abortRef = React.useRef(null);

  // A package chosen in Pricing arrives as enquiry context (P2-08). The field
  // stays visible and editable, and anything the visitor already typed —
  // including their own package choice — is never overwritten.
  React.useEffect(() => {
    if (!selectedPackage) return;
    setForm((f) => (f.pkg ? f : { ...f, pkg: selectedPackage }));
  }, [selectedPackage]);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const composeText = ({ name, org, pkg, budget, message }) =>
    'Hi VIYLSA, I\'d like to book a demo.\n\n' +
    'Name: ' + name.trim() + '\n' +
    (org.trim() ? 'Venue / organisation: ' + org.trim() + '\n' : '') +
    (pkg ? 'Package of interest: ' + pkg + '\n' : '') +
    (budget ? 'Budget range: ' + budget + '\n' : '') +
    '\n' + message.trim();

  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(composeText(form));

  /* Post to Formspree without leaving the page. Every non-confirmation outcome
     goes to 'error' rather than a success screen: the one thing this form must
     never do is tell someone their enquiry arrived when it did not. A timeout
     is an UNCERTAIN outcome — the request may still have landed — so its copy
     says "we couldn't confirm", not "it failed". Values are preserved on every
     error path so a retry doesn't start from a wiped form. */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;   // guard rapid double submission
    const el = e.currentTarget;
    if (!el.reportValidity()) return;
    setStatus('sending');
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(el),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) { setStatus('sent'); return; }
      // Formspree reports validation problems as JSON with an `errors` array.
      let serverNote = '';
      try {
        const data = await res.json();
        if (data && Array.isArray(data.errors) && data.errors.length) {
          serverNote = data.errors.map((er) => er.message).filter(Boolean).join(' ');
        }
      } catch { /* non-JSON rejection: fall through to the generic note */ }
      setServerError(serverNote);
      setStatus('error');
    } catch (err) {
      clearTimeout(timer);
      setServerError(
        err && err.name === 'AbortError'
          ? '__timeout__'
          : ''
      );
      setStatus('error');
    }
  };

  const [serverError, setServerError] = React.useState('');

  // Deliberately move focus to the confirmation heading when the form is
  // replaced (P1-05) so keyboard and screen-reader users land on the result.
  React.useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

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
                <span className="v-contact__item-k">WhatsApp</span>
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
              <span className="v-contact__ic"><IconInstagram size={18}/></span>
              <span>
                <span className="v-contact__item-k">Follow</span>
                {/* Same handles as the footer — one source of truth per platform. */}
                <span className="v-contact__social">
                  <a href="https://www.instagram.com/viylsa_virtualtours" target="_blank" rel="noopener noreferrer" aria-label="VIYLSA on Instagram (opens in a new tab)">Instagram</a>
                  <a href="https://www.facebook.com/profile.php?id=61571004368984" target="_blank" rel="noopener noreferrer" aria-label="VIYLSA on Facebook (opens in a new tab)">Facebook</a>
                  <a href="https://www.linkedin.com/company/viylsa-tours/" target="_blank" rel="noopener noreferrer" aria-label="VIYLSA on LinkedIn (opens in a new tab)">LinkedIn</a>
                </span>
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
          noValidate={false}
        >
          {sent ? (
            <div className="v-contact__sent">
              <span className="v-contact__sent-ic"><IconCheck size={26}/></span>
              {/* Focus target for the hand-off from the replaced form. */}
              <h3 tabIndex={-1} ref={sentRef}>Your enquiry has been received</h3>
              <p>
                Thank you. We'll reply to arrange a demo and talk through your
                space. In a hurry? Message us on{' '}
                <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a>{' '}
                or email <a href={'mailto:' + EMAIL}>{EMAIL}</a>.
              </p>
            </div>
          ) : (
            <>
              <div className="v-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="fullname" type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={update('name')}/>
              </div>
              {/* Named `email` because Formspree uses that field as the reply-to
                  address — without it an enquiry arrives with no way to answer it. */}
              <div className="v-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" autoCapitalize="off" spellCheck="false" placeholder="you@venue.com" value={form.email} onChange={update('email')}/>
              </div>
              <div className="v-field">
                <label htmlFor="c-org">Venue / organisation <span className="v-field__opt">(optional)</span></label>
                <input id="c-org" name="org" type="text" autoComplete="organization" placeholder="University, hotel, property…" value={form.org} onChange={update('org')}/>
              </div>
              <div className="v-field">
                <label htmlFor="c-pkg">Package of interest <span className="v-field__opt">(optional)</span></label>
                <select id="c-pkg" name="package" value={form.pkg} onChange={update('pkg')}>
                  <option value="">Not sure yet</option>
                  <option value="Starter">Starter</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div className="v-field">
                <label htmlFor="c-budget">Budget range <span className="v-field__opt">(optional)</span></label>
                <select id="c-budget" name="budget" value={form.budget} onChange={update('budget')}>
                  <option value="">Prefer not to say</option>
                  <option value="Under Rs 50,000">Under Rs 50,000</option>
                  <option value="Rs 50,000 – 100,000">Rs 50,000 – 100,000</option>
                  <option value="Rs 100,000 – 250,000">Rs 100,000 – 250,000</option>
                  <option value="Rs 250,000+">Rs 250,000+</option>
                </select>
              </div>
              <div className="v-field">
                <label htmlFor="c-msg">What would you like to bring online?</label>
                <textarea id="c-msg" name="message" rows="4" required placeholder="Tell us about your space…" value={form.message} onChange={update('message')}></textarea>
              </div>

              {/* Formspree reads these: a readable subject line in the inbox, and
                  a honeypot that only a bot fills in. */}
              <input type="hidden" name="_subject" value="VIYLSA demo request from the website"/>
              <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: 'none' }}/>

              <button type="submit" className="v-btn v-btn--primary v-btn--lg v-contact__submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                <IconMail size={17}/> {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
              <a href={waHref} target="_blank" rel="noopener" className="v-btn v-btn--ghost-dark v-btn--lg v-contact__submit v-contact__submit--alt">
                <IconWhatsApp size={18}/> Or message us on WhatsApp
              </a>

              <p className="v-contact__formnote v-contact__privacy">
                We reply to arrange a demo and discuss scope. No VIYLSA account
                or sign-up needed. See how enquiries are handled in our{' '}
                <a href="/privacy.html">privacy policy</a>.
              </p>

              {status === 'error' ? (
                <p className="v-contact__formnote v-contact__formnote--error" role="alert">
                  {serverError === '__timeout__'
                    ? <>We couldn't confirm whether your enquiry sent. The form timed out waiting for a response, so it may or may not have arrived. Please check with us on <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a> or email <a href={'mailto:' + EMAIL}>{EMAIL}</a> before sending again.</>
                    : serverError
                      ? <>We couldn't send your enquiry: {serverError}. You can try again, or message us on <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a> or email <a href={'mailto:' + EMAIL}>{EMAIL}</a>.</>
                      : <>We couldn't send your enquiry just now. Your message is still here, so you can try again. You can also reach us on <a href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a> or email <a href={'mailto:' + EMAIL}>{EMAIL}</a>.</>}
                </p>
              ) : null}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
export default Contact;
