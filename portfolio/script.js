
// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}));

// Project Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Create dots
const dotsContainer = document.querySelector('.slider-dots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
}

// Event listeners for slider controls
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add typing effect to hero text
const typingText = document.querySelector('.typing-text');
const text = 'Full Stack Developer & Telegram Bot Automation Expert';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        typingText.innerHTML = text + '<span class="cursor blink">|</span>';
    }
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Add CSS for cursor animation
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Binary typing effect for sections
function createBinaryTypingEffect() {
    const binaryTexts = [
        "01001000 01100001 01100011 01101011 01100101 01110010 00100000 01001001 01001110 01010100 01000101 01010010 01000110 01000001 01000011 01000101",
        "01000001 01000011 01000011 01000101 01010011 01010011 00100000 01000111 01010010 01000001 01001110 01010100 01000101 01000100",
        "01000111 01000001 01000100 00100000 01001011 01000001 01001100 01010101 00100000 01001001 01001110 01001001 01010100 01001001 01000001 01001100 01001001 01011010 01000101 01000100",
        "01010011 01000101 01010010 01010110 01001001 01000011 01000101 01010011 00100000 01001111 01001110 01001100 01001001 01001110 01000101",
        "01000010 01001111 01010100 00100000 01000001 01010101 01010100 01001111 01001101 01000001 01010100 01001001 01001111 01001110",
        "01000100 01000101 01011000 00100000 01010100 01010010 01000001 01000100 01001001 01001110 01000111",
        "01010000 01011001 01010100 01001000 01001111 01001110 00100000 01001010 01000001 01010110 01000001 00100000 01010000 01001000 01010000",
        "01000110 01010101 01001100 01001100 01010011 01010100 01000001 01000011 01001011 00100000 01000100 01000101 01010110 01000101 01001100 01001111 01010000 01000101 01010010",
        "01000100 01000001 01010100 01000001 01000010 01000001 01010011 01000101 00100000 01001101 01000001 01001110 01000001 01000111 01000101 01001101 01000101 01001110 01010100"
    ];

    const binaryFloatingElements = document.querySelectorAll('.binary-floating span');
    
    binaryFloatingElements.forEach((element, index) => {
        let currentText = '';
        let isTyping = true;
        let charIndex = 0;
        const fullText = binaryTexts[index % binaryTexts.length];
        
        function typeText() {
            if (isTyping) {
                if (charIndex < fullText.length) {
                    currentText += fullText.charAt(charIndex);
                    element.textContent = currentText;
                    charIndex++;
                } else {
                    isTyping = false;
                    setTimeout(() => {
                        isTyping = true;
                        charIndex = 0;
                        currentText = '';
                    }, 2000 + Math.random() * 1000);
                }
            }
        }
        
        // Start typing with different delays for each element
        const interval = setInterval(typeText, 50 + Math.random() * 30);
        setTimeout(() => {
            setInterval(typeText, 50 + Math.random() * 30);
        }, index * 1000);
    });
}

// Initialize binary typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    setTimeout(createBinaryTypingEffect, 2000);
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width;
                }
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}
