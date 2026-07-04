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
    { href: 'yasam-alanlari.html', key: 'menu.yasam' },
    { href: 'ticari-mekanlar.html', key: 'menu.ticari' },
    { href: 'ozel-tasarim.html',   key: 'menu.ozel' }
  ];

  const links = menu.map(m =>
    `<a href="${m.href}" class="nav-link${path === m.href ? ' active' : ''}" data-i18n="${m.key}"></a>`
  ).join('');

  // Blog, hizmet menülerinden ayrı olarak sağda (arama yanında) durur
  const blogActive = (path === 'blog.html' || path === 'yazi.html') ? ' active' : '';

  host.innerHTML = `
    <div class="header-inner">
      <button class="hamburger" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="main-nav">${links}<a href="blog.html" class="nav-link nav-blog${blogActive}" data-i18n="menu.blog"></a></nav>
      <a class="brand" href="index.html">ERAY INTERIORS</a>
      <div class="tools">
        <a href="blog.html" class="nav-link blog-link${blogActive}" data-i18n="menu.blog"></a>
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
