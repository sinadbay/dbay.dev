(function () {
  'use strict';

  // Language: English by default. Remember a reader's explicit choice, and
  // send someone who chose Persian before straight to it next time.
  var LANG_KEY = 'hn-lang';
  var pageLang = document.documentElement.lang === 'fa' ? 'fa' : 'en';
  try {
    var saved = localStorage.getItem(LANG_KEY);
    if (pageLang === 'en' && saved === 'fa' && !/[?&]lang=en/.test(location.search)) {
      location.replace('fa/' + location.hash);
      return;
    }
  } catch (e) { /* storage unavailable: just stay on this page */ }
  document.querySelectorAll('[data-lang]').forEach(function (link) {
    link.addEventListener('click', function () {
      try { localStorage.setItem(LANG_KEY, link.getAttribute('data-lang')); } catch (e) {}
    });
  });

  var observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.hn-feature-card, .hn-plan').forEach(function (el) {
    observer.observe(el);
  });

  var nav = document.querySelector('.hn-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  var toggle = document.querySelector('.hn-nav-toggle');
  var navLinks = document.querySelector('.hn-nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();
