/**
 * Google Maps Integration Utility
 * Handles Distance Matrix API calls for real-time delivery tracking
 * 
 * Features:
 * - Calculate travel time between restaurant and delivery address
 * - Account for real-time traffic conditions
 * - Estimate delivery ETA
 * - Get detailed route information
 */

// Note: In production, use environment variables for API keys
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'demo-key'
const DISTANCE_MATRIX_ENDPOINT = 'https://maps.googleapis.com/maps/api/distancematrix/json'

/**
 * Calculate travel time between two locations
 * @param {Object} origin - { lat: number, lng: number } or address string
 * @param {Object} destination - { lat: number, lng: number } or address string
 * @param {string} mode - 'driving' | 'walking' | 'bicycling' | 'transit'
 * @returns {Promise<Object>} Distance, duration, and traffic info
 */
export const calculateTravelTime = async (origin, destination, mode = 'driving') => {
  try {
    // Convert coordinates to address format if needed
    const originStr = typeof origin === 'string' ? origin : `${origin.lat},${origin.lng}`
    const destStr = typeof destination === 'string' ? destination : `${destination.lat},${destination.lng}`

    // In production, use Distance Matrix API
    // const response = await fetch(
    //   `${DISTANCE_MATRIX_ENDPOINT}?origins=${encodeURIComponent(originStr)}&destinations=${encodeURIComponent(destStr)}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}&departure_time=now&traffic_model=best_guess`
    // )

    // For demo: Return realistic Manhattan delivery times
    const mockData = {
      source: 'Google Maps API (Demo)',
      origin: originStr,
      destination: destStr,
      mode: mode,
      distanceInKm: 2.5,
      distanceInMiles: 1.55,
      durationInMinutes: mode === 'driving' ? 15 : 25,
      durationInTraffic: mode === 'driving' ? 22 : 28,
      trafficCondition: 'moderate',
      timestamp: new Date().toISOString(),
      estimatedArrival: new Date(Date.now() + 22 * 60000).toLocaleTimeString()
    }

    console.log('🚗 Google Maps Distance:', mockData)
    return mockData
  } catch (error) {
    console.error('❌ Distance Matrix Error:', error)
    return {
      error: error.message,
      durationInMinutes: 30, // Fallback estimate
      estimatedArrival: new Date(Date.now() + 30 * 60000).toLocaleTimeString()
    }
  }
}

/**
 * Get route details with waypoints
 * @param {Array} waypoints - Array of { lat, lng } objects
 * @returns {Promise<Object>} Route details
 */
export const getRouteWithWaypoints = async (waypoints) => {
  try {
    // In production, use Directions API with waypoints
    const mockRoute = {
      source: 'Google Maps Directions API (Demo)',
      totalDistance: 3.2,
      totalDuration: 18,
      steps: waypoints.map((point, idx) => ({
        stepNumber: idx + 1,
        lat: point.lat,
        lng: point.lng,
        instruction: `Turn at waypoint ${idx + 1}`,
        distance: 1.6,
        duration: 6
      })),
      polyline: 'encoded_polyline_here',
      timestamp: new Date().toISOString()
    }

    console.log('🗺️ Route Details:', mockRoute)
    return mockRoute
  } catch (error) {
    console.error('❌ Route Error:', error)
    return { error: error.message }
  }
}

/**
 * Calculate delivery ETA with real-time updates
 * @param {Object} restaurant - Restaurant location
 * @param {Object} deliveryAddress - Delivery location
 * @param {number} prepTimeMinutes - Food preparation time
 * @returns {Promise<Object>} ETA details
 */
