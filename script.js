// Dynamic Slogan Array - Elite Coaching Focused
const slogans = [
    "Koçluk değil, yüksek standartlara sahip bir dönüşüm programı",
    "Okul + Dershane + Koçluk + Özel Ders....<br> Veya sadece X Akademi",
    "Netleriniz yükselmezse %110 para iade garantisi",
    "Başarmak uzun sürebilir, X Akademi'de birkaç saat sürüyor"
];

function animateElement(element, text = null, delay = 0) {
    setTimeout(() => {
        if (text !== null) {
            element.innerHTML = text;
        }
        element.classList.remove('animated');
        element.classList.add('slide-in-left');
        element.offsetHeight;
        element.classList.add('animated');
    }, delay);
}

// Function to get a random slogan
function getRandomSlogan() {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    return slogans[randomIndex];
}

// Function to animate text sliding from left
function slideInText(element, text) {
    element.innerHTML = text;
    element.classList.remove('animated');
    element.classList.add('slide-in-left');
    element.offsetHeight;
    setTimeout(() => {
        element.classList.add('animated');
    }, 100);
}

// Animate element with slide-in-left class and delay
function slideInElement(element, delay = 0) {
    element.classList.remove('animated');
    element.classList.add('slide-in-left');
    element.offsetHeight;
    setTimeout(() => {
        element.classList.add('animated');
    }, delay);
}

function initHero() {
    const sloganElement = document.getElementById('dynamic-slogan');
    const subTextElement = document.getElementById('hero-subtext');
    const ctaButton = document.getElementById('hero-cta');
    const randomSlogan = getRandomSlogan();

    // Set slogan text *immediately* to prevent layout shift
    sloganElement.innerHTML = randomSlogan;

    // Base delay and stagger
    const baseDelay = 400;
    const stagger = 600;

    // Animate each element sequentially
    animateElement(sloganElement, null, baseDelay);              // Appears smoothly
    animateElement(subTextElement, null, baseDelay + stagger);   // Subtext after
    animateElement(ctaButton, null, baseDelay + 2 * stagger);    // Button after
}

// Initialize navbar functionality
function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.6)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.3)';
        }
    });
}

// Add smooth scroll for CTA button
function initSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // For now, just show an alert. Later this can scroll to pricing section
        alert('Thank you for your interest! Pricing details coming soon.');
    });
}

// Add some interactive effects
function initInteractiveEffects() {
    // Add parallax effect to geometric shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.geometric-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Add hover effects to shapes
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initNavbar();
    initSmoothScroll();
    initInteractiveEffects();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some additional dynamic effects
window.addEventListener('load', function() {
    // Add subtle background animation
    const hero = document.querySelector('.hero');
    hero.style.background = `
        linear-gradient(135deg, 
            #0a0a0a 0%, 
            #1a1a2e 25%, 
            #16213e 50%, 
            #1a1a2e 75%, 
            #0a0a0a 100%
        )
    `;
    
    // Add a subtle glow effect to the CTA button
    const ctaButton = document.querySelector('.cta-button');
    setInterval(() => {
        ctaButton.style.boxShadow = `
            0 10px 30px rgba(59, 130, 246, 0.3),
            0 0 20px rgba(59, 130, 246, 0.2)
        `;
        
        setTimeout(() => {
            ctaButton.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
        }, 1000);
    }, 3000);
}); 