import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser, removeUser } from "../utils/userSlice.js";
import { BASE_URL } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice.js";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser({})); // Clear user data on logout
      dispatch(removeFeed({}));
      return navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
          DevTinder <span className="text-pink-500 ml-1">❤️‍🔥</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Search input (optional) */}
        {/* <input
      type="text"
      placeholder="Search"
      className="input input-bordered w-32 md:w-48"
    /> */}

        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-3">
              <p className="text-sm md:text-base font-medium text-green-50">
                Welcome, <span className="text-primary">{user?.firstName}</span>
              </p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User Avatar" src={user?.photoUrl} />
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">
                  <span className="text-white"> Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">
                  <span className="text-white"> Connections</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
