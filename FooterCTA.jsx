function FooterCTA() {
  return (
    <>
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
