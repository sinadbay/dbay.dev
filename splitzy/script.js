(function () {
  'use strict';

  // Scroll-triggered visibility
  var observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.spl-feature-card, .spl-step').forEach(function (el) {
    observer.observe(el);
  });

  // Nav background on scroll
  var nav = document.querySelector('.spl-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.spl-nav-toggle');
  var navLinks = document.querySelector('.spl-nav-links');
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

  // Optional: subtle settlement demo animation (numbers count or pulse)
  var demoBox = document.querySelector('.spl-demo-box');
  if (demoBox && typeof IntersectionObserver !== 'undefined') {
    var demoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          demoBox.style.animation = 'spl-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }
      });
    }, { threshold: 0.3 });
    demoObserver.observe(demoBox);
  }
})();
