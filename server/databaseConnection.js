require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = async () => {   
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DATABASE_NAME,
        });
        console.log(`Connected to the database.`);
    } catch (error) {
        console.log('Error connecting to the database: ', error);
    }
};

module.exports = connectToDB;