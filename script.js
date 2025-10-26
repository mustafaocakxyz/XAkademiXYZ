// Dynamic Slogan Array - Elite Coaching Focused
const slogans = [
    "Koçluk değil, yüksek standartlara sahip bir dönüşüm programı",
    "Okul + Dershane + Koçluk + Özel Ders...<br> Veya sadece X Akademi",
    "Her ay koçluk firması değiştirmeyin. <br> Sadece X Akademi ile çalışın.",
    "Gerçekten işe yarayan bir koçluk."
];

// Data: Top 3 students (placeholders to be filled later)
const topStudents = [
    {
        student_name: "Emirhan H.",
        start_date: "2025-08-30",
        net_increase: 93 - 74.75,
        tyt_initial_net: 74.75,
        tyt_current_net: 96,
        ayt_initial_net: 0,
        ayt_current_net: 0
    },
    {
        student_name: "İbrahim D.",
        start_date: "2025-10-03",
        net_increase: 14,
        tyt_initial_net: 27,
        tyt_current_net: 41,
        ayt_initial_net: 0,
        ayt_current_net: 0
    },
    {
        student_name: "Burcu Y.",
        start_date: "2025-08-16",
        net_increase: 18,
        tyt_initial_net: 35,
        tyt_current_net: 53,
        ayt_initial_net: 0,
        ayt_current_net: 0
    }
];

// Populate Top Students section from data
function initTopStudents() {
    const cards = document.querySelectorAll('.top-students .student-card');
    if (!cards || cards.length === 0) return;

    cards.forEach((card, index) => {
        const data = topStudents[index];
        if (!data) return;

        // Update all occurrences of the student's name within the card
        const nameSpans = card.querySelectorAll('.student-name');
        nameSpans.forEach(span => {
            span.textContent = data.student_name;
        });

        // Update dynamic fields
        const daysSpan = card.querySelector('.student-days');
        const increaseSpan = card.querySelector('.student-increase');
        const tytInitialSpan = card.querySelector('.tyt-initial');
        const tytCurrentSpan = card.querySelector('.tyt-current');
        const aytInitialSpan = card.querySelector('.ayt-initial');
        const aytCurrentSpan = card.querySelector('.ayt-current');

        // Compute days based on start_date if provided and valid, else fallback
        let computedDays = data.days_studied;
        if (data.start_date && typeof data.start_date === 'string') {
            const start = new Date(data.start_date);
            if (!isNaN(start.getTime())) {
                const today = new Date();
                // Normalize times to midnight to avoid daylight saving issues
                const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
                const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                const diffMs = todayUTC - startUTC;
                const dayMs = 24 * 60 * 60 * 1000;
                computedDays = Math.max(0, Math.floor(diffMs / dayMs));
            }
        }

        if (daysSpan) daysSpan.textContent = String(computedDays);
        if (increaseSpan) increaseSpan.textContent = String(data.net_increase);
        if (tytInitialSpan) tytInitialSpan.textContent = String(data.tyt_initial_net ?? 0);
        if (tytCurrentSpan) tytCurrentSpan.textContent = String(data.tyt_current_net ?? 0);
        if (aytInitialSpan) aytInitialSpan.textContent = String(data.ayt_initial_net ?? 0);
        if (aytCurrentSpan) aytCurrentSpan.textContent = String(data.ayt_current_net ?? 0);
    });
}

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
    const ctaButton = document.getElementById('hero-cta');
    if (!ctaButton) return;

    ctaButton.addEventListener('click', function(e) {
        const href = ctaButton.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
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

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('open');
            });
            // Toggle this item
            item.classList.toggle('open');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initNavbar();
    initSmoothScroll();
    initInteractiveEffects();
    initFAQ();
    initTopStudents();
    
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