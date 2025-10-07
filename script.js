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
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -12% 0px' });

  items.forEach(el => io.observe(el));
})();

// Simple video loading - disabled on mobile
(function() {
  const heroVideo = document.querySelector('.hero__video');
  const heroPlaceholder = document.querySelector('.hero__placeholder');
  const inlineVideo = document.querySelector('.inline-video');
  const inlinePlaceholder = document.querySelector('.inline-placeholder');
  
  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   window.innerWidth <= 768 || 
                   ('ontouchstart' in window);
  
  const playVideos = () => {
    // Skip video loading on mobile devices
    if (isMobile) {
      return;
    }
    
    if (heroVideo && heroPlaceholder) {
      heroVideo.play().then(() => {
        heroPlaceholder.style.opacity = '0';
        heroVideo.classList.add('playing');
      }).catch(() => {});
    }
    
    if (inlineVideo && inlinePlaceholder) {
      inlineVideo.play().then(() => {
        inlinePlaceholder.style.display = 'none';
        inlineVideo.style.display = 'block';
        inlineVideo.classList.add('playing');
      }).catch(() => {});
    }
  };
  
  // Try immediately (only on desktop)
  playVideos();
  
  // Try on any user interaction (only on desktop)
  ['touchstart', 'touchend', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, playVideos, { once: true, passive: true });
  });
})();
