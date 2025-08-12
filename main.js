// Year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Filter chips
const chips = [...document.querySelectorAll('.chip')];
const cards = [...document.querySelectorAll('[data-tags]')];
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.setAttribute('aria-pressed','false'));
  ch.setAttribute('aria-pressed','true');
  const f = ch.dataset.filter;
  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    card.style.display = (f==='all' || tags.includes(f)) ? '' : 'none';
  });
}));

// Show placeholders if embeds not set
document.querySelectorAll('.thumb').forEach(thumb=>{
  const frame = thumb.querySelector('iframe');
  const ph = thumb.querySelector('.placeholder');
  if (frame && /REPLACE_/i.test(frame.src) && ph){ frame.style.display='none'; ph.hidden=false; }
});

// Burger menu
const burger = document.querySelector('.burger');
const mnav = document.getElementById('mobilemenu');
burger && burger.addEventListener('click', () => {
  const open = mnav.classList.toggle('show');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mnav && mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mnav.classList.remove('show'); burger && burger.setAttribute('aria-expanded','false');
}));

// Place the fixed mobile menu just below the current header height
function placeMenu(){
  const h = document.querySelector('header')?.getBoundingClientRect().height || 64;
  document.documentElement.style.setProperty('--navTop', Math.ceil(h) + 'px');
}
window.addEventListener('load', placeMenu);
window.addEventListener('resize', placeMenu);
window.addEventListener('orientationchange', placeMenu);

// Detect in-app browsers and show "Open in Browser" banner
(function(){
  const ua = navigator.userAgent || "";
  const isInApp = /Twitter|FBAN|FBAV|Instagram|Line\/|Snapchat|WhatsApp/i.test(ua);
  if (!isInApp) return;
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position:'fixed', left:0, right:0, bottom:0, zIndex:1000,
    padding:'12px 16px', background:'linear-gradient(135deg,#1e40af,#2563eb)',
    color:'#fff', display:'flex', justifyContent:'space-between',
    alignItems:'center', gap:'12px'
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

// Respect reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}
