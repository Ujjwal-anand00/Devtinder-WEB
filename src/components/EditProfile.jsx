import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useState } from "react";
import { split } from "postcss/lib/list";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [gender, setGender] = useState(user?.gender);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, about, age, gender, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      const errorMessage = error.res?.data?.message || "Profile update failed";
      setError(errorMessage);
      console.error(error); // Log the full error object for debugging
    }
  };
  return (
    <div className="flex items-center gap-10 min-h-screen mx-15 bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="bg-gradient-to-r from-slate-500 to-slate-600 border border-base-300 w-180 h-150 my-20 rounded-box p-10 shadow-lg overflow-y-auto">
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
      <UserCard
        user={{ firstName, lastName, photoUrl, about, age, skills, gender }}
      />
    </div>
  );
};

export default EditProfile;
