# 🛠️ Integration Guide - How to Use the New APIs

## Quick Start - 3 Easy Steps

### Step 1: Add Real-Time Delivery Tracking

**Where:** In your Booking confirmation screen

```jsx
import { useState } from 'react'
import RealTimeDeliveryTracking from '../components/RealTimeDeliveryTracking'

export function BookingConfirmation() {
  const [showTracking, setShowTracking] = useState(true)

  return (
    <>
      {showTracking && (
        <RealTimeDeliveryTracking
          restaurant={{
            id: 1,
            name: 'The Green Fork',
            lat: 40.7128,
            lng: -74.0060
          }}
          deliveryAddress={{
            street: '123 Main St',
            city: 'New York',
            zip: '10001',
            lat: 40.7200,
            lng: -73.9850
          }}
          onClose={() => setShowTracking(false)}
        />
      )}
    </>
  )
}
```

**Result:** Users see real-time delivery tracking with:
- ETA countdown
- Progress bar (0-100%)
- Traffic conditions
- Driver contact info
- Live status updates

---

### Step 2: Add AI Recommendations

**Where:** On home page or restaurant discovery

```jsx
import { useState } from 'react'
import AIRecommendations from '../components/AIRecommendations'

export function HomePage() {
  const userOrders = [
    { cuisine: 'Italian', date: '2025-01-20', total: 45 },
    { cuisine: 'Italian', date: '2025-01-15', total: 52 }
  ]

  return (
    <AIRecommendations
      restaurants={allRestaurants}
      userOrderHistory={userOrders}
      onSelectRestaurant={(restaurantId) => {
        // Handle restaurant selection
        navigateToRestaurant(restaurantId)
      }}
    />
  )
}
```

