document.addEventListener('DOMContentLoaded', () => {
// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
menuToggle.addEventListener('click', () => {
nav.classList.toggle('active');
menuToggle.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-list a').forEach(link => {
link.addEventListener('click', () => {
nav.classList.remove('active');
menuToggle.classList.remove('active');
});
});
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
const question = item.querySelector('.faq-question');
question.addEventListener('click', () => {
// Close other items
faqItems.forEach(other => {
if (other !== item) {
other.classList.remove('active');
}
});
// Toggle current item
item.classList.toggle('active');
});
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
const targetId = this.getAttribute('href');
if (targetId === '#') return;
const targetElement = document.querySelector(targetId);
if (targetElement) {
e.preventDefault();
const headerHeight = document.getElementById('header').offsetHeight;
const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
});
});
});
// ===== スクロールアニメーション =====

const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
}
});
}, {
threshold: 0.15
});

fadeElements.forEach((element) => {
observer.observe(element);
});
