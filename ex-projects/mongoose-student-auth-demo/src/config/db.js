// ===================================================================
// Step 1: Import the Mongoose library
// Mongoose is an ODM (Object Data Modeling) library for MongoDB & Node.js.
// ===================================================================
const mongoose = require("mongoose");

/**
 * connectDB - Asynchronous function to connect our Node.js app to MongoDB
 * 
 * 1. process.env.MONGODB_URI: Reads connection string from the .env file.
 * 2. mongoose.connect(): Establishes the connection asynchronously.
 * 3. try...catch: Catches errors if MongoDB is offline or URI is incorrect.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using URI from environment variable
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    // If connection fails (e.g. MongoDB service not started), log error and stop server
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure code 1
  }
};

// Export the function so src/server.js can invoke it
module.exports = connectDB;
