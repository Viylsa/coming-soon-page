const { IconArrowRight, IconSparkle } = window.VIcons;

function FooterCTA() {
  return (
    <>
      <section id="contact" className="v-cta">
        <div className="v-cta__glow"/>
        <div className="v-wrap v-cta__inner">
          <div className="v-eyebrow v-eyebrow--crimson"><IconSparkle size={14}/> The trojan horse</div>
          <h2 className="v-cta__h">
            Pick a landmark.<br/>
            <span className="v-serif">We'll digitize it for free.</span>
          </h2>
          <p className="v-cta__p">
            One free virtual capture of a Pakistani landmark per quarter — yours
            to embed, ours for case studies. Tell us which one.
          </p>
          <div className="v-cta__row">
            <a href="mailto:viylsavirtualtour@gmail.com" className="v-btn v-btn--primary v-btn--lg">
              Nominate a landmark <IconArrowRight size={18}/>
            </a>
            <a href="mailto:viylsavirtualtour@gmail.com" className="v-btn v-btn--ghost-dark v-btn--lg">Or book a 10-min demo</a>
          </div>
        </div>
      </section>
      <footer className="v-footer">
        <div className="v-wrap v-footer__inner">
            <div className="v-footer__brand">
            <a href="#top" className="v-footer__brand-link"><img src="assets/viylsa-mark-white.png" alt="" className="v-footer__mark"/>
            <div>
              <div className="v-footer__name">VIYLSA</div>
              <div className="v-footer__tag">Bringing visits online.</div>
            </div></a>
          </div>
          <div className="v-footer__cols">
            <div>
              <div className="v-footer__col-h">Product</div>
              <a href="#tours">Tours</a><a href="#live-tour">AI Guide</a><a href="#how">How it works</a><a href="#pricing">Pricing</a>
            </div>
            <div>
              <div className="v-footer__col-h">Company</div>
              <a href="#team">Team</a><a href="#pricing">Packages</a><a href="#contact">Contact</a>
            </div>
            <div>
              <div className="v-footer__col-h">Get in touch</div>
              <a href="mailto:viylsavirtualtour@gmail.com">viylsavirtualtour@gmail.com</a>
              <a href="https://www.viylsa.app">www.viylsa.app</a>
            </div>
          </div>
        </div>
        <div className="v-footer__base">
          <span>© 2026 VIYLSA. All rights reserved.</span>
          <a href="#top" className="v-footer__totop">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
window.FooterCTA = FooterCTA;
