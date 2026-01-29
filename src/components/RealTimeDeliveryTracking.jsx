import React, { useState, useEffect } from 'react'
import { Truck, MapPin, Clock, AlertCircle, CheckCircle, Phone, Map } from 'lucide-react'
import { calculateDeliveryEta, createLiveDeliveryTracker, getLiveTrafficConditions } from '../utils/googleMapsApi'
import { getHealthSafetySummary } from '../utils/aiRecommendationsApi'

export default function RealTimeDeliveryTracking({ restaurant, deliveryAddress, onClose }) {
  const [eta, setEta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deliveryTracker, setDeliveryTracker] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [trafficInfo, setTrafficInfo] = useState(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    initializeDeliveryTracking()
  }, [])

  const initializeDeliveryTracking = async () => {
    try {
      setLoading(true)

      // Calculate ETA
      const etaData = await calculateDeliveryEta(
        { lat: restaurant.lat || 40.7128, lng: restaurant.lng || -74.0060 },
        { lat: deliveryAddress.lat || 40.7200, lng: deliveryAddress.lng || -73.9850 },
        15 // 15 minutes prep time
      )
      setEta(etaData)

      // Create live tracker
      const tracker = createLiveDeliveryTracker(
        { lat: restaurant.lat || 40.7128, lng: restaurant.lng || -74.0060 },
        { lat: deliveryAddress.lat || 40.7200, lng: deliveryAddress.lng || -73.9850 },
        etaData.totalTime
      )
      setDeliveryTracker(tracker)
      setCurrentPosition(tracker.getCurrentPosition())

      // Get traffic info
      const traffic = await getLiveTrafficConditions('Manhattan to Brooklyn delivery route')
      setTrafficInfo(traffic)

      setLoading(false)

      // Simulate delivery progress
      const interval = setInterval(() => {
        const newPosition = tracker.advance()
        setCurrentPosition(newPosition)

        if (newPosition.progress >= 100) {
          clearInterval(interval)
        }
      }, 3000) // Update every 3 seconds

      return () => clearInterval(interval)
    } catch (error) {
      console.error('Error initializing tracking:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <Truck className="animate-bounce text-primary" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Preparing Your Order
          </h2>
          <p className="text-center text-gray-600">
            Your food is being prepared with the highest safety standards...
          </p>
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Estimated ETA: Calculating...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Live Delivery Tracking</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>
          <p className="text-blue-100">
            Your order from {restaurant.name} is on the way!
          </p>
        </div>

        {/* Main Tracking Info */}
        <div className="p-6 space-y-6">
          {/* ETA Card */}
          {eta && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={24} className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Estimated Arrival</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {eta.estimatedArrival}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Time</p>
                  <p className="text-2xl font-bold text-green-600">
                    {eta.totalTime} min
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Preparation</p>
                  <p className="font-bold text-gray-800">{eta.prepTime} min</p>
                </div>
                <div>
                  <p className="text-gray-600">Delivery</p>
                  <p className="font-bold text-gray-800">{eta.travelTime} min</p>
                </div>
                <div>
                  <p className="text-gray-600">Traffic</p>
                  <p className="font-bold capitalize text-gray-800">
                    {eta.trafficCondition}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {currentPosition && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">Delivery Progress</p>
                <p className="text-sm font-bold text-primary">
                  {Math.round(currentPosition.progress)}%
                </p>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-1000"
                  style={{ width: `${currentPosition.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {currentPosition.remainingMinutes > 0
                  ? `${Math.round(currentPosition.remainingMinutes)} minutes remaining`
                  : '✓ Delivered!'}
              </p>
            </div>
          )}

          {/* Timeline Steps */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-800">Order Status</p>
            <div className="space-y-3">
              {/* Step 1: Order Confirmed */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Order Confirmed</p>
                  <p className="text-sm text-gray-500">Kitchen received your order</p>
                </div>
              </div>

              {/* Step 2: Preparing */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {currentPosition.progress < 30 ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mt-1" />
                  ) : (
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Preparing Food</p>
                  <p className="text-sm text-gray-500">
                    {currentPosition.progress < 30
                      ? 'Chef is preparing your meal with high hygiene standards'
                      : 'Completed'}
                  </p>
                </div>
              </div>

              {/* Step 3: On the Way */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {currentPosition.progress >= 30 && currentPosition.progress < 100 ? (
                    <Truck size={20} className="text-blue-600 mt-1 animate-bounce" />
                  ) : currentPosition.progress >= 100 ? (
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-1" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Out for Delivery</p>
                  <p className="text-sm text-gray-500">
                    {currentPosition.progress >= 30 && currentPosition.progress < 100
                      ? 'Driver is on the way to your location'
                      : 'Waiting to depart'}
                  </p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {currentPosition.progress >= 100 ? (
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-1" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Delivered</p>
                  <p className="text-sm text-gray-500">
                    {currentPosition.progress >= 100
                      ? '✓ Order delivered successfully'
                      : 'Final step'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Traffic & Route Info */}
          {trafficInfo && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="font-semibold text-yellow-900 mb-2">🚦 Traffic Information</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-yellow-700">Condition</p>
                  <p className="font-bold capitalize text-yellow-900">
                    {trafficInfo.condition}
                  </p>
                </div>
                <div>
                  <p className="text-yellow-700">Avg Speed</p>
                  <p className="font-bold text-yellow-900">
                    {Math.round(trafficInfo.avgSpeed)} mph
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-2">
              <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-blue-900">Delivery Address</p>
                <p className="text-sm text-blue-800 mt-1">
                  {deliveryAddress.street || '123 Main St'}
                </p>
                <p className="text-sm text-blue-700">
                  {deliveryAddress.city || 'New York'}, {deliveryAddress.zip || 'NY'}
                </p>
              </div>
            </div>
          </div>

          {/* Driver Contact */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-800 mb-3">Driver Information</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Driver</p>
                <p className="font-bold text-gray-800">Ahmed M.</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vehicle</p>
                <p className="font-bold text-gray-800">🏍️ Delivery Bike</p>
              </div>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                <Phone size={16} />
                Call Driver
              </button>
            </div>
          </div>

          {/* Health & Safety Badge */}
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="font-semibold text-green-900 mb-2">✓ Health & Safety Verified</p>
            <p className="text-sm text-green-800">
              {restaurant.name} maintains a Grade {restaurant.healthGrade} health score
              ({restaurant.healthScore}/100). Your food was prepared following NYC health
              department guidelines.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition font-semibold"
            >
              <Map size={16} />
              View Map
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition font-semibold"
            >
              <CheckCircle size={16} />
              Got It!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
