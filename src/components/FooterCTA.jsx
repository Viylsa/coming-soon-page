function FooterCTA() {
  return (
    <>
      <footer className="v-footer">
        <div className="v-wrap v-footer__inner">
            <div className="v-footer__brand">
            <a href="#top" className="v-footer__brand-link"><img src="/assets/viylsa-mark-white-sm.png" alt="" className="v-footer__mark" width="256" height="247" loading="lazy"/>
            <div>
              <div className="v-footer__name">VIYLSA</div>
              <div className="v-footer__tag">Bringing visits online.</div>
            </div></a>
          </div>
          <div className="v-footer__cols">
            <div>
              <div className="v-footer__col-h">Product</div>
              <a href="#live-tour">Live tour</a><a href="#ai-guide">AI guide</a><a href="#analytics">Analytics</a><a href="#how">How it works</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a>
            </div>
            <div>
              <div className="v-footer__col-h">Company</div>
              <a href="/about.html">About</a><a href="/virtual-tours-islamabad.html">Virtual tours in Islamabad</a><a href="#founding">Founding venues</a><a href="#team">Team</a><a href="#contact">Contact</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a>
            </div>
            <div>
              <div className="v-footer__col-h">Get in touch</div>
              <a href="mailto:viylsavirtualtour@gmail.com">viylsavirtualtour@gmail.com</a>
              <a href="https://www.viylsa.app">www.viylsa.app</a>
            </div>
          </div>
        </div>
        <div className="v-footer__base">
          <span>© {new Date().getFullYear()} VIYLSA. All rights reserved.</span>
          <a href="#top" className="v-footer__totop">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
export default FooterCTA;
