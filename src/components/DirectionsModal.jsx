/**
 * Directions Component
 * Displays options to view restaurant on map and get directions
 */

import React, { useState } from 'react'
import { MapPin, Navigation, Smartphone, MapIcon, ExternalLink } from 'lucide-react'
import {
  openGoogleMapsDirections,
  getUserLocation,
  getTransitDescription,
  formatAddressForMaps,
  openAppleMaps,
  getDirectionsDemo
} from '../utils/mapsDirections'

export default function DirectionsModal({ restaurant, address, onClose, isOpen }) {
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [selectedMode, setSelectedMode] = useState('transit')
  const [demoData, setDemoData] = useState(getDirectionsDemo(restaurant?.name))
  const [error, setError] = useState(null)

  // Get user location
  const handleGetLocation = async () => {
    setLoading(true)
    setError(null)
    try {
      const location = await getUserLocation()
      setUserLocation(location)
    } catch (err) {
      setError('Unable to get your location. Using map without origin.')
      console.error(err)
    }
    setLoading(false)
  }

  // Open Google Maps directions
  const handleOpenGoogleMaps = () => {
    const fullAddress = typeof address === 'string' ? address : formatAddressForMaps(address)
    openGoogleMapsDirections(
      fullAddress,
      restaurant?.name || 'Destination',
      userLocation,
      selectedMode
    )
  }

  // Open Apple Maps directions
  const handleOpenAppleMaps = () => {
    const fullAddress = typeof address === 'string' ? address : formatAddressForMaps(address)
    openAppleMaps(fullAddress, restaurant?.name || 'Destination', userLocation)
  }

  if (!isOpen) return null

  const fullAddress = typeof address === 'string' ? address : formatAddressForMaps(address)
  const demoInfo = demoData.transitOptions.find(opt => opt.mode === selectedMode) || demoData.transitOptions[0]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapIcon size={28} />
              <div>
                <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
                <p className="text-white/90 text-sm mt-1 flex items-center gap-1">
                  <MapPin size={16} /> {fullAddress}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          )}

          {/* Get Location Button */}
          {!userLocation && (
            <button
              onClick={handleGetLocation}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Navigation size={20} />
              {loading ? 'Getting your location...' : 'Use My Current Location'}
            </button>
          )}

          {/* Transit Mode Selection */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">How do you want to get there?</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { mode: 'transit', icon: '🚇', label: 'Public Transit' },
                { mode: 'driving', icon: '🚗', label: 'Driving' },
                { mode: 'walking', icon: '🚶', label: 'Walking' },
                { mode: 'bicycling', icon: '🚴', label: 'Bicycling' }
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`p-3 rounded-lg border-2 transition ${
                    selectedMode === mode
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 bg-gray-50 hover:border-primary'
                  }`}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-sm font-semibold text-gray-800">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Transit Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <div className="text-3xl">
                {selectedMode === 'transit' && '🚇'}
                {selectedMode === 'driving' && '🚗'}
                {selectedMode === 'walking' && '🚶'}
                {selectedMode === 'bicycling' && '🚴'}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">{demoInfo.description}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {selectedMode === 'transit' && (
                    <>
                      <div>
                        <p className="text-gray-600">Estimated Time</p>
                        <p className="font-bold text-primary">{demoData.estimatedTime.transit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fare</p>
                        <p className="font-bold text-primary">{demoInfo.fare}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Number of Stops</p>
                        <p className="font-bold text-primary">{demoInfo.stops}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Transfers</p>
                        <p className="font-bold text-primary">{demoInfo.transfers}</p>
                      </div>
                    </>
                  )}
                  {selectedMode === 'driving' && (
                    <>
                      <div>
                        <p className="text-gray-600">Estimated Time</p>
                        <p className="font-bold text-primary">{demoData.estimatedTime.driving}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-bold text-primary">{demoInfo.distance}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cost Estimate</p>
                        <p className="font-bold text-primary">{demoInfo.fare}</p>
                      </div>
                    </>
                  )}
                  {selectedMode === 'walking' && (
                    <>
                      <div>
                        <p className="text-gray-600">Estimated Time</p>
                        <p className="font-bold text-primary">{demoData.estimatedTime.walking}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-bold text-primary">{demoInfo.distance}</p>
                      </div>
                    </>
                  )}
                  {selectedMode === 'bicycling' && (
                    <>
                      <div>
                        <p className="text-gray-600">Estimated Time</p>
                        <p className="font-bold text-primary">{demoData.estimatedTime.bicycling}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-bold text-primary">{demoInfo.distance}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleOpenGoogleMaps}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              Open Google Maps
            </button>
            <button
              onClick={handleOpenAppleMaps}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Smartphone size={18} />
              Open Apple Maps
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800">
            <p>💡 <strong>Tip:</strong> Real-time directions with actual transit times and routes available when opened in Google Maps or Apple Maps.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
