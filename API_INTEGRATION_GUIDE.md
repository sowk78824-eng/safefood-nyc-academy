# NYC Open Data API Integration Guide

## Overview
The SafeFood NYC Academy now integrates real-time health inspection data from the NYC Department of Health using the **NYC Open Data API**.

## Files Created/Modified

### 1. **NEW: `src/utils/nycOpenDataApi.js`**
Centralized utility for API calls to NYC Open Data

**Functions:**
- `fetchRestaurantInspections(searchTerm, borough, grade)` - Main query function with filters
- `fetchRestaurantByCamis(camis)` - Fetch single restaurant by CAMIS ID
- `fetchRestaurantsByBoroughAndGrade(borough, grade)` - Filtered borough/grade queries
- `getBoroughHealthStatistics(borough)` - Aggregate borough statistics
- `transformApiData(apiData)` - Convert API response to app format

**API Endpoint:**
```
https://data.cityofnewyork.us/resource/43nn-pn8j.json
```

**Request Type:** GET (Reading Data)
**Authentication:** None required

---

## Feature: Real-Time Hygiene Verification

### User Experience
1. **View Restaurant List** in Health Map
2. **Click "Verify Live" button** on any restaurant
3. **Loading State** - Spinner appears while fetching
4. **Results Modal** - Real data from NYC Health Department API displays in a detailed modal
5. **Close** - Dismiss the verification results

### What Gets Verified
When user clicks "Verify Live":
- ✅ **CAMIS ID** - Unique restaurant identifier
- ✅ **Restaurant Name** - From NYC Health Department database
- ✅ **Borough** - Location
- ✅ **Health Grade** - A (Excellent), B (Good), C (Fair)
- ✅ **Score** - 0-100 (lower is better, 0-13 is Grade A)
- ✅ **Last Inspection Date** - When NYC Health Inspector visited
- ✅ **Violations Count** - Number of violations cited
- ✅ **Violation Details** - Specific health code violations
- ✅ **Cuisine Type** - Restaurant classification
- ✅ **Address & Contact** - Full location information

### Example Modal Display
```
┌─────────────────────────────────────────┐
│  Live Hygiene Verification              │
├─────────────────────────────────────────┤
│  Data Source: NYC Health Department     │
│  Verified: 2025-01-15 at 2:30 PM        │
│                                         │
│  [CAMIS: 40364449] [Grade: A] [Score:8] │
│  [Violations: 0]                        │
│                                         │
│  Restaurant: The Green Fork Restaurant  │
│  Address: 123 Broadway, Manhattan, NY   │
│  Last Inspection: 05/12/2025            │
│  Status: Passed                         │
│                                         │
│  ✓ API Data: https://data.city...      │
│  Type: GET Request (Reading Data)       │
│  Auth: None Required                    │
└─────────────────────────────────────────┘
```

---

## Modified Files

### `src/modules/healthmap/HealthMap.jsx`
**Changes:**
- ✅ Added imports: `RefreshCw, Check` icons and API utility functions
- ✅ Added state variables:
  - `apiLoading` - Track API call status
  - `apiData` - Store API response
  - `showApiData` - Control modal visibility
  - `verifyingRestaurant` - Track which restaurant is being verified
- ✅ Added function: `verifyHygieneFromAPI(restaurant)` - Triggers API call
- ✅ Added "Verify Live" button to each restaurant in list
- ✅ Added detailed API data display modal
- ✅ Added error handling and "No data found" messages
- ✅ Added loading spinner during API requests

