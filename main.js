// main.js - Complete fixed functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tanvir Analytics - Website loaded');
    
    // Function to show temporary message (replaces alert())
    function showFeedback(message, isError = false) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.textContent = message;
        feedbackDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            background-color: ${isError ? '#ef4444' : '#10b981'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(feedbackDiv);

        setTimeout(() => {
            feedbackDiv.style.opacity = '1';
        }, 10); // Start transition

        setTimeout(() => {
            feedbackDiv.style.opacity = '0';
            // Wait for transition to finish before removing
            feedbackDiv.addEventListener('transitionend', () => feedbackDiv.remove());
        }, 4000); 
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            console.log('Mobile menu button clicked');
            
            // Toggle active class for animation
            this.classList.toggle('active');
            
            // Toggle menu visibility
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
            } else {
                navLinks.classList.add('active');
                navLinks.style.display = 'flex';
            }
        });
        
        // FIX: Only close menu/set display:none if in mobile view (<= 768px)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                // If it's a mobile viewport, close the menu completely
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    navLinks.style.display = 'none';
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside (only applies to mobile view)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('.nav') || 
                                     event.target.closest('.nav-links') || 
                                     event.target.closest('.mobile-menu-btn');
            
            if (!isClickInsideNav && navLinks && window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = 70;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update copyright year automatically
    const footerText = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    
    if (footerText && !footerText.innerHTML.includes(currentYear)) {
        footerText.innerHTML = `&copy; ${currentYear} Tanvir Analytics. Built with passion for data.`;
    }
    
    // Project cards animation - Only on desktop
    function initializeAnimations() {
        if (window.innerWidth > 768) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                });
            }, observerOptions);
            
            // Animate project cards on desktop
            document.querySelectorAll('.project-card').forEach(card => {
                // Ensure initial state is set only if not already observed
                if (card.style.opacity !== '1') {
                     card.style.opacity = '0';
                     card.style.transform = 'translateY(20px)';
                }
                observer.observe(card);
            });
        } else {
            // Mobile: ensure all project cards are visible immediately
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Desktop: show nav links, hide mobile menu
                if (navLinks) {
                    navLinks.style.display = 'flex';
                    navLinks.classList.remove('active');
                }
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
            } else {
                // Mobile: hide nav links by default unless active class is present
                if (navLinks && !navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }
            
            // Re-initialize animations on resize
            initializeAnimations();
        }, 250);
    });
    
    // Form submission handling (using showFeedback function)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                showFeedback('Thank you for your message! (Demo successful)', false);
                contactForm.reset();
                console.log('Form Submitted (Demo):', { name, email, message });
            } else {
                showFeedback('Please fill in all required fields.', true);
                console.error('Form validation failed: Missing fields.');
            }
        });
    }
    
    // Add hover effects to stats cards (desktop only)
    if (window.innerWidth > 768) {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Add loading animation to chart bars (initial load animation)
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize mobile menu state (ensure it starts hidden on mobile)
    if (window.innerWidth <= 768 && navLinks) {
        navLinks.style.display = 'none';
    }
});

// Add debug styles to ensure mobile functionality (kept from original for robustness)
const debugStyles = document.createElement('style');
debugStyles.textContent = `
    /* Debug: Ensure mobile functionality */
    @media (max-width: 768px) {
        .projects-grid {
            display: grid !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        .project-card {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
        }
        
        .mobile-menu-btn {
            cursor: pointer !important;
        }
        
        .nav-links.active {
            display: flex !important;
            visibility: visible !important;
        }
    }
    
    /* Ensure smooth transitions */
    .nav-links {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .mobile-menu-btn span {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(debugStyles);

console.log('Tanvir Analytics - JavaScript loaded successfully');
