/* ============================================================
   Sayfa içeriğini (hero görseli + galeri görselleri) yönetim
   panelinin (CMS) düzenlediği content/<sayfa>.json dosyasından
   okur ve sayfaya uygular.
   - Panelden yüklenen görseller buraya kaydolur ve otomatik görünür.
   - Dosya okunamazsa (ör. yerel file:// önizleme) HTML'deki statik
     görseller/yer tutucular olduğu gibi kalır.
   ============================================================ */

window.loadPageContent = async function () {
  const page = document.body.dataset.page;   // home | ozel | ic | mutfak
  if (!page) return;

  let data;
  try {
    const res = await fetch(`content/${page}.json`, { cache: 'no-store' });
    if (!res.ok) return;                       // dosya yoksa statik içerik kalır
    data = await res.json();
  } catch (e) {
    return;                                    // fetch çalışmıyorsa (file://) statik kalır
  }

  // Hero görseli
  const hero = document.querySelector('.hero');
  if (hero && data.hero) {
    hero.style.backgroundImage = `url('${data.hero}')`;
  }

  // Galeri görselleri
  const track = document.querySelector('.carousel-track');
  if (track && Array.isArray(data.gallery) && data.gallery.length) {
    track.innerHTML = data.gallery.map((src, i) =>
      `<div class="slide" style="background-image:url('${src}')">${String(i + 1).padStart(2, '0')}</div>`
    ).join('');
  }
};
