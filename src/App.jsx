import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import LiveTourPreview from './components/LiveTourPreview.jsx';
import ProblemTriad from './components/ProblemTriad.jsx';
import Analytics from './components/Analytics.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import TeamRow from './components/TeamRow.jsx';
import Contact from './components/Contact.jsx';
import FooterCTA from './components/FooterCTA.jsx';
import StickyCTA from './components/StickyCTA.jsx';

/* Section order is proof-first: the real client tour arrives in one short scroll
   (it is the one thing that proves VIYLSA isn't vaporware), THEN the problem it
   solves, THEN "what you get back" — the analytics dashboard with the bilingual
   AI guide folded in as a supporting sub-block (it is a capability of the tour,
   not a co-headline). */
export default function App() {
  return (
    <>
      <a className="v-skip" href="#main">Skip to content</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <LiveTourPreview/>
        <ProblemTriad/>
        <Analytics/>
        <HowItWorks/>
        <Pricing/>
        <FAQ/>
        <TeamRow/>
        <Contact/>
      </main>
      <FooterCTA/>
      <StickyCTA/>
    </>
  );
}
