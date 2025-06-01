import React, { useContext, useState } from "react";
import AppContextProvider, { AppContext } from "../context/AppContext";
const UserProfile = () => {
  const { ProfilePic } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Suraj Aggarwal",
    email: "SurajAggarwal@example.com",
    gender: "Male",
    dob: "15-05-1999",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B, New Delhi, India",
    profilePic: ProfilePic,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved data:", userData);
  };
  return (
    <div className="mt-20 w-full flex justify-center px-4 mb-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <label
              className={`cursor-pointer block ${
                isEditing ? "opacity-90 hover:opacity-80" : ""
              }`}
            >
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setUserData((prev) => ({
                        ...prev,
                        profilePic: imageUrl,
                      }));
                    }
                  }}
                  className="hidden"
                />
              )}
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              {userData.name}
            </h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full mt-1 border rounded px-3 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full mt-1 border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full mt-1 border rounded px-3 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full mt-1 border rounded px-3 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block font-medium">Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={userData.addressLine1}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full mt-1 border rounded px-3 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block font-medium">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={userData.addressLine2}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full mt-1 border rounded px-3 py-2 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={toggleEdit}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={toggleEdit}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
