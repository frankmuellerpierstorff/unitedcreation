// Wait for hero image to load before showing logo and button
(function () {
  const heroImg = document.querySelector('.hero__bg');
  const heroHeader = document.querySelector('.hero__header');
  
  if (heroImg && heroHeader) {
    let loaded = false;
    
    const showContent = () => {
      if (!loaded) {
        loaded = true;
        heroHeader.classList.add('loaded');
      }
    };
    
    // If image is already loaded (cached)
    if (heroImg.complete && heroImg.naturalHeight !== 0) {
      showContent();
    } else {
      // Wait for load event
      heroImg.addEventListener('load', showContent);
      // Fallback timeout to ensure content shows even if load event doesn't fire
      setTimeout(showContent, 2000);
    }
  }
})();

// Simple IntersectionObserver to reveal sections on scroll
(function () {
  const items = document.querySelectorAll('.fade-on-view');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
      } else {
        e.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -12% 0px' });

  items.forEach(el => io.observe(el));
})();
