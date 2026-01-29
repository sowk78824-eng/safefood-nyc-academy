/**
 * NYC Open Data API Utility
 * Handles requests to NYC Department of Health Restaurant Inspection API
 * API Endpoint: https://data.cityofnewyork.us/resource/43nn-pn8j.json
 * 
 * This is a GET request (Option A: Reading Data)
 * No authentication required for basic queries
 */

const NYC_OPEN_DATA_API = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json'

/**
 * Fetch restaurants by criteria
 * @param {string} searchTerm - Restaurant name or address to search
 * @param {string} borough - Borough name (Manhattan, Brooklyn, Queens, Bronx, Staten Island)
 * @param {string} grade - Health grade (A, B, C)
 * @returns {Promise<Array>} Array of restaurant inspection data
 */
export const fetchRestaurantInspections = async (searchTerm = '', borough = '', grade = '') => {
  try {
    // Build query parameters
    let query = ''
    const params = []

    // Add search filters
    if (searchTerm) {
      params.push(`dba like '%${searchTerm.toUpperCase()}%'`)
    }
    if (borough) {
      params.push(`boro = '${borough}'`)
    }
    if (grade) {
      params.push(`grade = '${grade}'`)
    }

    // Combine parameters with AND operator
    if (params.length > 0) {
      query = params.join(' AND ')
    }

    // Build the full URL with query
    const url = new URL(NYC_OPEN_DATA_API)
    if (query) {
      url.searchParams.append('$where', query)
    }
    url.searchParams.append('$limit', '50') // Limit results

    console.log('🔍 Fetching from NYC Open Data API:', url.toString())

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    console.log('✅ API Response:', data)
    
    return data || []
  } catch (error) {
    console.error('❌ Error fetching from NYC Open Data API:', error)
    // Return empty array on error (graceful fallback)
    return []
  }
}

/**
 * Fetch a single restaurant by CAMIS ID
 * @param {string} camis - CAMIS ID (unique restaurant identifier)
 * @returns {Promise<Object>} Restaurant inspection data
 */
export const fetchRestaurantByCamis = async (camis) => {
  try {
    const url = new URL(NYC_OPEN_DATA_API)
    url.searchParams.append('$where', `camis = '${camis}'`)
    url.searchParams.append('$limit', '1')

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return data && data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('❌ Error fetching restaurant by CAMIS:', error)
    return null
  }
}

/**
 * Fetch restaurants by borough and grade
 * @param {string} borough - Borough name
 * @param {string} grade - Grade (A, B, C)
 * @returns {Promise<Array>} Filtered restaurants
 */
export const fetchRestaurantsByBoroughAndGrade = async (borough, grade) => {
  try {
    const url = new URL(NYC_OPEN_DATA_API)
    const params = []
    
    if (borough) params.push(`boro = '${borough}'`)
    if (grade) params.push(`grade = '${grade}'`)

    if (params.length > 0) {
      url.searchParams.append('$where', params.join(' AND '))
    }

    url.searchParams.append('$limit', '50')

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('❌ Error fetching restaurants by borough and grade:', error)
    return []
  }
}

/**
 * Get health statistics for a borough
 * @param {string} borough - Borough name
 * @returns {Promise<Object>} Statistics (total restaurants, grades distribution, etc.)
 */
export const getBoroughHealthStatistics = async (borough) => {
  try {
    const restaurants = await fetchRestaurantsByBoroughAndGrade(borough, '')
    
    const stats = {
      total: restaurants.length,
      gradeA: restaurants.filter(r => r.grade === 'A').length,
      gradeB: restaurants.filter(r => r.grade === 'B').length,
      gradeC: restaurants.filter(r => r.grade === 'C').length,
      avgScore: restaurants.length > 0 
        ? (restaurants.reduce((sum, r) => sum + (parseInt(r.score) || 0), 0) / restaurants.length).toFixed(2)
        : 0
    }

    return stats
  } catch (error) {
    console.error('❌ Error getting borough health statistics:', error)
    return null
  }
}

/**
 * Transform API response to match our app's data structure
 * @param {Object} apiData - Raw data from NYC Open Data API
 * @returns {Object} Formatted data for our app
 */
export const transformApiData = (apiData) => {
  return {
    camis: apiData.camis,
    dba: apiData.dba,
    boro: apiData.boro,
    street: apiData.street,
    zipcode: apiData.zipcode,
    cuisine_description: apiData.cuisine_description,
    phone: apiData.phone || 'N/A',
    inspection_date: apiData.inspection_date,
    action: apiData.action,
    violation_description: apiData.violation_description || 'No violations',
    score: parseInt(apiData.score) || 0,
    grade: apiData.grade || 'N/A',
    grade_date: apiData.grade_date,
    violations_count: apiData.violation_code ? 1 : 0
  }
}

export default {
  fetchRestaurantInspections,
  fetchRestaurantByCamis,
  fetchRestaurantsByBoroughAndGrade,
  getBoroughHealthStatistics,
  transformApiData
}
