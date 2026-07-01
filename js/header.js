/* ============================================================
   Paylaşılan üst bar (header).
   Tüm sayfalarda <header id="site-header"></header> içine
   enjekte edilir — tek kaynak, tekrar yok.
   Düzen: [menüler | ERAY INTERIORS | arama + dil]
   ============================================================ */

window.renderHeader = function () {
  const host = document.getElementById('site-header');
  if (!host) return;

  const path = (location.pathname.split('/').pop() || 'index.html');
  const menu = [
    { href: 'ozel-tasarim.html', key: 'menu.ozel' },
    { href: 'ic-mekanlar.html',  key: 'menu.ic' },
    { href: 'mutfaklar.html',    key: 'menu.mutfak' }
  ];

  const links = menu.map(m =>
    `<a href="${m.href}" class="nav-link${path === m.href ? ' active' : ''}" data-i18n="${m.key}"></a>`
  ).join('');

  host.innerHTML = `
    <div class="header-inner">
      <button class="hamburger" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="main-nav">${links}</nav>
      <a class="brand" href="index.html">ERAY INTERIORS</a>
      <div class="tools">
        <div class="search">
          <button class="search-toggle" aria-label="Ara">${ICONS.search}</button>
          <div class="search-box">
            <input type="text" class="search-input" data-i18n-placeholder="search.placeholder" aria-label="Ara">
            <div class="search-results"></div>
          </div>
        </div>
        <div class="lang">
          <button class="lang-toggle" aria-label="Dil / Language"></button>
          <ul class="lang-menu"></ul>
        </div>
      </div>
    </div>`;
};
