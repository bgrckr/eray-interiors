# Eray Interiors — Web Sitesi

İç mimarlık ofisi Eray Interiors için saf HTML/CSS/JS ile hazırlanmış, çok
sayfalı ve çok dilli (TR/EN/ES) vitrin sitesi. Kurulum/derleme gerektirmez.

## Nasıl açılır?
- **En kolay:** `index.html` dosyasına çift tıklayın (tarayıcıda açılır).
- **Yerel sunucu ile (önerilir):** proje klasöründe bir terminal açıp:
  - Python: `python -m http.server 8000` → `http://localhost:8000`
  - Node: `npx serve`

## Sayfalar
- `index.html` — Ana sayfa
- `ozel-tasarim.html` — Özel Tasarım
- `ic-mekanlar.html` — İç Mekânlar
- `mutfaklar.html` — Mutfaklar

Her sayfa şu düzendedir: **üst bar → büyük hero görseli → tanıtım metni →
otomatik kayan galeri → yeşil iletişim bölümü.**

## Kendi içeriğinizi eklemek

### Görseller (hero + galeri)
Görsellerinizi `assets/img/` klasörüne, HTML'de belirtilen adlarla koyun:
- Hero: `hero-home.jpg`, `hero-ozel.jpg`, `hero-ic.jpg`, `hero-mutfak.jpg`
- Galeri: `home-1.jpg … home-6.jpg`, `ozel-1.jpg …`, `ic-1.jpg …`, `mutfak-1.jpg …`

Görsel yoksa yerine yeşil degrade yer tutucu görünür. Farklı isim/sayıda görsel
için ilgili HTML dosyasındaki `background-image` yollarını düzenleyin.

### Metinler (3 dilde)
Tüm metinler tek dosyada: **`js/i18n.js`**. `translations` içinde `tr`, `en`,
`es` blokları yan yanadır. Bir sayfanın tanıtım metni `page.<sayfa>.body`
altındadır. Türkçeyi değiştirdiğinizde `en`/`es` karşılıklarını da güncelleyin.

### Renk (royal green)
`css/style.css` en üstteki `:root` içinde `--green` değerini değiştirin; tüm
site (menü vurgusu, footer, hero) otomatik güncellenir.

### Sosyal medya bağlantıları
`js/footer.js` içindeki `SOCIAL` dizisi. Instagram tanımlıdır
(`instagram.com/erayinteriors`); Facebook, Pinterest ve LinkedIn şu an `#` yer
tutucudur — kendi bağlantılarınızı yazın.

## Fontlar
- Başlık: **Raleway ExtraLight** (Google Fonts)
- Gövde: **Jost** (Google Fonts)

İkisi de ücretsiz/OFL lisanslı ve Türkçe karakterleri tam destekler; harici font
dosyası gerekmez (internet bağlantısı ile Google Fonts'tan yüklenir).

## Dosya yapısı
```
eray-interiors/
  index.html, ozel-tasarim.html, ic-mekanlar.html, mutfaklar.html
  css/style.css
  js/  icons.js  data.js  i18n.js  header.js  footer.js  carousel.js  app.js
  assets/img/   (görselleriniz buraya)
```
