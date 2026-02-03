// Cart Management Functions using localStorage

// Initialize cart if it doesn't exist
function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Get cart from localStorage
function getCart() {
    initCart();
    return JSON.parse(localStorage.getItem('cart'));
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Product exists, increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // New product, add to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            category: product.category,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Track addToCart event
    if (typeof trackAddToCart === 'function') {
        trackAddToCart(product);
    }
}

// Remove item from cart by index
function removeFromCart(index) {
    const cart = getCart();
    
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        saveCart(cart);
        
        // Track removeFromCart event
        if (typeof trackRemoveFromCart === 'function') {
            trackRemoveFromCart(removedItem);
        }
    }
}

// Increase quantity of item by index
function increaseQuantity(index) {
    const cart = getCart();
    
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += 1;
        saveCart(cart);
    }
}

// Decrease quantity of item by index
function decreaseQuantity(index) {
    const cart = getCart();
    
    if (index >= 0 && index < cart.length) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            saveCart(cart);
        } else {
            // If quantity is 1, remove the item
            removeFromCart(index);
        }
    }
}

// Get total number of items in cart
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get total price of cart
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear entire cart
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Update cart count display
function updateCartCount() {
    const count = getCartItemCount();
    const cartCountElements = document.querySelectorAll('#cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Initialize cart on page load
initCart();
