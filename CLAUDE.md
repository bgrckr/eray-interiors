# CLAUDE.md — Eray Interiors Web Sitesi

Bu dosya, Claude Code'un (ve diğer geliştiricilerin) projeyi hızlıca anlaması için
proje notlarını içerir. Yeni bir oturumda önce bunu okuyun.

## Proje özeti
İç mimarlık ofisi **Eray Interiors** için vitrin sitesi. Çok sayfalı, çok dilli
(TR/EN/ES). Sepet/kullanıcı girişi yoktur.

## Teknoloji
- **Saf HTML/CSS/JS** — build adımı, framework veya bağımlılık YOK.
- Doğrudan tarayıcıda (`file://`) veya basit bir statik sunucuyla çalışır.
- Fontlar Google Fonts'tan gelir: başlık **Raleway ExtraLight (200)**, gövde **Jost**
  (ikisi de ücretsiz/OFL, Türkçe/latin-ext destekli). Harici font dosyası yok.

## Dosya yapısı
```
index.html · ic-mekanlar.html · mutfaklar.html · ozel-tasarim.html · ticari-mekanlar.html
blog.html (liste) · yazi.html (tekil yazı, yazi.html?id=<slug>)
proje.html (tekil proje, proje.html?id=<slug>)
css/style.css
js/  icons.js  data.js  i18n.js  header.js  footer.js  content.js  carousel.js  hero.js  projects.js  intro.js  app.js  blog.js
content/  home.json ic.json mutfak.json ozel.json ticari.json blog.json projects.json
assets/img/   (hero + galeri görselleri buraya)
```
Hizmet sayfalarının düzeni: **header → hero görsel → tanıtım metni → otomatik kayan PROJE şeridi → siyah footer.**
Ana sayfa: **(ilk açılışta siyah açılış ekranı) → header → hero slider (MANUEL yüklenen görseller, projelerden bağımsız) → tanıtım → öne çıkan projeler şeridi → footer.**
Blog: `blog.html` yazıları kart olarak listeler; kart → `yazi.html?id=<slug>` tekil yazı sayfasını açar. Her ikisi `js/blog.js` ile `content/blog.json`'dan render edilir.
Projeler: kayan şeritteki kutu (ana görsel/kapak) → `proje.html?id=<slug>`. Detay düzeni: **yazılı** görsel = tam genişlik tek satır, yazı yanda (1. sola, 2. sağa, sırayla); **yazısız** görseller = yan yana 2 sütun. `js/projects.js` + `content/projects.json`.

## Mimari notlar
- **Header ve footer tek kaynaktan** JS ile enjekte edilir (`js/header.js`,
  `js/footer.js`) — her HTML'de tekrar edilmez. `#site-header` ve `#site-footer`
  boş kapsayıcılardır.
- **`js/app.js`** her sayfada EN SON (intro.js hariç) yüklenir; `DOMContentLoaded`'da
  sırasıyla `renderHeader()`, `renderFooter()`, `I18N.apply()`, dil/arama/mobil menü,
  `await loadPageContent()`, `await loadProjects()`, `initHeroSlider()` ve
  `initCarousels()` çağırır (şeritler klonlanmadan önce dolu olsun diye bu sıra).
- Sol menüler (alt menüsüz, sırayla): İç Mekanlar · Mutfaklar · Özel Tasarım · Ticari Mekanlar.
  **Blog:** masaüstünde hizmet menülerinden ayrı, sağda arama ikonunun yanında
  (`header.js` → `.tools .blog-link`); **mobilde (≤1024) soldaki hamburger menüsünün içinde**
  (`.main-nav .nav-blog`; CSS ile masaüstü/mobil görünürlüğü değişir).
  Menü sırası/etiketleri `js/header.js` (dizi) + `js/i18n.js` (`menu.*`) ile yönetilir.
- **Header ve footer tam genişliktir** (`max-width:none`, `padding:clamp(24px,4vw,72px)`) —
  geniş monitörde içerik kenarlara yaslanır, iki yanda boşluk kalmaz. Diğer içerik
  bölümleri (`--maxw`) ortalıdır.
