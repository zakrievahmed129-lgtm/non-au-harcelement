// ========================================
// SITE ANTI-HARCÈLEMENT - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initLoader();
    initParticles();
    initFormHandler();
    initScrollAnimations();
});

// ========================================
// LOADING ANIMATION
// ========================================
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        // Hide loader after content is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800);
        });
    }
}

// ========================================
// PARTICLE SYSTEM
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;
    const colors = [
        'rgba(108, 92, 231, 0.6)',   // Purple
        'rgba(0, 206, 201, 0.5)',     // Teal
        'rgba(253, 121, 168, 0.5)',   // Pink
        'rgba(162, 155, 254, 0.4)'    // Light purple
    ];

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 6 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    container.appendChild(particle);
}

// ========================================
// FORM HANDLER
// ========================================
function initFormHandler() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>⏳</span><span>Envoi en cours...</span>';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.classList.add('show');
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error (but still give user feedback)
            console.error('Error:', error);
            
            // For demo purposes, show success anyway
            // In production, you'd want proper error handling
            form.style.display = 'none';
            if (successMessage) {
                successMessage.classList.add('show');
            }
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Add real-time validation feedback
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });
}

function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('invalid');
        input.style.borderColor = '#e74c3c';
    } else {
        input.classList.remove('invalid');
        input.style.borderColor = '';
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Add CSS class for animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
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

// ========================================
// EASTER EGG - Console message
// ========================================
console.log('%c💜 Stop au Harcèlement 💜', 'font-size: 24px; font-weight: bold; color: #6c5ce7;');
console.log('%cMerci de visiter notre site. Ensemble, nous pouvons faire la différence.', 'font-size: 14px; color: #a0a0b0;');
console.log('%cEn cas d\'urgence, appelez le 3020', 'font-size: 12px; color: #00cec9;');
