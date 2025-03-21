import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  // environment variables from .env file

// Connecting to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connecting using the URI
        console.log("MongoDB Connected"); // Success message
    } catch (error) {
        console.error("MongoDB Connection Error:", error); // Logs error
        process.exit(1);
    }
};

export default connectDB;
