import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { userData, setUserData, getUserData, token, backendUrl } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false); // NEW
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (userData) {
      setFormState({
        name: userData.name || "",
        email: userData.email || "",
        gender: userData.gender || "",
        dob: userData.dob?.substring(0, 10) || "",
        addressLine1: userData.address?.line1 || "",
        addressLine2: userData.address?.line2 || "",
        profilePic: userData.image || "",
      });
      // console.log(userData);
    }
  }, [userData, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
      }));
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    if (
      !formState.name ||
      !formState.gender ||
      !formState.dob ||
      !formState.addressLine1
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setSaving(true); // show "Saving..."

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("dob", formState.dob);
    formData.append("gender", formState.gender);
    formData.append(
      "address",
      JSON.stringify({
        line1: formState.addressLine1,
        line2: formState.addressLine2,
      })
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        // console.log("Success");
        await getUserData();
        setIsEditing(false);
        setImageFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (!formState)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-600 font-medium">Loading Profile...</p>
      </div>
    );

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
                src={formState.profilePic}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              )}
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-800">
              {formState.name}
            </h2>
            <p className="text-gray-500">{formState.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
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
              value={formState.email}
              disabled
              className="w-full mt-1 border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={formState.gender}
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
              value={formState.dob}
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
              value={formState.addressLine1}
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
              value={formState.addressLine2}
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
                onClick={() => {
                  setIsEditing(false);
                  setFormState({
                    name: userData.name || "",
                    email: userData.email || "",
                    gender: userData.gender || "",
                    dob: userData.dob?.substring(0, 10) || "",
                    addressLine1: userData.address?.line1 || "",
                    addressLine2: userData.address?.line2 || "",
                    profilePic: userData.image || "",
                  });
                  setImageFile(null);
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
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
