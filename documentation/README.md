# Simple Shop - Black & White E-commerce Website

A minimal black and white e-commerce website built for Neocities with full Google Tag Manager and Enhanced E-commerce tracking.

## Features

- **Clean Design**: Minimal black and white aesthetic
- **Product Catalog**: 2 products with detail pages
- **Shopping Cart**: LocalStorage-based cart with quantity controls
- **Full GTM Integration**: Enhanced E-commerce data layer implementation
- **Conversion Tracking**: Complete event tracking from impression to purchase

## Site Structure

```
├── index.html           # Homepage with hero and product listing
├── product1.html        # Premium Widget detail page
├── product2.html        # Deluxe Gadget detail page
├── cart.html           # Shopping cart with checkout
├── success.html        # Purchase confirmation page
├── styles.css          # Main stylesheet (black & white)
├── cart.js             # Shopping cart functionality
├── gtm-datalayer.js    # GTM Enhanced E-commerce events
└── docs/
    ├── GTM-SETUP-GUIDE.md                      # Technical GTM setup
    └── REDDIT-PIXEL-IMPLEMENTATION-GUIDE.md    # Non-technical Reddit Pixel guide
```

## Products

1. **Premium Widget** - $29.99
   - SKU: WIDGET-001
   - Category: Widgets

2. **Deluxe Gadget** - $49.99
   - SKU: GADGET-002
   - Category: Gadgets

## Installation

1. **Clone or download** this repository
2. **Update GTM Container ID**: Replace `GTM-XXXXXXX` with your actual GTM Container ID in all HTML files:
   - index.html
   - product1.html
   - product2.html
   - cart.html
   - success.html

3. **Upload to Neocities**:
   - Upload all files to your Neocities site
   - Maintain the directory structure

4. **Configure GTM**: Follow the [GTM Setup Guide](GTM-SETUP-GUIDE.md)

## Data Layer Events

The website tracks these Enhanced E-commerce events:

| Event | Description | Trigger |
|-------|-------------|---------|
| `pageView` | Page view tracking | All pages |
| `productImpressions` | Products displayed | Homepage |
| `productClick` | User clicks product | "View Details" button |
| `productView` | Product detail view | Product pages |
| `addToCart` | Item added to cart | "Add to Cart" button |
| `removeFromCart` | Item removed | Cart "Remove" button |
| `checkout` | Cart with items viewed | Cart page |
| `purchase` | Successful purchase | Success page |

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling (black & white theme)
- **Vanilla JavaScript** - No frameworks
- **LocalStorage** - Client-side cart storage
- **Google Tag Manager** - Tag management and tracking
- **Enhanced E-commerce** - Google's e-commerce data layer spec

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires JavaScript enabled and localStorage support.

## Documentation

### For Developers
- [GTM Setup Guide](GTM-SETUP-GUIDE.md) - Complete GTM configuration guide with data layer structure

### For Marketing Teams
- [Reddit Pixel Implementation Guide](REDDIT-PIXEL-IMPLEMENTATION-GUIDE.md) - Step-by-step, non-technical guide for setting up Reddit Pixel via GTM

## Testing

### Local Testing
1. Open `index.html` in a web browser
2. Open browser console (F12)
3. Navigate through the site
4. Check console for data layer events: `console.table(window.dataLayer)`

### GTM Preview Mode
1. In GTM, click "Preview"
2. Enter your website URL
3. Verify all events fire correctly
4. Check data layer variables are populated

### Conversion Testing
1. Add products to cart
2. Go to cart page
3. Click "Proceed to Checkout"
4. Verify success page loads
5. Check that purchase event fired with correct data

## Customization

### Adding Products
1. Update `index.html` with new product card
2. Create new `productX.html` detail page
3. Update product data in data layer calls
4. Assign unique SKU/ID to each product

### Styling
All styles are in `styles.css`. The site uses:
- Black (#000) for primary elements
- White (#fff) for backgrounds
- Minimal use of grays for subtle elements

### Cart Modifications
Cart logic is in `cart.js`:
- `addToCart(product)` - Add item
- `removeFromCart(index)` - Remove item
- `getCart()` - Get all items
- `clearCart()` - Empty cart

## Security Notes

- Cart data stored in localStorage (client-side only)
- No payment processing (this is a demo/tracking implementation)
- Transaction IDs are generated client-side (timestamp + random string)
- For production use, implement server-side cart and payment processing

## Deployment to Neocities

1. Go to [neocities.org](https://neocities.org)
2. Log in to your account
3. Click "Edit Site"
4. Drag and drop all files, maintaining structure
5. Ensure GTM Container ID is updated
6. Test all pages after upload

## License

Free to use for personal and commercial projects.

## Support

For issues or questions:
- Check the GTM Setup Guide for data layer questions
- Review browser console for JavaScript errors
- Use GTM Preview Mode for debugging
- Verify GTM Container ID is correct

## Version

**1.0** - January 2026

---

Built with ❤️ for Neocities | Ready for static hosting | Zero backend dependencies
