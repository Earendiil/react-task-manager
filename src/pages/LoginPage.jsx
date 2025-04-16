import { login } from "@/api/authAPI";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      localStorage.setItem("token", data.token); // or data.jwtToken
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input name="username" placeholder="Username" value={credentials.username} onChange={handleChange} className="block w-full mb-3 p-2 border rounded" />
      <input name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="block w-full mb-3 p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      <p className="text-sm mt-4 text-center">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
        </a>
        </p>
    </form>

  );
};

export default LoginPage;
