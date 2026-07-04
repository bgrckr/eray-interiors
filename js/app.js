/* ============================================================
   Uygulama başlangıcı — tüm modülleri doğru sırada bağlar.
   Bu dosya her sayfada EN SON yüklenir.
   ============================================================ */

document.addEventListener('DOMContentLoaded', async function () {
  renderHeader();
  renderFooter();
  I18N.apply();          // header/footer enjekte edildikten SONRA metinleri uygula
  setupLang();
  setupSearch();
  setupMobileMenu();
  setupScrollHeader();     // aşağı inince beliren kayar menü
  await loadPageContent(); // panelden gelen hero/galeri görsellerini uygula
  if (window.loadProjects) await loadProjects();   // proje şeritlerini + detay sayfasını kur
  if (window.initHeroSlider) initHeroSlider();      // ana sayfa hero slaytları
  initCarousels();         // şeritler kurulduktan SONRA otomatik kaydırmayı başlat

  // Dışarı tıklayınca açık menüleri kapat
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.lang.open, .search.open').forEach(el => {
      if (!el.contains(e.target)) el.classList.remove('open');
    });
  });
});

/* ---------- Dil seçici ---------- */
function setupLang() {
  const wrap = document.querySelector('.lang');          // masaüstü: sağdaki açılır dil menüsü
  const navLang = document.querySelector('.nav-lang');   // mobil: hamburger menüsü içindeki dil satırı
  if (!wrap && !navLang) return;

  const toggle = wrap && wrap.querySelector('.lang-toggle');
  const menu = wrap && wrap.querySelector('.lang-menu');

  function refresh() {
    const cur = I18N.current();
    const l = I18N.LANGS.find(x => x.code === cur) || I18N.LANGS[0];
    if (toggle) toggle.innerHTML = FLAGS[l.code] + `<span>${l.label}</span>` + ICONS.chevronDown;
    if (navLang) navLang.querySelectorAll('button[data-lang]').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === cur));
  }

  // Masaüstü açılır menü
  if (wrap && toggle && menu) {
    menu.innerHTML = I18N.LANGS.map(l =>
      `<li><button data-lang="${l.code}">${FLAGS[l.code]}<span>${l.name}</span></button></li>`
    ).join('');
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.toggle('open');
    });
    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      I18N.set(btn.dataset.lang);
      wrap.classList.remove('open');
    });
  }

  // Mobil menü içi dil satırı (bayrak + dil adı; seçince menüyü kapatır)
  if (navLang) {
    navLang.innerHTML = I18N.LANGS.map(l =>
      `<button data-lang="${l.code}" class="nav-lang-btn">${FLAGS[l.code]}<span>${l.name}</span></button>`
    ).join('');
    navLang.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      I18N.set(btn.dataset.lang);
      const header = document.getElementById('site-header');
      if (header) header.classList.remove('nav-open');
    });
  }

  refresh();
  document.addEventListener('langchange', refresh);
}

/* ---------- Arama (istemci tarafı) ---------- */
function setupSearch() {
  const wrap = document.querySelector('.search');
  if (!wrap) return;
  const toggle = wrap.querySelector('.search-toggle');
  const input = wrap.querySelector('.search-input');
  const results = wrap.querySelector('.search-results');

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    wrap.classList.toggle('open');
    if (wrap.classList.contains('open')) setTimeout(() => input.focus(), 50);
  });

  input.addEventListener('input', function () {
    const q = input.value.trim().toLocaleLowerCase('tr');
    const lang = I18N.current();
    results.innerHTML = '';
    if (!q) return;

    const hits = (window.SITE_ITEMS || []).filter(item =>
      Object.values(item.title).some(tt => tt.toLocaleLowerCase('tr').includes(q))
    );

    if (!hits.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = I18N.t('search.empty', lang);
      results.appendChild(empty);
      return;
    }

    hits.forEach(item => {
      const a = document.createElement('a');
      a.href = item.page;
      a.textContent = item.title[lang] || item.title.tr;
      results.appendChild(a);
    });
  });
}

/* ---------- Menü davranışı ----------
   Ana sayfa: aşağı inince beliren KAYAR menü.
   Alt sayfalar: SABİT menü (her zaman görünür). Hero'su olmayan
   sayfalarda (blog/proje/yazı) içerik menünün altında kalmasın diye
   gövdeye üst boşluk eklenir. */
function setupScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const isHome = document.body.getAttribute('data-page') === 'home';
  if (!isHome) {
    document.body.classList.add('static-header');                 // menü sabit, gizlenmez
    if (!document.querySelector('.hero')) document.body.classList.add('no-hero');
    return;
  }

  const TH = 80;   // bu kadar aşağı inince menü belirir
  function update() {
    if (window.scrollY > TH) header.classList.add('show');
    else header.classList.remove('show');
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Mobil menü ---------- */
function setupMobileMenu() {
  const header = document.getElementById('site-header');
  const btn = header && header.querySelector('.hamburger');
  if (!btn) return;
  btn.addEventListener('click', function () {
    const open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Menü linkine tıklanınca mobil menüyü kapat
  header.querySelectorAll('.main-nav .nav-link').forEach(a =>
    a.addEventListener('click', () => header.classList.remove('nav-open'))
  );
}
