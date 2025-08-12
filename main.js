// UTIL
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

// YEAR
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// BANNER HEIGHT SYNC
(function(){
  const b = $('.progress-banner');
  const setH = () => {
    const h = Math.ceil((b?.getBoundingClientRect().height) || 36);
    document.documentElement.style.setProperty('--bannerH', h + 'px');
  };
  setH();
  window.addEventListener('resize', setH);
})();

// MOBILE MENU
const burger = $('.burger');
const mnav = $('#mobilemenu');
if (burger && mnav){
  burger.addEventListener('click', () => {
    const open = mnav.classList.toggle('show');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('#mobilemenu a').forEach(a => a.addEventListener('click', () => {
    mnav.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
  }));
}

// FILTER CHIPS (index only)
const dashboards = $('#dashboards');
if (dashboards) {
  const chips = $$('.chip');
  const cards = $$('[data-tags]', dashboards);
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.setAttribute('aria-pressed','false'));
    ch.setAttribute('aria-pressed','true');
    const f = ch.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  }));
}

// PLACEHOLDER FOR EMBEDS
$$('.thumb').forEach(thumb => {
  const frame = $('iframe', thumb);
  const ph = $('.placeholder', thumb);
  if (frame && /REPLACE_/i.test(frame.src) && ph){
    frame.style.display = 'none';
    ph.hidden = false;
  }
});
