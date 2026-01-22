import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { LanguageProvider, LanguageContext } from './context/LanguageContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Academy from './modules/academy/Academy'
import Dashboard from './modules/dashboard/Dashboard'
import HealthMap from './modules/healthmap/HealthMap'
import NotFound from './pages/NotFound'
import './styles/globals.css'

function AppContent() {
  const { isRTL } = useContext(LanguageContext)

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl-layout' : 'ltr-layout'}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/healthmap" element={<HealthMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </I18nextProvider>
  )
}

export default App
