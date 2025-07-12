import React, { useContext, useState } from "react";
import AppContextProvider, { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const UserProfile = () => {
  // const { ProfilePic } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const { token, backendUrl, userData, setUserData, getUserData } =
    useContext(AppContext);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: { token },
        }
      );

      if (data.succes) {
        toast.success(data.message);
        await updateUserProfileData();
        setIsEditing(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleSave = async () => {
    setIsEditing(false);
    await updateUserProfileData();
    console.log(userData);
    // setImage(false);
  };
  return (
    userData && (
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
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full border"
                />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
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
                value={userData.address.line1}
                disabled={!isEditing}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
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
                value={userData.address.line2}
                disabled={!isEditing}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
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
    )
  );
};

export default UserProfile;
