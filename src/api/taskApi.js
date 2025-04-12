import axiosClient from "./axiosClient";

// Fetch all tasks
export const getAllTasks = async () => {
  const response = await axiosClient.get("/tasks");
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axiosClient.post("/tasks", taskData);
  return response.data;
};


export const updateTask = async (taskId, taskData) => {
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
}