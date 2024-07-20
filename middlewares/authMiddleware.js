const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../config/winston");

const authMiddleware = async (req, res, next) => {
    let token;

    if (
        (req,
        headers.authorization && req.headers.authorization.startsWith("Bearer"))
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            logger.info(`User authenticated: ${req.user.email}`);
            next();
        } catch (error) {
            logger.error(`Authentication error: ${error.message}`);
            res.json({ message: "Not authorized, token failed" }).status(401);
        }
    }

    if (!token) {
        logger.warn("No token provided");
        res.json({ message: "Not authorized, no token" }).status(401);
    }
};

module.exports = authMiddleware;
