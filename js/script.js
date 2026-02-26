        // ==================== PRELOADER ====================
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('hidden');
                document.body.classList.remove('loading');
            }, 2500);
        });

        // ==================== THEME TOGGLE ====================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ==================== MOBILE NAVIGATION ====================
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.querySelector('.nav-menu');

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // ==================== NAVBAR SCROLL EFFECT ====================
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ==================== SCROLL REVEAL ANIMATIONS ====================
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // ==================== STEPS LINE ANIMATION ====================
        const stepsLine = document.querySelector('.steps-line');

        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.5 });

        if (stepsLine) stepsObserver.observe(stepsLine);

        // ==================== FAQ ACCORDION ====================
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // ==================== SMOOTH SCROLL ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

        // ==================== COUNTER ANIMATION ====================
        const counters = document.querySelectorAll('.stat-value, .about-card-value');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const hasNumber = /[\d.]+/.test(text);
                    
                    if (hasNumber && !target.classList.contains('counted')) {
                        target.classList.add('counted');
                        animateCounter(target, text);
                    }
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));

        function animateCounter(element, finalText) {
            const match = finalText.match(/([\d.]+)/);
            if (!match) return;

            const finalNum = parseFloat(match[1]);
            const prefix = finalText.substring(0, finalText.indexOf(match[1]));
            const suffix = finalText.substring(finalText.indexOf(match[1]) + match[1].length);
            
            let current = 0;
            const increment = finalNum / 50;
            const isDecimal = finalText.includes('.');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNum) {
                    element.textContent = finalText;
                    clearInterval(timer);
                } else {
                    const displayNum = isDecimal ? current.toFixed(1) : Math.floor(current);
                    element.textContent = prefix + displayNum + suffix;
                }
            }, 30);
        }

        // ==================== PARALLAX EFFECT ====================
        document.addEventListener('mousemove', (e) => {
            const cubes = document.querySelectorAll('.floating-cube');
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            cubes.forEach((cube, index) => {
                const depth = (index + 1) * 10;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                cube.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            });
        });

        // ==================== PERFORMANCE OPTIMIZATION ====================
        // Lazy load images when they come into view
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Reduce animations on low-end devices
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }

        // ==================== ACTIVE NAV LINK HIGHLIGHT ====================
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // ==================== FORM HANDLING ====================
        const ctaInput = document.querySelector('.cta-input-group input');
        const ctaButton = document.querySelector('.cta-input-group .btn');

        if (ctaButton && ctaInput) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                const email = ctaInput.value.trim();
                
                if (validateEmail(email)) {
                    ctaButton.textContent = 'Subscribed! ✓';
                    ctaButton.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
                    ctaInput.value = '';
                    
                    setTimeout(() => {
                        ctaButton.textContent = 'Subscribe';
                        ctaButton.style.background = '';
                    }, 3000);
                } else {
                    ctaInput.style.borderColor = '#ff6b6b';
                    setTimeout(() => {
                        ctaInput.style.borderColor = '';
                    }, 2000);
                }
            });
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // ==================== KEYBOARD ACCESSIBILITY ====================
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Focus trap for mobile menu
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                const focusableElements = navMenu.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });

        console.log('%c BlockVerse ', 'background: linear-gradient(135deg, #6c5ce7, #00d4ff); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-family: Orbitron;');
        console.log('%c Built with ❤️ for the decentralized future ', 'color: #a0a0b0; font-size: 12px;');
