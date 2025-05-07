import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student", // MUST match backend enum (lowercase)
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/auth/login", form);
      const { token, user } = response.data;

      // Save token and user in localStorage or context
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login successful:", user);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "coordinator") {
        navigate("/coordinator-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Login to Your Account</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          {error && (
            <div className="text-red-500 font-medium text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="coordinator">Coordinator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
