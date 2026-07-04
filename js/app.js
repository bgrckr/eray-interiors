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
  const wrap = document.querySelector('.lang');
  if (!wrap) return;
  const toggle = wrap.querySelector('.lang-toggle');
  const menu = wrap.querySelector('.lang-menu');

  function label() {
    const cur = I18N.current();
    const l = I18N.LANGS.find(x => x.code === cur) || I18N.LANGS[0];
    toggle.innerHTML = FLAGS[l.code] + `<span>${l.label}</span>` + ICONS.chevronDown;
  }

  menu.innerHTML = I18N.LANGS.map(l =>
    `<li><button data-lang="${l.code}">${FLAGS[l.code]}<span>${l.name}</span></button></li>`
  ).join('');

  label();

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    wrap.classList.toggle('open');
  });

  menu.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-lang]');
    if (!btn) return;
    I18N.set(btn.dataset.lang);
    wrap.classList.remove('open');
    label();
  });
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

/* ---------- Aşağı inince beliren kayar menü ---------- */
function setupScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
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
