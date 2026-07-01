/* ============================================================
   İnline SVG ikonlar ve bayraklar (harici dosya/lisans gerektirmez).
   Bayraklar Windows dahil her platformda tutarlı görünsün diye
   emoji yerine SVG olarak çizilmiştir.
   ============================================================ */

window.ICONS = {
  search:
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.6" y1="16.6" x2="21" y2="21"/></svg>',
  chevronDown:
    '<svg class="chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>',
  arrowLeft:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><polyline points="15 5 8 12 15 19"/></svg>',
  arrowRight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><polyline points="9 5 16 12 9 19"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.58 3.6 1 1 0 01-.24 1z"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.1 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.8-.1-1.6-.15-2.4-.15-2.4 0-4.05 1.45-4.05 4.15v2.3H7.1V14h2.75v8z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  pinterest:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.6 2 4 5.7 4 8.9c0 1.9.7 3.6 2.3 4.2.25.1.48 0 .55-.28l.22-.86c.07-.27.04-.37-.16-.6-.44-.52-.72-1.2-.72-2.15 0-2.77 2.07-5.25 5.4-5.25 2.95 0 4.57 1.8 4.57 4.2 0 3.16-1.4 5.83-3.47 5.83-1.15 0-2-.95-1.73-2.12.33-1.4.97-2.9.97-3.9 0-.9-.48-1.65-1.48-1.65-1.17 0-2.12 1.22-2.12 2.85 0 1.04.35 1.74.35 1.74l-1.4 5.95c-.42 1.76-.06 3.9-.03 4.12.02.13.18.16.26.06.1-.14 1.5-1.86 1.97-3.57l.76-2.9c.38.72 1.48 1.34 2.64 1.34 3.48 0 5.84-3.17 5.84-7.42C20 5.06 17.1 2 12 2z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.4H3.7V21h3.24zM5.33 3.4a1.88 1.88 0 100 3.76 1.88 1.88 0 000-3.76zM21 21h-3.24v-6.16c0-1.47-.53-2.47-1.85-2.47-1.01 0-1.6.68-1.87 1.34-.1.24-.12.57-.12.9V21H10.7s.04-11.4 0-12.6h3.22v1.79c.43-.66 1.2-1.6 2.93-1.6 2.14 0 3.75 1.4 3.75 4.4z"/></svg>'
};

/* Bayraklar — SVG viewport taşan kısımları otomatik kırpar (clip gerekmez) */
window.FLAGS = {
  tr:
    '<span class="flag" title="Türkçe"><svg viewBox="0 0 30 20" width="22" height="15"><rect width="30" height="20" fill="#E30A17"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="13.6" cy="10" r="4" fill="#E30A17"/><path fill="#fff" d="M17.6 10l3.1-1-1.9 2.6v-3.2l1.9 2.6z"/></svg></span>',
  en:
    '<span class="flag" title="English"><svg viewBox="0 0 60 40" width="22" height="15"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="4"/><rect x="25" width="10" height="40" fill="#fff"/><rect y="15" width="60" height="10" fill="#fff"/><rect x="27" width="6" height="40" fill="#C8102E"/><rect y="17" width="60" height="6" fill="#C8102E"/></svg></span>',
  es:
    '<span class="flag" title="Español"><svg viewBox="0 0 30 20" width="22" height="15"><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/></svg></span>'
};
