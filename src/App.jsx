import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import ProblemTriad from './components/ProblemTriad.jsx';
import LiveTourPreview from './components/LiveTourPreview.jsx';
import AIGuide from './components/AIGuide.jsx';
import Analytics from './components/Analytics.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import TeamRow from './components/TeamRow.jsx';
import Contact from './components/Contact.jsx';
import FooterCTA from './components/FooterCTA.jsx';

export default function App() {
  return (
    <>
      <a className="v-skip" href="#main">Skip to content</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <ProblemTriad/>
        <LiveTourPreview/>
        <AIGuide/>
        <Analytics/>
        <HowItWorks/>
        <Pricing/>
        <FAQ/>
        <TeamRow/>
        <Contact/>
      </main>
      <FooterCTA/>
    </>
  );
}
