const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Casual Hoodie",
        category: "Fashion",
        price: 1499,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 2999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Travel Backpack",
        category: "Accessories",
        price: 1899,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    }
];

let cart = [];

const productsContainer = document.getElementById("productsContainer");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function displayProducts(productList) {
    productsContainer.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="price">₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        productsContainer.appendChild(card);
    });
}

function filterProducts(category) {
    const buttons = document.querySelectorAll(".filter-buttons button");

    buttons.forEach(button => {
        button.classList.remove("active");
        if (button.textContent === category) {
            button.classList.add("active");
        }
    });

    if (category === "All") {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>

            <div class="cart-actions">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    updateCart();
}

function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCart();
}

function toggleCart() {
    cartSidebar.classList.toggle("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add products first.");
    } else {
        alert("Order placed successfully! Thank you for shopping with ShopNova.");
        cart = [];
        updateCart();
        toggleCart();
    }
}

displayProducts(products);