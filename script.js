// ================================
// ANDREW SHOPPING CART
// ================================

let cart = [];

// Create cart button
const cartButton = document.createElement("button");
cartButton.className = "cart-button";
cartButton.innerHTML = "🛒 Cart <span id='cart-count'>0</span>";
document.body.appendChild(cartButton);

// Create cart box
const cartBox = document.createElement("div");
cartBox.className = "cart-box";

cartBox.innerHTML = `
    <div class="cart-header">
        <h2>🛒 Shopping Cart</h2>
        <button class="close-cart">×</button>
    </div>

    <div id="cart-items"></div>

    <div class="cart-total">
        Total: Ugx <span id="cart-total">0</span>
    </div>

    <button class="checkout-btn">
        Proceed to Checkout
    </button>
`;

document.body.appendChild(cartBox);


// ================================
// OPEN CART
// ================================

cartButton.addEventListener("click", function () {
    cartBox.classList.add("active");
});


// ================================
// CLOSE CART
// ================================

document.querySelector(".close-cart").addEventListener("click", function () {
    cartBox.classList.remove("active");
});


// ================================
// ADD PRODUCTS TO CART
// ================================

const orderButtons = document.querySelectorAll(
    ".homy button, .dressing button, .Electronics1 button, .commodity button"
);

orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product = button.parentElement;

        const productName =
            product.querySelector("p").textContent;

        const priceText =
            product.querySelectorAll("p")[1].textContent;

        // Extract numbers from price
        const price =
            parseInt(priceText.replace(/[^0-9]/g, ""));

        const existingProduct =
            cart.find(item => item.name === productName);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        alert(productName + " added to cart!");
    });

});


// ================================
// UPDATE CART
// ================================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach(function (item, index) {

        total += item.price * item.quantity;

        count += item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    Ugx ${item.price.toLocaleString()}
                </p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <button
                    class="remove-item"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

            <strong>
                Ugx ${(item.price * item.quantity).toLocaleString()}
            </strong>
        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        total.toLocaleString();
}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}


// ================================
// REMOVE PRODUCT
// ================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// ================================
// CHECKOUT
// ================================

document.querySelector(".checkout-btn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your shopping cart is empty!");

            return;
        }


        const checkoutBox =
            document.createElement("div");

        checkoutBox.className =
            "checkout-box active";


        checkoutBox.innerHTML = `

            <div class="checkout-form">

                <h2>Checkout</h2>

                <form id="checkoutForm">

                    <input
                        type="text"
                        id="customerName"
                        placeholder="Full Name"
                        required
                    >

                    <input
                        type="tel"
                        id="customerPhone"
                        placeholder="Phone Number"
                        required
                    >

                    <input
                        type="text"
                        id="customerLocation"
                        placeholder="Delivery Location"
                        required
                    >

                    <select
                        id="paymentMethod"
                        required>

                        <option value="">
                            Select Payment Method
                        </option>

                        <option>
                            Cash on Delivery
                        </option>

                        <option>
                            Mobile Money
                        </option>

                        <option>
                            Bank Transfer
                        </option>

                    </select>

                    <textarea
                        id="customerMessage"
                        rows="4"
                        placeholder="Additional message">
                    </textarea>

                    <button
                        type="submit"
                        class="place-order">

                        Place Order

                    </button>

                </form>

            </div>
        `;


        document.body.appendChild(checkoutBox);


        // ================================
        // SUBMIT ORDER
        // ================================

        document
            .getElementById("checkoutForm")
            .addEventListener("submit", function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "customerName"
                    ).value;

                const phone =
                    document.getElementById(
                        "customerPhone"
                    ).value;

                const location =
                    document.getElementById(
                        "customerLocation"
                    ).value;

                const payment =
                    document.getElementById(
                        "paymentMethod"
                    ).value;


                let total = 0;

                cart.forEach(function (item) {

                    total +=
                        item.price *
                        item.quantity;

                });


                alert(

                    "ORDER SUCCESSFUL!\\n\\n" +

                    "Customer: " +
                    name + "\\n" +

                    "Phone: " +
                    phone + "\\n" +

                    "Location: " +
                    location + "\\n" +

                    "Payment: " +
                    payment + "\\n" +

                    "Total: Ugx " +
                    total.toLocaleString() +

                    "\\n\\nThank you for shopping with Andrew Shopping Site!"

                );


                // Empty cart

                cart.length = 0;

                updateCart();

                checkoutBox.remove();

                cartBox.classList.remove("active");

            });

    });


// ================================
// SEARCH PRODUCTS
// ================================

const searchInput =
    document.querySelector(
        ".search input"
    );

const searchButton =
    document.querySelector(
        ".search button"
    );


function searchProducts() {

    const searchValue =
        searchInput.value.toLowerCase();


    const products =
        document.querySelectorAll(

            ".homy > div, " +
            ".dressing > div, " +
            ".Electronics1 > div, " +
            ".commodity > div"

        );


    products.forEach(function (product) {

        const text =
            product.textContent.toLowerCase();


        if (text.includes(searchValue)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


searchButton.addEventListener(
    "click",
    searchProducts
);


searchInput.addEventListener(
    "keyup",
    function (event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);