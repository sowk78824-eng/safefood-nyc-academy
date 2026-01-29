/**
 * Google Maps Directions Utility
 * Generates URLs for Google Maps directions with transit information
 * Supports multiple modes: walking, driving, transit, bicycling
 */

/**
 * Open Google Maps directions in a new tab
 * @param {string} restaurantAddress - Restaurant/hotel address
 * @param {string} restaurantName - Restaurant/hotel name (optional)
 * @param {object} userLocation - User's current location {latitude, longitude}
 * @param {string} mode - Transit mode: 'driving', 'transit', 'walking', 'bicycling'
 */
export const openGoogleMapsDirections = (restaurantAddress, restaurantName = '', userLocation = null, mode = 'transit') => {
  try {
    let mapsUrl = 'https://www.google.com/maps/dir/?api=1'

    // Add origin (user location)
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      mapsUrl += `&origin=${userLocation.latitude},${userLocation.longitude}`
    }

    // Add destination
    const destination = restaurantName ? `${restaurantName}, ${restaurantAddress}` : restaurantAddress
    mapsUrl += `&destination=${encodeURIComponent(destination)}`

    // Add transit mode
    const modeMap = {
      'driving': 'd',
      'transit': 'r',
      'walking': 'w',
      'bicycling': 'b'
    }
    mapsUrl += `&travelmode=${modeMap[mode] || 'r'}`

    // Open in new tab
    window.open(mapsUrl, '_blank', 'noopener,noreferrer')
    return true
  } catch (error) {
    console.error('Error opening Google Maps:', error)
    return false
  }
}

/**
 * Get user's current location using browser Geolocation API
 * @returns {Promise<object>} - Location object with latitude and longitude
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        })
      },
      (error) => {
        console.error('Geolocation error:', error.message)
        reject(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // Cache for 5 minutes
      }
    )
  })
}

/**
 * Generate multiple Google Maps URLs for different transit modes
 * @param {string} restaurantAddress - Restaurant/hotel address
 * @param {string} restaurantName - Restaurant/hotel name
 * @param {object} userLocation - User's current location
 * @returns {object} - Object with URLs for different transit modes
 */
export const generateTransitUrls = (restaurantAddress, restaurantName = '', userLocation = null) => {
  const modes = ['transit', 'driving', 'walking', 'bicycling']
  const urls = {}

  modes.forEach(mode => {
    let url = 'https://www.google.com/maps/dir/?api=1'
    
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      url += `&origin=${userLocation.latitude},${userLocation.longitude}`
    }

    const destination = restaurantName ? `${restaurantName}, ${restaurantAddress}` : restaurantAddress
    url += `&destination=${encodeURIComponent(destination)}`

    const modeMap = {
      'driving': 'd',
      'transit': 'r',
      'walking': 'w',
      'bicycling': 'b'
    }
    url += `&travelmode=${modeMap[mode]}`

    urls[mode] = url
  })

  return urls
}

/**
 * Generate Apple Maps directions URL
 * @param {string} restaurantAddress - Restaurant/hotel address
 * @param {string} restaurantName - Restaurant/hotel name
 * @param {object} userLocation - User's current location
 */
export const getAppleMapsUrl = (restaurantAddress, restaurantName = '', userLocation = null) => {
  const destination = restaurantName ? `${restaurantName}, ${restaurantAddress}` : restaurantAddress
  
  let mapsUrl = `maps://maps.apple.com/?address=${encodeURIComponent(destination)}`
  
  if (userLocation && userLocation.latitude && userLocation.longitude) {
    mapsUrl += `&sll=${userLocation.latitude},${userLocation.longitude}`
  }

  return mapsUrl
}

/**
 * Get transit information text for user
 * @param {string} mode - Transit mode
 * @returns {string} - User-friendly transit description
 */
export const getTransitDescription = (mode) => {
  const descriptions = {
    'transit': '🚇 Public Transit (Subway, Bus, Train)',
    'driving': '🚗 Driving',
    'walking': '🚶 Walking',
    'bicycling': '🚴 Bicycling'
  }
  return descriptions[mode] || 'Get Directions'
}

/**
 * Format address for maps display
 * @param {object} addressObj - Address object with street, city, zip, borough
 * @returns {string} - Formatted address string
 */
export const formatAddressForMaps = (addressObj) => {
  if (typeof addressObj === 'string') {
    return addressObj
  }

  const { street, city, state, zip, borough } = addressObj
  const parts = [street, city || borough, state, zip].filter(Boolean)
  return parts.join(', ')
}

/**
 * Open Apple Maps (for iOS users)
 * @param {string} restaurantAddress - Restaurant/hotel address
 * @param {string} restaurantName - Restaurant/hotel name
 * @param {object} userLocation - User's current location
 */
export const openAppleMaps = (restaurantAddress, restaurantName = '', userLocation = null) => {
  try {
    const url = getAppleMapsUrl(restaurantAddress, restaurantName, userLocation)
    
    // Check if on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    
    if (isIOS) {
      window.location.href = url
      return true
    } else {
      // Fallback to Google Maps on non-iOS
      return openGoogleMapsDirections(restaurantAddress, restaurantName, userLocation, 'transit')
    }
  } catch (error) {
    console.error('Error opening Apple Maps:', error)
    return false
  }
}

/**
 * Demo mode - simulate getting directions
 * @param {string} restaurantName - Restaurant name
 * @returns {object} - Demo transit information
 */
export const getDirectionsDemo = (restaurantName = 'Restaurant') => {
  const demoDirections = {
    estimatedTime: {
      transit: '22-28 minutes',
      driving: '12-18 minutes',
      walking: '35-45 minutes',
      bicycling: '15-20 minutes'
    },
    transitOptions: [
      {
        mode: 'transit',
        description: 'Subway F or G train → Walk 5 min',
        stops: 8,
        transfers: 1,
        fare: '$2.75'
      },
      {
        mode: 'driving',
        description: 'Manhattan Bridge → Broadway',
        distance: '2.3 miles',
        fare: '$2-5 (toll + parking)'
      },
      {
        mode: 'walking',
        description: 'Walk via Park Ave → 5th Ave',
        distance: '1.8 miles',
        duration: '40 minutes'
      },
      {
        mode: 'bicycling',
        description: 'Bike path via Central Park',
        distance: '1.5 miles',
        duration: '18 minutes'
      }
    ],
    alert: null // No real-time alerts in demo
  }

  return demoDirections
}

export default {
  openGoogleMapsDirections,
  getUserLocation,
  generateTransitUrls,
  getAppleMapsUrl,
  getTransitDescription,
  formatAddressForMaps,
  openAppleMaps,
  getDirectionsDemo
}
