// ---------- UTIL ----------
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

// ---------- YEAR ----------
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- MOBILE MENU ----------
const burger = $('.burger');
const mnav = $('#mobilemenu');

if (burger && mnav) {
  const toggleMenu = () => {
    const open = mnav.classList.toggle('show');
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', toggleMenu);

  // Close menu on any mobile link click
  $$('#mobilemenu a').forEach(a =>
    a.addEventListener('click', () => {
      mnav.classList.remove('show');
      burger.setAttribute('aria-expanded', 'false');
    })
  );
}

// ---------- PLACE MOBILE MENU UNDER HEADER ----------
function placeMenu() {
  const h = $('header')?.getBoundingClientRect().height || 64;
  document.documentElement.style.setProperty('--navTop', Math.ceil(h) + 'px');
}
window.addEventListener('load', placeMenu);
window.addEventListener('resize', placeMenu);
window.addEventListener('orientationchange', placeMenu);

// ---------- FILTER CHIPS ----------
const dashboards = $('#dashboards');
if (dashboards) {
  const chips = $$('.chip', dashboards.parentElement);
  const cards = $$('[data-tags]', dashboards);
  chips.forEach(ch =>
    ch.addEventListener('click', () => {
      chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
      ch.setAttribute('aria-pressed', 'true');
      const f = ch.dataset.filter;
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        card.style.display = f === 'all' || tags.includes(f) ? '' : 'none';
      });
    })
  );
}

// ---------- IFRAME PLACEHOLDERS ----------
$$('.thumb').forEach(thumb => {
  const frame = $('iframe', thumb);
  const ph = $('.placeholder', thumb);
  if (frame && /REPLACE_/i.test(frame.src) && ph) {
    frame.style.display = 'none';
    ph.hidden = false;
  }
});

// ---------- IN-APP BROWSER BANNER ----------
(function () {
  const ua = navigator.userAgent || "";
  const isInApp = /Twitter|FBAN|FBAV|Instagram|Line\/|Snapchat|WhatsApp/i.test(ua);
  if (!isInApp) return;

  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    padding: '12px 16px',
    background: 'linear-gradient(135deg,#1e40af,#2563eb)',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px'
  });
  bar.innerHTML = `
    <span>For best experience, open this page in your browser.</span>
    <a href="${location.href}"
       style="background:#fff;color:#1e3a8a;padding:10px 14px;border-radius:10px;text-decoration:none;">
       Open in Browser
    </a>`;
  document.body.appendChild(bar);
  document.body.style.paddingBottom = '64px';
})();
