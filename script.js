
document.addEventListener('DOMContentLoaded', function () {

  const preloader = document.getElementById('preloader');

  window.addEventListener('load', function () {
    preloader.classList.add('loaded');
  });

  setTimeout(function () {
    preloader.classList.add('loaded');
  }, 1500);


  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); 


  const hamburger = document.getElementById('hamburger');
  const navbarNav = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navbarNav.classList.toggle('open');
    const isOpen = navbarNav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });


  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const navHeight = navbar.offsetHeight + 20;
    let currentSectionId = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navHeight;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);
  highlightActiveNav(); 


  const fadeElements = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  const backToTopBtn = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


 
  const heroBg = document.getElementById('heroBg');

  function handleHeroParallax() {
    if (!heroBg) return;
    const scrollPos = window.scrollY;
    
    if (scrollPos < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + scrollPos * 0.35 + 'px)';
    }
  }

  window.addEventListener('scroll', handleHeroParallax);


  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const submitBtn = newsletterForm.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Thank You!';
      emailInput.value = '';

      setTimeout(function () {
        submitBtn.textContent = originalText;
      }, 2500);
    });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
