// Compliment Cards 2.0 - Main Application
import { AIEngine } from './ai-engine.js';
import { CanvasEngine } from './canvas-engine.js';
import { Templates } from './templates.js';
import { Effects } from './effects.js';
import GifGenerator from './gif-generator.js';

class ComplimentCardsApp {
    constructor() {
        this.state = {
            currentMessage: '',
            selectedTemplate: 'modern',
            selectedOccasion: 'birthday',
            recipient: '',
            tone: 'warm',
            interests: [],
            canvas: null,
            isGenerating: false,
            history: [],
            isMobile: false,
            isTouch: false
        };
        
        this.ai = new AIEngine();
        this.canvas = new CanvasEngine();
        this.templates = new Templates();
        this.effects = new Effects();
        this.gifGenerator = new GifGenerator();
        
        // Touch gesture tracking
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.detectDevice();
        this.renderUI();
        this.bindEvents();
        this.loadHistory();
        this.initParticles();
        
        // Initialize canvas with better timing to avoid race condition
        requestAnimationFrame(() => {
            this.initCanvas();
            this.handleResize(); // Set initial responsive layout
        });
    }
    
    detectDevice() {
        // Detect if device is mobile
        this.state.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        
        // Detect if device supports touch
        this.state.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        
        // Add device classes to body
        if (this.state.isMobile) {
            document.body.classList.add('is-mobile');
        }
        if (this.state.isTouch) {
            document.body.classList.add('is-touch');
        }
    }
    
    renderUI() {
        const app = document.getElementById('app');
        app.className = 'h-screen flex flex-col overflow-hidden';
        
        // Adjust layout for mobile
        const mobileClass = this.state.isMobile ? 'mobile-layout' : '';
        
        app.innerHTML = `
            <!-- Fixed Header -->
            <header class="flex-shrink-0 bg-white shadow-md border-b border-purple-100 ${mobileClass}">
                <nav class="w-full px-3 md:px-6 py-2 md:py-3">
                    <div class="flex items-center justify-between">
                        <!-- Logo with AI Indicator -->
                        <div class="flex items-center space-x-2 md:space-x-3">
                            <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-md">
                                <i class="fas fa-sparkles text-white text-sm md:text-lg"></i>
                            </div>
                            <div>
                                <h1 class="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Compliment Cards
                                </h1>
                                <p class="text-xs text-gray-600 hidden md:block">AI-Powered • No Login Required</p>
                            </div>
                        </div>
                        
                        <!-- Quick Actions - Responsive -->
                        <div class="flex space-x-2">
                            ${this.state.isMobile ? `
                                <button id="mobileMenuBtn" class="p-2 text-purple-600">
                                    <i class="fas fa-bars text-lg"></i>
                                </button>
                            ` : `
                                <button id="shareBtn" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
                                    <i class="fas fa-share-alt mr-2"></i>Share
                                </button>
                            `}
                        </div>
                    </div>
                </nav>
            </header>
            
            <!-- Main Content with Scrollable Area -->
            <main class="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div class="w-full px-3 md:px-6 py-2 md:py-3">
                    <!-- AI Assistant Bar - Responsive -->
                    <div class="mb-3 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl md:rounded-2xl shadow-sm">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                            <div class="flex items-center space-x-2 md:space-x-3">
                                <div class="relative">
                                    <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                                        <i class="fas fa-robot text-white text-sm md:text-lg"></i>
                                    </div>
                                    <span class="absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-white"></span>
                                </div>
                                <div>
                                    <p class="text-xs md:text-sm font-semibold text-gray-800">AI Assistant Ready</p>
                                    <p class="text-xs text-gray-600 hidden md:block">Try: "Create a birthday card for my best friend"</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button id="suggestBtn" class="px-3 py-1.5 bg-white/80 backdrop-blur rounded-lg text-xs font-medium hover:bg-white hover:shadow-md transition-all">
                                    <i class="fas fa-lightbulb text-yellow-500 mr-1"></i>Suggest
                                </button>
                                <button id="autoGenerateBtn" class="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all">
                                    <i class="fas fa-magic mr-1"></i>Auto
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile-Optimized Layout -->
                    ${this.state.isMobile ? this.renderMobileLayout() : this.renderDesktopLayout()}
                </div>
            </main>
            
            <!-- Mobile Bottom Navigation -->
            ${this.state.isMobile ? `
                <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
                    <div class="flex justify-around">
                        <button class="mobile-nav-btn flex flex-col items-center p-2" data-tab="create">
                            <i class="fas fa-plus-circle text-purple-600 text-xl"></i>
                            <span class="text-xs mt-1">Create</span>
                        </button>
                        <button class="mobile-nav-btn flex flex-col items-center p-2" data-tab="templates">
                            <i class="fas fa-palette text-gray-600 text-xl"></i>
                            <span class="text-xs mt-1">Templates</span>
                        </button>
                        <button class="mobile-nav-btn flex flex-col items-center p-2" data-tab="effects">
                            <i class="fas fa-sparkles text-gray-600 text-xl"></i>
                            <span class="text-xs mt-1">Effects</span>
                        </button>
                        <button class="mobile-nav-btn flex flex-col items-center p-2" data-tab="history">
                            <i class="fas fa-clock text-gray-600 text-xl"></i>
                            <span class="text-xs mt-1">History</span>
                        </button>
                    </div>
                </nav>
            ` : ''}
        `;
    }
    
