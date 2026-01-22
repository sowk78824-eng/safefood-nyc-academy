import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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
  const [mapReady, setMapReady] = useState(false)

  // Sample restaurant data with NYC coordinates
  const restaurants = [
    {
      id: 1,
      name: 'Giovanni\'s Italian Kitchen',
      lat: 40.7282,
      lng: -73.7949,
      borough: 'Queens',
      cuisine: 'Italian',
      score: 92,
      violations: 0,
      phone: '(718) 555-0101',
      address: '123 Main St, Queens, NY'
    },
    {
      id: 2,
      name: 'Sakura Sushi Bar',
      lat: 40.7614,
      lng: -73.9776,
      borough: 'Manhattan',
      cuisine: 'Japanese',
      score: 87,
      violations: 2,
      phone: '(212) 555-0102',
      address: '456 Broadway, Manhattan, NY'
    },
    {
      id: 3,
      name: 'Dragon House',
      lat: 40.6501,
      lng: -73.9496,
      borough: 'Brooklyn',
      cuisine: 'Chinese',
      score: 78,
      violations: 5,
      phone: '(718) 555-0103',
      address: '789 Flatbush Ave, Brooklyn, NY'
    },
    {
      id: 4,
      name: 'El Mariachi',
      lat: 40.8448,
      lng: -73.8648,
      borough: 'Bronx',
      cuisine: 'Mexican',
      score: 85,
      violations: 3,
      phone: '(718) 555-0104',
      address: '321 Grand Concourse, Bronx, NY'
    },
    {
      id: 5,
      name: 'Caribbean Spice',
      lat: 40.5705,
      lng: -74.2506,
      borough: 'Staten Island',
      cuisine: 'Caribbean',
      score: 88,
      violations: 1,
      phone: '(718) 555-0105',
      address: '654 Victory Blvd, Staten Island, NY'
    }
  ]

  const boroughs = ['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBorough = selectedBorough === 'all' || r.borough === selectedBorough
    return matchesSearch && matchesBorough
  })

  const getScoreColor = (score) => {
    if (score >= 90) return '#27ae60' // Green
    if (score >= 80) return '#3498db' // Blue
    if (score >= 70) return '#f39c12' // Orange
    return '#e74c3c' // Red
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 80) return 'bg-blue-100 text-blue-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  useEffect(() => {
    setMapReady(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{t('healthmap.title')}</h1>
          <p className="text-xl text-gray-100">{t('healthmap.subtitle')}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-lg p-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder={t('healthmap.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Borough Filter */}
          <div>
            <select
              value={selectedBorough}
              onChange={(e) => setSelectedBorough(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {boroughs.map((borough) => (
                <option key={borough} value={borough}>
                  {borough === 'all' ? t('healthmap.filter') : borough}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-end text-gray-600 font-semibold">
            {filteredRestaurants.length} {t('healthmap.nearby')}
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
                        <div className="w-48">
                          <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{restaurant.address}</p>
                          <div className="mb-2">
                            <span className={`px-2 py-1 rounded text-sm font-bold ${getScoreBadge(restaurant.score)}`}>
                              {t('healthmap.score')}: {restaurant.score}
                            </span>
                          </div>
                          <p className="text-sm">{t('healthmap.cuisine')}: {restaurant.cuisine}</p>
                          <p className="text-sm text-red-600">{t('healthmap.violations')}: {restaurant.violations}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          {/* List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">{t('healthmap.details')}</h2>
            <div className="space-y-4 max-h-96 lg:max-h-screen overflow-y-auto">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{restaurant.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">{t('healthmap.cuisine')}:</span> {restaurant.cuisine}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{t('healthmap.borough')}:</span> {restaurant.borough}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{t('healthmap.phone')}:</span> {restaurant.phone}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold text-sm ${getScoreBadge(
                          restaurant.score
                        )}`}
                      >
                        {t('healthmap.score')}: {restaurant.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
