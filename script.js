// ===================================
// Mobile Menu Toggle
// ===================================
console.log('Script loaded!');

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default for menu-toggle
        if (link.classList.contains('menu-toggle')) {
            e.preventDefault();
        }
        
        // Close mobile menu for non-toggle links
        if (!link.classList.contains('menu-toggle')) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ===================================
// Hero Slideshow
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    let currentSlide = 0;
    
    // Make sure first slide is active
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change slide every 5 seconds
    }
    
    // Menu Toggle setup
    const menuToggleLinks = document.querySelectorAll('.menu-toggle');
    const menuSection = document.getElementById('menu');
    const menuClose = document.querySelector('#menu .menu-close');
    
    // Mittagstisch Toggle setup
    const mittagstischToggleLinks = document.querySelectorAll('.mittagstisch-toggle');
    const mittagstischSection = document.getElementById('mittagstisch');
    const mittagstischClose = document.querySelector('.mittagstisch-close');
    
    console.log('Mittagstisch Setup:', {
        buttons: mittagstischToggleLinks.length,
        section: mittagstischSection ? 'FOUND' : 'NOT FOUND',
        closeBtn: mittagstischClose ? 'FOUND' : 'NOT FOUND'
    });
    
    // Make sure menus are hidden on load
    if (menuSection) {
        menuSection.classList.add('menu-hidden');
    }
    
    if (mittagstischSection) {
        mittagstischSection.classList.add('menu-hidden');
    }

    // Open menu
    menuToggleLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Opening menu');
            
            if (menuSection) {
                menuSection.classList.remove('menu-hidden');
                document.body.style.overflow = 'hidden';
                
                // Scroll menu to top
                menuSection.scrollTop = 0;
            }
            
            // Close mobile nav if open
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (navMenu) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle?.querySelectorAll('span');
                if (spans) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Closing menu');
            
            if (menuSection) {
                menuSection.classList.add('menu-hidden');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Menu close button not found');
    }

    // Close menu with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (menuSection && !menuSection.classList.contains('menu-hidden')) {
                menuSection.classList.add('menu-hidden');
                document.body.style.overflow = '';
            }
            if (mittagstischSection && !mittagstischSection.classList.contains('menu-hidden')) {
                mittagstischSection.classList.add('menu-hidden');
                document.body.style.overflow = '';
            }
            if (impressumSection && !impressumSection.classList.contains('menu-hidden')) {
                impressumSection.classList.add('menu-hidden');
                document.body.style.overflow = '';
            }
        }
    });

    // Open mittagstisch
    mittagstischToggleLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Opening mittagstisch');
            
            if (mittagstischSection) {
                mittagstischSection.classList.remove('menu-hidden');
                document.body.style.overflow = 'hidden';
                
                // Scroll to top
                mittagstischSection.scrollTop = 0;
            }
            
            // Close mobile nav if open
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (navMenu) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle?.querySelectorAll('span');
                if (spans) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // Close mittagstisch
    if (mittagstischClose) {
        mittagstischClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Closing mittagstisch');
            
            if (mittagstischSection) {
                mittagstischSection.classList.add('menu-hidden');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Mittagstisch close button not found');
    }

    // Impressum Toggle setup
    const impressumToggleLinks = document.querySelectorAll('.impressum-toggle');
    const impressumSection = document.getElementById('impressum');
    const impressumClose = document.querySelector('.impressum-close');
    
    // Make sure impressum is hidden on load
    if (impressumSection) {
        impressumSection.classList.add('menu-hidden');
    }

    // Open impressum
    impressumToggleLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Opening impressum');
            
            if (impressumSection) {
                impressumSection.classList.remove('menu-hidden');
                document.body.style.overflow = 'hidden';
                impressumSection.scrollTop = 0;
            }
        });
    });

    // Close impressum
    if (impressumClose) {
        impressumClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Closing impressum');
            
            if (impressumSection) {
                impressumSection.classList.add('menu-hidden');
                document.body.style.overflow = '';
            }
        });
    }

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            console.log('Switching to language:', selectedLang);
            console.log('Found elements with data-lang="de":', document.querySelectorAll('[data-lang="de"]').length);
            console.log('Found elements with data-lang="en":', document.querySelectorAll('[data-lang="en"]').length);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide based on language
            if (selectedLang === 'de') {
                // Show German, hide English
                document.querySelectorAll('[data-lang="de"]').forEach(el => {
                    console.log('Showing DE element:', el.className);
                    if (el.classList.contains('menu-images-container')) {
                        el.style.cssText = 'display: flex !important;';
                    } else {
                        el.style.cssText = 'display: block !important;';
                    }
                });
                document.querySelectorAll('[data-lang="en"]').forEach(el => {
                    console.log('Hiding EN element:', el.className);
                    el.style.cssText = 'display: none !important;';
                });
            } else {
                // Show English, hide German
                document.querySelectorAll('[data-lang="en"]').forEach(el => {
                    console.log('Showing EN element:', el.className);
                    if (el.classList.contains('menu-images-container')) {
                        el.style.cssText = 'display: flex !important;';
                    } else {
                        el.style.cssText = 'display: block !important;';
                    }
                });
                document.querySelectorAll('[data-lang="de"]').forEach(el => {
                    console.log('Hiding DE element:', el.className);
                    el.style.cssText = 'display: none !important;';
                });
            }
        });
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section:not(#menu)');

function setActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Contact Form Handling (Removed - Only Phone Reservations)
// ===================================
// Form removed as reservations are only possible by phone

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]:not(.menu-toggle)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if it's the menu toggle
        if (this.classList.contains('menu-toggle')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target && target.id !== 'menu') {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Gallery Image Loading (for future implementation)
// ===================================
// This function can be used when you add real images
function loadGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// ===================================
// Animation on Scroll (Optional Enhancement)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (optional)
document.querySelectorAll('.feature, .menu-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Set Minimum Date for Reservation (Removed)
// ===================================
// Date input removed as reservations are only by phone

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🍝 Benvenuti da Amico! 🇮�', 'font-size: 20px; color: #2d5016; font-weight: bold;');
console.log('%cItalienische Küche mit Herz & Seele', 'font-size: 12px; color: #666;');