**Result:** Users see:
- Personalized ranking (#1, #2, #3)
- Match score (92% match)
- Why they'll love it
- Suggested dishes
- Health & safety badges

---

### Step 3: Add Secure Authentication

**Where:** At app entry point

```jsx
import AdvancedAuthComponent from './components/AdvancedAuthComponent'

export function App() {
  return <AdvancedAuthComponent />
}
```

**Result:** Users get:
- Sign in / Sign up forms
- Google OAuth button
- Apple OAuth button
- Security status dashboard
- MFA setup option

---

## API Usage Examples

### 1. Real-Time Delivery

#### Calculate ETA
```javascript
import { calculateDeliveryEta } from '../utils/googleMapsApi'

// Get estimated arrival time
const eta = await calculateDeliveryEta(
  { lat: 40.7128, lng: -74.0060 },  // Restaurant
  { lat: 40.7200, lng: -73.9850 },  // Delivery address
  15  // Prep time in minutes
)

console.log(eta)
// Output: {
//   prepTime: 15,
//   travelTime: 22,
//   totalTime: 37,
//   estimatedArrival: "7:45 PM",
//   trafficCondition: "moderate"
// }
```

#### Live Delivery Tracking
```javascript
import { createLiveDeliveryTracker } from '../utils/googleMapsApi'

// Create tracker
const tracker = createLiveDeliveryTracker(
  { lat: 40.7128, lng: -74.0060 },  // Start
  { lat: 40.7200, lng: -73.9850 },  // End
  20  // Duration in minutes
)

// Get current position
const position = tracker.getCurrentPosition()
// { lat: 40.7160, lng: -73.9905, progress: 50, remainingMinutes: 10 }

// Advance to next step (call every 3 seconds)
tracker.advance()
```

#### Check Traffic
```javascript
import { getLiveTrafficConditions } from '../utils/googleMapsApi'

const traffic = await getLiveTrafficConditions('Manhattan to Brooklyn')

console.log(traffic)
// {
//   condition: 'moderate',
//   avgSpeed: 32,
//   speedLimit: 30,
//   incidents: 0
// }
```

---

### 2. AI Recommendations

#### Get User Preferences
```javascript
import { analyzeUserPreferences } from '../utils/aiRecommendationsApi'

const userOrders = [
  { cuisine: 'Italian', total: 45 },
  { cuisine: 'Italian', total: 52 },
  { cuisine: 'French', total: 65 }
]

const preferences = analyzeUserPreferences(userOrders)

console.log(preferences)
// {
//   mostLoved: 'Italian',
//   averageSpending: 54,
//   frequentTimeOfDay: 'Dinner',
//   totalOrders: 3,
//   topRestaurants: ['Place 1', 'Place 2']
// }
```

#### Generate Recommendations
```javascript
import { generateAIRecommendations } from '../utils/aiRecommendationsApi'

const recommendations = await generateAIRecommendations(
  {
    preferences,
    budget: 30,
    favoriteRestaurants: preferences.topRestaurants
  },
  restaurants // Array of all restaurants
)

console.log(recommendations[0])
// {
//   rank: 1,
//   restaurantName: 'Brooklyn Bistro',
//   matchScore: 92,
//   rating: 4.8,
//   reason: 'You loved Italian...',
//   suggestedDishes: ['Pasta', 'Salad']
// }
```

#### Get Dining Insights
```javascript
import { getDiningInsights } from '../utils/aiRecommendationsApi'

const insights = await getDiningInsights(preferences, restaurant)

console.log(insights.whyYouWillLoveIt)
// [
//   "They use Italian techniques like your favorite restaurants",
//   "Maintained Grade A health score (8/100)",
//   "Average check is $25, matching your budget"
// ]
```

---

### 3. Authentication

#### Sign Up
```javascript
import { signUpWithEmail } from '../utils/authSecurityApi'

const user = await signUpWithEmail(
  'user@example.com',
  'SecurePassword123!',
  { displayName: 'John Doe' }
)

// Returns: {
//   uid: 'user_abc123',
//   email: 'user@example.com',
//   status: 'VERIFICATION_PENDING'
// }
```

#### Sign In
```javascript
import { signInWithEmail } from '../utils/authSecurityApi'

const user = await signInWithEmail(
  'user@example.com',
  'SecurePassword123!'
)

// Returns: {
//   uid: 'user_abc123',
//   email: 'user@example.com',
//   lastLogin: '2025-01-26T10:30:00Z'
// }
```

#### OAuth Login (Google)
```javascript
import { signInWithGoogle } from '../utils/authSecurityApi'

const user = await signInWithGoogle()

// Returns: {
//   uid: 'google_abc123',
//   email: 'user@gmail.com',
//   provider: 'google.com',
//   displayName: 'John Doe',
//   photoURL: 'https://...'
// }
```

#### Get Current User
```javascript
import { getCurrentUser } from '../utils/authSecurityApi'

const user = getCurrentUser()

if (user) {
  console.log(`Logged in as: ${user.displayName}`)
  console.log(`Provider: ${user.provider}`)
}
```

#### Check Security Status
```javascript
import { getSecurityStatus } from '../utils/authSecurityApi'

const status = getSecurityStatus()

console.log(status)
// {
//   isAuthenticated: true,
//   provider: 'google',
//   mfaEnabled: false,
//   securityScore: 75,
//   recommendations: [
//     'Enable 2FA for extra security',
//     'Review login activity'
//   ]
// }
```

#### Enable 2FA
```javascript
import { enableMFA } from '../utils/authSecurityApi'

const mfaSetup = await enableMFA(user.uid)

console.log(mfaSetup.qrCode)  // Show QR code to user
console.log(mfaSetup.backupCodes)  // [10 backup codes]
```

---

## Real-World Scenarios

### Scenario 1: User Places Order

```javascript
async function placeOrder() {
  // 1. Check if user is authenticated
  const user = getCurrentUser()
  if (!user) {
    showAuthComponent()
    return
  }

  // 2. Show AI recommendations
  const recommendations = await generateAIRecommendations(
    userProfile,
    restaurants
  )
  showRecommendations(recommendations)

  // 3. User selects restaurant and confirms order
  const order = createOrder(selectedRestaurant, items)
  processPayment(order)

  // 4. Show real-time tracking
  const eta = await calculateDeliveryEta(
    selectedRestaurant,
    userAddress,
    15
  )
  showTracking({
    restaurant: selectedRestaurant,
    deliveryAddress: userAddress,
    eta: eta
  })
}
```

### Scenario 2: User Discovers New Restaurants

```javascript
async function discoverRestaurants() {
  // 1. Analyze user's order history
  const preferences = analyzeUserPreferences(userOrderHistory)

  // 2. Generate personalized recommendations
  const recommendations = await generateAIRecommendations(
    preferences,
    allRestaurants
  )

  // 3. Show top 3 matches
  displayRecommendations(recommendations.slice(0, 3))

  // 4. When user hovers over restaurant
  recommendations.forEach(rec => {
    rec.insights = await getDiningInsights(preferences, rec)
  })

  // 5. Show detailed insights on click
  showRestaurantDetails(rec.insights)
}
```

### Scenario 3: First-Time User Journey

```javascript
async function newUserJourney() {
  // Step 1: Sign up
  const user = await signUpWithEmail(email, password)
  
  // OR one-click OAuth
  const user = await signInWithGoogle()

  // Step 2: Show security dashboard
  const status = getSecurityStatus()
  suggestMFASetup(status)

  // Step 3: Let user set preferences
  const prefs = {
    cuisines: ['Italian', 'French'],
    budget: 30,
    dietary: ['Vegetarian']
  }
  updateUserProfile(user.uid, { preferences: prefs })

  // Step 4: Show recommendations (even without order history)
  const recommendations = await generateAIRecommendations(
    prefs,
    allRestaurants
  )
  showWelcomeRecommendations(recommendations)
}
```

---

## Component Integration Map

```
App
├── AdvancedAuthComponent (Entry point)
│   ├── Sign in form
│   ├── Google OAuth
│   ├── Apple OAuth
│   └── User dashboard
│
├── HomePage
│   └── AIRecommendations
│       ├── User preferences summary
│       ├── Ranked recommendations
│       └── Detailed insights
│
├── RestaurantDetail
│   ├── Order button
│   └── Menu items
│
├── Booking
│   ├── Cart review
│   ├── Payment form
│   └── RealTimeDeliveryTracking
│       ├── ETA display
│       ├── Progress bar
│       ├── Traffic info
│       └── Driver contact
│
└── Profile
    ├── User info
    ├── Security status
    ├── Enable MFA
    └── Order history
```

---

## Error Handling

### Try-Catch Pattern
```javascript
try {
  const recommendations = await generateAIRecommendations(
    userProfile,
    restaurants
  )
  displayRecommendations(recommendations)
} catch (error) {
  console.error('Recommendation error:', error)
  showFallbackRecommendations() // Show default recommendations
  notifyUser('Using default recommendations')
}
```

### API Failure Scenarios
```javascript
// Google Maps down?
if (!eta) {
  eta = { totalTime: 45, estimatedArrival: '~45 minutes' }
}

// AI service unavailable?
if (!recommendations) {
  recommendations = sortByRating(restaurants)
}

// Auth service down?
if (!user) {
  showLocalSignUp() // Fallback to local storage
}
```

---

## Performance Tips

### 1. Cache Recommendations
```javascript
const cache = {}

async function getRecommendations(userId) {
  if (cache[userId]) {
    return cache[userId]
  }
  const recs = await generateAIRecommendations(...)
  cache[userId] = recs
  return recs
}
```

### 2. Lazy Load Insights
```javascript
// Don't fetch insights for all 5 recommendations
// Only fetch for the one user selects
const insight = await getDiningInsights(
  preferences,
  selectedRecommendation
)
```

### 3. Debounce Traffic Checks
```javascript
import { debounce } from 'lodash'

const checkTraffic = debounce(async (route) => {
  return await getLiveTrafficConditions(route)
}, 5000) // Check at most every 5 seconds
```

---

## Testing

### Test Google Maps
```javascript
async function testDeliveryTracking() {
  const eta = await calculateDeliveryEta(
    { lat: 40.7128, lng: -74.0060 },
    { lat: 40.7200, lng: -73.9850 },
    15
  )
  
  assert(eta.totalTime === 37)
  assert(eta.trafficCondition)
  console.log('✓ ETA calculation works')
}
```

### Test AI Recommendations
```javascript
async function testRecommendations() {
  const recs = await generateAIRecommendations(
    { cuisines: ['Italian'], budget: 30 },
    restaurants
  )
  
  assert(recs.length > 0)
  assert(recs[0].matchScore > 0)
  console.log('✓ Recommendations work')
}
```

### Test Authentication
```javascript
async function testAuth() {
  const user = await signUpWithEmail(
    'test@example.com',
    'Password123!'
  )
  
  assert(user.uid)
  assert(user.email === 'test@example.com')
  console.log('✓ Auth works')
}
```

---

**Happy Coding! 🚀**

For more details, see `ADVANCED_API_INTEGRATION.md`
