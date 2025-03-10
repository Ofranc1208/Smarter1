document.addEventListener('DOMContentLoaded', () => {
  // Get the current pathname; if at the root, default to '/index.html'
  let currentPath = window.location.pathname;
  if (currentPath === '/' || currentPath === '') {
    currentPath = '/index.html';
  }
  
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    // Create an absolute URL for the link
    const linkURL = new URL(link.getAttribute('href'), window.location.origin);
    // Compare the link's pathname to the current path
    if (linkURL.pathname === currentPath) {
      link.classList.add('active');
    }
  });
});
