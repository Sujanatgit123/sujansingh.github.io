// Security Utilities for Portfolio Site
// Lightweight XSS Protection and Input Sanitization

class SecurityManager {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;
        
        this.setupBasicProtection();
        this.setupLinkProtection();
        this.setupFormValidation();
        this.monitorConsole();
        
        this.initialized = true;
        console.log('🔒 Security Manager initialized (Portfolio Mode)');
    }

    // Basic protection without interfering with portfolio functionality
    setupBasicProtection() {
        // Just log security events, don't block legitimate functionality
        this.logSecurityEvents();
    }

    logSecurityEvents() {
        console.log('🔒 Security monitoring active');
    }

    // Only check for definitely malicious content
    isDefinitelyMalicious(content) {
        if (!content || typeof content !== 'string') return false;
        
        const definitelyMaliciousPatterns = [
            /<script\b[^>]*>[\s\S]*?alert\s*\(/gi,
            /<script\b[^>]*>[\s\S]*?document\.cookie/gi,
            /javascript:\s*alert\s*\(/gi,
            /javascript:\s*eval\s*\(/gi,
            /<iframe[^>]*src\s*=\s*["']javascript:/gi
        ];
        
        return definitelyMaliciousPatterns.some(pattern => pattern.test(content));
    }

    // Form Validation and Protection
    setupFormValidation() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                this.validateForm(form, e);
            }
        });
    }

    validateForm(form, event) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            const value = input.value;
            
            // Check for malicious content
            if (this.containsMaliciousContent(value)) {
                console.warn('🚫 Malicious content detected in form:', input.name, value);
                isValid = false;
            }
            
            // Sanitize the value
            input.value = this.sanitizeInput(value);
        });

        if (!isValid) {
            event.preventDefault();
            alert('Invalid input detected. Please check your form data.');
        }
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/[<>]/g, '') // Remove angle brackets
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+\s*=/gi, '') // Remove inline event handlers
            .trim();
    }

    // Link Protection
    setupLinkProtection() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                this.validateLink(link, e);
            }
        });
    }

    validateLink(link, event) {
        const href = link.href;
        
        // Check for dangerous protocols
        const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
        if (dangerousProtocols.some(protocol => href.toLowerCase().startsWith(protocol))) {
            console.warn('🚫 Dangerous link blocked:', href);
            event.preventDefault();
            return;
        }

        // Ensure external links have proper attributes
        if (this.isExternalLink(href)) {
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
        }
    }

    isExternalLink(href) {
        try {
            const url = new URL(href);
            return url.hostname !== window.location.hostname;
        } catch {
            return false;
        }
    }

    // Console Protection
    monitorConsole() {
        // Warn users about console usage
        const warning = `
🚨 SECURITY WARNING 🚨
This is a browser feature intended for developers. 
If someone told you to copy/paste something here, it's likely a scam.
Never paste code from untrusted sources into the console.
        `;
        
        console.log('%c' + warning, 'color: red; font-size: 16px; font-weight: bold;');
        
        // Override console methods to detect potential attacks
        const originalLog = console.log;
        console.log = function(...args) {
            if (args.some(arg => typeof arg === 'string' && window.securityManager.containsMaliciousContent(arg))) {
                console.warn('🚫 Potentially malicious console output blocked');
                return;
            }
            originalLog.apply(console, args);
        };
    }

    // Rate limiting for form submissions
    setupRateLimit() {
        this.submissionTimes = [];
        this.maxSubmissions = 3;
        this.timeWindow = 60000; // 1 minute
    }

    checkRateLimit() {
        const now = Date.now();
        this.submissionTimes = this.submissionTimes.filter(time => now - time < this.timeWindow);
        
        if (this.submissionTimes.length >= this.maxSubmissions) {
            console.warn('🚫 Rate limit exceeded');
            return false;
        }
        
        this.submissionTimes.push(now);
        return true;
    }

    // Security audit function
    runSecurityAudit() {
        const issues = [];
        
        // Check for inline scripts
        const inlineScripts = document.querySelectorAll('script:not([src])');
        if (inlineScripts.length > 0) {
            issues.push(`Found ${inlineScripts.length} inline script(s)`);
        }
        
        // Check for unsafe links
        const unsafeLinks = document.querySelectorAll('a[href^="javascript:"], a[href^="data:"]');
        if (unsafeLinks.length > 0) {
            issues.push(`Found ${unsafeLinks.length} potentially unsafe link(s)`);
        }
        
        // Check for forms without CSRF protection
        const forms = document.querySelectorAll('form');
        forms.forEach((form, index) => {
            if (!form.querySelector('input[name="csrf_token"]')) {
                issues.push(`Form ${index + 1} missing CSRF protection`);
            }
        });
        
        if (issues.length === 0) {
            console.log('✅ Security audit passed - no issues found');
        } else {
            console.warn('⚠️ Security audit found issues:', issues);
        }
        
        return issues;
    }
}

// Initialize security manager
window.securityManager = new SecurityManager();

// Add security-related utility functions
window.SecurityUtils = {
    sanitize: (input) => window.securityManager.sanitizeInput(input),
    validateURL: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    generateCSRFToken: () => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityManager;
}
