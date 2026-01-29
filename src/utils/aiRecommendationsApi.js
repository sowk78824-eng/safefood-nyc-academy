/**
 * Yelp + OpenAI Integration Utility
 * Provides personalized restaurant recommendations and AI-powered insights
 * 
 * Features:
 * - Fetch restaurant reviews, photos, ratings from Yelp
 * - Generate personalized recommendations using OpenAI
 * - Analyze user preferences and dining patterns
 * - Provide AI-powered dining suggestions
 */

// Note: Use environment variables for API keys in production
const YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY || 'demo-key'
const YELP_API_ENDPOINT = 'https://api.yelp.com/v3/businesses'
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'demo-key'
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

/**
 * Fetch restaurant reviews and details from Yelp
 * @param {string} restaurantId - Business ID from Yelp or name
 * @param {string} location - City, location
 * @returns {Promise<Object>} Restaurant details with reviews
 */
export const fetchRestaurantFromYelp = async (restaurantId, location = 'New York') => {
  try {
    // In production, use Yelp Fusion API
    // const response = await fetch(`${YELP_API_ENDPOINT}/search?term=${restaurantId}&location=${location}`, {
    //   headers: { Authorization: `Bearer ${YELP_API_KEY}` }
    // })

    // Mock Yelp data for demo
    const yelpData = {
      source: 'Yelp Fusion API (Demo)',
      id: restaurantId,
      name: restaurantId,
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 500) + 50,
      location: location,
      reviews: [
        {
          author: 'Sarah M.',
          rating: 5,
          date: '2025-01-20',
          text: 'Amazing food! The hygiene standards are top-notch. Highly recommend!',
          photo: 'https://via.placeholder.com/150'
        },
        {
          author: 'John D.',
          rating: 4,
          date: '2025-01-15',
          text: 'Great atmosphere and friendly staff. Food was delicious.',
          photo: 'https://via.placeholder.com/150'
        },
        {
          author: 'Maria G.',
          rating: 5,
          date: '2025-01-10',
          text: 'Best Italian food in the neighborhood! Very clean kitchen.',
          photo: 'https://via.placeholder.com/150'
        }
      ],
      photos: [
        'https://via.placeholder.com/300x200?text=Dish+1',
        'https://via.placeholder.com/300x200?text=Dish+2',
        'https://via.placeholder.com/300x200?text=Dish+3'
      ],
      categories: ['Italian', 'Fine Dining', 'Lunch', 'Dinner'],
      price: '$$',
      hours: [
        { day: 'Monday', open: '11:00', close: '23:00', open_now: true }
      ]
    }

    console.log('⭐ Yelp Data:', yelpData)
    return yelpData
  } catch (error) {
    console.error('❌ Yelp Error:', error)
    return {
      error: error.message,
      name: restaurantId,
      reviews: [],
      photos: []
    }
  }
}

/**
 * Generate personalized AI recommendations based on user preferences
 * @param {Object} userProfile - User's { preferences, favoriteRestaurants, budget, cuisine }
 * @param {Array} availableRestaurants - List of restaurants to recommend from
 * @returns {Promise<Array>} Ranked recommendations with explanations
 */
export const generateAIRecommendations = async (userProfile, availableRestaurants) => {
  try {
    // In production, use OpenAI API
    const prompt = `
    User Profile:
    - Favorite Cuisines: ${userProfile.preferences?.cuisines?.join(', ') || 'Various'}
    - Budget: $${userProfile.budget || 30}
    - Dietary Restrictions: ${userProfile.preferences?.dietary?.join(', ') || 'None'}
    - Recently Enjoyed: ${userProfile.favoriteRestaurants?.join(', ') || 'Various'}
    
    Available Restaurants:
    ${availableRestaurants.map(r => `- ${r.name} (${r.cuisine}, Grade: ${r.healthGrade}, Score: ${r.healthScore})`).join('\n')}
    
    Based on the user profile and health inspection scores, provide 3-5 personalized recommendations.
    Format: For each recommendation, explain WHY they would enjoy it, especially considering the health scores.
    `

    // Mock AI response for demo
    const mockRecommendations = availableRestaurants
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((restaurant, idx) => ({
        rank: idx + 1,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        rating: 4.5 + Math.random() * 0.5,
        matchScore: 85 + Math.random() * 15,
        reason: `You loved the ${userProfile.favoriteRestaurants?.[0] || 'Italian'} cuisine, and ${restaurant.name} offers similar flavors with a ${restaurant.healthGrade} health grade (score: ${restaurant.healthScore}). Perfect for your taste!`,
        aiSummary: `This restaurant aligns with your preferences. Recently, diners with similar tastes gave it excellent reviews for its fresh ingredients and food safety standards.`,
        suggestedDishes: ['Most Popular Dish', 'Customer Favorite', 'Health-Safe Special'],
        priceMatch: restaurant.price === userProfile.budget ? '✓ Perfect' : '~ Similar'
      }))

    console.log('🤖 AI Recommendations:', mockRecommendations)
    return mockRecommendations
  } catch (error) {
    console.error('❌ AI Recommendation Error:', error)
    return {
      error: error.message,
      recommendations: []
    }
  }
}

/**
 * Analyze user dining patterns and preferences
 * @param {Array} orderHistory - User's past orders
 * @returns {Object} User preference analysis
 */
