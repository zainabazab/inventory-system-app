// C:\Users\LENOVO\inventory-system\server\routes\productRoutes.js

const express = require('express');
const { 
    getProducts, 
    getProduct, 
    addProduct, 
    updateProduct,
    updateStock, // New dedicated stock update route
    deleteProduct 
} = require('../controllers/productController');

// Import the middleware to protect these routes
const { protect } = require('../middleware/auth'); 

const router = express.Router();

// Apply the 'protect' middleware to ALL routes defined below
router.use(protect);

// Basic CRUD Routes
router.route('/')
    .get(getProducts) // View products
    .post(addProduct); // Add product

router.route('/:id')
    .get(getProduct) // View single product
    .put(updateProduct) // Update product details
    .delete(deleteProduct); // Delete product

// Dedicated route for stock updates (implements business logic)
router.patch('/stock/:id', updateStock);

module.exports = router;