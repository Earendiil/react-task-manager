import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", 
  headers: { "Content-Type": "application/json" }, // Add headers
});
// Optional: Add interceptors for request/response handling
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before the request is sent (e.g., add authorization token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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


