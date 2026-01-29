# Quick Start Guide - NYC API Integration

## 🎯 What You Need to Know

The SafeFood NYC Academy now integrates with the **NYC Department of Health API** to show real health inspection data for restaurants.

---

## 🚀 For Users

### How to Use
1. Go to **Health Map** page
2. Look at restaurant list on the right side
3. Find any restaurant
4. Click blue **"Verify Live"** button
5. Wait 1-2 seconds for API to respond
6. See modal with real health data

### What You'll See
- ✅ Health Grade (A, B, or C)
- ✅ Health Score (0-100)
- ✅ Number of Violations
- ✅ Last Inspection Date
- ✅ What violations were found
- ✅ Restaurant address & phone
- ✅ When data was retrieved

---

## 👨‍💻 For Developers

### File Structure
```
src/
├── utils/
│   └── nycOpenDataApi.js        ← API utility (NEW)
└── modules/healthmap/
    └── HealthMap.jsx            ← Updated with button & modal
```

### API Functions Available
```javascript
// In src/utils/nycOpenDataApi.js

// Search restaurants by name, borough, grade
fetchRestaurantInspections(name, borough, grade)

// Get single restaurant by ID
fetchRestaurantByCamis(camis)

// Filter by borough and grade
fetchRestaurantsByBoroughAndGrade(borough, grade)

// Get statistics for borough
getBoroughHealthStatistics(borough)

// Transform API response
transformApiData(rawApiData)
```

### How to Use the API
```javascript
// Example 1: Search by name
const results = await fetchRestaurantInspections('Green Fork', '', '')

// Example 2: Search with filters
const results = await fetchRestaurantInspections('Green Fork', 'Manhattan', 'A')

// Example 3: Get by CAMIS ID
const restaurant = await fetchRestaurantByCamis('40364449')

// Example 4: Get borough stats
const stats = await getBoroughHealthStatistics('Manhattan')
```

### Raw API Endpoint
```
https://data.cityofnewyork.us/resource/43nn-pn8j.json
```

### How to Test
```bash
# 1. Install dependencies (if needed)
npm install

# 2. Start development server
npm run dev

# 3. Go to Health Map page
# 4. Click "Verify Live" button
# 5. Check browser console (F12) for logs
```

---

## 🔧 Modifying the Integration

### Change API Limit
Edit `src/utils/nycOpenDataApi.js`, find:
```javascript
url.searchParams.append('$limit', '50')  // Change 50 to desired number
```

### Add New Filter
In `fetchRestaurantInspections()`, add:
```javascript
if (someNewFilter) {
  params.push(`column_name = '${someNewFilter}'`)
}
```

### Change Modal Styling
Edit `src/modules/healthmap/HealthMap.jsx`, find modal section:
```javascript
{showApiData && (
  <div className="...">
    {/* Change colors, sizes, layout here */}
  </div>
)}
```

### Cache API Results
Add to component state:
```javascript
const [apiCache, setApiCache] = useState({})

// Then in verifyHygieneFromAPI:
if (apiCache[restaurant.id]) {
  setApiData(apiCache[restaurant.id])
  return
}
// ... make API call ...
setApiCache({...apiCache, [restaurant.id]: apiData})
```

---

## 📊 Data Structure

### What API Returns
```javascript
{
  camis: "40364449",
  dba: "RESTAURANT NAME",
  boro: "Manhattan",
  grade: "A",
  score: 8,
  inspection_date: "2025-05-12",
  action: "Passed",
  violation_description: "No violations",
  cuisine_description: "Italian",
  street: "BROADWAY",
  zipcode: "10007",
  // ... and more fields
}
```

### What App Uses
```javascript
{
  camis: "40364449",
  dba: "Restaurant Name",
  boro: "Manhattan",
  grade: "A",
  score: 8,
  inspection_date: "2025-05-12",
  action: "Passed",
  violation_description: "...",
  violations_count: 0,
  cuisine_description: "Italian",
  street: "BROADWAY",
  zipcode: "10007"
}
```

---

## 🐛 Debugging

### Check Console Logs
1. Open browser: **F12** (or Cmd+Option+I on Mac)
2. Go to **Console** tab
3. Look for messages starting with:
   - 🔍 - API request sent
   - ✅ - API response received
   - ❌ - API error occurred

### Common Issues

**Issue: No data appears**
- Check that restaurant name matches NYC database
- Try "Green Fork" or "Brooklyn Bistro" from mock data
- Check console for error messages

**Issue: Button doesn't work**
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check console for errors

**Issue: Loading forever**
- Check internet connection
- NYC API might be down (unlikely)
- Check console for error message

