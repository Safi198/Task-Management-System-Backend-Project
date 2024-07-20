const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../config/winston");

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            logger.info(`User authenticated: ${req.user.email}`);
            next();
        } catch (error) {
            logger.error(`Authentication error: ${error.message}`);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        logger.warn("No token provided");
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = authMiddleware;
