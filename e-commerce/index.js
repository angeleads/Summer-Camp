// In-memory database simulation
let database = {
  products: [],
  users: [],
  orders: [],
};

// Load database from external JSON file
async function loadDatabase() {
  try {
    const response = await fetch("database.json");
    const data = await response.json();
    database = data;

    // Initialize the display after loading data
    displayProducts();
    updateDashboard();
  } catch (error) {
    console.error("Error loading database:", error);
    // Fallback data if JSON file fails to load
    database = {
      products: [
        {
          id: 1,
          name: "Laptop Pro",
          category: "electronics",
          price: 999.99,
          stock: 15,
          description: "High-performance laptop for professionals",
        },
        {
          id: 2,
          name: "Wireless Headphones",
          category: "electronics",
          price: 149.99,
          stock: 30,
          description: "Premium wireless headphones with noise cancellation",
        },
      ],
      users: [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice@example.com",
          role: "customer",
          address: "123 Main St, City, State 12345",
          joinDate: "2024-01-15",
        },
      ],
      orders: [
        {
          id: 1,
          userId: 1,
          productId: 1,
          quantity: 1,
          total: 999.99,
          status: "delivered",
          date: "2024-06-15",
        },
      ],
    };
    displayProducts();
    updateDashboard();
  }
}

let editingProductId = null;
let editingUserId = null;

// Tab management
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  document.getElementById(tabName).classList.add("active");

  // Add active class to clicked button
  event.target.classList.add("active");

  // Load data for the selected tab
  if (tabName === "products") {
    displayProducts();
  } else if (tabName === "users") {
    displayUsers();
  } else if (tabName === "orders") {
    displayOrders();
  } else if (tabName === "dashboard") {
    updateDashboard();
  }
}

// Product CRUD operations
function displayProducts(productsToShow = database.products) {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  productsToShow.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "card";
    productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <div class="actions">
                        <button class="btn btn-secondary" onclick="editProduct(${
                          product.id
                        })">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${
                          product.id
                        })">Delete</button>
                    </div>
                `;
    productsList.appendChild(productCard);
  });
}

function showAddProductModal() {
  editingProductId = null;
  document.getElementById("productModalTitle").textContent = "Add Product";
  document.getElementById("productForm").reset();
  document.getElementById("productModal").style.display = "block";
}

function editProduct(id) {
  const product = database.products.find((p) => p.id === id);
  if (product) {
    editingProductId = id;
    document.getElementById("productModalTitle").textContent = "Edit Product";
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productModal").style.display = "block";
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    database.products = database.products.filter((p) => p.id !== id);
    displayProducts();
    updateDashboard();
  }
}

function searchProducts() {
  const searchTerm = document
    .getElementById("productSearch")
    .value.toLowerCase();
  const filteredProducts = database.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
}

// User CRUD operations
function displayUsers(usersToShow = database.users) {
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  usersToShow.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "card";
    userCard.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Role:</strong> ${user.role}</p>
                    <p><strong>Address:</strong> ${user.address}</p>
                    <p><strong>Joined:</strong> ${user.joinDate}</p>
                    <div class="actions">
                        <button class="btn btn-secondary" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                `;
    usersList.appendChild(userCard);
  });
}

function showAddUserModal() {
  editingUserId = null;
  document.getElementById("userModalTitle").textContent = "Add User";
  document.getElementById("userForm").reset();
  document.getElementById("userModal").style.display = "block";
}

function editUser(id) {
  const user = database.users.find((u) => u.id === id);
  if (user) {
    editingUserId = id;
    document.getElementById("userModalTitle").textContent = "Edit User";
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userRole").value = user.role;
    document.getElementById("userAddress").value = user.address;
    document.getElementById("userModal").style.display = "block";
  }
}

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    database.users = database.users.filter((u) => u.id !== id);
    displayUsers();
    updateDashboard();
  }
}

function searchUsers() {
  const searchTerm = document.getElementById("userSearch").value.toLowerCase();
  const filteredUsers = database.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
  );
  displayUsers(filteredUsers);
}

// Orders display
function displayOrders() {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = "";

  database.orders.forEach((order) => {
    const user = database.users.find((u) => u.id === order.userId);
    const product = database.products.find((p) => p.id === order.productId);

    const orderCard = document.createElement("div");
    orderCard.className = "card";
    orderCard.innerHTML = `
                    <h3>Order #${order.id}</h3>
                    <p><strong>Customer:</strong> ${
                      user ? user.name : "Unknown"
                    }</p>
                    <p><strong>Product:</strong> ${
                      product ? product.name : "Unknown"
                    }</p>
                    <p><strong>Quantity:</strong> ${order.quantity}</p>
                    <p><strong>Status:</strong> ${order.status}</p>
                    <p><strong>Date:</strong> ${order.date}</p>
                    <div class="price">$${order.total.toFixed(2)}</div>
                    <div class="actions">
                        <button class="btn btn-secondary" onclick="updateOrderStatus(${
                          order.id
                        })">Update Status</button>
                    </div>
                `;
    ordersList.appendChild(orderCard);
  });
}

function updateOrderStatus(orderId) {
  const order = database.orders.find((o) => o.id === orderId);
  if (order) {
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    const currentIndex = statuses.indexOf(order.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    order.status = nextStatus;
    displayOrders();
    updateDashboard();
  }
}

// Dashboard
function updateDashboard() {
  document.getElementById("totalProducts").textContent =
    database.products.length;
  document.getElementById("totalUsers").textContent = database.users.length;
  document.getElementById("totalOrders").textContent = database.orders.length;

  const totalRevenue = database.orders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  document.getElementById(
    "totalRevenue"
  ).textContent = `$${totalRevenue.toFixed(2)}`;
}

// Form handlers
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const productData = {
    name: document.getElementById("productName").value,
    category: document.getElementById("productCategory").value,
    price: parseFloat(document.getElementById("productPrice").value),
    stock: parseInt(document.getElementById("productStock").value),
    description: document.getElementById("productDescription").value,
  };

  if (editingProductId) {
    // Update existing product
    const productIndex = database.products.findIndex(
      (p) => p.id === editingProductId
    );
    database.products[productIndex] = {
      ...database.products[productIndex],
      ...productData,
    };
  } else {
    // Add new product
    const newId = Math.max(...database.products.map((p) => p.id)) + 1;
    database.products.push({ id: newId, ...productData });
  }

  closeModal("productModal");
  displayProducts();
  updateDashboard();
});

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    role: document.getElementById("userRole").value,
    address: document.getElementById("userAddress").value,
  };

  if (editingUserId) {
    // Update existing user
    const userIndex = database.users.findIndex((u) => u.id === editingUserId);
    database.users[userIndex] = { ...database.users[userIndex], ...userData };
  } else {
    // Add new user
    const newId = Math.max(...database.users.map((u) => u.id)) + 1;
    const today = new Date().toISOString().split("T")[0];
    database.users.push({ id: newId, ...userData, joinDate: today });
  }

  closeModal("userModal");
  displayUsers();
  updateDashboard();
});

// Modal functions
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
  updateDashboard();
});

// TODO: Students can extend this with:
// - Add image upload functionality
// - Implement user authentication
// - Add shopping cart functionality
// - Create order creation system
// - Add data validation
// - Implement data persistence with localStorage
// - Add more advanced search and filtering
// - Create reports and analytics
// - Add email notifications
// - Implement inventory management
