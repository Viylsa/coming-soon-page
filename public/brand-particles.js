export function mountBrandParticles(canvas, { label = 'VIYLSA', showLogo = true } = {}) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1000, y: -1000 };
    let particles = [], frame = 0, width = 0, height = 0, disposed = false;
    const logo = new Image();
    logo.src = '/assets/viylsa-mark-white-sm.png';
    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      let moving = false;
      for (const p of particles) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (!media.matches && distance < 65) {
          const force = (1 - distance / 65) * 1.15;
          p.vx += dx / (distance || 1) * force;
          p.vy += dy / (distance || 1) * force - force * .25;
        }
        p.vx = (p.vx + (p.ox - p.x) * .012) * .84;
        p.vy = (p.vy + (p.oy - p.y) * .012) * .84;
        p.x += p.vx; p.y += p.vy;
        moving ||= Math.abs(p.vx) + Math.abs(p.vy) > .015;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 161, 178, ${p.alpha})`; ctx.fill();
      }
      if (!media.matches && (moving || pointer.x > -100)) frame = requestAnimationFrame(draw);
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(draw); };
    const build = () => {
      if (disposed) return;
      width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mask = document.createElement('canvas'); mask.width = width; mask.height = height;
      const m = mask.getContext('2d');
      const font = getComputedStyle(canvas).fontFamily;
      let size = Math.min(width * .205, 230);
      m.font = `500 ${size}px ${font}`;
      const markSize = showLogo ? size * .66 : 0, gap = showLogo ? (showLogo ? size * .18 : 0) : 0;
      const total = m.measureText(label).width + markSize + gap;
      if (total > width * .9) size *= width * .9 / total;
      m.font = `500 ${size}px ${font}`;
      const mark = showLogo ? size * .66 : 0;
      const left = (width - m.measureText(label).width - mark - (showLogo ? size * .18 : 0)) / 2;
      m.fillStyle = 'white'; m.textBaseline = 'middle';
      if (showLogo && logo.complete && logo.naturalWidth) m.drawImage(logo, left, (height - mark) / 2, mark, mark);
      m.fillText(label, left + mark + (showLogo ? size * .18 : 0), height / 2);
      const pixels = m.getImageData(0, 0, width, height).data;
      const step = width < 600 ? 2.4 : 3.2;
      particles = [];
      for (let y = 0; y < height; y += step) for (let x = 0; x < width; x += step) {
        if (pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] > 110)
          particles.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, radius: width < 600 ? .8 : 1.15, alpha: .24 + Math.random() * .18 });
      }
      schedule();
    };
    const move = e => { if (e.pointerType === 'touch' || media.matches) return; const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; schedule(); };
    const leave = () => { pointer.x = pointer.y = -1000; schedule(); };
    const reduce = () => { leave(); build(); };
    canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', leave);
    media.addEventListener('change', reduce);
    const observer = new ResizeObserver(build); observer.observe(canvas);
    logo.onload = build; document.fonts.ready.then(build); build();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); logo.onload = null; canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); media.removeEventListener('change', reduce); };
}
