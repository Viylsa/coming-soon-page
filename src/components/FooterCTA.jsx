import FooterParticles from './FooterParticles.jsx';
import { IconFacebook, IconLinkedIn, IconInstagram } from '../icons.jsx';

function FooterCTA({ base = '' }) {
  return (
    <footer className="v-footer">

      <div className="v-wrap">
        <FooterParticles/>
        <div className="v-footer__navigation">
          <nav aria-label="Footer navigation">
            <a href={base + '#live-tour'}>Live tour</a>
            <a href={base + '#how'}>How it works</a>
            <a href={base + '#pricing'}>Packages</a>
            <a href="/about.html">About us</a>
            <a href={base + '#contact'}>Contact ↗</a>
          </nav>
        </div>
        <div className="v-footer__bottom">
          <span>© {new Date().getFullYear()} VIYLSA</span>
          <div className="v-footer__legal"><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div>
          <div className="v-footer__social">
            <a href="https://www.facebook.com/profile.php?id=61571004368984" target="_blank" rel="noopener noreferrer" aria-label="VIYLSA on Facebook (opens in a new tab)"><IconFacebook size={18}/></a>
            <a href="https://www.linkedin.com/company/viylsa-tours/" target="_blank" rel="noopener noreferrer" aria-label="VIYLSA on LinkedIn (opens in a new tab)"><IconLinkedIn size={18}/></a>
            <a href="https://www.instagram.com/viylsa_virtualtours" target="_blank" rel="noopener noreferrer" aria-label="VIYLSA on Instagram (opens in a new tab)"><IconInstagram size={18}/></a>
          </div>
          <a href="#top" className="v-footer__totop">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
export default FooterCTA;
