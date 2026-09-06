import React from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import LiveTourPreview from './components/LiveTourPreview.jsx';
import ProblemTriad from './components/ProblemTriad.jsx';
import Analytics from './components/Analytics.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import FooterCTA from './components/FooterCTA.jsx';
import StickyCTA from './components/StickyCTA.jsx';

/* Section order is proof-first: the real NUTECH tour arrives in one short scroll
   (it is the one thing that proves VIYLSA isn't vaporware), THEN the problem it
   solves, THEN "what you get back" — the analytics dashboard with the bilingual
   AI guide folded in as a supporting sub-block (it is a capability of the tour,
   not a co-headline). */
export default function App() {
  // Package of interest (P2-08): Pricing CTAs carry their package into the
  // contact form's enquiry context. Owned here so the choice survives scrolling
  // and is never silently overwritten once the visitor edits the field.
  const [pkg, setPkg] = React.useState('');
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
        <Pricing onChoose={setPkg}/>
        <FAQ/>
        <Contact package={pkg}/>
      </main>
      <FooterCTA/>
      <StickyCTA/>
    </>
  );
}
