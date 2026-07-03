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
index.html · ozel-tasarim.html · ic-mekanlar.html · mutfaklar.html
css/style.css
js/  icons.js  data.js  i18n.js  header.js  footer.js  carousel.js  app.js
assets/img/   (hero + galeri görselleri buraya)
```
Her sayfanın düzeni: **header → hero görsel → tanıtım metni → otomatik kayan galeri → yeşil footer.**

## Mimari notlar
- **Header ve footer tek kaynaktan** JS ile enjekte edilir (`js/header.js`,
  `js/footer.js`) — her HTML'de tekrar edilmez. `#site-header` ve `#site-footer`
  boş kapsayıcılardır.
- **`js/app.js`** her sayfada EN SON yüklenir; `DOMContentLoaded`'da sırasıyla
  `renderHeader()`, `renderFooter()`, `I18N.apply()`, dil/arama/mobil menü ve
  `initCarousels()` çağırır.
- Menüler (3 adet, alt menüsüz): Özel Tasarım, İç Mekânlar, Mutfaklar.

## Sık yapılan değişiklikler — nereden?
- **Metinler (3 dilde):** `js/i18n.js` → `translations` (tr/en/es). Sayfa gövdeleri
  `page.<sayfa>.body` altında, HTML içerir. Türkçeyi değiştirince en/es'i de güncelle.
- **Renkler:** `css/style.css` en üstteki `:root` → `--green` (royal green, `#1B4D3E`).
  Header ve footer aynı `--green`'i kullanır.
- **Arama içeriği:** `js/data.js` → `SITE_ITEMS`.
- **Sosyal linkler:** `js/footer.js` → `SOCIAL` dizisi. Instagram tanımlı
  (`instagram.com/erayinteriors`); Facebook/Pinterest/LinkedIn şu an `#` yer tutucu.
- **İkon/bayraklar:** `js/icons.js` (inline SVG; bayraklar Windows'ta da tutarlı görünsün diye emoji değil).
- **Görseller:** `assets/img/` içine README'deki adlarla ekle (`hero-*.jpg`,
  `home-1.jpg`…`mutfak-6.jpg`). Görsel yoksa yeşil degrade yer tutucu görünür.

## İletişim bilgileri (footer'da sabit)
- E-posta: `erayinteriors@gmail.com` · Telefon: `+90 507 164 8959`

## Yayın (deployment)
- **GitHub deposu:** https://github.com/bgrckr/eray-interiors (public)
- **Canlı site (GitHub Pages):** https://bgrckr.github.io/eray-interiors/
- **Güncelleme akışı:** değişiklik → `git add .` → `git commit -m "..."` → `git push`.
  Push'tan ~1 dk sonra Pages otomatik yeniden yayınlar.
- Site göreli yollar kullandığı için alt-klasörlü Pages adresinde sorunsuz çalışır.

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

## Yapılacaklar / açık maddeler
- Gerçek hero ve galeri görsellerini ekle.
- Facebook/Pinterest/LinkedIn gerçek URL'lerini `js/footer.js`'e yaz.
- Favicon ekle.
- İsteğe bağlı: kendi alan adını (ör. erayinteriors.com) Pages'e bağla.
- İsteğe bağlı: `mailto` yerine gerçek iletişim formu (ör. Formspree).
