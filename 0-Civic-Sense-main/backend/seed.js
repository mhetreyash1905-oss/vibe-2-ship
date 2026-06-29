// Seed Script: Creates 5 Citizen accounts and 2 Admin accounts
// Run with: node seed.js

import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']); // Bypass local ISP DNS blocking SRV records

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/civic_sense';

const seedUsers = [
    // ---- ADMIN ACCOUNTS ----
    {
        fullname: 'Admin Yash',
        username: 'admin_yash',
        email: 'admin1@civicsense.com',
        password: 'Admin@123',
        role: 'admin',
        trustScore: 100,
        heroPoints: 0,
        badges: ['Platform Admin'],
        fakeReportsCount: 0,
        isBlocked: false,
        notifications: []
    },

    // ---- CITIZEN ACCOUNTS ----
    {
        fullname: 'Rahul Sharma',
        username: 'rahul_s',
        email: 'rahul@test.com',
        password: 'Citizen@123',
        role: 'citizen',
        trustScore: 50,
        heroPoints: 0,
        badges: [],
        fakeReportsCount: 0,
        isBlocked: false,
        notifications: []
    },
    {
        fullname: 'Sneha Patil',
        username: 'sneha_p',
        email: 'sneha@test.com',
        password: 'Citizen@123',
        role: 'citizen',
        trustScore: 50,
        heroPoints: 0,
        badges: [],
        fakeReportsCount: 0,
        isBlocked: false,
        notifications: []
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB for seeding');

        // Clear existing users (optional, remove if you want to keep existing data)
        await User.deleteMany({});
        console.log('🗑️  Cleared existing users');

        // Insert seed users
        await User.insertMany(seedUsers);
        console.log('✅ Seeded 3 accounts (1 Admin + 2 Citizens)');

        console.log('\n========================================');
        console.log('  ADMIN ACCOUNTS');
        console.log('========================================');
        console.log('  Email: admin1@civicsense.com');
        console.log('  Password: Admin@123');
        console.log('========================================');
        console.log('  CITIZEN ACCOUNTS');
        console.log('========================================');
        console.log('  Email: rahul@test.com     | Pass: Citizen@123');
        console.log('  Email: sneha@test.com     | Pass: Citizen@123');
        console.log('========================================\n');

    } catch (err) {
        console.error('❌ Seeding error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit(0);
    }
}

seed();
