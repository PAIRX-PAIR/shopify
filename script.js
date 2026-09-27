```javascript
/* =========================================
   PAIRX GAMING - SCRIPT.JS
   ========================================= */

// =========================================
// CARRITO
// =========================================

let cart = [];

// Elementos del carrito
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// =========================================
// AGREGAR PRODUCTO
// =========================================

function addToCart(name, price, image) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();

    // Abrir carrito
    openCart();

    showNotification("🔥 Producto agregado al carrito");
}

// =========================================
// ACTUALIZAR CARRITO
// =========================================

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let quantityTotal = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;
        quantityTotal += product.quantity;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>
                    $${formatPrice(product.price)}
                </p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

            <button 
                class="remove-product"
                onclick="removeFromCart(${index})"
            >
                🗑️
            </button>
        `;

        cartItems.appendChild(item);
    });

    if (cartTotal) {
        cartTotal.textContent =
            "$" + formatPrice(total);
    }

    if (cartCount) {
        cartCount.textContent = quantityTotal;
    }

    // Guardar carrito
    localStorage.setItem(
        "pairxCart",
        JSON.stringify(cart)
    );
}

// =========================================
// AUMENTAR CANTIDAD
// =========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}

// =========================================
// DISMINUIR CANTIDAD
// =========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}

// =========================================
// ELIMINAR PRODUCTO
// =========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    showNotification("Producto eliminado");
}

// =========================================
// ABRIR CARRITO
// =========================================

function openCart() {

    const cartPanel =
        document.getElementById("cart-panel");

    if (cartPanel) {
        cartPanel.classList.add("active");
    }
}

// =========================================
// CERRAR CARRITO
// =========================================

function closeCart() {

    const cartPanel =
        document.getElementById("cart-panel");

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }
}

// =========================================
// VACIAR CARRITO
// =========================================

function clearCart() {

    cart = [];

    updateCart();

    showNotification("🛒 Carrito vacío");
}

// =========================================
// FORMATO DE PRECIO
// =========================================

function formatPrice(price) {

    return new Intl.NumberFormat("es-CO").format(
        price
    );
}

// =========================================
// NOTIFICACIÓN
// =========================================

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "pairx-notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 10);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 2200);
}

// =========================================
// BUSCADOR
// =========================================

const searchInput =
    document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const search =
                this.value.toLowerCase();

            const products =
                document.querySelectorAll(
                    ".product-card"
                );

            products.forEach(product => {

                const name =
                    product
                        .querySelector("h3")
                        ?.textContent
                        .toLowerCase() || "";

                if (name.includes(search)) {

                    product.style.display =
                        "block";

                } else {

                    product.style.display =
                        "none";
                }
            });
        }
    );
}

// =========================================
// FILTRO DE PRODUCTOS
// =========================================

function filterProducts(category) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );

    products.forEach(product => {

        const productCategory =
            product.dataset.category;

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";
        }
    });
}

// =========================================
// BOTONES DE COMPRA
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const buttons =
            document.querySelectorAll(
                ".buy-btn"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".product-card"
                        );

                    if (!card) return;

                    const name =
                        card.querySelector(
                            "h3"
                        )?.textContent ||
                        "Producto PairX";

                    const priceElement =
                        card.querySelector(
                            ".price"
                        );

                    const image =
                        card.querySelector(
                            "img"
                        )?.src || "";

                    const priceText =
                        priceElement?.textContent
                        .replace(/\D/g, "")
```
