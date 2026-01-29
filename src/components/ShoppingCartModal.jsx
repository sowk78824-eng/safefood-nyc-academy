/**
 * Shopping Cart Modal
 * Display cart items and order summary
 */

import React from 'react'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { calculateOrderTotal, validateOrder } from '../utils/onlineOrderingApi'

export default function ShoppingCartModal({
  items,
  restaurant,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onClose
}) {
  const totals = calculateOrderTotal(items, restaurant)
  const validation = validateOrder(items, restaurant)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sticky top-0 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart size={24} />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="p-6 space-y-4">
          {items.map(item => (
            <div
              key={item.cartId}
              className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border-l-4 border-primary"
            >
              {/* Product Image */}
              <div className="text-4xl bg-white p-2 rounded">{item.image}</div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                  className="p-1 text-gray-600 hover:text-gray-800 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                  className="p-1 text-gray-600 hover:text-gray-800 transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Price */}
              <span className="font-bold text-primary w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              {/* Remove Button */}
              <button
                onClick={() => onRemove(item.cartId)}
                className="p-2 text-red-500 hover:bg-red-50 rounded transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 border-t space-y-3 sticky bottom-0">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-bold">${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Tax (8.875%):</span>
            <span className="font-bold">${totals.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Delivery Fee:</span>
            <span className="font-bold">${totals.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg border-t pt-3">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-primary">${totals.total.toFixed(2)}</span>
          </div>

          {!validation.valid && (
            <div className="bg-yellow-50 border border-yellow-500 text-yellow-800 p-3 rounded text-sm">
              {validation.message}
            </div>
          )}

          <button
            onClick={onCheckout}
            disabled={!validation.valid}
            className={`w-full font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
              validation.valid
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
