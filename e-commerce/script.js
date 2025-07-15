// Global variables to store our data
let products = [];
let cart = [];

// --- User Products Section ---

let userProducts = [];

// Initialize the application when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupNavigation();
  const form = document.getElementById("user-product-form");
  if (form) {
    form.addEventListener("submit", addUserProduct);
  }
});

// Load products from JSON file
async function loadProducts() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    products = data.products;
    displayProducts();
  } catch (error) {
    console.error("Error loading products:", error);
    // Fallback: use sample data if JSON file fails to load
    products = getSampleProducts();
    displayProducts();
  }
}

// Display products on the page
function displayProducts() {
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
        <img src="${product.image}" alt="${
    product.name
  }" onerror="this.src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fsyria.adra.cloud%2Fcategory%2Fimpact_education%2F&psig=AOvVaw3C_BU7pX-aCLlKJ_7sm3Br&ust=1752657742825000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPDAyoTFvo4DFQAAAAAdAAAAABAj'">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button class="btn btn-success" onclick="addToCart(${product.id})">
            Add to Cart
        </button>
    `;

  return card;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCartDisplay();
    alert(`${product.name} added to cart!`);
  }
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="btn" onclick="removeFromCart(${
                  item.id
                })" style="margin-left: 1rem; background-color: #e74c3c; color: white;">
                    Remove
                </button>
            </div>
        `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  // Update total
  cartTotal.textContent = total.toFixed(2);
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);

  // Clear cart after checkout
  cart = [];
  updateCartDisplay();
}

// Show My Products section
function showMyProducts() {
  document.querySelector(".hero").style.display = "none";
  document.querySelector(".products-section").style.display = "none";
  document.querySelector(".cart-section").style.display = "none";
  document.querySelector(".my-products-section").style.display = "block";
  displayUserProducts();
}

// Display user products
function displayUserProducts() {
  const userProductsGrid = document.getElementById("user-products-grid");
  userProductsGrid.innerHTML = "";

  userProducts.forEach((product, idx) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fsyria.adra.cloud%2Fcategory%2Fimpact_education%2F&psig=AOvVaw3C_BU7pX-aCLlKJ_7sm3Br&ust=1752657742825000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPDAyoTFvo4DFQAAAAAdAAAAABAj'">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">$${product.price.toFixed(2)}</div>
      <button class="btn btn-warning" onclick="editUserProduct(${idx})">Edit</button>
      <button class="btn btn-danger" onclick="removeUserProduct(${idx})">Remove</button>
    `;
    userProductsGrid.appendChild(card);
  });
}

// Add user product
function addUserProduct(e) {
  e.preventDefault();
  const name = document.getElementById("user-product-name").value;
  const description = document.getElementById("user-product-description").value;
  const price = parseFloat(document.getElementById("user-product-price").value);
  const image = document.getElementById("user-product-image").value;
  const category = document.getElementById("user-product-category").value;

  if (!name || !description || isNaN(price) || !image || !category) {
    alert("Please fill in all fields.");
    return;
  }

  userProducts.push({ name, description, price, image, category });
  displayUserProducts();
  document.getElementById("user-product-form").reset();
}

// Remove user product
function removeUserProduct(idx) {
  userProducts.splice(idx, 1);
  displayUserProducts();
}

// Edit user product
function editUserProduct(idx) {
  const product = userProducts[idx];
  document.getElementById("user-product-name").value = product.name;
  document.getElementById("user-product-description").value = product.description;
  document.getElementById("user-product-price").value = product.price;
  document.getElementById("user-product-image").value = product.image;
  document.getElementById("user-product-category").value = product.category;

  // Remove the product so it can be replaced on submit
  userProducts.splice(idx, 1);
  displayUserProducts();
}

// Navigation setup
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);

      if (targetId === "cart") {
        showCart();
      } else if (targetId === "products") {
        showProducts();
      } else if (targetId === "my-products") {
        showMyProducts();
      } else {
        showHome();
      }
    });
  });
}

// Show different sections
function showHome() {
  document.querySelector(".hero").style.display = "block";
  document.querySelector(".products-section").style.display = "block";
  document.querySelector(".cart-section").style.display = "none";
}

function showProducts() {
  document.querySelector(".hero").style.display = "none";
  document.querySelector(".products-section").style.display = "block";
  document.querySelector(".cart-section").style.display = "none";
}

function showCart() {
  document.querySelector(".hero").style.display = "none";
  document.querySelector(".products-section").style.display = "none";
  document.querySelector(".cart-section").style.display = "block";
}

// Sample data fallback
function getSampleProducts() {
  return [
    {
      id: 1,
      name: "Laptop",
      description: "High-performance laptop for work and gaming",
      price: 999.99,
      image: "https://p2-ofp.static.pub//fes/cms/2025/05/28/ltcbwi1vzj7wqbv8hu2rs73a2tqx1r306860.png",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest smartphone with amazing camera",
      price: 699.99,
      image: "https://thumb.pccomponentes.com/w-530-530/articles/1058/10581419/1950-apple-iphone-14-256gb-azul-libre-7740d711-9a03-4206-af14-6824236f8ecd.jpg",
      category: "Electronics",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Wireless noise-canceling headphones",
      price: 199.99,
      image: "https://m.media-amazon.com/images/I/61fxPWFu6aL.__AC_SX300_SY300_QL70_ML2_.jpg",
      category: "Electronics",
    },
  ];
}
