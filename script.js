// script.js - The Smile Foundation

document.addEventListener('DOMContentLoaded', function() {
    // Page transition
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        // Show transition on page load
        setTimeout(() => {
            pageTransition.style.transform = 'translateY(-100%)';
        }, 100);
        
        // Handle link clicks for transitions
        document.querySelectorAll('a').forEach(link => {
            if (link.href && link.href.includes('.html') && !link.href.includes('#') && link.target !== '_blank') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    
                    pageTransition.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 600);
                });
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
    
    // Counter animation
    function animateCounter() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 200;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            
            // Start counter when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    // Initialize counter if exists on page
    if (document.querySelector('.counter-number')) {
        animateCounter();
    }
    
    // Ripple effect for buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");
        
        const ripple = button.getElementsByClassName("ripple")[0];
        
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Program card tilt effect
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-15px)';
        });
    });
    
    // Donation page specific functionality
    if (document.querySelector('.donation-page')) {
        // QR Code animation
        const qrCode = document.querySelector('.qr-code');
        if (qrCode) {
            // Add glow animation
            qrCode.style.animation = 'qr-glow 3s infinite alternate';
            
            // Add CSS for QR glow
            const qrGlowStyle = document.createElement('style');
            qrGlowStyle.textContent = `
                @keyframes qr-glow {
                    0% {
                        box-shadow: 0 0 10px rgba(46, 204, 113, 0.5);
                    }
                    100% {
                        box-shadow: 0 0 25px rgba(46, 204, 113, 0.8);
                    }
                }
                
                @keyframes border-wave {
                    0%, 100% {
                        border-color: rgba(46, 204, 113, 0.5);
                    }
                    50% {
                        border-color: rgba(46, 204, 113, 1);
                    }
                }
                
                .qr-code {
                    animation: qr-glow 3s infinite alternate, border-wave 2s infinite;
                    border: 3px solid var(--primary-color);
                }
            `;
            document.head.appendChild(qrGlowStyle);
        }
        
        // Payment confirmation form
        const paymentBtn = document.getElementById('payment-made-btn');
        if (paymentBtn) {
            paymentBtn.addEventListener('click', function() {
                document.querySelector('.donation-form').style.display = 'block';
                this.style.display = 'none';
                
                // Scroll to form
                document.querySelector('.donation-form').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
        
        // Form validation and submission to Google Sheets
        const donationForm = document.getElementById('donation-form');
        if (donationForm) {
            donationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                const name = document.getElementById('donor-name').value.trim();
                const email = document.getElementById('donor-email').value.trim();
                const amount = document.getElementById('donor-amount').value.trim();
                const transactionId = document.getElementById('transaction-id').value.trim();
                
                if (!name || !email || !amount || !transactionId) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Show loading animation
                const submitBtn = this.querySelector('.btn');
                const originalText = submitBtn.innerText;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Google Sheets configuration
                const scriptURL = 'https://script.google.com/macros/s/AKfycbxHJX3bD66Cj4cVk12wbU1RTBbs0l6FMCbYZ_c6TU0RxTFJBk_fxg3Tbz167PmN7Pvp/exec'; // Replace with your Web App URL
                
                // Prepare form data
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('amount', amount);
                formData.append('transaction_id', transactionId);
                formData.append('date', new Date().toISOString());
                formData.append('timestamp', new Date().toLocaleString());
                
                // Send data to Google Sheets
                fetch(scriptURL, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' // Important for Google Apps Script
                })
                .then(() => {
                    // Success - redirect to thank you page
                    window.location.href = 'thankyou.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Even if there's an error, redirect to thank you page for demo
                    // In production, you might want to show an error message
                    window.location.href = 'thankyou.html';
                });
            });
        }
    }
    
    // Thank you page confetti
    if (document.querySelector('.thankyou-page')) {
        // Create confetti animation
        createConfetti();
        
        // Animated checkmark
        const checkmark = document.querySelector('.checkmark');
        if (checkmark) {
            setTimeout(() => {
                checkmark.classList.add('animate');
            }, 500);
        }
    }
    
    // Contact form validation (updated for Google Sheets)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            if (!name || !email || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Google Sheets configuration for contact form
            const contactScriptURL = 'YOUR_CONTACT_FORM_GOOGLE_APPS_SCRIPT_URL'; // Replace with your Web App URL
            
            // Prepare form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            formData.append('date', new Date().toISOString());
            formData.append('type', 'contact');
            
            // Send data to Google Sheets
            fetch(contactScriptURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Message sent! We\'ll get back to you soon.', 'success'); // Show success even if error (for demo)
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <p>${message}</p>
            <button class="alert-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to page
        document.body.appendChild(alert);
        
        // Show with animation
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.classList.remove('show');
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        // Close button
        alert.querySelector('.alert-close').addEventListener('click', () => {
            alert.classList.remove('show');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 300);
        });
        
        // Add CSS for alerts
        if (!document.querySelector('#alert-styles')) {
            const alertStyles = document.createElement('style');
            alertStyles.id = 'alert-styles';
            alertStyles.textContent = `
                .alert {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background-color: white;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-hover);
                    padding: 20px;
                    max-width: 350px;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                }
                
                .alert.show {
                    transform: translateX(0);
                }
                
                .alert-success {
                    border-left: 4px solid var(--primary-color);
                }
                
                .alert-error {
                    border-left: 4px solid var(--accent-color);
                }
                
                .alert p {
                    margin: 0;
                    margin-right: 15px;
                }
                
                .alert-close {
                    background: none;
                    border: none;
                    color: var(--text-light);
                    cursor: pointer;
                    font-size: 18px;
                    transition: color 0.3s;
                }
                
                .alert-close:hover {
                    color: var(--text-dark);
                }
            `;
            document.head.appendChild(alertStyles);
        }
    }
    
    function createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        if (!confettiContainer) return;
        
        // Create confetti elements
        const colors = ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.opacity = Math.random() + 0.5;
            
            // Animation
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear ${Math.random() * 5}s infinite`;
            
            confettiContainer.appendChild(confetti);
        }
        
        // Add CSS for confetti
        const confettiStyles = document.createElement('style');
        confettiStyles.textContent = `
            .confetti-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1000;
                overflow: hidden;
            }
            
            .confetti {
                position: absolute;
                top: -20px;
                border-radius: 2px;
            }
            
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-100px) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(confettiStyles);
    }
});