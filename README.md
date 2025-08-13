# 🎨 Compliment Cards 2.0

Create beautiful, personalized compliment cards with AI-powered messages and stunning visual effects. Perfect for spreading positivity and making someone's day special!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

## ✨ Features

### 🤖 AI-Powered Content
- **Smart Message Generation** - AI creates personalized compliments based on recipient and occasion
- **Multiple Tones** - Choose from friendly, professional, romantic, funny, or inspirational
- **Auto-Suggestions** - Get instant ideas when you need inspiration

### 🎨 Rich Template Library
- **30+ Unique Templates** - From artistic watercolors to space themes
- **Categories Include:**
  - 🎨 Artistic (Watercolor, Oil Painting, Sketch)
  - 🌿 Nature (Forest, Ocean, Mountains, Sunset)
  - 🌌 Space (Galaxy, Cosmos, Aurora)
  - 🦋 Patterns (Butterflies, Flowers, Leaves)
  - 📮 Postcards (Paris, Tokyo, New York, Beach)
  - 🔷 Modern (Geometric, Memphis, Neon)
  - 🍂 Seasonal (Autumn, Winter, Spring)

### 🎭 Visual Effects
- ✨ **Sparkles** - Animated twinkling stars
- 🎊 **Confetti** - Colorful celebration effect
- 💫 **3D Flip** - Dynamic rotation animation
- 🌟 **Glow** - Pulsing light effect

### 📱 Mobile Optimized
- **Responsive Design** - Works perfectly on all devices
- **Touch Gestures** - Swipe to browse templates
- **PWA Support** - Install as an app on your phone
- **Offline Mode** - Works without internet connection

### 🎬 Export Options
- **PNG Download** - High-quality static images
- **Animated GIF** - With all effects included
- **Copy to Clipboard** - Quick sharing
- **Native Share** - Direct sharing on mobile

## 🚀 Quick Start

### Deploy to Vercel (Recommended)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Clone the repository
4. Deploy instantly!

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/compliment-cards.git

# Navigate to project
cd compliment-cards

# Start a local server (Python)
python -m http.server 8000

# Or using Node.js
npx http-server

# Open in browser
http://localhost:8000
```

## 🛠️ Technology Stack

- **Frontend:** Vanilla JavaScript, HTML5 Canvas
- **Styling:** Tailwind CSS (via CDN)
- **AI:** Google Gemini API
- **GIF Generation:** gif.js library
- **PWA:** Service Worker for offline support
- **Deployment:** Optimized for Vercel

## 📂 Project Structure

```
compliment-cards/
├── index.html          # Main application
├── styles.css          # Custom styles
├── manifest.json       # PWA configuration
├── service-worker.js   # Offline support
├── vercel.json        # Vercel configuration
├── js/
│   ├── app.js         # Main application logic
│   ├── ai-engine.js   # AI integration
│   ├── canvas-engine.js # Card rendering
│   ├── templates.js   # Template definitions
│   ├── effects.js     # Visual effects
│   └── gif-generator.js # GIF creation
├── assets/
│   ├── icon.svg       # App icon
│   └── favicon.svg    # Favicon
└── gif.worker.js      # Web Worker for GIF generation
```

## 🎯 Usage

1. **Enter a Message** - Type your compliment or use AI to generate one
2. **Choose a Template** - Select from 30+ beautiful designs
3. **Add Effects** - Toggle sparkles, confetti, or other animations
4. **Customize** - Add recipient name and select occasion
5. **Create & Share** - Download as image/GIF or share directly

## 🔒 Privacy

- No user data is stored on servers
- All processing happens in your browser
- API keys are stored locally (never shared)
- Complete privacy and security

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Made with ❤️ for spreading positivity and joy! 