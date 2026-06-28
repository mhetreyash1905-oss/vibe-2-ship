const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String }, // empty for Google auth
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
    
    // Gamification & Trust Metrics
    trustScore: { type: Number, default: 50 }, // 0 to 100
    heroPoints: { type: Number, default: 0 },
    badges: [{ type: String }],
    
    // Scrutiny & Moderation
    fakeReportsCount: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    notifications: [{
        message: String,
        read: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    }],
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
