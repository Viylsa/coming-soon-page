/* Entry for /about.html.
 *
 * Same stack as the homepage — the whole point of making About a React entry
 * rather than another hand-written HTML page is that it reuses the real Nav,
 * the real footer and the real design tokens, so the two pages cannot drift.
 * Vite code-splits the shared chunks; prerender.mjs snapshots this route the
 * same way it does the homepage, so it stays crawlable without JS.
 */
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@fontsource-variable/playfair-display/wght.css';
import '@fontsource-variable/playfair-display/wght-italic.css';

import './styles/colors_and_type.css';
import './styles/styles.css';
import './styles/about.css';
import './motion.js';
import About from './pages/About.jsx';

createRoot(document.getElementById('root')).render(<About/>);