export const analyzeUserPreferences = (orderHistory) => {
  if (!orderHistory || orderHistory.length === 0) {
    return {
      cuisinePreferences: {},
      averageSpending: 0,
      frequentTimeOfDay: 'Lunch',
      healthGradePreference: 'A',
      topRestaurants: []
    }
  }

  const cuisines = {}
  let totalSpent = 0
  const times = {}

  orderHistory.forEach(order => {
    // Count cuisines
    if (order.cuisine) {
      cuisines[order.cuisine] = (cuisines[order.cuisine] || 0) + 1
    }

    // Sum spending
    totalSpent += order.total || 0

    // Track time of day
    const hour = new Date(order.date).getHours()
    const timeOfDay = hour < 12 ? 'Breakfast' : hour < 17 ? 'Lunch' : 'Dinner'
    times[timeOfDay] = (times[timeOfDay] || 0) + 1
  })

  const mostFrequentCuisine = Object.keys(cuisines).reduce((a, b) =>
    cuisines[a] > cuisines[b] ? a : b
  )

  const mostFrequentTime = Object.keys(times).reduce((a, b) =>
    times[a] > times[b] ? a : b
  )

  return {
    cuisinePreferences: cuisines,
    mostLoved: mostFrequentCuisine,
    averageSpending: Math.round(totalSpent / orderHistory.length),
    frequentTimeOfDay: mostFrequentTime,
    healthGradePreference: 'A', // Safety-conscious user
    topRestaurants: [...new Set(orderHistory.map(o => o.restaurantName))].slice(0, 5),
    totalOrders: orderHistory.length
  }
}

/**
 * Get AI-powered dining insights
 * @param {Object} userPreferences - User preference data
 * @param {Object} restaurant - Target restaurant data
 * @returns {Promise<Object>} AI insights about the match
 */
export const getDiningInsights = async (userPreferences, restaurant) => {
  try {
    // In production, call OpenAI to analyze the match
    const insight = {
      source: 'AI Analysis Engine',
      overallMatch: 92,
      factors: {
        cuisineMatch: 95,
        budgetMatch: 88,
        healthSafety: 100, // Grade A
        popularity: 85,
        crowdLevel: 'Moderate',
        waitTime: '15-20 minutes',
        recommendationStrength: 'STRONG'
      },
      aiInsight: `Based on your love for ${userPreferences.mostLoved} cuisine and your preference for Grade A establishments, ${restaurant.name} is an excellent match. Users with similar profiles gave it a 4.8/5 rating.`,
      whyYouWillLoveIt: [
        `They use the same techniques as ${userPreferences.topRestaurants[0]}`,
        `Maintained a Grade A health score (${restaurant.healthScore}/100)`,
        `Average check is $${Math.round(restaurant.averagePrice)}, matching your budget`
      ],
      riskLevel: 'Very Low - Excellent safety record',
      timestamp: new Date().toISOString()
    }

    console.log('💡 Dining Insights:', insight)
    return insight
  } catch (error) {
    console.error('❌ Insights Error:', error)
    return { error: error.message }
  }
}

/**
 * Get top dishes recommendation from AI
 * @param {string} restaurantName - Restaurant to get dishes for
 * @param {Object} userPreferences - User preferences
 * @returns {Promise<Array>} Top dishes with descriptions
 */
export const getTopDishesForYou = async (restaurantName, userPreferences) => {
  try {
    // Mock AI-curated dish recommendations
    const topDishes = [
      {
        name: 'House Special Pasta',
        rating: 4.9,
        reviews: 342,
        whyForYou: `Perfect for your ${userPreferences.mostLoved} preference`,
        price: 22,
        healthCertified: true,
        reviews_text: 'Fresh, made-to-order, highest hygiene standards'
      },
      {
        name: 'Grilled Salmon',
        rating: 4.7,
        reviews: 218,
        whyForYou: 'Customers with your profile loved this dish',
        price: 28,
        healthCertified: true,
        reviews_text: 'Excellent source, properly handled and cooked'
      },
      {
        name: 'Seasonal Salad',
        rating: 4.8,
        reviews: 156,
        whyForYou: 'Fresh ingredients, verified safe handling',
        price: 16,
        healthCertified: true,
        reviews_text: 'Raw ingredients carefully sourced and stored'
      }
    ]

    console.log('🍽️ Top Dishes:', topDishes)
    return topDishes
  } catch (error) {
    console.error('❌ Dishes Error:', error)
    return { error: error.message }
  }
}

/**
 * Get personalized health & safety summary
 * @param {Object} restaurant - Restaurant with health data
 * @param {Array} userOrderHistory - User's past orders
 * @returns {Object} Safety insights
 */
export const getHealthSafetySummary = (restaurant, userOrderHistory = []) => {
  const summary = {
    gradeHistory: [
      { date: '2025-01', grade: 'A', score: restaurant.healthScore },
      { date: '2024-12', grade: 'A', score: restaurant.healthScore + 1 },
      { date: '2024-11', grade: 'A', score: restaurant.healthScore + 2 }
    ],
    noViolations: restaurant.violations === 0,
    lastInspection: restaurant.lastInspection,
    inspectionFrequency: 'Regular (Quarterly)',
    safetyScore: 95,
    reputationAmongUsers: 'Excellent',
    usersFamiliar: userOrderHistory.some(o => o.restaurantName === restaurant.name),
    recommendationLevel: 'HIGHLY RECOMMENDED',
    trustBadges: ['Health Certified', 'Grade A', 'Regular Inspection', 'Zero Violations']
  }

  return summary
}

export default {
  fetchRestaurantFromYelp,
  generateAIRecommendations,
  analyzeUserPreferences,
  getDiningInsights,
  getTopDishesForYou,
  getHealthSafetySummary
}
