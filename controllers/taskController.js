const Task = require("../models/Task");
const logger = require("../config/winston");

exports.createTask = async (req, res) => {
    const { title, description, priority, deadline, dependencies, assignedTo } =
        req.body;
    const createdBy = req.user._id;

    try {
        const task = new Task({
            title,
            description,
            priority,
            deadline,
            dependencies,
            assignedTo,
            createdBy,
        });
        await task.save();
        logger.info(`Task created: ${task.title}`);
        res.json(task).status(201);
    } catch (error) {
        logger.error(`Error creating task: ${error.message}`);
        res.json({ message: error.message }).status(400);
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
            .populate("assignedTo")
            .populate("createdBy");
        res.json(tasks).status(201);
    } catch (error) {
        logger.error(`Error fetching tasks: ${error.message}`);
        res.json({ message: error.message }).status(500);
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignedTo")
            .populate("createdBy");
        if (task) {
            res.json(task).status(201);
        } else {
            logger.warn(`Task not found: ${req.params.id}`);
            res.json({ message: "Task not found" }).status(404);
        }
    } catch (error) {
        logger.error(`Error fetching task by ID: ${error.message}`);
        res.json({ message: error.message }).status(500);
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.priority = req.body.priority || task.priority;
            task.deadline = req.body.deadline || task.deadline;
            task.dependencies = req.body.dependencies || task.dependencies;
            task.assignedTo = req.body.assignedTo || task.assignedTo;
            task.status = req.body.status || task.status;

            await task.save();
            logger.info(`Task updated: ${task.title}`);
            res.json({ message: "Task updated successfully" }).status(201);
        } else {
            logger.warn(`Task not found for update: ${req.params.id}`);
            res.json({ message: "Task not found" }).status(404);
        }
    } catch (error) {
        logger.error(`Error updating task: ${error.message}`);
        res.json({ message: error.message }).status(500);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task) {
            logger.info(`Task deleted: ${task.title}`);
            res.json({ message: "Task removed" }).status(201);
        } else {
            logger.warn(`Task not found for deletion: ${req.params.id}`);
            res.json({ message: "Task not found" }).status(404);
        }
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        res.json({ message: error.message }).status(500);
    }
};

exports.addComment = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            const comment = { user: req.user.name, text: req.body.text };
            task.comments.push(comment);
            await task.save();
            logger.info(`Comment added to task: ${task.title}`);
            res.json(task.comments).status(200);
        } else {
            logger.warn(`Task not found for comment: ${req.params.id}`);
            res.json({ message: "Task not found" }).status(404);
        }
    } catch (error) {
        logger.error(`Error adding comment to task: ${error.message}`);
        res.json({ message: error.message }).status(500);
    }
};
