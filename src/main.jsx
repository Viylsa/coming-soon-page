import React from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts (same-origin woff2, font-display: swap) — replaces the
// render-blocking cross-origin Google Fonts request. Latin subsets download on
// demand via unicode-range; Urdu text falls back to the system Arabic font, as
// it always did. Upright axes only — Geist italic was never loaded.
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
// Self-hosted Urdu (Nastaliq) for the bilingual AI-guide demo — replaces the
// inconsistent system Arabic fallback (Segoe UI on Windows). Arabic subset only,
// font-display:swap; the woff2 only downloads when a visitor switches the demo
// to Urdu (no Nastaliq-styled glyphs render until then).
import '@fontsource/noto-nastaliq-urdu/arabic-400.css';
import './styles/colors_and_type.css';
import './styles/styles.css';
import './motion.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App/>);
