// CONTACT: change this address to your real inbox
const CONTACT_EMAIL = 'hello@deepsyke.com';

const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
document.getElementById('yr').textContent = new Date().getFullYear();

// reveal on scroll
const io = new IntersectionObserver((es) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

// chat animation starts when visible
const chat = document.getElementById('chat');
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { chat.classList.add('live'); o.disconnect(); } }, { threshold: .4 }).observe(chat);

// form -> mailto
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nBusiness: ${f.get('business')}\nInterested in: ${f.get('model')}\n\n${f.get('msg')}`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Enquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
});
