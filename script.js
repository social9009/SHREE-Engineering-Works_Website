// Loading Animation
window.addEventListener('load', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle with Animation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll with parallax effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if(scrollTop > 100) {
        navbar.classList.add('scrolled');
        
        // Hide navbar on scroll down, show on scroll up
        if(scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    
    // Add visible class to sections when in viewport
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const windowHeight = window.innerHeight;
        
        if(scrollTop >= (sectionTop - windowHeight * 0.7)) {
            section.classList.add('visible');
        }
    });
});

// Active nav link based on scroll position with smooth highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if(scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(0, 86, 179, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.left + rect.width / 2 - size / 2;
            const y = rect.top + rect.height / 2 - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            document.body.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Add CSS for ripple animation
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

// Form Submission with Animation
const inquiryForm = document.getElementById('inquiryForm');
if(inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validation
        if(!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success message
            const successHTML = `
                <div class="success-animation">
                    <i class="fas fa-check-circle"></i>
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you, ${formData.name}. We'll contact you within 24 hours.</p>
                </div>
            `;
            
            showNotification(successHTML, 'success');
            
            // Reset form
            inquiryForm.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 20px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        max-width: 400px;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 3s forwards;
        transform: translateX(100%);
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3300);
}

// Add CSS for notification animation
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .success-animation {
        text-align: center;
    }
    
    .success-animation i {
        font-size: 3rem;
        margin-bottom: 15px;
        animation: scaleCheck 0.5s ease;
    }
    
    @keyframes scaleCheck {
        0% {
            transform: scale(0);
        }
        70% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(notificationStyle);

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if(current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe hero section for counters
const heroSection = document.querySelector('.hero');
if(heroSection) {
    observer.observe(heroSection);
}

// Back to Top Button
const backToTop = document.createElement('a');
backToTop.href = '#';
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Floating WhatsApp Button
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/919970333888?text=Hi%20Shree%20Engineering%20Works,%20I%20need%20a%20quotation';
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
document.body.appendChild(whatsappBtn);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if(hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Hover Effects for Service Cards
document.querySelectorAll('.service-card, .machine-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add custom properties for mouse position tracking
const cardStyle = document.createElement('style');
cardStyle.textContent = `
    .service-card, .machine-card {
        --mouse-x: 50%;
        --mouse-y: 50%;
        background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
                    rgba(0, 86, 179, 0.1) 0%, 
                    transparent 50%);
    }
`;
document.head.appendChild(cardStyle);

// Initialize with first section active
window.dispatchEvent(new Event('scroll'));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Tab navigation focus trapping for mobile menu
    if(navLinks.classList.contains('active')) {
        const focusableElements = navLinks.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if(e.key === 'Tab') {
            if(e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if(!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Add focus styles for accessibility
document.querySelectorAll('a, button, input, textarea, select').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid var(--primary)';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});
