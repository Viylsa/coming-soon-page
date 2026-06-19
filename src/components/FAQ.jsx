/* FAQ — answers the questions institutional buyers ask before they'll book
   a call. Native <details>/<summary>: accessible, keyboard-friendly, no JS. */

export const FAQ_ITEMS = [
  {
    q: 'How much does a tour cost?',
    a: 'Every venue is quoted to its size and scope, with a fixed price agreed before we shoot. Tell us about your space and we\'ll send a quote, usually within one business day.',
  },
  {
    q: 'How long does the shoot take?',
    a: 'Most venues are captured in a single afternoon. You don\'t need to close; we work around your opening hours and shoot the spaces you choose.',
  },
  {
    q: 'What do we need to prepare?',
    a: 'Nothing technical. Tidy the spaces you want shown, and share the documents you\'d like the AI guide to learn from: a floor plan, your FAQ, pricing or brochures.',
  },
  {
    q: 'Who hosts the tour, and how do we share it?',
    a: 'VIYLSA hosts everything. You get a shareable link that works on WhatsApp, email and social media, plus a one-line embed for your own website. Hosting and maintenance are included with every package.',
  },
  {
    q: 'Who owns the visitor data, and is it handled responsibly?',
    a: 'Your tour\'s analytics and captured enquiries belong to you. The AI guide answers only from documents you approve, visitors are never required to identify themselves, and you can read our full approach on the privacy page.',
  },
  {
    q: 'What happens when the included hosting ends?',
    a: 'A simple renewal, agreed up front, with no surprises. Your tour stays live throughout, and the photography we capture is yours to keep.',
  },
  {
    q: 'Can the AI guide give a wrong answer?',
    a: 'The guide only answers from the documents you approve. When it isn\'t sure, it passes the visitor to your contact details instead of guessing, and every conversation is visible in your dashboard.',
  },
  {
    q: 'Which languages does the AI guide speak?',
    a: 'English and Urdu, switchable by the visitor mid-conversation. More languages are available on request for Enterprise venues.',
  },
];

function FAQ() {
  return (
    <section id="faq" className="v-section">
      <div className="v-wrap v-faq__wrap">
        <div data-reveal>
          <div className="v-eyebrow">FAQ</div>
          <h2 className="v-h2">Before you <span className="v-serif">book the call.</span></h2>
        </div>
        <div className="v-faq" data-reveal>
          {FAQ_ITEMS.map(({ q, a }) => (
            <details className="v-faq__item" key={q}>
              <summary className="v-faq__q">
                {q}
                <span className="v-faq__chev" aria-hidden="true">+</span>
              </summary>
              <p className="v-faq__a">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FAQ;