    renderMobileLayout() {
        return `
            <!-- Mobile Swipeable Tabs -->
            <div class="mobile-tabs-container">
                <!-- Canvas Preview (Always Visible) -->
                <div class="mb-4">
                    <div class="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-3 shadow-lg">
                        <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-2 shadow-inner">
                            <canvas id="cardCanvas" width="1080" height="1620" class="w-full max-w-sm mx-auto rounded-xl shadow-xl" style="image-rendering: auto;"></canvas>
                            <div class="absolute top-2 right-2 flex space-x-1">
                                <span class="px-2 py-1 bg-white/80 backdrop-blur text-xs rounded-full shadow-sm">
                                    <i class="fas fa-palette text-purple-600 mr-1"></i>Preview
                                </span>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="mt-3 space-y-2">
                            <button id="createCardBtn" class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold shadow-lg active:scale-95 transition-all">
                                <i class="fas fa-magic mr-2"></i>Create Card
                            </button>
                            <div class="grid grid-cols-3 gap-2">
                                <button id="downloadBtn" class="py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium active:bg-gray-50 transition-all">
                                    <i class="fas fa-image mr-1"></i>PNG
                                </button>
                                <button id="downloadGifBtn" class="py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 text-purple-700 rounded-lg text-xs font-medium active:scale-95 transition-all">
                                    <i class="fas fa-film mr-1"></i>GIF
                                </button>
                                <button id="shareBtn" class="py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium active:bg-gray-50 transition-all">
                                    <i class="fas fa-share mr-1"></i>Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Collapsible Sections -->
                <div class="space-y-3">
                    <!-- Message Section -->
                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="mobile-section-toggle w-full p-3 flex items-center justify-between" data-section="message">
                            <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                                <span class="w-1.5 h-4 bg-green-500 rounded-full mr-2"></span>
                                Message & Occasion
                            </h3>
                            <i class="fas fa-chevron-down text-gray-400 transition-transform"></i>
                        </button>
                        <div class="mobile-section-content hidden p-3 pt-0" id="message-section">
                            <!-- Occasion Selector -->
                            <div class="mb-3">
                                <label class="text-xs font-medium text-gray-600 mb-2 block">Choose Occasion</label>
                                <div class="grid grid-cols-3 gap-2">
                                    ${this.renderMobileOccasions()}
                                </div>
                            </div>
                            
                            <!-- Message Input -->
                            <div>
                                <textarea 
                                    id="messageInput"
                                    class="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all bg-gray-50 focus:bg-white"
                                    rows="3"
                                    placeholder="Type your message or let AI generate one..."
                                ></textarea>
                                <div class="flex space-x-2 mt-2">
                                    <button id="generateMessageBtn" class="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium active:scale-95 transition-all">
                                        <i class="fas fa-dice text-xs mr-1"></i>Generate
                                    </button>
                                    <button id="enhanceBtn" class="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium active:scale-95 transition-all">
                                        <i class="fas fa-sparkles text-xs mr-1"></i>Enhance
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Templates Section -->
                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="mobile-section-toggle w-full p-3 flex items-center justify-between" data-section="templates">
                            <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                                <span class="w-1.5 h-4 bg-pink-500 rounded-full mr-2"></span>
                                Styles & Templates
                            </h3>
                            <i class="fas fa-chevron-down text-gray-400 transition-transform"></i>
                        </button>
                        <div class="mobile-section-content hidden p-3 pt-0" id="templates-section">
                            <div class="grid grid-cols-2 gap-2">
                                ${this.renderTemplates()}
                            </div>
                            <button id="viewAllTemplatesBtn" class="w-full mt-2 text-xs text-purple-600 font-medium">View All Templates →</button>
                        </div>
                    </div>
                    
                    <!-- Effects Section -->
                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="mobile-section-toggle w-full p-3 flex items-center justify-between" data-section="effects">
                            <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                                <span class="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></span>
                                Effects
                            </h3>
                            <i class="fas fa-chevron-down text-gray-400 transition-transform"></i>
                        </button>
                        <div class="mobile-section-content hidden p-3 pt-0" id="effects-section">
                            <div class="space-y-2">
                                ${this.renderEffects()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderDesktopLayout() {
        return `
            <!-- Main Grid Layout -->
            <div class="grid grid-cols-12 gap-3">
                <!-- Left Panel -->
                <div class="col-span-3 space-y-2.5">
                    <!-- Occasion Selector with AI Generation -->
                    <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                            <span class="w-1.5 h-4 bg-purple-500 rounded-full mr-2"></span>
                            Choose Occasion
                        </h3>
                        <div class="grid grid-cols-2 gap-2 mb-3" id="occasionGrid">
                            ${this.renderOccasions()}
                        </div>
                        <!-- AI Generation Buttons -->
                        <div class="border-t border-gray-100 pt-3 mt-3">
                            <p class="text-xs text-gray-500 mb-2">AI Message Generator</p>
                            <div class="flex space-x-2">
                                <button id="generateMessageBtn" class="flex-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm">
                                    <i class="fas fa-magic text-xs mr-1"></i>Generate
                                </button>
                                <button id="enhanceBtn" class="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                                    <i class="fas fa-sparkles text-xs mr-1"></i>Enhance
                                </button>
                            </div>
                            <p class="text-xs text-gray-400 mt-2 italic">Generate AI message based on occasion</p>
                        </div>
                    </div>
                    
                    <!-- Message Input -->
                    <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                                <span class="w-1.5 h-4 bg-green-500 rounded-full mr-2"></span>
                                Your Message
                            </h3>
                            <span class="px-2 py-0.5 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 text-xs rounded-full font-medium">
                                <i class="fas fa-edit text-xs mr-1"></i>Custom
                            </span>
                        </div>
                        <textarea 
                            id="messageInput"
                            class="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all bg-gray-50 focus:bg-white"
                            rows="3"
                            placeholder="Type your personal message here..."
                        ></textarea>
                        <button id="setMessageBtn" class="w-full mt-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium active:scale-95 transition-all">
                            <i class="fas fa-check text-xs mr-1"></i>Set Message
                        </button>
                    </div>
                    
                    <!-- Personalization -->
                    <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                            <span class="w-1.5 h-4 bg-blue-500 rounded-full mr-2"></span>
                            Personalize
                        </h3>
                        <div class="space-y-2">
                            <div>
                                <label class="text-xs font-medium text-gray-600 mb-1 block">Recipient</label>
                                <input id="recipientInput" type="text" class="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all bg-gray-50 focus:bg-white" placeholder="Enter name">
                            </div>
                            <div>
                                <label class="text-xs font-medium text-gray-600 mb-1 block">Tone</label>
                                <select id="toneSelect" class="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all bg-gray-50 focus:bg-white">
                                    <option value="warm">🤗 Warm & Heartfelt</option>
                                    <option value="funny">😄 Fun & Playful</option>
                                    <option value="professional">💼 Professional</option>
                                    <option value="romantic">💕 Romantic</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Center: Canvas Preview -->
                <div class="col-span-6">
                    <div class="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-5 shadow-lg">
                        <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner">
                            <canvas id="cardCanvas" width="1080" height="1620" class="w-full max-w-sm mx-auto rounded-xl shadow-xl" style="image-rendering: auto;"></canvas>
                            <div class="absolute top-2 right-2 flex space-x-1">
                                <span class="px-2 py-1 bg-white/80 backdrop-blur text-xs rounded-full shadow-sm">
                                    <i class="fas fa-palette text-purple-600 mr-1"></i>Preview
                                </span>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="mt-4 space-y-2">
                            <button id="createCardBtn" class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all">
                                <i class="fas fa-magic mr-2"></i>Create Card
                            </button>
                            <div class="grid grid-cols-3 gap-2">
                                <button id="downloadBtn" class="py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 hover:shadow-md transition-all" title="Download as PNG">
                                    <i class="fas fa-image mr-1"></i>PNG
                                </button>
                                <button id="downloadGifBtn" class="py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 text-purple-700 rounded-lg text-xs font-medium hover:shadow-md transition-all" title="Download as animated GIF">
                                    <i class="fas fa-film mr-1"></i>GIF
                                </button>
                                <button id="copyBtn" class="py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 hover:shadow-md transition-all" title="Copy to clipboard">
                                    <i class="fas fa-copy mr-1"></i>Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Panel -->
                <div class="col-span-3 space-y-2.5">
                    <!-- Style Templates -->
                    <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                                <span class="w-1.5 h-4 bg-pink-500 rounded-full mr-2"></span>
                                Styles
                            </h3>
                            <button id="viewAllTemplatesBtn" class="text-xs text-purple-600 hover:text-purple-700 font-medium">View All 30+</button>
                        </div>
                        <div class="grid grid-cols-2 gap-2" id="templateGrid">
                            ${this.renderTemplates()}
                        </div>
                    </div>
                    
                    <!-- Effects -->
                    <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                            <span class="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></span>
                            Effects
                        </h3>
                        <div class="space-y-2">
                            ${this.renderEffects()}
                        </div>
                    </div>
                    
                    <!-- History -->
                    <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                                <span class="w-1.5 h-4 bg-indigo-500 rounded-full mr-2"></span>
                                Recent
                            </h3>
                            <button id="clearHistoryBtn" class="text-xs text-red-600 hover:text-red-700 font-medium">Clear</button>
                        </div>
                        <div class="grid grid-cols-3 gap-2" id="historyGrid">
                            <div class="text-xs text-gray-500 col-span-3 text-center py-4 bg-gray-50 rounded-lg">
                                <i class="fas fa-clock text-gray-400 mb-1"></i>
                                <p>No recent cards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderMobileOccasions() {
        const occasions = [
            { id: 'birthday', icon: '🎂', label: 'Birthday' },
            { id: 'love', icon: '💕', label: 'Love' },
            { id: 'thanks', icon: '🙏', label: 'Thanks' },
            { id: 'congrats', icon: '🎉', label: 'Congrats' },
            { id: 'graduation', icon: '🎓', label: 'Grad' },
            { id: 'holiday', icon: '🎄', label: 'Holiday' }
        ];
        
        return occasions.map(occ => `
            <button class="occasion-btn p-2 rounded-lg border-2 ${occ.id === this.state.selectedOccasion ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-400 shadow-md' : 'bg-white border-gray-200'} text-center transition-all active:scale-95" data-occasion="${occ.id}">
                <span class="text-xl block">${occ.icon}</span>
                <p class="text-xs font-medium text-gray-700">${occ.label}</p>
            </button>
        `).join('');
    }
    
    renderOccasions() {
        const occasions = [
            { id: 'birthday', icon: '🎂', label: 'Birthday' },
            { id: 'love', icon: '💕', label: 'Love' },
            { id: 'thanks', icon: '🙏', label: 'Thanks' },
            { id: 'congrats', icon: '🎉', label: 'Congrats' },
            { id: 'graduation', icon: '🎓', label: 'Graduation' },
            { id: 'holiday', icon: '🎄', label: 'Holiday' }
        ];
        
        return occasions.map(occ => `
            <button class="occasion-btn p-3 rounded-xl border-2 ${occ.id === this.state.selectedOccasion ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-400 shadow-md' : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-purple-300'} text-center transition-all transform hover:scale-105" data-occasion="${occ.id}">
                <span class="text-2xl block mb-1">${occ.icon}</span>
                <p class="text-xs font-medium text-gray-700">${occ.label}</p>
            </button>
        `).join('');
    }
    
    renderTemplates() {
        // Updated templates to match the enhanced canvas-engine templates
        const templates = [
            // Basic templates
            { id: 'modern', gradient: 'from-purple-400 to-pink-400', label: 'Modern', icon: '✨' },
            { id: 'vintage', gradient: 'from-yellow-400 to-orange-400', label: 'Vintage', icon: '🎨' },
            { id: 'minimal', gradient: 'from-gray-300 to-gray-500', label: 'Minimal', icon: '⚪' },
            
            // Nature scenes
            { id: 'forest', gradient: 'from-green-600 to-green-800', label: 'Forest', icon: '🌲' },
            { id: 'ocean', gradient: 'from-blue-400 to-blue-600', label: 'Ocean', icon: '🌊' },
            { id: 'sunset', gradient: 'from-orange-400 to-pink-500', label: 'Sunset', icon: '🌅' },
            { id: 'mountains', gradient: 'from-gray-400 to-blue-300', label: 'Mountains', icon: '🏔️' },
            { id: 'desert', gradient: 'from-yellow-400 to-orange-500', label: 'Desert', icon: '🏜️' },
            
            // Space themes
            { id: 'galaxy', gradient: 'from-purple-900 to-blue-900', label: 'Galaxy', icon: '🌌' },
            { id: 'cosmos', gradient: 'from-indigo-900 to-purple-900', label: 'Cosmos', icon: '🪐' },
            { id: 'aurora', gradient: 'from-green-400 to-purple-600', label: 'Aurora', icon: '🌠' },
            
            // Artistic
            { id: 'watercolor', gradient: 'from-pink-200 to-blue-200', label: 'Watercolor', icon: '🎨' },
            { id: 'oilPainting', gradient: 'from-amber-600 to-brown-600', label: 'Oil Paint', icon: '🖼️' },
            { id: 'sketch', gradient: 'from-gray-200 to-gray-400', label: 'Sketch', icon: '✏️' },
            { id: 'abstractArt', gradient: 'from-red-400 via-yellow-400 to-blue-400', label: 'Abstract', icon: '🎭' },
            
            // Patterns
            { id: 'butterflies', gradient: 'from-pink-300 to-purple-400', label: 'Butterflies', icon: '🦋' },
            { id: 'flowers', gradient: 'from-pink-400 to-red-400', label: 'Flowers', icon: '🌸' },
            { id: 'leaves', gradient: 'from-green-400 to-emerald-500', label: 'Leaves', icon: '🍃' },
            
            // Retro
            { id: 'retro70s', gradient: 'from-orange-500 to-red-600', label: 'Retro 70s', icon: '🕺' },
            { id: 'artDeco', gradient: 'from-yellow-600 to-gray-800', label: 'Art Deco', icon: '🏛️' },
            { id: 'polaroid', gradient: 'from-gray-100 to-gray-300', label: 'Polaroid', icon: '📸' },
            { id: 'vintagePostcard', gradient: 'from-amber-200 to-amber-400', label: 'Postcard', icon: '📮' },
            
            // Locations
            { id: 'paris', gradient: 'from-purple-300 to-pink-300', label: 'Paris', icon: '🗼' },
            { id: 'tokyo', gradient: 'from-pink-300 to-red-300', label: 'Tokyo', icon: '🗾' },
            { id: 'newyork', gradient: 'from-blue-400 to-gray-600', label: 'New York', icon: '🗽' },
            { id: 'beach', gradient: 'from-cyan-300 to-blue-400', label: 'Beach', icon: '🏖️' },
            
            // Modern styles
            { id: 'geometric', gradient: 'from-purple-500 to-blue-500', label: 'Geometric', icon: '💠' },
            { id: 'memphis', gradient: 'from-pink-400 via-yellow-400 to-cyan-400', label: 'Memphis', icon: '🔶' },
            { id: 'neonCity', gradient: 'from-purple-600 to-pink-600', label: 'Neon City', icon: '🌃' },
            { id: 'minimalistGold', gradient: 'from-white to-yellow-200', label: 'Gold', icon: '✨' },
            
            // Seasonal
            { id: 'autumn', gradient: 'from-orange-400 to-red-500', label: 'Autumn', icon: '🍂' },
            { id: 'winter', gradient: 'from-blue-200 to-gray-300', label: 'Winter', icon: '❄️' },
            { id: 'spring', gradient: 'from-pink-200 to-green-200', label: 'Spring', icon: '🌷' }
        ];
        
        // For mobile, show fewer templates initially
        const displayTemplates = this.state.isMobile ? templates.slice(0, 6) : templates.slice(0, 8);
        
        return displayTemplates.map(temp => `
            <div class="template-card aspect-[3/4] bg-gradient-to-br ${temp.gradient} rounded-xl cursor-pointer relative group transform transition-all hover:scale-105 hover:shadow-lg ${temp.id === this.state.selectedTemplate ? 'ring-2 ring-purple-500 ring-offset-2 shadow-lg' : ''}" data-template="${temp.id}">
                <div class="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-all"></div>
                <div class="absolute top-2 left-2 text-2xl">${temp.icon}</div>
                <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl">
                    <span class="text-xs font-semibold text-white">${temp.label}</span>
                </div>
            </div>
        `).join('');
    }
    
    renderEffects() {
        const effects = [
            { id: 'sparkles', icon: '✨', label: 'Sparkles', color: 'purple' },
            { id: 'confetti', icon: '🎊', label: 'Confetti', color: 'pink' },
            { id: '3d', icon: '💫', label: '3D Flip', color: 'blue' },
            { id: 'glow', icon: '🌟', label: 'Glow', color: 'yellow' }
        ];
        
        return effects.map(effect => `
            <label class="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all group">
                <span class="text-sm font-medium flex items-center">
                    <span class="text-lg mr-2">${effect.icon}</span>
                    <span class="text-gray-700">${effect.label}</span>
                </span>
                <div class="relative">
                    <input type="checkbox" class="sr-only peer" data-effect="${effect.id}">
                    <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-${effect.color}-400 peer-checked:to-${effect.color}-500"></div>
                </div>
            </label>
        `).join('');
    }
    
    initCanvas() {
        const canvas = document.getElementById('cardCanvas');
        if (canvas) {
            // Set HD canvas dimensions (Full HD portrait)
            canvas.width = 1080;
            canvas.height = 1620;
            
            // Set initial canvas with welcome message
            const ctx = canvas.getContext('2d');
            
            // Enable high-quality rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 1080, 1620);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1080, 1620);
            
            // Add welcome text with HD font size
            ctx.fillStyle = 'white';
            ctx.font = 'bold 72px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Create Your Card', 540, 810);
            
            ctx.font = '48px Inter';
            ctx.fillText('Generate or type a message', 540, 930);
        }
    }
    
