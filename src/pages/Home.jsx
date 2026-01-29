import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-secondary to-primary text-white text-center py-24 px-6">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">{t('common.appName')}</h1>
        <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto drop-shadow-md font-semibold">
          Sécurité Alimentaire & Formation / Food Safety & Education
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto drop-shadow-md">
          Plateforme complète pour restaurants, employés et managers de NYC
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
          <Link
            to="/academy"
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg transform hover:scale-105 duration-200"
          >
            🎓 Académie
          </Link>
          <Link
            to="/auth"
            className="bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition shadow-lg transform hover:scale-105 duration-200"
          >
            🔐 Se Connecter
          </Link>
          <Link
            to="/healthmap"
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg transform hover:scale-105 duration-200"
          >
            🗺️ Carte Santé
          </Link>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Notre Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
              <h3 className="text-2xl font-bold text-primary mb-4">👨‍💼 Pour les Managers</h3>
              <p className="text-gray-700 mb-4">Gérez la conformité, suivez les inspections, formez votre équipe et maintenez les standards de sécurité alimentaire.</p>
              <Link to="/dashboard" className="text-secondary font-bold hover:underline">En savoir plus →</Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-secondary">
              <h3 className="text-2xl font-bold text-secondary mb-4">👨‍💼 Pour les Employés</h3>
              <p className="text-gray-700 mb-4">Développez vos compétences, obtenez des certificats Food Protection et progressez dans votre carrière.</p>
              <Link to="/academy" className="text-secondary font-bold hover:underline">Commencer →</Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-accent">
              <h3 className="text-2xl font-bold text-accent mb-4">🍽️ Pour les Restaurants</h3>
              <p className="text-gray-700 mb-4">Consultez votre score santé, accédez aux ressources et améliorez vos pratiques d'hygiène alimentaire.</p>
              <Link to="/finder" className="text-accent font-bold hover:underline">Explorer →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Fonctionnalités Principales</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1: Academy */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg border-t-4 border-primary">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-primary mb-4">Académie / Training</h3>
              <p className="text-gray-700 mb-6">
                Cours de sécurité alimentaire, Food Protection certification, leçons vidéo et quiz interactifs avec suivi de progression.
              </p>
              <Link to="/academy" className="text-secondary font-bold hover:underline inline-flex items-center gap-2">
                Accéder {' →'}
              </Link>
            </div>

            {/* Feature 2: Dashboard */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-lg border-t-4 border-secondary">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Tableau de Bord</h3>
              <p className="text-gray-700 mb-6">
                Suivi des progrès d'apprentissage, historique des cours, certificats obtenus et classement des utilisateurs.
              </p>
              <Link to="/dashboard" className="text-secondary font-bold hover:underline inline-flex items-center gap-2">
                Consulter {' →'}
              </Link>
            </div>

            {/* Feature 3: Health Map */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg shadow-lg border-t-4 border-accent">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-2xl font-bold text-accent mb-4">Carte Santé NYC</h3>
              <p className="text-gray-700 mb-6">
                Consulter les scores sanitaires des restaurants, violations, inspections et grades NYC DOH en temps réel.
              </p>
              <Link to="/healthmap" className="text-accent font-bold hover:underline inline-flex items-center gap-2">
                Explorer {' →'}
              </Link>
            </div>

            {/* Feature 4: Resources */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-lg border-t-4 border-purple-600">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Ressources</h3>
              <p className="text-gray-700 mb-6">
                Guides PDF, règlements NYC DOH, bonnes pratiques d'hygiène et documents téléchargeables gratuitement.
              </p>
              <Link to="/resources" className="text-purple-600 font-bold hover:underline inline-flex items-center gap-2">
                Télécharger {' →'}
              </Link>
            </div>

            {/* Feature 5: Finder */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg shadow-lg border-t-4 border-yellow-600">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-yellow-700 mb-4">Finder Restaurants</h3>
              <p className="text-gray-700 mb-6">
                Recherchez restaurants, consultez leurs scores santé, violations et recommandations de sécurité alimentaire.
              </p>
              <Link to="/finder" className="text-yellow-600 font-bold hover:underline inline-flex items-center gap-2">
                Rechercher {' →'}
              </Link>
            </div>

            {/* Feature 6: Community */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-lg shadow-lg border-t-4 border-pink-600">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4">Forum & Leaderboard</h3>
              <p className="text-gray-700 mb-6">
                Communauté collaborative, partage des bonnes pratiques, compétition ludique et récompenses pour la progression.
              </p>
              <Link to="/forum" className="text-pink-600 font-bold hover:underline inline-flex items-center gap-2">
                Rejoindre {' →'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">50+</div>
            <p className="text-lg">Cours Disponibles</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">10K+</div>
            <p className="text-lg">Utilisateurs Actifs</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">5</div>
            <p className="text-lg">Arrondissements NYC</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">1000+</div>
            <p className="text-lg">Restaurants Suivi</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Prêt à Commencer ?</h2>
          <p className="text-xl text-gray-700 mb-8">Rejoignez notre plateforme et développez vos compétences en sécurité alimentaire</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-secondary transition shadow-lg"
            >
              Créer un Compte
            </Link>
            <Link
              to="/academy"
              className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-lg"
            >
              Voir les Cours
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">À Propos</h3>
              <p className="text-sm">Construire un système alimentaire plus sûr pour New York City</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Ressources</h3>
              <ul className="text-sm space-y-2">
                <li><Link to="/academy" className="hover:text-white transition">Académie</Link></li>
                <li><Link to="/resources" className="hover:text-white transition">Guides</Link></li>
                <li><Link to="/forum" className="hover:text-white transition">Forum</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Plateforme</h3>
              <ul className="text-sm space-y-2">
                <li><Link to="/healthmap" className="hover:text-white transition">Carte Santé</Link></li>
                <li><Link to="/finder" className="hover:text-white transition">Finder</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white transition">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Légal</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition">Conditions</a></li>
                <li><a href="https://www1.nyc.gov/site/doh/index.page" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">NYC DOH</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2026 SafeFood NYC Academy. Tous droits réservés.</p>
            <p className="text-sm mt-2">Plateforme de formation et de conformité en sécurité alimentaire</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
