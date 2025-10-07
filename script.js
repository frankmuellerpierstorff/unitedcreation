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

// Handle video loading with image placeholders
(function() {
  const heroVideo = document.querySelector('.hero__video');
  const heroPlaceholder = document.querySelector('.hero__placeholder');
  const inlineVideo = document.querySelector('.inline-video');
  const inlinePlaceholder = document.querySelector('.inline-placeholder');
  
  const playVideos = () => {
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
  
  // Try immediately
  playVideos();
  
  // Try on any user interaction
  ['touchstart', 'touchend', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, playVideos, { once: true, passive: true });
  });
  
  // Try when page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(playVideos, 100);
    }
  });
  
  // Continuously hide hero video controls
  if (heroVideo) {
    const hideControls = () => {
      const controls = heroVideo.querySelectorAll('*');
      controls.forEach(control => {
        if (control.style) {
          control.style.display = 'none';
          control.style.visibility = 'hidden';
          control.style.opacity = '0';
        }
      });
    };
    
    // Hide controls immediately and continuously
    hideControls();
    setInterval(hideControls, 100);
    
    // Also hide on video events
    heroVideo.addEventListener('loadeddata', hideControls);
    heroVideo.addEventListener('playing', hideControls);
    heroVideo.addEventListener('timeupdate', hideControls);
  }
})();
