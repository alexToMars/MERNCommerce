const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.USER_DB;
const DB_KEY = process.env.PASS_DB;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_KEY}@cluster0.yrbfebx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;