// Animations Module - Typing effects & Scroll animations

// ScrollReveal Animations
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed.js effect for home section
const typed = new Typed('.multiple-text', {
    strings: ['Data Engineer', 'AI Engineer', 'Backend Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Simple typing effect for about section
const text = "Truong Tien Anh";
let index = 0;
const typedText = document.querySelector(".typed-text");

function typeEffect() {
    if (index < text.length) {
        typedText.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
    }
}

if (typedText) {
    typeEffect();
}

// Generic typing effect function
function typeEffect1(element, text, speed) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Typing effect for blockquote
const quoteElement = document.getElementById('quote');
if (quoteElement) {
    const quoteText = quoteElement.textContent.trim();
    quoteElement.textContent = '';
    typeEffect1(quoteElement, quoteText, 30);
}

export { typed, typeEffect, typeEffect1 };
