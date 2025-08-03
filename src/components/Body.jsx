import axios from "axios";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";
import { Outlet , useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant.js";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchUser = async() => {
    if(userData) return;
    try{
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.response && error.response.status === 401){
        navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(()=>{
      fetchUser();
  },[]);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-900 to-slate-700">
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Body;
