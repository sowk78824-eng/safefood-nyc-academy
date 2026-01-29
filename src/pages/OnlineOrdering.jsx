/**
 * Online Ordering Page
 * Order from any NYC restaurant online with delivery
 */

import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ShoppingCart, MapPin, Star, DollarSign, Clock, X, Plus, Minus, Home } from 'lucide-react'
import {
  getAllRestaurants,
  searchRestaurants,
  getProductsByRestaurant,
  searchProducts,
  getProductDetails,
  calculateOrderTotal,
  validateOrder,
  processPayment,
  getPaymentMethods
} from '../utils/onlineOrderingApi'
import ProductDetailsModal from '../components/ProductDetailsModal'
import ShoppingCartModal from '../components/ShoppingCartModal'
import CheckoutModal from '../components/CheckoutModal'

export default function OnlineOrdering() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [viewMode, setViewMode] = useState('restaurants') // restaurants, products, cart
  const [cart, setCart] = useState([])
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(null)

  // Get all restaurants or search results
  const restaurants = useMemo(() => {
    if (searchTerm.trim()) {
      return searchRestaurants(searchTerm)
    }
    return getAllRestaurants()
  }, [searchTerm])

  // Get products based on view mode
  const products = useMemo(() => {
    if (searchTerm.trim() && viewMode === 'products') {
      return searchProducts(searchTerm)
    }
    if (selectedRestaurant) {
      return getProductsByRestaurant(selectedRestaurant.id)
    }
    return []
  }, [searchTerm, selectedRestaurant, viewMode])

  // Handle adding product to cart
  const handleAddToCart = (product, quantity = 1) => {
    const cartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      quantity: quantity,
      restaurantId: selectedRestaurant?.id || product.restaurantId
    }
    setCart([...cart, cartItem])
  }

  // Handle removing item from cart
  const handleRemoveFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  // Handle updating quantity
  const handleUpdateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(cartId)
    } else {
      setCart(cart.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      ))
    }
  }

  // Handle opening product details
  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  // Handle checkout
  const handleCheckout = async (paymentMethod, cardDetails) => {
    setProcessingPayment(true)
    try {
      const result = await processPayment({
        items: cart,
        restaurant: selectedRestaurant,
        paymentMethod,
        total: calculateOrderTotal(cart, selectedRestaurant).total
      })

      if (result.success) {
        setOrderConfirmed(result)
        setCart([])
        setShowCheckout(false)
        setShowCartModal(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
    }
    setProcessingPayment(false)
  }

  // Calculate cart totals
  const cartTotals = selectedRestaurant ? calculateOrderTotal(cart, selectedRestaurant) : null
  const cartValid = selectedRestaurant ? validateOrder(cart, selectedRestaurant).valid : false

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        {!orderConfirmed ? (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                  <ShoppingCart size={32} className="text-primary" />
                  Order Food Online
                </h1>
                {cart.length > 0 && (
                  <button
                    onClick={() => setShowCartModal(true)}
                    className="relative bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary transition flex items-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Cart
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {cart.length}
                    </span>
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search restaurants or dishes..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        if (e.target.value.trim()) setViewMode('products')
                        else setViewMode('restaurants')
                      }}
                      className="w-full pl-12 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  {selectedRestaurant && (
                    <button
                      onClick={() => {
                        setSelectedRestaurant(null)
                        setViewMode('restaurants')
                        setSearchTerm('')
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-bold transition"
                    >
                      Change Restaurant
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* View Selection */}
            {searchTerm && !selectedRestaurant && (
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setViewMode('restaurants')}
                  className={`px-6 py-2 rounded-lg font-bold transition ${
                    viewMode === 'restaurants'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Restaurants
                </button>
                <button
                  onClick={() => setViewMode('products')}
                  className={`px-6 py-2 rounded-lg font-bold transition ${
                    viewMode === 'products'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Dishes
                </button>
              </div>
            )}

            {/* Restaurants View */}
            {!selectedRestaurant && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:scale-105"
                  >
                    <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-4xl flex items-center justify-center h-40">
                      {restaurant.image}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
                      <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star size={16} className="text-yellow-500" />
                          <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={16} />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} />
                          <span>{restaurant.borough}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign size={16} />
                          <span>Min order: ${restaurant.minOrder} • Delivery: ${restaurant.deliveryFee}</span>
                        </div>
                      </div>

                      <button className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 transition">
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Products View */}
            {selectedRestaurant || (viewMode === 'products' && searchTerm) ? (
              <div>
                {selectedRestaurant && (
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-start gap-6">
                      <div className="text-6xl">{selectedRestaurant.image}</div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedRestaurant.name}</h2>
                        <div className="space-y-1 text-gray-600">
                          <p>⭐ {selectedRestaurant.rating} ({selectedRestaurant.reviews} reviews)</p>
                          <p>⏱️ {selectedRestaurant.deliveryTime}</p>
                          <p>📍 {selectedRestaurant.address}</p>
                          <p>💰 Min order: ${selectedRestaurant.minOrder} | Delivery: ${selectedRestaurant.deliveryFee}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleOpenProductDetails(product)}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                    >
                      <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-5xl flex items-center justify-center h-48">
                        {product.image}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <p className="text-sm text-primary font-semibold mb-3">{product.category}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">${product.price}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddToCart(product)
                            }}
                            className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {restaurants.length === 0 && products.length === 0 && searchTerm && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-xl text-gray-600">No results found for "{searchTerm}"</p>
              </div>
            )}
          </>
        ) : (
          /* Order Confirmed Screen */
          <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
            <div className="space-y-4 text-gray-700 mb-8">
              <p className="text-lg">Order ID: <span className="font-bold">{orderConfirmed.orderId}</span></p>
              <p>Your order from <span className="font-bold">{selectedRestaurant.name}</span> is confirmed</p>
              <p>Estimated delivery: {new Date(orderConfirmed.estimatedDelivery).toLocaleTimeString()}</p>
              <p>A driver will contact you shortly at your provided phone number</p>
            </div>
            <button
              onClick={() => {
                setOrderConfirmed(null)
                setSelectedRestaurant(null)
                setCart([])
              }}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition"
            >
              Place Another Order
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProductModal && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={() => setShowProductModal(false)}
        />
      )}

      {showCartModal && cart.length > 0 && selectedRestaurant && (
        <ShoppingCartModal
          items={cart}
          restaurant={selectedRestaurant}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={() => {
            setShowCartModal(false)
            setShowCheckout(true)
          }}
          onClose={() => setShowCartModal(false)}
        />
      )}

      {showCheckout && cart.length > 0 && selectedRestaurant && (
        <CheckoutModal
          items={cart}
          restaurant={selectedRestaurant}
          onConfirmPayment={handleCheckout}
          onClose={() => setShowCheckout(false)}
          isProcessing={processingPayment}
        />
      )}
    </div>
  )
}