---

## 🌍 API Limits & Info

### NYC Open Data
- **Rate Limit:** 50,000 requests/day per IP
- **Response Time:** Usually <1 second
- **Results per Request:** Limited to 50
- **Authentication:** Not required
- **CORS:** Enabled (works from browsers)

### Query Format (Advanced)
Uses SODA (Socrata Open Data API) syntax:
```
GET /resource/43nn-pn8j.json?$where=condition1 AND condition2&$limit=50
```

Examples:
```
?$where=dba like '%RESTAURANT%' AND boro = 'Manhattan'
?$where=grade = 'A' AND boro = 'Brooklyn'
?$where=camis = '40364449'
```

---

## 📱 Mobile Support

Works on mobile browsers:
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet

The modal is responsive and adjusts for smaller screens.

---

## 🎨 Styling Customization

### Button Colors
Find in `HealthMap.jsx`:
```javascript
className="bg-blue-600 hover:bg-blue-700"  // Change these colors
```

### Modal Colors
```javascript
className="bg-white"           // Modal background
className="text-gray-800"      // Text color
className="border-blue-500"    // Accent color
```

### Tailwind Classes Used
- `bg-*` - Background colors
- `text-*` - Text colors
- `p-*` - Padding
- `m-*` - Margin
- `rounded-lg` - Border radius
- `shadow-lg` - Box shadow
- `hover:*` - Hover states

---

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

### Manual Deploy
```bash
npm run build
gh-pages -d dist
```

---

## 📚 File Summary

| File | Purpose | Lines |
|------|---------|-------|
| `src/utils/nycOpenDataApi.js` | API calls | 183 |
| `src/modules/healthmap/HealthMap.jsx` | UI + integration | Updated |
| `API_INTEGRATION_GUIDE.md` | Full guide | Reference |
| `API_IMPLEMENTATION_SUMMARY.md` | Implementation details | Reference |
| `CODE_CHANGES_REFERENCE.md` | Code snippets | Reference |
| `STATUS.md` | Project status | Reference |
| `QUICK_START.md` | This file | Reference |

---

## ✅ Verification Checklist

Before deploying changes:
- [ ] Run `npm run build` - No errors
- [ ] Check console (F12) - No red errors
- [ ] Click "Verify Live" button - Works
- [ ] Modal appears - Shows data
- [ ] Close button works - Modal closes
- [ ] Refresh page - Still works
- [ ] Mobile - Looks good

---

## 🎓 Learning Path

1. **Understand the Flow**
   - Read API_IMPLEMENTATION_SUMMARY.md
   - Understand how API call happens

2. **See the Code**
   - Look at src/utils/nycOpenDataApi.js
   - Understand each function

3. **Try It**
   - Run the app locally: `npm run dev`
   - Click buttons and watch console
   - Make small changes

4. **Deploy**
   - Build: `npm run build`
   - Deploy: `npm run deploy`

---

## 💡 Pro Tips

1. **Check Console Often**
   - F12 → Console tab
   - Shows all API calls and errors

2. **Use Chrome DevTools**
   - Network tab: See API requests
   - Elements tab: Inspect modal
   - Console tab: Debug code

3. **Test Different Restaurants**
   - Some might not be in NYC database
   - Try the 6 mock restaurants first
   - They're from real NYC data

4. **Keep it Simple**
   - Don't over-engineer
   - Current solution is clean and efficient
   - Add features only if needed

---

## 🤝 Need Help?

### Check These Files First
1. `STATUS.md` - Project overview
2. `API_IMPLEMENTATION_SUMMARY.md` - How it works
3. `CODE_CHANGES_REFERENCE.md` - Exact code
4. Browser console (F12) - Error messages

### Common Questions

**Q: How do I add more restaurants?**
A: The API returns real NYC data, but you can modify mock data in HealthMap.jsx

**Q: Can I cache results?**
A: Yes, add state variable for cache as shown in "Modifying the Integration"

**Q: How do I change button text?**
A: Edit "Verify Live" text in HealthMap.jsx

**Q: Is the API free?**
A: Yes, NYC Open Data is public and free

**Q: Does it work offline?**
A: No, it needs internet for API calls

---

## 🎯 Summary

- API utility: `src/utils/nycOpenDataApi.js` - **5 functions**
- UI integration: `src/modules/healthmap/HealthMap.jsx` - **Button + Modal**
- Status: **Production Ready** ✅
- Deployed: **GitHub Pages** ✅

Happy coding! 🚀

---

**Version:** 1.0.0
**Last Updated:** January 15, 2025
**Status:** ✅ Complete & Deployed
