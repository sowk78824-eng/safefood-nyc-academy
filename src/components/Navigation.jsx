import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext'

export default function Navigation() {
  const { t } = useTranslation()
  const { language, setLanguage, isRTL } = useContext(LanguageContext)

  const languages = [
    { code: 'en', name: t('common.english') },
    { code: 'fr', name: t('common.french') },
    { code: 'es', name: t('common.spanish') },
    { code: 'ar', name: t('common.arabic') },
    { code: 'pt', name: t('common.portuguese') },
    { code: 'zh', name: t('common.chinese') }
  ]

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
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm">{t('common.language')}:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-secondary text-primary px-3 py-2 rounded cursor-pointer font-semibold"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  )
}
