/* Temporary QA harness: exercises the interaction matrix from the plan against
 * the built site. Usage: node scripts/qa.mjs
 */
import { preview } from 'vite';
import puppeteer from 'puppeteer';

const results = [];
const check = (name, ok, note = '') => {
  results.push({ name, ok, note });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${note ? ' — ' + note : ''}`);
};
const section = async (name, fn) => {
  try { await fn(); } catch (e) { check(name + ' (section crashed)', false, String(e).slice(0, 200)); }
};

const server = await preview({ preview: { port: 4319, strictPort: true } });
const origin = 'http://localhost:4319';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  /* ── 1. No-JS prerendered homepage: content must be visible ── */
  await section('no-JS prerender', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setJavaScriptEnabled(false);
    await page.goto(origin + '/', { waitUntil: 'load', timeout: 60000 });
    const probe = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const poster = document.querySelector('.v-tdemo__poster');
      const pricing = document.querySelector('#pricing');
      const visible = (el) => {
        if (!el) return false;
        const cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden';
      };
      return {
        h1: h1 && h1.textContent.trim(),
        h1Visible: visible(h1),
        pricingVisible: visible(pricing),
        posterVisible: visible(poster),
        aiVisible: visible(document.querySelector('.v-ai__chat')),
      };
    });
    check('no-JS: h1 prerendered & visible', probe.h1Visible && /Bringing/.test(probe.h1), probe.h1);
    check('no-JS: pricing visible', probe.pricingVisible);
    check('no-JS: tour poster visible', probe.posterVisible);
    check('no-JS: AI demo card visible', probe.aiVisible);
    // no-JS: iframe must NOT be present (poster until activation)
    const noIframe = await page.evaluate(() => !document.querySelector('.v-tdemo__frame'));
    check('no-JS: no tour iframe in static HTML', noIframe);
    await page.close();
  });

  /* ── 2. Mobile menu: closed not focusable, open traversable, Escape restores ── */
  await section('mobile menu', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(800);

    const closedProbe = await page.evaluate(() => {
      const drawer = document.querySelector('#v-nav-drawer');
      const inert = drawer.hasAttribute('inert');
      const ariaHidden = drawer.getAttribute('aria-hidden') === 'true';
      const trigger = document.querySelector('.v-nav__menu');
      return { inert, ariaHidden, hasAriaControls: trigger.getAttribute('aria-controls') === 'v-nav-drawer' };
    });
    check('menu closed: inert + aria-hidden + aria-controls',
      closedProbe.inert && closedProbe.ariaHidden && closedProbe.hasAriaControls);

    // Open with keyboard
    await page.focus('.v-nav__menu');
    await page.keyboard.press('Enter');
    await sleep(400);
    const openProbe = await page.evaluate(() => {
      const drawer = document.querySelector('#v-nav-drawer');
      return {
        open: drawer.classList.contains('v-nav__drawer--open'),
        inertGone: !drawer.hasAttribute('inert'),
        ariaHiddenGone: drawer.getAttribute('aria-hidden') === 'false',
        bodyLocked: document.body.style.overflow === 'hidden',
        expanded: document.querySelector('.v-nav__menu').getAttribute('aria-expanded') === 'true',
        focusInDrawer: drawer.contains(document.activeElement),
      };
    });
    check('menu open: visible, focusable, expanded, body locked, focus inside',
      openProbe.open && openProbe.inertGone && openProbe.ariaHiddenGone && openProbe.bodyLocked && openProbe.expanded && openProbe.focusInDrawer);

    // Tab into first link
    await page.keyboard.press('Tab');
    const firstLinkFocused = await page.evaluate(() =>
      document.activeElement.closest('#v-nav-drawer') !== null);
    check('menu: Tab moves focus into the drawer links', firstLinkFocused);

    // Escape closes and restores focus to trigger
    await page.keyboard.press('Escape');
    await sleep(400);
    const escProbe = await page.evaluate(() => ({
      closed: !document.querySelector('#v-nav-drawer').classList.contains('v-nav__drawer--open'),
      unlocked: document.body.style.overflow === '',
      focusOnTrigger: document.activeElement.classList?.contains('v-nav__menu'),
    }));
    check('menu: Escape closes, unlocks scroll, restores trigger focus',
      escProbe.closed && escProbe.unlocked && escProbe.focusOnTrigger);

    // Open again, click a destination link: focus should NOT return to trigger
    await page.focus('.v-nav__menu');
    await page.keyboard.press('Enter');
    await sleep(300);
    await page.evaluate(() => document.querySelector('#v-nav-drawer a[href="#pricing"]').focus());
    await page.keyboard.press('Enter');
    // CSS smooth-scrolls a long distance; give the animation time to finish.
    await sleep(2600);
    const navProbe = await page.evaluate(() => ({
      drawerClosed: !document.querySelector('#v-nav-drawer').classList.contains('v-nav__drawer--open'),
      unlocked: document.body.style.overflow === '',
      nearPricing: Math.abs(document.getElementById('pricing').getBoundingClientRect().top) < window.innerHeight,
    }));
    check('menu: destination link closes menu, page unlocked, landed near #pricing',
      navProbe.drawerClosed && navProbe.unlocked && navProbe.nearPricing);

    // Resize above 880px closes the drawer
    await page.setViewport({ width: 1100, height: 800 });
    await sleep(300);
    const resizeProbe = await page.evaluate(() => ({
      closed: !document.querySelector('#v-nav-drawer').classList.contains('v-nav__drawer--open'),
      unlocked: document.body.style.overflow === '',
    }));
    check('menu: resizing above 880px closes drawer and releases lock', resizeProbe.closed && resizeProbe.unlocked);
    await page.close();
  });

  /* ── 3. Contact form mocked states ── */
  await section('contact form mocks', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setRequestInterception(true);
    let mode = 'success';
    page.on('request', (req) => {
      if (req.url().includes('formspree.io')) {
        // CORS headers are required: the form posts cross-origin, so a mock
        // response without them is blocked by the browser and never reaches the
        // app (that produced false failures, not app bugs).
        const cors = { 'access-control-allow-origin': '*', 'content-type': 'application/json' };
        if (mode === 'success') {
          req.respond({ status: 200, headers: cors, body: '{"ok":true}' });
        } else if (mode === 'reject') {
          req.respond({ status: 400, headers: cors, body: '{"ok":false,"errors":[{"message":"Email domain is not allowed."}]}' });
        } else if (mode === 'timeout') {
          // never respond → client AbortController fires
        } else {
          req.abort('internetdisconnected');
        }
      } else if (req.url().includes('razee4315.github.io')) {
        req.abort('internetdisconnected');
      } else {
        req.continue();
      }
    });
    await page.goto(origin + '/#contact', { waitUntil: 'networkidle2' });
    await sleep(600);

    // Invalid email blocked by native validation
    await page.type('#c-name', 'Test Person');
    await page.type('#c-email', 'not-an-email');
    await page.type('#c-msg', 'A test space');
    await page.click('.v-contact__submit');
    await sleep(300);
    const validity = await page.evaluate(() => document.querySelector('#c-email').matches(':invalid'));
    check('contact: native validation blocks invalid email', validity);

    // Fix email, test rejection path preserves values
    await page.evaluate(() => { document.querySelector('#c-email').value = ''; });
    await page.type('#c-email', 'test@venue.com');
    mode = 'reject';
    await page.click('.v-contact__submit');
    await sleep(600);
    const rejectProbe = await page.evaluate(() => ({
      errorShown: !!document.querySelector('.v-contact__formnote--error'),
      errorText: document.querySelector('.v-contact__formnote--error')?.textContent || '',
      nameKept: document.querySelector('#c-name').value === 'Test Person',
      stillIdleish: !document.querySelector('.v-contact__sent'),
    }));
    check('contact: server rejection shows server message, keeps values',
      rejectProbe.errorShown && /Email domain/.test(rejectProbe.errorText) && rejectProbe.nameKept && rejectProbe.stillIdleish);

    // Network failure
    mode = 'fail';
    await page.click('.v-contact__submit');
    await sleep(600);
    const failProbe = await page.evaluate(() => {
      const el = document.querySelector('.v-contact__formnote--error');
      return el && /couldn't send/.test(el.textContent) && !/connection dropped/.test(el.textContent);
    });
    check('contact: network failure shows generic honest message', !!failProbe);

    // Timeout path (no response)
    mode = 'timeout';
    await page.click('.v-contact__submit');
    await sleep(16500);
    const timeoutProbe = await page.evaluate(() => {
      const el = document.querySelector('.v-contact__formnote--error');
      return el && /couldn't confirm/.test(el.textContent);
    });
    check('contact: timeout says confirmation not obtained (15s)', !!timeoutProbe);

    // Success: focus lands on confirmation heading, honest copy
    mode = 'success';
    await page.click('.v-contact__submit');
    await sleep(800);
    const sentProbe = await page.evaluate(() => ({
      sent: !!document.querySelector('.v-contact__sent'),
      focusOnHeading: document.activeElement?.matches('.v-contact__sent h3'),
      honestCopy: /has been received/.test(document.querySelector('.v-contact__sent h3')?.textContent || ''),
      noInboxClaim: !/in our inbox/.test(document.querySelector('.v-contact__sent')?.textContent || ''),
    }));
    check('contact: success replaces form, focus on heading, honest copy',
      sentProbe.sent && sentProbe.focusOnHeading && sentProbe.honestCopy && sentProbe.noInboxClaim);
    await page.close();
  });

  /* ── 4. Package selection carries into the form ── */
  await section('package selection', async () => {
    const page = await browser.newPage();
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(500);
    await page.evaluate(() => document.querySelector('a[aria-label="Get a quote for Enterprise"]').click());
    await sleep(900);
    const pkgProbe = await page.evaluate(() => ({
      select: document.querySelector('#c-pkg').value,
      waText: decodeURIComponent(document.querySelector('a.v-contact__submit--alt').href),
    }));
    check('packages: Enterprise choice preselects form (editable) and WhatsApp text',
      pkgProbe.select === 'Enterprise' && /Enterprise/.test(pkgProbe.waText));
    // Visitor can change it
    await page.select('#c-pkg', 'Starter');
    const changed = await page.evaluate(() => document.querySelector('#c-pkg').value);
    check('packages: selection remains editable', changed === 'Starter');
    await page.close();
  });

  /* ── 5. Tour lifecycle: idle → activate → timeout (tour server unresponsive) → retry ── */
  await section('tour lifecycle', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setRequestInterception(true);
    // Hold the tour request open (never respond): the iframe never fires load,
    // so the component's own timeout path is exercised deterministically.
    page.on('request', (req) => { req.url().includes('razee4315.github.io') || req.continue(); });
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(500);
    const idle = await page.evaluate(() => !!document.querySelector('.v-tdemo__poster'));
    check('tour: idle shows poster, no iframe', idle && !(await page.$('.v-tdemo__frame')));
    await page.evaluate(() => document.querySelector('.v-tdemo__play').click());
    const loading = await page.evaluate(() => !!document.querySelector('.v-tdemo__loading'));
    check('tour: activation shows loading state', loading);
    await sleep(15500);
    const errored = await page.evaluate(() => ({
      fallback: !!document.querySelector('.v-tdemo__fallback'),
      retry: !!document.querySelector('.v-tdemo__fallback button'),
      newTab: [...document.querySelectorAll('.v-tdemo__fallback a')].some(a => a.target === '_blank'),
    }));
    check('tour: failure state offers retry + new-tab link', errored.fallback && errored.retry && errored.newTab);
    // Retry re-creates the iframe
    await page.evaluate(() => document.querySelector('.v-tdemo__fallback button')?.click());
    await sleep(400);
    const retried = await page.evaluate(() => !!document.querySelector('.v-tdemo__loading'));
    check('tour: retry restarts loading', retried);
    await page.close();
  });

  /* ── 6. Direct hash + history ── */
  await section('deep link & history', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(origin + '/#pricing', { waitUntil: 'networkidle2' });
    await sleep(1200);
    const deepLink = await page.evaluate(() => {
      const r = document.getElementById('pricing').getBoundingClientRect();
      return { top: r.top, hash: location.hash, vh: window.innerHeight };
    });
    check('deep link #pricing lands with heading below the floating nav',
      deepLink.hash === '#pricing' && deepLink.top > 40 && deepLink.top < deepLink.vh * 0.5,
      'top=' + Math.round(deepLink.top));

    // click Contact, then Back should return to #pricing
    await page.evaluate(() => document.querySelector('.v-nav__cta a').click());
    await sleep(1000);
    await page.goBack();
    await sleep(1000);
    const backProbe = await page.evaluate(() => ({
      hash: location.hash,
      top: document.getElementById('pricing').getBoundingClientRect().top,
      vh: window.innerHeight,
    }));
    check('history: Back from #contact returns to #pricing in view',
      backProbe.hash === '#pricing' && backProbe.top > -100 && backProbe.top < backProbe.vh * 0.6,
      'top=' + Math.round(backProbe.top));
    await page.close();
  });

  /* ── 7. Reduced motion: reveals visible, stacking off, sticky CTA inert ── */
  await section('reduced motion', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(800);
    const rm = await page.evaluate(() => ({
      stackOff: !document.documentElement.classList.contains('v-stack'),
      hiddenReveals: [...document.querySelectorAll('[data-reveal]')].filter(el => parseFloat(getComputedStyle(el).opacity) < 0.9).length,
    }));
    check('reduced motion: stacking disabled, nothing stuck hidden',
      rm.stackOff && rm.hiddenReveals === 0, JSON.stringify(rm));
    // preference change while open
    await page.emulateMediaFeatures([]);
    await sleep(600);
    const after = await page.evaluate(() => ({
      stackOn: document.documentElement.classList.contains('v-stack'),
      stillVisible: [...document.querySelectorAll('[data-reveal]')].filter(el => parseFloat(getComputedStyle(el).opacity) < 0.9).length === 0,
    }));
    check('reduced motion: enabling motion later keeps all content visible', after.stillVisible);
    await page.close();
  });

  /* ── 8. Mobile: no horizontal overflow at 320px, sticky CTA behaviour ── */
  await section('320px overflow & sticky CTA', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 320, height: 568, isMobile: true });
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(800);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return { scrollW: doc.scrollWidth, innerW: window.innerWidth };
    });
    check('320px: no horizontal page overflow', overflow.scrollW <= overflow.innerW + 1, `scrollW=${overflow.scrollW}`);
    // sticky CTA appears after hero, hides at contact
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(800);
    const atBottom = await page.evaluate(() => {
      const el = document.querySelector('.v-sticky-cta');
      const cs = getComputedStyle(el);
      return { shown: el.classList.contains('is-shown'), pe: cs.pointerEvents, ariaHidden: el.getAttribute('aria-hidden') };
    });
    check('sticky CTA: hidden at contact with pointer-events none + aria-hidden',
      !atBottom.shown && atBottom.pe === 'none' && atBottom.ariaHidden === 'true');
    await page.close();
  });

  /* ── 9. Fragment destinations all resolve (both routes) ── */
  await section('fragment resolution', async () => {
    const page = await browser.newPage();
    for (const route of ['/', '/about.html']) {
      await page.goto(origin + route, { waitUntil: 'networkidle2' });
      const dead = await page.evaluate(() =>
        [...document.querySelectorAll('a[href^="#"], a[href*="#"]')]
          .map(a => {
            try { return new URL(a.href, location.href); } catch { return null; }
          })
          .filter(u => u && u.origin === location.origin && u.hash)
          .filter(u => u.pathname === location.pathname && !document.getElementById(u.hash.slice(1)))
          .map(u => u.hash)
      );
      check(`fragments resolve on ${route}`, dead.length === 0, dead.join(','));
    }
    // cross-page: /about.html → /#live-tour exists on home
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    const crossOk = await page.evaluate(() =>
      ['live-tour', 'analytics', 'how', 'pricing', 'faq', 'contact', 'founding', 'top', 'main']
        .every(id => !!document.getElementById(id)));
    check('home: all linked fragment targets exist', crossOk);
    await page.close();
  });

  /* ── 10. Console error sweep over all routes ── */
  await section('console sweep', async () => {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const route of ['/', '/about.html', '/privacy.html', '/terms.html', '/missing-page']) {
      await page.goto(origin + route, { waitUntil: 'networkidle2' }).catch(() => {});
    }
    const realErrors = errors.filter(e => !/net::ERR_NAME_NOT_RESOLVED|razee4315|favicon/.test(e));
    check('no unexpected console errors across routes', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));
    await page.close();
  });

  /* ── 11. AI guide: honest labels, manual control, EN/UR switch ── */
  await section('AI guide', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(origin + '/', { waitUntil: 'networkidle2' });
    await sleep(500);
    const ai = await page.evaluate(() => {
      const card = document.querySelector('.v-ai__chat');
      return {
        disclaimer: /Scripted example · no message is sent/.test(card.querySelector('.v-ai__sub').textContent),
        nextBtn: !!card.querySelector('.v-ai__next'),
        enName: card.querySelector('.v-ai__lang').getAttribute('aria-pressed') === 'true',
      };
    });
    check('AI guide: persistent scripted-example disclaimer + Next control', ai.disclaimer && ai.nextBtn && ai.enName);
    await page.evaluate(() => document.querySelector('.v-ai__next').click());
    await sleep(300);
    const advanced = await page.evaluate(() => document.querySelectorAll('.v-ai__bubble').length);
    check('AI guide: Next example advances manually', advanced >= 2);
    // Switch to Urdu: dir/lang on bubbles, no status implying a sent message
    await page.evaluate(() => [...document.querySelectorAll('.v-ai__lang')].find(b => b.textContent === 'اردو').click());
    await sleep(1700);
    const ur = await page.evaluate(() => {
      const bubbles = [...document.querySelectorAll('.v-ai__bubble')];
      return {
        rtl: bubbles.every(b => b.getAttribute('dir') === 'rtl' && b.getAttribute('lang') === 'ur'),
        leadGone: !document.querySelector('.v-ai__lead'),
      };
    });
    check('AI guide: Urdu bubbles carry lang/dir; no fake enquiry status line',
      ur.rtl && ur.leadGone);
    // No em dashes anywhere in rendered text
    const dashes = await page.evaluate(() =>
      document.body.innerText.includes('\u2014'));
    check('homepage: no em dashes in rendered text', !dashes);
    await page.close();
  });
} finally {
  if (browser) await browser.close();
  if (server?.httpServer) await server.httpServer.close();
  process.exit(0);
}
