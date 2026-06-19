import React from 'react';
import { IconArrowRight } from '../icons.jsx';

/* Slim sticky "Book a demo" bar for phones — the dominant, thumb-reachable
   conversion affordance once the hero (with its CTAs) has scrolled away. Hides
   again while the Contact section is in view so it never covers the form.
   Desktop hides it entirely (the floating nav CTA is always visible there). */
export default function StickyCTA() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector('.v-hero');
    const contact = document.getElementById('contact');
    let pastHero = false, atContact = false;
    const update = () => setShow(pastHero && !atContact);
    const observers = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; update(); }, { threshold: 0 });
      io.observe(hero); observers.push(io);
    }
    if (contact) {
      const io = new IntersectionObserver(([e]) => { atContact = e.isIntersecting; update(); }, { threshold: 0 });
      io.observe(contact); observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <a href="#contact" className={'v-sticky-cta' + (show ? ' is-shown' : '')} aria-hidden={!show} tabIndex={show ? 0 : -1}>
      Book a demo <IconArrowRight size={16}/>
    </a>
  );
}
