# Manual Reddit Pixel Implementation Guide
## For Neocities Hosting (No GTM)

---

## Overview

All HTML files now have **placeholder comments** showing exactly where to add Reddit Pixel code. This manual implementation bypasses GTM and works perfectly on Neocities.

---

## Step 1: Get Your Reddit Pixel ID

1. Go to [Reddit Ads Manager](https://ads.reddit.com/)
2. Navigate to **Settings** → **Pixels**
3. Copy your Pixel ID (format: `t2_abc123xyz`)

---

## Step 2: Activate the Pixel Code

### On EVERY Page (index.html, product1.html, product2.html, cart.html, success.html):

**Find this section in the `<head>`:**

```html
<!-- ============================================ -->
<!-- REDDIT PIXEL BASE CODE - PLACE HERE -->
<!-- Replace YOUR_PIXEL_ID with your actual Reddit Pixel ID -->
<!-- ============================================ -->
<!-- <script>
!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
rdt('init','YOUR_PIXEL_ID', {"optOut":false,"useDecimalCurrencyValues":true});
rdt('track', 'PageVisit');
</script> -->
<!-- END REDDIT PIXEL BASE CODE -->
```

### To Activate:

1. **Remove the HTML comment tags** `<!--` and `-->`
2. **Replace `YOUR_PIXEL_ID`** with your actual pixel ID
3. **Save the file**

**After activation, it should look like:**

```html
<!-- ============================================ -->
<!-- REDDIT PIXEL BASE CODE - PLACE HERE -->
<!-- Replace YOUR_PIXEL_ID with your actual Reddit Pixel ID -->
<!-- ============================================ -->
<script>
!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
rdt('init','t2_abc123xyz', {"optOut":false,"useDecimalCurrencyValues":true});
rdt('track', 'PageVisit');
</script>
<!-- END REDDIT PIXEL BASE CODE -->
```

---

## Step 3: Activate Event Tracking

### On Each Page, Find the Event-Specific Comments:

### **index.html** - Track Product Impressions

Find this section at the bottom:
```javascript
// ============================================
// REDDIT PIXEL: Track Product Impressions
// Add this code to track products shown on homepage
// ============================================
// rdt('track', 'ViewContent', {
//     itemCount: 2,
//     products: [
//         {itemId: 'product1', itemName: 'Premium Widget', itemPrice: 29.99},
//         {itemId: 'product2', itemName: 'Deluxe Gadget', itemPrice: 49.99}
//     ]
// });
```

**Remove the `//` comments** to activate.

---

### **product1.html & product2.html** - Track Product Views & Add to Cart

Find TWO sections:

**Section 1: Product View**
```javascript
// ============================================
// REDDIT PIXEL: Track Product View
// ============================================
// rdt('track', 'ViewContent', {
//     itemId: 'product1',
//     itemName: 'Premium Widget',
//     itemPrice: 29.99,
//     currency: 'USD'
// });
```

**Section 2: Add to Cart (inside the addToCart function)**
```javascript
// ============================================
// REDDIT PIXEL: Track Add to Cart
// ============================================
// rdt('track', 'AddToCart', {
//     itemId: id,
//     itemName: name,
//     itemPrice: price,
//     currency: 'USD'
// });
```

**Remove the `//` comments** from both sections.

---

### **success.html** - Track Purchase

Find this section:
```javascript
// Uncomment to track purchase:
// rdt('track', 'Purchase', {
//     transactionId: transaction.id,
//     value: revenue.toFixed(2),
//     currency: 'USD',
//     products: transaction.items.map(item => ({
//         itemId: item.id,
//         itemName: item.name,
//         itemPrice: item.price,
//         quantity: item.quantity
//     }))
// });
```

**Remove the `//` comments** to activate.

---

## Step 4: Test Your Implementation

### Using Browser Console:

1. Open your site in browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Navigate through your site:
   - Homepage → Check for "ViewContent" (products)
   - Product page → Check for "ViewContent" (single product)
   - Add to cart → Check for "AddToCart"
   - Success page → Check for "Purchase"

### What to Look For:

You should see console logs like:
```
Reddit Pixel: PageVisit
Reddit Pixel: ViewContent
Reddit Pixel: AddToCart
Reddit Pixel: Purchase
```

---

## Step 5: Verify in Reddit Ads Manager

1. Go to [Reddit Ads Manager](https://ads.reddit.com/)
2. **Settings** → **Pixels** → Your Pixel
3. Check **"Recent Activity"**
4. Should see events within 15-30 minutes:
   - PageVisit ✅
   - ViewContent ✅
   - AddToCart ✅
   - Purchase ✅

---

## What Placeholders Are in Each File:

| File | Placeholder Locations |
|------|----------------------|
| **index.html** | 1. Base code in `<head>` <br> 2. Product impressions at bottom |
| **product1.html** | 1. Base code in `<head>` <br> 2. ViewContent tracking <br> 3. AddToCart tracking |
| **product2.html** | 1. Base code in `<head>` <br> 2. ViewContent tracking <br> 3. AddToCart tracking |
| **cart.html** | 1. Base code in `<head>` only |
| **success.html** | 1. Base code in `<head>` <br> 2. Purchase tracking |

---

## Quick Activation Checklist:

- [ ] Got Reddit Pixel ID from Reddit Ads Manager
- [ ] Uncommented base pixel code in ALL 5 HTML files
- [ ] Replaced `YOUR_PIXEL_ID` with actual ID in ALL files
- [ ] Uncommented product impressions tracking (index.html)
- [ ] Uncommented ViewContent tracking (product1.html, product2.html)
- [ ] Uncommented AddToCart tracking (product1.html, product2.html)
- [ ] Uncommented Purchase tracking (success.html)
- [ ] Uploaded all files to Neocities
- [ ] Tested on live site
- [ ] Verified events in Reddit Ads Manager

---

## Benefits of Manual Implementation:

✅ **Works on Neocities** - No CSP issues  
✅ **No GTM needed** - Direct pixel integration  
✅ **Easier to debug** - Code is visible in files  
✅ **Full control** - Customize tracking as needed  
✅ **Faster loading** - One less third-party service  

---

## Troubleshooting:

### Events Not Showing in Reddit?

1. **Check console for errors** (F12 → Console)
2. **Verify Pixel ID is correct** in all files
3. **Make sure comments are removed** (no `<!--` or `//`)
4. **Wait 30 minutes** - Reddit can be slow to update
5. **Clear browser cache** and test again

### Console Errors?

- Check that all `//` comments are removed from tracking code
- Verify JavaScript syntax (no missing commas, brackets)
- Make sure cart.js is loading properly

---

**Last Updated:** January 2026  
**Implementation Type:** Manual (No GTM)  
**Platform:** Neocities Compatible  
**Status:** Ready to Activate

