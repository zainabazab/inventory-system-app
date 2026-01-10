// C:\Users\LENOVO\inventory-system\server\models\User.js (UPDATED)

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Package for hashing
const jwt = require('jsonwebtoken'); // Package for JWT

const UserSchema = new mongoose.Schema({
    // ... (Fields remain the same: username, email, password, createdAt)
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true,
        maxlength: [50, 'Username cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- SCHEMA METHODS & MIDDLEWARE ---

// 1. Encrypt password using bcrypt before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// 2. Sign JWT and return (Instance method for user object)
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d' // Token expiration time
    });
};

// 3. Match user entered password to hashed password in database (Instance method)
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);