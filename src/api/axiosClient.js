import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust according to your Spring Boot backend
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
