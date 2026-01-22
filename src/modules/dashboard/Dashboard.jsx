import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const { t } = useTranslation()
  const [filterType, setFilterType] = useState('all')

  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: 'Giovanni\'s Italian Kitchen',
      score: 92,
      lastInspection: '2025-01-15',
      violations: { critical: 0, major: 1, minor: 3 },
      status: 'excellent'
    },
    {
      id: 2,
      name: 'Sakura Sushi Bar',
      score: 87,
      lastInspection: '2025-01-10',
      violations: { critical: 0, major: 2, minor: 2 },
      status: 'good'
    },
    {
      id: 3,
      name: 'Dragon House',
      score: 78,
      lastInspection: '2024-12-28',
      violations: { critical: 1, major: 2, minor: 5 },
      status: 'fair'
    }
  ]

  const complianceData = [
    { month: 'Jan', compliance: 85 },
    { month: 'Feb', compliance: 88 },
    { month: 'Mar', compliance: 90 },
    { month: 'Apr', compliance: 87 },
    { month: 'May', compliance: 92 },
    { month: 'Jun', compliance: 95 }
  ]

  const violationStats = [
    { name: t('dashboard.critical'), value: 2 },
    { name: t('dashboard.major'), value: 8 },
    { name: t('dashboard.minor'), value: 15 }
  ]

  const COLORS = ['#e74c3c', '#f39c12', '#f1c40f']

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 80) return 'bg-blue-100 text-blue-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">{t('dashboard.title')}</h1>
          <p className="text-xl text-gray-600">{t('dashboard.subtitle')}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary">
            <div className="text-3xl font-bold text-primary mb-2">{restaurants.length}</div>
            <div className="text-gray-600">{t('dashboard.restaurants')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
            <div className="text-3xl font-bold text-secondary mb-2">12</div>
            <div className="text-gray-600">{t('dashboard.inspections')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="text-3xl font-bold text-yellow-600 mb-2">25</div>
            <div className="text-gray-600">{t('dashboard.violations')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-accent">
            <div className="text-3xl font-bold text-accent mb-2">92%</div>
            <div className="text-gray-600">{t('dashboard.compliance')}</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Compliance Trend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('dashboard.compliance')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="compliance" stroke="#2ecc71" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Violation Types */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('dashboard.violationTypes')}</h2>
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

        {/* Restaurants Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-primary">{t('dashboard.restaurants')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-primary font-semibold">{t('common.appName')}</th>
                  <th className="px-6 py-3 text-left text-primary font-semibold">{t('dashboard.score')}</th>
                  <th className="px-6 py-3 text-left text-primary font-semibold">{t('dashboard.lastInspection')}</th>
                  <th className="px-6 py-3 text-left text-primary font-semibold">{t('dashboard.violations')}</th>
                  <th className="px-6 py-3 text-left text-primary font-semibold">{t('buttons.edit')}</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-800">{restaurant.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full font-bold ${getScoreBadge(restaurant.score)}`}>
                        {restaurant.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{restaurant.lastInspection}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="text-red-600 mr-2">C: {restaurant.violations.critical}</span>
                        <span className="text-orange-600 mr-2">M: {restaurant.violations.major}</span>
                        <span className="text-yellow-600">m: {restaurant.violations.minor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="bg-secondary text-white px-3 py-1 rounded hover:bg-primary transition">
                        {t('buttons.edit')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
