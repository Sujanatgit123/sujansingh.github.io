// Particle System for Hero Background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = -10;
        this.speed = Math.random() * 2 + 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        
        // Random color from our palette
        const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#8b5cf6'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 0.5;
        
        if (this.y > this.canvas.height + 10) {
            this.reset();
        }
        
        // Fade effect
        this.opacity = Math.sin(this.y * 0.01) * 0.5 + 0.3;
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with ID '${canvasId}' not found`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 100;
        this.mousePosition = { x: 0, y: 0 };
        this.isRunning = true;
        
        console.log('Particle system initializing...');
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
        
        // Mark that particle system is running
        window.particleSystemRunning = true;
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        console.log('Canvas setup complete:', this.canvas.width, 'x', this.canvas.height);
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width || window.innerWidth;
        this.canvas.height = rect.height || window.innerHeight;
        console.log('Canvas resized:', this.canvas.width, 'x', this.canvas.height);
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });
    }

    drawConnections() {
        this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        if (!this.isRunning) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, looking for particles canvas...');
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        console.log('Canvas found, starting particle system');
        new ParticleSystem('particles-canvas');
    } else {
        console.error('particles-canvas not found!');
    }
});

// Backup initialization in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOMContentLoaded has not fired yet
} else {
    // DOMContentLoaded has already fired
    console.log('DOM already loaded, initializing particles...');
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        console.log('Canvas found, starting particle system');
        new ParticleSystem('particles-canvas');
    }
}
