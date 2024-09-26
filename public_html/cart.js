let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartElement = document.querySelector('#cartItems');
    const subtotalElement = document.querySelector('#subtotal');
    cartElement.innerHTML = '';
    let subtotal = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = `<div>${item.name} - $${item.price} x ${item.quantity}</div>`;
            cartElement.innerHTML += itemElement;
            subtotal += item.price * item.quantity;
        });
        subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    } else {
        cartElement.innerHTML = '<div>Your cart is empty</div>';
        subtotalElement.textContent = `Subtotal: $0.00`;
    }
}

document.addEventListener('DOMContentLoaded', updateCart);

document.getElementById('checkout').addEventListener('click', function () {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    alert('Thank you for your purchase!');
});
