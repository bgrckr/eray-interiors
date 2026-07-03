/* ============================================================
   Sayfa içeriğini (hero görseli, galeri görselleri VE 3 dilli
   metinler) yönetim panelinin (Pages CMS) düzenlediği
   content/<sayfa>.json dosyasından okur ve sayfaya uygular.
   - Panelden yüklenen görseller ve yazılan metinler buraya kaydolur
     ve otomatik görünür.
   - Dosya okunamazsa (ör. yerel file:// önizleme) HTML'deki statik
     görseller ve js/i18n.js'teki yedek metinler kullanılır.
   ============================================================ */

window.loadPageContent = async function () {
  const page = document.body.dataset.page;   // home | ozel | ic | mutfak
  if (!page) return;

  let data;
  try {
    const res = await fetch(`content/${page}.json`, { cache: 'no-store' });
    if (!res.ok) return;                       // dosya yoksa statik içerik + i18n yedeği kalır
    data = await res.json();
  } catch (e) {
    return;                                    // fetch çalışmıyorsa (file://) yedek içerik kalır
  }

  // --- Hero görseli (tek görsel; hizmet sayfaları) ---
  const hero = document.querySelector('.hero');
  if (hero && data.hero) {
    hero.style.backgroundImage = `url('${data.hero}')`;
  }

  // --- Hero slaytları (ana sayfa; 5 büyük görsel) ---
  // hero_slides doluysa slaytları panelden kur; boşsa HTML'deki statik
  // slaytlar (yedek) korunur — böylece slider hep çalışır.
  const heroSlides = document.querySelector('[data-hero-slider] .hero-slides');
  if (heroSlides) {
    const imgs = Array.isArray(data.hero_slides) ? data.hero_slides.filter(Boolean) : [];
    if (imgs.length) {
      heroSlides.innerHTML = imgs.map(src =>
        `<div class="hero-slide" style="background-image:url('${src}')"></div>`
      ).join('');
    }
  }

  // --- Galeri görselleri (yalnızca proje şeridi OLMAYAN carousel'lerde) ---
  const track = document.querySelector('[data-carousel]:not([data-projects]) .carousel-track');
  if (track && Array.isArray(data.gallery) && data.gallery.length) {
    track.innerHTML = data.gallery.map((src, i) =>
      `<div class="slide" style="background-image:url('${src}')">${String(i + 1).padStart(2, '0')}</div>`
    ).join('');
  }

  // --- Metinler (TR/EN/ES) — I18N sözlüğüne yerleştir ---
  if (window.I18N && I18N.translations) {
    ['tr', 'en', 'es'].forEach(function (l) {
      const t = I18N.translations[l];
      if (!t) return;
      t.page = t.page || {};
      const cur = t.page[page] || {};          // js/i18n.js'teki yedek değerler
      t.page[page] = {
        hero:  pickLang(data.hero_title, l, cur.hero),
        sub:   pickLang(data.hero_sub, l, cur.sub),
        title: pickLang(data.title, l, cur.title),
        body:  (data.body && data.body[l]) ? paragraphsToHtml(data.body[l]) : cur.body
      };
    });
    I18N.apply();                              // seçili dilde metinleri yeniden uygula
  }
};

// JSON'daki {tr,en,es} nesnesinden dili seç; boşsa yedeğe düş
function pickLang(obj, lang, fallback) {
  if (obj && typeof obj === 'object' && obj[lang] != null && obj[lang] !== '') return obj[lang];
  return fallback;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Boş satırla ayrılmış metni <p> paragraflarına çevirir (tek satır sonu = <br>)
function paragraphsToHtml(txt) {
  if (!txt) return '';
  return txt.split(/\n{2,}/).map(function (p) {
    return '<p>' + escapeHtml(p.trim()).replace(/\n/g, '<br>') + '</p>';
  }).join('');
}
