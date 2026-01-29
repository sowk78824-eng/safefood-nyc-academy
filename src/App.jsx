import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { LanguageProvider, LanguageContext } from './context/LanguageContext'
import { UserProvider } from './context/UserContext'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Certificates from './pages/Certificates'
import AdminDashboard from './pages/AdminDashboard'
import Forum from './pages/Forum'
import Resources from './pages/Resources'
import Booking from './pages/Booking'
import OnlineOrdering from './pages/OnlineOrdering'
import Academy from './modules/academy/Academy'
import Dashboard from './modules/dashboard/Dashboard'
import HealthMap from './modules/healthmap/HealthMap'
import RestaurantFinder from './modules/finder/RestaurantFinder'
import NotFound from './pages/NotFound'
import './styles/globals.css'

function AppContent() {
  const { isRTL } = useContext(LanguageContext)

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl-layout' : 'ltr-layout'}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/order" element={<OnlineOrdering />} />
        <Route path="/academy" element={<ProtectedRoute><Academy /></ProtectedRoute>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/healthmap" element={<HealthMap />} />
        <Route path="/finder" element={<RestaurantFinder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <UserProvider>
          <Router>
            <AppContent />
          </Router>
        </UserProvider>
      </LanguageProvider>
    </I18nextProvider>
  )
}

export default App
