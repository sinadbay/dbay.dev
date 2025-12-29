// ============================================
// MODERN PORTFOLIO - DBAY.DEV
// Enhanced animations and interactions
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initParallax();
    initMagneticButtons();
    initSmoothScroll();
    initContactForm();
});

// ============================================
// LOADING ANIMATION
// ============================================
function initLoader() {
    window.addEventListener('load', () => {
        // Small delay for smoother transition
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 300);
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll handler for navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }, { passive: true });
}

// ============================================
// TYPING ANIMATION
// ============================================
function initTypingAnimation() {
const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

const codeLines = [
    'const sina = {',
        '  role: "Software Engineer @Meta",',
        '  passion: "Music, Percussion, Mentorship",',
    '  location: "San Francisco Bay Area",',
        '  music: ["Persian Folk", "Percussion"],',
        '  apps: ["Splitzy", "Baziihub"],',
    '  motto: "Code by day, music by night"',
    '};',
    '',
    '// Ready to collaborate!',
    'sina.connect();'
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
    let currentText = '';

    function type() {
    const currentLine = codeLines[lineIndex];
    
    if (isDeleting) {
            currentText = currentLine.substring(0, charIndex - 1);
        charIndex--;
    } else {
            currentText = currentLine.substring(0, charIndex + 1);
        charIndex++;
    }
    
        typingText.textContent = currentText;
        
        let typeSpeed = isDeleting ? 30 : 80;
    
    if (!isDeleting && charIndex === currentLine.length) {
            typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % codeLines.length;
            typeSpeed = 400;
        }
        
        setTimeout(type, typeSpeed);
    }

    // Start after a short delay
    setTimeout(type, 1500);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optional: unobserve after animation
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Counter animation for numbers (if any)
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const end = parseInt(target.dataset.count);
                animateCounter(target, 0, end, 2000);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * easeProgress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                shapes.forEach((shape, index) => {
                    const speed = 0.03 + (index * 0.02);
                    const yPos = scrolled * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    const terminal = document.querySelector('.terminal');
    
    if (hero && terminal) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            terminal.style.transform = `
                perspective(1000px) 
                rotateY(${x * 5}deg) 
                rotateX(${-y * 5}deg)
            `;
        });

        hero.addEventListener('mouseleave', () => {
            terminal.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
    }
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .app-download, .music-link, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });

        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
        // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Sina Dibay'
    };
    
        try {
            await emailjs.send('service_u7jtcwu', 'template_wvwz5wi', templateParams);
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Email error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
        });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(calc(100% + 20px));
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 320px;
        background: ${colors[type] || colors.info};
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(calc(100% + 20px))';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// ============================================
// CURSOR GLOW EFFECT (Optional - Desktop only)
// ============================================
function initCursorGlow() {
    if (window.innerWidth < 1024) return;
    
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

// Initialize cursor glow on load
window.addEventListener('load', () => {
    setTimeout(initCursorGlow, 1000);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Handle resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize elements that depend on viewport size
}, 250));
