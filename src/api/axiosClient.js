import axios from "axios";

const axiosClient = axios.create({
 baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8082/api",
  headers: { "Content-Type": "application/json" }, 
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log('JWT Token:', token); // Log token for debugging
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosClient;


