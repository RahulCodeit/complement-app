// Templates Module - 30+ Premium Designs
export class Templates {
    constructor() {
        this.templates = this.loadTemplates();
    }
    
    loadTemplates() {
        return {
            // Birthday Templates
            birthday: {
                modern: {
                    name: 'Modern Birthday',
                    background: 'linear-gradient(135deg, #ff6b9d, #feca57)',
                    fonts: { primary: 'Inter', secondary: 'Dancing Script' },
                    colors: { primary: '#ffffff', secondary: '#fff5f5' },
                    decorations: ['confetti', 'balloons'],
                    premium: false
                },
                vintage: {
                    name: 'Vintage Celebration',
                    background: 'linear-gradient(135deg, #c44569, #f8b500)',
                    fonts: { primary: 'Playfair Display', secondary: 'Caveat' },
                    colors: { primary: '#2c2c54', secondary: '#40407a' },
                    decorations: ['retro-stars', 'vintage-frame'],
                    premium: true
                },
                minimal: {
                    name: 'Minimal Birthday',
                    background: '#ffffff',
                    fonts: { primary: 'Inter', secondary: 'Inter' },
                    colors: { primary: '#2d3436', secondary: '#636e72' },
                    decorations: ['simple-line'],
                    premium: false
                },
                kids: {
                    name: 'Kids Party',
                    background: 'linear-gradient(135deg, #fa709a, #fee140)',
                    fonts: { primary: 'Bebas Neue', secondary: 'Caveat' },
                    colors: { primary: '#ffffff', secondary: '#fff59d' },
                    decorations: ['cartoon-animals', 'rainbow'],
                    premium: true
                },
                milestone: {
                    name: 'Milestone Birthday',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    fonts: { primary: 'Playfair Display', secondary: 'Inter' },
                    colors: { primary: '#ffd700', secondary: '#ffffff' },
                    decorations: ['gold-numbers', 'sparkles'],
                    premium: true
                }
            },
            
            // Love & Romance Templates
            love: {
                romantic: {
                    name: 'Romantic Hearts',
                    background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                    fonts: { primary: 'Dancing Script', secondary: 'Inter' },
                    colors: { primary: '#ffffff', secondary: '#ffe0ec' },
                    decorations: ['hearts', 'roses'],
                    premium: false
                },
                anniversary: {
                    name: 'Anniversary Gold',
                    background: 'linear-gradient(135deg, #f8b500, #fceabb)',
                    fonts: { primary: 'Playfair Display', secondary: 'Inter' },
                    colors: { primary: '#2c2c54', secondary: '#40407a' },
                    decorations: ['gold-rings', 'champagne'],
                    premium: true
                },
                valentine: {
                    name: 'Valentine Special',
                    background: 'linear-gradient(135deg, #e63946, #f1faee)',
                    fonts: { primary: 'Caveat', secondary: 'Inter' },
                    colors: { primary: '#ffffff', secondary: '#ffcccb' },
                    decorations: ['cupid', 'love-letters'],
                    premium: true
                },
                wedding: {
                    name: 'Wedding Bells',
                    background: 'linear-gradient(135deg, #ffeaa7, #dfe6e9)',
                    fonts: { primary: 'Playfair Display', secondary: 'Dancing Script' },
                    colors: { primary: '#2d3436', secondary: '#636e72' },
                    decorations: ['wedding-bells', 'flowers'],
                    premium: true
                }
            },
            
            // Thank You Templates
            thanks: {
                grateful: {
                    name: 'Grateful Heart',
                    background: 'linear-gradient(135deg, #8ecae6, #219ebc)',
                    fonts: { primary: 'Inter', secondary: 'Caveat' },
                    colors: { primary: '#ffffff', secondary: '#e0f7fa' },
                    decorations: ['thank-you-banner'],
                    premium: false
                },
                professional: {
                    name: 'Professional Thanks',
                    background: 'linear-gradient(135deg, #2d3748, #4a5568)',
                    fonts: { primary: 'Inter', secondary: 'Inter' },
                    colors: { primary: '#ffffff', secondary: '#e2e8f0' },
                    decorations: ['minimal-border'],
                    premium: false
                },
                floral: {
                    name: 'Floral Gratitude',
                    background: 'linear-gradient(135deg, #ffafbd, #ffc3a0)',
                    fonts: { primary: 'Dancing Script', secondary: 'Inter' },
                    colors: { primary: '#2d3436', secondary: '#636e72' },
                    decorations: ['flowers', 'leaves'],
                    premium: true
                }
            },
            
            // Congratulations Templates
            congrats: {
                achievement: {
                    name: 'Achievement Unlocked',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    fonts: { primary: 'Bebas Neue', secondary: 'Inter' },
                    colors: { primary: '#ffd700', secondary: '#ffffff' },
                    decorations: ['trophy', 'stars'],
                    premium: false
                },
                graduation: {
                    name: 'Graduation Day',
                    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                    fonts: { primary: 'Playfair Display', secondary: 'Inter' },
                    colors: { primary: '#ffd700', secondary: '#ffffff' },
                    decorations: ['graduation-cap', 'diploma'],
                    premium: true
                },
                promotion: {
                    name: 'Career Success',
                    background: 'linear-gradient(135deg, #16a085, #f4d03f)',
                    fonts: { primary: 'Inter', secondary: 'Inter' },
                    colors: { primary: '#ffffff', secondary: '#e8f5e9' },
                    decorations: ['briefcase', 'arrow-up'],
                    premium: true
                },
                newBaby: {
                    name: 'Bundle of Joy',
                    background: 'linear-gradient(135deg, #ffeaa7, #fab1a0)',
                    fonts: { primary: 'Caveat', secondary: 'Inter' },
                    colors: { primary: '#2d3436', secondary: '#636e72' },
                    decorations: ['baby-items', 'stars'],
                    premium: true
                }
            },
            
            // Seasonal Templates
            seasonal: {
                christmas: {
                    name: 'Christmas Magic',
                    background: 'linear-gradient(135deg, #c0392b, #27ae60)',
                    fonts: { primary: 'Playfair Display', secondary: 'Dancing Script' },
                    colors: { primary: '#ffffff', secondary: '#ffd700' },
                    decorations: ['christmas-tree', 'snowflakes'],
                    premium: true
                },
                halloween: {
                    name: 'Spooky Halloween',
                    background: 'linear-gradient(135deg, #f39c12, #8e44ad)',
                    fonts: { primary: 'Bebas Neue', secondary: 'Caveat' },
                    colors: { primary: '#ffffff', secondary: '#f39c12' },
                    decorations: ['pumpkins', 'bats'],
                    premium: true
                },
                easter: {
                    name: 'Easter Joy',
                    background: 'linear-gradient(135deg, #a8e6cf, #dcedc1)',
                    fonts: { primary: 'Caveat', secondary: 'Inter' },
                    colors: { primary: '#2d3436', secondary: '#636e72' },
                    decorations: ['easter-eggs', 'bunny'],
                    premium: true
                },
                newyear: {
                    name: 'New Year Celebration',
                    background: 'linear-gradient(135deg, #2c3e50, #3498db)',
                    fonts: { primary: 'Bebas Neue', secondary: 'Inter' },
                    colors: { primary: '#ffd700', secondary: '#ffffff' },
                    decorations: ['fireworks', 'champagne'],
                    premium: true
                }
            },
            
            // Special Style Templates
            styles: {
                watercolor: {
                    name: 'Watercolor Dreams',
                    background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
                    fonts: { primary: 'Dancing Script', secondary: 'Caveat' },
                    colors: { primary: '#2d3436', secondary: '#636e72' },
                    decorations: ['watercolor-splash'],
                    premium: true
                },
                neon: {
                    name: 'Neon Nights',
                    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
                    fonts: { primary: 'Bebas Neue', secondary: 'Inter' },
                    colors: { primary: '#00ffff', secondary: '#ff00ff' },
                    decorations: ['neon-lights'],
                    premium: true
                },
                retro80s: {
                    name: '80s Retro',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)',
                    fonts: { primary: 'Bebas Neue', secondary: 'Inter' },
                    colors: { primary: '#ffbe0b', secondary: '#fb5607' },
                    decorations: ['retro-grid', 'synthwave'],
                    premium: true
                },
                japanese: {
                    name: 'Japanese Zen',
                    background: 'linear-gradient(135deg, #ffeaa7, #dfe6e9)',
                    fonts: { primary: 'Playfair Display', secondary: 'Inter' },
                    colors: { primary: '#2d3436', secondary: '#e17055' },
                    decorations: ['cherry-blossoms', 'origami'],
                    premium: true
                },
                galaxy: {
                    name: 'Galaxy Explorer',
                    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
                    fonts: { primary: 'Inter', secondary: 'Bebas Neue' },
                    colors: { primary: '#ffffff', secondary: '#b2bec3' },
                    decorations: ['stars', 'planets'],
                    premium: true
                },
                tropical: {
                    name: 'Tropical Paradise',
                    background: 'linear-gradient(135deg, #00b894, #00cec9)',
                    fonts: { primary: 'Caveat', secondary: 'Inter' },
                    colors: { primary: '#ffffff', secondary: '#ffeaa7' },
                    decorations: ['palm-trees', 'tropical-flowers'],
                    premium: true
                }
            }
        };
    }
    
    getTemplate(category, name) {
        return this.templates[category]?.[name];
    }
    
    getAllTemplates() {
        const all = [];
        Object.keys(this.templates).forEach(category => {
            Object.keys(this.templates[category]).forEach(name => {
                all.push({
                    ...this.templates[category][name],
                    category,
                    id: `${category}-${name}`
                });
            });
        });
        return all;
    }
    
    getFreeTemplates() {
        return this.getAllTemplates().filter(t => !t.premium);
    }
    
    getPremiumTemplates() {
        return this.getAllTemplates().filter(t => t.premium);
    }
    
    getTemplatesByCategory(category) {
        return this.templates[category] || {};
    }
    
    getTemplatesByOccasion(occasion) {
        const occasionMap = {
            birthday: ['birthday', 'styles'],
            love: ['love', 'styles'],
            thanks: ['thanks', 'styles'],
            congrats: ['congrats', 'styles'],
            holiday: ['seasonal', 'styles']
        };
        
        const categories = occasionMap[occasion] || ['styles'];
        const templates = [];
        
        categories.forEach(cat => {
            const catTemplates = this.getTemplatesByCategory(cat);
            Object.keys(catTemplates).forEach(key => {
                templates.push({
                    ...catTemplates[key],
                    category: cat,
                    id: `${cat}-${key}`
                });
            });
        });
        
        return templates;
    }
} 