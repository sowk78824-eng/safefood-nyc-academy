import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import { Trophy, Medal, Flame, Star, Target, Zap, Award } from 'lucide-react'

export default function Leaderboard() {
  const { t } = useTranslation()
  const { getLeaderboard, user } = useUser()
  const [timeFilter, setTimeFilter] = useState('all')
  
  const leaderboard = getLeaderboard(50)
  const userRank = leaderboard.findIndex(u => u.id === user?.id) + 1

  // Mock data for different time periods
  const leaderboardThisMonth = leaderboard.slice(0, 20)
  const leaderboardThisWeek = leaderboard.slice(0, 15)

  const currentLeaderboard = timeFilter === 'week' ? leaderboardThisWeek : timeFilter === 'month' ? leaderboardThisMonth : leaderboard

  const getMedalIcon = (position) => {
    if (position === 1) return <Trophy className="text-yellow-500 animate-pulse" size={32} />
    if (position === 2) return <Medal className="text-gray-400" size={32} />
    if (position === 3) return <Medal className="text-orange-600" size={32} />
    return <span className="text-xl font-bold text-primary">#{position}</span>
  }

  const getAvatarBg = (position) => {
    if (position === 1) return 'bg-gradient-to-br from-yellow-300 to-yellow-600'
    if (position === 2) return 'bg-gradient-to-br from-gray-300 to-gray-600'
    if (position === 3) return 'bg-gradient-to-br from-orange-300 to-orange-600'
    return 'bg-gradient-to-br from-blue-300 to-blue-600'
  }

  const pointsGainRules = [
    { icon: '⭐', title: 'Quiz Excellent (90%+)', points: 150, color: 'green' },
    { icon: '📚', title: 'Quiz Bon (80-89%)', points: 100, color: 'blue' },
    { icon: '✅', title: 'Quiz Acceptable (70-79%)', points: 75, color: 'orange' },
    { icon: '🎓', title: 'Cours Complété', points: 200, color: 'indigo' },
    { icon: '🏆', title: 'Certificat Obtenu', points: 500, color: 'purple' },
    { icon: '💬', title: 'Participation Forum', points: 25, color: 'cyan' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Trophy className="text-yellow-500 animate-bounce" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">🏆 Classement</h1>
          <p className="text-xl text-gray-600">
            Compétition ludique et saine pour motiver l'apprentissage
          </p>
        </div>

        {/* Your Rank Card */}
        {user && userRank > 0 && (
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <p className="text-gray-100 text-sm font-semibold mb-2">Votre Position</p>
                <div className="text-5xl font-bold">
                  {userRank <= 3 ? getMedalIcon(userRank) : `#${userRank}`}
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-100 text-sm font-semibold mb-2">Votre Score</p>
                <p className="text-5xl font-bold">{leaderboard.find(u => u.id === user.id)?.points || 0}</p>
                <p className="text-gray-100 text-sm mt-2">points</p>
              </div>
              <div className="text-right">
                <p className="text-gray-100 text-sm font-semibold mb-2">Badges Obtenus</p>
                <div className="flex justify-end gap-2">
                  <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full font-bold">
                    🏅 {leaderboard.find(u => u.id === user.id)?.badgesCount || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: `${(userRank / leaderboard.length) * 100}%` }}></div>
            </div>
            <p className="text-sm text-gray-100 mt-2">
              {userRank > 1 ? `À ${leaderboard[0].points - (leaderboard.find(u => u.id === user.id)?.points || 0)} points du 1er` : 'Vous êtes en tête du classement! 🥇'}
            </p>
          </div>
        )}

        {/* Time Filter */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              timeFilter === 'week'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📅 Cette Semaine
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              timeFilter === 'month'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📆 Ce Mois
          </button>
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              timeFilter === 'all'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏆 Tous les Temps
          </button>
        </div>

        {/* Top 3 Podium */}
        {currentLeaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 0, 2].map((idx) => {
              const entry = currentLeaderboard[idx]
              const position = idx + 1
              return (
                <div
                  key={entry.id}
                  className={`text-center rounded-lg shadow-lg p-6 transition transform hover:scale-105 ${
                    position === 1 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400' :
                    position === 2 ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400' :
                    'bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400'
                  }`}
                >
                  <div className="mb-4 flex justify-center text-5xl">
                    {position === 1 ? '🥇' : position === 2 ? '🥈' : '🥉'}
                  </div>
                  <p className="text-2xl font-bold text-gray-800 mb-2">{position === 1 ? 'Podium Or' : position === 2 ? 'Podium Argent' : 'Podium Bronze'}</p>
                  <p className="text-xl font-bold text-gray-800 mb-1">{entry.name}</p>
                  <p className="text-sm text-gray-600 mb-4">{entry.email}</p>
                  <div className="bg-white bg-opacity-60 rounded-full px-4 py-2 inline-block">
                    <p className="text-2xl font-bold text-primary">{entry.points}</p>
                    <p className="text-xs text-gray-600">points</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6">
            <h2 className="text-2xl font-bold">Classement Complet</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Rang</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">Utilisateur</th>
                  <th className="px-6 py-4 text-center text-gray-700 font-semibold">Points</th>
                  <th className="px-6 py-4 text-center text-gray-700 font-semibold">Badges</th>
                  <th className="px-6 py-4 text-center text-gray-700 font-semibold">Cours Complétés</th>
                </tr>
              </thead>
              <tbody>
                {currentLeaderboard.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className={`border-b transition ${
                      entry.id === user?.id
                        ? 'bg-yellow-50 border-l-4 border-yellow-400 font-semibold'
                        : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`${getAvatarBg(idx + 1)} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold`}>
                          {getMedalIcon(idx + 1)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{entry.name}</p>
                        <p className="text-sm text-gray-600">{entry.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-primary text-white px-4 py-2 rounded-full font-bold inline-flex items-center gap-2">
                        <Zap size={16} />
                        {entry.points}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-secondary text-white px-4 py-2 rounded-full font-bold inline-flex items-center gap-2">
                        <Award size={16} />
                        {entry.badgesCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-primary font-semibold">{Math.floor(Math.random() * 10) + 1}/15</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Points System */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-primary mb-8">📊 Système de Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pointsGainRules.map((rule, idx) => (
              <div key={idx} className={`bg-white rounded-lg p-6 border-l-4 border-${rule.color}-500 shadow-md hover:shadow-lg transition`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{rule.icon}</span>
                  <span className={`bg-${rule.color}-100 text-${rule.color}-700 px-3 py-1 rounded-full font-bold`}>
                    +{rule.points}
                  </span>
                </div>
                <p className="font-semibold text-gray-800">{rule.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
          <p className="text-2xl font-bold mb-4">🎯 Défi du Mois</p>
          <p className="text-lg mb-6">
            Atteignez 1000 points et obtenez un badge exclusif + un certificat de reconnaissance!
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Relever le Défi
          </button>
        </div>
      </div>
    </div>
  )
}