- **Açılış ekranı (intro):** yalnızca ana sayfada. `#intro` (siyah zemin + beyaz
  "ERAY INTERIORS" logosu) 3 sn görünür, sonra yumuşak geçişle kapanır. `js/intro.js`
  yönetir; `sessionStorage` ile **oturum başına bir kez** gösterilir (flash önlemek için
  `index.html` head'inde küçük bir kontrol scripti var). Tıklayınca da geçilir.

## Sık yapılan değişiklikler — nereden?
- **Metinler (3 dilde):** `js/i18n.js` → `translations` (tr/en/es). Sayfa gövdeleri
  `page.<sayfa>.body` altında, HTML içerir. Türkçeyi değiştirince en/es'i de güncelle.
- **Renkler:** `css/style.css` en üstteki `:root` → `--green` (ana marka rengi; şu an
  **siyah `#000000`**). Header, footer, intro ve butonlar aynı `--green`'i kullanır.
  Değiştirmek için tek satır yeterli. (Ayrıca HTML `theme-color` metaları ve
  `site.webmanifest` `theme_color` = `#000000`.)
- **Arama içeriği:** `js/data.js` → `SITE_ITEMS`.
- **Sosyal linkler:** `js/footer.js` → `SOCIAL` dizisi. Instagram tanımlı
  (`instagram.com/erayinteriors`); Facebook/Pinterest/LinkedIn şu an `#` yer tutucu.
- **İkon/bayraklar:** `js/icons.js` (inline SVG; bayraklar Windows'ta da tutarlı görünsün diye emoji değil).
- **Görseller:** `assets/img/` içine README'deki adlarla ekle (`hero-*.jpg`,
  `home-1.jpg`…`mutfak-6.jpg`). Hero görseli yoksa koyu degrade yer tutucu, proje şeridi
  boşsa gri "pencere" kutuları görünür.
- **Projeler:** `content/projects.json` → `projects` dizisi (panelden: "Projeler").
  Her proje: `slug, date, category(ic/mutfak/ozel/ticari), featured, cover, title{tr,en,es}`
  ve `blocks[]` (her blok: `image` + isteğe bağlı `caption{tr,en,es}`). **Yerleşim otomatik**
  (`side` alanı YOK): caption'ı olan görsel tam genişlik tek satır olur ve yazı yanına gelir
  (yazılı görseller sırayla sol/sağ); caption'ı olmayan görseller yan yana 2 sütun akar.
  "Yazı var mı" kararı tüm dillere bakar (dil değişse düzen sabit). Şeritler `date` azalan.
- **Ana sayfa hero slaytları (projelerden BAĞIMSIZ):** `content/home.json` → `hero_slides`
  (panelden manuel yüklenen görseller). Boşsa `index.html`'deki statik slaytlar yedek.
  `js/content.js` bu görselleri `.hero-slides`'a yazar, `js/hero.js` (~6 sn, yavaş kayma)
  çalıştırır. **Hero projelerden gelmez; ayrı bir görsel gösterisidir.**
- **Responsive/boşluk:** `css/style.css` `:root` → `--space-*` token'ları + `--gap-menu-title`
  (menü↔başlık boşluğu) + `--hero-h`. Kırılımlar: ≥1600/≥2200 (geniş), 1100, 1024 (hamburger),
  768 (katlanabilir/tablet), 480 (telefon), 360 (Fold kapak). `prefers-reduced-motion` desteklenir.
  Mobilde (≤480/≤360) header taşmasını önlemek için marka küçülür, dil "TR" etiketi ve çok dar
  ekranda dil oku gizlenir (bayrak kalır). Playwright ile 2560→280px arası taşmasız doğrulandı.

## İletişim bilgileri (footer'da sabit)
- E-posta: `erayinteriors@gmail.com` · Telefon: `+90 507 164 8959`

## Yayın (deployment)
- **GitHub deposu:** https://github.com/bgrckr/eray-interiors (public)
- **Canlı site (GitHub Pages):** https://bgrckr.github.io/eray-interiors/
- **Güncelleme akışı:** değişiklik → `git add .` → `git commit -m "..."` →
  **`git pull --rebase`** → `git push`. (Panel/ikinci hesap eşzamanlı commit
  atabildiği için push'tan önce her zaman `pull --rebase` yap.) Push'tan ~1 dk
  sonra Pages otomatik yeniden yayınlar.
- Site göreli yollar kullandığı için alt-klasörlü Pages adresinde sorunsuz çalışır.
- **`.nojekyll`** kökte bulunur — Pages'in eski Jekyll build'i saf statik siteyi
  takarsa (deploy "building"de asılı kalırsa) bunu SİLME; Jekyll'i devre dışı bırakır.
- **İkinci yönetici:** `ierayisik` hesabı depoya **collaborator** olarak ekli
  (sahiplik devri yapılmadı, `bgrckr` sahibi kalır).

## Alan adı (domain) — BEKLEMEDE
- `erayinteriors.com` + kurumsal e-posta **Natro**'dan alındı; alan adı **henüz
  aktif değil**. Aktifleşince yapılacak sıra:
  1. Kökte `CNAME` dosyası oluştur, içeriği: `erayinteriors.com`.
  2. Tüm mutlak URL'leri `https://bgrckr.github.io/eray-interiors/` →
     `https://erayinteriors.com/` güncelle (tüm HTML `canonical`/`og:url`/`og:image`/
     `twitter:image` + JSON-LD `url`/`image`/`logo` + `sitemap.xml` + `robots.txt`).
  3. Natro DNS: apex için A kayıtları `185.199.108.153`, `.109`, `.110`, `.111`;
     `www` için CNAME → `bgrckr.github.io`. **MX / e-posta kayıtlarına DOKUNMA.**
  4. Pages'te **Enforce HTTPS**'i aç.
  5. Sonra Google Search Console (Domain property) kurulumu.

## İçerik yönetim paneli (CMS)
- **Pages CMS** kullanılıyor (https://app.pagescms.org). Yapılandırma: kök dizindeki
  **`.pages.yml`**. Giriş doğrudan **GitHub hesabıyla**; Netlify/Identity GEREKMEZ.
  (Netlify Identity yeni sitelerde kullanımdan kaldırıldığı için bu yola geçildi.)
- Panel, GitHub deposunu doğrudan düzenler; GitHub Pages siteyi otomatik günceller.
  Yani **hosting GitHub Pages'te kalır**, ayrı bir panel sitesi yok.
- Panelden yönetilen içerik **görsellerdir** (her sayfanın hero'su + galeri listesi).
  Görseller `assets/img/`'e yüklenir (`.pages.yml` → media input/output).
- Panelden yönetilen içerik: her sayfanın **hero görseli, galeri görselleri VE
  3 dilli metinleri** (hero başlığı/alt başlığı, sayfa başlığı, tanıtım gövdesi).
- Panelde ayrıca **"Projeler"** koleksiyonu (`content/projects.json`) ve ana sayfa
  **hero slaytları** (`hero_slides`, manuel) düzenlenir. `projects` `blocks` listesinde her
  görselin altında İSTEĞE BAĞLI `caption` alanı vardır — yazı eklersen o görsel tam
  genişlik/yan yazı olur, eklemezsen 2 sütunda kalır. Her projenin `cover`'ı = şeritteki
  kapak (tıklanınca proje açılır); `featured` = ana sayfa öne çıkan projeler şeridinde göster.
- İçerik veri dosyaları: `content/home.json` (+ ozel/ic/mutfak). Şema:
  `{ "hero": "assets/img/..", "hero_title": {tr,en,es}, "hero_sub": {tr,en,es},
  "title": {tr,en,es}, "body": {tr,en,es}, "gallery": ["assets/img/..", ...] }`.
  `body` içindeki paragraflar BOŞ SATIRLA ayrılır.
- **`js/content.js`** her sayfada `content/<data-page>.json`'ı `fetch` ile okur;
  hero arka planını + galeriyi kurar ve metinleri `I18N.translations[l].page[<page>]`
  içine yazıp `I18N.apply()` çağırır (`body` metni `<p>` paragraflarına çevrilir).
  `app.js` içinde `initCarousels()`'tan ÖNCE `await loadPageContent()` çağrılır.
- **Yedek:** `js/i18n.js`'teki `page.*` metinleri hâlâ durur ve JSON okunamazsa
  (ör. `file://`) yedek olarak kullanılır. **Kaynak/gerçek metin = panel/JSON'dur**;
  JSON değeri i18n.js'i çalışma anında ezer. Menü/footer/arama metinleri ise
  yalnızca `js/i18n.js`'tedir (panelde değil).

## SEO & favicon
- Her sayfanın `<head>`'inde: benzersiz `<title>` + `meta description`, `canonical`,
  `robots`, Open Graph, Twitter Card, `theme-color` ve **JSON-LD `LocalBusiness`**
  yapısal verisi bulunur. JSON-LD tüm sayfalarda aynıdır (ad, url, logo, e-posta,
  telefon, `sameAs`=Instagram, `areaServed`=TR).
- **Favicon/ikonlar:** kökte `favicon.ico` (48) + `favicon.svg` (vektör, **siyah zemin +
  beyaz "EI" monogramı**) + `assets/apple-touch-icon.png` (180) + `assets/icon-192.png` /
  `icon-512.png` (`site.webmanifest`'te). Zemin `#000000`, harfler beyaz. Raster ikonlar
  PowerShell `System.Drawing` ile SVG'deki aynı dikdörtgen geometrisinden üretildi.
- **Sosyal paylaşım görseli:** `assets/og-image.png` (1200×630, tüm OG/Twitter
  etiketlerinde mutlak URL ile). İkon/OG görselleri PowerShell `System.Drawing` ile
  üretildi; yeniden üretmek gerekirse aynı geometri/renk kullanılır.
- **Tarama/indeksleme:** kökte `robots.txt` (sitemap'e işaret eder) ve `sitemap.xml`
  (4 sayfa). URL'ler mutlak Pages adresini kullanır; alan adı değişirse `sitemap.xml`,
  `robots.txt`, tüm `canonical`/`og:url`/JSON-LD `url` alanları güncellenmeli.
- **Not (yerel SEO):** İşletmeye fiziksel adres/şehir eklenirse JSON-LD'ye
  `address` (PostalAddress) + `geo` eklenmeli — Google yerel paketi (harita) için
  kritik. Şu an adres olmadığından eklenmedi.

## Yapılacaklar / açık maddeler
- **Alan adı bağla** (yukarıdaki "Alan adı" adımları) — Natro'da `erayinteriors.com`
  aktifleşince. Bu tamamlanınca **Google Search Console** kur.
- Gerçek hero ve galeri görsellerini ekle.
- Facebook/Pinterest/LinkedIn gerçek URL'lerini `js/footer.js`'e yaz
  (verilince JSON-LD `sameAs` dizisine de eklenmeli).
- İsteğe bağlı: fiziksel adres/şehir → JSON-LD `address` (yerel SEO).
- İsteğe bağlı: `mailto` yerine gerçek iletişim formu (ör. Formspree).
