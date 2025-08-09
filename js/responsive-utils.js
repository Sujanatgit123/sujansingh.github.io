// Mobile Performance and Responsive Utilities
// Advanced JavaScript utilities for responsive design and mobile optimization

class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            xs: 320,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.isTouch = this.detectTouchDevice();
        this.isReducedMotion = this.detectReducedMotion();
        this.isLowPerformance = this.detectLowPerformance();
        
        this.init();
    }
    
    init() {
        this.setupResizeHandler();
        this.setupOrientationHandler();
        this.setupIntersectionObserver();
        this.setupMobileNavigation();
        this.setupScrollToTop();
        this.optimizeForDevice();
        
        console.log('📱 ResponsiveManager initialized:', {
            breakpoint: this.currentBreakpoint,
            isTouch: this.isTouch,
            isReducedMotion: this.isReducedMotion,
            isLowPerformance: this.isLowPerformance
        });
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width >= this.breakpoints.xxl) return 'xxl';
        if (width >= this.breakpoints.xl) return 'xl';
        if (width >= this.breakpoints.lg) return 'lg';
        if (width >= this.breakpoints.md) return 'md';
        if (width >= this.breakpoints.sm) return 'sm';
        return 'xs';
    }
    
    detectTouchDevice() {
        return (('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0));
    }
    
    detectReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    detectLowPerformance() {
        // Detect potential low-performance devices
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const hardwareConcurrency = navigator.hardwareConcurrency || 1;
        const deviceMemory = navigator.deviceMemory || 1;
        
        // Consider low performance if:
        // - Slow connection
        // - Few CPU cores
        // - Limited memory
        const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        const lowCPU = hardwareConcurrency < 4;
        const lowMemory = deviceMemory < 4;
        
        return slowConnection || (lowCPU && lowMemory);
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.currentBreakpoint = newBreakpoint;
                    this.handleBreakpointChange(newBreakpoint);
                }
                
                this.updateParticleCount();
            }, 150);
        });
    }
    
    setupOrientationHandler() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.updateViewportHeight();
                this.updateParticleCount();
            }, 100);
        });
    }
    
    handleBreakpointChange(newBreakpoint) {
        document.body.setAttribute('data-breakpoint', newBreakpoint);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('breakpointChange', {
            detail: { breakpoint: newBreakpoint }
        }));
        
        console.log(`📱 Breakpoint changed to: ${newBreakpoint}`);
    }
    
    updateViewportHeight() {
        // Fix for mobile viewport height issues
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    updateParticleCount() {
        if (window.particleSystem) {
            let targetCount;
            
            if (this.isLowPerformance) {
                targetCount = 15; // Very low for performance
            } else if (this.currentBreakpoint === 'xs' || this.currentBreakpoint === 'sm') {
                targetCount = 30; // Mobile
            } else if (this.currentBreakpoint === 'md') {
                targetCount = 50; // Tablet
            } else {
                targetCount = 100; // Desktop
            }
            
            window.particleSystem.updateParticleCount(targetCount);
        }
    }
    
    setupIntersectionObserver() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = element.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe sections and cards
        document.querySelectorAll('.section, .card, .project-card, .skill-category').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
        const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navToggle || !navMenu) return;

        // Prevent double-binding by marking element
        if (navToggle.dataset.bound === 'true') return;
        navToggle.dataset.bound = 'true';

        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                this.closeMobileNav();
            } else {
                this.openMobileNav();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileNav());
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) this.closeMobileNav();
        });

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeMobileNav(); });
    }
    
    openMobileNav() {
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
        
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    closeMobileNav() {
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    setupScrollToTop() {
        // Create scroll to top button if it doesn't exist
        let scrollBtn = document.querySelector('.scroll-to-top');
        
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '↑';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(scrollBtn);
        }
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 500) {
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
    
    optimizeForDevice() {
        // Add device-specific classes to body
        document.body.classList.add(
            this.isTouch ? 'touch-device' : 'no-touch',
            this.isReducedMotion ? 'reduced-motion' : 'motion-ok',
            this.isLowPerformance ? 'low-performance' : 'high-performance'
        );
        
        // Set initial breakpoint
        document.body.setAttribute('data-breakpoint', this.currentBreakpoint);
        
        // Set viewport height for mobile
        this.updateViewportHeight();
        
        // Optimize particle count
        this.updateParticleCount();
    }
    
    // Utility methods for other components
    isMobile() {
        return this.currentBreakpoint === 'xs' || this.currentBreakpoint === 'sm';
    }
    
    isTablet() {
        return this.currentBreakpoint === 'md';
    }
    
    isDesktop() {
        return this.currentBreakpoint === 'lg' || this.currentBreakpoint === 'xl' || this.currentBreakpoint === 'xxl';
    }
    
    shouldReduceAnimations() {
        return this.isReducedMotion || this.isLowPerformance || this.isMobile();
    }
    
    getOptimalParticleCount() {
        if (this.isLowPerformance) return 15;
        if (this.isMobile()) return 30;
        if (this.isTablet()) return 50;
        return 100;
    }
}

// Performance monitoring utilities
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            frameTime: 0,
            lastFrameTime: performance.now()
        };
        
        this.isMonitoring = false;
        this.fpsHistory = [];
        this.maxHistory = 60; // Keep last 60 FPS readings
    }
    
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.monitorFrame();
    }
    
    stopMonitoring() {
        this.isMonitoring = false;
    }
    
    monitorFrame() {
        if (!this.isMonitoring) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.metrics.lastFrameTime;
        
        this.metrics.frameTime = deltaTime;
        this.metrics.fps = 1000 / deltaTime;
        this.metrics.lastFrameTime = currentTime;
        
        // Keep FPS history
        this.fpsHistory.push(this.metrics.fps);
        if (this.fpsHistory.length > this.maxHistory) {
            this.fpsHistory.shift();
        }
        
        // Check for performance issues
        this.checkPerformance();
        
        requestAnimationFrame(() => this.monitorFrame());
    }
    
    checkPerformance() {
        const avgFps = this.getAverageFPS();
        
        // If FPS drops below 30 for mobile or 45 for desktop, reduce quality
        const threshold = window.responsiveManager?.isMobile() ? 30 : 45;
        
        if (avgFps < threshold && this.fpsHistory.length >= 30) {
            this.triggerPerformanceOptimization();
        }
    }
    
    getAverageFPS() {
        if (this.fpsHistory.length === 0) return 60;
        
        const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
        return sum / this.fpsHistory.length;
    }
    
    triggerPerformanceOptimization() {
        console.warn('⚡ Performance issues detected, optimizing...');
        
        // Reduce particle count
        if (window.particleSystem) {
            const currentCount = window.particleSystem.particles.length;
            const newCount = Math.max(10, Math.floor(currentCount * 0.7));
            window.particleSystem.updateParticleCount(newCount);
        }
        
        // Reduce animation complexity
        document.body.classList.add('performance-mode');
        
        // Reset FPS history to avoid constant optimization
        this.fpsHistory = [];
    }
    
    getMetrics() {
        return {
            ...this.metrics,
            averageFPS: this.getAverageFPS(),
            performanceGrade: this.getPerformanceGrade()
        };
    }
    
    getPerformanceGrade() {
        const avgFps = this.getAverageFPS();
        
        if (avgFps >= 55) return 'excellent';
        if (avgFps >= 45) return 'good';
        if (avgFps >= 30) return 'fair';
        return 'poor';
    }
}

