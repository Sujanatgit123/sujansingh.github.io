// Main JavaScript functionality with responsive optimization
document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.classList.add('zoom-reset');
    document.body.classList.add('zoom-reset');
    // Initialize responsive utilities first
    initResponsiveFeatures();
    
    // Initialize all functionality
    initConfigBasedContent();
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initCounterAnimation();
    // Contact form removed
    initSmoothScrolling();
    initParallaxEffects();
    
    // If an external Particles lib was expected but missing, log once
    if (typeof Particles !== 'undefined') {
        try {
            Particles.init({
                selector: '#particles-canvas',
                color: '#ffffff',
                connectParticles: true,
                maxParticles: 100,
                speed: 0.5,
                sizeVariations: 3,
            });
            console.log('External Particles library initialized');
        } catch (e) {
            console.warn('Particles library present but failed to initialize:', e);
        }
    } else {
        console.log('Particles global not found; using custom/simple particle system');
    }

    applyGlassEffects();
    
    console.log('✨ Main script initialized with responsive optimizations');
});

// Initialize responsive-specific features
function initResponsiveFeatures() {
    // Wait for responsive manager to be available
    if (window.responsiveManager) {
        setupResponsiveAnimations();
        setupDeviceSpecificFeatures();
    } else {
        // Wait for responsive utilities to load
        setTimeout(initResponsiveFeatures, 100);
    }
}

function setupResponsiveAnimations() {
    // Reduce animations on low-performance devices
    if (window.ResponsiveUtils?.shouldReduceAnimations()) {
        document.body.classList.add('reduced-animations');
        console.log('🚀 Reduced animations enabled for better performance');
    }
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger child animations
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
        scrollObserver.observe(el);
    });
}

function setupDeviceSpecificFeatures() {
    const isMobile = window.ResponsiveUtils?.isMobile();
    const isTouch = window.ResponsiveUtils?.isTouch();
    
    if (isMobile) {
        // Mobile-specific optimizations
        setupMobileOptimizations();
    }
    
    if (isTouch) {
        // Touch-specific features
        setupTouchInteractions();
    }
}

function setupMobileOptimizations() {
    // Optimize image loading for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Add mobile-specific classes
    document.body.classList.add('mobile-optimized');
    
    // Simplify complex animations for mobile
    const complexAnimations = document.querySelectorAll('.complex-animation');
    complexAnimations.forEach(el => {
        el.classList.add('simple-animation');
    });
}

function setupTouchInteractions() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .nav-link, .project-card, .social-link');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// Initialize config-based dynamic content
function initConfigBasedContent() {
    const config = window.SITE_CONFIG;
    if (!config) {
        console.warn('SITE_CONFIG not found! Using default content.');
        return;
    }

    try {
        // Skip heavy dynamic population on pages that don't have the main sections (e.g., certifications page)
        if (!document.getElementById('home')) {
            console.log('ℹ️ Skipping full config content init (no main portfolio sections on this page)');
            return;
        }
        // Update personal information
        updatePersonalInfo(config);
        
        // Generate skills section
        generateSkillsSection(config.skills);
        
        // Generate projects section
        generateProjectsSection(config.projects);
        
        // Generate experience timeline
        generateExperienceSection(config.experience);
        
        // Update stats
        updateStatsSection(config.stats);
        
        // Update contact info
        updateContactSection(config.contact);
        
        // Update navigation
        updateNavigation(config.navigation);
        
        // Update education
        updateEducationSection(config.education);
        
        console.log('✅ Portfolio content initialized from config');
    } catch (error) {
        console.error('❌ Error initializing config-based content:', error);
        // Continue with default content if config fails
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    // New responsive toggle button (preferred)
    const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
    // Legacy hamburger fallback
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !navMenu) {
        console.warn('Navigation elements missing; skipping initNavigation');
        return;
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Avoid double-binding if ResponsiveManager already wired .nav-toggle
    const responsiveNavPresent = !!document.querySelector('.nav-toggle');

    // Only attach legacy handler if we have a hamburger and no modern nav-toggle
    if (!responsiveNavPresent && hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu?.classList.toggle('active');
        });
    }

    // Attach handler for navToggle ONLY if ResponsiveManager not present yet (failsafe)
    if (navToggle && !window.responsiveManager) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', (!expanded).toString());
            navMenu?.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            navMenu?.classList.remove('active');
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    if (window.SITE_CONFIG?.features && !window.SITE_CONFIG.features.scrollAnimations) return;
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Disabled: Add animation classes to sections - this was hiding content
    // const sections = document.querySelectorAll('section');
    // sections.forEach((section, index) => {
    //     if (index % 2 === 0) {
    //         section.classList.add('fade-in');
    //     } else {
    //         section.classList.add('slide-in-left');
    //     }
    // });
}

