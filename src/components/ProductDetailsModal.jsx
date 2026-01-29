/**
 * Product Details Modal
 * Shows complete product information with image, ingredients, price
 */

import React, { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'

export default function ProductDetailsModal({ product, onAddToCart, onClose }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X size={28} />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-primary to-secondary p-12 text-white flex items-center justify-center min-h-64">
            <div className="text-8xl">{product.image}</div>
          </div>

          {/* Product Details */}
          <div className="p-8 space-y-6">
            {/* Name and Category */}
            <div>
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                {product.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-1 rounded transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-1 rounded transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
