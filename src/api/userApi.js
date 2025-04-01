
import axiosClient from "./axiosClient";

export const fetchUsers = async () => {
  const response = await axiosClient.get("/users");
  return response.data;
};


export const fetchUserById = async (userId) => {
    const response = await axiosClient.get(`/users/${userId}`);
    return response.data;
  };

  export const createUser = async (userData) => {
    const response = await axiosClient.post("/user", userData);
    return response.data;
  };
  
  
  export const updateUser = async (userId, userData) => {
    const response = await axiosClient.put(`/users/${userId}`, userData);
    return response.data;
  };
  
 
  export const deleteUser = async (userId) => {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response.data;
  };

  export const getUserTasks = async (userId) => {
    const response = await axiosClient.get(`/users/${userId}/tasks`);
    return response.data;
  };