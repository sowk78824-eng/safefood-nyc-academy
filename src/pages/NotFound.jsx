import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center">
        <AlertTriangle size={80} className="mx-auto mb-6 text-yellow-600" />
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('errors.notFound')}</h1>
        <p className="text-lg text-gray-600 mb-2">Page non trouvée / Page not found</p>
        <p className="text-md text-gray-500 mb-8">La page que vous recherchez n'existe pas. Veuillez retourner à l'accueil.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition shadow-md"
          >
            <Home size={20} />
            {t('navigation.home')}
          </Link>
          <Link 
            to="/academy" 
            className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition shadow-md"
          >
            🎓 Academy
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">Liens utiles / Useful Links:</p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <Link to="/resources" className="text-primary hover:underline">Ressources</Link>
            <span className="text-gray-400">•</span>
            <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
            <span className="text-gray-400">•</span>
            <Link to="/healthmap" className="text-primary hover:underline">Health Map</Link>
            <span className="text-gray-400">•</span>
            <Link to="/auth" className="text-primary hover:underline">Connexion</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
