// C:\Users\LENOVO\inventory-system\server\models\Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {
        // Link product to the user who created it
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        trim: true,
        maxlength: [30, 'SKU cannot be more than 30 characters']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        default: 0,
        min: [0, 'Quantity cannot be negative'] // Client-side logic for the Stock Guard
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be non-negative']
    },
    category: {
        type: String,
        required: false, // Optional, but useful for filtering
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);