import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

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
  if (connections.length == 0)
    return <h1 className="my-20 text-3xl font-extrabold text-center mb-10 text-gray-300">No Connection Found</h1>;
  return (
    <div className="flex flex-col items-center my-20 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-300">
        Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-32 h-32 object-cover rounded-full border-4 border-primary shadow-md mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-800">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm text-gray-500 uppercase font-medium mt-1">
                  {age} • {gender}
                </p>
              )}

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">{about}</p>
              <div className="mt-4">
                <Link to={"/chat/" + _id}>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Chat💬
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
