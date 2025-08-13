// AI Engine for Compliment Cards 2.0
export class AIEngine {
    constructor() {
        this.templates = {
            birthday: [
                "On your special day, {recipient}, I want you to know how {adjective} you make the world just by being in it. Your {noun} brings light to everyone around you. Happy Birthday!",
                "Happy Birthday, {recipient}! Another year of being the {adjective} person who makes life {adjective2}. May this year bring you all the {noun} your heart desires!",
                "Today we celebrate YOU, {recipient}! Your {adjective} spirit and {adjective2} heart make every day brighter. Wishing you a birthday filled with {noun} and joy!",
                "Happy Birthday to someone who makes ordinary moments {adjective}! {recipient}, your presence is a gift that keeps on giving. May your day be as {adjective2} as you are!",
                "{recipient}, on your birthday, I'm reminded of all the {adjective} ways you've touched my life. Here's to another year of your {adjective2} {noun}!",
                "Birthdays are nature's way of telling us to celebrate {adjective} people like you, {recipient}! May your special day overflow with {noun} and happiness!",
                "Another trip around the sun for the most {adjective} person I know! {recipient}, your {noun} makes the world a better place. Happy Birthday!"
            ],
            love: [
                "{recipient}, you make my heart {verb} with {noun}! Every moment with you feels {adjective} and {adjective2}. I love you more than words can express!",
                "My dearest {recipient}, you are the {adjective} light in my life. Your love fills my days with {noun} and my heart with endless joy!",
                "To my {adjective} {recipient}: You've turned my world into something {adjective2} and beautiful. My love for you grows more {adjective} with each passing day!",
                "{recipient}, being with you makes everything feel {adjective}. You are my {noun}, my happiness, and my forever love!",
                "Every day with you, {recipient}, is a {adjective} adventure. Your love makes my soul {verb} and my heart overflow with {noun}!",
                "My beloved {recipient}, you are the {adjective} answer to every wish I've ever made. Our love story is my favorite {noun}!",
                "{recipient}, you don't just make me happy - you make me {adjective} in ways I never knew possible. You are my {adjective2} {noun} and greatest blessing!"
            ],
            thanks: [
                "{recipient}, your {adjective} {noun} has made such a difference in my life. Thank you for being so {adjective2} and generous with your kindness!",
                "I'm deeply grateful for your {adjective} support, {recipient}. Your {noun} came exactly when I needed it most. Thank you for being {adjective2}!",
                "Thank you, {recipient}, for your {adjective} generosity and {adjective2} heart. Your {noun} has touched me in ways you may never fully know!",
                "{recipient}, words cannot express how {adjective} I am for your help. Your {adjective2} {noun} has been a true blessing. Thank you from the bottom of my heart!",
                "Your {adjective} kindness hasn't gone unnoticed, {recipient}. Thank you for the {noun} you've shown and for being such a {adjective2} friend!",
                "Dear {recipient}, your {adjective} gesture meant the world to me. Thank you for your {adjective2} {noun} and for always being there!",
                "{recipient}, I'm overwhelmed by your {adjective} thoughtfulness. Your {noun} has made my life {adjective2} in so many ways. Thank you!"
            ],
            congrats: [
                "Congratulations, {recipient}! Your {adjective} achievement is a testament to your {adjective2} dedication. This {noun} is so well-deserved!",
                "{recipient}, you did it! Your {adjective} hard work and {adjective2} determination have paid off. Celebrating this amazing {noun} with you!",
                "Bravo, {recipient}! This {adjective} milestone showcases your {adjective2} talents. Your {noun} is an inspiration to us all!",
                "Congratulations on your {adjective} success, {recipient}! Your perseverance and {adjective2} spirit have led you to this wonderful {noun}!",
                "{recipient}, your {adjective} accomplishment fills me with pride! This {noun} is proof of your {adjective2} abilities. Well done!",
                "What a {adjective} achievement, {recipient}! Your {adjective2} efforts have culminated in this remarkable {noun}. Congratulations!",
                "Celebrating your {adjective} victory, {recipient}! Your journey to this {noun} has been {adjective2} and inspiring. You've earned every bit of this success!"
            ],
            graduation: [
                "Congratulations on your graduation, {recipient}! Your {adjective} dedication to learning has led to this {adjective2} achievement. The future is bright with {noun}!",
                "{recipient}, you've graduated! Your {adjective} mind and {adjective2} determination have brought you here. May your future be filled with endless {noun}!",
                "Hats off to you, {recipient}! This {adjective} educational milestone is just the beginning of your {adjective2} journey. Congratulations, graduate!",
                "Dear {recipient}, your graduation is a {adjective} testament to your hard work. May this achievement open doors to {adjective2} {noun} and opportunities!"
            ],
            holiday: [
                "Wishing you a {adjective} holiday season, {recipient}! May your days be filled with {noun}, warmth, and {adjective2} moments with loved ones!",
                "{recipient}, may this holiday season bring you {adjective} joy and {adjective2} memories. Here's to celebrating with {noun} and cheer!",
                "Happy Holidays, {recipient}! May your season be {adjective} and bright, filled with {adjective2} {noun} and festive delight!",
                "Warmest holiday wishes to you, {recipient}! May this season wrap you in {adjective} comfort and fill your heart with {adjective2} {noun}!"
            ]
        };
        
        this.adjectives = {
            warm: [
                'wonderful', 'amazing', 'beautiful', 'special', 'delightful', 'magnificent', 'extraordinary',
                'remarkable', 'inspiring', 'heartwarming', 'genuine', 'precious', 'cherished', 'beloved',
                'thoughtful', 'caring', 'compassionate', 'gracious', 'radiant', 'luminous'
            ],
            funny: [
                'hilarious', 'awesome', 'fantastic', 'incredible', 'wild', 'spectacular', 'epic',
                'legendary', 'brilliant', 'dazzling', 'phenomenal', 'stellar', 'magnificent', 'stupendous',
                'mind-blowing', 'out-of-this-world', 'absolutely bonkers', 'ridiculously amazing'
            ],
            professional: [
                'remarkable', 'outstanding', 'exceptional', 'impressive', 'excellent', 'distinguished',
                'accomplished', 'exemplary', 'commendable', 'noteworthy', 'admirable', 'stellar',
                'first-rate', 'superior', 'praiseworthy', 'meritorious', 'laudable', 'estimable'
            ],
            romantic: [
                'beloved', 'cherished', 'precious', 'adorable', 'enchanting', 'captivating',
                'mesmerizing', 'breathtaking', 'divine', 'heavenly', 'angelic', 'irresistible',
                'passionate', 'tender', 'sweet', 'darling', 'dearest', 'treasured'
            ]
        };
        
        this.nouns = {
            general: [
                'joy', 'happiness', 'success', 'memories', 'adventures', 'dreams', 'moments',
                'blessings', 'magic', 'wonder', 'light', 'wisdom', 'grace', 'spirit', 'energy',
                'laughter', 'peace', 'harmony', 'bliss', 'serenity'
            ],
            birthday: [
                'cake and celebrations', 'wishes come true', 'surprises and smiles', 'gifts of love', 
                'celebration', 'fun and laughter', 'special moments', 'birthday magic', 'year ahead',
                'new adventures', 'dreams and aspirations', 'love and laughter'
            ],
            love: [
                'heart', 'soul', 'love', 'affection', 'passion', 'devotion', 'romance',
                'tenderness', 'intimacy', 'connection', 'bond', 'embrace', 'kiss',
                'forever', 'eternity', 'destiny', 'soulmate', 'true love'
            ],
            professional: [
                'achievement', 'dedication', 'expertise', 'leadership', 'innovation', 'excellence',
                'milestone', 'accomplishment', 'success story', 'triumph', 'victory', 'breakthrough',
                'professional growth', 'career advancement', 'recognition', 'distinction'
            ],
            thanks: [
                'kindness', 'generosity', 'support', 'help', 'guidance', 'assistance',
                'thoughtfulness', 'consideration', 'compassion', 'understanding', 'patience',
                'selflessness', 'gift', 'blessing', 'impact', 'difference'
            ]
        };
        
        this.verbs = [
            'sparkle', 'shine', 'glow', 'dance', 'sing', 'flourish', 'bloom',
            'radiate', 'illuminate', 'overflow', 'soar', 'thrive', 'resonate'
        ];
        
        // Context-aware phrases for more natural messages
        this.contextualPhrases = {
            birthday: {
                opening: [
                    "On this special day,",
                    "As you celebrate another year,",
                    "Today marks another chapter,",
                    "On your birthday,"
                ],
                closing: [
                    "Here's to you!",
                    "Celebrate big!",
                    "Enjoy every moment!",
                    "Make it memorable!"
                ]
            },
            love: {
                opening: [
                    "My darling,",
                    "To the love of my life,",
                    "My dearest,",
                    "Sweetheart,"
                ],
                closing: [
                    "Forever yours",
                    "All my love",
                    "Eternally devoted",
                    "With all my heart"
                ]
            },
            thanks: {
                opening: [
                    "I wanted to say,",
                    "From my heart,",
                    "I'm writing to express,",
                    "Please know that,"
                ],
                closing: [
                    "With sincere gratitude",
                    "Thank you again",
                    "Much appreciated",
                    "Gratefully yours"
                ]
            }
        };
    }
    