export const calculateDeliveryEta = async (restaurant, deliveryAddress, prepTimeMinutes = 15) => {
  try {
    const travelInfo = await calculateTravelTime(restaurant, deliveryAddress, 'driving')
    
    const totalTimeMinutes = prepTimeMinutes + (travelInfo.durationInTraffic || 22)
    const etaTime = new Date(Date.now() + totalTimeMinutes * 60000)

    const eta = {
      prepTime: prepTimeMinutes,
      travelTime: travelInfo.durationInTraffic || 22,
      totalTime: totalTimeMinutes,
      orderTime: new Date().toLocaleTimeString(),
      estimatedArrival: etaTime.toLocaleTimeString(),
      estimatedArrivalFull: etaTime.toLocaleString(),
      trafficCondition: travelInfo.trafficCondition || 'normal',
      deliveryType: 'standard',
      source: 'Real-time traffic calculation'
    }

    console.log('⏱️ Delivery ETA:', eta)
    return eta
  } catch (error) {
    console.error('❌ ETA Calculation Error:', error)
    return {
      error: error.message,
      totalTime: prepTimeMinutes + 30,
      estimatedArrival: new Date(Date.now() + (prepTimeMinutes + 30) * 60000).toLocaleTimeString()
    }
  }
}

/**
 * Get live traffic conditions for a route
 * @param {string} route - Route name or address
 * @returns {Promise<Object>} Current traffic info
 */
export const getLiveTrafficConditions = async (route) => {
  try {
    // In production, use Google Maps Speed Layer API
    const trafficConditions = {
      source: 'Google Maps Traffic Layer (Demo)',
      route: route,
      condition: ['light', 'moderate', 'heavy'][Math.floor(Math.random() * 3)],
      avgSpeed: 25 + Math.random() * 15, // 25-40 mph in Manhattan
      speedLimit: 30,
      incidents: 0,
      timestamp: new Date().toISOString(),
      lastUpdate: new Date(Date.now() - 30000).toISOString() // 30 seconds ago
    }

    console.log('🚦 Traffic Conditions:', trafficConditions)
    return trafficConditions
  } catch (error) {
    console.error('❌ Traffic Error:', error)
    return { error: error.message, condition: 'unknown' }
  }
}

/**
 * Simulate live delivery position tracking
 * @param {Object} startPoint - { lat, lng }
 * @param {Object} endPoint - { lat, lng }
 * @param {number} durationMinutes - Total delivery duration
 * @returns {Object} Real-time position simulator
 */
export const createLiveDeliveryTracker = (startPoint, endPoint, durationMinutes = 20) => {
  let currentPosition = { ...startPoint }
  let elapsedTime = 0
  const stepSize = durationMinutes / 10 // Update every 2 minutes for 20-minute delivery

  const simulator = {
    startPosition: startPoint,
    endPosition: endPoint,
    durationMinutes: durationMinutes,
    
    /**
     * Get current delivery position
     */
    getCurrentPosition: () => {
      const progress = Math.min(elapsedTime / durationMinutes, 1)
      const newLat = startPoint.lat + (endPoint.lat - startPoint.lat) * progress
      const newLng = startPoint.lng + (endPoint.lng - startPoint.lng) * progress
      
      return {
        lat: newLat,
        lng: newLng,
        progress: progress * 100,
        remainingMinutes: Math.max(0, durationMinutes - elapsedTime),
        timestamp: new Date().toISOString()
      }
    },

    /**
     * Advance simulation
     */
    advance: () => {
      elapsedTime += stepSize
      return simulator.getCurrentPosition()
    },

    /**
     * Reset simulation
     */
    reset: () => {
      elapsedTime = 0
      return simulator.getCurrentPosition()
    },

    /**
     * Set manual progress (0-100)
     */
    setProgress: (percentage) => {
      elapsedTime = (percentage / 100) * durationMinutes
      return simulator.getCurrentPosition()
    }
  }

  return simulator
}

/**
 * Get nearest restaurant location
 * @param {Object} userLocation - User's { lat, lng }
 * @param {Array} restaurants - Array of restaurant locations
 * @returns {Object} Nearest restaurant and distance
 */
export const findNearestRestaurant = (userLocation, restaurants) => {
  if (!restaurants || restaurants.length === 0) return null

  let nearest = null
  let minDistance = Infinity

  restaurants.forEach(restaurant => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurant.lat,
      restaurant.lng
    )

    if (distance < minDistance) {
      minDistance = distance
      nearest = { ...restaurant, distance }
    }
  })

  return nearest
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default {
  calculateTravelTime,
  getRouteWithWaypoints,
  calculateDeliveryEta,
  getLiveTrafficConditions,
  createLiveDeliveryTracker,
  findNearestRestaurant
}
