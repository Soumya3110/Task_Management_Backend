import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const loginUser = async (email, password) => {
    try {
        const reqUrl = `${backendUrl}/auth/login`;
        const response = await axios.post(reqUrl, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        if (error.response && error.response.data) {
            // Log server error if available
            console.error(error.response.data.message || "Login failed. Please try again.");
        } else {
            // Fallback error message
            console.error("Something went wrong. Please try again later.");
        }
        throw error; // Re-throw the error if you want to handle it further
    }
};

export const registerUser = async ({ email, password, name }) => {
    try {
        const reqUrl = `${backendUrl}/auth/register`;
        const response = await axios.post(reqUrl, { email, password, name });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        if (error.response && error.response.data) {
            // Log server error if available
            console.error(error.response.data.message || "Registration failed. Please try again.");
        } else {
            // Fallback error message
            console.error("Something went wrong. Please try again later.");
        }
        throw error; // Re-throw the error if you want to handle it further
    }
};
