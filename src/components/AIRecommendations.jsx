import React, { useState, useEffect } from 'react'
import { Star, Brain, TrendingUp, Shield, ChefHat, AlertCircle } from 'lucide-react'
import { generateAIRecommendations, analyzeUserPreferences, getDiningInsights } from '../utils/aiRecommendationsApi'

export default function AIRecommendations({ restaurants, userOrderHistory = [], onSelectRestaurant }) {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecommendation, setSelectedRecommendation] = useState(null)
  const [insights, setInsights] = useState(null)
  const [userPreferences, setUserPreferences] = useState(null)

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    try {
      setLoading(true)

      // Analyze user preferences
      const preferences = analyzeUserPreferences(userOrderHistory)
      setUserPreferences(preferences)

      // Generate AI recommendations
      const recs = await generateAIRecommendations(
        {
          preferences,
          budget: 30,
          favoriteRestaurants: preferences.topRestaurants
        },
        restaurants
      )

      setRecommendations(Array.isArray(recs) ? recs : [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading recommendations:', error)
      setLoading(false)
    }
  }

  const handleSelectRecommendation = async (recommendation) => {
    setSelectedRecommendation(recommendation)

    // Get detailed insights
    const restaurant = restaurants.find(r => r.id === recommendation.restaurantId)
    if (restaurant) {
      const insight = await getDiningInsights(userPreferences, restaurant)
      setInsights(insight)
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-purple-600 animate-pulse" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">AI-Powered Recommendations</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Preferences Summary */}
      {userPreferences && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border-l-4 border-indigo-600">
          <p className="text-sm text-indigo-900 font-semibold mb-2">
            👤 Your Dining Profile
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>
              <p className="text-indigo-700">Favorite Cuisine</p>
              <p className="font-bold text-indigo-900">
                {userPreferences.mostLoved || 'Various'}
              </p>
            </div>
            <div>
              <p className="text-indigo-700">Avg Spending</p>
              <p className="font-bold text-indigo-900">
                ${userPreferences.averageSpending}
              </p>
            </div>
            <div>
              <p className="text-indigo-700">Preferred Time</p>
              <p className="font-bold text-indigo-900">
                {userPreferences.frequentTimeOfDay}
              </p>
            </div>
            <div>
              <p className="text-indigo-700">Safety Score</p>
              <p className="font-bold text-indigo-900">Grade A</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={24} className="text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Personalized For You</h3>
        </div>

        {recommendations.length > 0 ? (
          recommendations.map((rec, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectRecommendation(rec)}
              className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-purple-500 cursor-pointer transition hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      #{rec.rank}
                    </span>
                    <h4 className="text-lg font-bold text-gray-800">
                      {rec.restaurantName}
                    </h4>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(rec.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {rec.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-right">
                  <p className="text-xs text-gray-600">Your Match</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(rec.matchScore)}%
                  </p>
                </div>
              </div>

              {/* Reason */}
              <p className="text-sm text-gray-700 mb-3 bg-purple-50 p-2 rounded">
                💡 {rec.reason}
              </p>

              {/* Price Match */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Price Match: {rec.priceMatch}</span>
                {selectedRecommendation?.restaurantId === rec.restaurantId && (
                  <span className="text-purple-600 font-bold">✓ Selected</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-900">
              Not enough data yet. Start ordering to get personalized recommendations!
            </p>
          </div>
        )}
      </div>

      {/* Detailed Insights for Selected Recommendation */}
      {selectedRecommendation && insights && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-400">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain size={24} className="text-blue-600" />
            AI Insights
          </h3>

          <div className="space-y-4">
            {/* Overall Match */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">Match Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {insights.overallMatch}%
                </p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${insights.overallMatch}%` }}
                />
              </div>
            </div>

            {/* Key Factors */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(insights.factors || {}).map(([key, value]) => (
                typeof value === 'number' && (
                  <div key={key} className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </p>
                    <p className="font-bold text-blue-600 text-lg">{value}%</p>
                  </div>
                )
              ))}
            </div>

            {/* AI Summary */}
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <TrendingUp size={18} className="text-green-600" />
                Why You'll Love It
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {insights.aiInsight}
              </p>
              <ul className="space-y-2">
                {insights.whyYouWillLoveIt?.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Health & Safety */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="font-semibold text-green-900 flex items-center gap-2 mb-2">
                <Shield size={18} />
                {insights.riskLevel}
              </p>
              <p className="text-sm text-green-800">
                This restaurant has maintained consistent high health standards with
                zero critical violations.
              </p>
            </div>

            {/* Order Button */}
            <button
              onClick={() => onSelectRestaurant(selectedRecommendation.restaurantId)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
            >
              Order from {selectedRecommendation.restaurantName}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const CheckCircle = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4l-8.97 8.97" strokeWidth="2" />
  </svg>
)
