# Google Tag Manager Setup Guide

## Overview
This guide explains how to set up Google Tag Manager (GTM) with the Enhanced E-commerce data layer implementation for the Simple Shop website. This is a platform-agnostic guide focusing on the data layer structure and GTM configuration.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GTM Container Setup](#gtm-container-setup)
3. [Data Layer Structure](#data-layer-structure)
4. [Event Tracking Overview](#event-tracking-overview)
5. [GTM Tag Configuration](#gtm-tag-configuration)
6. [Testing and Debugging](#testing-and-debugging)

---

## Prerequisites

- Active Google Tag Manager account ([tagmanager.google.com](https://tagmanager.google.com))
- GTM Container ID (format: GTM-XXXXXXX)
- Basic understanding of GTM interface

---

## GTM Container Setup

### Step 1: Get Your GTM Container ID
1. Log into Google Tag Manager
2. Create a new container or use an existing one
3. Copy your Container ID (format: GTM-XXXXXXX)

### Step 2: Replace Placeholder in Website Files
Replace `GTM-XXXXXXX` with your actual Container ID in all HTML files:
- `index.html`
- `product1.html`
- `product2.html`
- `cart.html`
- `success.html`

The GTM code is already installed in two places on each page:
- **Head section**: Main GTM script
- **Body section**: Noscript fallback iframe

---

## Data Layer Structure

The website uses the **Enhanced E-commerce** specification. All events push to `window.dataLayer` array.

### Data Layer Format

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    'event': 'eventName',
    'ecommerce': {
        // Enhanced E-commerce data
    }
});
```

### Product Object Structure

All product data follows this format:

```javascript
{
    'id': 'PRODUCT-ID',      // Unique product SKU
    'name': 'Product Name',   // Product name
    'price': 29.99,           // Product price (number)
    'brand': 'Simple Shop',   // Brand name
    'category': 'Category',   // Product category
    'quantity': 1             // Quantity (for cart events)
}
```

---

## Event Tracking Overview

### 1. Page View Event
**Trigger**: Every page load  
**Event Name**: `pageView`

```javascript
{
    'event': 'pageView',
    'pageName': 'Home',
    'pageType': 'homepage',
    'timestamp': '2026-01-13T...'
}
```

**Page Types**:
- `homepage` - Main page
- `product` - Product detail pages
- `cart` - Shopping cart
- `purchase` - Success page

---

### 2. Product Impressions Event
**Trigger**: Products displayed on homepage  
**Event Name**: `productImpressions`

```javascript
{
    'event': 'productImpressions',
    'ecommerce': {
        'currencyCode': 'USD',
        'impressions': [
            {
                'id': 'WIDGET-001',
                'name': 'Premium Widget',
                'price': 29.99,
                'brand': 'Simple Shop',
                'category': 'Widgets',
                'list': 'Product Listing',
                'position': 1
            }
        ]
    }
}
```

---

### 3. Product Click Event
**Trigger**: User clicks "View Details" button  
**Event Name**: `productClick`

```javascript
{
    'event': 'productClick',
    'ecommerce': {
        'click': {
            'actionField': {
                'list': 'Product Listing'
            },
            'products': [{
                'id': 'WIDGET-001',
                'name': 'Premium Widget',
                'price': 29.99,
                'brand': 'Simple Shop',
                'category': 'Widgets',
                'position': 1
            }]
        }
    }
}
```

---

### 4. Product View Event
**Trigger**: User views product detail page  
**Event Name**: `productView`

```javascript
{
    'event': 'productView',
    'ecommerce': {
        'detail': {
            'actionField': {
                'list': 'Product Detail'
            },
            'products': [{
                'id': 'WIDGET-001',
                'name': 'Premium Widget',
                'price': 29.99,
                'brand': 'Simple Shop',
                'category': 'Widgets'
            }]
        }
    }
}
```

---

### 5. Add to Cart Event
**Trigger**: User clicks "Add to Cart"  
**Event Name**: `addToCart`

```javascript
{
    'event': 'addToCart',
    'ecommerce': {
        'currencyCode': 'USD',
        'add': {
            'products': [{
                'id': 'WIDGET-001',
                'name': 'Premium Widget',
                'price': 29.99,
                'brand': 'Simple Shop',
                'category': 'Widgets',
                'quantity': 1
            }]
        }
    }
}
```

---

### 6. Remove from Cart Event
**Trigger**: User removes item from cart  
**Event Name**: `removeFromCart`

```javascript
{
    'event': 'removeFromCart',
    'ecommerce': {
        'remove': {
            'products': [{
                'id': 'WIDGET-001',
                'name': 'Premium Widget',
                'price': 29.99,
                'brand': 'Simple Shop',
                'category': 'Widgets',
                'quantity': 1
            }]
        }
    }
}
```

---

### 7. Checkout Event
**Trigger**: User views cart page with items  
**Event Name**: `checkout`

```javascript
{
    'event': 'checkout',
    'ecommerce': {
        'checkout': {
            'actionField': {
                'step': 1,
                'option': 'Cart View'
            },
            'products': [
                {
                    'id': 'WIDGET-001',
                    'name': 'Premium Widget',
                    'price': 29.99,
                    'brand': 'Simple Shop',
                    'category': 'Widgets',
                    'quantity': 2
                }
            ]
        }
    },
    'cartTotal': 59.98
}
```

---

### 8. Purchase Event (Conversion)
**Trigger**: Success page load after checkout  
**Event Name**: `purchase`

```javascript
{
    'event': 'purchase',
    'ecommerce': {
        'purchase': {
            'actionField': {
                'id': 'TXN-1705123456789-abc123',
                'affiliation': 'Simple Shop',
                'revenue': 79.98,
                'tax': 0,
                'shipping': 0,
                'coupon': ''
            },
            'products': [
                {
                    'id': 'WIDGET-001',
                    'name': 'Premium Widget',
                    'price': 29.99,
                    'brand': 'Simple Shop',
                    'category': 'Widgets',
                    'quantity': 1
                },
                {
                    'id': 'GADGET-002',
                    'name': 'Deluxe Gadget',
                    'price': 49.99,
                    'brand': 'Simple Shop',
                    'category': 'Gadgets',
                    'quantity': 1
                }
            ]
        }
    },
    'transactionId': 'TXN-1705123456789-abc123',
    'transactionTotal': 79.98
}
```

---

## GTM Tag Configuration

### Creating Data Layer Variables

In GTM, create these Data Layer Variables to capture event data:

1. **Event Name**: `event`
2. **Ecommerce Object**: `ecommerce`
3. **Transaction ID**: `ecommerce.purchase.actionField.id`
4. **Transaction Revenue**: `ecommerce.purchase.actionField.revenue`
5. **Page Name**: `pageName`
6. **Page Type**: `pageType`
7. **Cart Total**: `cartTotal`

### Creating Triggers

Create Custom Event triggers for each event:

1. **Page View Trigger**
   - Type: Custom Event
   - Event name: `pageView`

2. **Product Impressions Trigger**
   - Type: Custom Event
   - Event name: `productImpressions`

3. **Product Click Trigger**
   - Type: Custom Event
   - Event name: `productClick`

4. **Product View Trigger**
   - Type: Custom Event
   - Event name: `productView`

5. **Add to Cart Trigger**
   - Type: Custom Event
   - Event name: `addToCart`

6. **Remove from Cart Trigger**
   - Type: Custom Event
   - Event name: `removeFromCart`

7. **Checkout Trigger**
   - Type: Custom Event
   - Event name: `checkout`

8. **Purchase Trigger**
   - Type: Custom Event
   - Event name: `purchase`

### Example Tag Setup (Google Analytics 4)

**For Purchase Event:**
1. Tag Type: Google Analytics: GA4 Event
2. Event Name: `purchase`
3. Trigger: Purchase Trigger (custom event)
4. Enable Enhanced Measurement
5. Send ecommerce data: Yes
6. Use the built-in ecommerce object from data layer

**For Other Events:**
Follow similar pattern for each event type using the corresponding triggers.

---

## Testing and Debugging

### Using GTM Preview Mode

1. In GTM, click **Preview** button
2. Enter your website URL
3. Browse your site and verify events fire:
   - View homepage → Check `pageView` and `productImpressions`
   - Click product → Check `productClick`
   - View product detail → Check `productView`
   - Add to cart → Check `addToCart`
   - Go to cart → Check `checkout`
   - Complete purchase → Check `purchase`

### Using Browser Console

Open browser console (F12) and monitor data layer:

```javascript
// View entire data layer
console.table(window.dataLayer);

// Watch for new events
window.dataLayer.push = function() {
    console.log('New event pushed:', arguments);
    return Array.prototype.push.apply(window.dataLayer, arguments);
};
```

### Common Issues

**Events not firing:**
- Check browser console for JavaScript errors
- Verify GTM container ID is correct
- Ensure `gtm-datalayer.js` is loaded before events fire

**Missing data in events:**
- Check product data attributes in HTML
- Verify data layer structure matches Enhanced E-commerce spec
- Use GTM Preview mode to inspect variable values

**Purchase event firing multiple times:**
- Check that success page is only loaded once per transaction
- Verify transaction data is cleared after purchase event

---

## Best Practices

1. **Clear ecommerce object**: Consider clearing the ecommerce object before each new event:
   ```javascript
   dataLayer.push({ ecommerce: null });
   ```

2. **Unique Transaction IDs**: Always use unique transaction IDs (timestamp + random string)

3. **Test thoroughly**: Test all events in Preview mode before publishing

4. **Documentation**: Keep this guide updated when adding new products or events

5. **Version Control**: Use GTM versioning and workspaces for changes

6. **Data Accuracy**: Regularly audit data layer values against actual product data

---

## Support Resources

- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [Enhanced E-commerce Developer Guide](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)
- [GTM Community](https://www.en.advertisercommunity.com/t5/Google-Tag-Manager/ct-p/Google-Tag-Manager)

---

**Last Updated**: January 2026  
**Version**: 1.0
