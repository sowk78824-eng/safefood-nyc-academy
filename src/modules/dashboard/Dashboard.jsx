import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { TrendingUp, Award, BookOpen, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function Dashboard() {
  const { t } = useTranslation()
  const { user } = useUser()
  const [filterType, setFilterType] = useState('all')

  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: 'Giovanni\'s Italian Kitchen',
      score: 92,
      lastInspection: '2025-01-15',
      violations: { critical: 0, major: 1, minor: 3 },
      status: 'excellent',
      borough: 'Manhattan'
    },
    {
      id: 2,
      name: 'Sakura Sushi Bar',
      score: 87,
      lastInspection: '2025-01-10',
      violations: { critical: 0, major: 2, minor: 2 },
      status: 'good',
      borough: 'Brooklyn'
    },
    {
      id: 3,
      name: 'Dragon House',
      score: 78,
      lastInspection: '2024-12-28',
      violations: { critical: 1, major: 2, minor: 5 },
      status: 'fair',
      borough: 'Queens'
    },
    {
      id: 4,
      name: 'Café Paris Bistro',
      score: 95,
      lastInspection: '2025-01-20',
      violations: { critical: 0, major: 0, minor: 1 },
      status: 'excellent',
      borough: 'Manhattan'
    }
  ]

  const complianceData = [
    { month: 'Janvier', compliance: 85, target: 90 },
    { month: 'Février', compliance: 88, target: 90 },
    { month: 'Mars', compliance: 90, target: 90 },
    { month: 'Avril', compliance: 87, target: 92 },
    { month: 'Mai', compliance: 92, target: 92 },
    { month: 'Juin', compliance: 95, target: 95 }
  ]

  const userProgressData = [
    { name: 'Cours Complétés', value: 5 },
    { name: 'En Cours', value: 3 },
    { name: 'À Faire', value: 7 }
  ]

  const violationStats = [
    { name: 'Critique', value: 2 },
    { name: 'Majeure', value: 8 },
    { name: 'Mineure', value: 15 }
  ]

  const COLORS = ['#e74c3c', '#f39c12', '#f1c40f']

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800 border-green-300'
    if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-300'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-red-100 text-red-800 border-red-300'
  }

  const getScoreIcon = (score) => {
    if (score >= 90) return '🌟'
    if (score >= 80) return '⭐'
    if (score >= 70) return '⚠️'
    return '❌'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">📊 Tableau de Bord</h1>
          <p className="text-xl text-gray-600">
            {user ? `Bienvenue ${user.fullName || 'Utilisateur'}!` : 'Suivi des performances et conformité'} 
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Restaurants Suivi</h3>
              <span className="text-3xl">🍽️</span>
            </div>
            <div className="text-4xl font-bold text-primary">{restaurants.length}</div>
            <p className="text-sm text-gray-500 mt-2">Augmentation de 12% ce mois</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Inspections</h3>
              <span className="text-3xl">📋</span>
            </div>
            <div className="text-4xl font-bold text-secondary">12</div>
            <p className="text-sm text-gray-500 mt-2">6 prévues cette semaine</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Violations</h3>
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="text-4xl font-bold text-yellow-600">25</div>
            <p className="text-sm text-gray-500 mt-2">2 critiques à résoudre</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Conformité</h3>
              <span className="text-3xl">✅</span>
            </div>
            <div className="text-4xl font-bold text-green-600">92%</div>
            <p className="text-sm text-gray-500 mt-2">↑ 3% depuis le mois dernier</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Compliance Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-primary">Tendance Conformité</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="compliance" fill="#2ecc71" name="Conformité Actuelle" />
                <Bar dataKey="target" fill="#95a5a6" name="Objectif" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Violation Types */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="text-accent" size={24} />
              <h2 className="text-2xl font-bold text-primary">Types de Violations</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={violationStats} cx="50%" cy="50%" labelLine={false} label outerRadius={100} fill="#8884d8" dataKey="value">
                  {violationStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Progress Section */}
        {user && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-12 border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-primary">Votre Progression</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 text-center border-l-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">5</div>
                <p className="text-gray-600 mt-2">Cours Complétés</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border-l-4 border-yellow-500">
                <div className="text-3xl font-bold text-yellow-600">3</div>
                <p className="text-gray-600 mt-2">En Cours</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border-l-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">7</div>
                <p className="text-gray-600 mt-2">À Faire</p>
              </div>
            </div>
          </div>
        )}

        {/* Restaurants Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span>🍽️</span> Restaurants Suivis
              </h2>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="all">Tous les Restaurants</option>
                <option value="excellent">Excellent (A)</option>
                <option value="good">Bon (B)</option>
                <option value="fair">Acceptable (C)</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Restaurant</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Score</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Arrondissement</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Dernière Inspection</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Violations</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{restaurant.name}</div>
                      <div className="text-sm text-gray-500">{restaurant.borough}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full font-bold border ${getScoreBadge(restaurant.score)}`}>
                        {getScoreIcon(restaurant.score)} {restaurant.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{restaurant.borough}</td>
                    <td className="px-6 py-4 text-gray-600">{restaurant.lastInspection}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 text-sm">
                        {restaurant.violations.critical > 0 && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded">🔴 {restaurant.violations.critical} Critique</span>
                        )}
                        {restaurant.violations.major > 0 && (
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">🟠 {restaurant.violations.major} Majeure</span>
                        )}
                        {restaurant.violations.minor > 0 && (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">🟡 {restaurant.violations.minor} Mineure</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition font-semibold text-sm">
                        Voir Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Clock size={24} /> Activités Récentes
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="bg-green-100 text-green-700 rounded-full p-3 h-fit">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Inspection complétée</p>
                <p className="text-sm text-gray-600">Giovanni's Italian Kitchen - Il y a 2 jours</p>
              </div>
            </div>
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="bg-yellow-100 text-yellow-700 rounded-full p-3 h-fit">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Violation majeure signalée</p>
                <p className="text-sm text-gray-600">Dragon House - Il y a 5 jours</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-700 rounded-full p-3 h-fit">
                <Award size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Certificat obtenu</p>
                <p className="text-sm text-gray-600">Food Protection Level 1 - Il y a 1 semaine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
