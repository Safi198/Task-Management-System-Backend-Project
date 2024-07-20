const express = require("express");
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const rbacMiddleware = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", rbacMiddleware(["read_user"]), getUsers);
router.get("/:id", rbacMiddleware(["read_user"]), getUserById);
router.put("/:id", rbacMiddleware(["update_user"]), updateUser);
router.delete("/:id", rbacMiddleware(["delete_user"]), deleteUser);

module.exports = router;
