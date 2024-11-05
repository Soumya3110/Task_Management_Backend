const express = require('express');
const router = express.Router();
const { Task } = require('../schema/task.schema');  // Assuming Task schema is defined similarly
const authMiddleware = require("../middleware/auth"); // For authentication
const { z } = require('zod');  // If you're using Zod for validation
const { validateRequest } = require('zod-express-middleware');

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, status, priority, dueDate, assignedTo, tags, checklist } = req.body;
        const { user } = req;
        
        const newTask = new Task({
            title,
            status,
            priority,
            dueDate,
            assignedTo,
            tags: tags?.split(",").map(tag => tag.trim()),  // Split and trim tags
            checklist,
            creator: user._id  // Assuming the user is added by authMiddleware
        });

        await newTask.save();
        res.status(200).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Task not created", error: error.message });
    }
});

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');  // Populating assignedTo with user details
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to fetch tasks", error: error.message });
    }
});

// Get a single task by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id).populate('assignedTo', 'name email');  // Fetch with assignedTo details
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to fetch task", error: error.message });
    }
});

// Update a task by ID
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, priority, dueDate, assignedTo, tags, checklist } = req.body;

        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the logged-in user is the creator of the task
        if (task.creator.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to update this task" });
        }

        // Update task fields
        task = await Task.findByIdAndUpdate(id, {
            title,
            status,
            priority,
            dueDate,
            assignedTo,
            tags: tags?.split(",").map(tag => tag.trim()),
            checklist
        }, { new: true });

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Task not updated", error: error.message });
    }
});

// Delete a task by ID
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the logged-in user is the creator of the task
        if (task.creator.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to delete this task" });
        }

        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Task not deleted", error: error.message });
    }
});

module.exports = router;
