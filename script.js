const button = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const intro = document.querySelector('.intro-screen');
const closeIntro = () => {
  intro?.classList.add('is-hidden');
  document.body.classList.remove('intro-open');
  setTimeout(() => intro?.remove(), 450);
};
if (intro) setTimeout(closeIntro, 2000);
button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
}));

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('click', event => {
  const action = event.target.closest('[data-contact-action]')?.dataset.contactAction;
  if (!action || !contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const message = `New enquiry from Grand Hardware website\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\nInterested in: ${data.get('interest')}\n\nMessage:\n${data.get('text')}`;
  if (action === 'whatsapp') window.open(`https://wa.me/82405522314?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  else window.location.href = `mailto:grandhardware37@gmail.com?subject=${encodeURIComponent('New website enquiry')}&body=${encodeURIComponent(message)}`;
});
