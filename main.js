// Tanvir Analytics - Fixed Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initWebsite();
});

function initWebsite() {
    setCurrentYear();
    setupMobileMenu();
    setupSmoothScrolling();
    setupProjectFilters();
    setupPlaceholderEmbeds();
    setupAnimations();
}

// Set current year in footer
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Mobile Menu Functionality
function setupMobileMenu() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobilemenu');
    
    if (!burger || !mobileMenu) return;
    
    // Toggle mobile menu
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Close menu
            closeMobileMenu();
        } else {
            // Open menu
            openMobileMenu();
        }
    });
    
    // Close menu when clicking on links
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
            
            // Handle smooth scrolling for anchor links
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            !burger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileMenu.classList.add('show');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('show');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
}

function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Project Filtering
function setupProjectFilters() {
    const filtersContainer = document.querySelector('.filters');
    if (!filtersContainer) return;
    
    const filterChips = document.querySelectorAll('.chip');
    const projectCards = document.querySelectorAll('.card[data-tags]');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Skip if already active
            if (this.classList.contains('active')) return;
            
            // Update active states
            filterChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            // Filter projects
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardTags = card.getAttribute('data-tags').split(' ');
                
                if (filterValue === 'all' || cardTags.includes(filterValue)) {
                    card.style.display = 'block';
                    // Add subtle animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Handle placeholder embeds
function setupPlaceholderEmbeds() {
    document.querySelectorAll('.thumb').forEach(thumb => {
        const iframe = thumb.querySelector('iframe');
        const placeholder = thumb.querySelector('.placeholder');
        
        if (iframe && placeholder) {
            // Check if iframe src contains REPLACE_ (meaning it's not configured)
            if (iframe.src.includes('REPLACE_')) {
                iframe.style.display = 'none';
                placeholder.style.display = 'flex';
            } else {
                iframe.style.display = 'block';
                placeholder.style.display = 'none';
            }
        }
    });
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.card, .stat, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
