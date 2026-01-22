# SafeFood NYC Academy - API Documentation

## Project Structure

```
SafeFood-NYC-Academy/
├── src/
│   ├── components/
│   │   └── Navigation.jsx          # Main navigation with language selector
│   ├── context/
│   │   └── LanguageContext.jsx     # Language state management
│   ├── locales/
│   │   ├── en.json                 # English translations
│   │   ├── fr.json                 # French translations
│   │   ├── es.json                 # Spanish translations
│   │   ├── ar.json                 # Arabic translations (RTL)
│   │   ├── pt.json                 # Portuguese translations
│   │   └── zh.json                 # Chinese translations
│   ├── modules/
│   │   ├── academy/
│   │   │   └── Academy.jsx         # Professional Academy module
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx       # Smart Audit Dashboard module
│   │   └── healthmap/
│   │       └── HealthMap.jsx       # NYC Health Map module
│   ├── pages/
│   │   ├── Home.jsx                # Home page
│   │   └── NotFound.jsx            # 404 page
│   ├── styles/
│   │   └── globals.css             # Global styles with RTL support
│   ├── App.jsx                     # Main App component
│   ├── i18n.js                     # i18n configuration
│   └── main.jsx                    # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Features

### ✅ Implemented

1. **6 Language Support**
   - English (Default)
   - French
   - Spanish
   - Arabic (RTL)
   - Portuguese
   - Chinese
   - Language preference stored in localStorage

2. **Professional Academy Module**
   - Course catalog with progress tracking
   - Certification management
   - Interactive course cards with status badges
   - Progress visualization with charts
   - Enrollment statistics

3. **Smart Audit Dashboard Module**
   - Restaurant management and KPIs
   - Compliance trend visualization
   - Violation type breakdown (Critical/Major/Minor)
   - Inspection history tracking
   - Restaurant health scoring system
   - Dynamic health score color-coding

4. **NYC Health Map Module**
   - Interactive Leaflet map with NYC restaurant locations
   - Real-time search functionality
   - Borough-based filtering
   - Restaurant detail cards
   - Score-based color marking
   - Responsive design for mobile and desktop

5. **UI/UX Features**
   - Responsive design (mobile, tablet, desktop)
   - Professional color scheme (Green, Light Green, Red)
   - RTL layout support for Arabic
   - Smooth transitions and hover effects
   - Dark navigation bar with language selector
   - Tailwind CSS for utility-first styling
   - Clean, modern design language

## API Routes

### Navigation Routes
- `/` - Home page
- `/academy` - Professional Academy
- `/dashboard` - Smart Audit Dashboard
- `/healthmap` - NYC Health Map

## Language Management

All UI elements are managed through i18n with automatic RTL support for Arabic:
```jsx
const { t } = useTranslation()
const { language, setLanguage, isRTL } = useContext(LanguageContext)
```

## Customization

### Adding New Courses/Restaurants
Edit the sample data in respective module files:
- Academy courses: `src/modules/academy/Academy.jsx` (courses array)
- Dashboard restaurants: `src/modules/dashboard/Dashboard.jsx` (restaurants array)
- Health Map restaurants: `src/modules/healthmap/HealthMap.jsx` (restaurants array)

### Styling
Modify colors in `tailwind.config.js`:
```js
colors: {
  primary: '#1a472a',    // Dark Green
  secondary: '#2ecc71',  // Light Green
  accent: '#e74c3c',     // Red
  neutral: '#f8f9fa'     // Off White
}
```

## Getting Started

```bash
cd SafeFood-NYC-Academy
npm install
npm run dev
```

Visit `http://localhost:3000`

## Build

```bash
npm run build
```
