# SafeFood NYC Academy Development Setup

## Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Project Overview

This is a professional, multilingual food safety ecosystem designed for NYC's culinary industry.

### Core Features

#### 🎓 Professional Academy
- Comprehensive food safety courses
- Certification tracking
- Progress management
- Interactive learning modules

#### 📊 Smart Audit Dashboard
- Restaurant inspection management
- Compliance tracking
- Violation analytics
- Health score monitoring

#### 🗺️ NYC Health Map
- Interactive restaurant locator
- Real-time health violations
- Borough-based filtering
- Detailed restaurant profiles

### Languages Supported
- 🇺🇸 English
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇸🇦 Arabic (RTL)
- 🇵🇹 Portuguese
- 🇨🇳 Chinese

### Technologies Used
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **i18next** - Internationalization
- **Tailwind CSS** - Styling
- **React Leaflet** - Interactive maps
- **Recharts** - Data visualization

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── locales/            # Translation files
├── modules/            # Feature modules
│   ├── academy/        # Academy module
│   ├── dashboard/      # Dashboard module
│   └── healthmap/      # Health Map module
├── pages/              # Page components
├── styles/             # Global styles
├── App.jsx             # Main app component
├── i18n.js             # i18n configuration
└── main.jsx            # Entry point
```

## Language Switching

Language selection is available in the top navigation bar. The selected language persists in localStorage and affects:
- All UI labels and text
- Error messages
- Form validation
- Page direction (RTL for Arabic)

## Customization Guide

### Adding a New Language
1. Create a new translation file in `src/locales/{lang}.json`
2. Update `src/i18n.js` to import the new language
3. Add it to the language selector in `src/components/Navigation.jsx`

### Changing Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#1a472a',    // Dark Green
  secondary: '#2ecc71',  // Light Green
  accent: '#e74c3c',     // Red
}
```

### Adding Mock Data
Edit the sample data arrays in each module:
- Academy: `src/modules/academy/Academy.jsx`
- Dashboard: `src/modules/dashboard/Dashboard.jsx`
- Health Map: `src/modules/healthmap/HealthMap.jsx`

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3001
```

### Clear Cache
```bash
rm -rf node_modules/.vite
npm run dev
```

### RTL Layout Issues
- RTL support is automatic for Arabic language
- Check browser developer tools to verify `dir="rtl"` attribute
- Clear browser cache if styles don't update

## Environment Variables
Create a `.env.local` file for environment-specific settings:
```
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=SafeFood NYC Academy
```

## Production Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy
The `dist/` folder contains production-ready files. Deploy to your hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## Performance Optimization
- Lazy loading of routes
- Image optimization
- Code splitting with Vite
- Minification in production

## Contributing

1. Create a feature branch
2. Make your changes
3. Test across all supported languages
4. Test RTL layout with Arabic
5. Submit a pull request

## Support
For issues and questions, contact: support@safefood-nyc.com

## License
© 2026 SafeFood NYC Academy. All rights reserved.
