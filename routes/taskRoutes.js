const express = require("express");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addComment,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const rbacMiddleware = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", rbacMiddleware(["create_task"]), createTask);
router.get("/", rbacMiddleware(["read_task"]), getTasks);
router.get("/:id", rbacMiddleware(["read_task"]), getTaskById);
router.put("/:id", rbacMiddleware(["update_task"]), updateTask);
router.delete("/:id", rbacMiddleware(["delete_task"]), deleteTask);
router.post("/:id/comments", rbacMiddleware(["create_comment"]), addComment);

module.exports = router;
