import { login } from "@/api/authAPI";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials); 
      localStorage.setItem("token", data.token);  // Store the JWT token
      localStorage.setItem("user", JSON.stringify({
        id: data.id,
        username: data.username,
        roles: data.roles
      }));
  
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid username or password");
    }

  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input name="username" placeholder="Username" value={credentials.username} onChange={handleChange} className="block w-full mb-3 p-2 border rounded" />
      <input name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="block w-full mb-3 p-2 border rounded" />
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      <p className="text-sm mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
        </Link>
        </p>
    </form>

  );
};

export default LoginPage;
