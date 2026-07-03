/* ============================================================
   Açılış ekranı — ana sayfa ilk açıldığında yeşil zemin +
   "ERAY INTERIORS" logosu 3 sn görünür, sonra yumuşak geçişle
   ana sayfaya açılır. Aynı oturumda tekrar gösterilmez
   (sessionStorage); tıklayınca da geçilir.
   ============================================================ */
(function () {
  var html = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) return;

  // Bu oturumda zaten gösterildiyse hemen kaldır (flash olmadan)
  if (html.classList.contains('intro-done')) { intro.remove(); return; }
  try { sessionStorage.setItem('eray_intro', '1'); } catch (e) {}

  document.body.classList.add('intro-lock');

  function close() { intro.classList.add('hide'); }
  var timer = setTimeout(close, 3000);

  intro.addEventListener('click', function () { clearTimeout(timer); close(); });
  intro.addEventListener('transitionend', function () {
    document.body.classList.remove('intro-lock');
    if (intro && intro.parentNode) intro.remove();
  });
})();