// Typing effect for hero title
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    const cfg = window.SITE_CONFIG?.hero || {};
    const text = cfg.typingText || "Hi, I'm Sujan Singh";
    const speed = cfg.typingSpeed || 100;
    const delay = cfg.typingStartDelay || 1000;
    let i = 0;

    typingElement.textContent = '';

    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Add blinking cursor
            typingElement.style.borderRight = '3px solid #6366f1';
            typingElement.style.animation = 'blink 1s infinite';
        }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, delay);
}

// Animated skill bars
function initSkillBars() {
    if (window.SITE_CONFIG?.features && !window.SITE_CONFIG.features.skillBars) return;
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const targetWidth = skillProgress.getAttribute('data-width');
                
                setTimeout(() => {
                    skillProgress.style.width = targetWidth + '%';
                }, 200);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Counter animation for stats
function initCounterAnimation() {
    if (window.SITE_CONFIG?.features && !window.SITE_CONFIG.features.counters) return;
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Contact form removed

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                color: var(--text-primary);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: var(--shadow-lg);
            }
            .notification.success {
                border-color: #22c55e;
                background: rgba(34, 197, 94, 0.1);
            }
            .notification.error {
                border-color: #ef4444;
                background: rgba(239, 68, 68, 0.1);
            }
            .notification .close-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: var(--transition);
            }
            .notification .close-btn:hover {
                color: var(--text-primary);
                background: rgba(255, 255, 255, 0.1);
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    if (window.SITE_CONFIG?.features && !window.SITE_CONFIG.features.parallax) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility function to add CSS animation styles
function addCSSAnimations() {
    if (document.querySelector('.animation-styles')) return;

    const styles = document.createElement('style');
    styles.className = 'animation-styles';
    styles.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #6366f1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .slide-in-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.6s ease;
        }
        
        .slide-in-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .slide-in-right {
            opacity: 0;
            transform: translateX(50px);
            transition: all 0.6s ease;
        }
        
        .slide-in-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    
    document.head.appendChild(styles);
}

// Initialize CSS animations
addCSSAnimations();

// Scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add scroll to top styles
    const styles = document.createElement('style');
    styles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
        }
    `;
    
    document.head.appendChild(styles);
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
if (window.SITE_CONFIG?.features?.scrollToTop !== false) {
    addScrollToTop();
}

// Apply glassmorphism utility classes dynamically
function applyGlassEffects() {
    const mappings = [
        { selector: '.skills-category', cls: 'glass hover-lift interactive-tilt' },
        { selector: '.project-card', cls: 'glass hover-lift interactive-tilt' },
        { selector: '.timeline-content', cls: 'glass hover-lift interactive-tilt' },
        { selector: '.education-item', cls: 'glass interactive-tilt' },
        { selector: '.stat-item', cls: 'glass hover-lift interactive-tilt' },
        { selector: '.contact-form-container', cls: 'glass interactive-tilt' },
        { selector: '.certification-card', cls: 'glass hover-lift interactive-tilt' },
    ];
    mappings.forEach(map => {
        document.querySelectorAll(map.selector).forEach(el => {
            map.cls.split(/\s+/).forEach(c => el.classList.add(c));
            if (!el.querySelector('.tilt-glow')) {
                const glow = document.createElement('div');
                glow.className = 'tilt-glow';
                el.appendChild(glow);
            }
        });
    });

    initTiltEffects();
}

// Dynamic content generation functions
function updatePersonalInfo(config) {
    const personal = config.personal || {};
    const hero = config.hero || {};
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title .typing-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const profilePhoto = document.querySelector('.profile-photo');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroSubtitle) heroSubtitle.textContent = hero.subtitle || personal.title || "AI & Data Science Student";
    if (heroDescription) heroDescription.textContent = hero.description || personal.bio || "";
    if (profilePhoto && personal.profileImage) {
        profilePhoto.src = personal.profileImage;
        profilePhoto.alt = personal.name || "Profile Photo";
    }
    
    // Update hero buttons
    if (heroButtons && hero.buttons) {
        heroButtons.innerHTML = '';
        hero.buttons.forEach(button => {
            const btn = document.createElement('a');
            btn.href = button.href;
            btn.className = `btn btn-${button.type}`;
            btn.textContent = button.text;
            heroButtons.appendChild(btn);
        });
    }
    
    // Update about section text
    updateAboutSection(config);
    
    // Update social links
    updateSocialLinks(config.social);
}

function updateAboutSection(config) {
    const personal = config.personal || {};
    const education = config.education || [];
    
    // Update about description
    const aboutDescriptions = document.querySelectorAll('.about-description');
    if (aboutDescriptions.length > 0 && personal.bio) {
        const bioSentences = personal.bio.split('. ');
        aboutDescriptions.forEach((desc, index) => {
            if (bioSentences[index]) {
                desc.innerHTML = bioSentences[index] + (index < bioSentences.length - 1 ? '.' : '');
            }
        });
    }
    
    // Update education
    const educationContainer = document.querySelector('.education-item');
    if (educationContainer && education.length > 0) {
        const edu = education[0]; // Use first education entry
        const h4 = educationContainer.querySelector('h4');
        const p = educationContainer.querySelector('p');
        const yearSpan = educationContainer.querySelector('.year');
        
        if (h4) h4.textContent = edu.degree || '';
        if (p) p.textContent = edu.institution || '';
        if (yearSpan) yearSpan.textContent = edu.year || '';
    }
}

function updateSocialLinks(social) {
    if (!social) return;
    
    const socialContainers = document.querySelectorAll('.social-links, .social-links-contact');
    socialContainers.forEach(container => {
        container.innerHTML = '';
        
        Object.entries(social).forEach(([platform, url]) => {
            if (url) {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.setAttribute('aria-label', platform.charAt(0).toUpperCase() + platform.slice(1));
                
                const icon = document.createElement('i');
                icon.className = getIconClass(platform);
                link.appendChild(icon);
                
                container.appendChild(link);
            }
        });
    });
}

function getIconClass(platform) {
    const icons = {
        github: 'fab fa-github',
        linkedin: 'fab fa-linkedin',
        email: 'fas fa-envelope',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        website: 'fas fa-globe'
    };
    return icons[platform] || 'fas fa-link';
}

function generateSkillsSection(skills) {
    if (!skills?.categories) return;
    
    const skillsContent = document.querySelector('.skills-content');
    if (!skillsContent) return;
    
    skillsContent.innerHTML = '';
    
    skills.categories.forEach(category => {
        if (!category.enabled) return;
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skills-category';
        
        categoryDiv.innerHTML = `
            <h3>${category.name}</h3>
            <div class="skill-items">
                ${category.items ? generateSkillItems(category.items) : ''}
                ${category.badges ? generateSkillBadges(category.badges) : ''}
            </div>
        `;
        
        skillsContent.appendChild(categoryDiv);
    });
}

function generateSkillItems(items) {
    return items.map(skill => `
        <div class="skill-item">
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.percentage}"></div>
            </div>
        </div>
    `).join('');
}

function generateSkillBadges(badges) {
    return `
        <div class="skill-badges">
            ${badges.map(badge => `<span class="skill-badge">${badge}</span>`).join('')}
        </div>
    `;
}

function generateProjectsSection(projects) {
    if (!projects) return;
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        if (!project.enabled) return;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/600x400/6366f1/ffffff?text=Project'">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-status ${project.status}">${project.status.replace('-', ' ').toUpperCase()}</div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

function generateExperienceSection(experience) {
    if (!experience) return;
    
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;
    
    // Clear existing timeline items but keep the ::before line
    const existingItems = timeline.querySelectorAll('.timeline-item');
    existingItems.forEach(item => item.remove());
    
    experience.forEach(exp => {
        if (!exp.enabled) return;
        
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <h4 class="timeline-company">${exp.company}</h4>
                <p class="timeline-description">${exp.description}</p>
                <div class="timeline-skills">
                    ${exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

function updateStatsSection(stats) {
    if (!stats) return;
    
    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;
    
    statsContainer.innerHTML = '';
    
    stats.forEach(stat => {
        if (!stat.enabled) return;
        
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        statItem.innerHTML = `
            <div class="stat-number" data-target="${stat.number}">0</div>
            <div class="stat-label">${stat.label}</div>
        `;
        
        statsContainer.appendChild(statItem);
    });
}

function updateContactSection(contact) {
    if (!contact) return;
    
    // Update contact details
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const h4 = item.querySelector('h4');
        const p = item.querySelector('p');
        
        if (h4 && p) {
            const label = h4.textContent;
            if (label === 'Email') p.textContent = contact.email || '';
            if (label === 'Location') p.textContent = contact.location || '';
            if (label === 'Institution') p.textContent = contact.institution || '';
        }
    });
    
        // Update availability badge text if provided
        const availability = contact.availability || 'Open to Opportunities';
        const badge = document.querySelector('.availability-badge span:last-child');
        if (badge) badge.textContent = availability;
}

// Copy email quick action
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-copy-email');
    if (!btn) return;
    const email = btn.getAttribute('data-email');
    if (!email) return;
    navigator.clipboard?.writeText(email).then(() => {
        showNotification('Email copied to clipboard', 'success');
    }).catch(() => {
        showNotification('Copy failed', 'error');
    });
});

// Interactive tilt + glow effect
function initTiltEffects() {
    const supportsPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsPointer) return; // skip on touch
    const cards = document.querySelectorAll('.interactive-tilt');
    const maxTilt = 22; // increased degrees for stronger bend
    cards.forEach(card => {
        let rafId = null;
        let tiltX = 0, tiltY = 0; // current applied
        let targetTiltX = 0, targetTiltY = 0; // target

        function applyTransform(immediate = false) {
            if (immediate) {
                tiltX = targetTiltX;
                tiltY = targetTiltY;
            }
            card.style.transform = `perspective(900px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        }

        function animate() {
            // Ease quickly toward target for snappier response
            tiltX += (targetTiltX - tiltX) * 0.5;
            tiltY += (targetTiltY - tiltY) * 0.5;
            applyTransform();
            if (Math.abs(tiltX - targetTiltX) > 0.2 || Math.abs(tiltY - targetTiltY) > 0.2) {
                rafId = requestAnimationFrame(animate);
            } else {
                tiltX = targetTiltX; tiltY = targetTiltY; applyTransform(true); rafId = null;
            }
        }

        function handleMove(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Center normalized (-0.5..0.5)
            const nx = (x / rect.width) - 0.5;
            const ny = (y / rect.height) - 0.5;
            targetTiltX = nx * maxTilt;      // rotateY axis perceived as left/right
            targetTiltY = -ny * maxTilt;     // invert for natural vertical tilt
            card.dataset.tilting = 'true';
            // Update glow position with direct % mapping
            const glow = card.querySelector('.tilt-glow');
            if (glow) {
                glow.style.setProperty('--mx', (nx * 60 + 50) + '%'); // narrower to keep glow inside
                glow.style.setProperty('--my', (ny * 60 + 50) + '%');
            }
            if (!rafId) rafId = requestAnimationFrame(animate);
        }

        function resetTilt() {
            targetTiltX = 0; targetTiltY = 0;
            if (!rafId) rafId = requestAnimationFrame(animate);
            setTimeout(() => { card.dataset.tilting = 'false'; }, 200);
        }

        card.addEventListener('mousemove', handleMove, { passive: true });
        card.addEventListener('mouseleave', resetTilt);
        card.addEventListener('blur', resetTilt, true);
    });
}

