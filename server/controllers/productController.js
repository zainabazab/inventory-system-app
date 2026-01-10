// C:\Users\LENOVO\inventory-system\server\controllers\productController.js

const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse'); // Custom error utility (not implemented, but good practice)

// @desc    Get all products (supports filtering/sorting)
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res, next) => {
    try {
        // Find products owned by the authenticated user
        const products = await Product.find({ user: req.user.id })
            .sort({ createdAt: -1 }); // Sort by creation date by default

        // Implement Sorting/Filtering logic here (Step 6):
        // You would parse req.query and apply .sort() and .find() modifiers
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        next(err); // Pass error to Express error handler
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product || product.user.toString() !== req.user.id) {
            // Return 404 if product not found OR if it belongs to another user
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Private
exports.addProduct = async (req, res, next) => {
    try {
        // Attach the authenticated user's ID to the product data
        req.body.user = req.user.id;

        // Input validation is handled automatically by Mongoose schema 'required' fields
        const product = await Product.create(req.body);

        res.status(201).json({ success: true, data: product });
    } catch (err) {
        // Mongoose validation errors result in status 400
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update product details
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product || product.user.toString() !== req.user.id) {
             return res.status(404).json({ success: false, error: 'Product not found' });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose schema validation on update
        });

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


// @desc    PATCH - Update ONLY the stock quantity (Crucial Business Logic)
// @route   PATCH /api/products/stock/:id
// @access  Private
exports.updateStock = async (req, res, next) => {
    const newQuantity = req.body.quantity;

    try {
        if (newQuantity === undefined) {
             return res.status(400).json({ success: false, error: 'Please provide the quantity field for update.' });
        }

        // --- STEP 6: BUSINESS LOGIC - Prevent Negative Stock ---
        if (newQuantity < 0) {
            return res.status(400).json({ success: false, error: 'Stock level cannot be negative.' });
        }
        // --------------------------------------------------------

        let product = await Product.findById(req.params.id);

        if (!product || product.user.toString() !== req.user.id) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        
        // Update only the quantity field
        product.quantity = newQuantity;
        await product.save();

        res.status(200).json({ success: true, data: product });
        
    } catch (err) {
        next(err);
    }
};


// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product || product.user.toString() !== req.user.id) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        await Product.deleteOne({ _id: req.params.id });

        // HTTP 204 No Content is standard for successful deletion
        res.status(204).json({ success: true, data: {} }); 
    } catch (err) {
        next(err);
    }
};