    bindEvents() {
        // Occasion selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.occasion-btn')) {
                const btn = e.target.closest('.occasion-btn');
                this.state.selectedOccasion = btn.dataset.occasion;
                
                // Update UI - remove all selected states first
                document.querySelectorAll('.occasion-btn').forEach(b => {
                    b.classList.remove('bg-gradient-to-br', 'from-purple-50', 'to-pink-50', 'border-purple-400', 'shadow-md');
                    b.classList.add('bg-white', 'border-gray-200');
                });
                // Add selected state to clicked button
                btn.classList.remove('bg-white', 'border-gray-200');
                btn.classList.add('bg-gradient-to-br', 'from-purple-50', 'to-pink-50', 'border-purple-400', 'shadow-md');
            }
            
            // Template selection
            if (e.target.closest('.template-card')) {
                const card = e.target.closest('.template-card');
                this.selectTemplate(card.dataset.template);
            }
        });
        
        // Button events
        document.getElementById('generateMessageBtn')?.addEventListener('click', () => this.generateMessage());
        document.getElementById('enhanceBtn')?.addEventListener('click', () => this.enhanceMessage());
        document.getElementById('setMessageBtn')?.addEventListener('click', () => this.setCustomMessage());
        document.getElementById('createCardBtn')?.addEventListener('click', () => this.createCard());
        document.getElementById('downloadBtn')?.addEventListener('click', () => this.downloadCard());
        document.getElementById('downloadGifBtn')?.addEventListener('click', () => this.downloadGif());
        document.getElementById('copyBtn')?.addEventListener('click', () => this.copyCard());
        document.getElementById('suggestBtn')?.addEventListener('click', () => this.suggestIdeas());
        document.getElementById('autoGenerateBtn')?.addEventListener('click', () => this.autoGenerate());
        document.getElementById('clearHistoryBtn')?.addEventListener('click', () => this.clearHistory());
        document.getElementById('shareBtn')?.addEventListener('click', () => this.shareCard());
        
        // Add event listeners for effect toggles
        document.querySelectorAll('input[data-effect]').forEach(input => {
            input.addEventListener('change', () => {
                if (this.state.currentMessage) {
                    this.applyEffects();
                }
            });
        });
        document.getElementById('viewAllTemplatesBtn')?.addEventListener('click', () => this.showAllTemplates());
        
        // Input events - removed auto-update to prevent accidental overwrites
        // Message is now only set when user clicks "Set Message" button
        
        document.getElementById('recipientInput')?.addEventListener('input', (e) => {
            this.state.recipient = e.target.value;
            if (this.state.currentMessage) {
                this.updatePreview();
            }
        });
        
        document.getElementById('toneSelect')?.addEventListener('change', (e) => {
            this.state.tone = e.target.value;
        });
        
        // Mobile-specific event handlers
        if (this.state.isMobile) {
            this.bindMobileEvents();
        }
        
        // Touch event handlers
        if (this.state.isTouch) {
            this.bindTouchEvents();
        }
        
        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 100);
        });
    }
    
    bindMobileEvents() {
        // Mobile menu toggle
        document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Mobile section toggles
        document.querySelectorAll('.mobile-section-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const section = toggle.dataset.section;
                const content = document.getElementById(`${section}-section`);
                const icon = toggle.querySelector('.fa-chevron-down');
                
                if (content) {
                    content.classList.toggle('hidden');
                    icon?.classList.toggle('rotate-180');
                }
            });
        });
        
        // Mobile bottom navigation
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchMobileTab(tab);
            });
        });
    }
    
    bindTouchEvents() {
        const canvas = document.getElementById('cardCanvas');
        if (!canvas) return;
        
        // Add swipe gestures to canvas for template switching
        canvas.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        canvas.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
        
        // Prevent default touch behaviors that might interfere
        canvas.addEventListener('touchmove', (e) => {
            // Allow scrolling but prevent zooming
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diffX = this.touchEndX - this.touchStartX;
        const diffY = this.touchEndY - this.touchStartY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            const templates = ['modern', 'vintage', 'minimal', 'nature'];
            const currentIndex = templates.indexOf(this.state.selectedTemplate);
            
            if (diffX > 0) {
                // Swipe right - previous template
                const newIndex = currentIndex > 0 ? currentIndex - 1 : templates.length - 1;
                this.selectTemplate(templates[newIndex]);
                this.showToast('← Previous template', 'info');
            } else {
                // Swipe left - next template
                const newIndex = currentIndex < templates.length - 1 ? currentIndex + 1 : 0;
                this.selectTemplate(templates[newIndex]);
                this.showToast('Next template →', 'info');
            }
        }
    }
    
    handleResize() {
        const wasMobile = this.state.isMobile;
        this.detectDevice();
        
        // Re-render UI if device type changed
        if (wasMobile !== this.state.isMobile) {
            this.renderUI();
            this.bindEvents();
            setTimeout(() => this.initCanvas(), 100);
        }
        
        // Adjust canvas size for mobile
        if (this.state.isMobile) {
            const canvas = document.getElementById('cardCanvas');
            if (canvas) {
                const container = canvas.parentElement;
                const maxWidth = container.clientWidth - 16; // Account for padding
                canvas.style.maxWidth = `${maxWidth}px`;
            }
        }
    }
    
    toggleMobileMenu() {
        // Create mobile menu overlay
        const existingMenu = document.getElementById('mobileMenu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.id = 'mobileMenu';
        menu.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end';
        menu.innerHTML = `
            <div class="bg-white rounded-t-2xl w-full p-4 pb-8">
                <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div class="space-y-3">
                    <button class="w-full p-3 text-left flex items-center space-x-3" onclick="app.shareCard(); document.getElementById('mobileMenu').remove();">
                        <i class="fas fa-share-alt text-purple-600"></i>
                        <span>Share Card</span>
                    </button>
                    <button class="w-full p-3 text-left flex items-center space-x-3" onclick="app.downloadCard(); document.getElementById('mobileMenu').remove();">
                        <i class="fas fa-download text-purple-600"></i>
                        <span>Download</span>
                    </button>
                    <button class="w-full p-3 text-left flex items-center space-x-3" onclick="app.copyCard(); document.getElementById('mobileMenu').remove();">
                        <i class="fas fa-copy text-purple-600"></i>
                        <span>Copy to Clipboard</span>
                    </button>
                    <button class="w-full p-3 text-left flex items-center space-x-3" onclick="document.getElementById('mobileMenu').remove();">
                        <i class="fas fa-times text-gray-600"></i>
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Close on background click
        menu.addEventListener('click', (e) => {
            if (e.target === menu) {
                menu.remove();
            }
        });
    }
    
    switchMobileTab(tab) {
        // Update nav button states
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            const icon = btn.querySelector('i');
            if (btn.dataset.tab === tab) {
                icon.classList.remove('text-gray-600');
                icon.classList.add('text-purple-600');
            } else {
                icon.classList.remove('text-purple-600');
                icon.classList.add('text-gray-600');
            }
        });
        
        // Show appropriate content
        const sections = ['message', 'templates', 'effects'];
        sections.forEach(section => {
            const content = document.getElementById(`${section}-section`);
            const toggle = document.querySelector(`[data-section="${section}"]`);
            
            if (tab === 'create' && section === 'message') {
                content?.classList.remove('hidden');
                toggle?.querySelector('.fa-chevron-down')?.classList.add('rotate-180');
            } else if (tab === 'templates' && section === 'templates') {
                content?.classList.remove('hidden');
                toggle?.querySelector('.fa-chevron-down')?.classList.add('rotate-180');
            } else if (tab === 'effects' && section === 'effects') {
                content?.classList.remove('hidden');
                toggle?.querySelector('.fa-chevron-down')?.classList.add('rotate-180');
            } else if (tab === 'history') {
                this.showMobileHistory();
            }
        });
    }
    
    showMobileHistory() {
        // Create history modal for mobile
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end';
        modal.id = 'historyModal';
        
        modal.innerHTML = `
            <div class="bg-white rounded-t-2xl w-full max-h-[70vh] overflow-hidden">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 class="text-lg font-bold text-gray-800">Recent Cards</h2>
                    <button onclick="document.getElementById('historyModal').remove()" class="p-2">
                        <i class="fas fa-times text-gray-600"></i>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
                    ${this.state.history.length > 0 ? `
                        <div class="grid grid-cols-2 gap-3">
                            ${this.state.history.map(card => `
                                <div class="aspect-[3/4] rounded-lg overflow-hidden" onclick="app.loadFromHistory('${card.id}')">
                                    <img src="${card.image}" alt="Card" class="w-full h-full object-cover">
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 text-gray-500">
                            <i class="fas fa-clock text-4xl mb-2"></i>
                            <p>No recent cards</p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    loadFromHistory(cardId) {
        const card = this.state.history.find(c => c.id == cardId);
        if (card) {
            this.state.currentMessage = card.message;
            this.state.selectedTemplate = card.template;
            document.getElementById('messageInput').value = card.message;
            this.updatePreview();
            document.getElementById('historyModal')?.remove();
            this.showToast('Card loaded from history', 'success');
        }
    }
    
    async generateMessage() {
        // Check if user has a custom message
        const messageInput = document.getElementById('messageInput');
        if (messageInput && messageInput.value.trim()) {
            const confirmOverwrite = confirm('You have a custom message. Do you want to replace it with an AI-generated message?');
            if (!confirmOverwrite) {
                return;
            }
        }
        
        const btn = document.getElementById('generateMessageBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Generating...';
        btn.disabled = true;
        
        try {
            const message = await this.ai.generateCompliment({
                occasion: this.state.selectedOccasion,
                recipient: this.state.recipient,
                tone: this.state.tone,
                interests: this.state.interests
            });
            
            if (messageInput) {
                messageInput.value = message;
            }
            this.state.currentMessage = message;
            this.updatePreview();
            
            // Apply effects if any are selected
            this.applyEffects();
            
            this.showToast('AI message generated!', 'success');
        } catch (error) {
            this.showToast('Failed to generate message', 'error');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }
    
    async enhanceMessage() {
        const messageInput = document.getElementById('messageInput');
        const currentMessage = messageInput ? messageInput.value.trim() : this.state.currentMessage;
        
        if (!currentMessage) {
            this.showToast('Please enter a message first', 'warning');
            return;
        }
        
        const btn = document.getElementById('enhanceBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Enhancing...';
        btn.disabled = true;
        
        try {
            const enhanced = await this.ai.enhanceMessage(currentMessage);
            if (messageInput) {
                messageInput.value = enhanced;
            }
            this.state.currentMessage = enhanced;
            this.updatePreview();
            
            this.showToast('Message enhanced with AI!', 'success');
        } catch (error) {
            this.showToast('Failed to enhance message', 'error');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }
    
    setCustomMessage() {
        const messageInput = document.getElementById('messageInput');
        if (!messageInput) return;
        
        const message = messageInput.value.trim();
        if (!message) {
            this.showToast('Please enter a message', 'warning');
            return;
        }
        
        this.state.currentMessage = message;
        this.updatePreview();
        
        // Visual feedback
        const btn = document.getElementById('setMessageBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Message Set!';
        btn.classList.remove('from-green-500', 'to-green-600');
        btn.classList.add('from-green-600', 'to-green-700');
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.classList.remove('from-green-600', 'to-green-700');
            btn.classList.add('from-green-500', 'to-green-600');
        }, 2000);
        
        this.showToast('Message set successfully!', 'success');
    }
    
    selectTemplate(templateId) {
        this.state.selectedTemplate = templateId;
        
        // Update UI
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-2', 'shadow-lg');
        });
        document.querySelector(`[data-template="${templateId}"]`)?.classList.add('ring-2', 'ring-purple-500', 'ring-offset-2', 'shadow-lg');
        
        // Always update preview to show the template background
        this.updatePreview();
    }
    
    selectFullTemplate(template) {
        // Store the full template object for advanced templates
        this.state.selectedTemplate = template.id;
        this.state.selectedTemplateData = template;
        
        // Update UI for basic template cards
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-2', 'shadow-lg');
        });
        
        // Check if it's a basic template and update UI
        // Handle both simple IDs and compound IDs (e.g., "birthday-modern")
        const basicId = template.id.includes('-') ? template.id.split('-')[1] : template.id;
        document.querySelector(`[data-template="${basicId}"]`)?.classList.add('ring-2', 'ring-purple-500', 'ring-offset-2', 'shadow-lg');
        
        // Always update preview to show the template background
        this.updatePreview();
    }
    
    updatePreview() {
        const canvas = document.getElementById('cardCanvas');
        if (!canvas) return;
        
        try {
            // Render card with or without message
            this.canvas.renderCard(canvas, {
                message: this.state.currentMessage || 'Your message here...',
                template: this.state.selectedTemplate || 'modern',
                recipient: this.state.recipient,
                occasion: this.state.selectedOccasion
            });
        } catch (error) {
            console.error('Error rendering card:', error);
            this.showToast('Failed to update preview. Please try again.', 'error');
        }
    }
    
    applyEffects() {
        // Apply selected effects
        const selectedEffects = Array.from(document.querySelectorAll('input[data-effect]:checked'))
            .map(input => input.dataset.effect);
        
        // Clear any existing effects first
        this.clearEffects();
        
        if (selectedEffects.includes('confetti')) {
            this.effects.showConfetti();
        }
        
        if (selectedEffects.includes('sparkles')) {
            const canvasContainer = document.querySelector('#cardCanvas').parentElement;
            this.effects.addSparkles(canvasContainer);
        }
        
        if (selectedEffects.includes('3d')) {
            const canvas = document.getElementById('cardCanvas');
            this.effects.apply3DFlip(canvas);
        }
        
        if (selectedEffects.includes('glow')) {
            const canvas = document.getElementById('cardCanvas');
            canvas.classList.add('glow-effect');
        }
    }
    
    clearEffects() {
        // Remove existing sparkles
        document.querySelectorAll('.sparkle').forEach(el => el.remove());
        
        // Remove 3D effect
        const canvas = document.getElementById('cardCanvas');
        if (canvas) {
            canvas.style.transform = '';
            canvas.classList.remove('glow-effect');
        }
    }
    
    async createCard() {
        if (!this.state.currentMessage) {
            this.showToast('Please add a message first', 'warning');
            return;
        }
        
        const btn = document.getElementById('createCardBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating...';
        btn.disabled = true;
        
        try {
            // Update preview
            this.updatePreview();
            
            // Apply effects
            this.applyEffects();
            
            // Save to history
            this.saveToHistory();
            
            this.showToast('Card created successfully!', 'success');
        } catch (error) {
            this.showToast('Failed to create card', 'error');
        } finally {
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 1000);
        }
    }
    
    downloadCard() {
        const canvas = document.getElementById('cardCanvas');
        if (!canvas) return;
        
        try {
            const link = document.createElement('a');
            link.download = `compliment-card-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
            
            this.showToast('Card downloaded as PNG!', 'success');
        } catch (error) {
            console.error('Failed to download card:', error);
            this.showToast('Failed to download card. Please try again.', 'error');
        }
    }
    
    async downloadGif() {
        const canvas = document.getElementById('cardCanvas');
        if (!canvas) return;
        
        // Check if GIF library is available
        if (typeof window.GIF === 'undefined') {
            this.showToast('GIF library is loading. Please try again in a moment.', 'warning');
            console.error('GIF library not loaded');
            
            // Try to load it dynamically
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/gif.js@0.2.0/dist/gif.js';
            script.onload = () => {
                this.showToast('GIF library loaded. Please try again.', 'success');
            };
            document.head.appendChild(script);
            return;
        }
        
        const btn = document.getElementById('downloadGifBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Creating...';
        btn.disabled = true;
        
        try {
            // Get selected effects
            const selectedEffects = Array.from(document.querySelectorAll('input[data-effect]:checked'))
                .map(input => input.dataset.effect);
            
            console.log('Selected effects for GIF:', selectedEffects);
            
            // Show progress toast
            this.showToast('Creating HD animated GIF... This may take a few seconds', 'info');
            
            // Generate GIF with effects
            const blob = await this.gifGenerator.generateGif(canvas, {
                message: this.state.currentMessage,
                template: this.state.selectedTemplate,
                recipient: this.state.recipient,
                occasion: this.state.selectedOccasion,
                effects: selectedEffects
            });
            
            if (!blob) {
                throw new Error('No blob generated');
            }
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `compliment-card-animated-${Date.now()}.gif`;
            link.href = url;
            link.click();
            
            // Clean up
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            this.showToast('Animated GIF downloaded successfully!', 'success');
        } catch (error) {
            console.error('Failed to generate GIF:', error);
            this.showToast(`Failed to create GIF: ${error.message}`, 'error');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }
    
    async copyCard() {
        const canvas = document.getElementById('cardCanvas');
        if (!canvas) return;
        
        try {
            // Check if ClipboardItem is supported
            if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
                canvas.toBlob(async (blob) => {
                    try {
                        const item = new ClipboardItem({ 'image/png': blob });
                        await navigator.clipboard.write([item]);
                        this.showToast('Card copied to clipboard!', 'success');
                    } catch (error) {
                        console.error('Failed to copy image:', error);
                        this.fallbackCopyMethod(canvas);
                    }
                });
            } else {
                // Fallback for browsers that don't support ClipboardItem
                this.fallbackCopyMethod(canvas);
            }
        } catch (error) {
            console.error('Failed to copy card:', error);
            this.fallbackCopyMethod(canvas);
        }
    }
    
    fallbackCopyMethod(canvas) {
        // Try to copy the data URL as text
        try {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(dataUrl).then(() => {
                    this.showToast('Card data copied as text. Paste in an image editor.', 'info');
                }).catch(() => {
                    this.showToast('Copy not supported in this browser. Please use download instead.', 'warning');
                });
            } else {
                // Ultimate fallback - show download button
                this.showToast('Copy not supported. Please use the download button instead.', 'warning');
            }
        } catch (error) {
            this.showToast('Copy not supported. Please use the download button instead.', 'warning');
        }
    }
    
    async shareCard() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Compliment Card',
                    text: this.state.currentMessage || 'Check out this beautiful card!',
                    url: window.location.href
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    this.showToast('Failed to share', 'error');
                }
            }
        } else {
            // Fallback - copy link
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Link copied to clipboard!', 'success');
        }
    }
    
    saveToHistory() {
        const canvas = document.getElementById('cardCanvas');
        if (!canvas) return;
        
        try {
            const cardData = {
                id: Date.now(),
                image: canvas.toDataURL('image/png', 0.8), // Use lower quality for storage
                message: this.state.currentMessage,
                template: this.state.selectedTemplate,
                timestamp: new Date().toISOString()
            };
            
            this.state.history.unshift(cardData);
            if (this.state.history.length > 9) {
                this.state.history = this.state.history.slice(0, 9);
            }
            
            // Try to save to localStorage with error handling
            try {
                localStorage.setItem('cardHistory', JSON.stringify(this.state.history));
            } catch (storageError) {
                if (storageError.name === 'QuotaExceededError') {
                    // Clear old history if quota exceeded
                    console.warn('Storage quota exceeded, clearing old history');
                    this.state.history = this.state.history.slice(0, 5); // Keep only 5 most recent
                    try {
                        localStorage.setItem('cardHistory', JSON.stringify(this.state.history));
                    } catch (retryError) {
                        console.error('Failed to save history even after cleanup:', retryError);
                        this.showToast('Storage full. History not saved.', 'warning');
                    }
                } else {
                    console.error('Failed to save history:', storageError);
                }
            }
            
            this.renderHistory();
        } catch (error) {
            console.error('Failed to save to history:', error);
            this.showToast('Failed to save to history', 'error');
        }
    }
    
    loadHistory() {
        try {
            const saved = localStorage.getItem('cardHistory');
            if (saved) {
                this.state.history = JSON.parse(saved);
                // Validate history data
                this.state.history = this.state.history.filter(item => 
                    item && item.id && item.image && item.message
                );
                this.renderHistory();
            }
        } catch (error) {
            console.error('Failed to load history:', error);
            this.state.history = [];
            // Try to clear corrupted data
            try {
                localStorage.removeItem('cardHistory');
            } catch (clearError) {
                console.error('Failed to clear corrupted history:', clearError);
            }
        }
    }
    
    renderHistory() {
        const grid = document.getElementById('historyGrid');
        if (!grid) return;
        
        if (this.state.history.length === 0) {
            grid.innerHTML = '<div class="text-xs text-gray-500 col-span-3 text-center py-4">No recent cards</div>';
        } else {
            grid.innerHTML = this.state.history.slice(0, 9).map(card => `
                <div class="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all" data-history-id="${card.id}">
                    <img src="${card.image}" alt="Card" class="w-full h-full object-cover">
                </div>
            `).join('');
        }
    }
    
    clearHistory() {
        if (confirm('Clear all history?')) {
            this.state.history = [];
            try {
                localStorage.removeItem('cardHistory');
                this.renderHistory();
                this.showToast('History cleared', 'info');
            } catch (error) {
                console.error('Failed to clear history:', error);
                this.showToast('Failed to clear history', 'error');
            }
        }
    }
    
    async suggestIdeas() {
        const btn = document.getElementById('suggestBtn');
        btn.disabled = true;
        
        try {
            const suggestions = await this.ai.getSuggestions(this.state.selectedOccasion);
            
            // Show suggestions in a modal or alert
            const suggestionText = suggestions.join('\n• ');
            alert('💡 Suggestions:\n\n• ' + suggestionText);
        } catch (error) {
            this.showToast('Failed to get suggestions', 'error');
        } finally {
            btn.disabled = false;
        }
    }
    
    async autoGenerate() {
        await this.generateMessage();
        setTimeout(() => this.createCard(), 500);
    }
    
    showAllTemplates() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto';
        modal.id = 'templateModal';
        
        // Complete list of all enhanced templates
        const templateCategories = {
            'Basic': [
                { id: 'modern', gradient: 'from-purple-400 to-pink-400', label: 'Modern', icon: '✨' },
                { id: 'vintage', gradient: 'from-yellow-400 to-orange-400', label: 'Vintage', icon: '🎨' },
                { id: 'minimal', gradient: 'from-gray-300 to-gray-500', label: 'Minimal', icon: '⚪' },
                { id: 'professional', gradient: 'from-gray-600 to-gray-800', label: 'Professional', icon: '💼' },
                { id: 'romantic', gradient: 'from-pink-400 to-red-400', label: 'Romantic', icon: '💕' }
            ],
            'Nature Scenes': [
                { id: 'forest', gradient: 'from-green-600 to-green-800', label: 'Forest', icon: '🌲' },
                { id: 'river', gradient: 'from-blue-300 to-cyan-500', label: 'River', icon: '🏞️' },
                { id: 'mountains', gradient: 'from-gray-400 to-blue-300', label: 'Mountains', icon: '🏔️' },
                { id: 'sunset', gradient: 'from-orange-400 to-pink-500', label: 'Sunset', icon: '🌅' },
                { id: 'ocean', gradient: 'from-blue-400 to-blue-600', label: 'Ocean', icon: '🌊' },
                { id: 'desert', gradient: 'from-yellow-400 to-orange-500', label: 'Desert', icon: '🏜️' }
            ],
            'Space & Cosmos': [
                { id: 'galaxy', gradient: 'from-purple-900 to-blue-900', label: 'Galaxy', icon: '🌌' },
                { id: 'cosmos', gradient: 'from-indigo-900 to-purple-900', label: 'Cosmos', icon: '🪐' },
                { id: 'aurora', gradient: 'from-green-400 to-purple-600', label: 'Aurora', icon: '🌠' }
            ],
            'Artistic Styles': [
                { id: 'watercolor', gradient: 'from-pink-200 to-blue-200', label: 'Watercolor', icon: '🎨' },
                { id: 'oilPainting', gradient: 'from-amber-600 to-brown-600', label: 'Oil Painting', icon: '🖼️' },
                { id: 'sketch', gradient: 'from-gray-200 to-gray-400', label: 'Sketch', icon: '✏️' },
                { id: 'abstractArt', gradient: 'from-red-400 via-yellow-400 to-blue-400', label: 'Abstract Art', icon: '🎭' }
            ],
            'Patterns': [
                { id: 'butterflies', gradient: 'from-pink-300 to-purple-400', label: 'Butterflies', icon: '🦋' },
                { id: 'flowers', gradient: 'from-pink-400 to-red-400', label: 'Flowers', icon: '🌸' },
                { id: 'leaves', gradient: 'from-green-400 to-emerald-500', label: 'Leaves', icon: '🍃' }
            ],
            'Retro & Vintage': [
                { id: 'retro70s', gradient: 'from-orange-500 to-red-600', label: 'Retro 70s', icon: '🕺' },
                { id: 'artDeco', gradient: 'from-yellow-600 to-gray-800', label: 'Art Deco', icon: '🏛️' },
                { id: 'vintagePostcard', gradient: 'from-amber-200 to-amber-400', label: 'Vintage Postcard', icon: '📮' },
                { id: 'polaroid', gradient: 'from-gray-100 to-gray-300', label: 'Polaroid', icon: '📸' }
            ],
            'Travel & Places': [
                { id: 'paris', gradient: 'from-purple-300 to-pink-300', label: 'Paris', icon: '🗼' },
                { id: 'tokyo', gradient: 'from-pink-300 to-red-300', label: 'Tokyo', icon: '🗾' },
                { id: 'newyork', gradient: 'from-blue-400 to-gray-600', label: 'New York', icon: '🗽' },
                { id: 'beach', gradient: 'from-cyan-300 to-blue-400', label: 'Beach', icon: '🏖️' }
            ],
            'Modern & Geometric': [
                { id: 'geometric', gradient: 'from-purple-500 to-blue-500', label: 'Geometric', icon: '💠' },
                { id: 'memphis', gradient: 'from-pink-400 via-yellow-400 to-cyan-400', label: 'Memphis', icon: '🔶' },
                { id: 'neonCity', gradient: 'from-purple-600 to-pink-600', label: 'Neon City', icon: '🌃' },
                { id: 'minimalistGold', gradient: 'from-white to-yellow-200', label: 'Minimalist Gold', icon: '✨' }
            ],
            'Seasonal': [
                { id: 'autumn', gradient: 'from-orange-400 to-red-500', label: 'Autumn', icon: '🍂' },
                { id: 'winter', gradient: 'from-blue-200 to-gray-300', label: 'Winter', icon: '❄️' },
                { id: 'spring', gradient: 'from-pink-200 to-green-200', label: 'Spring', icon: '🌷' }
            ]
        };
        
        // Count total templates
        const totalTemplates = Object.values(templateCategories).reduce((sum, cat) => sum + cat.length, 0);
        
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden my-8">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">All Templates (${totalTemplates})</h2>
                        <p class="text-xs text-gray-600 mt-1">Click any template to apply it to your card</p>
                    </div>
                    <button onclick="document.getElementById('templateModal').remove()" class="p-2 hover:bg-gray-100 rounded-lg">
                        <i class="fas fa-times text-gray-600"></i>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
                    ${Object.entries(templateCategories).map(([category, templates]) => `
                        <div class="mb-6">
                            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                ${category}
                            </h3>
                            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                ${templates.map(temp => `
                                    <div class="template-modal-card cursor-pointer transform transition-all hover:scale-105" data-template-id="${temp.id}">
                                        <div class="aspect-[3/4] bg-gradient-to-br ${temp.gradient} rounded-lg relative hover:ring-2 hover:ring-purple-500 hover:shadow-lg ${temp.id === this.state.selectedTemplate ? 'ring-2 ring-purple-500 ring-offset-2' : ''}">
                                            <div class="absolute top-2 left-2 text-2xl">${temp.icon}</div>
                                            <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                                                <p class="text-white text-xs font-medium truncate">${temp.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add click handlers for template selection
        modal.querySelectorAll('.template-modal-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.dataset.templateId;
                this.selectTemplate(templateId);
                
                // Update visual selection in modal
                modal.querySelectorAll('.template-modal-card > div').forEach(div => {
                    div.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-2');
                });
                card.querySelector('div').classList.add('ring-2', 'ring-purple-500', 'ring-offset-2');
                
                // Close modal after short delay
                setTimeout(() => {
                    modal.remove();
                    this.showToast(`Selected ${templateId} template`, 'success');
                }, 300);
            });
        });
        
        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    getGradientClass(template) {
        // Map template styles to Tailwind gradient classes
        const gradientMap = {
            'birthday-modern': 'from-purple-400 to-pink-400',
            'birthday-vintage': 'from-yellow-400 to-orange-400',
            'birthday-minimal': 'from-gray-300 to-gray-400',
            'birthday-kids': 'from-pink-300 to-yellow-300',
            'birthday-milestone': 'from-purple-500 to-indigo-500',
            'love-romantic': 'from-red-400 to-pink-400',
            'love-anniversary': 'from-yellow-400 to-amber-400',
            'love-valentine': 'from-red-500 to-pink-500',
            'love-wedding': 'from-gray-200 to-gray-300',
            'thanks-grateful': 'from-blue-400 to-cyan-400',
            'thanks-professional': 'from-gray-500 to-gray-700',
            'thanks-floral': 'from-pink-300 to-orange-300',
            'congrats-achievement': 'from-purple-400 to-indigo-400',
            'congrats-graduation': 'from-blue-500 to-blue-700',
            'congrats-promotion': 'from-green-400 to-teal-400',
            'congrats-newBaby': 'from-pink-200 to-blue-200',
            'seasonal-christmas': 'from-red-500 to-green-500',
            'seasonal-halloween': 'from-orange-500 to-purple-500',
            'seasonal-easter': 'from-green-300 to-yellow-300',
            'seasonal-newyear': 'from-blue-500 to-purple-500',
            'styles-watercolor': 'from-pink-200 to-blue-200',
            'styles-neon': 'from-purple-600 to-pink-600',
            'styles-retro80s': 'from-pink-500 to-purple-500',
            'styles-japanese': 'from-gray-200 to-pink-200',
            'styles-galaxy': 'from-purple-900 to-blue-900',
            'styles-tropical': 'from-green-400 to-cyan-400'
        };
        
        return gradientMap[template.id] || 'from-gray-400 to-gray-600';
    }
    
    initParticles() {
        // Simplified particle system for performance
        const particleCount = 10;
        const main = document.querySelector('main');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-purple-400 rounded-full opacity-50';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${10 + Math.random() * 10}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 10 + 's';
            main.appendChild(particle);
        }
    }
    
    showToast(message, type = 'info') {
        const colors = {
            success: 'from-green-500 to-emerald-500',
            error: 'from-red-500 to-pink-500',
            warning: 'from-yellow-500 to-orange-500',
            info: 'from-blue-500 to-indigo-500'
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 bg-gradient-to-r ${colors[type]} text-white rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-pulse`;
        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ComplimentCardsApp();
}); 