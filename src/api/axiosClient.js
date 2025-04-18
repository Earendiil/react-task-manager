import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", 
  headers: { "Content-Type": "application/json" }, // Add headers
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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


