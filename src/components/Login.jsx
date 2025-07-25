import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-base-200 to-base-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-base-100 shadow-xl rounded-xl border border-base-300 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-neutral-content mb-6">
          Welcome Back 👋
        </h2>

        <div className="space-y-5">
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

          {/* Login Button */}
          <button
            className="btn btn-primary w-full rounded-md shadow-sm hover:scale-[1.02] transition-transform"
            onClick={handleLogin}
          >
            Log in
          </button>

          {/* Footer Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
