(function () {
  'use strict';

  var observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.dk-feature-card, .dk-plan').forEach(function (el) {
    observer.observe(el);
  });

  var nav = document.querySelector('.dk-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  var toggle = document.querySelector('.dk-nav-toggle');
  var navLinks = document.querySelector('.dk-nav-links');
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
