
import {useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant.js";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle form submission
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId : email,
                password : password
            },
            { withCredentials: true }, 
        );
        dispatch(addUser(res.data));
        return navigate("/");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
        };

    };
    
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title text-2xl">Log in</h2>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs my-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs my-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary m-2" onClick={handleLogin}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
