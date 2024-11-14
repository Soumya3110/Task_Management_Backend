import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getTaskDetailsById = async (taskId) => {
    try {
        const reqUrl = `${backendUrl}/tasks/${taskId}`; // Endpoint to get task details
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log("Error fetching task details:", error);
        // Handle error accordingly
    }
};

export const createTask = async (taskPayload) => {
    try {
        const reqUrl = `${backendUrl}/tasks/create`; // Endpoint to create a new task
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(reqUrl, taskPayload);
        return response.data;
    } catch (error) {
        console.log("Error creating task:", error);
        // Handle error accordingly
    }
};

export const updateTaskById = async (taskId, updatedTaskData) => {
    try {
        const reqUrl = `${backendUrl}/tasks/edit/${taskId}`; // Endpoint to update task
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(reqUrl, updatedTaskData);
        return response.data;
    } catch (error) {
        console.log("Error updating task:", error);
        // Handle error accordingly
    }
};

export const getAllTasks = async (filter) => {
    try {
        const reqUrl = `${backendUrl}/tasks/all?title=${filter?.title}&status=${filter?.status}`; // Endpoint to get all tasks
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log("Error fetching tasks:", error);
        // Handle error accordingly
    }
};
