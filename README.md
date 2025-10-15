# NetSTAR Browser Extension 🛡️

A friendly and beautiful browser extension that helps you stay safe online by providing real-time security insights about websites you visit.

![NetSTAR Extension](https://img.shields.io/badge/Browser-Extension-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge)

## ✨ Features

### 🏠 Home Tab
- Real-time safety score for the current website
- Visual indicators showing security health
- Quick overview of 7 security metrics:
  - Certificate Health
  - Connection Security
  - Domain Reputation
  - Credential Safety
  - IP Reputation
  - DNS Record Health
  - WHOIS Pattern

### 🔍 Scan Tab
- Manually scan any URL for security issues
- Recent scan history
- Quick access to previously scanned sites

### 🔔 Alerts Tab
- Three-tier alert system (High/Medium/Low priority)
- Friendly, educational warnings
- Clear action buttons for safety

### 📊 Details View
- Deep dive into individual security indicators
- Educational insights about security concepts
- User-friendly explanations

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Chrome, Edge, or any Chromium-based browser

### Installation

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd extension-proto-1
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Load in Browser**
   - Open `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `dist` folder

## 💻 Development

### Development Mode with Hot Reload 🔥
```bash
npm run dev
```

This starts the development server with **hot module reloading**. Any changes you make to the code will automatically update in the extension without manual reloading!

### Building for Production
```bash
npm run build
```

This command builds an optimized production version of the extension in the `dist` folder.

### Project Structure
```
├── src/
│   ├── manifest.json     # Chrome Extension manifest (Manifest V3)
│   ├── background.js     # Background service worker
│   ├── index.html        # Extension popup HTML
│   ├── popup.jsx         # Main popup entry point with tab navigation
│   ├── index.css         # Tailwind CSS styles
│   ├── icons/            # Extension icons (16px, 48px, 128px)
│   ├── components/
│   │   ├── tabs/         # Tab components
│   │   │   ├── HomeTab.jsx      # Home view with safety score
│   │   │   ├── ScanTab.jsx      # Manual URL scanner
│   │   │   ├── AlertsTab.jsx    # Security alerts
│   │   │   └── DetailsTab.jsx   # Detailed indicator view
│   │   └── ui/           # Reusable UI components (shadcn/ui)
│   └── lib/              # Utility functions
├── dist/                 # Build output (auto-generated)
└── vite.config.js        # Vite configuration
```

## 🎨 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **@crxjs/vite-plugin** - Hot module reloading for Chrome extensions
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Chrome Extension API (Manifest V3)** - Extension functionality

## 🔒 Extension Permissions

The extension requires the following permissions:

- `activeTab` - Access current tab information
- `storage` - Save recent scans and preferences
- `tabs` - Query tab information for auto-scanning
- `<all_urls>` - Scan any website (host permissions)

## 🎯 Features in Development

- [ ] Real security API integration
- [ ] Automatic scanning on page load
- [ ] Custom alert rules
- [ ] Export security reports
- [ ] Multi-language support
- [ ] Proper PNG icons (currently using SVG placeholders)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
- Inspired by modern security practices and user-friendly design

---

**Note:** The security scanning is currently simulated for demonstration purposes. For production use, integrate with real security APIs like Google Safe Browsing, VirusTotal, or similar services.