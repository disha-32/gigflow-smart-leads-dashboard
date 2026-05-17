import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }
    try {
      await API.post(
        "/auth/register",
        formData
      );

      alert(
        "Registration successful"
      );

      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2">
            Join GigFlow Dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
          />

          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold p-4 rounded-2xl transition duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;