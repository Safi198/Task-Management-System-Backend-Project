const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./winston"); // Replace with your logger module or implementation

dotenv.config();

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            logger.info("MongoDB connected");
        })
        .catch((err) => {
            logger.error(`MongoDB connection error: ${err.message}`);
            process.exit(1);
        });
};

module.exports = connectDB;
