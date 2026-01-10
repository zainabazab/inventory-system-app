// C:\Users\LENOVO\inventory-system\server\routes\authRoutes.js

const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

/**
 * Helper function to send JWT token in the response
 */
const sendTokenResponse = (user, statusCode, res) => {
    // Create token using the method defined in the User model
    const token = user.getSignedJwtToken();

    // In a real app, you might use an HttpOnly cookie. For simplicity
    // and frontend ease, we will send the token directly in the JSON response.
    res.status(statusCode).json({
        success: true,
        token: token
    });
};


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create the user (pre-save hook hashes the password)
        const user = await User.create({
            username,
            email,
            password
        });

        sendTokenResponse(user, 201, res);

    } catch (error) {
        // Handle common errors like duplicate key (email/username)
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'User with this email or username already exists.' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
});


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // 2. Check for user (select: true ensures password field is retrieved)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 3. Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 4. Send token if successful
    sendTokenResponse(user, 200, res);
});


module.exports = router;