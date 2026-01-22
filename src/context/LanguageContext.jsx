import React, { createContext, useState, useEffect } from 'react'
import i18n from '../i18n'

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en')
  const isRTL = language === 'ar'

  useEffect(() => {
    localStorage.setItem('language', language)
    i18n.changeLanguage(language)
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}
