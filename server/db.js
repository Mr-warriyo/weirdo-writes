// REQUIRED MODULES
const db = require("mongoose");

const connectDB = async(url) => {
    db.connect(url);
    console.log("MongoDB Connected!");
};

module.exports = { connectDB };