    async generateCompliment(params) {
        const { occasion, recipient, tone, interests } = params;
        
        // Simulate AI processing
        await this.simulateDelay(800);
        
        // Get appropriate templates based on occasion
        let templates = this.templates[occasion] || this.templates.birthday;
        
        // For graduation, use specific graduation templates if available
        if (occasion === 'graduation' && this.templates.graduation) {
            templates = this.templates.graduation;
        } else if (occasion === 'holiday' && this.templates.holiday) {
            templates = this.templates.holiday;
        }
        
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // Get word lists based on tone
        const adjList = this.adjectives[tone] || this.adjectives.warm;
        const nounList = this.getNounList(occasion, interests);
        
        // Generate more thoughtful message
        let message = this.fillTemplate(template, {
            recipient: recipient || 'Friend',
            adjective: this.randomFrom(adjList),
            adjective2: this.randomFrom(adjList),
            noun: this.randomFrom(nounList),
            verb: this.randomFrom(this.verbs)
        });
        
        // Add personal touch based on interests
        if (interests && interests.length > 0) {
            message = this.addPersonalTouch(message, interests, occasion);
        }
        
        return message;
    }
    
    getNounList(occasion, interests) {
        let nounList = [...this.nouns.general];
        
        // Add occasion-specific nouns
        if (this.nouns[occasion]) {
            nounList = [...nounList, ...this.nouns[occasion]];
        }
        
        // Add interest-based nouns if provided
        if (interests && interests.length > 0) {
            interests.forEach(interest => {
                if (interest) {
                    // Add the interest itself and related words
                    nounList.push(interest);
                    nounList.push(`${interest} adventures`);
                    nounList.push(`${interest} memories`);
                }
            });
        }
        
        return nounList;
    }
    
