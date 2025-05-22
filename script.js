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

    // Mouse movement handler with reduced sensitivity
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowWidth / 2) / 30;
        mouseY = (e.clientY - windowHeight / 2) / 30;
    });

    // Update window dimensions on resize
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    // Smooth scroll for navigation links with reduced duration
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: target,
                        offsetY: 50
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Scroll handler with reduced timeout
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 50);
    });

    // Initialize ScrollTrigger animations with reduced distance
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
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Animate cards on scroll with reduced distance
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
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Update parallax effect with reduced movement
    function updateParallax() {
        if (!isScrolling) {
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 0.1;
                gsap.to(layer, {
                    duration: 1,
                    x: mouseX * depth * 50,
                    y: mouseY * depth * 50,
                    rotationX: mouseY * depth * 5,
                    rotationY: mouseX * depth * 5,
                    ease: 'power2.out'
                });
            });

            if (heroContent) {
                gsap.to(heroContent, {
                    duration: 1,
                    x: mouseX * 15,
                    y: mouseY * 15,
                    rotationX: mouseY * 1.5,
                    rotationY: mouseX * 1.5,
                    ease: 'power2.out'
                });
            }
        }
        requestAnimationFrame(updateParallax);
    }

    // Start parallax effect
    updateParallax();

    // Auto-rotate when idle with reduced movement
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
            const time = Date.now() * 0.0005;
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 0.1;
                gsap.to(layer, {
                    duration: 2,
                    x: Math.sin(time) * depth * 25,
                    y: Math.cos(time) * depth * 25,
                    rotationX: Math.sin(time) * depth * 2.5,
                    rotationY: Math.cos(time) * depth * 2.5,
                    ease: 'power1.inOut'
                });
            });
        }
        requestAnimationFrame(autoRotate);
    }
    autoRotate();

    // Add hover effects to buttons with reduced movement
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -3,
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Add hover effects to cards with reduced movement
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                scale: 1.01,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Form animations with reduced movement
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.2,
                y: -3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input, {
                    duration: 0.2,
                    y: 0,
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
}); 