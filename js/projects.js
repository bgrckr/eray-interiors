/* ============================================================
   Projeler — hizmet sayfaları + ana sayfadaki kayan proje
   şeritlerini doldurur ve proje.html'de detay sayfasını render
   eder. İçerik content/projects.json'dan gelir ve Pages CMS
   panelinden düzenlenir.
   - Her proje: slug (link), tarih, kategori, kapak, 3 dilli ad,
     ve "blocks" (sıralı görsel blokları; her blokta side=sol/sağ
     ve isteğe bağlı caption).
   - Şeritler tarihe göre AZALAN sıralanır (blog ile aynı mantık).
   - Detay linki: proje.html?id=<slug>
   app.js, initCarousels()'tan ÖNCE window.loadProjects()'ı await eder,
   böylece şeritler klonlanmadan dolu olur.
   ============================================================ */
(function () {
  var CATEGORY_PAGE = {
    yasam: 'yasam-alanlari.html',
    ozel: 'ozel-tasarim.html',
    ticari: 'ticari-mekanlar.html'
  };

  var PROJECTS = null;   // ilk fetch'ten sonra önbelleğe alınır

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function pick(obj, lang) {
    if (obj && typeof obj === 'object') return obj[lang] || obj.tr || obj.en || '';
    return obj || '';
  }
  function fmtDate(d, lang) {
    if (!d) return '';
    var dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    var loc = lang === 'en' ? 'en-GB' : (lang === 'es' ? 'es-ES' : 'tr-TR');
    try { return dt.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return d; }
  }
  function tr(key, lang) {
    return (window.I18N && I18N.t) ? (I18N.t(key, lang) || '') : '';
  }
  function slugOf(p, i) {
    return (p && p.slug && String(p.slug).trim()) ? String(p.slug).trim() : String(i);
  }
  function projHref(p, i) {
    return 'proje.html?id=' + encodeURIComponent(slugOf(p, i));
  }
  function byDateDesc(a, b) {
    return String(b.date || '').localeCompare(String(a.date || ''));
  }
  function lang() {
    return (window.I18N && I18N.current) ? I18N.current() : 'tr';
  }

  // Bir projeyi kayan şerit kartına çevirir
  function cardHtml(p, i, l) {
    var cover = p.cover || (p.blocks && p.blocks[0] && p.blocks[0].image) || '';
    var bg = cover ? ' style="background-image:url(\'' + cover + '\')"' : '';
    return '<a class="slide project-card" href="' + projHref(p, i) + '">' +
             '<span class="card-img"' + bg + '></span>' +
             '<span class="card-meta">' +
               '<span class="card-title">' + escapeHtml(pick(p.title, l)) + '</span>' +
               '<span class="card-date">' + escapeHtml(fmtDate(p.date, l)) + '</span>' +
             '</span>' +
           '</a>';
  }

  // Bir blokta (herhangi bir dilde) yazı var mı? — yerleşim kararı buna göre,
  // dil değişse de düzen sabit kalsın diye tüm dillere bakar.
  function hasCap(b) {
    var c = b && b.caption;
    return !!(c && (c.tr || c.en || c.es));
  }

  // Proje yoksa (ya da içerik henüz yüklenmediyse) gösterilecek boş kutular.
  function placeholderCards(n) {
    var one = '<span class="slide project-card project-placeholder" aria-hidden="true"><span class="card-img"></span></span>';
    var s = ''; for (var i = 0; i < n; i++) s += one; return s;
  }

  // --- Menü (kategori) sayfası: 2 sütunlu dikey pencere ızgarası ---
  // Kapak + üstünde proje adı; tıklanınca proje sayfası açılır.
  function gridCardHtml(p, i, l) {
    var cover = p.cover || (p.blocks && p.blocks[0] && p.blocks[0].image) || '';
    var bg = cover ? ' style="background-image:url(\'' + cover + '\')"' : '';
    return '<a class="pcard" href="' + projHref(p, i) + '">' +
             '<span class="pcard-img"' + bg + '></span>' +
             '<span class="pcard-title">' + escapeHtml(pick(p.title, l)) + '</span>' +
           '</a>';
  }
  function placeholderGrid(n) {
    var one = '<span class="pcard pcard-placeholder" aria-hidden="true"><span class="pcard-img"></span></span>';
    var s = ''; for (var i = 0; i < n; i++) s += one; return s;
  }
  function fillGrids(l) {
    document.querySelectorAll('[data-projects-grid]').forEach(function (box) {
      var cat = box.getAttribute('data-projects-grid');
      var list = (PROJECTS || []).slice().sort(byDateDesc);
      if (cat === 'featured') list = list.filter(function (p) { return p.featured; });
      else if (cat !== 'all') list = list.filter(function (p) { return p.category === cat; });
      box.innerHTML = list.length
        ? list.map(function (p) { return gridCardHtml(p, indexOf(p), l); }).join('')
        : placeholderGrid(4);
    });
  }

  // Şeritleri doldurur. doubled=true → içeriği iki kez yazar (carousel.js'in
  // kesintisiz döngü klonlamasını taklit eder; dil değişince yeniden kurmak için).
  function fillStrips(l, doubled) {
    document.querySelectorAll('[data-projects]').forEach(function (car) {
      var track = car.querySelector('.carousel-track');
      if (!track) return;
      var cat = car.getAttribute('data-projects');
      var list = (PROJECTS || []).slice().sort(byDateDesc);
      if (cat === 'featured') list = list.filter(function (p) { return p.featured; });
      else if (cat !== 'all') list = list.filter(function (p) { return p.category === cat; });

      car.style.display = '';   // boş olsa da şeridi GİZLEME — pencereleri tut
      var html = list.length
        ? list.map(function (p) { return cardHtml(p, indexOf(p), l); }).join('')
        : placeholderCards(5);
      track.innerHTML = doubled ? (html + html) : html;
    });
  }

  function indexOf(p) { return PROJECTS ? PROJECTS.indexOf(p) : 0; }

  function renderDetail(l) {
    var host = document.getElementById('project-detail');
    if (!host) return;

    var id = new URLSearchParams(location.search).get('id');
    var idx = -1;
    for (var i = 0; i < (PROJECTS || []).length; i++) {
      if (slugOf(PROJECTS[i], i) === id) { idx = i; break; }
    }
    var back = escapeHtml(tr('projects.back', l));
    if (idx < 0) {
      host.innerHTML = '<div class="project-detail">' +
        '<p class="project-empty">' + escapeHtml(tr('projects.empty', l)) + '</p>' +
        '<p style="text-align:center"><a class="project-back" href="index.html">← ' + back + '</a></p></div>';
      return;
    }

    var p = PROJECTS[idx];
    var title = pick(p.title, l);
    document.title = title + ' | Eray Interiors';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', title);

    var catPage = CATEGORY_PAGE[p.category] || 'index.html';
    var blocks = Array.isArray(p.blocks) ? p.blocks : [];

    // Yazılı fotoğraf → tam genişlik tek satır (yazı yanda; 1. sola, 2. sağa, sırayla).
    // Yazısız fotoğraflar → yan yana 2 sütunlu ızgara (ardışık olanlar gruplanır).
    var rows = '';
    var capIndex = 0;
    var i = 0;
    while (i < blocks.length) {
      var b = blocks[i];
      if (hasCap(b)) {
        var flip = (capIndex % 2 === 1);   // 0: görsel solda, 1: görsel sağda
        capIndex++;
        var cap = pick(b.caption, l);
        var fig = b.image
          ? '<div class="project-figure"><img src="' + b.image + '" alt="' + escapeHtml(title) + '" loading="lazy"></div>' : '';
        var capHtml = '<div class="project-caption">' + escapeHtml(cap).replace(/\n/g, '<br>') + '</div>';
        rows += '<div class="project-row wide' + (flip ? ' flip' : '') + '">' + fig + capHtml + '</div>';
        i++;
      } else {
        var group = '';
        while (i < blocks.length && !hasCap(blocks[i])) {
          if (blocks[i].image) {
            group += '<img src="' + blocks[i].image + '" alt="' + escapeHtml(title) + '" loading="lazy">';
          }
          i++;
        }
        rows += '<div class="project-grid">' + group + '</div>';
      }
    }

    // Aynı kategoride önceki/sonraki proje (tarihe göre)
    var sameCat = (PROJECTS || []).slice()
      .filter(function (q) { return q.category === p.category; }).sort(byDateDesc);
    var pos = sameCat.indexOf(p);
    var newer = pos > 0 ? sameCat[pos - 1] : null;                 // daha yeni
    var older = pos < sameCat.length - 1 ? sameCat[pos + 1] : null; // daha eski
    var nav = '';
    if (newer || older) {
      nav = '<nav class="project-nav">' +
        (older ? '<a href="' + projHref(older, indexOf(older)) + '">← ' + escapeHtml(pick(older.title, l)) + '</a>' : '<span></span>') +
        (newer ? '<a href="' + projHref(newer, indexOf(newer)) + '">' + escapeHtml(pick(newer.title, l)) + ' →</a>' : '<span></span>') +
        '</nav>';
    }

    host.innerHTML =
      '<div class="project-detail">' +
        '<a class="project-back" href="' + catPage + '">← ' + back + '</a>' +
        '<div class="project-head">' +
          '<div class="project-date">' + escapeHtml(fmtDate(p.date, l)) + '</div>' +
          '<h1 class="project-title">' + escapeHtml(title) + '</h1>' +
        '</div>' +
        rows +
      '</div>' + nav;
  }

  var stripsBuilt = false;

  // app.js tarafından initCarousels()'tan ÖNCE await edilir.
  window.loadProjects = async function () {
    var hasStrip = document.querySelector('[data-projects]');
    var hasGrid = document.querySelector('[data-projects-grid]');
    var hasDetail = document.getElementById('project-detail');
    if (!hasStrip && !hasGrid && !hasDetail) return;   // bu sayfada projeye gerek yok

    if (PROJECTS == null) {
      // Klasörler her menü (kategori) için AYRI dosyada tutulur (panelde ayrı bölüm).
      // Site bu dosyaları okuyup birleştirir; kategori dosyadan atanır.
      var FILES = [
        { path: 'content/projects-yasam.json', category: 'yasam' },
        { path: 'content/projects-ozel.json', category: 'ozel' },
        { path: 'content/projects-ticari.json', category: 'ticari' }
      ];
      PROJECTS = [];
      await Promise.all(FILES.map(async function (f) {
        try {
          var res = await fetch(f.path, { cache: 'no-store' });
          if (!res.ok) return;
          var data = await res.json();
          (data.projects || []).forEach(function (p) {
            p.category = f.category;   // kategori dosyadan
            PROJECTS.push(p);
          });
        } catch (e) { /* dosya yoksa/okunamazsa atla */ }
      }));
    }

    var l = lang();
    if (hasStrip) { fillStrips(l, false); stripsBuilt = true; } // initCarousels sonra klonlar
    if (hasGrid) fillGrids(l);
    if (hasDetail) renderDetail(l);

    // Dil değişince metinleri yenile. Şeritler zaten klonlandığı için
    // burada içeriği iki kez yazarak (doubled) döngüyü koru.
    document.addEventListener('langchange', function () {
      var ll = lang();
      if (stripsBuilt) fillStrips(ll, true);
      if (hasGrid) fillGrids(ll);
      renderDetail(ll);
    });
  };
})();
