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
  
  // Hero video
  if (heroVideo && heroPlaceholder) {
    heroVideo.addEventListener('playing', () => {
      heroPlaceholder.style.opacity = '0';
      heroVideo.classList.add('playing');
    });
    
    heroVideo.play().catch(e => {
      console.log('Hero video autoplay blocked, keeping image');
    });
  }
  
  // Inline video
  if (inlineVideo && inlinePlaceholder) {
    inlineVideo.addEventListener('playing', () => {
      inlinePlaceholder.style.display = 'none';
      inlineVideo.style.display = 'block';
      inlineVideo.classList.add('playing');
    });
    
    inlineVideo.play().catch(e => {
      console.log('Inline video autoplay blocked, keeping image');
    });
  }
})();
