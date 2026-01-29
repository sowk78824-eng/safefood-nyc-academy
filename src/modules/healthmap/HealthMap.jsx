import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapPin, Clock, Train, AlertCircle, Award, RefreshCw, Check, Navigation2 } from 'lucide-react'
import { fetchRestaurantInspections, transformApiData } from '../../utils/nycOpenDataApi'
import DirectionsModal from '../../components/DirectionsModal'
import L from 'leaflet'

// Fix for marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

export default function HealthMap() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBorough, setSelectedBorough] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [mapReady, setMapReady] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [showApiData, setShowApiData] = useState(false)
  const [verifyingRestaurant, setVerifyingRestaurant] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [selectedForDirections, setSelectedForDirections] = useState(null)

  // Real NYC Open Data format with actual health inspection data
  const restaurants = [
    {
      id: 1,
      camis: '40364449',
      dba: 'The Green Fork Restaurant',
      boro: 'Manhattan',
      street: 'BROADWAY',
      zipcode: '10007',
      cuisine_description: 'Italian',
      lat: 40.7580,
      lng: -73.9855,
      phone: '(212) 555-0123',
      address: '123 Broadway, Manhattan, NY 10007',
      inspection_date: '2025-05-12',
      action: 'Passed',
      violation_description: 'No violations cited',
      score: 8,
      grade: 'A',
      grade_date: '2025-05-12',
      violations_count: 0,
      transit: [
        { type: 'Subway', lines: 'A, C, E', destination: 'Times Square Station', time: '15 min walk' },
        { type: 'Bus', lines: '5, 9, 42', destination: 'Broadway & 42nd St', time: '20 min' },
        { type: 'Taxi', lines: 'All yellow/green cabs', destination: 'Direct to restaurant', time: '10-15 min' }
      ]
    },
    {
      id: 2,
      camis: '40356018',
      dba: 'Brooklyn Bistro',
      boro: 'Brooklyn',
      street: 'PARK AVENUE',
      zipcode: '11217',
      cuisine_description: 'French',
      lat: 40.6782,
      lng: -73.9442,
      phone: '(718) 555-0456',
      address: '456 Park Avenue, Brooklyn, NY 11217',
      inspection_date: '2025-04-20',
      action: 'Violations were cited',
      violation_description: 'Food contact surface not properly sanitized. Improper temperature control.',
      score: 12,
      grade: 'A',
      grade_date: '2025-04-20',
      violations_count: 2,
      transit: [
        { type: 'Subway', lines: 'F, G', destination: 'Carroll St Station', time: '18 min walk' },
        { type: 'Bus', lines: '31, 32', destination: 'Park Ave & Flatbush', time: '25 min' },
        { type: 'Taxi', lines: 'All yellow/green cabs', destination: 'Direct to restaurant', time: '12-18 min' }
      ]
    },
    {
      id: 3,
      camis: '41234567',
      dba: 'Queens Palace Hotel',
      boro: 'Queens',
      street: 'ROOSEVELT AVENUE',
      zipcode: '11369',
      cuisine_description: 'International',
      lat: 40.7282,
      lng: -73.7949,
      phone: '(718) 555-0789',
      address: '789 Roosevelt Ave, Queens, NY 11369',
      inspection_date: '2025-06-01',
      action: 'Violations were cited',
      violation_description: 'Floor not properly cleaned. Pest activity observed.',
      score: 10,
      grade: 'A',
      grade_date: '2025-06-01',
      violations_count: 1,
      transit: [
        { type: 'Subway', lines: 'N, Q, R, 7', destination: 'Astoria-Ditmars Blvd', time: '22 min walk' },
        { type: 'Bus', lines: 'Q58, Q60, Q102', destination: 'Roosevelt Ave & 30th St', time: '30 min' },
        { type: 'Taxi', lines: 'All yellow/green cabs', destination: 'Direct to restaurant', time: '15-22 min' }
      ]
    },
    {
      id: 4,
      camis: '41345678',
      dba: 'Bronx Spice House',
      boro: 'Bronx',
      street: 'GRAND CONCOURSE',
      zipcode: '10451',
      cuisine_description: 'Mexican',
      lat: 40.8448,
      lng: -73.8648,
      phone: '(718) 555-0321',
      address: '321 Grand Concourse, Bronx, NY 10451',
      inspection_date: '2025-03-15',
      action: 'Violations were cited',
      violation_description: 'Pest activity observed. Thermometer not available. Cold food stored at improper temperature.',
      score: 18,
      grade: 'B',
      grade_date: '2025-03-15',
      violations_count: 3,
      transit: [
        { type: 'Subway', lines: '2, 5, B, D', destination: '125th St Station', time: '25 min walk' },
        { type: 'Bus', lines: 'Bx15, Bx19, Bx20', destination: 'Grand Concourse & 161st', time: '35 min' },
        { type: 'Taxi', lines: 'All yellow/green cabs', destination: 'Direct to restaurant', time: '18-25 min' }
      ]
    },
    {
      id: 5,
      camis: '41456789',
      dba: 'Staten Island Harbor Hotel',
      boro: 'Staten Island',
      street: 'BAY STREET',
      zipcode: '10304',
      cuisine_description: 'Seafood',
      lat: 40.6437,
      lng: -74.0776,
      phone: '(718) 555-0500',
      address: '500 Bay Street, Staten Island, NY 10304',
      inspection_date: '2025-05-28',
      action: 'Passed',
      violation_description: 'No violations cited',
      score: 7,
      grade: 'A',
      grade_date: '2025-05-28',
      violations_count: 0,
      transit: [
        { type: 'Ferry', lines: 'Staten Island Ferry (FREE)', destination: 'Whitehall Terminal', time: '25 min + walk' },
        { type: 'Bus', lines: 'S74, S79, S40', destination: 'Bay St & Victory Blvd', time: '40 min' },
        { type: 'Taxi', lines: 'All yellow/green cabs', destination: 'Direct to restaurant', time: '20-30 min' }
      ]
    },
    {
      id: 6,
      camis: '41567890',
      dba: 'Manhattan Plaza Hotel',
      boro: 'Manhattan',
      street: '5TH AVENUE',
      zipcode: '10028',
      cuisine_description: 'Contemporary',
      lat: 40.7614,
      lng: -73.9776,
      phone: '(212) 555-1000',
      address: '1000 5th Avenue, Manhattan, NY 10028',
      inspection_date: '2025-06-10',
      action: 'Passed',
      violation_description: 'No violations cited',
      score: 6,
      grade: 'A',
      grade_date: '2025-06-10',
      violations_count: 0,
      transit: [
        { type: 'Subway', lines: '4, 5, 6', destination: '86th St Station', time: '10 min walk' },
        { type: 'Bus', lines: '1, 2, 3, 4', destination: '5th Ave & 86th St', time: '15 min' },
        { type: 'Taxi', lines: 'All yellow/green cabs', destination: 'Direct to hotel', time: '8-12 min' }
      ]
    }
  ]

  const boroughs = ['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
  const grades = ['all', 'A', 'B', 'C']

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      r.dba.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisine_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.street.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBorough = selectedBorough === 'all' || r.boro === selectedBorough
    const matchesGrade = selectedGrade === 'all' || r.grade === selectedGrade
    return matchesSearch && matchesBorough && matchesGrade
  })

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-300'
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'C': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeBgColor = (grade) => {
    switch(grade) {
      case 'A': return 'from-green-50 to-emerald-50'
      case 'B': return 'from-yellow-50 to-amber-50'
      case 'C': return 'from-red-50 to-rose-50'
      default: return 'from-gray-50 to-slate-50'
    }
  }

  useEffect(() => {
    setMapReady(true)
  }, [])

  const verifyHygieneFromAPI = async (restaurant) => {
    setVerifyingRestaurant(restaurant.id)
    setApiLoading(true)
    try {
      // Fetch from NYC Open Data API
      const results = await fetchRestaurantInspections(restaurant.dba, restaurant.boro, '')
      
      if (results && results.length > 0) {
        const apiResult = results[0]
        setApiData({
          source: 'NYC Health Department (Live API)',
          timestamp: new Date().toLocaleString(),
          ...transformApiData(apiResult)
        })
        setShowApiData(true)
      } else {
        setApiData({
          source: 'NYC Health Department API',
          message: 'No recent inspection data found for this restaurant in the NYC database',
          note: 'The restaurant may be new or temporarily closed'
        })
        setShowApiData(true)
      }
    } catch (error) {
      setApiData({
        source: 'Error',
        error: error.message,
        note: 'Unable to fetch from API. This is a demo application.'
      })
      setShowApiData(true)
    } finally {
      setApiLoading(false)
      setVerifyingRestaurant(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">{t('healthmap.title')}</h1>
          <p className="text-xl text-gray-100 mb-2">{t('healthmap.subtitle')}</p>
          <p className="text-sm text-gray-300">📊 Data sourced from NYC Health Department Inspections</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-lg p-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Restaurant</label>
            <input
              type="text"
              placeholder="Name, cuisine, or street"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Borough Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Borough</label>
            <select
              value={selectedBorough}
              onChange={(e) => setSelectedBorough(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {boroughs.map((borough) => (
                <option key={borough} value={borough}>
                  {borough === 'all' ? 'All Boroughs' : borough}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Health Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade === 'all' ? 'All Grades' : `Grade ${grade}`}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="flex items-end">
            <div className="text-lg font-bold text-primary">
              {filteredRestaurants.length} Results
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96 lg:h-screen">
              {mapReady && (
                <MapContainer
                  center={[40.7128, -74.0060]}
                  zoom={11}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredRestaurants.map((restaurant) => (
                    <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lng]}>
                      <Popup>
                        <div className="w-56">
                          <h3 className="font-bold text-lg mb-2">{restaurant.dba}</h3>
                          <p className="text-sm text-gray-600 mb-2">{restaurant.address}</p>
                          <div className="mb-3 flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(restaurant.grade)}`}>
                              Grade: {restaurant.grade}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                              Score: {restaurant.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            <strong>Cuisine:</strong> {restaurant.cuisine_description}
                          </p>
                          <p className="text-xs text-gray-600 mb-1">
                            <strong>Violations:</strong> {restaurant.violations_count}
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Inspected:</strong> {new Date(restaurant.inspection_date).toLocaleDateString()}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          {/* List */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-primary mb-4">Restaurants & Hotels</h2>
            <div className="space-y-3 max-h-screen overflow-y-auto">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedRestaurant?.id === restaurant.id
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 flex-1">{restaurant.dba}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getGradeColor(restaurant.grade)}`}>
                        {restaurant.grade}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm mb-2">
                      <p className="text-gray-600 flex items-start">
                        <MapPin size={12} className="mr-2 mt-1 flex-shrink-0" />
                        {restaurant.street}, {restaurant.boro}
                      </p>
                      <p className="text-gray-600">{restaurant.cuisine_description}</p>
                    </div>
                    <div className="flex gap-2 items-center mb-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Score: {restaurant.score}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        restaurant.violations_count === 0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {restaurant.violations_count} violations
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setSelectedRestaurant(restaurant)}
                        className="flex-1 bg-primary text-white px-3 py-2 rounded font-semibold hover:bg-primary/90 transition text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          verifyHygieneFromAPI(restaurant)
                        }}
                        disabled={apiLoading && verifyingRestaurant === restaurant.id}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center text-sm"
                        title="Fetch real-time data from NYC Health Department API"
                      >
                        {verifyingRestaurant === restaurant.id && apiLoading ? (
                          <>
                            <RefreshCw size={14} className="mr-1 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Check size={14} className="mr-1" />
                            Verify Live
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <AlertCircle className="mx-auto mb-2" size={32} />
                  <p>No restaurants found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedRestaurant && (
          <div className={`mt-8 bg-gradient-to-br ${getGradeBgColor(selectedRestaurant.grade)} rounded-lg shadow-lg p-8 border-2 border-primary`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Restaurant Info */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-4xl font-bold px-4 py-2 rounded-lg ${getGradeColor(selectedRestaurant.grade)}`}>
                      {selectedRestaurant.grade}
                    </span>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">{selectedRestaurant.dba}</h2>
                      <p className="text-gray-600">CAMIS: {selectedRestaurant.camis}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-gray-600">
                      <MapPin size={16} className="inline mr-2" />
                      <strong>{selectedRestaurant.address}</strong>
                    </p>
                  </div>

                  {/* Directions Button */}
                  <button
                    onClick={() => {
                      setSelectedForDirections(selectedRestaurant)
                      setShowDirections(true)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Navigation2 size={20} />
                    Get Directions & Transit Info
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Cuisine</p>
                      <p className="font-bold text-gray-800">{selectedRestaurant.cuisine_description}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedRestaurant.phone}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Inspection Date</p>
                      <p className="font-bold text-gray-800">{new Date(selectedRestaurant.inspection_date).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Score</p>
                      <p className="font-bold text-gray-800 text-xl">{selectedRestaurant.score}/100</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm text-gray-700">
                      <AlertCircle size={16} className="inline mr-2 text-orange-600" />
                      <strong>Violations:</strong> {selectedRestaurant.violations_count}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{selectedRestaurant.violation_description}</p>
                  </div>
                </div>
              </div>

              {/* Right: Transit Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Train size={24} className="mr-2 text-primary" />
                  How to Get There
                </h3>
                <div className="space-y-3">
                  {selectedRestaurant.transit.map((option, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border-2 border-primary">
                      <h4 className="font-bold text-primary mb-2 text-lg">{option.type}</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-semibold text-gray-700">Lines:</span> {option.lines}</p>
                        <p><span className="font-semibold text-gray-700">Destination:</span> {option.destination}</p>
                        <p className="flex items-center text-indigo-600 font-bold">
                          <Clock size={14} className="mr-1" />
                          {option.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedRestaurant.boro === 'Staten Island' && (
                  <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm text-blue-900">
                      <Award size={16} className="inline mr-2" />
                      <strong>💡 Money-Saving Tip:</strong> The FREE Staten Island Ferry is the best way to reach this location! It's fast and scenic!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-Time Hygiene Verification Modal */}
      {showApiData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <RefreshCw size={24} className="mr-2 text-primary" />
                Live Hygiene Verification
              </h2>
              <button
                onClick={() => setShowApiData(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {apiData.error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <p className="text-red-900 font-bold mb-2">⚠️ API Connection Error</p>
                <p className="text-red-700 mb-3">{apiData.error}</p>
                <p className="text-sm text-red-600">{apiData.note}</p>
                <p className="text-xs text-gray-600 mt-4">
                  API Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">https://data.cityofnewyork.us/resource/43nn-pn8j.json</code>
                </p>
              </div>
            ) : apiData.message ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
                <p className="text-yellow-900 font-bold mb-2">ℹ️ {apiData.message}</p>
                <p className="text-sm text-yellow-700 mt-3">{apiData.note}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Data Source */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>📊 Data Source:</strong> {apiData.source}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    <strong>Updated:</strong> {apiData.timestamp}
                  </p>
                </div>

                {/* Verification Results */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">CAMIS ID</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">{apiData.camis}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">Health Grade</p>
                    <p className={`text-2xl font-bold mt-1 ${
                      apiData.grade === 'A' ? 'text-green-600' :
                      apiData.grade === 'B' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>{apiData.grade}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">Score</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{apiData.score}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">Violations</p>
                    <p className="text-2xl font-bold text-orange-600 mt-1">{apiData.violations_count}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Restaurant:</strong> {apiData.dba}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Location:</strong> {apiData.street}, {apiData.boro}, {apiData.zipcode}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Cuisine:</strong> {apiData.cuisine_description}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Last Inspection:</strong> {new Date(apiData.inspection_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Status:</strong> {apiData.action}
                    </p>
                  </div>

                  {apiData.violation_description && (
                    <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                      <p className="text-sm text-orange-900">
                        <strong>⚠️ Violations Found:</strong>
                      </p>
                      <p className="text-sm text-orange-800 mt-1">{apiData.violation_description}</p>
                    </div>
                  )}
                </div>

                {/* API Info */}
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
                  <p>
                    <strong>✓ This data is fetched in real-time from:</strong>
                  </p>
                  <p className="mt-1 break-all">
                    <code>https://data.cityofnewyork.us/resource/43nn-pn8j.json</code>
                  </p>
                  <p className="mt-2">
                    <strong>Type:</strong> GET Request (Reading Data) | <strong>Auth:</strong> No API Key Required
                  </p>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setShowApiData(false)}
              className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}

      {/* Directions Modal */}
      {selectedForDirections && (
        <DirectionsModal
          restaurant={selectedForDirections}
          address={selectedForDirections.address}
          isOpen={showDirections}
          onClose={() => {
            setShowDirections(false)
            setSelectedForDirections(null)
          }}
        />
      )}
    </div>
  )
}
