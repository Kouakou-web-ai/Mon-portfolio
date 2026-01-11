// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Theme Management
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu Logic
const mobileBtn = document.getElementById('mobile-btn');
const navLinksUl = document.querySelector('.nav-links');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileBtn.addEventListener('click', () => {
    navLinksUl.classList.toggle('active');

    // Toggle icons
    const isActive = navLinksUl.classList.contains('active');
    menuIcon.style.display = isActive ? 'none' : 'block';
    closeIcon.style.display = isActive ? 'block' : 'none';
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksUl.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    });
});

// Smooth Scroll (Standard browser behavior is usually enough, but we can enhance it)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to run animation only once
            // observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Dynamic Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Animated Stars Background
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 50; // Number of individual stars

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size (1-4px)
        const size = Math.random() * 3 + 1;

        // Random animation duration (20-60s)
        const duration = Math.random() * 40 + 20;

        // Random delay
        const delay = Math.random() * 10;

        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;

        // Random color from gradient palette
        const colors = [
            'rgba(255, 255, 255, ' + opacity + ')',
            'rgba(129, 140, 248, ' + opacity + ')',
            'rgba(168, 85, 247, ' + opacity + ')',
            'rgba(192, 132, 252, ' + opacity + ')',
            'rgba(99, 102, 241, ' + opacity + ')'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        star.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: starTwinkle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;

        starsContainer.appendChild(star);
    }
}

// Initialize stars when page loads
window.addEventListener('load', () => {
    createStars();
});
