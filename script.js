document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- Custom Cursor ---
    const cursor = document.querySelector(".cursor-glow");
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Check if device supports hover
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + "px";
            cursor.style.top = cursorY + "px";
        });

        // Cursor hover effects
        const interactables = document.querySelectorAll('a, button, input, select, .tilt-card');
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.style.width = "100px";
                cursor.style.height = "100px";
                cursor.style.background = "radial-gradient(circle, rgba(230, 126, 34, 0.4) 0%, rgba(230, 126, 34, 0) 70%)";
            });
            el.addEventListener("mouseleave", () => {
                cursor.style.width = "300px";
                cursor.style.height = "300px";
                cursor.style.background = "radial-gradient(circle, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0) 70%)";
            });
        });
    } else {
        cursor.style.display = 'none'; // Hide on touch devices
    }

    // --- Navbar Shrink & Mobile Menu ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    // Init state
    if (window.scrollY > 50) navbar.classList.add("scrolled");

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Hero Carousel ---
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;
    if(slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    // --- Hero Text 3D Magnetic Effect ---
    const heroOverlay = document.querySelector('.carousel-overlay');
    const magneticText = document.querySelector('.magnetic-wrapper');
    
    if(heroOverlay && magneticText) {
        heroOverlay.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = heroOverlay.getBoundingClientRect();
            
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Movement parameters
            const moveX = x / 25;
            const moveY = y / 25;
            const tiltX = (y / height) * -20; 
            const tiltY = (x / width) * 20;
            
            // Check if hovering near the text bounds (since pointer-events is none on text)
            const textRect = magneticText.getBoundingClientRect();
            // Allow some padding around text for trigger area
            const padding = 50; 
            const isOverText = (
                clientX >= (textRect.left - padding) && clientX <= (textRect.right + padding) &&
                clientY >= (textRect.top - padding) && clientY <= (textRect.bottom + padding)
            );
            
            const scale = isOverText ? 1.15 : 1;
            
            if(cursor) {
                cursor.style.opacity = isOverText ? '0' : '1';
            }
            
            magneticText.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
        });

        heroOverlay.addEventListener('mouseleave', () => {
            magneticText.style.transform = `translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)`;
            if(cursor) cursor.style.opacity = '1';
        });
    }

    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- Form Captcha Validation ---
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    const captchaDisplay = document.getElementById('captcha-display');
    const refreshCaptchaBtn = document.getElementById('refresh-captcha');
    let currentCaptcha = generateCaptcha();
    if(captchaDisplay) captchaDisplay.textContent = currentCaptcha;

    if(refreshCaptchaBtn) {
        refreshCaptchaBtn.addEventListener('click', () => {
            currentCaptcha = generateCaptcha();
            captchaDisplay.textContent = currentCaptcha;
        });
    }

    const form = document.getElementById('enquiry-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const captchaInput = document.getElementById('captcha-input').value;
            if (captchaInput.toUpperCase() !== currentCaptcha) {
                alert('Invalid CAPTCHA. Please try again.');
                currentCaptcha = generateCaptcha();
                captchaDisplay.textContent = currentCaptcha;
                document.getElementById('captcha-input').value = '';
                return;
            }
            alert('Form submitted successfully!');
            form.reset();
            currentCaptcha = generateCaptcha();
            captchaDisplay.textContent = currentCaptcha;
        });
    }

    // --- 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // --- Counters & SVG Rings ---
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const ring = counter.closest('.stat-item').querySelector('.ring-progress');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            once: true,
            onEnter: () => {
                // Animate number
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2.5,
                    ease: "power3.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                    }
                });
                // Animate SVG Ring
                if(ring) {
                    ring.style.strokeDashoffset = 0; // CSS handles transition
                }
            }
        });
    });

    // --- GSAP Scroll Animations ---
    // Fade up sections
    gsap.utils.toArray('.section-header, .courses-grid, .centers-grid').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Staggered features
    gsap.from('.stagger-item', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
    });

    // Parallax particles in hero
    gsap.to('#particles', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // --- FAQ Accordion ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            accordionItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current
            if(!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Chat Widget ---
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');

    if(chatToggle && chatWindow && chatClose) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.add('active');
            chatToggle.style.transform = 'scale(0)';
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            chatToggle.style.transform = 'scale(1)';
        });
    }
});
