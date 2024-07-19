const User = require("../models/User");
const logger = require("../config/winston");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users).status(200);
    } catch (error) {
        logger.error(`Error fetching users: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user).status(200);
        } else {
            logger.warn(`User not found: ${req.params.id}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        logger.error(`Error fetching user by ID: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

            if (req.body.password) {
                user.password = req.body.password;
            }
            await user.save();
            logger.info(`User updated: ${user.email}`);
            res.json({ message: "User updated successfully" }).status(200);
        } else {
            logger.warn(`User not found for update: ${req.params.id}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        logger.error(`Error updating user: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            logger.info(`User deleted: ${user.email}`);
            res.json({ message: "User removed" });
        } else {
            logger.warn(`User not found for deletion: ${req.params.id}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
