/* ============================================================
   Paylaşılan iletişim bölümü (footer).
   Sol: İletişim (e-posta + telefon)  ·  Sağ: Bizi Takip Edin.
   Sosyal bağlantıları güncellemek için aşağıdaki SOCIAL dizisini
   düzenleyin.
   ============================================================ */

window.renderFooter = function () {
  const host = document.getElementById('site-footer');
  if (!host) return;

  const SOCIAL = [
    { name: 'Instagram', icon: ICONS.instagram, href: 'https://instagram.com/erayinteriors' },
    { name: 'LinkedIn',  icon: ICONS.linkedin,  href: 'https://www.linkedin.com/in/ibrahim-eray-i%C5%9F%C4%B1k-976782159/' }
  ];

  const social = SOCIAL.map(s =>
    `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name}" title="${s.name}">${s.icon}</a>`
  ).join('');

  host.innerHTML = `
    <div class="footer-inner">
      <div class="footer-col footer-left">
        <h3 data-i18n="footer.contact">İletişim</h3>
        <div class="contact-item">${ICONS.mail}<a href="mailto:info@erayinteriors.com">info@erayinteriors.com</a></div>
        <div class="contact-item">${ICONS.phone}<a href="tel:+905071648959">+90 507 164 8959</a></div>
      </div>
      <div class="footer-col footer-right">
        <h3 data-i18n="footer.follow">Bizi Takip Edin</h3>
        <div class="social">${social}</div>
      </div>
    </div>
    <div class="footer-bottom" data-i18n="footer.rights"></div>`;
};
