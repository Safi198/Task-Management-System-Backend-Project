const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        deadline: { type: Date },
        dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
        comments: [
            {
                user: String,
                text: String,
                date: { type: Date, default: Date.now },
            },
        ],
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
            type: String,
            enum: ["pending", "in_progress", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
