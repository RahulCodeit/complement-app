// Effects Module - Animations and Particle Effects
export class Effects {
    constructor() {
        this.gsap = window.gsap;
        this.activeEffects = [];
    }
    
    showConfetti() {
        const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
            
            document.body.appendChild(confetti);
            
            // Clean up after animation
            setTimeout(() => confetti.remove(), 6000);
        }
        
        // Sound functionality removed - no audio playback
    }
    
    addSparkles(element) {
        const sparkleCount = 20;
        const container = document.createElement('div');
        container.className = 'sparkles-container';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.overflow = 'hidden';
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = (10 + Math.random() * 20) + 'px';
            sparkle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            
            container.appendChild(sparkle);
        }
        
        element.appendChild(container);
        this.activeEffects.push(container);
        
        // Remove after 10 seconds to prevent memory leak
        setTimeout(() => {
            if (container && container.parentNode) {
                container.remove();
            }
            this.activeEffects = this.activeEffects.filter(e => e !== container);
        }, 10000);
    }
    
    apply3DFlip(element) {
        if (!this.gsap) return;
        
        this.gsap.to(element, {
            rotationY: 360,
            duration: 1,
            ease: "power2.inOut",
            transformStyle: "preserve-3d",
            transformPerspective: 1000
        });
    }
    
    applyParallax(element) {
        const layers = element.querySelectorAll('[data-parallax]');
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            layers.forEach(layer => {
                const speed = layer.dataset.parallax || 1;
                const translateX = x * speed * 20;
                const translateY = y * speed * 20;
                
                layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
        
        element.addEventListener('mouseleave', () => {
            layers.forEach(layer => {
                layer.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    addFloatingHearts() {
        const heartCount = 15;
        const container = document.createElement('div');
        container.className = 'hearts-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1000';
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.bottom = '-50px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            heart.style.opacity = '0.8';
            
            container.appendChild(heart);
            
            // Animate heart floating up
            if (this.gsap) {
                this.gsap.to(heart, {
                    y: -(window.innerHeight + 100),
                    x: (Math.random() - 0.5) * 200,
                    rotation: Math.random() * 360,
                    duration: 5 + Math.random() * 5,
                    ease: "power1.out",
                    onComplete: () => heart.remove()
                });
            }
        }
        
        document.body.appendChild(container);
        this.activeEffects.push(container);
        
        // Clean up container after all animations complete
        setTimeout(() => {
            if (container && container.parentNode) {
                container.remove();
            }
            this.activeEffects = this.activeEffects.filter(e => e !== container);
        }, 10000);
    }
    
    addSnowfall() {
        const snowflakeCount = 50;
        const container = document.createElement('div');
        container.className = 'snow-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1000';
        
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.innerHTML = '❄️';
            snowflake.style.position = 'absolute';
            snowflake.style.top = '-50px';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.fontSize = (10 + Math.random() * 20) + 'px';
            snowflake.style.opacity = Math.random() * 0.8 + 0.2;
            
            container.appendChild(snowflake);
            
            // Animate snowflake falling
            if (this.gsap) {
                this.gsap.to(snowflake, {
                    y: window.innerHeight + 100,
                    x: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 10 + Math.random() * 10,
                    repeat: -1,
                    ease: "none",
                    delay: Math.random() * 10
                });
            }
        }
        
        document.body.appendChild(container);
        this.activeEffects.push(container);
    }
    
    addFireworks() {
        const fireworkCount = 5;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                this.createFirework();
            }, i * 1000);
        }
    }
    
    createFirework() {
        const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        
        // Create explosion particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 100 + Math.random() * 100;
            
            if (this.gsap) {
                this.gsap.to(particle, {
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity + 50,
                    opacity: 0,
                    duration: 1 + Math.random(),
                    ease: "power2.out",
                    onComplete: () => particle.remove()
                });
            }
        }
        
        // Sound functionality removed - no audio playback
    }
    
    glitchEffect(element) {
        const glitchLayers = 3;
        const originalContent = element.innerHTML;
        
        for (let i = 0; i < glitchLayers; i++) {
            const layer = document.createElement('div');
            layer.innerHTML = originalContent;
            layer.style.position = 'absolute';
            layer.style.top = '0';
            layer.style.left = '0';
            layer.style.width = '100%';
            layer.style.height = '100%';
            layer.style.opacity = '0.5';
            layer.style.mixBlendMode = 'screen';
            
            element.appendChild(layer);
            
            this.gsap.to(layer, {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: "steps(2)",
                onComplete: () => layer.remove()
            });
        }
    }
    
    typewriterEffect(element, text, speed = 50) {
        element.innerHTML = '';
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
    
    pulseGlow(element) {
        this.gsap.to(element, {
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.8)',
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }
    
    morphShape(element) {
        this.gsap.to(element, {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
    
    clearAllEffects() {
        this.activeEffects.forEach(effect => {
            if (effect && effect.parentNode) {
                effect.remove();
            }
        });
        this.activeEffects = [];
    }
} 