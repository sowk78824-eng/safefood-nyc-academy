import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Download, FileText, Archive, BookOpen, ClipboardList, AlertCircle, CheckCircle } from 'lucide-react'

export default function Resources() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const resources = [
    // Food Safety Guides
    {
      id: 1,
      category: 'guides',
      title: 'Guide Complet de Sécurité Alimentaire',
      description: 'Manuel complet sur les standards de sécurité alimentaire, conservation et hygiène',
      fileType: 'PDF',
      size: '8.7 MB',
      icon: '📖',
      nycdoh: true,
      tags: ['Essentiel', 'Débutant']
    },
    {
      id: 2,
      category: 'guides',
      title: 'Gestion des Allergènes Alimentaires',
      description: 'Comment identifier, gérer et documenter les allergènes dans votre cuisine',
      fileType: 'PDF',
      size: '5.2 MB',
      icon: '⚠️',
      nycdoh: true,
      tags: ['Avancé', 'Obligatoire']
    },
    {
      id: 3,
      category: 'guides',
      title: 'Protection des Aliments - Food Protection',
      description: 'Guide officiel de l\'examen de certification Food Protection du NYC DOH',
      fileType: 'PDF',
      size: '12.4 MB',
      icon: '🛡️',
      nycdoh: true,
      tags: ['Certification', 'Complet']
    },
    {
      id: 4,
      category: 'guides',
      title: 'Guide Hygiène Personnelle et Vêtements',
      description: 'Standards d\'hygiène personnelle et de tenue pour le personnel alimentaire',
      fileType: 'PDF',
      size: '3.8 MB',
      icon: '👔',
      nycdoh: true,
      tags: ['Hygiène', 'Formation']
    },

    // Templates
    {
      id: 5,
      category: 'templates',
      title: 'Checklist Inspections Quotidiennes',
      description: 'Checklist complète pour les inspections de sécurité alimentaire quotidiennes',
      fileType: 'PDF',
      size: '2.4 MB',
      icon: '📋',
      nycdoh: false,
      tags: ['Quotidien', 'Praticien']
    },
    {
      id: 6,
      category: 'templates',
      title: 'Tableau de Température Réfrigérateur',
      description: 'Template pour enregistrer les températures de réfrigération tout au long de la journée',
      fileType: 'Excel',
      size: '1.1 MB',
      icon: '📊',
      nycdoh: false,
      tags: ['Température', 'Modèle']
    },
    {
      id: 7,
      category: 'templates',
      title: 'Formulaire Rotation Stocks (FIFO)',
      description: 'Système FIFO (Premier Entré, Premier Sorti) pour la gestion des stocks',
      fileType: 'PDF',
      size: '1.6 MB',
      icon: '🔄',
      nycdoh: false,
      tags: ['Inventaire', 'Gestion']
    },
    {
      id: 8,
      category: 'templates',
      title: 'Matrice de Nettoyage Cuisine',
      description: 'Plan détaillé de nettoyage et désinfection pour tous les zones de la cuisine',
      fileType: 'PDF',
      size: '2.9 MB',
      icon: '🧹',
      nycdoh: false,
      tags: ['Nettoyage', 'Sanitation']
    },

    // Checklists
    {
      id: 9,
      category: 'checklists',
      title: 'Check-up Avant Service',
      description: 'Vérification rapide de la sécurité alimentaire avant l\'ouverture',
      fileType: 'PDF',
      size: '1.8 MB',
      icon: '✅',
      nycdoh: false,
      tags: ['Ouverture', 'Rapide']
    },
    {
      id: 10,
      category: 'checklists',
      title: 'Nettoyage Profond Après Service',
      description: 'Procédures détaillées pour le nettoyage profond en fin de service',
      fileType: 'PDF',
      size: '2.5 MB',
      icon: '🧼',
      nycdoh: false,
      tags: ['Fermeture', 'Détaillé']
    },
    {
      id: 11,
      category: 'checklists',
      title: 'Audit Fournisseurs',
      description: 'Checklist pour évaluer et auditer vos fournisseurs alimentaires',
      fileType: 'PDF',
      size: '2.2 MB',
      icon: '🔍',
      nycdoh: false,
      tags: ['Fournisseurs', 'Qualité']
    },

    // Policies
    {
      id: 12,
      category: 'policies',
      title: 'Modèle Politique Sécurité Alimentaire',
      description: 'Politique personnalisable de sécurité alimentaire pour votre restaurant',
      fileType: 'Word',
      size: '0.8 MB',
      icon: '📄',
      nycdoh: false,
      tags: ['Politique', 'Personnalisable']
    },
    {
      id: 13,
      category: 'policies',
      title: 'Programme Formation Staff',
      description: 'Plan complet d\'intégration et de formation continue pour le personnel',
      fileType: 'PDF',
      size: '3.1 MB',
      icon: '👥',
      nycdoh: false,
      tags: ['Formation', 'Onboarding']
    },
    {
      id: 14,
      category: 'policies',
      title: 'Procédures Gestion des Incidents',
      description: 'Comment documenter et gérer les incidents de sécurité alimentaire',
      fileType: 'PDF',
      size: '2.3 MB',
      icon: '⚡',
      nycdoh: false,
      tags: ['Incidents', 'Procédures']
    },

    // Video Training
    {
      id: 15,
      category: 'videos',
      title: 'Technique de Lavage des Mains Correcte',
      description: 'Vidéo de 5 minutes montrant la technique correcte de lavage des mains',
      fileType: 'MP4',
      size: '45 MB',
      icon: '🎥',
      nycdoh: true,
      tags: ['Vidéo', 'Fondamental']
    },
    {
      id: 16,
      category: 'videos',
      title: 'Prévention de la Contamination Croisée',
      description: 'Conseils pratiques pour prévenir la contamination croisée en cuisine',
      fileType: 'MP4',
      size: '38 MB',
      icon: '🎥',
      nycdoh: true,
      tags: ['Vidéo', 'Prévention']
    },
    {
      id: 17,
      category: 'videos',
      title: 'Gestion Correcte de la Température des Aliments',
      description: 'Guide vidéo complet sur la bonne tenue de la température des aliments',
      fileType: 'MP4',
      size: '52 MB',
      icon: '🎥',
      nycdoh: true,
      tags: ['Vidéo', 'Température']
    },

    // Official NYC DOH Resources
    {
      id: 18,
      category: 'regulations',
      title: 'Code Sanitaire NYC DOH Officiel',
      description: 'Règlements officiels du Département de la Santé de NYC',
      fileType: 'PDF',
      size: '15.8 MB',
      icon: '⚖️',
      nycdoh: true,
      tags: ['Officiel', 'Législation']
    },
    {
      id: 19,
      category: 'regulations',
      title: 'Grades des Restaurants NYC (A-D)',
      description: 'Explication du système de notation des restaurants par NYC DOH',
      fileType: 'PDF',
      size: '4.2 MB',
      icon: '⭐',
      nycdoh: true,
      tags: ['Grades', 'Inspection']
    },
  ]

  const categories = [
    { id: 'all', name: 'Toutes', icon: '📚' },
    { id: 'guides', name: 'Guides', icon: '📖' },
    { id: 'templates', name: 'Templates', icon: '📋' },
    { id: 'checklists', name: 'Checklists', icon: '✅' },
    { id: 'policies', name: 'Politiques', icon: '📄' },
    { id: 'videos', name: 'Vidéos', icon: '🎥' },
    { id: 'regulations', name: 'Réglementations', icon: '⚖️' }
  ]

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category === selectedCategory)

  const downloadResource = (resource) => {
    const url = `#download-${resource.id}`
    alert(`📥 Téléchargement: ${resource.title}\n\nFichier: ${resource.title}.${resource.fileType.toLowerCase()}\nTaille: ${resource.size}\n\nVotre téléchargement devrait commencer automatiquement.`)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">📚</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Bibliothèque Ressources</h1>
              <p className="text-gray-600 text-lg mt-2">
                Téléchargez des templates, guides et outils pour gérer la sécurité alimentaire
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-min">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Info */}
        <div className="mb-8 text-gray-600">
          <p>Affichant <strong>{filteredResources.length}</strong> ressources</p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden">
              {/* Resource Header */}
              <div className={`p-6 ${resource.nycdoh ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-primary to-secondary'} text-white`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-4xl">{resource.icon}</span>
                  <div className="flex gap-2">
                    <span className="bg-white bg-opacity-30 text-white px-2 py-1 rounded text-xs font-bold">
                      {resource.fileType}
                    </span>
                    {resource.nycdoh && (
                      <span className="bg-yellow-300 text-green-700 px-2 py-1 rounded text-xs font-bold">
                        NYC DOH
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold leading-tight">{resource.title}</h3>
              </div>

              {/* Resource Body */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {resource.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4 py-3 border-y text-sm text-gray-600">
                  <span>
                    <FileText size={16} className="inline mr-1" />
                    {resource.size}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {new Date().toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => downloadResource(resource)}
                  className={`w-full text-white py-3 rounded font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 ${
                    resource.nycdoh
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-primary to-secondary'
                  }`}
                >
                  <Download size={18} />
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* NYC DOH Info */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚖️</div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Ressources Officielles NYC DOH</h3>
                <p className="text-gray-700 mb-4">
                  Nos ressources incluent des documents officiels du Département de la Santé de New York City et sont conformes aux dernières réglementations.
                </p>
                <a href="https://www1.nyc.gov/site/doh/index.page" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold hover:underline">
                  Visiter le site NYC DOH →
                </a>
              </div>
            </div>
          </div>

          {/* Certification Info */}
          <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎓</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Certification Food Protection</h3>
                <p className="text-gray-700 mb-4">
                  Utilisez nos guides pour préparer votre examen de certification Food Protection du NYC DOH.
                </p>
                <button onClick={() => navigate('/academy')} className="text-primary font-bold hover:underline">
                  Voir les Cours de Formation →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 text-center border border-blue-200">
            <p className="text-4xl font-bold text-primary">{resources.length}</p>
            <p className="text-gray-700 font-semibold mt-2">Ressources Totales</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6 text-center border border-green-200">
            <p className="text-4xl font-bold text-green-600">{resources.filter(r => r.nycdoh).length}</p>
            <p className="text-gray-700 font-semibold mt-2">Officiel NYC DOH</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow p-6 text-center border border-yellow-200">
            <p className="text-4xl font-bold text-yellow-600">{resources.filter(r => r.category === 'videos').length}</p>
            <p className="text-gray-700 font-semibold mt-2">Vidéos Formation</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6 text-center border border-purple-200">
            <p className="text-4xl font-bold text-purple-600">100%</p>
            <p className="text-gray-700 font-semibold mt-2">Conforme Réglementation</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Maîtriser la Sécurité Alimentaire ?</h2>
          <p className="text-lg mb-6 opacity-90">
            Combinez ces ressources avec notre académie pour obtenir votre certification Food Protection
          </p>
          <button 
            onClick={() => navigate('/academy')}
            className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Commencer l'Académie Maintenant →
          </button>
        </div>
      </div>
    </div>
  )
}
