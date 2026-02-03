// GTM Data Layer Implementation - Enhanced E-commerce
// Platform-agnostic data layer structure for Google Tag Manager

// Initialize dataLayer if it doesn't exist
window.dataLayer = window.dataLayer || [];

// Helper function to push events to dataLayer
function pushToDataLayer(eventData) {
    window.dataLayer.push(eventData);
    console.log('Data Layer Event:', eventData); // For debugging
}

// 1. PAGE VIEW EVENT
// Tracks when a user views any page
function trackPageView(pageName) {
    pushToDataLayer({
        'event': 'pageView',
        'pageName': pageName,
        'pageType': getPageType(pageName),
        'timestamp': new Date().toISOString()
    });
}

// Helper to determine page type
function getPageType(pageName) {
    if (pageName === 'Home') return 'homepage';
    if (pageName.startsWith('Product -')) return 'product';
    if (pageName === 'Cart') return 'cart';
    if (pageName === 'Purchase Success') return 'purchase';
    return 'other';
}

// 2. PRODUCT IMPRESSIONS EVENT
// Tracks when products are displayed to the user (e.g., on homepage)
function trackProductImpressions(products) {
    pushToDataLayer({
        'event': 'productImpressions',
        'ecommerce': {
            'currencyCode': 'USD',
            'impressions': products.map((product, index) => ({
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'brand': product.brand,
                'category': product.category,
                'list': 'Product Listing',
                'position': product.position || (index + 1)
            }))
        }
    });
}

// 3. PRODUCT CLICK EVENT
// Tracks when a user clicks on a product to view details
function trackProductClick(product) {
    pushToDataLayer({
        'event': 'productClick',
        'ecommerce': {
            'click': {
                'actionField': {
                    'list': 'Product Listing'
                },
                'products': [{
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'brand': product.brand,
                    'category': product.category,
                    'position': product.position
                }]
            }
        }
    });
}

// 4. PRODUCT VIEW/DETAIL EVENT
// Tracks when a user views a product detail page
function trackProductView(product) {
    pushToDataLayer({
        'event': 'productView',
        'ecommerce': {
            'detail': {
                'actionField': {
                    'list': 'Product Detail'
                },
                'products': [{
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'brand': product.brand,
                    'category': product.category
                }]
            }
        }
    });
}

// 5. ADD TO CART EVENT
// Tracks when a user adds a product to cart
function trackAddToCart(product, quantity = 1) {
    pushToDataLayer({
        'event': 'addToCart',
        'ecommerce': {
            'currencyCode': 'USD',
            'add': {
                'products': [{
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'brand': product.brand,
                    'category': product.category,
                    'quantity': quantity
                }]
            }
        }
    });
}

// 6. REMOVE FROM CART EVENT
// Tracks when a user removes a product from cart
function trackRemoveFromCart(product) {
    pushToDataLayer({
        'event': 'removeFromCart',
        'ecommerce': {
            'remove': {
                'products': [{
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'brand': product.brand,
                    'category': product.category,
                    'quantity': product.quantity
                }]
            }
        }
    });
}

// 7. CHECKOUT EVENT
// Tracks when a user views the cart page with items
function trackCheckout(cartItems, total) {
    if (cartItems.length === 0) return;
    
    pushToDataLayer({
        'event': 'checkout',
        'ecommerce': {
            'checkout': {
                'actionField': {
                    'step': 1,
                    'option': 'Cart View'
                },
                'products': cartItems.map(item => ({
                    'id': item.id,
                    'name': item.name,
                    'price': item.price,
                    'brand': item.brand,
                    'category': item.category,
                    'quantity': item.quantity
                }))
            }
        },
        'cartTotal': total
    });
}

// 8. PURCHASE EVENT
// Tracks successful purchases/conversions
function trackPurchase(transactionId, revenue, products) {
    pushToDataLayer({
        'event': 'purchase',
        'ecommerce': {
            'purchase': {
                'actionField': {
                    'id': transactionId,
                    'affiliation': 'Simple Shop',
                    'revenue': revenue,
                    'tax': 0,
                    'shipping': 0,
                    'coupon': ''
                },
                'products': products.map(item => ({
                    'id': item.id,
                    'name': item.name,
                    'price': item.price,
                    'brand': item.brand,
                    'category': item.category,
                    'quantity': item.quantity
                }))
            }
        },
        'transactionId': transactionId,
        'transactionTotal': revenue
    });
}

// Clear ecommerce object before each event (best practice)
function clearEcommerceObject() {
    pushToDataLayer({
        'ecommerce': null
    });
}

// Note: In production, you may want to clear the ecommerce object before each new event
// Call clearEcommerceObject() before tracking new e-commerce events if needed
