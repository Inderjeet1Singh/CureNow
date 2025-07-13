import React, { useContext, useRef, useState } from "react";
import doctorpng from "../../assets/doctorpng.png";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [preview, setPreview] = useState(doctorpng);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [education, setEducation] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [about, setAbout] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (preview === doctorpng) {
        return toast.error("Please upload a doctor image");
      }
      const formData = new FormData();
      formData.append("image", fileInputRef.current.files[0]);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fee));
      formData.append("speciality", speciality);
      formData.append("degree", education);
      formData.append(
        "address",
        JSON.stringify({ line1: addressLine1, line2: addressLine2 })
      );
      formData.append("about", about);
      // form data
      // formData.forEach((value, key) => {
      //   console.log(key, ":", value);
      // });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setPreview(doctorpng);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFee("");
        setSpeciality("General physician");
        setEducation("");
        setAddressLine1("");
        setAddressLine2("");
        setAbout("");
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error adding doctor:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-blue-700 text-center">
          Add Doctor
        </h2>

        <div className="flex flex-col items-center space-y-2">
          <img
            src={preview}
            alt="Doctor"
            onClick={handleImageClick}
            className="w-32 h-32 rounded-full object-cover cursor-pointer border-2 border-blue-500 hover:opacity-90 transition"
          />
          <p className="text-sm text-gray-600">Upload doctor picture</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <select
              required
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fee
            </label>
            <input
              onChange={(e) => setFee(e.target.value)}
              value={fee}
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Speciality
            </label>
            <select
              required
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <input
              onChange={(e) => setEducation(e.target.value)}
              value={education}
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              onChange={(e) => setAddressLine1(e.target.value)}
              value={addressLine1}
              type="text"
              required
              placeholder="Address line 1"
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              onChange={(e) => setAddressLine2(e.target.value)}
              value={addressLine2}
              required
              placeholder="Address line 2"
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            placeholder="Write about the doctor..."
            required
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6  rounded-full"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
