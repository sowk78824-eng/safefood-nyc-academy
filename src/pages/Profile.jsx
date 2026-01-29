import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Trophy, Award, TrendingUp, Calendar, Mail, Briefcase } from 'lucide-react'

export default function Profile() {
  const { t } = useTranslation()
  const { user, logout, getUserStats, userProgress } = useUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user) {
      navigate('/auth')
    }
  }, [user, navigate])

  if (!user) return null

  const stats = getUserStats(user.id)
  const completedLessonsCount = Object.values(userProgress.completedLessons || {}).filter(Boolean).length
  const totalQuizzes = Object.keys(userProgress.quizScores || {}).length

  // Badges disponibles
  const badges = [
    { id: 'first_course', name: 'First Step', icon: '🎯', condition: user.completedCourses?.length >= 1, description: 'Complete 1 course' },
    { id: 'lesson_master', name: 'Lesson Master', icon: '📚', condition: completedLessonsCount >= 5, description: 'Complete 5 lessons' },
    { id: 'quiz_expert', name: 'Quiz Expert', icon: '🧠', condition: totalQuizzes >= 3, description: 'Take 3 quizzes' },
    { id: 'perfect_score', name: 'Perfect Scorer', icon: '⭐', condition: Object.values(userProgress.quizScores || {}).some(q => q.percentage === 100), description: 'Score 100% on a quiz' },
    { id: 'perfect_student', name: 'Perfect Student', icon: '🏆', condition: (stats?.totalPoints || 0) >= 500, description: 'Earn 500+ points' },
    { id: 'dedication', name: 'Dedicated Learner', icon: '💪', condition: completedLessonsCount >= 10, description: 'Complete 10 lessons' },
  ]

  const earnedBadges = badges.filter(b => b.condition)
  const unlockedBadges = user.badges || []

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{user.fullName}</h1>
            <p className="text-gray-100 flex items-center gap-2">
              <Mail size={18} />
              {user.email}
            </p>
            {user.role !== 'student' && (
              <p className="text-gray-100 flex items-center gap-2 mt-1">
                <Briefcase size={18} />
                {user.role === 'restaurant_owner' ? 'Restaurant Owner' : user.role === 'hotel_manager' ? 'Hotel Manager' : 'Instructor'}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Points</p>
                <p className="text-3xl font-bold text-primary">{stats?.totalPoints || 0}</p>
              </div>
              <TrendingUp className="text-primary" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Badges</p>
                <p className="text-3xl font-bold text-secondary">{stats?.totalBadges || 0}</p>
              </div>
              <Award className="text-secondary" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Lessons</p>
                <p className="text-3xl font-bold text-blue-500">{completedLessonsCount}</p>
              </div>
              <Trophy className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Quizzes</p>
                <p className="text-3xl font-bold text-purple-500">{totalQuizzes}</p>
              </div>
              <Calendar className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Badges & Achievements</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center transition ${
                  badge.condition
                    ? 'bg-yellow-50 border-2 border-yellow-400 shadow-lg'
                    : 'bg-gray-100 border-2 border-gray-300 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="font-bold text-sm text-gray-800">{badge.name}</p>
                <p className="text-xs text-gray-600 mt-2">{badge.description}</p>
                {badge.condition && (
                  <div className="mt-2 bg-yellow-400 text-white text-xs font-bold py-1 rounded">
                    UNLOCKED
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Scores Section */}
        {totalQuizzes > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Quiz Performance</h2>
            
            <div className="space-y-3">
              {Object.entries(userProgress.quizScores || {}).map(([quizKey, score]) => (
                <div key={quizKey} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">Lesson {quizKey}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(score.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      score.percentage >= 90 ? 'text-green-500' :
                      score.percentage >= 70 ? 'text-blue-500' :
                      'text-orange-500'
                    }`}>
                      {score.percentage}%
                    </p>
                    <p className="text-sm text-gray-600">{score.score} points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
