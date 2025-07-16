import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DocProfile = () => {
  const {
    dToken,
    docProfileData,
    setDocProfileData,
    getDocProfile,
    backendUrl,
  } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const updateProfile = async () => {
    try {
      setSaving(true);
      const updateData = {
        name: docProfileData.name,
        experience: docProfileData.experience,
        fees: docProfileData.fees,
        about: docProfileData.about,
        available: docProfileData.available,
        address: docProfileData.address,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getDocProfile();
        setSaving(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) getDocProfile();
  }, [dToken]);

  if (!docProfileData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-xl text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <img
            src={docProfileData.image}
            alt="Doctor"
            className="w-32 h-32 object-cover rounded-full border border-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            {isEdit ? (
              <input
                type="text"
                value={docProfileData.name}
                onChange={(e) =>
                  setDocProfileData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100"
              />
            ) : (
              <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
                {docProfileData.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Speciality
            </label>
            <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
              {docProfileData.speciality || "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Experience
            </label>
            {isEdit ? (
              <select
                value={docProfileData.experience}
                onChange={(e) =>
                  setDocProfileData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-gray-200 bg-gray-100"
              >
                <option value="">Select</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            ) : (
              <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
                {docProfileData.experience}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Fees</label>
            {isEdit ? (
              <input
                type="number"
                value={docProfileData.fees}
                onChange={(e) =>
                  setDocProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
                className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100"
              />
            ) : (
              <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
                ₹ {docProfileData.fees}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 ">
          <div>
            <label className="text-sm font-medium text-gray-600 ">
              Address Line 1
            </label>
            {isEdit ? (
              <input
                type="text"
                value={docProfileData.address.line1}
                onChange={(e) =>
                  setDocProfileData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
                className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100"
              />
            ) : (
              <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
                {docProfileData.address.line1}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 border border-gray-100">
              Address Line 2
            </label>
            {isEdit ? (
              <input
                type="text"
                value={docProfileData.address.line2}
                onChange={(e) =>
                  setDocProfileData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                  }))
                }
                className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100 "
              />
            ) : (
              <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
                {docProfileData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">About</label>
          {isEdit ? (
            <textarea
              rows={4}
              value={docProfileData.about}
              onChange={(e) =>
                setDocProfileData((prev) => ({
                  ...prev,
                  about: e.target.value,
                }))
              }
              className="w-full mt-1 p-3 border border-gray-100 rounded-lg outline-primary bg-gray-100"
            />
          ) : (
            <p className="w-full mt-1 px-3 py-2 border border-gray-100 rounded-lg outline-primary bg-gray-100">
              {docProfileData.about}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={docProfileData.available}
            onChange={() =>
              isEdit &&
              setDocProfileData((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
            className="w-4 h-4"
          />
          <label className="text-sm font-medium text-gray-700">Available</label>
        </div>

        <div className="text-center">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-6 py-2 bg-blue-500 text-black rounded-full hover:bg-blue-600 transition"
            >
              {saving ? "Updating.." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 border border-white bg-green-500 text-black rounded-full hover:bg-green-600 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocProfile;
