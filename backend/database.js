const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DATABASE_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to database');
    }
    catch (error) {
        console.error('❌ Mongoose connection error: ', error.message);
        process.exit(1);
    }
}

module.exports = { connectDB }