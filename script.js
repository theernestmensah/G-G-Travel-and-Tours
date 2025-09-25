// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');

    // Close all dropdowns when mobile menu is closed
    if (!navMenu.classList.contains('active')) {
        document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Close mobile menu when clicking on a nav link (that is not a dropdown trigger)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // A link is a trigger if it is a direct child of a dropdown/submenu li
        const isTrigger = e.target.matches('.dropdown > a, .dropdown-submenu > a');
        if (!isTrigger) {
             if (navMenu.classList.contains('active') && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        }
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
});


// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        // For this example, we'll just show an alert
        alert(`Thank you for your message, ${name}! We will get back to you soon.`);

        // Reset the form
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Prevent scroll for dropdown toggles
        const isDropdownToggle = this.matches('.dropdown > a, .dropdown-submenu > a');

        if (!isDropdownToggle) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Also close the mobile nav if it's open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px var(--shadow-color)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('G&G Travel and Tours website loaded successfully!');

    // Dropdown functionality for all screen sizes (click-based)
    document.querySelectorAll('.dropdown > a, .dropdown-submenu > a').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Prevent link navigation if it's a dropdown toggle
            if (this.nextElementSibling && (this.nextElementSibling.classList.contains('dropdown-menu') || this.nextElementSibling.classList.contains('dropdown-menu-submenu'))) {
                e.preventDefault();
                e.stopPropagation();

                const parentLi = this.parentElement;
                const wasActive = parentLi.classList.contains('active');

                // Close all dropdowns
                document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(d => d.classList.remove('active'));

                // If it wasn't active, open it and its ancestors
                if (!wasActive) {
                    let current = parentLi;
                    // Add 'active' class up the hierarchy
                    while (current && (current.classList.contains('dropdown') || current.classList.contains('dropdown-submenu'))) {
                        current.classList.add('active');
                        current = current.parentElement.closest('.dropdown, .dropdown-submenu');
                    }
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only auto-change if user hasn't explicitly set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);

            if (newTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    });
});