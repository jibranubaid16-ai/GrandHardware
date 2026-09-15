/**
 * Grand Hardware - Main JavaScript
 * Handles navigation, intro overlay, contact forms, quote modal, and scroll-to-top interaction.
 */

// Mobile Navigation Toggle
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
  const open = nav?.classList.toggle('open');
  button?.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav?.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
}));

// Add the matching local icon to phone, email and map links across the site.
const linkIcons = [
  ['a[href^="tel:"], a[href*="wa.me"]', 'all%20svg%20logo/whatsapp-svgrepo-com.svg'],
  ['a[href^="mailto:"]', 'all%20svg%20logo/gmail-svgrepo-com.svg'],
  ['a[href*="google.com/maps"]', 'map%20logo/f1f869091988a0e482808ad072201080.jpg']
];
linkIcons.forEach(([selector, src]) => document.querySelectorAll(selector).forEach(link => {
  if (link.querySelector('.contact-icon')) return;
  const icon = document.createElement('img');
  icon.className = 'contact-icon';
  icon.src = src;
  icon.alt = '';
  link.prepend(icon);
  link.closest('li')?.classList.add('contact-list-item');
}));

document.querySelectorAll('[data-contact-action]').forEach(action => {
  if (action.querySelector('.contact-icon')) return;
  const icon = document.createElement('img');
  icon.className = 'contact-icon';
  icon.src = action.dataset.contactAction === 'email' ? 'all%20svg%20logo/gmail-svgrepo-com.svg' : 'all%20svg%20logo/whatsapp-svgrepo-com.svg';
  icon.alt = '';
  action.prepend(icon);
});

// Main Contact Form Handler (Index & Footer)
const contactForm = document.querySelector('.contact-form:not(.modal-form)');
contactForm?.addEventListener('click', event => {
  const action = event.target.closest('[data-contact-action]')?.dataset.contactAction;
  if (!action || !contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const message = `New enquiry from Grand Hardware website\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\nInterested in: ${data.get('interest') || 'Aluminium profiles'}\n\nMessage:\n${data.get('text')}`;
  if (action === 'whatsapp') window.open(`https://wa.me/8240522314?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  else window.location.href = `mailto:grandhardware37@gmail.com?subject=${encodeURIComponent('New website enquiry')}&body=${encodeURIComponent(message)}`;
});

// ----------------------------------------------------
// GLOBAL QUOTE MODAL SYSTEM
// ----------------------------------------------------
const quoteModal = document.getElementById('quoteModal');
const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');
const quoteModalForm = document.getElementById('quoteModalForm');
const quoteProductName = document.getElementById('quoteProductName');

window.openQuoteModal = (productName = 'Aluminum Sections') => {
  if (quoteProductName) quoteProductName.value = productName;
  if (quoteModal) {
    quoteModal.classList.add('is-active');
    quoteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

window.closeQuoteModal = () => {
  if (quoteModal) {
    quoteModal.classList.remove('is-active');
    quoteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

closeQuoteModalBtn?.addEventListener('click', window.closeQuoteModal);

quoteModal?.addEventListener('click', (e) => {
  if (e.target === quoteModal) window.closeQuoteModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && quoteModal?.classList.contains('is-active')) {
    window.closeQuoteModal();
  }
});

// Quote Modal Submit Handler
quoteModalForm?.addEventListener('click', (event) => {
  const submitTarget = event.target.closest('[data-modal-submit]');
  if (!submitTarget) return;

  const action = submitTarget.dataset.modalSubmit;
  if (!quoteModalForm.reportValidity()) return;

  const data = new FormData(quoteModalForm);
  const selectedProd = data.get('product') || 'Aluminum Product';
  const name = data.get('name');
  const phone = data.get('phone');
  const email = data.get('email') || 'Not provided';
  const text = data.get('text');

  const message = `Hello Grand Hardware,\n\nI am requesting a quote for: ${selectedProd}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nRequirements:\n${text}`;

  if (action === 'whatsapp') {
    window.open(`https://wa.me/8240522314?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  } else {
    window.location.href = `mailto:grandhardware37@gmail.com?subject=${encodeURIComponent('Quote Request: ' + selectedProd)}&body=${encodeURIComponent(message)}`;
  }
  window.closeQuoteModal();
});

// ----------------------------------------------------
// SCROLL TO TOP BUTTON
// ----------------------------------------------------
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
