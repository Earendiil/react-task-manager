import axiosClient from "./axiosClient";

export const fetchUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosClient.post("/user", userData); 
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserTasks = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}/tasks`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Centralized error handling function
const handleApiError = (error) => {
  console.error("API call failed: ", error);
  // Implement your error handling logic here (e.g., show a notification, log the error, etc.)
  throw error; // Re-throw the error if you want to propagate it further
};