import React from 'react'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('errors.notFound')}</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition">
          {t('navigation.home')}
        </a>
      </div>
    </div>
  )
}
