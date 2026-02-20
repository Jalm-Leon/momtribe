/* ═══════════════════════════════════════════════════════════════
   momtribe — script.js
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Elementos ──────────────────────────────────────────────── */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('nav-menu');
  const navLinks   = document.querySelectorAll('.navbar__link, .navbar__mobile-cta');
  const yearEl     = document.getElementById('year');

  /* ── Año en footer ──────────────────────────────────────────── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar: clase al hacer scroll ─────────────────────────── */
  function onScroll() {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Menú hamburger ─────────────────────────────────────────── */
  function toggleMenu(force) {
    const open = force !== undefined ? force : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', open);
    hamburger.classList.toggle('navbar__hamburger--open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* ── Smooth scroll compensando navbar fijo ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id === '#0') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Animaciones de entrada (IntersectionObserver) ──────────── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostrar todo sin animación
    reveals.forEach(el => el.classList.add('is-visible'));
  }

})();
