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
