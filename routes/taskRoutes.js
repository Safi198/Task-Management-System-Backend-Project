/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - assignedTo
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: The priority of the task
 *         deadline:
 *           type: string
 *           format: date
 *           description: The deadline of the task
 *         dependencies:
 *           type: array
 *           items:
 *             type: string
 *           description: The dependencies of the task
 *         assignedTo:
 *           type: string
 *           description: The user assigned to the task
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: The status of the task
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *           description: The comments on the task
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Returns the list of all the tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Not authorized
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get the task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The task was not found
 *       401:
 *         description: Not authorized
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *       400:
 *         description: Some error occurred
 *       401:
 *         description: Not authorized
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update the task by the id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was updated
 *       404:
 *         description: The task was not found
 *       401:
 *         description: Not authorized
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 *       401:
 *         description: Not authorized
 */

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
