# SafeFood NYC Academy - Quick Start Guide

Welcome to SafeFood NYC Academy! Follow these steps to get started.

## 📋 Prerequisites

- **Node.js**: 16.0 or higher
- **npm**: 7.0 or higher
- **Git**: (optional, for version control)

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Quick Start (5 minutes)

### 1. Navigate to Project
```bash
cd /Users/mamadouly/Documents/SafeFood-NYC-Academy
```

### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- React 18
- Vite
- Tailwind CSS
- i18next
- Leaflet
- Recharts

### 3. Start Development Server
```bash
npm run dev
```

You'll see output like:
```
  VITE v5.0.0  ready in 300 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### 4. Open in Browser
Visit: **http://localhost:3000**

## 🌐 Features to Explore

### Home Page
- Overview of all three modules
- Statistics and features
- Navigation to all modules

### 🎓 Professional Academy
- Browse 50+ food safety courses
- Track your progress
- Earn certifications
- View course modules and assessments

**URL**: http://localhost:3000/academy

### 📊 Smart Audit Dashboard
- Manage restaurant profiles
- Track inspection history
- Monitor compliance status
- View violation analytics

**URL**: http://localhost:3000/dashboard

### 🗺️ NYC Health Map
- Interactive map of NYC restaurants
- Search by restaurant name or cuisine
- Filter by borough
- View health scores and violations

**URL**: http://localhost:3000/healthmap

## 🌍 Language Switching

1. Look for the language selector in the top-right corner
2. Choose from 6 languages:
   - 🇺🇸 English
   - 🇫🇷 Français
   - 🇪🇸 Español
   - 🇸🇦 العربية (Arabic - RTL)
   - 🇵🇹 Português
   - 🇨🇳 中文

Your selection is automatically saved and persists on reload!

## 📂 Project Structure

```
src/
├── components/        → Navigation bar component
├── context/          → Language management (Context API)
├── locales/          → Translation files for all 6 languages
├── modules/
│   ├── academy/      → Professional Academy module
│   ├── dashboard/    → Smart Audit Dashboard module
│   └── healthmap/    → NYC Health Map module
├── pages/            → Home and 404 pages
├── styles/           → Global CSS with RTL support
├── App.jsx           → Main app component
├── i18n.js           → i18n configuration
└── main.jsx          → Entry point
```

## 🎨 Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#1a472a',    // Dark Green
      secondary: '#2ecc71',  // Light Green
      accent: '#e74c3c',     // Red
    }
  }
}
```

### Add Mock Data
Edit the sample data in:
- Academy: `src/modules/academy/Academy.jsx` (courses array)
- Dashboard: `src/modules/dashboard/Dashboard.jsx` (restaurants array)
- Health Map: `src/modules/healthmap/HealthMap.jsx` (restaurants array)

### Add New Language
1. Create `src/locales/{lang}.json` with translations
2. Import in `src/i18n.js`
3. Add to language selector in `src/components/Navigation.jsx`

## 🏗️ Production Build

When ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

Preview production build:
```bash
npm run preview
```

## 📱 Testing Responsive Design

1. Open DevTools: `F12` or `Right-click → Inspect`
2. Click the device icon in DevTools
3. Select different devices:
   - iPhone 12 (Mobile)
   - iPad (Tablet)
   - Desktop

## 🔤 RTL Testing (Arabic)

1. Switch language to Arabic (العربية)
2. Notice the layout automatically flips:
   - Text direction changes (right-to-left)
   - Navigation aligns to the right
   - All UI elements mirror appropriately

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### Clear Cache & Reinstall
```bash
rm -rf node_modules
npm install
npm run dev
```

### Module Not Found Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### RTL Not Working
- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Verify browser console for errors (F12)
- Check that Arabic language is selected

## 📊 View Demo Data

All modules come with sample data:

**Academy**: 3 sample courses with different completion statuses
**Dashboard**: 3 sample restaurants with inspection data
**Health Map**: 5 restaurant locations across NYC boroughs

To modify sample data, edit the arrays in each module's component.

## 🔗 Useful URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000/ |
| Academy | http://localhost:3000/academy |
| Dashboard | http://localhost:3000/dashboard |
| Health Map | http://localhost:3000/healthmap |
| 404 Page | http://localhost:3000/invalid |

## 📖 Documentation

- **DEVELOPMENT.md** - Detailed development guide
- **PROJECT_OVERVIEW.md** - Full project architecture
- **SETUP.md** - Technical setup details
- **README.md** - Project introduction

## ✅ MVP Checklist

- ✅ 6 languages fully implemented
- ✅ Professional Academy module
- ✅ Smart Audit Dashboard module
- ✅ NYC Health Map module
- ✅ RTL support for Arabic
- ✅ Responsive design
- ✅ Interactive charts & maps
- ✅ Language persistence
- ✅ Production-ready

## 🎯 Next Steps

1. Explore all three modules
2. Switch between languages
3. Test responsive design
4. Build for production
5. Deploy to your hosting

## 📞 Support

For issues or questions:
1. Check the browser console (F12)
2. Review DEVELOPMENT.md
3. Check PROJECT_OVERVIEW.md

---

**Created**: January 21, 2026  
**Version**: 1.0.0 MVP  
**Status**: ✅ Ready to Use

Happy coding! 🎉
