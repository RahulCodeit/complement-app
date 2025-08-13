class GifGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.effects = [];
        this.frameCount = 30; // Reduced for better performance
        this.frameDuration = 100; // 100ms per frame (10 FPS)
        this.quality = 10; // GIF quality (1-10, 10 being best)
        this.width = 1080; // Full HD width
        this.height = 1620; // Full HD height (3:2 aspect ratio)
    }
    
    async generateGif(originalCanvas, options = {}) {
        const {
            message,
            template,
            recipient,
            occasion,
            effects = []
        } = options;
        
        console.log('Starting GIF generation with effects:', effects);
        
        // Create HD canvas for GIF generation
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        
        // Enable image smoothing for HD quality
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        
        return new Promise((resolve, reject) => {
            try {
                // Check if GIF library is loaded
                if (typeof window.GIF === 'undefined') {
                    console.error('GIF library not loaded');
                    reject(new Error('GIF library not loaded. Please refresh the page.'));
                    return;
                }
                
                // Determine the correct worker path based on current location
                const currentPath = window.location.pathname;
                const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                const workerPath = basePath + 'gif.worker.js';
                
                // Initialize GIF encoder with dynamic worker path
                const gif = new window.GIF({
                    workers: 2,
                    quality: this.quality,
                    width: this.width,
                    height: this.height,
                    workerScript: workerPath,
                    debug: true
                });
                
                console.log('GIF encoder initialized with worker path:', workerPath);
                
                // Generate frames
                const frames = this.generateFrames(originalCanvas, effects);
                console.log(`Generated ${frames.length} frames`);
                
                // Add frames to GIF
                if (frames.length === 0) {
                    console.error('No frames generated, using original canvas');
                    gif.addFrame(originalCanvas, { delay: this.frameDuration, copy: true });
                } else {
                    frames.forEach((frame, index) => {
                        gif.addFrame(frame.canvas, { delay: this.frameDuration, copy: true });
                        console.log(`Added frame ${index + 1}/${frames.length}`);
                    });
                }
                
                // Handle GIF generation completion
                gif.on('finished', (blob) => {
                    console.log('GIF generation finished, blob size:', blob.size);
                    resolve(blob);
                });
                
                gif.on('error', (error) => {
                    console.error('GIF generation error:', error);
                    reject(error);
                });
                
                gif.on('progress', (progress) => {
                    console.log('GIF generation progress:', Math.round(progress * 100) + '%');
                });
                
                // Start rendering
                console.log('Starting GIF render...');
                gif.render();
                
            } catch (error) {
                console.error('Error in generateGif:', error);
                reject(error);
            }
        });
    }
    
    generateFrames(originalCanvas, selectedEffects) {
        const frames = [];
        
        try {
            // Initialize effect particles
            const sparkles = selectedEffects.includes('sparkles') ? this.initSparkles() : [];
            const confetti = selectedEffects.includes('confetti') ? this.initConfetti() : [];
            
            console.log(`Generating frames with effects: ${selectedEffects.join(', ')}`);
            console.log(`Sparkles: ${sparkles.length}, Confetti: ${confetti.length}`);
            
            for (let i = 0; i < this.frameCount; i++) {
                try {
                    const frameCanvas = document.createElement('canvas');
                    frameCanvas.width = this.width;
                    frameCanvas.height = this.height;
                    const frameCtx = frameCanvas.getContext('2d');
                    
                    // Enable high quality rendering
                    frameCtx.imageSmoothingEnabled = true;
                    frameCtx.imageSmoothingQuality = 'high';
                    
                    // Clear frame
                    frameCtx.clearRect(0, 0, this.width, this.height);
                    
                    // Draw base card (already in HD)
                    frameCtx.drawImage(originalCanvas, 0, 0, this.width, this.height);
                    
                    // Apply 3D rotation effect if selected
                    if (selectedEffects.includes('3d')) {
                        this.apply3DEffect(frameCtx, i);
                    }
                    
                    // Draw sparkles
                    if (sparkles.length > 0) {
                        this.drawSparkles(frameCtx, sparkles, i);
                    }
                    
                    // Draw confetti
                    if (confetti.length > 0) {
                        this.drawConfetti(frameCtx, confetti, i);
                    }
                    
                    // Add glow effect if selected
                    if (selectedEffects.includes('glow')) {
                        this.applyGlowEffect(frameCtx, i);
                    }
                    
                    frames.push({ canvas: frameCanvas });
                } catch (frameError) {
                    console.error(`Error generating frame ${i}:`, frameError);
                    // Add frame without effects if there's an error
                    const frameCanvas = document.createElement('canvas');
                    frameCanvas.width = this.width;
                    frameCanvas.height = this.height;
                    const frameCtx = frameCanvas.getContext('2d');
                    frameCtx.drawImage(originalCanvas, 0, 0, this.width, this.height);
                    frames.push({ canvas: frameCanvas });
                }
            }
        } catch (error) {
            console.error('Error in generateFrames:', error);
            // Return at least one frame if there's an error
            const frameCanvas = document.createElement('canvas');
            frameCanvas.width = this.width;
            frameCanvas.height = this.height;
            const frameCtx = frameCanvas.getContext('2d');
            frameCtx.drawImage(originalCanvas, 0, 0, this.width, this.height);
            frames.push({ canvas: frameCanvas });
        }
        
        return frames;
    }
    
    initSparkles() {
        const sparkles = [];
        const sparkleCount = 20;
        
        for (let i = 0; i < sparkleCount; i++) {
            sparkles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 4 + 2,
                speed: Math.random() * 2 + 1,
                angle: Math.random() * Math.PI * 2,
                opacity: Math.random(),
                color: ['#FFD700', '#FFF', '#FF69B4', '#87CEEB'][Math.floor(Math.random() * 4)]
            });
        }
        
        return sparkles;
    }
    
    initConfetti() {
        const confetti = [];
        const confettiCount = 30;
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD93D'];
        
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * this.width,
                y: -20,
                width: Math.random() * 10 + 5,
                height: Math.random() * 15 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                swaySpeed: Math.random() * 2 + 1,
                swayAmount: Math.random() * 30 + 10
            });
        }
        
        return confetti;
    }
    
    drawSparkles(ctx, sparkles, frame) {
        try {
            sparkles.forEach(sparkle => {
                const pulse = Math.sin(frame * 0.1 + sparkle.angle) * 0.5 + 0.5;
                const currentOpacity = sparkle.opacity * pulse;
                
                ctx.save();
                ctx.globalAlpha = currentOpacity;
                
                // Draw sparkle as a star
                const x = sparkle.x + Math.sin(frame * 0.05 + sparkle.angle) * 20;
                const y = sparkle.y + Math.cos(frame * 0.05 + sparkle.angle) * 10;
                
                // Simple sparkle without gradient for better compatibility
                ctx.fillStyle = sparkle.color;
                
                // Draw as simple star or circle
                ctx.beginPath();
                ctx.arc(x, y, sparkle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add a smaller bright center
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(x, y, sparkle.size * 0.3, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
        } catch (error) {
            console.error('Error drawing sparkles:', error);
        }
    }
    
    drawConfetti(ctx, confettiArray, frame) {
        confettiArray.forEach(piece => {
            // Update position
            piece.y += piece.speed;
            piece.rotation += piece.rotationSpeed;
            
            // Sway motion
            const swayX = Math.sin(frame * 0.05 * piece.swaySpeed) * piece.swayAmount;
            
            // Reset position if off screen
            if (piece.y > this.height + 20) {
                piece.y = -20;
                piece.x = Math.random() * this.width;
            }
            
            ctx.save();
            ctx.translate(piece.x + swayX, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            
            // Draw confetti piece with gradient
            const gradient = ctx.createLinearGradient(0, 0, piece.width, piece.height);
            gradient.addColorStop(0, piece.color);
            gradient.addColorStop(1, this.lightenColor(piece.color, 20));
            
            ctx.fillStyle = gradient;
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            
            // Add shine effect
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width / 3, piece.height);
            
            ctx.restore();
        });
    }
    
    apply3DEffect(ctx, frame) {
        const angle = (frame / this.frameCount) * Math.PI * 2;
        const perspective = Math.sin(angle) * 0.2;
        
        if (Math.abs(perspective) > 0.01) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            
            // Add shadow for 3D depth
            const shadowOffset = perspective * 20;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = Math.abs(shadowOffset);
            ctx.shadowOffsetX = shadowOffset;
            ctx.shadowOffsetY = shadowOffset / 2;
            
            ctx.restore();
        }
    }
    
    applyGlowEffect(ctx, frame) {
        const glowIntensity = Math.sin(frame * 0.1) * 0.3 + 0.7;
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = glowIntensity * 0.3;
        
        // Create glow gradient
        const gradient = ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, this.width / 2
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#ffeb3b');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);
        
        ctx.restore();
    }
    
    drawStar(ctx, cx, cy, innerRadius, outerRadius, points, fillStyle) {
        ctx.beginPath();
        ctx.fillStyle = fillStyle;
        
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / points;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
    }
    
    lightenColor(color, percent) {
        try {
            // Handle different color formats
            if (!color || !color.startsWith('#')) {
                return color; // Return original if not hex
            }
            
            const num = parseInt(color.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            
            return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255))
                .toString(16).slice(1);
        } catch (error) {
            console.error('Error lightening color:', error);
            return color; // Return original color if error
        }
    }
}

export default GifGenerator; 