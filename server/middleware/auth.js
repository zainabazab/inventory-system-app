// C:\Users\LENOVO\inventory-system\server\middleware\auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token;

    // Check for token in headers (Bearer token)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Example: 'Bearer <token>'
        token = req.headers.authorization.split(' ')[1];
    } 
    // You could also check for token in cookies here if using cookies

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route (No Token)' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user object (excluding the password) to the request
        req.user = await User.findById(decoded.id);

        next();

    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(401).json({ success: false, error: 'Not authorized to access this route (Invalid Token)' });
    }
};