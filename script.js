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

// Force play videos on mobile
(function() {
  const videos = document.querySelectorAll('video');
  
  // Try to play videos immediately
  videos.forEach(video => {
    video.play().catch(e => {
      console.log('Autoplay blocked:', e);
    });
  });
  
  // Try again on first user interaction
  const playVideos = () => {
    videos.forEach(video => {
      if (video.paused) {
        video.play().catch(e => console.log('Play failed:', e));
      }
    });
  };
  
  // Listen for any user interaction
  ['touchstart', 'touchend', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, playVideos, { once: true, passive: true });
  });
})();
