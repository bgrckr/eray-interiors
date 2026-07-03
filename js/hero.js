/* ============================================================
   Ana sayfa hero slayt gösterisi.
   5 (veya daha fazla) büyük görsel, ~6 sn'de bir yavaşça yatay
   kayar (CSS transition .9s). Fareyle üzerine gelince durur;
   "hareketi azalt" tercihinde otomatik geçiş kapalı kalır.
   Slaytların içeriği js/content.js tarafından panelden (hero_slides)
   doldurulur; app.js initHeroSlider()'ı çağırır.
   ============================================================ */

window.initHeroSlider = function () {
  var root = document.querySelector('[data-hero-slider]');
  if (!root) return;
  var wrap = root.querySelector('.hero-slides');
  var dotsWrap = root.querySelector('.hero-dots');
  var slides = wrap ? Array.prototype.slice.call(wrap.children) : [];
  var n = slides.length;

  if (n <= 1) { if (dotsWrap) dotsWrap.innerHTML = ''; return; }  // tek görsel → slayt yok

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i = 0, timer = null;

  if (dotsWrap) {
    dotsWrap.innerHTML = slides.map(function (_, k) {
      return '<button type="button" aria-label="Görsel ' + (k + 1) + '"' + (k === 0 ? ' class="active"' : '') + '></button>';
    }).join('');
  }
  var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

  function go(k) {
    i = (k + n) % n;
    wrap.style.transform = 'translateX(-' + (i * 100) + '%)';
    dots.forEach(function (d, di) { d.classList.toggle('active', di === i); });
  }
  function next() { go(i + 1); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() { if (reduce) return; stop(); timer = setInterval(next, 6000); }

  dots.forEach(function (d, di) {
    d.addEventListener('click', function () { go(di); start(); });
  });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  go(0);
  start();
};
