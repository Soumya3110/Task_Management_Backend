const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true, 
    },
    status: {
        type: String,
        enum: ["backlog", "to-do", "in-progress", "done"], 
        default: "pending", 
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"], 
        default: "medium", 
    },
    dueDate: {
        type: Date, 
    },
    assignedTo: [{
        type: Schema.Types.ObjectId, 
        ref: "User", 
    }],
    checklist: [{
        item: {
            type: String, 
            required: true
        },
        completed: {
            type: Boolean, 
            default: false
        }
    }],
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now, 
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