**Button Styling:**
- Blue background (#2563EB)
- Spinning icon during load
- Disabled state while loading
- Shows "Verifying..." text while fetching
- Calls with event.stopPropagation() to prevent list selection

**Modal Features:**
- Full-screen overlay with white card
- Color-coded health grades (Green=A, Yellow=B, Red=C)
- Grid display of key metrics
- Detailed restaurant information
- Violation descriptions in warning box
- API source attribution
- Close button

---

## API Query Examples

### 1. Search by Restaurant Name & Borough
```javascript
const data = await fetchRestaurantInspections('Green Fork', 'Manhattan', '')
// Query: dba like '%GREEN FORK%' AND boro = 'Manhattan'
```

### 2. Filter by Grade
```javascript
const data = await fetchRestaurantInspections('', 'Manhattan', 'A')
// Query: boro = 'Manhattan' AND grade = 'A'
```

### 3. Search All Criteria
```javascript
const data = await fetchRestaurantInspections('Restaurant', 'Brooklyn', 'B')
// Query: dba like '%RESTAURANT%' AND boro = 'Brooklyn' AND grade = 'B'
```

### 4. Get Single Restaurant
```javascript
const data = await fetchRestaurantByCamis('40364449')
// Returns: Single restaurant object or empty array
```

### 5. Borough Statistics
```javascript
const stats = await getBoroughHealthStatistics('Manhattan')
// Returns: Aggregated data for all restaurants in borough
```

---

## Error Handling

### API Unavailable
If the API request fails:
```
⚠️ API Connection Error
Unable to connect to NYC Health Department API
This is a demo application with fallback to mock data

API Endpoint: https://data.cityofnewyork.us/resource/43nn-pn8j.json
```

### No Data Found
If restaurant not in NYC database:
```
ℹ️ No recent inspection data found
The restaurant may be new or temporarily closed
```

### Network Issues
- Graceful fallback to mock data
- User notification in modal
- Console logging for debugging

---

## Technical Stack

**Frontend:**
- React 18.2.0
- Lucide React Icons (RefreshCw, Check)
- Tailwind CSS for styling
- React Leaflet for maps

**API:**
- NYC Open Data (SODA API format)
- GET request (No authentication)
- JSON response
- 50 result limit per request

**State Management:**
- React useState hooks
- Local component state for UI
- No Redux needed

---

## Browser Compatibility
Works on all modern browsers with:
- ✅ ES6 support
- ✅ Fetch API support
- ✅ CORS enabled (NYC Open Data allows cross-origin)

---

## Future Enhancements

1. **Caching** - Cache API results for 24 hours
2. **Favorites** - Save favorite restaurants with inspection history
3. **Notifications** - Alert when inspection grade changes
4. **Batch Queries** - Fetch multiple restaurants at once
5. **Analytics** - Track API call success rates
6. **Advanced Filters** - Cuisine type, violation type, score range
7. **Export** - Download inspection reports as PDF

---

## Deployment Status
✅ **Build:** 2597 modules transformed
✅ **CSS:** 29.36 kB (gzip: 5.55 kB)
✅ **JS:** 1,052.14 kB (gzip: 299.90 kB)
✅ **Deployed:** GitHub Pages

---

## Testing the Feature

### Manual Testing Steps:
1. Go to Health Map page
2. View list of restaurants on right sidebar
3. Click "Verify Live" button on any restaurant
4. Observe:
   - ✅ Loading spinner appears
   - ✅ Button text changes to "Verifying..."
   - ✅ Modal opens with results
   - ✅ Real data from NYC API displays
   - ✅ Timestamp shows when data was fetched
   - ✅ Close button dismisses modal

### Expected Data
- Restaurant names match mock data (for restaurants in NYC database)
- Real health grades, scores, violations from NYC Health Dept
- Actual inspection dates and violation descriptions
- CAMIS IDs link to official NYC records

---

## API Documentation References

**NYC Open Data:**
- Dataset: DOHMH New York City Restaurant Inspection Results
- ID: 43nn-pn8j
- Format: SODA API (REST)
- Access: Public (no key required)
- Rate Limit: 50,000 requests/day per IP

**SODA API Syntax:**
- `$where` - Filter clause
- `$limit` - Result limit
- `$offset` - Pagination offset
- `$order` - Sort results
- `$select` - Choose specific columns

---

**Last Updated:** January 15, 2025
**Version:** 1.0.0
**Status:** Production Ready ✅