function updateNavigation(navigation) {
    if (!navigation) return;
    
    // Update logo
    const navLogo = document.querySelector('.nav-logo a');
    if (navLogo) navLogo.textContent = navigation.logo || 'Portfolio';
    
    // Update navigation links
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu || !navigation.links) return;
    
    // Store existing hamburger functionality
    const existingLinks = Array.from(navMenu.querySelectorAll('.nav-link'));
    
    navMenu.innerHTML = '';
    
    navigation.links.forEach(link => {
        if (!link.enabled) return;
        
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.href = link.href;
        a.className = 'nav-link';
        a.textContent = link.text;
        
        // Re-attach click handler for mobile menu
        a.addEventListener('click', () => {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

function updateEducationSection(education) {
    if (!education || education.length === 0) return;
    
    const educationContainer = document.querySelector('.education-item');
    if (!educationContainer) return;
    
    const enabledEducation = education.filter(edu => edu.enabled !== false);
    if (enabledEducation.length === 0) {
        educationContainer.style.display = 'none';
        return;
    }
    
    // Use first enabled education entry
    const edu = enabledEducation[0];
    const h4 = educationContainer.querySelector('h4');
    const p = educationContainer.querySelector('p');
    const yearSpan = educationContainer.querySelector('.year');
    
    if (h4) h4.textContent = edu.degree || '';
    if (p) p.textContent = edu.institution || '';
    if (yearSpan) yearSpan.textContent = edu.year || '';
    
    educationContainer.style.display = 'block';
}

// Utility function to safely update text content
function safeUpdateText(selector, text, fallback = '') {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text || fallback;
        return true;
    }
    return false;
}

// Utility function to safely update HTML content
function safeUpdateHTML(selector, html, fallback = '') {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = html || fallback;
        return true;
    }
    return false;
}

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
function showPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader-content p {
            color: var(--text-secondary);
            margin: 0;
        }
    `;
    
    document.head.appendChild(loaderStyles);
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// Page loader disabled to prevent content hiding issues
// Initialize page loader
// if (document.readyState === 'loading') {
//     showPageLoader();
// }
