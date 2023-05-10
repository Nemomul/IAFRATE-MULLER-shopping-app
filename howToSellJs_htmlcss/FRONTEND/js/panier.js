const cartIcon = document.querySelector('.cart-icon');
const cartCtn = document.querySelector('.cart-ctn');
const cartItems = document.querySelector('.cart-items');
const clearCartButton = document.querySelector('.clear-cart-button');

// Charge les éléments du panier à partir du localstorage lors du chargement de la page
window.addEventListener('DOMContentLoaded', (event) => {
    const produit = JSON.parse(localStorage.getItem('produit'));
    if (produit !== null) {
        addToCartFromDetail(produit);
        localStorage.removeItem('produit');
    }

    const cart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(cart)) {
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItems.appendChild(cartItem);
        });
    }
    updateTotalPrice();
    updateTotalItems();
});

function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.price = item.price;
    cartItem.innerHTML = `
        <img src="${item.image}" alt="Description de l'image" class="cart-item-image">
        <span class="cart-item-title">${item.title}</span>
        <div class="quantity-control">
            <button onclick="decreaseQuantity('${item.title}')">-</button>
            <span class="cart-item-counter">${item.quantity}</span>
            <button onclick="increaseQuantity('${item.title}')">+</button>
        </div>
        <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
        <i class="mdi mdi-trash-can trash-icon2"></i>
    `;

    return cartItem;
}

function increaseQuantity(title) {
    const cartItem = Array.from(cartItems.getElementsByClassName('cart-item')).find(
        (item) => item.querySelector('.cart-item-title').innerText === title
    );
    if (cartItem) {
        const counter = cartItem.querySelector('.cart-item-counter');
        counter.innerText = parseInt(counter.innerText) + 1;
    }

    updateTotalPrice();
    updateTotalItems();
    saveCart();
}

function decreaseQuantity(title) {
    const cartItem = Array.from(cartItems.getElementsByClassName('cart-item')).find(
        (item) => item.querySelector('.cart-item-title').innerText === title
    );
    if (cartItem) {
        const counter = cartItem.querySelector('.cart-item-counter');
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = parseInt(counter.innerText) - 1;
        } else {
            cartItems.removeChild(cartItem);
        }
    }

    updateTotalPrice();
    updateTotalItems();
    saveCart();
}

function ShowPanier() {
    cartCtn.classList.toggle('open-cart');
    if (cartCtn.classList.contains('open-cart')) {
        cartIcon.src = 'close.png';
    } else {
        cartIcon.src = 'cart.png';
    }
    if (event){
        event.stopPropagation();
    }
}

cartCtn.addEventListener('click', (event) => {
    event.stopPropagation();
})

document.addEventListener('click', () => {
    if (cartCtn.classList.contains('open-cart')) {
        cartCtn.classList.remove('open-cart');
        cartIcon.src = 'cart.png';
    }
});

function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach((item) => {
        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.querySelector('.cart-item-counter').innerText);
        totalPrice += price * quantity;
    });

    const totalPriceElement = document.querySelector('.cart-total-price');
    totalPriceElement.innerText = totalPrice.toFixed(2);
}

function updateTotalItems() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalItems = 0;

    cartItems.forEach((item) => {
        const quantity = parseInt(item.querySelector('.cart-item-counter').innerText);
        totalItems += quantity;
    });

    const totalItemsElement = document.querySelector('.cart-total-items');
    totalItemsElement.innerText = totalItems;
}

function addToCartFromDetail(produit) {
    const existingCartItem = Array.from(cartItems.getElementsByClassName('cart-item')).find(
        (item) => item.querySelector('.cart-item-title').innerText === produit.title
    );

    if (existingCartItem) {
        const counter = existingCartItem.querySelector('.cart-item-counter');
        counter.innerText = parseInt(counter.innerText) + 1;
    } else {
        const cartItem = createCartItem(produit);
        cartItems.appendChild(cartItem);
    }

    updateTotalPrice(); // Mettre à jour le prix total
    updateTotalItems(); // Mettre à jour le total des articles
    saveCart(); // Sauvegarder le panier dans le localstorage
}

function addToCart(event) {
    const product = event.target.closest('.boite');
    const productImageSrc = product.querySelector('.img_carte').src;
    const productTitle = product.querySelector('.titre_carte').innerText;
    const productPrice = parseFloat(product.querySelector('.prix_carte').innerText);

    const produit = {
        image: productImageSrc,
        title: productTitle,
        price: productPrice,
        quantity: 1
    };

    addToCartFromDetail(produit);
}

function removeCartItem(event) {
    const cartItem = event.target.closest('.cart-item');
    cartItems.removeChild(cartItem);
    updateTotalPrice();
    updateTotalItems();
    saveCart(); // Sauvegarder le panier dans le localstorage après suppression d'un élément
}

cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('trash-icon2')) {
        removeCartItem(event);
    }
});

function closeCart(event) {
    cartCtn.classList.remove('open-cart');
    cartIcon.src = 'cart.png';
    if (event) {
        event.stopPropagation();
    }
}

function clearCart() {
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }

    updateTotalPrice();
    updateTotalItems();
    saveCart(); // Sauvegarder le panier dans le localstorage après la suppression de tous les éléments
}

clearCartButton.addEventListener('click', clearCart);

function saveCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cart = Array.from(cartItems).map(item => {
        return {
            image: item.querySelector('.cart-item-image').src,
            title: item.querySelector('.cart-item-title').innerText,
            price: parseFloat(item.dataset.price),
            quantity: parseInt(item.querySelector('.cart-item-counter').innerText)
        };
    });

    localStorage.setItem('cart', JSON.stringify(cart));
}

