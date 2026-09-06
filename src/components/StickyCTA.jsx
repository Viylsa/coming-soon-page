import React from 'react';
import { IconArrowRight } from '../icons.jsx';

/* Slim sticky "Book a demo" bar for phones — the dominant, thumb-reachable
   conversion affordance once the hero (with its CTAs) has scrolled away. Hides
   while the Contact section is in view (so it never covers the form) and while
   the mobile menu is open (Nav broadcasts viylsa:menu). Desktop hides it
   entirely (the floating nav CTA is always visible there). */
export default function StickyCTA() {
  const [show, setShow] = React.useState(false);
  const [pastHero, setPastHero] = React.useState(false);
  const [atContact, setAtContact] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector('.v-hero');
    const contact = document.getElementById('contact');
    const observers = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 });
      io.observe(hero); observers.push(io);
    }
    if (contact) {
      const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0 });
      io.observe(contact); observers.push(io);
    }
    const onMenu = (e) => setMenuOpen(!!(e.detail && e.detail.open));
    document.addEventListener('viylsa:menu', onMenu);
    return () => {
      observers.forEach((o) => o.disconnect());
      document.removeEventListener('viylsa:menu', onMenu);
    };
  }, []);

  const visible = pastHero && !atContact && !menuOpen;

  return (
    <a
      href="#contact"
      className={'v-sticky-cta' + (visible ? ' is-shown' : '')}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      Book a demo <IconArrowRight size={16}/>
    </a>
  );
}
