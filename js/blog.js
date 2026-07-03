/* ============================================================
   Blog — liste (blog.html) ve tekil yazı (yazi.html) render eder.
   İçerik content/blog.json'dan gelir ve Pages CMS panelinden
   düzenlenir. Her yazı: slug (link adı), tarih, kapak görseli,
   3 dilli başlık/özet/metin ve ek görseller.
   Yazı sayfası linki: yazi.html?id=<slug>
   ============================================================ */
(function () {
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Boş satırla ayrılmış metni <p> paragraflarına çevirir
  function paragraphs(txt) {
    if (!txt) return '';
    return String(txt).split(/\n{2,}/).map(function (p) {
      return '<p>' + escapeHtml(p.trim()).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  // {tr,en,es} nesnesinden seçili dili al; yoksa yedeğe düş
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

  function postId(post, i) {
    return (post && post.slug && String(post.slug).trim()) ? String(post.slug).trim() : String(i);
  }
  function postHref(post, i) {
    return 'yazi.html?id=' + encodeURIComponent(postId(post, i));
  }
  function tr(key, lang) {
    return (window.I18N && I18N.t) ? (I18N.t(key, lang) || '') : '';
  }

  var POSTS = [];
  var listEl, postEl;

  document.addEventListener('DOMContentLoaded', function () {
    listEl = document.getElementById('blog-list');
    postEl = document.getElementById('blog-post');
    if (!listEl && !postEl) return;

    fetch('content/blog.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : { posts: [] }; })
      .then(function (data) { POSTS = (data && data.posts) || []; render(); })
      .catch(function () { POSTS = []; render(); });

    document.addEventListener('langchange', render);
  });

  function render() {
    var lang = (window.I18N && I18N.current) ? I18N.current() : 'tr';
    if (listEl) renderList(lang);
    if (postEl) renderPost(lang);
  }

  function renderList(lang) {
    var posts = POSTS.slice().sort(function (a, b) {
      return String(b.date || '').localeCompare(String(a.date || ''));
    });
    if (!posts.length) {
      listEl.innerHTML = '<p class="blog-empty">' + escapeHtml(tr('blog.empty', lang)) + '</p>';
      return;
    }
    listEl.innerHTML = posts.map(function (p) {
      var i = POSTS.indexOf(p);
      var cover = p.cover ? (' style="background-image:url(\'' + p.cover + '\')"') : '';
      return '<a class="blog-card" href="' + postHref(p, i) + '">' +
               '<span class="blog-card-cover"' + cover + '></span>' +
               '<span class="blog-card-body">' +
                 '<span class="blog-card-date">' + escapeHtml(fmtDate(p.date, lang)) + '</span>' +
                 '<span class="blog-card-title">' + escapeHtml(pick(p.title, lang)) + '</span>' +
                 '<span class="blog-card-excerpt">' + escapeHtml(pick(p.excerpt, lang)) + '</span>' +
                 '<span class="blog-card-more">' + escapeHtml(tr('blog.readmore', lang)) + ' →</span>' +
               '</span>' +
             '</a>';
    }).join('');
  }

  function renderPost(lang) {
    var id = new URLSearchParams(location.search).get('id');
    var post = null;
    for (var i = 0; i < POSTS.length; i++) {
      if (postId(POSTS[i], i) === id) { post = POSTS[i]; break; }
    }
    var back = escapeHtml(tr('blog.back', lang));
    if (!post) {
      postEl.innerHTML = '<p class="blog-empty">' + escapeHtml(tr('blog.empty', lang)) + '</p>' +
                         '<p><a class="post-back" href="blog.html">← ' + back + '</a></p>';
      return;
    }
    var title = pick(post.title, lang);
    document.title = title + ' | Eray Interiors';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', pick(post.excerpt, lang));

    var cover = post.cover
      ? '<div class="post-cover" style="background-image:url(\'' + post.cover + '\')"></div>' : '';
    var images = Array.isArray(post.images) ? post.images.filter(Boolean) : [];
    var gallery = images.length
      ? '<div class="post-gallery">' + images.map(function (src) {
          return '<img src="' + src + '" alt="' + escapeHtml(title) + '" loading="lazy">';
        }).join('') + '</div>'
      : '';

    postEl.innerHTML =
      '<a class="post-back" href="blog.html">← ' + back + '</a>' +
      cover +
      '<div class="post-date">' + escapeHtml(fmtDate(post.date, lang)) + '</div>' +
      '<h1 class="post-title">' + escapeHtml(title) + '</h1>' +
      '<div class="post-body">' + paragraphs(pick(post.body, lang)) + '</div>' +
      gallery;
  }
})();
