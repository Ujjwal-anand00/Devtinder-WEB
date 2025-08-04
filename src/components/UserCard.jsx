import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const getSkillsArray = (rawSkills) => {
  // Case 1: It's already a valid array
  if (Array.isArray(rawSkills)) {
    return rawSkills;
  }
  // Case 2: It's a string, so we split it into an array
  if (typeof rawSkills === "string" && rawSkills.trim().length > 0) {
    return rawSkills.split(",").map((skill) => skill.trim());
  }
  // Case 3: It's null, undefined, or something else. Return an empty array.
  return [];
};

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const skills = getSkillsArray(user.skills);
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
    <div className="card w-full max-w-2xl mx-auto my-6 bg-gray-800 border border-gray-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col md:flex-row">
      {/* Image Section - Adjusted proportions */}
      <figure className="md:w-2/5 w-full h-56 md:h-auto overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-70 h-70 object-cover object-center"
        />
      </figure>

      {/* Content Section - Adjusted padding, gaps, and text size */}
      <div className="card-body w-full md:w-3/5 text-center px-4 py-4 flex flex-col justify-center gap-y-2">
        {/* Name - Smaller font size */}
        <h2 className="text-lg md:text-xl font-bold text-white">
          {`${firstName} ${lastName}`}
        </h2>

        {/* Age & Gender */}
        <div className="">
          {age && gender && (
            <p className="text-sm text-gray-400">{`${age} yrs • ${gender}`}</p>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2 py-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-full bg-blue-500 text-white font-semibold shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* About */}
        <p className="text-sm text-gray-300 line-clamp-3 px-2">{about}</p>

        {/* Buttons - Smaller size */}
        <div className="flex justify-center gap-4 mt-3">
          <button
            type="button"
            className="btn bg-red-500 hover:bg-red-600 text-white text-xl shadow-lg transform hover:scale-110 transition-all duration-200"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore❌
          </button>
          <button
            type="button"
            className="btn bg-green-500 hover:bg-green-600 text-white text-xl shadow-lg transform hover:scale-110 transition-all duration-200"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested💖
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
