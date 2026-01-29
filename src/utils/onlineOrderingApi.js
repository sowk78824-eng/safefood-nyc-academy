/**
 * Online Ordering API Utility
 * Manages restaurants, products, orders, and payments
 * Supports all NYC restaurants with delivery services
 */

// Sample NYC restaurants with comprehensive menus
const nycRestaurants = [
  {
    id: 1,
    name: 'The Green Fork Restaurant',
    borough: 'Manhattan',
    address: '123 Broadway, NYC',
    phone: '(212) 555-0123',
    rating: 4.8,
    reviews: 342,
    deliveryTime: '25-35 min',
    minOrder: 15,
    deliveryFee: 2.99,
    cuisine: 'Italian',
    image: '🍝',
    products: [
      { id: 101, name: 'Spaghetti Carbonara', price: 18, category: 'Main', image: '🍝', ingredients: ['Pasta', 'Guanciale', 'Pecorino Romano', 'Egg', 'Black Pepper'], description: 'Classic Italian pasta with creamy sauce' },
      { id: 102, name: 'Risotto Milano', price: 22, category: 'Main', image: '🍚', ingredients: ['Arborio Rice', 'Saffron', 'White Wine', 'Parmesan', 'Butter'], description: 'Creamy saffron risotto with parmesan' },
      { id: 103, name: 'Caesar Salad', price: 12, category: 'Appetizer', image: '🥗', ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'], description: 'Fresh romaine with parmesan and croutons' },
      { id: 104, name: 'Bruschetta', price: 10, category: 'Appetizer', image: '🍞', ingredients: ['Bread', 'Tomato', 'Basil', 'Garlic', 'Olive Oil'], description: 'Toasted bread with fresh tomatoes' },
      { id: 105, name: 'Tiramisu', price: 8, category: 'Dessert', image: '🍰', ingredients: ['Mascarpone', 'Coffee', 'Cocoa', 'Ladyfingers', 'Sugar'], description: 'Classic Italian mascarpone dessert' },
      { id: 106, name: 'Panna Cotta', price: 9, category: 'Dessert', image: '🍮', ingredients: ['Cream', 'Vanilla', 'Gelatin', 'Sugar'], description: 'Silky vanilla cream dessert' }
    ]
  },
  {
    id: 2,
    name: 'Brooklyn Bistro',
    borough: 'Brooklyn',
    address: '456 Park Avenue, Brooklyn',
    phone: '(718) 555-0456',
    rating: 4.6,
    reviews: 218,
    deliveryTime: '30-40 min',
    minOrder: 20,
    deliveryFee: 3.99,
    cuisine: 'French',
    image: '🥐',
    products: [
      { id: 201, name: 'Coq au Vin', price: 24, category: 'Main', image: '🍗', ingredients: ['Chicken', 'Red Wine', 'Mushrooms', 'Pearl Onions'], description: 'Chicken braised in red wine' },
      { id: 202, name: 'Duck Confit', price: 26, category: 'Main', image: '🦆', ingredients: ['Duck Leg', 'Salt', 'Garlic', 'Thyme'], description: 'Slow-cooked duck in its own fat' },
      { id: 203, name: 'French Onion Soup', price: 11, category: 'Appetizer', image: '🥣', ingredients: ['Onions', 'Beef Broth', 'Gruyere', 'Bread'], description: 'Rich caramelized onion soup' },
      { id: 204, name: 'Escargot', price: 14, category: 'Appetizer', image: '🐚', ingredients: ['Snails', 'Butter', 'Garlic', 'Parsley'], description: 'Snails in garlic butter' },
      { id: 205, name: 'Crème Brûlée', price: 9, category: 'Dessert', image: '🍮', ingredients: ['Cream', 'Egg Yolk', 'Vanilla', 'Sugar'], description: 'Caramelized custard dessert' }
    ]
  },
  {
    id: 3,
    name: 'Queens Palace Hotel',
    borough: 'Queens',
    address: '789 Roosevelt Ave, Queens',
    phone: '(718) 555-0789',
    rating: 4.7,
    reviews: 445,
    deliveryTime: '20-30 min',
    minOrder: 25,
    deliveryFee: 4.99,
    cuisine: 'International',
    image: '🌍',
    products: [
      { id: 301, name: 'Pad Thai', price: 16, category: 'Main', image: '🍜', ingredients: ['Rice Noodles', 'Shrimp', 'Peanuts', 'Lime', 'Egg'], description: 'Stir-fried rice noodles with shrimp' },
      { id: 302, name: 'Butter Chicken', price: 18, category: 'Main', image: '🍛', ingredients: ['Chicken', 'Tomato Sauce', 'Cream', 'Spices'], description: 'Creamy tomato sauce with chicken' },
      { id: 303, name: 'Spring Rolls', price: 8, category: 'Appetizer', image: '🌯', ingredients: ['Rice Paper', 'Vegetables', 'Shrimp'], description: 'Crispy spring rolls with sweet sauce' },
      { id: 304, name: 'Samosa', price: 7, category: 'Appetizer', image: '🥟', ingredients: ['Dough', 'Potatoes', 'Peas', 'Spices'], description: 'Crispy Indian pastry with potato filling' },
      { id: 305, name: 'Mango Sticky Rice', price: 8, category: 'Dessert', image: '🥭', ingredients: ['Mango', 'Sticky Rice', 'Coconut Milk'], description: 'Thai sweet mango with sticky rice' }
    ]
  },
  {
    id: 4,
    name: 'Manhattan Tacos',
    borough: 'Manhattan',
    address: '321 5th Ave, Manhattan',
    phone: '(212) 555-0321',
    rating: 4.5,
    reviews: 567,
    deliveryTime: '15-25 min',
    minOrder: 12,
    deliveryFee: 1.99,
    cuisine: 'Mexican',
    image: '🌮',
    products: [
      { id: 401, name: 'Carnitas Taco', price: 4, category: 'Main', image: '🌮', ingredients: ['Pork', 'Tortilla', 'Onion', 'Cilantro'], description: 'Slow-cooked pork taco' },
      { id: 402, name: 'Carne Asada Taco', price: 5, category: 'Main', image: '🌮', ingredients: ['Beef', 'Tortilla', 'Lime', 'Cilantro'], description: 'Grilled marinated beef' },
      { id: 403, name: 'Guacamole', price: 6, category: 'Appetizer', image: '🥑', ingredients: ['Avocado', 'Lime', 'Cilantro', 'Onion'], description: 'Fresh guacamole with chips' },
      { id: 404, name: 'Churros', price: 5, category: 'Dessert', image: '🍟', ingredients: ['Dough', 'Cinnamon', 'Sugar', 'Chocolate Sauce'], description: 'Crispy fried dough with chocolate' }
    ]
  },
  {
    id: 5,
    name: 'Bronx Spice House',
    borough: 'Bronx',
    address: '321 Grand Concourse, Bronx',
    phone: '(718) 555-0321',
    rating: 4.4,
    reviews: 289,
    deliveryTime: '35-45 min',
    minOrder: 18,
    deliveryFee: 3.49,
    cuisine: 'Indian',
    image: '🍛',
    products: [
      { id: 501, name: 'Chicken Tikka Masala', price: 16, category: 'Main', image: '🍛', ingredients: ['Chicken', 'Yogurt', 'Spices', 'Tomato Sauce', 'Cream'], description: 'Creamy chicken curry' },
      { id: 502, name: 'Biryani', price: 14, category: 'Main', image: '🍚', ingredients: ['Basmati Rice', 'Meat', 'Spices', 'Yogurt'], description: 'Spiced rice with meat' },
      { id: 503, name: 'Samosa', price: 5, category: 'Appetizer', image: '🥟', ingredients: ['Pastry', 'Potatoes', 'Peas', 'Spices'], description: 'Fried Indian pastry' },
      { id: 504, name: 'Naan', price: 3, category: 'Bread', image: '🍞', ingredients: ['Flour', 'Yogurt', 'Butter'], description: 'Indian flatbread' },
      { id: 505, name: 'Gulab Jamun', price: 5, category: 'Dessert', image: '🍮', ingredients: ['Milk Solids', 'Sugar Syrup', 'Cardamom'], description: 'Indian sweet dumplings' }
    ]
  },
  {
    id: 6,
    name: 'Staten Island Seafood',
    borough: 'Staten Island',
    address: '500 Bay Street, Staten Island',
    phone: '(718) 555-0500',
    rating: 4.3,
    reviews: 178,
    deliveryTime: '40-50 min',
    minOrder: 30,
    deliveryFee: 4.99,
    cuisine: 'Seafood',
    image: '🦞',
    products: [
      { id: 601, name: 'Lobster Tail', price: 35, category: 'Main', image: '🦞', ingredients: ['Lobster', 'Butter', 'Lemon'], description: 'Butter-poached Maine lobster' },
      { id: 602, name: 'Pan-Seared Scallops', price: 28, category: 'Main', image: '🐚', ingredients: ['Scallops', 'Butter', 'Garlic'], description: 'Diver scallops with lemon' },
      { id: 603, name: 'Clam Chowder', price: 10, category: 'Appetizer', image: '🥣', ingredients: ['Clams', 'Potatoes', 'Cream', 'Bacon'], description: 'New England style clam chowder' },
      { id: 604, name: 'Oyster Sampler', price: 18, category: 'Appetizer', image: '🐚', ingredients: ['Oysters', 'Ice', 'Lemon'], description: 'Six fresh oysters' },
      { id: 605, name: 'Grilled Salmon', price: 26, category: 'Main', image: '🐟', ingredients: ['Salmon', 'Lemon', 'Herbs', 'Olive Oil'], description: 'Fresh Atlantic salmon' }
    ]
  }
]

/**
 * Get all NYC restaurants
 */
export const getAllRestaurants = () => {
  return nycRestaurants
}

/**
 * Get restaurant by ID
 */
export const getRestaurantById = (restaurantId) => {
  return nycRestaurants.find(r => r.id === restaurantId)
}

/**
 * Search restaurants by name
 */
export const searchRestaurants = (query) => {
  return nycRestaurants.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
    r.borough.toLowerCase().includes(query.toLowerCase())
  )
}

