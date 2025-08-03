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
    <div className="min-h-screen my-10 flex items-center justify-center bg-gradient-to-tr from-base-200 to-base-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-base-100 shadow-xl rounded-xl border border-base-300 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-neutral-content mb-6">
          Create an Account 👋
        </h2>

        <div className="space-y-5">
          {/* FirstName Input */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 dark:text-gray-300 font-medium">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="input input-bordered w-full rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {/* LastName Input */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 dark:text-gray-300 font-medium">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="input input-bordered w-full rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 dark:text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 dark:text-gray-300 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Signup Button */}
          <button
            className="btn btn-primary w-full rounded-md shadow-sm hover:scale-[1.02] transition-transform"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          {/* Footer Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
