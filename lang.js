(function () {
  var lang = localStorage.getItem('lang') || 'en';
  document.documentElement.lang = lang;

  function applyTitle() {
    var t = document.documentElement.getAttribute('data-title-' + lang);
    if (t) document.title = t;
  }

  function injectToggle() {
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.textContent = lang === 'en' ? 'ES' : 'EN';
    btn.addEventListener('click', function () {
      lang = lang === 'en' ? 'es' : 'en';
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      btn.textContent = lang === 'en' ? 'ES' : 'EN';
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
