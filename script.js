/****************************************************
 * MAIN SCRIPTS
 ****************************************************/
document.addEventListener('DOMContentLoaded', () => {
  /* ----------------------------------------------
   * 1) Highlight Active Navigation Link
   * ---------------------------------------------- */
  let currentPath = window.location.pathname;
  if (currentPath === '/' || currentPath === '') {
    currentPath = '/index.html'; // Fallback if root path is blank
  }
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const linkURL = new URL(link.getAttribute('href'), window.location.origin);
    if (linkURL.pathname === currentPath) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------
   * 2) Cookie Notification Popup
   * ---------------------------------------------- */
  const cookieConsent = document.getElementById('cookieConsent');
  if (cookieConsent && !localStorage.getItem('cookieConsent')) {
    cookieConsent.style.display = 'flex';
  }

  const acceptCookies = document.getElementById('acceptCookies');
  const disableTracking = document.getElementById('disableTracking');

  if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.style.display = 'none';
      // If needed, load analytics scripts here.
    });
  }

  if (disableTracking) {
    disableTracking.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'disabled');
      cookieConsent.style.display = 'none';
      // If needed, disable analytics scripts here.
    });
  }

  /* ----------------------------------------------
   * 3) Counter Animation via IntersectionObserver
   * ---------------------------------------------- */
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported. Consider adding a polyfill.');
  }
  const counters = document.querySelectorAll('.counter');
  const duration = 2500; // 2.5s animation

  const animateCounter = (counter, startTime) => {
    const target = +counter.getAttribute('data-target');
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Calculate current value and update text
    const currentValue = Math.ceil(progress * target);
    counter.textContent = prefix + currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(() => animateCounter(counter, startTime));
    } else {
      // Final exact value
      counter.textContent = prefix + target + suffix;
    }
  };

  const observerOptions = { root: null, threshold: 0.5 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const startTime = performance.now();
        animateCounter(entry.target, startTime);
        obs.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  /* ----------------------------------------------
   * 4) (Optional) Speed-Dial or FAB Toggle
   * ---------------------------------------------- */
  const speedDial = document.querySelector('.fab-speed-dial');
  const mainFab = document.querySelector('.fab-main');
  if (mainFab && speedDial) {
    mainFab.addEventListener('click', () => {
      speedDial.classList.toggle('open');
    });
  }
});

/****************************************************
 * YOUTUBE IFRAME API
 ****************************************************/
// Keep these as global so YouTube's API can invoke them
var players = [];

/**
 * Called automatically by YouTube's IFrame API once it’s loaded.
 */
function onYouTubeIframeAPIReady() {
  const iframes = document.querySelectorAll('#profileCarousel iframe');
  iframes.forEach(iframe => {
    // Ensure enablejsapi=1 for script control
    let src = iframe.getAttribute('src') || '';
    if (!src.includes('enablejsapi=1')) {
      const separator = src.includes('?') ? '&' : '?';
      src += separator + 'enablejsapi=1';
      iframe.setAttribute('src', src);
    }

    // Create a new YouTube player
    const player = new YT.Player(iframe, {
      events: {
        onStateChange: onPlayerStateChange
      }
    });
    players.push(player);
  });
}

/**
 * Pause the Bootstrap carousel if a video is playing.
 */
function pauseCarousel() {
  const carouselEl = document.getElementById('profileCarousel');
  if (!carouselEl) return;

  const carouselInstance = bootstrap.Carousel.getInstance(carouselEl);
  if (carouselInstance) {
    console.log('Pausing carousel because video is playing/clicked');
    carouselInstance.pause();
    // Also disable auto sliding
    carouselEl.setAttribute('data-bs-interval', 'false');
  }
}

/**
 * Callback when a YouTube video’s state changes.
 * Pauses the carousel on PLAYING state.
 */
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    pauseCarousel();
  }
}

/****************************************************
 * ADDITIONAL EXAMPLE FUNCTIONS
 ****************************************************/
/** 
 * Example Chat function placeholder.
 * Replace alert() with actual chat integration.
 */
function openChatFunction() {
  alert('Launching chat window...');
  // Insert real chat code or link here
}
