import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import axiosInstance from "../config/apiConfig";
import NavBar from "./NavBar";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loginError, setLoginError] = useState({ message: "", flag: false });

  const navigate = useNavigate();

  const loginRequest = async (userData) => {
    try {
      const res = await axiosInstance.post("/public/login", userData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setLoginError({ message: "", flag: false });
      navigate("/");
    } catch (error) {
      setLoginError({ message: error.response.data, flag: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      email: email,
      password: password,
    };

    loginRequest(userData);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <NavBar />
      <div className="flex items-center justify-center min-h-svh">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            {loginError.flag && (
              <Message severity="error">{loginError.message}</Message>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                New User?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
