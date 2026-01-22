import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      {/* Hero Section */}
      <div className="text-white text-center py-20 px-6">
        <h1 className="text-6xl font-bold mb-6">{t('common.appName')}</h1>
        <p className="text-2xl mb-12 max-w-2xl mx-auto">
          {t('academy.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
          <Link
            to="/academy"
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            🎓 {t('navigation.academy')}
          </Link>
          <Link
            to="/dashboard"
            className="bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition shadow-lg"
          >
            📊 {t('navigation.dashboard')}
          </Link>
          <Link
            to="/healthmap"
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            🗺️ {t('navigation.healthmap')}
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">{t('common.appName')} {t('navigation.about')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1: Academy */}
            <div className="text-center">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t('academy.title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('academy.subtitle')}. {t('academy.courses')}, {t('academy.certifications')}, and comprehensive learning resources.
              </p>
              <Link to="/academy" className="text-secondary font-bold hover:underline">
                {t('buttons.next')} →
              </Link>
            </div>

            {/* Feature 2: Dashboard */}
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t('dashboard.title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('dashboard.subtitle')}. Track inspections, monitor compliance, and manage restaurant health scores.
              </p>
              <Link to="/dashboard" className="text-secondary font-bold hover:underline">
                {t('buttons.next')} →
              </Link>
            </div>

            {/* Feature 3: Health Map */}
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t('healthmap.title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('healthmap.subtitle')}. Search, filter, and explore restaurants across all NYC boroughs.
              </p>
              <Link to="/healthmap" className="text-secondary font-bold hover:underline">
                {t('buttons.next')} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
          <div>
            <div className="text-5xl font-bold mb-2">50+</div>
            <p className="text-lg">{t('academy.courses')}</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">10K+</div>
            <p className="text-lg">{t('academy.enrolled')}</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">5</div>
            <p className="text-lg">NYC Boroughs</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">1000+</div>
            <p className="text-lg">Restaurants</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">&copy; 2026 SafeFood NYC Academy. All rights reserved.</p>
          <p className="text-sm">Building a safer food system for New York City</p>
        </div>
      </div>
    </div>
  )
}
