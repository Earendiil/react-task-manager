import axiosClient from "./axiosClient";

// Utility for validation
const validateTaskData = (taskData) => {
  const errors = {};

  if (!taskData.taskName || taskData.taskName.trim() === "") {
    errors.taskName = "Task name is required.";
  }

  if (taskData.dueDate && isNaN(new Date(taskData.dueDate).getTime())) {
    errors.dueDate = "Invalid date format.";
  }

  if (Object.keys(errors).length > 0) {
    const error = new Error("Validation failed");
    error.validationErrors = errors;
    throw error;
  }
};

export const getAllTasks = async () => {
  const response = await axiosClient.get("/tasks");
  return response.data;
};

export const createTask = async (taskData) => {
  validateTaskData(taskData); // Validate before sending
  const response = await axiosClient.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  validateTaskData(taskData); // Validate before sending
  const response = await axiosClient.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const getTaskUsers = async (taskId, taskData) => {
  const response = await axiosClient.put(`/${taskId}/users`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axiosClient.delete(`/tasks/${taskId}`);
  return response.data;
};

export const idleTasks = async () => {
  const response = await axiosClient.delete("/tasks/idle");
  return response.data;
};

export const assignTask = async (taskId, userId) => {
  const response = await axiosClient.post(`/tasks/${taskId}/${userId}`);
  return response.data;
};

