(function () {
  var lang = localStorage.getItem('lang') || 'es';
  document.documentElement.lang = lang;

  function labelFor(l) {
    return l === 'en' ? '\ud83c\uddea\ud83c\uddf8 ES' : '\ud83c\uddec\ud83c\udde7 EN';
  }

  function applyTitle() {
    var t = document.documentElement.getAttribute('data-title-' + lang);
    if (t) document.title = t;
  }

  function injectToggle() {
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.textContent = labelFor(lang);
    btn.addEventListener('click', function () {
      lang = lang === 'en' ? 'es' : 'en';
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      btn.textContent = labelFor(lang);
      applyTitle();
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyTitle();
      injectToggle();
    });
  } else {
    applyTitle();
    injectToggle();
  }
})();
