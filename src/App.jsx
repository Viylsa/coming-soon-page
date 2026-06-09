import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import ProblemTriad from './components/ProblemTriad.jsx';
import LiveTourPreview from './components/LiveTourPreview.jsx';
import AIGuide from './components/AIGuide.jsx';
import Analytics from './components/Analytics.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import TourGallery from './components/TourGallery.jsx';
import Pricing from './components/Pricing.jsx';
import TeamRow from './components/TeamRow.jsx';
import Contact from './components/Contact.jsx';
import FooterCTA from './components/FooterCTA.jsx';

export default function App() {
  return (
    <>
      <Nav/>
      <Hero/>
      <ProblemTriad/>
      <LiveTourPreview/>
      <AIGuide/>
      <Analytics/>
      <HowItWorks/>
      <TourGallery/>
      <Pricing/>
      <TeamRow/>
      <Contact/>
      <FooterCTA/>
    </>
  );
}
