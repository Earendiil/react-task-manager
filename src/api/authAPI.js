import axiosClient from "./axiosClient";

// Sign in user
export const login = async (credentials) => {
  try {
    const response = await axiosClient.post("/auth/signin", credentials);
    return response.data; // contains id, username, roles, token
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const register = async (signupData) => {
  try {
    const response = await axiosClient.post("/auth/signup", signupData);
    const data = response.data;

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data; 
  } catch (error) {
    throw error.response?.data || error;
  }
};

