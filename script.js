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

// Handle video loading with spinner
(function() {
  const heroVideo = document.querySelector('.hero__bg');
  const heroLoading = document.getElementById('heroLoading');
  
  if (heroVideo && heroLoading) {
    // Hide spinner when video starts playing
    heroVideo.addEventListener('playing', () => {
      heroLoading.style.display = 'none';
    });
    
    // Try to play the video
    heroVideo.play().catch(e => {
      console.log('Autoplay blocked:', e);
    });
  }
  
  // Handle inline video normally
  const inlineVideo = document.querySelector('.inline-video');
  if (inlineVideo) {
    inlineVideo.play();
  }
})();
