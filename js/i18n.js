/* ============================================================
   Çok dillilik (TR / EN / ES)
   ------------------------------------------------------------
   METİNLERİ DÜZENLEMEK İÇİN: aşağıdaki `translations` nesnesini
   düzenlemeniz yeterli. Her metnin üç dildeki karşılığı yan yana
   durur. Sayfa gövde metinleri page.* altındadır ve HTML içerir
   (<p> ... </p>). Türkçe metni değiştirdiğinizde en/es
   karşılıklarını da güncellemeyi unutmayın.
   ============================================================ */

window.I18N = (function () {
  const LANGS = [
    { code: 'tr', label: 'TR', name: 'Türkçe' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'es', label: 'ES', name: 'Español' }
  ];

  const translations = {
    tr: {
      menu: { yasam: 'Yaşam Alanları', ticari: 'Ticari Mekanlar', ozel: 'Özel Tasarım', blog: 'Blog' },
      search: { placeholder: 'Ara…', empty: 'Sonuç bulunamadı' },
      blog: { title: 'Blog', intro: 'Tasarım üzerine yazılar, projelerimizden notlar ve ilham veren mekânlar.', readmore: 'Devamını oku', back: 'Bloga dön', empty: 'Henüz yazı eklenmedi.' },
      projects: { title: 'Projeler', featured: 'Öne Çıkan Projeler', view: 'Projeyi gör', back: 'Projelere dön', empty: 'Proje bulunamadı.' },
      footer: {
        contact: 'İletişim', follow: 'Bizi Takip Edin',
        rights: '© 2026 Eray Interiors. Tüm hakları saklıdır.'
      },
      page: {
        home: {
          hero: 'ERAY INTERIORS',
          sub: 'İç mekânlara karakter ve zarafet',
          title: 'İç Mekânlarınıza Karakter Katıyoruz',
          body:
            '<p>Eray Interiors, yaşam ve çalışma alanlarını yalnızca güzel değil; işlevsel, sürdürülebilir ve size özel kılan bir iç mimarlık stüdyosudur. Her projeye mekânın ruhunu ve içinde yaşayanların ihtiyaçlarını dinleyerek başlıyoruz.</p>' +
            '<p>Konut projelerinden ticari mekânlara, ısmarlama mobilyadan mutfak tasarımına kadar geniş bir yelpazede; malzeme, ışık ve oranın uyumunu gözeten bütüncül çözümler üretiyoruz. Amacımız, girdiğiniz anda kendinizi ait hissettiğiniz mekânlar tasarlamak.</p>'
        },
        ozel: {
          hero: 'Özel Tasarım',
          sub: 'Size ve mekânınıza özel çözümler',
          title: 'Özel Tasarım',
          body:
            '<p>Her mekân biriciktir; bu yüzden hazır kalıplar yerine tümüyle size özel tasarımlar geliştiriyoruz. Ölçüden malzemeye, formdan işlevine kadar her ayrıntı, yaşam biçiminize ve zevkinize göre şekilleniyor.</p>' +
            '<p>Ismarlama mobilya, özel dolap sistemleri ve mekâna gömülü çözümlerle her santimetrekareyi verimli ve estetik bir bütüne dönüştürüyoruz. Tasarım sürecini sizinle birlikte, şeffaf bir şekilde yürütüyor; fikirden uygulamaya kadar yanınızda oluyoruz.</p>'
        },
        yasam: {
          hero: 'Yaşam Alanları',
          sub: 'Konut iç mekânları ve mutfak tasarımı',
          title: 'Yaşam Alanları',
          body:
            '<p>İç mekân tasarımında hedefimiz; estetik ile konforu, işlevsellik ile duyguyu aynı çatı altında buluşturmak. Konutlar, ofisler ve ticari alanlar için mekânın potansiyelini en yüksek noktaya taşıyan tasarımlar kurguluyoruz.</p>' +
            '<p>Renk paletinden aydınlatmaya, mobilya seçiminden dokulara kadar her kararı bütünsel bir dille ele alıyoruz. Böylece yalnızca göze değil, yaşayana da hitap eden; zamansız ve dengeli mekânlar ortaya çıkıyor.</p>'
        },
        ticari: {
          hero: 'Ticari Mekanlar',
          sub: 'Markanızı yansıtan ticari tasarımlar',
          title: 'Ticari Mekanlar',
          body:
            '<p>Ofis, mağaza, kafe ve restoran gibi ticari mekânlarda tasarım; yalnızca estetik değil, aynı zamanda marka kimliği, müşteri deneyimi ve verimlilik demektir. Eray Interiors olarak işinizin ihtiyaçlarını ve hedef kitlenizi analiz ederek sizi doğru yansıtan mekânlar kurguluyoruz.</p>' +
            '<p>Karşılama alanlarından çalışma düzenine, aydınlatmadan yönlendirmeye kadar her detayı; markanızı güçlendiren, müşteriyi içeride tutan ve ekibin verimini artıran bir bütün olarak ele alıyoruz. Konseptten uygulamaya kadar süreci uçtan uca yönetiyoruz.</p>'
        }
      }
    },

    en: {
      menu: { yasam: 'Living Spaces', ticari: 'Commercial', ozel: 'Custom Design', blog: 'Blog' },
      search: { placeholder: 'Search…', empty: 'No results found' },
      blog: { title: 'Blog', intro: 'Articles on design, notes from our projects and spaces that inspire.', readmore: 'Read more', back: 'Back to blog', empty: 'No posts yet.' },
      projects: { title: 'Projects', featured: 'Featured Projects', view: 'View project', back: 'Back to projects', empty: 'Project not found.' },
      footer: {
        contact: 'Contact', follow: 'Follow Us',
        rights: '© 2026 Eray Interiors. All rights reserved.'
      },
      page: {
        home: {
          hero: 'ERAY INTERIORS',
          sub: 'Character and elegance for interiors',
          title: 'We Bring Character to Your Spaces',
          body:
            '<p>Eray Interiors is an interior architecture studio that makes living and working spaces not only beautiful, but functional, sustainable and truly yours. Every project begins by listening to the spirit of the space and the needs of the people who live in it.</p>' +
            '<p>From residential projects to commercial spaces, from bespoke furniture to kitchen design, we deliver holistic solutions that balance material, light and proportion. Our goal is to design spaces you feel you belong to the moment you step in.</p>'
        },
        ozel: {
          hero: 'Custom Design',
          sub: 'Solutions tailored to you and your space',
          title: 'Custom Design',
          body:
            '<p>Every space is unique, so instead of ready-made templates we develop designs entirely tailored to you. From dimensions to materials, from form to function, every detail is shaped around your lifestyle and taste.</p>' +
            '<p>With bespoke furniture, custom storage systems and built-in solutions, we turn every square metre into an efficient and elegant whole. We run the design process transparently, standing by you from idea to completion.</p>'
        },
        yasam: {
          hero: 'Living Spaces',
          sub: 'Residential interiors and kitchen design',
          title: 'Living Spaces',
          body:
            '<p>In interior design our aim is to unite aesthetics with comfort, and function with emotion, under one roof. For homes, offices and commercial spaces we create designs that bring out the full potential of a space.</p>' +
            '<p>From the colour palette to lighting, from furniture selection to textures, we handle every decision with a coherent language. The result is timeless, balanced spaces that speak not only to the eye but to those who live in them.</p>'
        },
        ticari: {
          hero: 'Commercial Spaces',
          sub: 'Commercial design that reflects your brand',
          title: 'Commercial Spaces',
          body:
            '<p>In commercial spaces such as offices, stores, cafes and restaurants, design means more than aesthetics — it is brand identity, customer experience and efficiency. At Eray Interiors we analyse your business needs and target audience to create spaces that represent you accurately.</p>' +
            '<p>From reception areas to workflow, from lighting to wayfinding, we treat every detail as a whole that strengthens your brand, keeps customers inside and boosts your team\'s productivity. We manage the process end to end, from concept to completion.</p>'
        }
      }
    },

    es: {
      menu: { yasam: 'Espacios de Vida', ticari: 'Espacios Comerciales', ozel: 'Diseño Personalizado', blog: 'Blog' },
      search: { placeholder: 'Buscar…', empty: 'No se encontraron resultados' },
      blog: { title: 'Blog', intro: 'Artículos sobre diseño, notas de nuestros proyectos y espacios que inspiran.', readmore: 'Leer más', back: 'Volver al blog', empty: 'Aún no hay entradas.' },
      projects: { title: 'Proyectos', featured: 'Proyectos Destacados', view: 'Ver proyecto', back: 'Volver a proyectos', empty: 'Proyecto no encontrado.' },
      footer: {
        contact: 'Contacto', follow: 'Síguenos',
        rights: '© 2026 Eray Interiors. Todos los derechos reservados.'
      },
      page: {
        home: {
          hero: 'ERAY INTERIORS',
          sub: 'Carácter y elegancia para los interiores',
          title: 'Damos Carácter a Sus Espacios',
          body:
            '<p>Eray Interiors es un estudio de arquitectura de interiores que hace que los espacios de vida y trabajo no solo sean bellos, sino funcionales, sostenibles y verdaderamente suyos. Cada proyecto comienza escuchando el alma del espacio y las necesidades de quienes lo habitan.</p>' +
            '<p>Desde proyectos residenciales hasta espacios comerciales, del mobiliario a medida al diseño de cocinas, ofrecemos soluciones integrales que equilibran material, luz y proporción. Nuestro objetivo es diseñar espacios a los que sienta que pertenece desde el primer momento.</p>'
        },
        ozel: {
          hero: 'Diseño Personalizado',
          sub: 'Soluciones a medida para usted y su espacio',
          title: 'Diseño Personalizado',
          body:
            '<p>Cada espacio es único, por eso en lugar de plantillas prefabricadas desarrollamos diseños totalmente hechos a su medida. De las dimensiones a los materiales, de la forma a la función, cada detalle se moldea según su estilo de vida y su gusto.</p>' +
            '<p>Con mobiliario a medida, sistemas de almacenamiento personalizados y soluciones integradas, convertimos cada metro cuadrado en un conjunto eficiente y elegante. Llevamos el proceso de diseño de forma transparente, a su lado desde la idea hasta la ejecución.</p>'
        },
        yasam: {
          hero: 'Espacios de Vida',
          sub: 'Interiores residenciales y diseño de cocinas',
          title: 'Espacios de Vida',
          body:
            '<p>En el diseño de interiores nuestro objetivo es unir la estética con el confort, y la función con la emoción, bajo un mismo techo. Para viviendas, oficinas y espacios comerciales creamos diseños que revelan todo el potencial de un espacio.</p>' +
            '<p>De la paleta de colores a la iluminación, de la selección de mobiliario a las texturas, abordamos cada decisión con un lenguaje coherente. El resultado son espacios atemporales y equilibrados que hablan no solo a la vista, sino a quienes los habitan.</p>'
        },
        ticari: {
          hero: 'Espacios Comerciales',
          sub: 'Diseño comercial que refleja su marca',
          title: 'Espacios Comerciales',
          body:
            '<p>En espacios comerciales como oficinas, tiendas, cafeterías y restaurantes, el diseño es más que estética: es identidad de marca, experiencia del cliente y eficiencia. En Eray Interiors analizamos las necesidades de su negocio y su público objetivo para crear espacios que lo representen con precisión.</p>' +
            '<p>Desde las áreas de recepción hasta el flujo de trabajo, de la iluminación a la señalización, tratamos cada detalle como un conjunto que fortalece su marca, retiene a los clientes y aumenta la productividad de su equipo. Gestionamos el proceso de principio a fin, del concepto a la ejecución.</p>'
        }
      }
    }
  };

  const STORAGE_KEY = 'eray_lang';

  function current() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LANGS.some(l => l.code === saved) ? saved : 'tr';
  }

  // Noktalı anahtarı (ör. "page.home.body") ilgili dilde çözer.
  function t(key, lang) {
    lang = lang || current();
    const parts = key.split('.');
    let node = translations[lang];
    for (const p of parts) {
      if (node == null) return null;
      node = node[p];
    }
    return node == null ? null : node;
  }

  function apply(lang) {
    lang = lang || current();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.getAttribute('data-i18n'), lang);
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = t(el.getAttribute('data-i18n-placeholder'), lang);
      if (val != null) el.setAttribute('placeholder', val);
    });
  }

  function set(lang) {
    if (!LANGS.some(l => l.code === lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  return { LANGS, translations, t, current, apply, set };
})();
