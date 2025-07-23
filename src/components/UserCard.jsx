import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, skills , about } = user;
    // const safeSkills = skills ? skills.split(",").map(skill => skill.trim()) : [];
  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300 rounded-xl overflow-hidden mx-auto my-10">
      <figure className="bg-gradient-to-tr from-pink-200 to-blue-200 p-4">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-80 h-80 object-cover border-4 border-white shadow-md"
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
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Skills:
            </span>
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-outline badge-sm px-2 py-1 text-xs text-primary border-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-neutral-content mb-4">{about}</p>

        <div className="card-actions justify-evenly mt-4">
          <button className="btn btn-outline btn-error hover:scale-105 transition-transform">
            ❌ Ignore
          </button>
          <button className="btn btn-primary hover:scale-105 transition-transform">
            💖 Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