/**
 * Get products by restaurant
 */
export const getProductsByRestaurant = (restaurantId) => {
  const restaurant = getRestaurantById(restaurantId)
  return restaurant ? restaurant.products : []
}

/**
 * Search products across all restaurants
 */
export const searchProducts = (query) => {
  const results = []
  nycRestaurants.forEach(restaurant => {
    const products = restaurant.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase()))
    )
    products.forEach(product => {
      results.push({
        ...product,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image
      })
    })
  })
  return results
}

/**
 * Get product details
 */
export const getProductDetails = (restaurantId, productId) => {
  const restaurant = getRestaurantById(restaurantId)
  if (!restaurant) return null
  
  const product = restaurant.products.find(p => p.id === productId)
  if (!product) return null
  
  return {
    ...product,
    restaurantName: restaurant.name,
    restaurantImage: restaurant.image,
    deliveryTime: restaurant.deliveryTime,
    minOrder: restaurant.minOrder,
    deliveryFee: restaurant.deliveryFee
  }
}

/**
 * Calculate order total
 */
export const calculateOrderTotal = (items, restaurant) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08875 // NYC tax rate
  const deliveryFee = subtotal >= restaurant.minOrder ? restaurant.deliveryFee : 0
  const total = subtotal + tax + deliveryFee
  
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    deliveryFee: deliveryFee,
    total: parseFloat(total.toFixed(2))
  }
}

