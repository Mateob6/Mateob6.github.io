(function () {
  var lang = localStorage.getItem('lang') || 'es';
  document.documentElement.lang = lang;

  function labelFor(l) {
    return l === 'en' ? '🇪🇸 ES' : '🇬🇧 EN';
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

    // Style for TopAppBar integration
    btn.style.cssText = 'padding:0.3rem 0.6rem;border-radius:4px;border:1px solid rgba(193,199,208,0.3);background:transparent;color:#004c7c;font-family:Inter,sans-serif;font-size:0.75rem;font-weight:600;cursor:pointer;transition:all 0.2s;letter-spacing:0.02em;';

    btn.addEventListener('mouseenter', function() {
      btn.style.background = '#004c7c';
      btn.style.color = '#fff';
      btn.style.borderColor = '#004c7c';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.background = 'transparent';
      btn.style.color = '#004c7c';
      btn.style.borderColor = 'rgba(193,199,208,0.3)';
    });

    btn.addEventListener('click', function () {
      lang = lang === 'en' ? 'es' : 'en';
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      btn.textContent = labelFor(lang);
      applyTitle();
    });

    // Insert into the TopAppBar header, before the nav
    var header = document.querySelector('header .flex');
    if (header) {
      var rightSide = header.querySelector('.flex.items-center.gap-4');
      if (rightSide) {
        rightSide.insertBefore(btn, rightSide.firstChild);
        return;
      }
    }
    // Fallback: append to body
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
