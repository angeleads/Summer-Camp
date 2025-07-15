# Welcome to EPITECH Barcelona Summer Camp

## 📋 Overview
WOW! Nice pick!! You got the e-commerce theme!

Well, to make your life easier we created this simple e-commerce website skeleton designed for you to have a good base to get started with the development of your project.
It demonstrates basic web development concepts including HTML structure, CSS styling, that you've previously seen (be careful there are some parts missing... we know for a fact that you'll be able to figure out how to fix it) and as well as some JavaScript functionality, and JSON data management.

## 🎯 Learning Objectives
Through this you will learn:
- HTML semantic structure
- CSS Grid and Flexbox layouts
- JavaScript DOM manipulation
- JSON data handling
- Basic CRUD operations
- Responsive web design
- Event handling in JavaScript

## 📁 Project Structure
\`\`\`
ecommerce/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
├── data.json           # Product data
└── README.md           # This documentation
\`\`\`

## 🚀 Features
- **Product Display**: Shows products from JSON data
- **Shopping Cart**: Add/remove items with quantity tracking
- **Responsive Design**: Works on desktop and mobile
- **Navigation**: Simple single-page navigation
- **Data Management**: JSON-based product storage

## 🔧 How It Works

### HTML Structure
- **Header**: Logo and navigation menu
- **Hero Section**: Welcome message
- **Products Section**: Grid layout for product cards
- **My Products Section**: Grid layout for your created product cards where you can edit and remove your items
- **Cart Section**: Shopping cart display
- **Footer**: Simple footer information

### CSS Features
- **Grid Layout**: Responsive product grid
- **Flexbox**: Header and cart item layouts
- **Hover Effects**: Interactive product cards
- **Media Queries**: Mobile-responsive design

### JavaScript Functionality

But first what's Javascript?

JavaScript is a programming language that adds interactivity and dynamic behavior to websites. It's kind like the brain and nervous system of our website! It's how web pages come alive, allowing for things like animations, form validation, and interactive elements that respond to user actions without needing to reload the page. 

Our code holds:
- **Data Loading**: Fetches products from JSON file
- **DOM Manipulation**: Creates product cards dynamically
- **Event Handling**: Click events for cart operations
- **State Management**: Manages cart state in memory

### JSON Data Structure

What about JSON Data?

Well JSON, which stands for JavaScript Object Notation, is a way to organize and store data in a text format. It's like a structured list of information, where each piece of information has a name (key) and a corresponding value. JSON is commonly used to exchange data between a server and a web application, making it easy for different parts of a system to understand and use the same information. 
\`\`\`json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "image": "image-url",
      "category": "Category",
      "stock": 10,
      "featured": true
    }
  ]
}
\`\`\`

## 🛠️ CRUD Operations

### Create (Add Product)
\`\`\`javascript
function addProduct(newProduct) {
    products.push(newProduct);
    displayProducts();
}
\`\`\`

### Read (Display Products)
\`\`\`javascript
function displayProducts() {
    // Renders all products to the DOM
}
\`\`\`

### Update (Modify Product)
\`\`\`javascript
function updateProduct(id, updatedData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        displayProducts();
    }
}
\`\`\`

### Delete (Remove Product)
\`\`\`javascript
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    displayProducts();
}
\`\`\`

## 📚 Key Concepts Explained

### 1. Event Listeners
\`\`\`javascript
document.addEventListener('DOMContentLoaded', function() {
    // Code runs when page is fully loaded
});
\`\`\`

### 2. Async/Await for Data Loading
\`\`\`javascript
async function loadProducts() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        // Handle data
    } catch (error) {
        // Handle errors
    }
}
\`\`\`

### 3. Array Methods
\`\`\`javascript
// Find a product
const product = products.find(p => p.id === productId);

// Filter products
const filteredProducts = products.filter(p => p.category === 'Electronics');

// Calculate total
const total = cart.reduce((sum, item) => sum + item.price, 0);
\`\`\`

## 🎨 Customization Ideas
1. **Add Categories**: Filter products by category
2. **Search Function**: Search products by name
3. **User Reviews**: Add rating system
4. **Wishlist**: Save favorite products
5. **Product Images**: Add image carousel
6. **Checkout Form**: Add customer information form

## 🐛 Common Issues & Solutions

### Products Not Loading
- Check if \`data.json\` file exists
- Verify JSON syntax is correct
- Check browser console for errors

### Styling Issues
- Ensure CSS file is linked correctly
- Check for typos in class names
- Verify CSS syntax

### JavaScript Errors
- Open browser developer tools
- Check console for error messages
- Verify function names and syntax

## 📖 Next Steps
1. Add form validation
2. Implement local storage for cart persistence
3. Add more interactive features
4. Connect to a real database
5. Add user authentication

Good luck everyone!
From EPITECH Barcelona team :)
\`\`\`
