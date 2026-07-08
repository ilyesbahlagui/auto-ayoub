/**
 * HAL AUTO - Main JavaScript
 * Smooth scroll, fade-in animations, mobile menu, scroll-to-top, and lazy loading
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================
  // LAZY LOADING IMAGES
  // ===================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
  // ===================================
  // MOBILE MENU TOGGLE
  // ===================================
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('is-active');
      const icon = burger.querySelector('i');
      if (nav.classList.contains('is-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    nav.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ===================================
  // FADE-IN ON SCROLL (IntersectionObserver)
  // ===================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  }

  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================
  // HEADER SHADOW ON SCROLL
  // ===================================
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    });
  }

  // ===================================
  // CLOSE MOBILE MENU ON CLICK OUTSIDE
  // ===================================
  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('is-active')) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('is-active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  // ===================================
  // SCROLL TO TOP BUTTON
  // ===================================
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
