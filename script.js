// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Subtle scroll reveal — enhancement only. Content stays visible (see CSS)
// unless we activate the animated pre-state AND can guarantee reveal.
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal-active');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  // Safety net: if anything is somehow still hidden after load (e.g. a
  // headless renderer that never fires intersection events), reveal it.
  window.addEventListener('load', () => {
    setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in')), 800);
  });
}

// Mobile/Desktop view toggle — forces layout via container query width,
// independent of the visitor's actual screen size.
const siteFrame = document.getElementById('siteFrame');
const viewToggle = document.getElementById('viewToggle');
if (siteFrame && viewToggle) {
  viewToggle.addEventListener('click', () => {
    if (siteFrame.classList.contains('force-mobile')) {
      siteFrame.classList.remove('force-mobile');
      siteFrame.classList.add('force-desktop');
      viewToggle.textContent = 'Switch to Mobile View';
    } else {
      siteFrame.classList.remove('force-desktop');
      siteFrame.classList.add('force-mobile');
      viewToggle.textContent = 'Switch to Desktop View';
    }
  });
}
