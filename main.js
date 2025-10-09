// Enhanced Main JavaScript
class TanvirAnalytics {
  constructor() {
    this.init();
  }

  init() {
    this.setupYear();
    this.setupMobileMenu();
    this.setupFilters();
    this.setupPlaceholders();
    this.setupAnimations();
    this.setupSmoothScrolling();
  }

  setupYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  setupMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navlinks');
    
    if (burger && nav) {
      burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        nav.style.display = isExpanded ? 'none' : 'flex';
        
        // Add animation class
        if (!isExpanded) {
          nav.classList.add('menu-open');
        } else {
          nav.classList.remove('menu-open');
        }
      });

      // Close menu when clicking on links
      document.querySelectorAll('.navlinks a').forEach(link => {
        link.addEventListener('click', () => {
          burger.setAttribute('aria-expanded', 'false');
          nav.style.display = 'none';
          nav.classList.remove('menu-open');
        });
      });
    }
  }

  setupFilters() {
    const dashboardSection = document.getElementById('dashboards');
    if (!dashboardSection) return;

    const chips = document.querySelectorAll('.chip');
    const cards = document.querySelectorAll('[data-tags]');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Update active state
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');

        // Filter cards
        const filter = chip.dataset.filter;
        cards.forEach(card => {
          const tags = (card.dataset.tags || '').split(' ');
          const shouldShow = filter === 'all' || tags.includes(filter);
          
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }
          }, 200);
        });
      });
    });
  }

  setupPlaceholders() {
    document.querySelectorAll('.thumb').forEach(thumb => {
      const frame = thumb.querySelector('iframe');
      const placeholder = thumb.querySelector('.placeholder');
      
      if (frame && /REPLACE_/i.test(frame.src) && placeholder) {
        frame.style.display = 'none';
        placeholder.hidden = false;
      }
    });
  }

  setupAnimations() {
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

  setupSmoothScrolling() {
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
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TanvirAnalytics();
});

// Utility functions
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
