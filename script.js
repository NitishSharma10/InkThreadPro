const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // To accept JSON data

// Signup API Route
app.post("/api/signup", (req, res) => {
  const { fullName, email, password, phone, accountType, address } = req.body;

  if (!fullName || !email || !password || !phone || !accountType || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("User Data:", req.body);
  res.status(201).json({ message: "User created successfully" });
});

// --- Client-Side Code Below ---

// Toggle Wishlist (unchanged)
function toggleWishlist(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let btn = document.getElementById("wishlistBtn_" + product.id); // Unique button for each product

  let found = cart.some((item) => item.id === product.id);

  if (found) {
    cart = cart.filter((item) => item.id !== product.id);
    btn.innerHTML = "🤍 Wishlist";
    btn.classList.remove("redHeart");
  } else {
    cart.push(product); // Add Full Product Object
    btn.innerHTML = "❤️ Wishlisted";
    btn.classList.add("redHeart");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add a product to the shopping cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let found = cart.find(item => item.id === product.id);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 }); // Use spread operator to avoid mutating the original product
  }
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Wishlist Initialization (unchanged) ---
  let wishlistCart = JSON.parse(localStorage.getItem("cart")) || [];
  let exampleProduct = {
    id: 101,
    name: "Drop Shoulder T-Shirt 1",
    price: "29.99",
    image: "tshirt1.jpg",
  };

  let wishlistBtn = document.getElementById("wishlistBtn_" + exampleProduct.id);
  if (wishlistBtn && wishlistCart.some((item) => item.id === exampleProduct.id)) {
    wishlistBtn.innerHTML = "❤️ Wishlisted";
    wishlistBtn.classList.add("redHeart");
  }

  // Attach an event listener to the .products container
document.querySelector(".products").addEventListener("click", function(event) {
  // Check if the clicked element is a "Buy" button
  if (event.target.classList.contains("buy-button")) {
    const button = event.target;

    // Extract product details from data-* attributes
    const productId = button.getAttribute("data-product-id");
    const productName = button.getAttribute("data-product-name");
    const productPrice = parseFloat(button.getAttribute("data-product-price"));
    const productImage = button.getAttribute("data-product-image") || "default.jpg";

    // Create a product object
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
    };

    // Add the product to the cart (assuming addToCart is defined elsewhere)
    addToCart(product);

    // Redirect to the cart page
    window.location.href = "Cart.html";
  }
});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;