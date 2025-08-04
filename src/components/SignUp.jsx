import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="relative min-h-screen my-10">
      {/* 1. The Blurred Background Layer */}
      <div className="absolute inset-0 bg-[url('/code.jpg')] bg-cover bg-center filter blur-xs"></div>

      {/* 2. The Content Layer (with a dark overlay for readability) */}
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-opacity-25 px-4 py-10">
        <div className="w-full max-w-md bg-white dark:bg-base-100 shadow-2xl rounded-2xl border border-gray-200 dark:border-base-300 p-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-neutral-content mb-8">
            Create an Account 👋
          </h2>

          <div className="space-y-6">
            {/* FirstName Input */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                First Name
              </label>
              <input
                type="text"
                placeholder="Your first name"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* LastName Input */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Your last name"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Signup Button */}
            <button
              className="btn btn-primary w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={handleSignUp}
            >
              Sign Up
            </button>

            {/* Footer Link */}
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-5">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-semibold"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
