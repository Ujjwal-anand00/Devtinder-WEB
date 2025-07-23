import React from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useState } from "react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName );
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [age, setAge] = useState(user?.age);
  const [skills, setSkills] = useState(user?.skills);
  const [gender, setGender] = useState(user?.gender);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, skills , about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      console.error(setError(error.response?.data || "Profile update failed"));
    }
  };
  return (
    <>
      <div className="flex items-center min-h-screen bg-base-200">
        <div className="my-15 mx-15  bg-base-200 flex items-start justify-center p-6">
          <div className="bg-base-100 border border-base-300 rounded-box p-10 max-w-3xl w-full shadow-lg overflow-y-auto">
            <legend className="text-3xl font-bold text-center mb-8 text-neutral-content">
              Edit Profile
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Profile Picture"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Age</label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Gender</label>
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
              <label className="label">Skills</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

              <div className="md:col-span-2">
                <label className="label">About</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button className="btn btn-neutral mt-4" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, skills , about }}
        />
      </div>
    </>
  );
};

export default EditProfile;
