/**
 * Checkout Modal
 * Handle payment processing and order confirmation
 */

import React, { useState } from 'react'
import { X, CreditCard, AlertCircle } from 'lucide-react'
import { calculateOrderTotal, getPaymentMethods } from '../utils/onlineOrderingApi'

export default function CheckoutModal({
  items,
  restaurant,
  onConfirmPayment,
  onClose,
  isProcessing
}) {
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })
  const [deliveryInfo, setDeliveryInfo] = useState({
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: ''
  })
  const [step, setStep] = useState('delivery') // delivery, payment, confirm

  const totals = calculateOrderTotal(items, restaurant)
  const paymentMethods = getPaymentMethods()

  const handleConfirmOrder = async () => {
    if (!deliveryInfo.phone || !deliveryInfo.address) {
      alert('Please fill in delivery address and phone number')
      return
    }
    await onConfirmPayment(selectedPayment, cardDetails)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 flex items-center justify-between sticky top-0">
          <h2 className="text-2xl font-bold">Complete Your Order</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Steps */}
        <div className="flex bg-gray-100 border-b">
          {['Delivery', 'Payment', 'Confirm'].map((label, idx) => (
            <button
              key={label}
              onClick={() => setStep(label.toLowerCase())}
              className={`flex-1 py-4 font-bold transition ${
                step === label.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Delivery Step */}
          {step === 'delivery' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                  placeholder="(212) 555-0000"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  placeholder="123 Main Street, Apt 4B"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                    placeholder="New York"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={deliveryInfo.zipCode}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                    placeholder="10001"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Special Instructions</label>
                <textarea
                  value={deliveryInfo.specialInstructions}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, specialInstructions: e.target.value})}
                  placeholder="e.g., Ring doorbell twice, Leave at door if not home"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary h-20"
                />
              </div>

              <button
                onClick={() => setStep('payment')}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>

              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedPayment === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{method.name}</div>
                  </button>
                ))}
              </div>

              {selectedPayment === 'card' && (
                <div className="space-y-4 mt-6 pt-6 border-t">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardDetails.cardholderName}
                      onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')})}
                      placeholder="4242 4242 4242 4242"
                      maxLength="19"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        maxLength="3"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
                <p className="text-sm text-blue-800">💡 For demo: Use any card number</p>
              </div>

              <button
                onClick={() => setStep('confirm')}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Review Order
              </button>
            </div>
          )}

          {/* Confirm Step */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="font-bold text-gray-800">{restaurant.name}</p>
                <p className="text-sm text-gray-600">{deliveryInfo.address}, {deliveryInfo.city} {deliveryInfo.zipCode}</p>
              </div>

              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>${totals.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className={`w-full font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                <CreditCard size={20} />
                {isProcessing ? 'Processing Payment...' : 'Confirm & Pay'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
