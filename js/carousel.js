/* ============================================================
   Otomatik sola kayan görsel galerisi.
   - Görseller sürekli sola kayar (kesintisiz döngü).
   - Sağ/sol oklarla manuel gezinme; ok/hover sırasında otomatik
     kayma geçici olarak durur.
   Her galeri <section class="carousel" data-carousel> ... yapısında.
   ============================================================ */

window.initCarousels = function () {
  document.querySelectorAll('[data-carousel]').forEach(setupCarousel);
};

function setupCarousel(car) {
  const viewport = car.querySelector('.carousel-viewport');
  const track = car.querySelector('.carousel-track');
  const prev = car.querySelector('.car-prev');
  const next = car.querySelector('.car-next');
  if (!viewport || !track) return;

  // Ok ikonlarını yerleştir
  if (prev && window.ICONS) prev.innerHTML = ICONS.arrowLeft;
  if (next && window.ICONS) next.innerHTML = ICONS.arrowRight;

  // Kesintisiz döngü için içerik bir kez çoğaltılır.
  track.innerHTML += track.innerHTML;

  let auto = true;
  let resumeTimer = null;

  function loop() {
    if (auto) {
      let p = viewport.scrollLeft + 0.6;               // sola kayış hızı (px/kare)
      const half = track.scrollWidth / 2;
      if (p >= half) p -= half;                         // yarıya gelince başa sar
      viewport.scrollLeft = p;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function pause() {
    auto = false;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { auto = true; }, 4000);
  }

  const dist = 336; // bir kart + boşluk
  if (next) next.addEventListener('click', () => { pause(); viewport.scrollBy({ left: dist, behavior: 'smooth' }); });
  if (prev) prev.addEventListener('click', () => { pause(); viewport.scrollBy({ left: -dist, behavior: 'smooth' }); });

  viewport.addEventListener('mouseenter', () => { auto = false; });
  viewport.addEventListener('mouseleave', () => { clearTimeout(resumeTimer); auto = true; });
}