// Touch gesture utilities
class TouchManager {
    constructor() {
        this.startY = 0;
        this.startX = 0;
        this.endY = 0;
        this.endX = 0;
        this.threshold = 50; // Minimum distance for a swipe
        
        this.init();
    }
    
    init() {
        if (!('ontouchstart' in window)) return;
        
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
    }
    
    handleTouchEnd(e) {
        const touch = e.changedTouches[0];
        this.endX = touch.clientX;
        this.endY = touch.clientY;
        
        this.detectSwipe();
    }
    
    detectSwipe() {
        const deltaX = this.endX - this.startX;
        const deltaY = this.endY - this.startY;
        
        // Vertical swipe
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > this.threshold) {
            if (deltaY > 0) {
                this.onSwipeDown();
            } else {
                this.onSwipeUp();
            }
        }
        
        // Horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.threshold) {
            if (deltaX > 0) {
                this.onSwipeRight();
            } else {
                this.onSwipeLeft();
            }
        }
    }
    
    onSwipeUp() {
        // Custom swipe up actions
        window.dispatchEvent(new CustomEvent('swipeUp'));
    }
    
    onSwipeDown() {
        // Custom swipe down actions
        window.dispatchEvent(new CustomEvent('swipeDown'));
    }
    
    onSwipeLeft() {
        // Custom swipe left actions
        window.dispatchEvent(new CustomEvent('swipeLeft'));
    }
    
    onSwipeRight() {
        // Custom swipe right actions
        window.dispatchEvent(new CustomEvent('swipeRight'));
    }
}

// Initialize responsive utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    window.responsiveManager = new ResponsiveManager();
    window.performanceMonitor = new PerformanceMonitor();
    window.touchManager = new TouchManager();
    
    // Start performance monitoring in development or if explicitly enabled
    if (window.location.hostname === 'localhost' || localStorage.getItem('enablePerformanceMonitoring')) {
        window.performanceMonitor.startMonitoring();
    }
    
    // Add utility functions to global scope
    window.ResponsiveUtils = {
        isMobile: () => window.responsiveManager?.isMobile() || false,
        isTablet: () => window.responsiveManager?.isTablet() || false,
        isDesktop: () => window.responsiveManager?.isDesktop() || false,
        getCurrentBreakpoint: () => window.responsiveManager?.currentBreakpoint || 'md',
        shouldReduceAnimations: () => window.responsiveManager?.shouldReduceAnimations() || false,
        getPerformanceMetrics: () => window.performanceMonitor?.getMetrics() || {},
        isTouch: () => window.responsiveManager?.isTouch || false
    };
    
    console.log('📱 Responsive utilities initialized successfully');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ResponsiveManager,
        PerformanceMonitor,
        TouchManager
    };
}
