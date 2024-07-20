const roles = require("../config/roles");
const logger = require("../config/winston");

const rbacMiddleware = (requiredPermissions) => (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = roles[userRole]?.can;

    if (!userPermissions) {
        logger.warn(`Role does not exist: ${userRole}`);
        return res
            .json({ message: "Forbidden: Role does not exist" })
            .status(403);
    }

    const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
    );

    if (hasPermission) {
        next();
    } else {
        logger.warn(`Access denied for role: ${userRole}`);
        res.json({ message: "Forbidden: Access is denied" }).status(403);
    }
};

module.exports = rbacMiddleware;