/**
 * Validate order
 */
export const validateOrder = (items, restaurant) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  if (items.length === 0) {
    return { valid: false, message: 'Cart is empty' }
  }
  
  if (subtotal < restaurant.minOrder) {
    return {
      valid: false,
      message: `Minimum order of $${restaurant.minOrder} required. Current total: $${subtotal.toFixed(2)}`
    }
  }
  
  return { valid: true }
}

/**
 * Process payment (Demo mode)
 */
export const processPayment = (orderDetails) => {
  return new Promise((resolve) => {
    // Simulate payment processing
    setTimeout(() => {
      resolve({
        success: true,
        orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 30 * 60000) // 30 min from now
      })
    }, 2000)
  })
}

/**
 * Get payment methods
 */
export const getPaymentMethods = () => {
  return [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', available: true },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', available: true },
    { id: 'apple_pay', name: 'Apple Pay', icon: '🍎', available: true },
    { id: 'google_pay', name: 'Google Pay', icon: '🔵', available: true },
    { id: 'cash', name: 'Cash on Delivery', icon: '💵', available: true }
  ]
}

/**
 * Get delivery status
 */
export const getDeliveryStatus = (orderId) => {
  const statuses = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered']
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  
  return {
    orderId,
    status: randomStatus,
    estimatedTime: '25-35 minutes',
    driverName: 'Ahmed', // Demo driver
    driverPhone: '(212) 555-DEMO',
    driverLocation: { lat: 40.7580, lng: -73.9855 }
  }
}

export default {
  getAllRestaurants,
  getRestaurantById,
  searchRestaurants,
  getProductsByRestaurant,
  searchProducts,
  getProductDetails,
  calculateOrderTotal,
  validateOrder,
  processPayment,
  getPaymentMethods,
  getDeliveryStatus
}
