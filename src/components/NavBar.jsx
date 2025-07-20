import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser, removeUser } from "../utils/userSlice.js";
import { BASE_URL } from "../utils/constant.js";
import { useDispatch } from "react-redux";


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
      try{
        const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
        dispatch(removeUser({})); // Clear user data on logout
        return navigate("/login");

      }catch(err){
        console.error("Logout failed:", err.response?.data || err.message);
      };
    };

  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder ❤️‍🔥</Link>
      </div>
      <div className="flex gap-10">
        {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            > 
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">Profile</Link>
              </li>
              <li>
                <Link to="/settings" className="justify-between">Settings</Link>
              </li>
              <li>
                <Link  onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
