const words = ['beautiful websites.', 'clean interfaces.', 'great UX.', 'cool stuff.'];
let wi = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');

function type() {
  const w = words[wi];
  typedEl.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
  if (!del && ci > w.length) { del = true; setTimeout(type, 1200); return; }
  if (del && ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; }
  setTimeout(type, del ? 40 : 80);
}
type();

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const cats = card.dataset.cat || '';
    card.style.display = (cat === 'all' || cats.includes(cat)) ? 'block' : 'none';
  });
}


function openOverlay(id) {
  document.querySelectorAll('.overlay-content').forEach(function(el) {
    el.style.display = 'none';
  });

  document.getElementById('overlay-' + id).style.display = 'block';

  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeOverlayBackdrop(e) {
  if (e.target === document.getElementById('overlay') || e.target.classList.contains('overlay-backdrop')) {
    closeOverlay();
  }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });