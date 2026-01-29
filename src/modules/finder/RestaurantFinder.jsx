import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Star, Search, DollarSign, AlertCircle, Clock, Navigation2 } from 'lucide-react'
import DirectionsModal from '../../components/DirectionsModal'

export default function RestaurantFinder() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedBorough, setSelectedBorough] = useState('all')
  const [selectedEstablishment, setSelectedEstablishment] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [selectedForDirections, setSelectedForDirections] = useState(null)

  // Sample restaurant & hotel data with health scores, hours, and transport
  const establishments = [
    {
      id: 1,
      name: 'The Green Fork Restaurant',
      type: 'restaurant',
      borough: 'Manhattan',
      address: '123 Broadway, NYC',
      healthScore: 95,
      rating: 4.8,
      reviews: 342,
      cuisine: 'Italian',
      priceRange: '$$$',
      openTime: '11:00',
      closeTime: '23:00',
      menus: [
        { name: 'Spaghetti Carbonara', price: 18 },
        { name: 'Risotto Milano', price: 22 },
        { name: 'Tiramisu', price: 8 }
      ],
      transport: [
        { type: 'Subway', lines: 'A, C, E', time: '15 min' },
        { type: 'Bus', lines: '5, 9, 42', time: '20 min' },
        { type: 'Taxi', lines: 'Available', time: '10 min' },
        { type: 'Walking', lines: 'From Times Square', time: '12 min' }
      ],
      lastInspection: '2024-01-15',
      violations: 0
    },
    {
      id: 2,
      name: 'Brooklyn Bistro',
      type: 'restaurant',
      borough: 'Brooklyn',
      address: '456 Park Avenue, Brooklyn',
      healthScore: 88,
      rating: 4.5,
      reviews: 215,
      cuisine: 'French',
      priceRange: '$$',
      openTime: '10:00',
      closeTime: '22:00',
      menus: [
        { name: 'Coq au Vin', price: 24 },
        { name: 'Duck Confit', price: 26 },
        { name: 'Crème Brûlée', price: 9 }
      ],
      transport: [
        { type: 'Subway', lines: 'F, G', time: '18 min' },
        { type: 'Bus', lines: '31, 32', time: '25 min' },
        { type: 'Taxi', lines: 'Available', time: '12 min' },
        { type: 'Walking', lines: 'From Brooklyn Heights', time: '20 min' }
      ],
      lastInspection: '2024-01-10',
      violations: 2
    },
    {
      id: 3,
      name: 'Queens Palace Hotel',
      type: 'hotel',
      borough: 'Queens',
      address: '789 Roosevelt Ave, Queens',
      healthScore: 92,
      rating: 4.6,
      reviews: 128,
      cuisine: 'International',
      priceRange: '$$',
      openTime: '06:00',
      closeTime: '23:30',
      menus: [
        { name: 'Breakfast Buffet', price: 15 },
        { name: 'Lunch Set', price: 20 },
        { name: 'Dinner Premium', price: 35 }
      ],
      transport: [
        { type: 'Subway', lines: 'N, Q, R', time: '22 min' },
        { type: 'Bus', lines: 'Q58, Q60', time: '30 min' },
        { type: 'Taxi', lines: 'Available', time: '15 min' },
        { type: 'Walking', lines: 'From Astoria Park', time: '25 min' }
      ],
      lastInspection: '2024-01-12',
      violations: 1
    },
    {
      id: 4,
      name: 'Bronx Spice House',
      type: 'restaurant',
      borough: 'Bronx',
      address: '321 Grand Concourse, Bronx',
      healthScore: 82,
      rating: 4.3,
      reviews: 156,
      cuisine: 'Indian',
      priceRange: '$$',
      openTime: '11:30',
      closeTime: '22:30',
      menus: [
        { name: 'Chicken Tikka Masala', price: 16 },
        { name: 'Biryani', price: 14 },
        { name: 'Gulab Jamun', price: 5 }
      ],
      transport: [
        { type: 'Subway', lines: '2, 5', time: '25 min' },
        { type: 'Bus', lines: 'Bx15, Bx19', time: '35 min' },
        { type: 'Taxi', lines: 'Available', time: '18 min' },
        { type: 'Walking', lines: 'From Fordham Rd', time: '15 min' }
      ],
      lastInspection: '2024-01-08',
      violations: 3
    },
    {
      id: 5,
      name: 'Staten Island Harbor Hotel',
      type: 'hotel',
      borough: 'Staten Island',
      address: '555 Victory Boulevard, SI',
      healthScore: 90,
      rating: 4.4,
      reviews: 89,
      cuisine: 'Seafood & Grill',
      priceRange: '$$$',
      openTime: '07:00',
      closeTime: '23:00',
      menus: [
        { name: 'Fresh Lobster', price: 45 },
        { name: 'Grilled Salmon', price: 28 },
        { name: 'NY Strip Steak', price: 32 }
      ],
      transport: [
        { type: 'Ferry', lines: 'Staten Island Ferry', time: '25 min' },
        { type: 'Bus', lines: 'S74, S79', time: '30 min' },
        { type: 'Taxi', lines: 'Available', time: '20 min' },
        { type: 'Walking', lines: 'From Ferry Terminal', time: '10 min' }
      ],
      lastInspection: '2024-01-14',
      violations: 0
    },
    {
      id: 6,
      name: 'Manhattan Plaza Hotel',
      type: 'hotel',
      borough: 'Manhattan',
      address: '200 Madison Ave, NYC',
      healthScore: 94,
      rating: 4.7,
      reviews: 445,
      cuisine: 'Contemporary',
      priceRange: '$$$',
      openTime: '06:00',
      closeTime: '23:59',
      menus: [
        { name: 'Tasting Menu', price: 120 },
        { name: 'Business Lunch', price: 45 },
        { name: 'À la carte', price: 'Varies' }
      ],
      transport: [
        { type: 'Subway', lines: '4, 5, 6', time: '10 min' },
        { type: 'Bus', lines: '15, 42, 101', time: '15 min' },
        { type: 'Taxi', lines: 'Available', time: '8 min' },
        { type: 'Walking', lines: 'From Penn Station', time: '18 min' }
      ],
      lastInspection: '2024-01-13',
      violations: 0
    }
  ]

  const boroughs = ['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

  // Improved filter with better search logic
  const filtered = useMemo(() => {
    return establishments.filter(est => {
      const searchLower = searchTerm.toLowerCase().trim()
      const nameMatch = est.name.toLowerCase().includes(searchLower)
      const cuisineMatch = est.cuisine.toLowerCase().includes(searchLower)
      const addressMatch = est.address.toLowerCase().includes(searchLower)
      
      const matchSearch = searchLower === '' || nameMatch || cuisineMatch || addressMatch
      const matchType = selectedType === 'all' || est.type === selectedType
      const matchBorough = selectedBorough === 'all' || est.borough === selectedBorough
      
      return matchSearch && matchType && matchBorough
    })
  }, [searchTerm, selectedType, selectedBorough])

  // Get health score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">{t('finder.title')}</h1>
          <p className="text-xl text-gray-600">{t('finder.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Search Box */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('finder.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-bold text-primary mb-3">{t('finder.type')}</label>
              <div className="space-y-2">
                {['all', 'restaurant', 'hotel'].map(type => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">
                      {type === 'all' ? t('finder.all') : t(`finder.${type}`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Borough Filter */}
            <div>
              <label className="block text-sm font-bold text-primary mb-3">{t('finder.borough')}</label>
              <select
                value={selectedBorough}
                onChange={(e) => setSelectedBorough(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              >
                {boroughs.map(borough => (
                  <option key={borough} value={borough}>
                    {borough === 'all' ? t('finder.allBoroughs') : borough}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-lg font-semibold text-primary">
                {filtered.length} {t('finder.results')}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Listings */}
          <div className="space-y-6">
            {filtered.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-primary">Results ({filtered.length})</h2>
                </div>
                {filtered.map(est => (
                  <div
                    key={est.id}
                    onClick={() => setSelectedEstablishment(est)}
                    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer p-6 border-2 ${
                      selectedEstablishment?.id === est.id ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{est.name}</h3>
                        <p className="text-sm text-gray-600">{est.cuisine}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBgColor(est.healthScore)} ${getScoreColor(est.healthScore)}`}>
                        {est.healthScore}/100
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{est.borough}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        <span className="font-semibold">{est.rating}</span>
                        <span className="text-gray-600 ml-2">({est.reviews})</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{est.priceRange}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 flex flex-col items-center justify-center">
                <AlertCircle size={48} className="text-gray-400 mb-4" />
                <p className="text-center text-gray-600 text-lg font-semibold mb-2">No establishments found</p>
                <p className="text-center text-gray-500 text-sm">Try adjusting your search terms, filters, or borough selection</p>
              </div>
            )}
          </div>

          {/* Right: Detail View */}
          <div>
            {selectedEstablishment ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Health Score Badge */}
                <div className={`rounded-lg p-6 mb-6 ${getScoreBgColor(selectedEstablishment.healthScore)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedEstablishment.name}</h2>
                    <AlertCircle className={`${getScoreColor(selectedEstablishment.healthScore)}`} size={32} />
                  </div>
                  <p className={`text-lg font-bold ${getScoreColor(selectedEstablishment.healthScore)}`}>
                    {t('finder.healthScore')}: {selectedEstablishment.healthScore}/100
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('finder.address')}:</span>
                    <span className="font-semibold">{selectedEstablishment.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('finder.type')}:</span>
                    <span className="font-semibold capitalize">{selectedEstablishment.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('finder.hours')}:</span>
                    <div className="flex items-center font-semibold text-primary">
                      <Clock size={16} className="mr-2" />
                      {selectedEstablishment.openTime} - {selectedEstablishment.closeTime}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('finder.lastInspection')}:</span>
                    <span className="font-semibold">{new Date(selectedEstablishment.lastInspection).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('finder.violations')}:</span>
                    <span className={`font-bold ${selectedEstablishment.violations === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedEstablishment.violations}
                    </span>
                  </div>
                </div>

                {/* Transport Options */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                    <Navigation2 size={20} className="mr-2" />
                    {t('finder.transport')}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedForDirections(selectedEstablishment)
                      setShowDirections(true)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 mb-4"
                  >
                    <Navigation2 size={20} />
                    Get Directions & Transit Info
                  </button>
                  <div className="space-y-3">
                    {selectedEstablishment.transport.map((t_opt, idx) => (
                      <div key={idx} className="bg-blue-50 p-3 rounded-lg border-l-4 border-primary">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-gray-800">{t_opt.type}</p>
                            <p className="text-sm text-gray-600">{t_opt.lines}</p>
                          </div>
                          <span className="bg-primary text-white px-3 py-1 rounded text-sm font-bold">{t_opt.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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

                {/* Menu */}
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">{t('finder.menu')}</h3>
                  <div className="space-y-3">
                    {selectedEstablishment.menus.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <span className="font-semibold text-gray-800">{item.name}</span>
                        <div className="flex items-center text-secondary font-bold">
                          <DollarSign size={16} />
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 flex items-center justify-center h-96">
                <p className="text-center text-gray-600 text-lg">{t('finder.selectEstablishment')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
