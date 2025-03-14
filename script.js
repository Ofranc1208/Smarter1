document.addEventListener('DOMContentLoaded', () => {
  // Highlight active navigation link
  let currentPath = window.location.pathname;
  if (currentPath === '/' || currentPath === '') {
    currentPath = '/index.html';
  }
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const linkURL = new URL(link.getAttribute('href'), window.location.origin);
    if (linkURL.pathname === currentPath) {
      link.classList.add('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Animate counters over 2 seconds using Intersection Observer
  const counters = document.querySelectorAll(".counter");
  const duration = 2000; // 2 seconds

  const animateCounter = (counter, startTime) => {
    const target = +counter.getAttribute("data-target");
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    counter.innerText = Math.ceil(progress * target);
    if (progress < 1) {
      requestAnimationFrame(() => animateCounter(counter, startTime));
    } else {
      counter.innerText = target;
    }
  };

  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const startTime = performance.now();
        animateCounter(counter, startTime);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
});
