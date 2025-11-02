// Tanvir Analytics - Optimized Main JavaScript (V7 - Cache Buster & Minor Fix)

document.addEventListener('DOMContentLoaded', initWebsite);

function initWebsite() {
    setCurrentYear();
    setupMobileMenu();
    setupSmoothScrolling();
    setupProjectFilters();
    setupAnimations();
    setupFormSubmission();
}

/** * Set current year in footer. 
 */
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/** * Mobile Menu Functionality (Accessibility & Logic improved)
 */
function setupMobileMenu() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobilemenu');
    
    if (!burger || !mobileMenu) return;

    const closeMenu = () => {
        mobileMenu.classList.remove('show');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        mobileMenu.classList.add('show');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };
    
    // Toggle menu visibility
    burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        isExpanded ? closeMenu() : openMenu();
    });
    
    // Close menu when clicking on any link inside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    });
    
    // Close menu on escape key (A11y)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
            closeMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            !burger.contains(e.target)) {
            closeMenu();
        }
    });
}

/** * Smooth Scrolling for Anchor Links (Fixed to exclude mobile menu links)
 */
function setupSmoothScrolling() {
    // Select all internal links starting with '#', but exclude those inside the mobile menu
    document.querySelectorAll('a[href^="#"]:not(#mobilemenu a)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            // Only proceed with smooth scroll if the target exists on the current page
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
    
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/** * Project Filtering 
 */
function setupProjectFilters() {
    const filtersContainer = document.querySelector('.filters');
    if (!filtersContainer) return;
    
    const filterChips = document.querySelectorAll('.chip');
    const projectCards = document.querySelectorAll('.card[data-tags]');
    
    // Stop if no project cards are found
    if (projectCards.length === 0) return;

    const applyFilter = (filterValue) => {
        projectCards.forEach(card => {
            const cardTags = card.getAttribute('data-tags').split(' ');
            const isMatch = filterValue === 'all' || cardTags.includes(filterValue);

            if (isMatch) {
                card.classList.remove('hidden'); 
                card.classList.add('animate-in'); 
            } else {
                card.classList.add('hidden');
                card.classList.remove('animate-in');
            }
        });
    };
    
    filtersContainer.addEventListener('click', function(e) {
        const chip = e.target.closest('.chip');
        if (!chip) return;

        if (chip.classList.contains('active')) return;
        
        filterChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        
        const filterValue = chip.getAttribute('data-filter');
        applyFilter(filterValue);
    });
    
    applyFilter('all');
}

/** * Setup animations (Performance: Uses IntersectionObserver once)
 */
function setupAnimations() {
    const elementsToAnimate = document.querySelectorAll('.card, .stat, .section-header');

    if (elementsToAnimate.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Form Submission Placeholder for local environment
 */
function setupFormSubmission() {
    const form = document.querySelector('form[data-form-placeholder]');
    const statusMessage = document.querySelector('.form-status');

    if (!form || !statusMessage) return;

    form.addEventListener('submit', function(e) {
        if (form.getAttribute('action') === '#') {
            e.preventDefault();
            
            statusMessage.textContent = 'Message sent! (Note: This is a local placeholder.)';
            statusMessage.style.display = 'block';
            statusMessage.style.color = 'var(--accent)'; 
            
            form.reset(); 
            
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        }
    });
}
