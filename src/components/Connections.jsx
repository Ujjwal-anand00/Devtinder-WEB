import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Connections Fails");
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length == 0) return <h1>No Connection Found</h1>;
  return (
    <div className="text-center justify-center my-20">
      <h1 className="text-2xl font-extrabold">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
            <div className="w-80% m-auto flex justify-center align-center">
          <ul className="list bg-base-100 rounded-box shadow-md ">
            <li className="list-row">
              <div>
                <img className="size-30 rounded-box" src={photoUrl} />
              </div>
              <div className="text-xl font-stretch-50% font-bold">
                <div>{firstName + " " + lastName}</div>
                {age && gender && (
                  <div className="text-s uppercase font-semibold opacity-60">
                    {age + " " + gender}
                  </div>
                )}
              </div>
              <p className="list-col-wrap text-xs">{about}</p>
            </li>
            <hr className=""/>
          </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
