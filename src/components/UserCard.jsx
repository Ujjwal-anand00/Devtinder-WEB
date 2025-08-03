import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills, about } =
    user;
  // const safeSkills = skills ? skills.split(",").map(skill => skill.trim()) : [];
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-100 flex-row w-180 h-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300 rounded-xl overflow-hidden mx-auto my-10">
      <figure className="w-80 ">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-80 h-100 object-cover shadow-md"
        />
      </figure>

      <div className="card-body text-center">
        <h2 className="text-xl font-semibold text-neutral-content mb-1">
          {`${firstName} ${lastName}`}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {`${age} yrs • ${gender}`}
          </p>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2 mb-2">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Skills:
            </span>
            {skills.map((skill, index) => (
              <span
                key={index}
                className=" text-green-700 px-1 py-1 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center me-1 mb-1 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-neutral-content mb-4">{about}</p>

        <div className="card-actions justify-evenly mt-4">
          <button
            className="btn btn-outline btn-error hover:scale-105 transition-transform"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ❌ Ignore
          </button>
          <button className="btn btn-primary hover:scale-105 transition-transform"
          onClick={() => handleSendRequest("interested" , _id)}
          >
            💖 Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
