// Navigation Active Link Highlight
document.addEventListener('DOMContentLoaded', () => {
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

// Counter Animation with Prefix/Suffix Support
document.addEventListener("DOMContentLoaded", function() {
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver is not supported. Consider adding a polyfill.");
  }
  const counters = document.querySelectorAll(".counter");
  const duration = 2500; // Duration in milliseconds

  const animateCounter = (counter, startTime) => {
    const target = +counter.getAttribute("data-target");
    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.ceil(progress * target);
    counter.innerText = prefix + currentValue + suffix;
    if (progress < 1) {
      requestAnimationFrame(() => animateCounter(counter, startTime));
    } else {
      counter.innerText = prefix + target + suffix;
    }
  };

  const observerOptions = { root: null, threshold: 0.5 };
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

// Cookie Notification Popup
document.addEventListener('DOMContentLoaded', function() {
  const cookieConsent = document.getElementById('cookieConsent');
  if (!localStorage.getItem('cookieConsent')) {
    cookieConsent.style.display = 'flex';
  }
  const acceptCookies = document.getElementById('acceptCookies');
  const disableTracking = document.getElementById('disableTracking');

  if (acceptCookies) {
    acceptCookies.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.style.display = 'none';
      // Load analytics scripts here if necessary.
    });
  }

  if (disableTracking) {
    disableTracking.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'disabled');
      // Disable tracking code here if necessary.
      cookieConsent.style.display = 'none';
    });
  }
});

// YouTube IFrame API: Pause Carousel When Video Plays
var players = [];
function onYouTubeIframeAPIReady() {
  const iframes = document.querySelectorAll('#profileCarousel iframe');
  iframes.forEach((iframe) => {
    // Ensure the iframe URL includes "enablejsapi=1"
    let src = iframe.getAttribute('src');
    if (!src.includes('enablejsapi=1')) {
      const separator = src.includes('?') ? '&' : '?';
      src += separator + 'enablejsapi=1';
      iframe.setAttribute('src', src);
    }
    // Create a new YouTube player instance for each iframe
    const player = new YT.Player(iframe, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
    players.push(player);
  });
}

function pauseCarousel() {
  const carouselEl = document.getElementById('profileCarousel');
  const carouselInstance = bootstrap.Carousel.getInstance(carouselEl);
  if (carouselInstance) {
    console.log("Pausing carousel because video is playing/clicked");
    carouselInstance.pause();
    // Optionally disable auto sliding completely by clearing the interval if it exists
    if (carouselInstance._interval) {
      clearInterval(carouselInstance._interval);
      carouselInstance._interval = null;
    }
  }
}

function onPlayerStateChange(event) {
  // If the video starts playing, pause the carousel
  if (event.data === YT.PlayerState.PLAYING) {
    pauseCarousel();
  }
}

// Additionally, add click event listeners to each iframe to pause the carousel when clicked
document.addEventListener("DOMContentLoaded", () => {
  const iframes = document.querySelectorAll('#profileCarousel iframe');
  iframes.forEach(iframe => {
    iframe.addEventListener('click', () => {
      pauseCarousel();
    });
  });
});
