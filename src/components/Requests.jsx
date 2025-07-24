import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Review Request Error !!" , err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error("Fetch request error:", err.res?.data || err.message || err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length == 0)
    return <h1 className="my-20 text-3xl font-extrabold text-center text-gray-300">No Requests Found</h1>;
  return (
    <div className="flex flex-col items-center my-20 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-300">
        Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-32 h-32 object-cover rounded-full border-4 border-secondary shadow mb-4"
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

              <div className="mt-4 flex gap-4">
                <button className="px-4 py-2 text-sm font-semibold bg-green-500 text-white rounded-full hover:bg-green-600"
                onClick={() => reviewRequest("accepted" , request._id)}>
                  Accept
                </button>
                <button className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => reviewRequest("rejected" , request._id)}>
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
