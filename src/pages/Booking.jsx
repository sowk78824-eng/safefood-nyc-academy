import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Calendar, Clock, Users, ShoppingCart, Check, AlertCircle, CreditCard, Shield } from 'lucide-react'

export default function Booking() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('reserve') // reserve or order
  const [selectedEstablishment, setSelectedEstablishment] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [orderCart, setOrderCart] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' })

  // Establishments with detailed menus
  const establishments = [
    {
      id: 1,
      name: 'The Green Fork Restaurant',
      type: 'restaurant',
      borough: 'Manhattan',
      address: '123 Broadway, NYC',
      phone: '(212) 555-0123',
      openTime: '11:00',
      closeTime: '23:00',
      cuisine: 'Italian',
      capacity: 120,
      healthGrade: 'A',
      healthScore: 8,
      violations: 0,
      lastInspection: '2025-05-12',
      menus: [
        { id: 1, name: 'Spaghetti Carbonara', price: 18, category: 'Pasta', description: 'Classic Roman pasta with eggs and bacon' },
        { id: 2, name: 'Risotto Milano', price: 22, category: 'Pasta', description: 'Creamy arborio rice with saffron' },
        { id: 3, name: 'Grilled Salmon', price: 28, category: 'Main', description: 'Fresh Atlantic salmon with herbs' },
        { id: 4, name: 'Osso Buco', price: 32, category: 'Main', description: 'Braised veal shanks in white wine' },
        { id: 5, name: 'Caesar Salad', price: 12, category: 'Appetizer', description: 'Crisp romaine with parmesan' },
        { id: 6, name: 'Bruschetta', price: 10, category: 'Appetizer', description: 'Toasted bread with fresh tomatoes' },
        { id: 7, name: 'Tiramisu', price: 8, category: 'Dessert', description: 'Classic Italian mascarpone dessert' },
        { id: 8, name: 'Panna Cotta', price: 9, category: 'Dessert', description: 'Silky vanilla cream' }
      ]
    },
    {
      id: 2,
      name: 'Brooklyn Bistro',
      type: 'restaurant',
      borough: 'Brooklyn',
      address: '456 Park Avenue, Brooklyn',
      phone: '(718) 555-0456',
      openTime: '10:00',
      closeTime: '22:00',
      cuisine: 'French',
      capacity: 95,
      healthGrade: 'A',
      healthScore: 12,
      violations: 2,
      lastInspection: '2025-04-20',
      menus: [
        { id: 1, name: 'Coq au Vin', price: 24, category: 'Main', description: 'Chicken braised in red wine' },
        { id: 2, name: 'Duck Confit', price: 26, category: 'Main', description: 'Tender duck leg with potatoes' },
        { id: 3, name: 'French Onion Soup', price: 11, category: 'Appetizer', description: 'Topped with melted gruyère' },
        { id: 4, name: 'Escargot', price: 14, category: 'Appetizer', description: 'Snails in garlic butter' },
        { id: 5, name: 'Boeuf Bourguignon', price: 28, category: 'Main', description: 'Beef stew in burgundy wine' },
        { id: 6, name: 'Crème Brûlée', price: 9, category: 'Dessert', description: 'Caramelized custard' },
        { id: 7, name: 'Profiteroles', price: 10, category: 'Dessert', description: 'Choux pastry with chocolate' }
      ]
    },
    {
      id: 3,
      name: 'Queens Palace Hotel',
      type: 'hotel',
      borough: 'Queens',
      address: '789 Roosevelt Ave, Queens',
      phone: '(718) 555-0789',
      openTime: '06:00',
      closeTime: '23:30',
      cuisine: 'International',
      capacity: 200,
      menus: [
        { id: 1, name: 'Pad Thai', price: 16, category: 'Asian', description: 'Stir-fried noodles with shrimp' },
        { id: 2, name: 'Butter Chicken', price: 18, category: 'Indian', description: 'Creamy tomato sauce with chicken' },
        { id: 3, name: 'Beef Tacos', price: 13, category: 'Mexican', description: 'Three street-style tacos' },
        { id: 4, name: 'Sushi Platter', price: 25, category: 'Asian', description: 'Assorted fresh sushi rolls' },
        { id: 5, name: 'Grilled Lamb Kebab', price: 22, category: 'Mediterranean', description: 'Marinated lamb skewers' },
        { id: 6, name: 'Mango Sticky Rice', price: 8, category: 'Dessert', description: 'Thai coconut rice' },
        { id: 7, name: 'Baklava', price: 7, category: 'Dessert', description: 'Phyllo with honey and nuts' }
      ]
    },
    {
      id: 4,
      name: 'Bronx Spice House',
      type: 'restaurant',
      borough: 'Bronx',
      address: '321 Grand Concourse, Bronx',
      phone: '(718) 555-0321',
      openTime: '12:00',
      closeTime: '23:00',
      cuisine: 'Mexican',
      capacity: 80,
      menus: [
        { id: 1, name: 'Chile Relleno', price: 16, category: 'Main', description: 'Poblano pepper stuffed with cheese' },
        { id: 2, name: 'Carne Asada', price: 24, category: 'Main', description: 'Grilled marinated beef' },
        { id: 3, name: 'Tamales', price: 10, category: 'Appetizer', description: 'Corn dough with filling' },
        { id: 4, name: 'Guacamole & Chips', price: 8, category: 'Appetizer', description: 'Fresh avocado dip' },
        { id: 5, name: 'Enchiladas Verdes', price: 18, category: 'Main', description: 'Green sauce with chicken' },
        { id: 6, name: 'Churros', price: 6, category: 'Dessert', description: 'Fried dough with chocolate' },
        { id: 7, name: 'Flan', price: 7, category: 'Dessert', description: 'Creamy caramel custard' }
      ]
    },
    {
      id: 5,
      name: 'Staten Island Harbor Hotel',
      type: 'hotel',
      borough: 'Staten Island',
      address: '500 Bay Street, Staten Island',
      phone: '(718) 555-0500',
      openTime: '07:00',
      closeTime: '22:00',
      cuisine: 'Seafood',
      capacity: 110,
      menus: [
        { id: 1, name: 'Lobster Tail', price: 35, category: 'Main', description: 'Butter-poached Maine lobster' },
        { id: 2, name: 'Pan-Seared Scallops', price: 28, category: 'Main', description: 'Diver scallops with lemon' },
        { id: 3, name: 'Clam Chowder', price: 10, category: 'Appetizer', description: 'New England style' },
        { id: 4, name: 'Oyster Sampler', price: 18, category: 'Appetizer', description: 'Six fresh oysters' },
        { id: 5, name: 'Grilled Branzino', price: 26, category: 'Main', description: 'Whole fish with vegetables' },
        { id: 6, name: 'Key Lime Pie', price: 8, category: 'Dessert', description: 'Tangy and sweet' },
        { id: 7, name: 'Chocolate Mousse', price: 9, category: 'Dessert', description: 'Rich dark chocolate' }
      ]
    },
    {
      id: 6,
      name: 'Manhattan Plaza Hotel',
      type: 'hotel',
      borough: 'Manhattan',
      address: '1000 5th Avenue, NYC',
      phone: '(212) 555-1000',
      openTime: '06:30',
      closeTime: '23:00',
      cuisine: 'Contemporary',
      capacity: 150,
      menus: [
        { id: 1, name: 'Wagyu Steak', price: 45, category: 'Main', description: 'Premium Japanese beef' },
        { id: 2, name: 'Halibut en Papillote', price: 32, category: 'Main', description: 'Fish steamed in parchment' },
        { id: 3, name: 'Foie Gras', price: 20, category: 'Appetizer', description: 'Pan-seared with brioche' },
        { id: 4, name: 'Truffle Risotto', price: 24, category: 'Main', description: 'White truffle infused' },
        { id: 5, name: 'Bone Marrow Flan', price: 16, category: 'Appetizer', description: 'Umami-rich preparation' },
        { id: 6, name: 'Chocolate Soufflé', price: 12, category: 'Dessert', description: 'Light and airy' },
        { id: 7, name: 'Seasonal Fruit Tart', price: 10, category: 'Dessert', description: 'Fresh pastry cream' }
      ]
    }
  ]

  // Reservation form state
  const [reservation, setReservation] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    phone: ''
  })

  const handleReservationChange = (field, value) => {
    setReservation(prev => ({ ...prev, [field]: value }))
  }

  const submitReservation = () => {
    if (!reservation.date || !reservation.time || !reservation.name || !reservation.email) {
      alert('Please fill in all fields')
      return
    }
    setSuccessMessage(`Reservation confirmed for ${reservation.name} on ${reservation.date} at ${reservation.time}!`)
    setTimeout(() => setSuccessMessage(''), 5000)
    setReservation({ date: '', time: '', guests: 2, name: '', email: '', phone: '' })
    setSelectedEstablishment(null)
    setBookingStep(1)
  }

  const addToCart = (item) => {
    setOrderCart(prev => {
      const existing = prev.find(p => p.id === item.id)
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setOrderCart(prev => prev.filter(p => p.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId)
    } else {
      setOrderCart(prev => prev.map(p => p.id === itemId ? { ...p, quantity } : p))
    }
  }

  const cartTotal = orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const submitOrder = () => {
    if (orderCart.length === 0) {
      alert('Please add items to your order')
      return
    }
    // Check hygiene score before payment
    if (selectedEstablishment.healthScore > 20) {
      alert('⚠️ This establishment has a higher hygiene score. Proceed with caution.')
    }
    setShowPayment(true)
  }

  const processPayment = () => {
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      alert('Please fill in all card details')
      return
    }
    // Simulate Stripe payment processing
    setPaymentConfirmed(true)
    setTimeout(() => {
      setSuccessMessage(`✅ Payment Confirmed via Stripe! Order Total: $${cartTotal.toFixed(2)}\n📍 Restaurant: ${selectedEstablishment.name}\n⏱️ Expected delivery: 30-45 minutes\n🎉 Your hygiene-verified meal is on the way!`)
      setOrderCart([])
      setSelectedEstablishment(null)
      setShowPayment(false)
      setPaymentConfirmed(false)
      setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' })
      setTimeout(() => setSuccessMessage(''), 8000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Dining & Reservations</h1>
          <p className="text-lg text-gray-600">Reserve your table or order food from NYC's finest restaurants</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-8 rounded">
            <div className="flex items-center">
              <Check className="text-green-600 mr-3" />
              <p className="text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('reserve')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'reserve' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-2 border-gray-300'}`}
          >
            <Calendar className="inline mr-2" size={20} />
            Reserve a Table
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'order' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-2 border-gray-300'}`}
          >
            <ShoppingCart className="inline mr-2" size={20} />
            Order Online
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Establishments</h2>
              <div className="space-y-3">
                {establishments.map(est => (
                  <button
                    key={est.id}
                    onClick={() => {
                      setSelectedEstablishment(est)
                      setBookingStep(1)
                      setOrderCart([])
                    }}
                    className={`w-full text-left p-4 rounded-lg transition ${selectedEstablishment?.id === est.id ? 'bg-indigo-100 border-2 border-indigo-600' : 'bg-gray-50 border-2 border-gray-200 hover:border-indigo-400'}`}
                  >
                    <div className="font-bold text-gray-800">{est.name}</div>
                    <div className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin size={14} className="mr-1" />
                      {est.borough}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center mt-1">
                      <Clock size={14} className="mr-1" />
                      {est.openTime} - {est.closeTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Reservation or Menu */}
          <div className="lg:col-span-2">
            {selectedEstablishment ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedEstablishment.name}</h2>
                  {selectedEstablishment.healthGrade && (
                    <span className={`text-2xl font-bold px-4 py-2 rounded-lg ${
                      selectedEstablishment.healthGrade === 'A' ? 'bg-green-100 text-green-800' :
                      selectedEstablishment.healthGrade === 'B' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Grade {selectedEstablishment.healthGrade}
                    </span>
                  )}
                </div>
                <div className="text-gray-600 mb-6 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {selectedEstablishment.address} | Phone: {selectedEstablishment.phone}
                </div>
                
                {selectedEstablishment.healthGrade && (
                  <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="flex items-center text-blue-900">
                      <Shield size={18} className="mr-2" />
                      <div>
                        <p className="font-bold">Health & Sanitation Score: {selectedEstablishment.healthScore}/100</p>
                        <p className="text-sm">Last inspected: {new Date(selectedEstablishment.lastInspection).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reserve' ? (
                  <div>
                    {/* Reservation Form */}
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Book Your Table</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Date</label>
                          <input
                            type="date"
                            value={reservation.date}
                            onChange={(e) => handleReservationChange('date', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Time</label>
                          <input
                            type="time"
                            value={reservation.time}
                            onChange={(e) => handleReservationChange('time', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Number of Guests</label>
                        <select
                          value={reservation.guests}
                          onChange={(e) => handleReservationChange('guests', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                        <input
                          type="text"
                          value={reservation.name}
                          onChange={(e) => handleReservationChange('name', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                          type="email"
                          value={reservation.email}
                          onChange={(e) => handleReservationChange('email', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                        <input
                          type="tel"
                          value={reservation.phone}
                          onChange={(e) => handleReservationChange('phone', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                          placeholder="(555) 000-0000"
                        />
                      </div>

                      <button
                        onClick={submitReservation}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition mt-6"
                      >
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Menu with Cart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Menu Items */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Menu</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {selectedEstablishment.menus.map(item => (
                            <div key={item.id} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-bold text-gray-800">{item.name}</div>
                                  <div className="text-sm text-gray-600">{item.category}</div>
                                  <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                                  <div className="font-bold text-indigo-600 mt-2">${item.price.toFixed(2)}</div>
                                </div>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 sticky top-4">
                          {orderCart.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Add items to your order</p>
                          ) : (
                            <>
                              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                                {orderCart.map(item => (
                                  <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-indigo-600">
                                    <div>
                                      <div className="font-semibold text-gray-800">{item.name}</div>
                                      <div className="text-sm text-gray-600">${item.price.toFixed(2)} each</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="bg-gray-300 text-gray-800 w-6 h-6 rounded hover:bg-gray-400"
                                      >
                                        -
                                      </button>
                                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="bg-gray-300 text-gray-800 w-6 h-6 rounded hover:bg-gray-400"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="border-t-2 border-gray-300 pt-4">
                                <div className="flex justify-between items-center font-bold text-lg mb-4">
                                  <span>Total:</span>
                                  <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                  onClick={submitOrder}
                                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
                                >
                                  Place Order
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Select a restaurant or hotel to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="mr-2 text-indigo-600" size={28} />
                Secure Payment
              </h2>

              {/* Hygiene Verification */}
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-green-900 font-semibold flex items-center">
                  <Shield size={18} className="mr-2" />
                  ✓ Hygiene Verified
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Grade {selectedEstablishment.healthGrade} - This restaurant meets health standards
                </p>
              </div>

              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedEstablishment.name}</p>
                <p className="text-lg font-bold text-indigo-600">${cartTotal.toFixed(2)}</p>
              </div>

              {paymentConfirmed ? (
                <div className="text-center mb-6 py-8">
                  <div className="animate-spin inline-block mb-4">
                    <Check size={48} className="text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-green-600 mb-2">Processing Payment...</p>
                  <p className="text-sm text-gray-600">Contacting Stripe...</p>
                </div>
              ) : (
                <>
                  {/* Card Details */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        maxLength="19"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPayment(false)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={processPayment}
                      className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition flex items-center justify-center"
                    >
                      <CreditCard size={18} className="mr-2" />
                      Pay via Stripe
                    </button>
                  </div>
                </>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                💳 This is a simulated Stripe payment. Your data is secure.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
