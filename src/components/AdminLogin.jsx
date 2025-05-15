import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace these with your actual credentials
    const correctUsername = "admin";
    const correctPassword = "azurii123";

    if (username === correctUsername && password === correctPassword) {
      // Store authentication in localStorage
      localStorage.setItem("isAdminLoggedIn", "true");
      // Redirect to admin panel (use the correct path from your routes)
      navigate("/admin-panel");  // Changed from "/admin" to match your protected route
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-start pt-12 justify-center bg-gray-900 sm:items-center">
      <form onSubmit={handleLogin} className="bg-blue-900 p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-900 text-red-150 rounded">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;