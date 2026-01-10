// C:\Users\LENOVO\inventory-system\server\index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require("cors");

// Load environment variables from .env file
dotenv.config();



const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
// --- Middleware ---
app.use(express.json()); // Allows the server to accept JSON data

// --- Database Connection (MongoDB with Mongoose) ---
const DB_URI = process.env.DATABASE_URL;

mongoose.connect(DB_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        // Exit process on failure
        process.exit(1); 
    });

// --- Routes ---
app.get('/', (req, res) => {
    res.send('Inventory System Backend is running!');
});

// Import and use Auth Routes (to be created)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Import and use Product Routes (to be created)
 const productRoutes = require('./routes/productRoutes');
 app.use('/api/products', productRoutes);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`Access at http://localhost:${PORT}`);
});