    fillTemplate(template, replacements) {
        let message = template;
        
        // Replace all placeholders
        Object.keys(replacements).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            message = message.replace(regex, replacements[key]);
        });
        
        // Ensure no duplicate words in close proximity
        message = this.removeDuplicates(message);
        
        return message;
    }
    
    removeDuplicates(message) {
        const words = message.split(' ');
        const cleaned = [];
        let lastWord = '';
        
        words.forEach(word => {
            // Remove punctuation for comparison
            const cleanWord = word.toLowerCase().replace(/[.,!?;:]/, '');
            const cleanLast = lastWord.toLowerCase().replace(/[.,!?;:]/, '');
            
            if (cleanWord !== cleanLast || cleanWord.length <= 3) {
                cleaned.push(word);
                lastWord = word;
            } else {
                // Replace with synonym if duplicate
                cleaned.push(this.getSynonym(cleanWord));
                lastWord = this.getSynonym(cleanWord);
            }
        });
        
        return cleaned.join(' ');
    }
    
    getSynonym(word) {
        const synonyms = {
            'wonderful': 'amazing',
            'amazing': 'incredible',
            'beautiful': 'lovely',
            'special': 'unique',
            'great': 'fantastic'
        };
        
        return synonyms[word] || word;
    }
    
    addPersonalTouch(message, interests, occasion) {
        // Add a personal note based on interests
        const interest = interests[0];
        const personalNotes = {
            birthday: ` May your love for ${interest} continue to bring you joy!`,
            love: ` Our shared moments with ${interest} make our love even stronger.`,
            thanks: ` Your passion for ${interest} inspires me.`,
            congrats: ` Your dedication to ${interest} has truly paid off!`
        };
        
        const note = personalNotes[occasion] || ` Here's to more ${interest} adventures!`;
        
        // Add the note if the message doesn't already mention the interest
        if (!message.toLowerCase().includes(interest.toLowerCase())) {
            message = message.replace(/!$/, '') + note;
        }
        
        return message;
    }
    
    async enhanceMessage(message) {
        await this.simulateDelay(600);
        
        // Enhance the message with better structure and emotion
        let enhanced = message;
        
        // Ensure proper capitalization
        enhanced = this.fixCapitalization(enhanced);
        
        // Add emotional depth
        enhanced = this.addEmotionalDepth(enhanced);
        
        // Add appropriate emoji based on content
        enhanced = this.addContextualEmoji(enhanced);
        
        // Ensure proper punctuation
        enhanced = this.fixPunctuation(enhanced);
        
        return enhanced;
    }
    
    fixCapitalization(message) {
        // Capitalize first letter
        message = message.charAt(0).toUpperCase() + message.slice(1);
        
        // Capitalize after periods
        message = message.replace(/\. ([a-z])/g, (match, p1) => '. ' + p1.toUpperCase());
        
        // Capitalize 'I'
        message = message.replace(/\bi\b/g, 'I');
        
        return message;
    }
    
    addEmotionalDepth(message) {
        // Add emphasis to certain words
        const emphasisWords = {
            'love': '❤️ love',
            'happy': '😊 happy',
            'grateful': '🙏 grateful',
            'congratulations': '🎉 Congratulations',
            'thank': '💝 thank',
            'birthday': '🎂 birthday',
            'special': '✨ special'
        };
        
        Object.keys(emphasisWords).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            if (message.toLowerCase().includes(word) && !message.includes('❤️') && !message.includes('😊')) {
                message = message.replace(regex, emphasisWords[word]);
                return; // Only add one emoji
            }
        });
        
        return message;
    }
    
    addContextualEmoji(message) {
        // Only add emoji if none present
        if (!/[😊🎉❤️🙏💝🎂✨🌟💫🎊]/.test(message)) {
            const lastChar = message[message.length - 1];
            if (lastChar === '!') {
                // Add celebratory emoji
                const emojis = ['🎉', '✨', '💫', '🌟'];
                message = message.slice(0, -1) + ' ' + this.randomFrom(emojis) + '!';
            } else if (lastChar === '.') {
                // Add warm emoji
                const emojis = ['💝', '🌸', '💖', '⭐'];
                message = message + ' ' + this.randomFrom(emojis);
            }
        }
        
        return message;
    }
    
    fixPunctuation(message) {
        // Ensure ending punctuation
        if (!/[.!?]$/.test(message.trim())) {
            message = message.trim() + '!';
        }
        
        // Fix multiple punctuation
        message = message.replace(/([.!?]){2,}/g, '$1');
        
        // Fix spacing around punctuation
        message = message.replace(/\s+([.!?,])/g, '$1');
        message = message.replace(/([.!?])\s*([a-z])/g, '$1 $2');
        
        return message;
    }
    
    async getSuggestions(occasion) {
        await this.simulateDelay(500);
        
        const suggestions = {
            birthday: [
                "Add their age for a milestone birthday",
                "Mention a shared memory",
                "Include their favorite hobby",
                "Add a funny inside joke"
            ],
            love: [
                "Mention how long you've been together",
                "Include a special date or place",
                "Add a romantic quote",
                "Mention what you love most about them"
            ],
            thanks: [
                "Be specific about what you're thankful for",
                "Mention how their help impacted you",
                "Add a personal touch",
                "Include a future promise"
            ],
            congrats: [
                "Mention the specific achievement",
                "Add how proud you are",
                "Include an inspiring quote",
                "Mention their hard work"
            ]
        };
        
        return suggestions[occasion] || suggestions.birthday;
    }
    
    async translateMessage(message, language) {
        await this.simulateDelay(1000);
        
        // Simple translation simulation
        const translations = {
            spanish: {
                'Happy Birthday': 'Feliz Cumpleaños',
                'Thank you': 'Gracias',
                'Congratulations': 'Felicitaciones',
                'I love you': 'Te amo'
            },
            french: {
                'Happy Birthday': 'Joyeux Anniversaire',
                'Thank you': 'Merci',
                'Congratulations': 'Félicitations',
                'I love you': 'Je t\'aime'
            }
        };
        
        let translated = message;
        if (translations[language]) {
            for (const [eng, trans] of Object.entries(translations[language])) {
                translated = translated.replace(new RegExp(eng, 'gi'), trans);
            }
        }
        
        return translated;
    }
    
    analyzeSentiment(message) {
        // Simple sentiment analysis
        const positiveWords = ['love', 'happy', 'wonderful', 'amazing', 'beautiful', 'great', 'fantastic', 'excellent'];
        const negativeWords = ['sad', 'sorry', 'miss', 'difficult', 'hard', 'tough'];
        
        let score = 0;
        const words = message.toLowerCase().split(' ');
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score += 1;
            if (negativeWords.includes(word)) score -= 1;
        });
        
        return {
            score: score,
            sentiment: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral',
            confidence: Math.min(Math.abs(score) / words.length, 1)
        };
    }
    
    generateColorPalette(occasion, tone) {
        const palettes = {
            birthday: {
                warm: ['#FF6B9D', '#FEC860', '#C7CEEA', '#B2E1D4'],
                funny: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC'],
                professional: ['#2D3748', '#4A5568', '#718096', '#A0AEC0']
            },
            love: {
                romantic: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D'],
                warm: ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#FFF0F5']
            },
            thanks: {
                warm: ['#8ECAE6', '#219EBC', '#023047', '#FFB703'],
                professional: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261']
            }
        };
        
        return palettes[occasion]?.[tone] || palettes.birthday.warm;
    }
    
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
} 