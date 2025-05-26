document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const layers = document.querySelectorAll('.layer');
    const heroContent = document.querySelector('.hero-content');
    const nav = document.querySelector('.nav');
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.work-card');
    
    // Variables
    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let isScrolling = false;
    let scrollTimeout;
    let idleTimeout;
    let isIdle = false;

    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Mouse movement handler with very subtle movement
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowWidth / 2) / 60; // Even more reduced sensitivity
        mouseY = (e.clientY - windowHeight / 2) / 60;
    });

    // Update window dimensions on resize
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 50
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Scroll handler
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 50);
    });

    // Initialize ScrollTrigger animations
    sections.forEach((section, index) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Animate cards on scroll
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Enhanced parallax effect with very subtle movement
    function updateParallax() {
        if (!isScrolling) {
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 0.05; // Reduced depth effect even more
                gsap.to(layer, {
                    duration: 2.5, // Slower movement
                    x: mouseX * depth * 30, // Reduced movement range
                    y: mouseY * depth * 30,
                    rotationX: mouseY * depth * 2, // Reduced rotation
                    rotationY: mouseX * depth * 2,
                    ease: 'power1.out' // Smoother easing
                });
            });

            if (heroContent) {
                gsap.to(heroContent, {
                    duration: 2.5,
                    x: mouseX * 8, // Reduced movement
                    y: mouseY * 8,
                    rotationX: mouseY * 0.8, // Reduced rotation
                    rotationY: mouseX * 0.8,
                    ease: 'power1.out'
                });
            }
        }
        requestAnimationFrame(updateParallax);
    }

    // Start parallax effect
    updateParallax();

    // Auto-rotate when idle with very subtle movement
    function resetIdleTimer() {
        clearTimeout(idleTimeout);
        isIdle = false;
        idleTimeout = setTimeout(() => {
            isIdle = true;
        }, 3000);
    }

    document.addEventListener('mousemove', resetIdleTimer);
    resetIdleTimer();

    function autoRotate() {
        if (isIdle && !isScrolling) {
            const time = Date.now() * 0.0002; // Even slower rotation
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 0.05;
                gsap.to(layer, {
                    duration: 5, // Slower movement
                    x: Math.sin(time) * depth * 20, // Reduced movement range
                    y: Math.cos(time) * depth * 20,
                    rotationX: Math.sin(time) * depth * 1.5, // Reduced rotation
                    rotationY: Math.cos(time) * depth * 1.5,
                    ease: 'power1.inOut'
                });
            });
        }
        requestAnimationFrame(autoRotate);
    }
    autoRotate();

    // Enhanced hover effects with reduced movement
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -3,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Enhanced card hover effects with reduced movement
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                scale: 1.01,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Form animations with reduced movement
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.4,
                y: -3,
                scale: 1.01,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input, {
                    duration: 0.4,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Navigation scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add slight delay to follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .image-container');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.opacity = '0.5';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.opacity = '1';
        });
    });

    // Parallax Effect
    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.layer');

    parallaxContainer.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate mouse position relative to center of screen
        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;
        
        // Apply parallax effect to each layer
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.2;
            const translateX = x * speed * 100;
            const translateY = y * speed * 100;
            
            layer.style.transform = `translateZ(${-1000 + index * 200}px) translate(${translateX}px, ${translateY}px)`;
        });
    });

    // Smooth Scroll
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

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate work cards
    gsap.utils.toArray('.work-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate skill bars
    gsap.utils.toArray('.skill-level').forEach(skill => {
        gsap.from(skill, {
            width: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: skill,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate stats
    gsap.utils.toArray('.stat-number').forEach(stat => {
        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Form animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}); 