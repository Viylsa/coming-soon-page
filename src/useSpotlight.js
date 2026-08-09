import React from 'react';

/* Cursor-following grain spotlight.
 *
 * Shared by the homepage hero and the About hero so the two page openings
 * behave identically and cannot drift. Returns a ref for the element that owns
 * the --mx/--my custom properties, and the mousemove handler to put on it. The
 * reveal itself is pure CSS (.v-hero__grain-spot), gated behind
 * (hover: hover) and (pointer: fine).
 *
 * Two deliberate constraints, both inherited from the original hero:
 *   - Fine pointers only. Touch never fires this, so no work is done on mobile.
 *   - One write per animation frame. Writing two CSS vars and reading layout on
 *     every mousemove event is an INP risk, so events only record coordinates
 *     and a single rAF does the DOM work.
 */
export default function useSpotlight() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const pos = React.useRef({ x: 0, y: 0 });
  const fine = React.useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );

  const onMouseMove = (e) => {
    if (!fine.current) return;
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${pos.current.x - rect.left}px`);
      el.style.setProperty('--my', `${pos.current.y - rect.top}px`);
    });
  };

  // Drop a frame still in flight when the hero unmounts.
  React.useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  return { ref, onMouseMove };
}
