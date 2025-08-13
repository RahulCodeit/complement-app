// Canvas Engine for Compliment Cards 2.0
export class CanvasEngine {
    constructor() {
        this.templates = this.initTemplates();
        this.isCanvasSupported = this.checkCanvasSupport();
    }
    
    checkCanvasSupport() {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
    }
    
    initTemplates() {
        return {
            // Original gradient templates
            modern: {
                gradient: ['#667eea', '#764ba2'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: 'rgba(255,255,255,0.8)',
                decorations: 'geometric'
            },
            vintage: {
                gradient: ['#f2994a', '#f2c94c'],
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#2d3436',
                secondaryColor: '#636e72',
                decorations: 'ornamental'
            },
            minimal: {
                background: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#2d3436',
                secondaryColor: '#636e72',
                decorations: 'none',
                border: true
            },
            
            // ARTISTIC TEMPLATES
            watercolor: {
                type: 'watercolor',
                colors: ['#FFE5E5', '#FFE5F1', '#FFF0F5', '#E5E5FF'],
                fontFamily: 'Dancing Script, cursive',
                primaryColor: '#4a4a4a',
                secondaryColor: '#7a7a7a',
                decorations: 'watercolor-splash'
            },
            oilPainting: {
                type: 'oil-painting',
                baseColor: '#8B7355',
                accentColors: ['#CD853F', '#DEB887', '#F4A460'],
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#ffffff',
                secondaryColor: '#F5DEB3',
                decorations: 'artistic-frame'
            },
            sketch: {
                type: 'sketch',
                background: '#F5F5DC',
                strokeColor: '#2F4F4F',
                fontFamily: 'Caveat, cursive',
                primaryColor: '#2F4F4F',
                secondaryColor: '#696969',
                decorations: 'sketch-lines'
            },
            abstractArt: {
                type: 'abstract',
                shapes: ['circle', 'triangle', 'organic'],
                colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#F0F0F0',
                decorations: 'abstract-shapes'
            },
            
            // RETRO TEMPLATES
            retro70s: {
                type: 'retro-pattern',
                pattern: 'groovy',
                colors: ['#FF6B35', '#F77737', '#C4491D', '#8B2500'],
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#FFF8DC',
                secondaryColor: '#FAEBD7',
                decorations: 'retro-circles'
            },
            artDeco: {
                type: 'art-deco',
                background: '#1C1C1C',
                goldAccent: '#FFD700',
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#FFD700',
                secondaryColor: '#F0E68C',
                decorations: 'art-deco-pattern'
            },
            vintagePostcard: {
                type: 'vintage-postcard',
                background: '#FFF8E7',
                borderStyle: 'postcard',
                stampPosition: 'top-right',
                fontFamily: 'Caveat, cursive',
                primaryColor: '#8B4513',
                secondaryColor: '#A0522D',
                decorations: 'postcard-elements'
            },
            polaroid: {
                type: 'polaroid',
                background: '#FAFAFA',
                frame: true,
                fontFamily: 'Caveat, cursive',
                primaryColor: '#333333',
                secondaryColor: '#666666',
                decorations: 'polaroid-frame'
            },
            
            // NATURE TEMPLATES
            forest: {
                type: 'nature-scene',
                scene: 'forest',
                colors: ['#228B22', '#006400', '#2E8B57', '#3CB371'],
                atmosphere: 'misty',
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: '#E0FFE0',
                decorations: 'forest-elements'
            },
            river: {
                type: 'nature-scene',
                scene: 'river',
                colors: ['#4682B4', '#5F9EA0', '#87CEEB', '#B0E0E6'],
                flow: true,
                fontFamily: 'Dancing Script, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#E0FFFF',
                decorations: 'water-ripples'
            },
            mountains: {
                type: 'nature-scene',
                scene: 'mountains',
                layers: ['#8B7D7B', '#A0A0A0', '#C0C0C0', '#E0E0E0'],
                snowCaps: true,
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#ffffff',
                secondaryColor: '#F0F8FF',
                decorations: 'mountain-peaks'
            },
            sunset: {
                type: 'nature-scene',
                scene: 'sunset',
                gradient: ['#FF512F', '#F09819', '#FDB813', '#FFE5B4'],
                sun: true,
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: '#FFF0E0',
                decorations: 'sunset-silhouette'
            },
            ocean: {
                type: 'nature-scene',
                scene: 'ocean',
                waves: ['#006994', '#0099CC', '#00BFFF', '#87CEEB'],
                horizon: true,
                fontFamily: 'Dancing Script, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#F0FFFF',
                decorations: 'ocean-waves'
            },
            desert: {
                type: 'nature-scene',
                scene: 'desert',
                gradient: ['#EDC9AF', '#F4A460', '#CD853F', '#8B7355'],
                dunes: true,
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#FFF8DC',
                decorations: 'desert-dunes'
            },
            
            // SPACE THEMES
            galaxy: {
                type: 'space',
                background: '#000428',
                stars: true,
                nebula: ['#004e92', '#6B46C1', '#9B59B6'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: '#E0E0FF',
                decorations: 'space-stars'
            },
            cosmos: {
                type: 'space',
                background: '#0F0C29',
                gradient: ['#24243e', '#302b63', '#0f0c29'],
                planets: true,
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#00ffff',
                secondaryColor: '#ff00ff',
                decorations: 'cosmic-elements'
            },
            aurora: {
                type: 'space',
                scene: 'aurora',
                colors: ['#00C9FF', '#92FE9D', '#FC466B', '#3F5EFB'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: '#E0FFE0',
                decorations: 'aurora-lights'
            },
            
            // BUTTERFLY & NATURE PATTERNS
            butterflies: {
                type: 'pattern',
                pattern: 'butterflies',
                background: '#FFF0F5',
                colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493'],
                fontFamily: 'Dancing Script, cursive',
                primaryColor: '#8B008B',
                secondaryColor: '#9370DB',
                decorations: 'butterfly-pattern'
            },
            flowers: {
                type: 'pattern',
                pattern: 'flowers',
                background: '#FFFAF0',
                colors: ['#FF69B4', '#FF1493', '#C71585', '#DB7093'],
                fontFamily: 'Caveat, cursive',
                primaryColor: '#8B008B',
                secondaryColor: '#9370DB',
                decorations: 'floral-pattern'
            },
            leaves: {
                type: 'pattern',
                pattern: 'leaves',
                gradient: ['#a8e6cf', '#dcedc1', '#b7e4c7'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#2d5016',
                secondaryColor: '#3d6526',
                decorations: 'leaf-pattern'
            },
            
            // POSTCARD LOCATIONS
            paris: {
                type: 'postcard',
                location: 'paris',
                landmark: 'eiffel-tower',
                colors: ['#E6E6FA', '#DDA0DD', '#D8BFD8'],
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#4B0082',
                secondaryColor: '#8B008B',
                decorations: 'paris-elements'
            },
            tokyo: {
                type: 'postcard',
                location: 'tokyo',
                elements: ['sakura', 'mount-fuji'],
                gradient: ['#FFB6C1', '#FFC0CB', '#FFDAB9'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#8B0000',
                secondaryColor: '#DC143C',
                decorations: 'japanese-elements'
            },
            newyork: {
                type: 'postcard',
                location: 'newyork',
                skyline: true,
                colors: ['#4169E1', '#1E90FF', '#00BFFF'],
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#F0F8FF',
                decorations: 'nyc-skyline'
            },
            beach: {
                type: 'postcard',
                location: 'tropical-beach',
                elements: ['palm', 'waves', 'sun'],
                gradient: ['#00b894', '#00cec9', '#81ecec'],
                fontFamily: 'Caveat, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#ffeaa7',
                decorations: 'beach-elements'
            },
            
            // MODERN ARTISTIC
            geometric: {
                type: 'modern',
                pattern: 'geometric',
                colors: ['#6C5CE7', '#A29BFE', '#74B9FF', '#A29BFE'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: '#FFEAA7',
                decorations: 'geometric-modern'
            },
            memphis: {
                type: 'modern',
                style: 'memphis',
                background: '#FFE5E5',
                shapes: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#2D3436',
                secondaryColor: '#636E72',
                decorations: 'memphis-shapes'
            },
            minimalistGold: {
                type: 'modern',
                background: '#FFFFFF',
                accent: '#FFD700',
                lines: 'thin',
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#FFD700',
                secondaryColor: '#F0E68C',
                decorations: 'gold-lines'
            },
            neonCity: {
                type: 'modern',
                theme: 'cyberpunk',
                gradient: ['#0F0C29', '#24243e', '#302b63'],
                neonColors: ['#00ffff', '#ff00ff', '#ffff00'],
                fontFamily: 'Bebas Neue, cursive',
                primaryColor: '#00ffff',
                secondaryColor: '#ff00ff',
                decorations: 'neon-grid'
            },
            
            // SEASONAL ENHANCED
            autumn: {
                type: 'seasonal',
                season: 'autumn',
                gradient: ['#D2691E', '#FF8C00', '#FF7F50', '#FFD700'],
                leaves: true,
                fontFamily: 'Playfair Display, serif',
                primaryColor: '#8B4513',
                secondaryColor: '#A0522D',
                decorations: 'autumn-leaves'
            },
            winter: {
                type: 'seasonal',
                season: 'winter',
                background: '#F0F8FF',
                snowflakes: true,
                colors: ['#B0E0E6', '#ADD8E6', '#87CEEB'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#4682B4',
                secondaryColor: '#5F9EA0',
                decorations: 'winter-snow'
            },
            spring: {
                type: 'seasonal',
                season: 'spring',
                gradient: ['#FFE5E5', '#FFE5F1', '#E5FFE5', '#E5F1FF'],
                blossoms: true,
                fontFamily: 'Dancing Script, cursive',
                primaryColor: '#FF69B4',
                secondaryColor: '#FFB6C1',
                decorations: 'spring-blossoms'
            },
            
            // Keep some original templates for compatibility
            romantic: {
                gradient: ['#ff6b9d', '#c44569'],
                fontFamily: 'Dancing Script, cursive',
                primaryColor: '#ffffff',
                secondaryColor: '#ffe0ec',
                decorations: 'floral'
            },
            professional: {
                gradient: ['#2d3748', '#4a5568'],
                fontFamily: 'Inter, sans-serif',
                primaryColor: '#ffffff',
                secondaryColor: '#e2e8f0',
                decorations: 'none'
            }
        };
    }
    
    renderCard(canvas, options) {
        if (!this.isCanvasSupported) {
            console.error('Canvas is not supported in this browser');
            throw new Error('Your browser does not support canvas. Please use a modern browser.');
        }
        
        if (!canvas) {
            console.error('Canvas element not provided');
            throw new Error('Canvas element is required');
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get canvas context');
            throw new Error('Failed to get canvas context');
        }
        
        try {
            // Enable high-quality rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            const { message, template, recipient, occasion } = options;
            const templateData = this.templates[template] || this.templates.modern;
            
            // Set canvas size (Full HD portrait)
            canvas.width = 1080;
            canvas.height = 1620;
            
            // Clear canvas with error handling
            try {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } catch (clearError) {
                console.warn('Failed to clear canvas, continuing:', clearError);
            }
            
            // Draw background
            this.drawBackground(ctx, templateData, canvas.width, canvas.height);
            
            // Draw decorations
            this.drawDecorations(ctx, templateData, canvas.width, canvas.height, occasion);
            
            // Draw text with error handling
            try {
                this.drawText(ctx, message, templateData, canvas.width, canvas.height, recipient);
            } catch (textError) {
                console.error('Failed to draw text:', textError);
                // Fallback to simple text rendering
                this.drawSimpleText(ctx, message, canvas.width, canvas.height);
            }
            
            // Add watermark
            this.addWatermark(ctx, canvas.width, canvas.height);
            
        } catch (error) {
            console.error('Error rendering card:', error);
            // Try to render a simple fallback card
            this.renderFallbackCard(ctx, canvas.width, canvas.height, options.message);
            throw error;
        }
    }
    
    renderFallbackCard(ctx, width, height, message) {
        try {
            // Simple gradient background
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#8b5cf6');
            gradient.addColorStop(1, '#ec4899');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Simple text
            ctx.fillStyle = '#ffffff';
            ctx.font = '48px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(message || 'Your Card', width / 2, height / 2);
        } catch (fallbackError) {
            console.error('Even fallback rendering failed:', fallbackError);
        }
    }
    
    drawSimpleText(ctx, message, width, height) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const padding = 40;
        const maxWidth = width - (padding * 2);
        const maxHeight = height * 0.6;
        
        // Start with a base font size and adjust down if needed
        let fontSize = 48;
        let lines = [];
        let totalTextHeight = 0;
        let attempts = 0;
        const maxAttempts = 20;
        
        // Find the optimal font size
        while (attempts < maxAttempts) {
            ctx.font = `${fontSize}px sans-serif`;
            
            // Word wrap with current font size
            lines = this.wrapText(ctx, message, maxWidth);
            
            // Calculate total height needed
            const lineHeight = fontSize * 1.4;
            totalTextHeight = lines.length * lineHeight;
            
            // Check if text fits within bounds
            if (totalTextHeight <= maxHeight && this.checkLinesWidth(ctx, lines, maxWidth)) {
                break; // Text fits!
            }
            
            // Reduce font size and try again
            fontSize = Math.floor(fontSize * 0.9);
            attempts++;
            
            // Minimum font size limit
            if (fontSize < 12) {
                fontSize = 12;
                break;
            }
        }
        
        // Apply the final font size
        ctx.font = `${fontSize}px sans-serif`;
        
        // Re-wrap text with final font size
        lines = this.wrapText(ctx, message, maxWidth);
        
        // Draw message lines centered vertically
        const lineHeight = fontSize * 1.4;
        const startY = (height / 2) - (lines.length * lineHeight) / 2 + fontSize / 2;
        
        lines.forEach((line, index) => {
            ctx.fillText(line, width / 2, startY + (index * lineHeight));
        });
    }
    
    addDecorations(ctx, type, width, height, style) {
        switch(type) {
            case 'geometric':
                this.addGeometricShapes(ctx, width, height);
                break;
            case 'ornamental':
                this.addOrnamentalDesigns(ctx, width, height);
                break;
            case 'floral':
                this.addFloralElements(ctx, width, height);
                break;
        }
    }
    
    addGeometricShapes(ctx, width, height) {
        const scale = width / 300; // Scale based on HD width
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        
        // Circles
        ctx.beginPath();
        ctx.arc(50 * scale, 100 * scale, 30 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(width - (60 * scale), height - (150 * scale), 40 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(width / 2, 150 * scale, 20 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Triangles
        ctx.beginPath();
        ctx.moveTo(width - (50 * scale), 80 * scale);
        ctx.lineTo(width - (30 * scale), 120 * scale);
        ctx.lineTo(width - (70 * scale), 120 * scale);
        ctx.closePath();
        ctx.fill();
    }
    
    addOrnamentalDesigns(ctx, width, height) {
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        
        // Corner flourishes
        const corners = [
            { x: 30, y: 30 },
            { x: width - 30, y: 30 },
            { x: 30, y: height - 30 },
            { x: width - 30, y: height - 30 }
        ];
        
        corners.forEach(corner => {
            ctx.beginPath();
            ctx.moveTo(corner.x, corner.y);
            
            if (corner.x < width / 2) {
                ctx.quadraticCurveTo(corner.x + 20, corner.y, corner.x + 20, corner.y + (corner.y < height / 2 ? 20 : -20));
            } else {
                ctx.quadraticCurveTo(corner.x - 20, corner.y, corner.x - 20, corner.y + (corner.y < height / 2 ? 20 : -20));
            }
            ctx.stroke();
        });
    }
    
    addFloralElements(ctx, width, height) {
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        
        // Leaf shapes
        const leaves = [
            { x: 60, y: 120 },
            { x: width - 80, y: height - 200 },
            { x: 100, y: height - 150 }
        ];
        
        leaves.forEach(leaf => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(Math.random() * Math.PI);
            ctx.beginPath();
            ctx.ellipse(0, 0, 20, 35, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    
    addOccasionIcon(ctx, occasion, width) {
        const icons = {
            birthday: '🎂',
            love: '❤️',
            thanks: '🙏',
            congrats: '🎉',
            graduation: '🎓',
            holiday: '🎄'
        };
        
        const icon = icons[occasion] || '✨';
        
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(icon, width / 2, 100);
    }
    
    drawBackground(ctx, templateData, width, height) {
        // Handle different background types
        if (templateData.type) {
            switch (templateData.type) {
                case 'watercolor':
                    this.drawWatercolorBackground(ctx, templateData, width, height);
                    break;
                case 'oil-painting':
                    this.drawOilPaintingBackground(ctx, templateData, width, height);
                    break;
                case 'sketch':
                    this.drawSketchBackground(ctx, templateData, width, height);
                    break;
                case 'abstract':
                    this.drawAbstractBackground(ctx, templateData, width, height);
                    break;
                case 'retro-pattern':
                    this.drawRetroPattern(ctx, templateData, width, height);
                    break;
                case 'art-deco':
                    this.drawArtDecoBackground(ctx, templateData, width, height);
                    break;
                case 'vintage-postcard':
                    this.drawVintagePostcardBackground(ctx, templateData, width, height);
                    break;
                case 'polaroid':
                    this.drawPolaroidBackground(ctx, templateData, width, height);
                    break;
                case 'nature-scene':
                    this.drawNatureScene(ctx, templateData, width, height);
                    break;
                case 'space':
                    this.drawSpaceBackground(ctx, templateData, width, height);
                    break;
                case 'pattern':
                    this.drawPatternBackground(ctx, templateData, width, height);
                    break;
                case 'postcard':
                    this.drawPostcardBackground(ctx, templateData, width, height);
                    break;
                case 'modern':
                    this.drawModernBackground(ctx, templateData, width, height);
                    break;
                case 'seasonal':
                    this.drawSeasonalBackground(ctx, templateData, width, height);
                    break;
                default:
                    this.drawGradientBackground(ctx, templateData, width, height);
            }
        } else if (templateData.gradient) {
            this.drawGradientBackground(ctx, templateData, width, height);
        } else if (templateData.background) {
            ctx.fillStyle = templateData.background;
            ctx.fillRect(0, 0, width, height);
            
            if (templateData.border) {
                ctx.strokeStyle = '#dfe6e9';
                ctx.lineWidth = 3;
                ctx.strokeRect(15, 15, width - 30, height - 30);
            }
        }
    }
    
    drawGradientBackground(ctx, templateData, width, height) {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        if (templateData.gradient) {
            templateData.gradient.forEach((color, index) => {
                gradient.addColorStop(index / (templateData.gradient.length - 1), color);
            });
        } else {
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }
    
    drawWatercolorBackground(ctx, templateData, width, height) {
        // Create soft watercolor effect
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        templateData.colors.forEach((color, index) => {
            ctx.globalAlpha = 0.15;
            ctx.fillStyle = color;
            
            // Create organic watercolor shapes
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = 200 + Math.random() * 300;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        });
        
        ctx.globalAlpha = 1;
    }
    
    drawOilPaintingBackground(ctx, templateData, width, height) {
        // Base color
        ctx.fillStyle = templateData.baseColor;
        ctx.fillRect(0, 0, width, height);
        
        // Add textured brush strokes
        templateData.accentColors.forEach((color, index) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 15 + Math.random() * 20;
            ctx.globalAlpha = 0.6;
            
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                const startX = Math.random() * width;
                const startY = Math.random() * height;
                const endX = startX + (Math.random() - 0.5) * 200;
                const endY = startY + (Math.random() - 0.5) * 200;
                
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(
                    (startX + endX) / 2 + (Math.random() - 0.5) * 50,
                    (startY + endY) / 2 + (Math.random() - 0.5) * 50,
                    endX, endY
                );
                ctx.stroke();
            }
        });
        
        ctx.globalAlpha = 1;
    }
    
    drawSketchBackground(ctx, templateData, width, height) {
        // Paper texture
        ctx.fillStyle = templateData.background;
        ctx.fillRect(0, 0, width, height);
        
        // Add sketch lines
        ctx.strokeStyle = templateData.strokeColor;
        ctx.globalAlpha = 0.1;
        
        for (let i = 0; i < 100; i++) {
            ctx.lineWidth = 0.5 + Math.random() * 1.5;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawAbstractBackground(ctx, templateData, width, height) {
        // White base
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        // Draw abstract shapes
        templateData.colors.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.7;
            
            const shapeType = templateData.shapes[index % templateData.shapes.length];
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 100 + Math.random() * 200;
            
            ctx.beginPath();
            if (shapeType === 'circle') {
                ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            } else if (shapeType === 'triangle') {
                ctx.moveTo(x, y - size / 2);
                ctx.lineTo(x - size / 2, y + size / 2);
                ctx.lineTo(x + size / 2, y + size / 2);
                ctx.closePath();
            } else {
                // Organic shape
                ctx.moveTo(x, y);
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2;
                    const radius = size / 2 + Math.random() * size / 4;
                    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
                }
                ctx.closePath();
            }
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
    }
    
    drawNatureScene(ctx, templateData, width, height) {
        switch (templateData.scene) {
            case 'forest':
                this.drawForestScene(ctx, templateData, width, height);
                break;
            case 'river':
                this.drawRiverScene(ctx, templateData, width, height);
                break;
            case 'mountains':
                this.drawMountainScene(ctx, templateData, width, height);
                break;
            case 'sunset':
                this.drawSunsetScene(ctx, templateData, width, height);
                break;
            case 'ocean':
                this.drawOceanScene(ctx, templateData, width, height);
                break;
            case 'desert':
                this.drawDesertScene(ctx, templateData, width, height);
                break;
            case 'aurora':
                this.drawAuroraScene(ctx, templateData, width, height);
                break;
        }
    }
    
    drawForestScene(ctx, templateData, width, height) {
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height / 2);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#98D8C8');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, width, height / 2);
        
        // Forest layers
        templateData.colors.forEach((color, index) => {
            const layerHeight = height * (0.3 + index * 0.1);
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.8 - index * 0.1;
            
            // Draw tree silhouettes
            for (let x = -50; x < width + 50; x += 40 + Math.random() * 60) {
                const treeHeight = 150 + Math.random() * 200;
                ctx.beginPath();
                ctx.moveTo(x, height);
                ctx.lineTo(x - 20, height - treeHeight);
                ctx.lineTo(x, height - treeHeight - 50);
                ctx.lineTo(x + 20, height - treeHeight);
                ctx.lineTo(x, height);
                ctx.fill();
            }
        });
        
        // Add mist if specified
        if (templateData.atmosphere === 'misty') {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, height * 0.7, width, height * 0.3);
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawMountainScene(ctx, templateData, width, height) {
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#FFE5B4');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Mountain layers
        templateData.layers.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, height);
            
            const peaks = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i <= peaks; i++) {
                const x = (width / peaks) * i;
                const y = height * (0.3 + index * 0.1) - Math.random() * 100;
                if (i === 0) {
                    ctx.lineTo(x, y);
                } else {
                    const cp1x = x - width / peaks / 2;
                    const cp1y = y + 50;
                    ctx.quadraticCurveTo(cp1x, cp1y, x, y);
                }
            }
            
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
            
            // Snow caps
            if (templateData.snowCaps && index < 2) {
                ctx.fillStyle = '#FFFFFF';
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                const peakY = height * (0.3 + index * 0.1) - 150;
                ctx.moveTo(width * 0.3, peakY);
                ctx.lineTo(width * 0.5, peakY - 50);
                ctx.lineTo(width * 0.7, peakY);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        });
    }
    
    drawSunsetScene(ctx, templateData, width, height) {
        // Sunset gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        templateData.gradient.forEach((color, index) => {
            gradient.addColorStop(index / (templateData.gradient.length - 1), color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw sun
        if (templateData.sun) {
            const sunY = height * 0.6;
            const sunRadius = 80;
            
            ctx.fillStyle = '#FFD700';
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(width / 2, sunY, sunRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Sun glow
            const glowGradient = ctx.createRadialGradient(width / 2, sunY, sunRadius, width / 2, sunY, sunRadius * 2);
            glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
            glowGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGradient;
            ctx.fillRect(0, 0, width, height);
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawSpaceBackground(ctx, templateData, width, height) {
        // Dark space background
        if (templateData.gradient) {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            templateData.gradient.forEach((color, index) => {
                gradient.addColorStop(index / (templateData.gradient.length - 1), color);
            });
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = templateData.background || '#000428';
        }
        ctx.fillRect(0, 0, width, height);
        
        // Add stars
        if (templateData.stars) {
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 200; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 2;
                ctx.globalAlpha = 0.3 + Math.random() * 0.7;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Add nebula
        if (templateData.nebula) {
            templateData.nebula.forEach((color, index) => {
                ctx.globalAlpha = 0.2;
                const gradient = ctx.createRadialGradient(
                    width * (0.3 + index * 0.2),
                    height * (0.3 + index * 0.2),
                    0,
                    width * (0.3 + index * 0.2),
                    height * (0.3 + index * 0.2),
                    300
                );
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawPatternBackground(ctx, templateData, width, height) {
        // Base background
        ctx.fillStyle = templateData.background || '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        switch (templateData.pattern) {
            case 'butterflies':
                this.drawButterflyPattern(ctx, templateData, width, height);
                break;
            case 'flowers':
                this.drawFlowerPattern(ctx, templateData, width, height);
                break;
            case 'leaves':
                this.drawLeafPattern(ctx, templateData, width, height);
                break;
            case 'geometric':
                this.drawGeometricPattern(ctx, templateData, width, height);
                break;
        }
    }
    
    drawButterflyPattern(ctx, templateData, width, height) {
        const colors = templateData.colors;
        
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 30 + Math.random() * 40;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.6;
            
            // Butterfly wings (simplified)
            ctx.beginPath();
            ctx.ellipse(x - size / 2, y, size / 2, size / 3, Math.PI / 6, 0, Math.PI * 2);
            ctx.ellipse(x + size / 2, y, size / 2, size / 3, -Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawPostcardBackground(ctx, templateData, width, height) {
        // Base gradient or color
        if (templateData.gradient) {
            this.drawGradientBackground(ctx, templateData, width, height);
        } else if (templateData.colors) {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            templateData.colors.forEach((color, index) => {
                gradient.addColorStop(index / (templateData.colors.length - 1), color);
            });
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }
        
        // Add location-specific elements
        switch (templateData.location) {
            case 'paris':
                this.drawEiffelTower(ctx, width, height);
                break;
            case 'tokyo':
                this.drawMountFuji(ctx, width, height);
                break;
            case 'newyork':
                this.drawNYCSkyline(ctx, width, height);
                break;
            case 'tropical-beach':
                this.drawBeachElements(ctx, width, height);
                break;
        }
        
        // Vintage postcard border
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, width - 40, height - 40);
    }
    
    drawModernBackground(ctx, templateData, width, height) {
        // Base
        ctx.fillStyle = templateData.background || '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        if (templateData.style === 'memphis') {
            // Memphis style shapes
            templateData.shapes.forEach((color, index) => {
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.8;
                
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = 50 + Math.random() * 100;
                
                // Random shape
                const shapeType = Math.floor(Math.random() * 3);
                ctx.beginPath();
                if (shapeType === 0) {
                    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                } else if (shapeType === 1) {
                    ctx.rect(x - size / 2, y - size / 2, size, size);
                } else {
                    ctx.moveTo(x, y - size / 2);
                    ctx.lineTo(x - size / 2, y + size / 2);
                    ctx.lineTo(x + size / 2, y + size / 2);
                    ctx.closePath();
                }
                ctx.fill();
            });
        } else if (templateData.pattern === 'geometric') {
            // Geometric pattern
            this.drawGeometricPattern(ctx, templateData, width, height);
        } else if (templateData.theme === 'cyberpunk') {
            // Neon grid
            this.drawNeonGrid(ctx, templateData, width, height);
        }
        
        ctx.globalAlpha = 1;
    }
    
    // Helper methods for specific elements
    drawEiffelTower(ctx, width, height) {
        ctx.strokeStyle = 'rgba(75, 0, 130, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Simplified Eiffel Tower silhouette
        const centerX = width / 2;
        const baseY = height * 0.8;
        ctx.moveTo(centerX, height * 0.2);
        ctx.lineTo(centerX - 100, baseY);
        ctx.moveTo(centerX, height * 0.2);
        ctx.lineTo(centerX + 100, baseY);
        ctx.moveTo(centerX - 60, height * 0.5);
        ctx.lineTo(centerX + 60, height * 0.5);
        ctx.stroke();
    }
    
    drawMountFuji(ctx, width, height) {
        ctx.fillStyle = 'rgba(139, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.moveTo(width * 0.2, height * 0.8);
        ctx.lineTo(width * 0.5, height * 0.4);
        ctx.lineTo(width * 0.8, height * 0.8);
        ctx.closePath();
        ctx.fill();
        
        // Snow cap
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(width * 0.4, height * 0.5);
        ctx.lineTo(width * 0.5, height * 0.4);
        ctx.lineTo(width * 0.6, height * 0.5);
        ctx.closePath();
        ctx.fill();
    }
    
    drawNeonGrid(ctx, templateData, width, height) {
        ctx.strokeStyle = templateData.neonColors[0];
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.5;
        
        // Grid lines
        const gridSize = 50;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawRetroPattern(ctx, templateData, width, height) {
        // Groovy circles pattern
        if (templateData.pattern === 'groovy') {
            templateData.colors.forEach((color, index) => {
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.7;
                
                for (let i = 0; i < 10; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    const radius = 30 + Math.random() * 70;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }
        ctx.globalAlpha = 1;
    }
    
    drawArtDecoBackground(ctx, templateData, width, height) {
        // Dark background
        ctx.fillStyle = templateData.background;
        ctx.fillRect(0, 0, width, height);
        
        // Gold art deco patterns
        ctx.strokeStyle = templateData.goldAccent;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        
        // Fan patterns
        const fanCount = 5;
        for (let i = 0; i < fanCount; i++) {
            const x = (width / fanCount) * i + width / fanCount / 2;
            const y = height * 0.2;
            const radius = 100;
            
            for (let angle = 0; angle < Math.PI; angle += Math.PI / 8) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
                ctx.stroke();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawVintagePostcardBackground(ctx, templateData, width, height) {
        // Aged paper effect
        ctx.fillStyle = templateData.background;
        ctx.fillRect(0, 0, width, height);
        
        // Add vintage texture
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < 1000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#8B7355' : '#A0522D';
            ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
        }
        
        // Postcard border
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 8;
        ctx.setLineDash([20, 10]);
        ctx.strokeRect(30, 30, width - 60, height - 60);
        ctx.setLineDash([]);
        
        // Stamp area
        if (templateData.stampPosition === 'top-right') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(width - 150, 50, 100, 120);
            ctx.strokeStyle = '#DC143C';
            ctx.lineWidth = 3;
            ctx.strokeRect(width - 150, 50, 100, 120);
        }
    }
    
    drawPolaroidBackground(ctx, templateData, width, height) {
        // White polaroid frame
        ctx.fillStyle = '#FAFAFA';
        ctx.fillRect(0, 0, width, height);
        
        // Photo area (darker)
        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(50, 50, width - 100, height - 200);
        
        // Shadow effect
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(40, 40, width - 80, height - 180);
        ctx.shadowColor = 'transparent';
    }
    
    drawOceanScene(ctx, templateData, width, height) {
        // Sky
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height / 2);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#98D8C8');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, width, height / 2);
        
        // Ocean waves
        if (templateData.waves) {
            templateData.waves.forEach((color, index) => {
                const waveY = height / 2 + index * 50;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(0, waveY);
                
                for (let x = 0; x <= width; x += 20) {
                    const y = waveY + Math.sin(x * 0.01 + index) * 20;
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fill();
            });
        }
        
        // Horizon line
        if (templateData.horizon) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();
        }
    }
    
    drawRiverScene(ctx, templateData, width, height) {
        // Sky and landscape
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.4, '#98D8C8');
        gradient.addColorStop(1, '#4682B4');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // River flow
        if (templateData.flow && templateData.colors) {
            ctx.globalAlpha = 0.7;
            const riverWidth = width * 0.4;
            const riverX = (width - riverWidth) / 2;
            
            // Create flowing river effect
            const riverGradient = ctx.createLinearGradient(riverX, 0, riverX + riverWidth, height);
            templateData.colors.forEach((color, index) => {
                riverGradient.addColorStop(index / (templateData.colors.length - 1), color);
            });
            
            ctx.fillStyle = riverGradient;
            ctx.beginPath();
            ctx.moveTo(riverX + riverWidth / 2, 0);
            
            for (let y = 0; y <= height; y += 50) {
                const offset = Math.sin(y * 0.01) * 30;
                ctx.lineTo(riverX + riverWidth / 2 + offset, y);
            }
            
            ctx.lineTo(riverX + riverWidth, height);
            ctx.lineTo(riverX, height);
            
            for (let y = height; y >= 0; y -= 50) {
                const offset = Math.sin(y * 0.01) * 30;
                ctx.lineTo(riverX + offset, y);
            }
            
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawDesertScene(ctx, templateData, width, height) {
        // Desert gradient
        if (templateData.gradient) {
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            templateData.gradient.forEach((color, index) => {
                gradient.addColorStop(index / (templateData.gradient.length - 1), color);
            });
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }
        
        // Sand dunes
        if (templateData.dunes) {
            ctx.fillStyle = '#CD853F';
            ctx.globalAlpha = 0.8;
            
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                const duneY = height * (0.6 + i * 0.15);
                ctx.moveTo(0, height);
                
                for (let x = 0; x <= width; x += 50) {
                    const y = duneY + Math.sin(x * 0.005 + i) * 40;
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(width, height);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawAuroraScene(ctx, templateData, width, height) {
        // Dark night sky
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#000428');
        gradient.addColorStop(1, '#004e92');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Aurora lights
        if (templateData.colors) {
            templateData.colors.forEach((color, index) => {
                ctx.globalAlpha = 0.3;
                const auroraGradient = ctx.createLinearGradient(0, 0, width, height / 2);
                auroraGradient.addColorStop(0, 'transparent');
                auroraGradient.addColorStop(0.5, color);
                auroraGradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = auroraGradient;
                ctx.beginPath();
                ctx.moveTo(0, height * 0.2);
                
                for (let x = 0; x <= width; x += 30) {
                    const y = height * 0.3 + Math.sin(x * 0.01 + index) * 100;
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(width, 0);
                ctx.lineTo(0, 0);
                ctx.closePath();
                ctx.fill();
            });
        }
        
        // Stars
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 1;
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height * 0.5;
            const size = Math.random() * 2;
            ctx.globalAlpha = 0.5 + Math.random() * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawSeasonalBackground(ctx, templateData, width, height) {
        switch (templateData.season) {
            case 'autumn':
                this.drawAutumnBackground(ctx, templateData, width, height);
                break;
            case 'winter':
                this.drawWinterBackground(ctx, templateData, width, height);
                break;
            case 'spring':
                this.drawSpringBackground(ctx, templateData, width, height);
                break;
            default:
                this.drawGradientBackground(ctx, templateData, width, height);
        }
    }
    
    drawAutumnBackground(ctx, templateData, width, height) {
        // Autumn gradient
        if (templateData.gradient) {
            this.drawGradientBackground(ctx, templateData, width, height);
        }
        
        // Falling leaves
        if (templateData.leaves) {
            const leafColors = ['#D2691E', '#FF8C00', '#FF7F50', '#8B4513'];
            
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = 20 + Math.random() * 30;
                const rotation = Math.random() * Math.PI * 2;
                const color = leafColors[Math.floor(Math.random() * leafColors.length)];
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.7;
                
                // Leaf shape
                ctx.beginPath();
                ctx.ellipse(0, 0, size / 2, size, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawWinterBackground(ctx, templateData, width, height) {
        // Winter sky
        ctx.fillStyle = templateData.background || '#F0F8FF';
        ctx.fillRect(0, 0, width, height);
        
        // Snowflakes
        if (templateData.snowflakes) {
            ctx.fillStyle = '#FFFFFF';
            
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = 2 + Math.random() * 4;
                
                ctx.globalAlpha = 0.4 + Math.random() * 0.6;
                ctx.beginPath();
                
                // Snowflake pattern
                for (let j = 0; j < 6; j++) {
                    const angle = (j / 6) * Math.PI * 2;
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
                }
                
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawSpringBackground(ctx, templateData, width, height) {
        // Spring gradient
        if (templateData.gradient) {
            this.drawGradientBackground(ctx, templateData, width, height);
        }
        
        // Cherry blossoms
        if (templateData.blossoms) {
            const blossomColors = ['#FFB6C1', '#FFC0CB', '#FF69B4'];
            
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = 15 + Math.random() * 20;
                const color = blossomColors[Math.floor(Math.random() * blossomColors.length)];
                
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.6;
                
                // 5-petal flower
                for (let j = 0; j < 5; j++) {
                    const angle = (j / 5) * Math.PI * 2;
                    ctx.beginPath();
                    ctx.ellipse(
                        x + Math.cos(angle) * size / 3,
                        y + Math.sin(angle) * size / 3,
                        size / 3, size / 2,
                        angle,
                        0, Math.PI * 2
                    );
                    ctx.fill();
                }
                
                // Center
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(x, y, size / 6, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawFlowerPattern(ctx, templateData, width, height) {
        const colors = templateData.colors;
        
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 30 + Math.random() * 40;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const petals = 5 + Math.floor(Math.random() * 3);
            
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.5;
            
            // Draw flower petals
            for (let j = 0; j < petals; j++) {
                const angle = (j / petals) * Math.PI * 2;
                ctx.beginPath();
                ctx.ellipse(
                    x + Math.cos(angle) * size / 3,
                    y + Math.sin(angle) * size / 3,
                    size / 3, size / 2,
                    angle,
                    0, Math.PI * 2
                );
                ctx.fill();
            }
            
            // Flower center
            ctx.fillStyle = '#FFD700';
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(x, y, size / 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawLeafPattern(ctx, templateData, width, height) {
        // Base gradient
        if (templateData.gradient) {
            this.drawGradientBackground(ctx, templateData, width, height);
        }
        
        // Leaf shapes
        const leafColors = ['#228B22', '#3CB371', '#2E8B57', '#006400'];
        
        for (let i = 0; i < 25; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 30 + Math.random() * 50;
            const rotation = Math.random() * Math.PI * 2;
            const color = leafColors[Math.floor(Math.random() * leafColors.length)];
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.4;
            
            // Leaf shape
            ctx.beginPath();
            ctx.ellipse(0, 0, size / 3, size, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Leaf vein
            ctx.strokeStyle = 'rgba(0, 100, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(0, size);
            ctx.stroke();
            
            ctx.restore();
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawGeometricPattern(ctx, templateData, width, height) {
        const colors = templateData.colors;
        
        // Create geometric pattern
        const patternSize = 60;
        for (let x = 0; x < width; x += patternSize) {
            for (let y = 0; y < height; y += patternSize) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.3;
                
                const shapeType = Math.floor(Math.random() * 4);
                ctx.beginPath();
                
                switch (shapeType) {
                    case 0: // Circle
                        ctx.arc(x + patternSize / 2, y + patternSize / 2, patternSize / 3, 0, Math.PI * 2);
                        break;
                    case 1: // Square
                        ctx.rect(x + patternSize / 4, y + patternSize / 4, patternSize / 2, patternSize / 2);
                        break;
                    case 2: // Triangle
                        ctx.moveTo(x + patternSize / 2, y + patternSize / 4);
                        ctx.lineTo(x + patternSize / 4, y + patternSize * 3 / 4);
                        ctx.lineTo(x + patternSize * 3 / 4, y + patternSize * 3 / 4);
                        ctx.closePath();
                        break;
                    case 3: // Diamond
                        ctx.moveTo(x + patternSize / 2, y + patternSize / 4);
                        ctx.lineTo(x + patternSize * 3 / 4, y + patternSize / 2);
                        ctx.lineTo(x + patternSize / 2, y + patternSize * 3 / 4);
                        ctx.lineTo(x + patternSize / 4, y + patternSize / 2);
                        ctx.closePath();
                        break;
                }
                
                ctx.fill();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawBeachElements(ctx, width, height) {
        // Palm tree
        ctx.fillStyle = 'rgba(139, 69, 19, 0.4)';
        ctx.fillRect(width * 0.8, height * 0.5, 30, height * 0.3);
        
        // Palm leaves
        ctx.fillStyle = 'rgba(0, 128, 0, 0.4)';
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI - Math.PI / 2;
            ctx.beginPath();
            ctx.ellipse(
                width * 0.815 + Math.cos(angle) * 50,
                height * 0.5 + Math.sin(angle) * 30,
                60, 20,
                angle,
                0, Math.PI * 2
            );
            ctx.fill();
        }
        
        // Sun
        ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(width * 0.2, height * 0.2, 60, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawNYCSkyline(ctx, width, height) {
        ctx.fillStyle = 'rgba(65, 105, 225, 0.3)';
        
        // Simplified skyline
        const buildings = [
            { x: 0.1, w: 0.08, h: 0.5 },
            { x: 0.2, w: 0.06, h: 0.6 },
            { x: 0.3, w: 0.1, h: 0.7 },
            { x: 0.45, w: 0.05, h: 0.8 },
            { x: 0.55, w: 0.08, h: 0.65 },
            { x: 0.65, w: 0.07, h: 0.55 },
            { x: 0.75, w: 0.09, h: 0.6 },
            { x: 0.85, w: 0.06, h: 0.5 }
        ];
        
        buildings.forEach(building => {
            ctx.fillRect(
                width * building.x,
                height * (1 - building.h),
                width * building.w,
                height * building.h
            );
        });
    }
    
    drawDecorations(ctx, templateData, width, height, occasion) {
        if (templateData.decorations) {
            this.addDecorations(ctx, templateData.decorations, width, height, templateData);
        }
        
        // Add occasion icon
        if (occasion) {
            this.addOccasionIcon(ctx, occasion, width);
        }
    }
    
    drawText(ctx, message, templateData, width, height, recipient) {
        const scaleFactor = width / 300; // Scale based on original design width
        const padding = 40 * scaleFactor; // Padding from edges
        const maxWidth = width - (padding * 2);
        const maxHeight = height * 0.6; // Use 60% of card height for text
        
        // Calculate starting Y position - will be adjusted if recipient exists
        let textStartY = height * 0.2; // Start at 20% from top
        
        // Draw recipient if provided
        if (recipient) {
            ctx.fillStyle = templateData.secondaryColor || '#ffffff';
            const recipientFontSize = Math.floor(24 * scaleFactor);
            ctx.font = `italic ${recipientFontSize}px ${templateData.fontFamily || 'Inter, sans-serif'}`;
            ctx.textAlign = 'center';
            
            // Position recipient at the top of the text area
            const recipientY = textStartY;
            ctx.fillText(`Dear ${recipient},`, width / 2, recipientY);
            
            // Adjust start position for main message
            textStartY = recipientY + (recipientFontSize * 2); // Add space after recipient
        }
        
        // Calculate dynamic font size for main message
        ctx.fillStyle = templateData.primaryColor || '#ffffff';
        ctx.textAlign = 'center';
        
        // Start with a base font size and adjust down if needed
        let fontSize = Math.floor(32 * scaleFactor);
        let lines = [];
        let totalTextHeight = 0;
        let attempts = 0;
        const maxAttempts = 20;
        
        // Calculate available height for message (accounting for recipient if present)
        const availableHeight = recipient ? maxHeight - (textStartY - height * 0.2) : maxHeight;
        
        // Find the optimal font size
        while (attempts < maxAttempts) {
            ctx.font = `bold ${fontSize}px ${templateData.fontFamily || 'Inter, sans-serif'}`;
            
            // Word wrap with current font size
            lines = this.wrapText(ctx, message, maxWidth);
            
            // Calculate total height needed
            const lineHeight = fontSize * 1.4;
            totalTextHeight = lines.length * lineHeight;
            
            // Check if text fits within bounds
            if (totalTextHeight <= availableHeight && this.checkLinesWidth(ctx, lines, maxWidth)) {
                break; // Text fits!
            }
            
            // Reduce font size and try again
            fontSize = Math.floor(fontSize * 0.9);
            attempts++;
            
            // Minimum font size limit
            if (fontSize < 14) {
                fontSize = 14;
                break;
            }
        }
        
        // Apply the final font size
        ctx.font = `bold ${fontSize}px ${templateData.fontFamily || 'Inter, sans-serif'}`;
        
        // Re-wrap text with final font size
        lines = this.wrapText(ctx, message, maxWidth);
        
        // Draw message lines
        const lineHeight = fontSize * 1.4;
        
        // If no recipient, center the message vertically
        // If recipient exists, position message below recipient
        let messageStartY;
        if (recipient) {
            messageStartY = textStartY + fontSize;
        } else {
            // Center vertically if no recipient
            messageStartY = (height / 2) - (lines.length * lineHeight) / 2 + fontSize / 2;
        }
        
        lines.forEach((line, index) => {
            ctx.fillText(line, width / 2, messageStartY + (index * lineHeight));
        });
    }
    
    // Helper method to wrap text
    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    }
    
    // Helper method to check if all lines fit within width
    checkLinesWidth(ctx, lines, maxWidth) {
        for (let line of lines) {
            if (ctx.measureText(line).width > maxWidth) {
                return false;
            }
        }
        return true;
    }
    
    addWatermark(ctx, width, height) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Created with Compliment Cards', width / 2, height - 40);
    }
        
    exportCard(canvas, format = 'png') {
        return canvas.toDataURL(`image/${format}`, 1.0);
    }
} 