import React from 'react';
import { mountBrandParticles } from '../../public/brand-particles.js';
export default function FooterParticles() {
  const ref = React.useRef(null);
  React.useEffect(() => mountBrandParticles(ref.current), []);
  return <div className="v-footer__particles" role="img" aria-label="VIYLSA"><canvas ref={ref} aria-hidden="true"/></div>;
}
