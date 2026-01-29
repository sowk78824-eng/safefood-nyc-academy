import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext'
import { useUser } from '../context/UserContext'
import { User, Trophy, LogOut, Award, MessageCircle, Library, Settings, ShoppingCart } from 'lucide-react'

export default function Navigation() {
  const { t } = useTranslation()
  const { language, setLanguage, isRTL } = useContext(LanguageContext)
  const { user, logout } = useUser()

  const languages = [
    { code: 'en', name: t('common.english') },
    { code: 'fr', name: t('common.french') },
    { code: 'es', name: t('common.spanish') },
    { code: 'ar', name: t('common.arabic') },
    { code: 'pt', name: t('common.portuguese') },
    { code: 'zh', name: t('common.chinese') }
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className={`bg-primary text-white p-4 shadow-lg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-secondary">{t('common.appName')}</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-secondary transition">{t('navigation.home')}</Link>
            <Link to="/academy" className="hover:text-secondary transition">{t('navigation.academy')}</Link>
            <Link to="/dashboard" className="hover:text-secondary transition">{t('navigation.dashboard')}</Link>
            <Link to="/healthmap" className="hover:text-secondary transition">{t('navigation.healthmap')}</Link>
            <Link to="/finder" className="hover:text-secondary transition">{t('navigation.finder')}</Link>
            <Link to="/booking" className="hover:text-secondary transition">Dining</Link>
            <Link to="/order" className="hover:text-secondary transition">Order Online</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Leaderboard Link */}
          <Link 
            to="/leaderboard" 
            className="flex items-center gap-2 hover:text-secondary transition"
          >
            <Trophy size={20} />
            <span className="hidden md:inline">Leaderboard</span>
          </Link>

          {/* Certificates Link */}
          {user && (
            <Link 
              to="/certificates" 
              className="flex items-center gap-2 hover:text-secondary transition"
            >
              <Award size={20} />
              <span className="hidden md:inline">Certificates</span>
            </Link>
          )}

          {/* Forum Link */}
          {user && (
            <Link 
              to="/forum" 
              className="flex items-center gap-2 hover:text-secondary transition"
            >
              <MessageCircle size={20} />
              <span className="hidden md:inline">Forum</span>
            </Link>
          )}

          {/* Resources Link */}
          <Link 
            to="/resources" 
            className="flex items-center gap-2 hover:text-secondary transition"
          >
            <Library size={20} />
            <span className="hidden md:inline">Resources</span>
          </Link>

          {/* Admin Dashboard Link */}
          {user && user.role === 'owner' && (
            <Link 
              to="/admin" 
              className="flex items-center gap-2 hover:text-secondary transition"
            >
              <Settings size={20} />
              <span className="hidden md:inline">Admin</span>
            </Link>
          )}

          {/* Language Selector */}
          <label className="text-sm">{t('common.language')}:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-secondary text-primary px-3 py-2 rounded cursor-pointer font-semibold text-sm"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-secondary transition"
              >
                <User size={20} />
                <span className="hidden md:inline text-sm">{user.fullName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition text-sm"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="ml-4 pl-4 border-l border-white flex items-center gap-2 hover:text-secondary transition"
            >
              <User size={20} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
